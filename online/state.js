// All online mutations run against the transaction's current snapshot, never a
// client's rendered roster. Keep this module free of DOM and Firebase side effects.
import { startingTeam, recap, ROUND_COUNTDOWN_MS, matchProgress, completedTurns } from '../gameplay/rules.js?v=20261030.2';
import { normalizeOnlinePack } from '../gameplay/online-packs.js?v=20261029.3';
import { REACTIONS, REACTION_TTL_MS, rosterKey, freshSeries, recordSeries } from '../gameplay/experience.js?v=20261030.4';
import * as Modes from '../gameplay/modes.js?v=20261030.variants1';
import { actParty, reconcileParty, partyView } from '../gameplay/party-state.js?v=20261030.variants1';

export const PROTOCOL_VERSION = 15;
export const HOST_TIMEOUT_MS = 10000;
export const PLAYER_TIMEOUT_MS = 90000;

export function canPlay(teamCount, playerCount) {
    return (teamCount === 2 && playerCount === 2)
        || (teamCount === 3 && playerCount === 3)
        || playerCount >= teamCount * 2;
}

export function members(game) {
    return (game?.teams || []).flatMap((team, teamIndex) =>
        (team.players || []).map(player => ({ ...player, teamIndex })));
}

export function connection(game, player) {
    return game.presence?.[player?.playerId]?.connections?.[player?.connectionId];
}

export function ownsSeat(game, actor) {
    return members(game).find(player => player.playerId === actor.playerId
        && player.connectionId === actor.connectionId);
}

export function isConnected(game, player, now, timeout = PLAYER_TIMEOUT_MS) {
    const entry = connection(game, player);
    return Boolean(entry?.connected && now - Number(entry.lastSeen) <= timeout);
}

export function rosterStatus(game, now) {
    const connected = members(game).filter(player => isConnected(game, player, now));
    const connectedTeams = new Set(connected.map(player => player.teamIndex)).size;
    if (Modes.isParty(game.settings)) return { connectedPlayers: connected.length, connectedTeams, reconnectingPlayers: members(game).length - connected.length,
        eligible: connected.length >= Modes.minimumPlayers(game.settings) && connected.length <= Modes.maximumPlayers(game.settings) };
    return { connectedPlayers: connected.length, connectedTeams,
        reconnectingPlayers: members(game).length - connected.length,
        eligible: connectedTeams === game.teams.length && canPlay(game.teams.length, connected.length) };
}

function chooseSpeaker(game, preferred = game.currentTeam - 1) {
    for (const team of game.teams) for (const player of team.players || []) player.isSpeaker = false;
    const count = game.teams.length;
    const pending = game.finalTurnCount ? matchProgress(game.teams.map(team => team.points), game.settings.pointsToWin,
        Object.values(game.auditEvents || {}), game.finalTurnCount, game.settings.winRule).pendingTeams : null;
    for (let offset = 0; offset < count; offset++) {
        const teamIndex = ((preferred + offset) % count + count) % count;
        if (pending && !pending.includes(teamIndex)) continue;
        const team = game.teams[teamIndex];
        const players = team.players || [];
        if (!players.length) continue;
        const speaker = players.find(player => player.playerId === team.nextSpeakerId) || players[0];
        team.nextSpeakerId = speaker.playerId;
        speaker.isSpeaker = true;
        if (game.isGameStarted && teamIndex < preferred) game.currentRound = (Number(game.currentRound) || 0) + 1;
        game.currentTeam = teamIndex + 1;
        return speaker;
    }
    if (pending?.length) game.currentTeam = pending[0] + 1;
    return null;
}

function newTurn(game, phase) {
    const speaker = chooseSpeaker(game);
    game.turn = {
        id: (Number(game.turn?.id) || 0) + 1,
        teamIndex: game.currentTeam - 1,
        speakerId: speaker?.playerId || '',
        roundNumber: completedTurns(Object.values(game.auditEvents || {}), game.teams.length)[game.currentTeam - 1] + 1,
        words: [], selectedIndexes: []
    };
    game.phase = phase;
    game.roundActive = false;
    game.words = [];
    game.endRoundEarly = false;
    game.remainingTime = null;
    if (game.chaos) {
        game.chaos.pending = null;
        game.chaos.reveal = false;
        game.chaos.landed = null;
    }
}

