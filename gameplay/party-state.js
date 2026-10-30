import { answerKey, ROUND_COUNTDOWN_MS, random } from './rules.js?v=20261029.2';
import { modeOf, normalizeModeSettings, minimumPlayers } from './modes.js?v=20261030.4';
import { caseSolution } from './cases.js?v=20261030.1';
import { tableSnapshot, actTable, reconcileTable, tableView } from './table-state.js?v=20261030.4';

// Realtime Database omits empty collections; views and commands must tolerate
// their absence after every server round trip, not just after a fresh start.
export function partySnapshot(game) {
    if (modeOf(game.settings) === 'table') return tableSnapshot(game);
    return { ...game, ...(game.party ? { party: { ...game.party, history: game.party.history || [], players: game.party.players || [] } } : {}),
        ...(game.turn ? { turn: { ...game.turn, words: game.turn.words || [], selectedIndexes: game.turn.selectedIndexes || [],
            correctIds: game.turn.correctIds || [], guesses: game.turn.guesses || {}, guesserIds: game.turn.guesserIds || [] } } : {}) };
}

function participants(game, people) { return (game.party?.players || []).filter(player => !player.departed && people.some(member => member.playerId === player.id)); }
function setTurn(game, preferred = 0) {
    const players = game.party.players, table = modeOf(game.settings) === 'table';
    for (let offset = 0; offset < players.length; offset++) {
        const index = (preferred + offset) % players.length, player = players[index];
        if (player.departed || table && player.turns >= game.settings.tableCycles) continue;
        game.turn = { id: (game.turn?.id || 0) + 1, speakerId: player.id, speakerIndex: index, words: [], selectedIndexes: [], guesses: {}, guesserIds: [] };
        game.phase = 'idle'; game.roundActive = false; return;
    }
    finishTable(game);
}
function finishTable(game) {
    const players = game.party.players.filter(player => !player.departed);
    const best = Math.max(...players.map(player => player.points));
    game.party.winners = players.filter(player => player.points === best).map(player => player.id);
    game.phase = game.gameState = 'finished'; game.roundActive = false;
    game.finishReason = !players.length ? 'stopped' : game.party.winners.length > 1 ? 'draw' : 'winner';
}
function revealGuesses(game, now) {
    if (game.phase !== 'describing' || now < game.turn.startedAt || !game.turn.guesserIds.every(id => game.turn.guesses[id])) return;
    const aliases = new Set((game.turn.aliases || game.turn.words).map(answerKey));
    game.turn.correctIds = game.turn.guesserIds.filter(id => !game.turn.guesses[id].pass && aliases.has(answerKey(game.turn.guesses[id].text)));
    game.phase = 'selecting'; game.roundActive = false;
}
export function reconcileParty(game, people, connectedIds, now) {
    if (modeOf(game.settings) === 'table') { reconcileTable(game, people, connectedIds); return; }
    Object.assign(game, partySnapshot(game));
    if (!game.isGameStarted || !game.party) {
        game.phase = connectedIds.length >= minimumPlayers(game.settings) && connectedIds.length <= 12 ? 'ready' : 'waiting'; return;
    }
    if (['finished', 'ended'].includes(game.phase)) return;
    const table = modeOf(game.settings) === 'table';
    if (!table) for (const person of people) if (!game.party.players.some(player => player.id === person.playerId)) {
        game.party.players.push({ id: person.playerId, name: person.playerName, points: 0, turns: 0 });
    }
    for (const player of game.party.players) {
        const present = people.some(member => member.playerId === player.id);
        if (!table) player.departed = !present;
        else if (!present) player.departed = true;
    }
    const speaker = game.party.players.find(player => player.id === game.turn.speakerId);
    if (table && game.phase === 'describing') {
        for (const id of game.turn.guesserIds) if (!people.some(player => player.playerId === id)) game.turn.guesses[id] ||= { text: '', pass: true };
        revealGuesses(game, now);
    }
    if (speaker?.departed && ['idle', 'describing', 'waiting'].includes(game.phase)) {
        setTurn(game, (game.turn.speakerIndex + 1) % game.party.players.length);
    }
    // Untimed turns wait for reserved seats; removal cancels only unscored turns.
    if (['idle', 'waiting'].includes(game.phase)) {
        if (table && game.party.players.filter(player => !player.departed).every(player => player.turns >= game.settings.tableCycles)) { finishTable(game); return; }
        const active = participants(game, people).filter(player => connectedIds.includes(player.id));
        game.phase = active.length >= minimumPlayers(game.settings) && connectedIds.includes(game.turn.speakerId) ? 'idle' : 'waiting';
    }
}