function removeMember(game, playerId) {
    for (const team of game.teams) {
        const players = team.players || [];
        const index = players.findIndex(player => player.playerId === playerId);
        if (index < 0) continue;
        players.splice(index, 1);
        if (team.nextSpeakerId === playerId) team.nextSpeakerId = players[index % (players.length || 1)]?.playerId || '';
    }
    delete game.presence?.[playerId];
}

function reconcile(game, now) {
    const roster = members(game);
    if (game.settings?.trackSeries && game.series?.roster !== rosterKey(game.teams)) {
        game.series = freshSeries(game.teams.length, rosterKey(game.teams));
    }
    game.numPlayers = roster.length;
    game.teams.forEach(team => (team.players || []).forEach((player, index) => { player.id = index; }));

    const host = roster.find(player => player.playerId === game.hostId);
    if (!host || !isConnected(game, host, now, HOST_TIMEOUT_MS)) {
        const replacement = roster.find(player => isConnected(game, player, now, HOST_TIMEOUT_MS));
        const nextHostId = replacement?.playerId || '';
        if (nextHostId !== game.hostId) {
            game.hostId = nextHostId;
            game.hostEpoch = (Number(game.hostEpoch) || 0) + 1;
        }
    }
    game.hostName = roster.find(player => player.playerId === game.hostId)?.playerName || '';
    if (game.phase === 'ended') return;
    if (!roster.length && game.isGameStarted) {
        game.phase = game.gameState = 'ended';
        game.roundActive = false;
        game.endedAt = now;
        return;
    }
    if (game.phase === 'finished') return;
    if (Modes.isParty(game.settings)) {
        reconcileParty(game, roster, roster.filter(player => isConnected(game, player, now)).map(player => player.playerId), now);
        game.gameState = game.phase === 'waiting' ? 'waiting' : game.phase === 'finished' ? 'finished' : 'resumed';
        if (game.phase === 'finished') game.endedAt ||= now;
        return;
    }
    if (game.phase === 'resolving' || game.phase === 'chaos-choice') {
        game.gameState = 'resumed';
        return;
    }

    const eligible = canPlay(game.teams.length, roster.length);
    const speaker = roster.find(player => player.playerId === game.turn?.speakerId);
    if (game.finalTurnCount) {
        const pending = matchProgress(game.teams.map(team => team.points), game.settings.pointsToWin,
            Object.values(game.auditEvents || {}), game.finalTurnCount, game.settings.winRule).pendingTeams;
        if (pending.length && !pending.some(index => game.teams[index].players?.length)) {
            if (game.phase !== 'waiting' || game.turn?.teamIndex !== pending[0] || game.turn?.speakerId) newTurn(game, 'waiting');
            game.gameState = 'waiting'; return;
        }
    }
    if (!game.isGameStarted) {
        chooseSpeaker(game);
        game.phase = rosterStatus(game, now).eligible ? 'ready' : 'waiting';
    } else if (!eligible) {
        if (game.phase !== 'waiting') newTurn(game, 'waiting');
    } else if (game.phase === 'waiting' || !speaker) {
        // A submitted result survives its speaker leaving. It is already sealed
        // and the current host can finish it without that player's connection.
        if (game.phase !== 'resolving') newTurn(game, 'idle');
    }
    game.gameState = game.phase === 'waiting' ? 'waiting'
        : game.phase === 'ready' ? 'ready' : 'resumed';
}

function usableWordPack(game) {
    if (Modes.modeOf(game.settings) === 'case') return !game.wordPack;
    try {
        const pack = normalizeOnlinePack(game.wordPack), difficulty = game.settings?.difficulty || 'normal';
        return !pack || pack.entries.some(entry => difficulty === 'normal' || entry.difficulty === difficulty);
    } catch { return false; }
}

export function joinReason(game, actor) {
    if (!game || game.phase === 'ended' || game.gameState === 'ended') return 'lobby-unavailable';
    if (game.protocolVersion !== PROTOCOL_VERSION) return 'incompatible-lobby';
    if (game.settings?.mode && !Object.hasOwn(Modes.MODES, game.settings.mode)) return 'invalid-game-mode';
    if (!usableWordPack(game)) return 'invalid-word-pack';
    if (!actor.playerId || !actor.connectionId || !actor.playerName?.trim()) return 'invalid-player-name';
    if (Modes.isParty(game.settings) && members(game).length >= Modes.maximumPlayers(game.settings) && !members(game).some(player => player.playerId === actor.playerId)) return 'lobby-full';
    if (members(game).some(player => player.playerId !== actor.playerId
        && player.playerName.trim().toLowerCase() === actor.playerName.trim().toLowerCase())) return 'duplicate-player-name';
    return null;
}

export function join(gameData, actor, now) {
    if (joinReason(gameData, actor)) return;
    const game = structuredClone(gameData);
    game.teams.forEach(team => { team.players = Array.isArray(team.players) ? team.players : []; });
    let player = members(game).find(entry => entry.playerId === actor.playerId);
    if (player) {
        player = game.teams[player.teamIndex].players.find(entry => entry.playerId === actor.playerId);
        // Reconnecting keeps the same name, team, queue position, and turn.
        player.connectionId = actor.connectionId;
    } else {
        const minSize = Math.min(...game.teams.map(team => team.players.length));
        const team = game.teams.find(entry => entry.players.length === minSize);
        player = { playerId: actor.playerId, connectionId: actor.connectionId, playerName: actor.playerName, joinedAt: now, isSpeaker: false };
        team.players.push(player);
    }
    game.presence ||= {};
    // Only the current connection is retained. An old onDisconnect write targets
    // a different child, so it cannot disconnect a refreshed/reconnected client.
    game.presence[actor.playerId] = { activeConnectionId: actor.connectionId, connections: {
        [actor.connectionId]: { connected: true, lastSeen: now }
    } };
    reconcile(game, now);
    return game;
}

export function heartbeat(gameData, actor, now) {
    if (!gameData || gameData.phase === 'ended' || !ownsSeat(gameData, actor)) return;
    const game = structuredClone(gameData);
    game.presence ||= {};
    game.presence[actor.playerId] = { activeConnectionId: actor.connectionId, connections: {
        [actor.connectionId]: { connected: true, lastSeen: now }
    } };
    reconcile(game, now);
    return game;
}

export function leave(gameData, actor, now) {
    if (!gameData || !ownsSeat(gameData, actor) || gameData.phase === 'ended') return;
    const game = structuredClone(gameData);
    removeMember(game, actor.playerId);
    if (!members(game).length) {
        game.phase = game.gameState = 'ended';
        game.endedAt = now;
        game.hostId = game.hostName = '';
    }
    reconcile(game, now);
    return game;
}

export function prune(gameData, actor, now) {
    if (!gameData || gameData.phase === 'ended' || !ownsSeat(gameData, actor)) return;
    const currentHost = members(gameData).find(player => player.playerId === gameData.hostId);
    if (gameData.hostId !== actor.playerId && currentHost && isConnected(gameData, currentHost, now, HOST_TIMEOUT_MS)) return;
    const game = structuredClone(gameData);
    let changed = false;
    for (const player of members(game)) {
        const entry = connection(game, player);
        const lastSeen = Number(entry?.lastSeen) || Number(player.joinedAt) || Number(game.dateCreated) || 0;
        // A live database connection can outlast background-tab timer throttling.
        // Use the server disconnect marker (or a missing record) for eviction;
        // an old heartbeat alone may transfer host authority but not eject a seat.
        if (entry?.connected !== true && now - lastSeen > PLAYER_TIMEOUT_MS) {
            removeMember(game, player.playerId);
            changed = true;
        }
    }
    const before = JSON.stringify([game.hostId, game.phase, game.turn]);
    reconcile(game, now);
    if (changed || before !== JSON.stringify([game.hostId, game.phase, game.turn])) return game;
}