// Receives identity/connection facts from the common lobby reducer; no browser or Firebase.
export function actParty(gameData, actor, action, now, rules, { people, connectedIds }) {
    if (modeOf(gameData.settings) === 'table') return actTable({ ...gameData, settings: normalizeModeSettings(gameData.settings) }, actor, action, now, rules, { people, connectedIds });
    const game = partySnapshot(structuredClone(gameData)), host = actor.playerId === game.hostId;
    const settings = normalizeModeSettings(game.settings); game.settings = settings;
    const table = modeOf(settings) === 'table';
    if ((action.matchId ?? 1) !== (game.matchId ?? 1)) return;
    if (action.type === 'start-game' || action.type === 'rematch') {
        if (!host || !Number.isInteger(action.seed) || action.seed < 0 || action.seed > 0xFFFFFFFF) return;
        if (action.type === 'rematch' ? game.phase !== 'finished' : game.isGameStarted || !['ready', 'waiting'].includes(game.phase)) return;
        const roster = people.filter(player => connectedIds.includes(player.playerId))
            .sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0) || a.playerName.localeCompare(b.playerName));
        if (roster.length < minimumPlayers(settings) || roster.length > 12) return;
        const previousStarter = game.party?.starterId;
        game.matchId = action.type === 'rematch' ? (game.matchId || 1) + 1 : game.matchId || 1;
        const previousIndex = roster.findIndex(player => player.playerId === previousStarter);
        const starter = previousIndex >= 0 ? (previousIndex + 1) % roster.length : Math.floor(random(action.seed)() * roster.length);
        game.party = { players: roster.map(player => ({ id: player.playerId, name: player.playerName, points: 0, turns: 0 })),
            starterId: roster[starter].playerId, history: [], totalCorrect: 0, evidenceCount: 0, culprit: caseSolution(action.seed), accusation: -1 };
        game.isGameStarted = true; game.finishReason = null; game.roundReview = null; game.reactions = null;
        game.auditEvents = {}; game.auditEvent = null; game.endedAt = null;
        setTurn(game, starter);
    } else if (action.type === 'end-game') {
        if (!host || game.phase === 'finished') return;
        game.phase = 'finished'; game.finishReason = 'stopped'; game.roundActive = false;
    } else {
        const turn = game.turn, party = game.party;
        if (!turn || !party || action.turnId !== turn.id) return;
        const speaker = actor.playerId === turn.speakerId;
        const reviewer = connectedIds.includes(turn.speakerId) ? speaker : host;
        if (action.type === 'start-round') {
            if (!speaker || game.phase !== 'idle' || participants(game, people).filter(player => connectedIds.includes(player.id)).length < minimumPlayers(settings)
                || !Number.isInteger(action.seed) || action.seed < 0 || action.seed > 0xFFFFFFFF) return;
            const draw = rules.drawWords?.(game, action.seed);
            if (!draw?.words?.length || table && draw.words.length !== 1) return;
            Object.assign(game, draw.pools);
            turn.words = draw.words; turn.aliases = draw.aliases || draw.words; turn.selectedIndexes = []; turn.guesses = {}; turn.correctIds = [];
            turn.guesserIds = participants(game, people).filter(player => player.id !== turn.speakerId).map(player => player.id);
            turn.countdownAt = now; turn.startedAt = now + ROUND_COUNTDOWN_MS;
            turn.deadline = table ? null : turn.startedAt + settings.numSeconds * 1000;
            turn.evidenceEvery = Math.max(1, Math.ceil(turn.words.length * 0.6));
            game.phase = 'describing'; game.roundActive = true; game.roundReview = null; game.reactions = null;
        } else if (action.type === 'lock-guess') {
            if (!table || game.phase !== 'describing' || now < turn.startedAt || !turn.guesserIds.includes(actor.playerId) || turn.guesses[actor.playerId]) return;
            const text = typeof action.text === 'string' ? action.text.trim() : '';
            if (action.pass !== true && (!text || text.length > 80 || /[\p{Cc}<>]/u.test(text))) return;
            turn.guesses[actor.playerId] = { text: action.pass === true ? '' : text, pass: action.pass === true };
            revealGuesses(game, now);
        } else if (action.type === 'pass-disconnected') {
            if (!table || !host || game.phase !== 'describing' || now < turn.startedAt || !turn.guesserIds.includes(action.playerId)
                || connectedIds.includes(action.playerId) || turn.guesses[action.playerId]) return;
            turn.guesses[action.playerId] = { text: '', pass: true }; revealGuesses(game, now);
        } else if (action.type === 'toggle-correct') {
            if (!table || !reviewer || game.phase !== 'selecting' || !turn.guesserIds.includes(action.playerId) || turn.guesses[action.playerId]?.pass) return;
            const correct = new Set(turn.correctIds || []); if (correct.has(action.playerId)) correct.delete(action.playerId); else correct.add(action.playerId);
            turn.correctIds = [...correct];
        } else if (action.type === 'end-round' || action.type === 'expire-round') {
            if (table || game.phase !== 'describing' || now < turn.startedAt || (action.type === 'end-round' ? !speaker : now < turn.deadline)) return;
            game.phase = 'selecting'; game.roundActive = false;
        } else if (action.type === 'toggle-answer') {
            if (table || !reviewer || game.phase !== 'selecting' || !Number.isInteger(action.index) || action.index < 0 || action.index >= turn.words.length) return;
            const selected = new Set(turn.selectedIndexes || []); if (selected.has(action.index)) selected.delete(action.index); else selected.add(action.index);
            turn.selectedIndexes = [...selected].sort((a, b) => a - b);
        } else if (action.type === 'submit-round') {
            if (!reviewer || game.phase !== 'selecting') return;
            const player = party.players[turn.speakerIndex];
            const correct = table ? (turn.correctIds || []).filter(id => turn.guesserIds.includes(id) && !turn.guesses[id]?.pass) : turn.selectedIndexes;
            if (table) {
                for (const id of correct) party.players.find(member => member.id === id).points++;
                player.points += correct.length;
            } else {
                party.totalCorrect += correct.length;
                // Carry earned words forward. Threshold is fixed from the first dealt card.
                party.evidenceEvery ||= turn.evidenceEvery;
                party.evidenceCount = Math.min(3, Math.floor(party.totalCorrect / party.evidenceEvery));
            }
            player.turns++;
            party.history.push({ turnId: turn.id, speakerId: turn.speakerId, earned: correct.length, wordCount: turn.words.length,
                words: [...turn.words], correct: [...correct], ...(table ? { guesses: structuredClone(turn.guesses) } : {}) });
            game.roundReview = { turnId: turn.id, teamIndex: 0, words: [...turn.words], selectedIndexes: table ? [] : [...correct] };
            if (!table && (party.history.length >= settings.caseTurns || party.evidenceCount === 3)) { game.phase = 'accusing'; game.roundActive = false; }
            else setTurn(game, (turn.speakerIndex + 1) % party.players.length);
        } else if (action.type === 'choose-suspect') {
            if (table || !host || game.phase !== 'accusing' || !Number.isInteger(action.index) || action.index < 0 || action.index > 3) return;
            party.accusation = action.index;
        } else if (action.type === 'accuse') {
            if (table || !host || game.phase !== 'accusing' || party.accusation < 0 || party.accusation > 3 || action.index !== party.accusation) return;
            game.phase = 'finished'; game.finishReason = party.accusation === party.culprit ? 'solved' : 'unsolved';
        } else return;
    }
    game.gameState = game.phase === 'waiting' ? 'waiting' : game.phase === 'finished' ? 'finished' : 'resumed';
    if (game.phase === 'finished') game.endedAt = now;
    return game;
}