function completeTurn(game, now, points, chaosSummary = null, effect = null) {
    const turn = game.turn;
    game.roundReview = { turnId: turn.id, teamIndex: turn.teamIndex,
        words: [...turn.words], selectedIndexes: [...(turn.selectedIndexes || [])] };
    const correctAnswers = (turn.selectedIndexes || []).map(index => turn.words[index]);
    const before = Number(game.teams[turn.teamIndex].points) || 0;
    const pointsBeforeAll = game.teams.map(team => Number(team.points) || 0);
    game.teams.forEach((team, index) => { team.points = points[index]; });
    const event = { id: turn.id, teamIndex: turn.teamIndex, roundNumber: turn.roundNumber, correctAnswers,
        earned: correctAnswers.length, wordCount: turn.words.length, pointsBeforeAll, recap: recap({ teamIndex: turn.teamIndex, earned: correctAnswers.length,
            before, after: points[turn.teamIndex], effect: effect || chaosSummary }),
        pointsBefore: before, pointsAfter: points[turn.teamIndex],
        clueSeconds: Math.max(0, ((turn.selectingAt || now) - (turn.startedAt || now)) / 1000),
        scoringSeconds: Math.max(0, ((turn.submittedAt || now) - (turn.selectingAt || now)) / 1000),
        resolutionSeconds: Math.max(0, (now - (turn.submittedAt || now)) / 1000) };
    if (chaosSummary !== null) event.chaosSummary = chaosSummary;
    if (effect) event.effect = effect;
    game.auditEvents ||= {};
    game.auditEvents[`turn_${turn.id}`] = event;
    game.auditEvent = event;
    if (Modes.isStakes(game.settings)) {
        event.stakes = Modes.stakesScore(game.settings, before, event.earned, turn.words.length, turn.risky);
        event.recap = `Team ${turn.teamIndex + 1}: ${event.stakes.message}`;
        game.stakes ||= {};
        game.stakes[turn.teamIndex] = Modes.nextRiskResource(game.settings, turn.risky, game.stakes[turn.teamIndex]);
    }
    game.chaos ||= {};
    game.chaos.pending = null;
    game.chaos.reveal = false;
    game.chaos.landed = null;
    const team = game.teams[turn.teamIndex];
    const index = (team.players || []).findIndex(player => player.playerId === turn.speakerId);
    if (index >= 0) team.nextSpeakerId = team.players[(index + 1) % team.players.length].playerId;
    const progress = matchProgress(points, game.settings.pointsToWin, Object.values(game.auditEvents), game.finalTurnCount, game.settings.winRule);
    game.finalTurnCount = progress.finalTurnCount;
    if (progress.finished) {
        if (game.settings.trackSeries) game.series = recordSeries(game.series, game.matchId || 1, progress.winners);
        game.phase = game.gameState = 'finished';
        game.finishReason = progress.winners.length > 1 ? 'draw' : 'winner';
        game.roundActive = false;
        game.endedAt = now;
        return;
    }

    const previousTeam = turn.teamIndex;
    let nextTeam = (previousTeam + 1) % game.teams.length;
    for (let offset = 0; offset < game.teams.length; offset++) {
        if ((game.teams[nextTeam].players || []).length) break;
        nextTeam = (nextTeam + 1) % game.teams.length;
    }
    if (nextTeam <= previousTeam) game.currentRound = (Number(game.currentRound) || 0) + 1;
    game.currentTeam = nextTeam + 1;
    newTurn(game, canPlay(game.teams.length, members(game).length) ? 'idle' : 'waiting');
    reconcile(game, now);
}

// Callbacks supply the existing word and Chaos rules; they must be synchronous
// and deterministic because Firebase may rerun a transaction callback.
export function act(gameData, actor, action, now, rules = {}) {
    if (!gameData || gameData.protocolVersion !== PROTOCOL_VERSION || gameData.phase === 'ended') return;
    if (['start-game', 'start-round'].includes(action.type) && !usableWordPack(gameData)) return;
    const player = ownsSeat(gameData, actor);
    if (!player || !isConnected(gameData, player, now)) return;
    if (Modes.isParty(gameData.settings) && action.type !== 'react') {
        const people = members(gameData), connectedIds = people.filter(member => isConnected(gameData, member, now)).map(member => member.playerId);
        return actParty(gameData, actor, action, now, rules, { people, connectedIds });
    }
    const game = structuredClone(gameData);
    const host = game.hostId === actor.playerId;
    if (Modes.isStakes(game.settings)) game.settings = Modes.normalizeModeSettings(game.settings);
    const turn = game.turn;
    const speaker = turn?.speakerId === actor.playerId;
    if (action.type === 'react') {
        // Reactions are bounded decorations on a confirmed turn, never clues.
        const review = ['resolving', 'chaos-choice'].includes(game.phase) ? turn : game.roundReview;
        const reviewId = review?.turnId ?? review?.id;
        if (action.matchId !== game.matchId || action.turnId !== turn?.id || !review || action.reviewId !== reviewId
            || !['resolving', 'chaos-choice', 'idle', 'waiting', 'evidence', 'accusing', 'finished'].includes(game.phase)
            || !Object.hasOwn(REACTIONS, action.reaction)) return;
        const previous = game.reactions?.[actor.playerId];
        if (previous && now - previous.at < 1800) return;
        game.reactions = Object.fromEntries(Object.entries(game.reactions || {}).filter(([, item]) =>
            item.reviewId === reviewId && now - item.at < REACTION_TTL_MS));
        game.reactions[actor.playerId] = { reaction: action.reaction, at: now, reviewId };
    } else if (action.type === 'rematch') {
        if (!host || game.phase !== 'finished' || action.matchId !== game.matchId) return;
        game.matchId = (Number(game.matchId) || 1) + 1;
        game.starterTeam = startingTeam(0, game.teams.length, Number(game.starterTeam) || 0);
        game.currentTeam = game.starterTeam + 1;
        game.currentRound = 0;
        game.isGameStarted = false;
        game.teams.forEach(team => { team.points = 0; });
        game.auditEvents = {}; game.auditEvent = null; game.roundReview = null;
        game.reactions = null;
        game.stakes = {};
        game.chaos = { teamShields: game.teams.map(() => 0), rerollsUsed: game.teams.map(() => false) };
        game.finishReason = null; game.endedAt = null; game.finalTurnCount = null;
        newTurn(game, 'ready');
        reconcile(game, now);
    } else if (action.type === 'start-game') {
        if ((action.matchId ?? 1) !== (game.matchId ?? 1)) return;
        if (!host || !['ready', 'waiting'].includes(game.phase) || game.isGameStarted || !rosterStatus(game, now).eligible) return;
        game.isGameStarted = true;
        game.finalTurnCount = null;
        game.matchId ||= 1;
        if (game.starterTeam === undefined) game.starterTeam = Number.isInteger(action.seed)
            ? startingTeam(action.seed, game.teams.length) : Math.max(0, game.currentTeam - 1);
        game.currentTeam = game.starterTeam + 1;
        game.currentTeam = Math.max(1, Number(game.currentTeam) || 1);
        newTurn(game, 'idle');
    } else if (action.type === 'end-game') {
        if ((action.matchId ?? 1) !== (game.matchId ?? 1)) return;
        if (!host || game.phase === 'finished') return;
        game.phase = game.gameState = 'finished';
        game.finishReason = 'stopped';
        game.roundActive = false;
        game.endedAt = now;
    } else {
        if (!turn || turn.id !== action.turnId) return;
        if (action.type === 'start-round') {
            if (!speaker || game.phase !== 'idle' || !rosterStatus(game, now).eligible || !Number.isInteger(action.seed)
                || action.seed < 0 || action.seed > 0xFFFFFFFF) return;
            if (action.risky === true && (!Modes.isStakes(game.settings)
                || !Modes.riskAvailability(game.settings, game.teams[turn.teamIndex].points, game.stakes?.[turn.teamIndex]).allowed)) return;
            const draw = rules.drawWords?.(game, action.seed);
            if (!draw?.words?.length) return;
            game.roundReview = null;
            game.reactions = null;
            turn.words = draw.words;
            turn.selectedIndexes = [];
            turn.seed = action.seed;
            turn.risky = action.risky === true;
            const count = rosterStatus(game, now).connectedPlayers;
            turn.smallGame = (game.teams.length === 2 && count === 2) || (game.teams.length === 3 && count === 3);
            turn.countdownAt = now;
            turn.startedAt = now + ROUND_COUNTDOWN_MS;
            turn.deadline = turn.startedAt + game.settings.numSeconds * 1000;
            Object.assign(game, draw.pools);
            game.words = turn.words;
            game.phase = 'describing';
            game.roundActive = true;
        } else if (action.type === 'end-round' || action.type === 'expire-round') {
            if (game.phase !== 'describing' || now < turn.startedAt) return;
            if (action.type === 'end-round' ? !speaker : now < turn.deadline) return;
            game.phase = 'selecting';
            turn.selectingAt = now;
            game.roundActive = false;
            game.endRoundEarly = action.type === 'end-round';
        } else if (action.type === 'toggle-answer') {
            if (!speaker || game.phase !== 'selecting' || !Number.isInteger(action.index)
                || action.index < 0 || action.index >= turn.words.length) return;
            const selected = new Set(turn.selectedIndexes || []);
            if (selected.has(action.index)) selected.delete(action.index); else selected.add(action.index);
            turn.selectedIndexes = [...selected].sort((a, b) => a - b);
        } else if (action.type === 'submit-round') {
            if (!speaker || game.phase !== 'selecting') return;
            turn.submittedAt = now;
            const points = game.teams.map(team => Number(team.points) || 0);
            points[turn.teamIndex] += (turn.selectedIndexes || []).length;
            if (Modes.isStakes(game.settings)) points[turn.teamIndex] = Modes.stakesScore(game.settings,
                game.teams[turn.teamIndex].points, (turn.selectedIndexes || []).length, turn.words.length, turn.risky).after;
            if (game.settings.chaosMode) {
                const plan = rules.planChaos?.(game, points);
                if (!plan) return;
                turn.resolution = { ...plan, startedAt: now };
                const choice = game.settings.chaosReroll && plan.landing && !game.chaos?.rerollsUsed?.[turn.teamIndex];
                game.phase = choice ? 'chaos-choice' : 'resolving';
                if (choice) turn.choiceDeadline = now + 5000;
                game.chaos ||= {};
                game.chaos.pending = { id: turn.id };
                game.chaos.powerups = plan.powerups;
                game.chaos.reveal = true;
            } else completeTurn(game, now, points);
        } else if (action.type === 'keep-chaos' || action.type === 'reroll-chaos' || action.type === 'expire-choice') {
            if (game.phase !== 'chaos-choice') return;
            if (action.type === 'expire-choice') {
                if (!host || action.hostEpoch !== game.hostEpoch || now < turn.choiceDeadline) return;
            } else if (!speaker || now >= turn.choiceDeadline) return;
            if (action.type === 'reroll-chaos') {
                if (!game.settings.chaosReroll || game.chaos?.rerollsUsed?.[turn.teamIndex]) return;
                const rerolled = rules.planChaos?.({ ...game, turn: { ...turn, seed: (turn.seed ^ 0x9E3779B9) >>> 0 } }, turn.resolution.basePoints);
                if (!rerolled) return;
                game.chaos.rerollsUsed ||= game.teams.map(() => false);
                game.chaos.rerollsUsed[turn.teamIndex] = true;
                turn.resolution = rerolled;
            }
            turn.resolution.startedAt = now;
            game.phase = 'resolving';
            game.chaos.powerups = turn.resolution.powerups;
        } else if (action.type === 'resolve-chaos') {
            if (!host || action.hostEpoch !== game.hostEpoch || game.phase !== 'resolving'
                || now < turn.resolution.startedAt + turn.resolution.durationMs) return;
            const result = turn.resolution;
            game.chaos.teamShields = result.shields;
            game.chaos.resolutionId = turn.id;
            completeTurn(game, now, result.points, result.summary, result.effect);
        } else return;
    }
    if (!['ended', 'finished'].includes(game.phase)) game.gameState = game.phase === 'waiting' ? 'waiting' : 'resumed';
    return game;
}