export function partyView(game, actor, now, { player, active, people, connectedIds }) {
    if (modeOf(game.settings) === 'table') return tableView(game, actor, now, { player, active, people, connectedIds });
    game = partySnapshot(game);
    const party = game.party, turn = game.turn, table = modeOf(game.settings) === 'table';
    const participant = party?.players.find(member => member.id === actor.playerId && !member.departed);
    const speaker = active && Boolean(participant) && turn?.speakerId === actor.playerId;
    const host = active && actor.playerId === game.hostId;
    const countdownRemainingMs = game.phase === 'describing' ? Math.max(0, turn.startedAt - now) : 0;
    const reviewer = active && (connectedIds.includes(turn?.speakerId) ? speaker : host);
    const waitingFor = (turn?.guesserIds || []).filter(id => !turn.guesses?.[id]);
    const roster = { connectedPlayers: connectedIds.length, connectedTeams: 0, reconnectingPlayers: people.length - connectedIds.length,
        eligible: game.isGameStarted ? participants(game, people).filter(member => connectedIds.includes(member.id)).length >= minimumPlayers(game.settings) : connectedIds.length >= minimumPlayers(game.settings) && connectedIds.length <= 12 };
    return { player, active, host, speaker, reviewer, participant, roster, smallGame: false, countdownRemainingMs,
        canStartGame: host && !game.isGameStarted && roster.eligible,
        canStartRound: speaker && game.phase === 'idle' && roster.eligible,
        canSelect: reviewer && game.phase === 'selecting',
        canEndRound: !table && speaker && game.phase === 'describing' && !countdownRemainingMs,
        canGuess: table && active && game.phase === 'describing' && !countdownRemainingMs && waitingFor.includes(actor.playerId),
        showWords: active && (game.phase === 'selecting' || speaker && game.phase === 'describing' && !countdownRemainingMs),
        ownGuess: active ? turn?.guesses?.[actor.playerId] : null, waitingFor,
        remainingSeconds: !table && game.phase === 'describing' ? Math.max(0, Math.ceil((turn.deadline - Math.max(now, turn.startedAt)) / 1000)) : 0 };
}