export function view(game, actor, now) {
    const player = ownsSeat(game, actor);
    const active = Boolean(player && isConnected(game, player, now));
    if (Modes.isParty(game.settings)) {
        const people = members(game);
        return partyView(game, actor, now, { player, active, people, connectedIds: people.filter(member => isConnected(game, member, now)).map(member => member.playerId) });
    }
    const speaker = active && game.turn?.speakerId === actor.playerId;
    const roster = rosterStatus(game, now);
    const smallGame = Boolean(game.turn?.smallGame) || (game.teams.length === 2 && roster.connectedPlayers === 2)
        || (game.teams.length === 3 && roster.connectedPlayers === 3);
    const countdownRemainingMs = game.phase === 'describing' ? Math.max(0, (game.turn?.startedAt || now) - now) : 0;
    const showWords = active && (game.phase === 'selecting' || (game.phase === 'describing' && !countdownRemainingMs
        && (speaker || (!smallGame && player.teamIndex !== game.turn?.teamIndex))));
    const review = !active || game.phase === 'describing' ? null
        : ['resolving', 'chaos-choice'].includes(game.phase) ? game.turn
        : game.roundReview || null;
    return {
        player, active, speaker, roster, smallGame, countdownRemainingMs,
        host: active && game.hostId === actor.playerId,
        showWords, review,
        canStartGame: active && game.hostId === actor.playerId && !game.isGameStarted && roster.eligible && ['ready', 'waiting'].includes(game.phase),
        canStartRound: speaker && game.phase === 'idle' && roster.eligible,
        canSelect: speaker && game.phase === 'selecting',
        canEndRound: speaker && game.phase === 'describing' && !countdownRemainingMs,
        remainingSeconds: Math.max(0, Math.ceil(((game.turn?.deadline || now) - Math.max(now, game.turn?.startedAt || now)) / 1000))
    };
}
