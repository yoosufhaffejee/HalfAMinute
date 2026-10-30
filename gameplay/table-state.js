import { ROUND_COUNTDOWN_MS } from './rules.js?v=20261030.2';

const MAX_PLAYERS = 8;
const awardMap = value => Object.fromEntries(Object.entries(value || {}).map(([index, ids]) => [index, [...new Set(Array.isArray(ids) ? ids : [ids])].filter(id => typeof id === 'string' && id)]).filter(([, ids]) => ids.length));
export function tableSnapshot(data) {
    return { ...data, ...(data.party ? { party: { ...data.party, players: data.party.players || [], history: (data.party.history || []).map(event => ({ ...event, awards: awardMap(event.awards) })) } } : {}),
        ...(data.turn ? { turn: { ...data.turn, words: data.turn.words || [], guesserIds: data.turn.guesserIds || [], awards: awardMap(data.turn.awards),
            skipped: data.turn.skipped || {}, messages: data.turn.messages || [] } } : {}) };
}
const available = (game, people) => game.party.players.filter(p => !p.departed && people.some(member => member.playerId === p.id));
function finish(game) {
    const players = game.party.players.filter(p => !p.departed), best = Math.max(...players.map(p => p.points));
    game.party.winners = players.filter(p => p.points === best).map(p => p.id);
    game.phase = 'finished'; game.roundActive = false;
    game.finishReason = !players.length ? 'stopped' : game.party.winners.length > 1 ? 'draw' : 'winner';
}
function nextTurn(game, preferred) {
    const players = game.party.players;
    for (let offset = 0; offset < players.length; offset++) {
        const index = (preferred + offset) % players.length, person = players[index];
        if (person.departed || person.turns >= game.settings.tableCycles) continue;
        game.turn = { id: (game.turn?.id || 0) + 1, speakerId: person.id, speakerIndex: index, words: [], guesserIds: [], awards: {}, skipped: {}, messages: [], activeIndex: 0 };
        game.phase = 'idle'; game.roundActive = false; return;
    }
    finish(game);
}
function advanceWord(game) {
    const turn = game.turn;
    for (let offset = 1; offset <= turn.words.length; offset++) {
        const index = (turn.activeIndex + offset) % turn.words.length;
        if (!turn.awards[index] && !turn.skipped[index]) { turn.activeIndex = index; return; }
    }
    game.phase = 'selecting'; game.roundActive = false;
}
export function reconcileTable(data, people, connectedIds) {
    Object.assign(data, tableSnapshot(data));
    if (!data.isGameStarted || !data.party) { data.phase = connectedIds.length >= 3 && connectedIds.length <= MAX_PLAYERS ? 'ready' : 'waiting'; return; }
    if (['finished', 'ended'].includes(data.phase)) return;
    for (const player of data.party.players) if (!people.some(p => p.playerId === player.id)) player.departed = true;
    const speaker = data.party.players.find(p => p.id === data.turn.speakerId);
    if (speaker?.departed && ['idle', 'waiting', 'describing'].includes(data.phase)) nextTurn(data, (data.turn.speakerIndex + 1) % data.party.players.length);
    if (data.party.players.every(p => p.departed)) { finish(data); return; }
    if (['idle', 'waiting'].includes(data.phase)) {
        if (data.party.players.filter(p => !p.departed).every(p => p.turns >= data.settings.tableCycles)) { finish(data); return; }
        data.phase = available(data, people).filter(p => connectedIds.includes(p.id)).length >= 3 && connectedIds.includes(data.turn.speakerId) ? 'idle' : 'waiting';
    }
}
const cleanText = (text, max) => typeof text === 'string' && text.trim().length > 0 && text.trim().length <= max && !/[\p{Cc}<>]/u.test(text);
export function actTable(data, actor, action, now, rules, { people, connectedIds }) {
    const game = tableSnapshot(structuredClone(data)), host = actor.playerId === game.hostId;
    if ((action.matchId ?? 1) !== (game.matchId ?? 1)) return;
    if (action.type === 'start-game' || action.type === 'rematch') {
        if (!host || !Number.isInteger(action.seed) || action.seed < 0 || action.seed > 0xFFFFFFFF) return;
        if (action.type === 'rematch' ? game.phase !== 'finished' : game.isGameStarted || !['ready', 'waiting'].includes(game.phase)) return;
        const localOrder = game.localPlayerOrder;
        const roster = people.filter(p => connectedIds.includes(p.playerId)).sort((a, b) => Array.isArray(localOrder)
            ? localOrder.indexOf(a.playerId) - localOrder.indexOf(b.playerId)
            : (a.joinedAt || 0) - (b.joinedAt || 0) || a.playerName.localeCompare(b.playerName));
        if (roster.length < 3 || roster.length > MAX_PLAYERS) return;
        const format = action.format || (action.type === 'rematch' ? game.party.format : null);
        if (!['voice', 'text'].includes(format)) return;
        const previous = roster.findIndex(p => p.playerId === game.party?.starterId), starter = previous >= 0 ? (previous + 1) % roster.length : 0;
        game.matchId = action.type === 'rematch' ? (game.matchId || 1) + 1 : game.matchId || 1;
        game.party = { format, starterId: roster[starter].playerId, players: roster.map(p => ({ id: p.playerId, name: p.playerName, turns: 0, points: 0 })), history: [] };
        game.isGameStarted = true; game.roundReview = null; game.reactions = null; game.finishReason = null; game.endedAt = null;
        game.auditEvents = {}; game.auditEvent = null; nextTurn(game, starter);
    } else if (action.type === 'end-game') {
        if (!host || game.phase === 'finished') return;
        game.phase = 'finished'; game.roundActive = false; game.finishReason = 'stopped';
    } else {
        const turn = game.turn, party = game.party;
        if (!turn || !party || action.turnId !== turn.id) return;
        const speaker = actor.playerId === turn.speakerId, reviewer = connectedIds.includes(turn.speakerId) ? speaker : host;
        const live = game.phase === 'describing' && now >= turn.startedAt && (!Number.isFinite(turn.deadline) || now < turn.deadline);
        const indexValid = Number.isInteger(action.index) && action.index >= 0 && action.index < turn.words.length;
        if (action.type === 'start-round') {
            if (!speaker || game.phase !== 'idle' || available(game, people).filter(p => connectedIds.includes(p.id)).length < 3
                || !Number.isInteger(action.seed) || action.seed < 0 || action.seed > 0xFFFFFFFF) return;
            const draw = rules.drawWords?.(game, action.seed); if (!draw?.words?.length || draw.words.length > game.settings.numWords) return;
            Object.assign(game, draw.pools); turn.words = draw.words; turn.awards = {}; turn.skipped = {}; turn.messages = []; turn.activeIndex = 0;
            turn.guesserIds = available(game, people).filter(p => p.id !== turn.speakerId).map(p => p.id);
            turn.countdownAt = now; turn.startedAt = now + ROUND_COUNTDOWN_MS;
            turn.deadline = game.settings.tableTiming === 'unlimited' ? null : turn.startedAt + game.settings.tableSeconds * 1000;
            game.phase = 'describing'; game.roundActive = true; game.roundReview = null; game.reactions = null;
        } else if (action.type === 'end-round' || action.type === 'expire-round') {
            if (game.phase !== 'describing' || now < turn.startedAt || (action.type === 'expire-round' ? !Number.isFinite(turn.deadline) || now < turn.deadline : !reviewer)) return;
            game.phase = 'selecting'; game.roundActive = false;
        } else if (action.type === 'assign-word') {
            if (!reviewer || game.phase !== 'selecting' || !indexValid || (action.playerId !== '' && !turn.guesserIds.includes(action.playerId))) return;
            if (!action.playerId) delete turn.awards[action.index];
            else {
                const chosen = new Set(turn.awards[action.index] || []);
                const selected = typeof action.selected === 'boolean' ? action.selected : !chosen.has(action.playerId);
                if (selected) chosen.add(action.playerId); else chosen.delete(action.playerId);
                if (chosen.size) turn.awards[action.index] = turn.guesserIds.filter(id => chosen.has(id)); else delete turn.awards[action.index];
            }
        } else if (['send-clue', 'send-guess'].includes(action.type)) {
            if (party.format !== 'text' || !live || !indexValid || action.index !== turn.activeIndex || turn.awards[action.index] || turn.skipped[action.index]) return;
            const clue = action.type === 'send-clue';
            if (clue ? !speaker : !turn.guesserIds.includes(actor.playerId)) return;
            if (!cleanText(action.text, clue ? 180 : 80) || typeof action.messageId !== 'string' || !/^[\w-]{1,64}$/.test(action.messageId)
                || turn.messages.some(m => m.messageId === action.messageId)) return;
            if (turn.messages.filter(m => m.index === action.index && m.playerId === actor.playerId && m.kind === (clue ? 'clue' : 'guess')).length >= (clue ? 6 : 4)) return;
            turn.messages.push({ messageId: action.messageId, seq: turn.messages.length + 1, index: action.index, kind: clue ? 'clue' : 'guess', playerId: actor.playerId, text: action.text.trim(), at: now });
        } else if (action.type === 'award-guess') {
            if (!speaker || !live || party.format !== 'text') return;
            const guess = turn.messages.find(m => m.messageId === action.messageId && m.kind === 'guess' && m.index === turn.activeIndex);
            if (!guess || turn.awards[guess.index]) return;
            turn.awards[guess.index] = [guess.playerId]; advanceWord(game);
        } else if (action.type === 'focus-word' || action.type === 'skip-word') {
            if (!speaker || !live || party.format !== 'text' || !indexValid || turn.awards[action.index]) return;
            if (action.type === 'skip-word') { if (action.index !== turn.activeIndex) return; turn.skipped[action.index] = true; advanceWord(game); }
            else { turn.activeIndex = action.index; delete turn.skipped[action.index]; }
        } else if (action.type === 'submit-round') {
            if (!reviewer || game.phase !== 'selecting') return;
            const awards = Object.fromEntries(Object.entries(turn.awards).map(([index, ids]) => [index, [...new Set(ids)].filter(id => turn.guesserIds.includes(id))])
                .filter(([index, ids]) => Number.isInteger(Number(index)) && Number(index) >= 0 && Number(index) < turn.words.length && ids.length));
            const earned = Object.keys(awards).length;
            for (const ids of Object.values(awards)) for (const id of ids) party.players.find(p => p.id === id).points++;
            if (game.settings.tableScoring !== 'guesser') party.players[turn.speakerIndex].points += earned;
            party.players[turn.speakerIndex].turns++;
            party.history.push({ turnId: turn.id, speakerId: turn.speakerId, earned, wordCount: turn.words.length, words: [...turn.words], awards });
            game.roundReview = { turnId: turn.id, teamIndex: 0, words: [...turn.words], selectedIndexes: Object.keys(awards).map(Number), awards };
            nextTurn(game, (turn.speakerIndex + 1) % party.players.length);
        } else return;
    }
    game.gameState = game.phase === 'finished' ? 'finished' : game.phase === 'waiting' ? 'waiting' : 'resumed';
    if (game.phase === 'finished') game.endedAt = now;
    return game;
}
export function tableView(data, actor, now, { player, active, people, connectedIds }) {
    const game = tableSnapshot(data), turn = game.turn, party = game.party;
    const participant = party?.players.find(p => p.id === actor.playerId && !p.departed), speaker = active && Boolean(participant) && turn?.speakerId === actor.playerId;
    const host = active && actor.playerId === game.hostId, reviewer = active && (connectedIds.includes(turn?.speakerId) ? speaker : host);
    const countdownRemainingMs = game.phase === 'describing' ? Math.max(0, turn.startedAt - now) : 0;
    const live = game.phase === 'describing' && !countdownRemainingMs && (!Number.isFinite(turn.deadline) || now < turn.deadline);
    const roster = { connectedPlayers: connectedIds.length, connectedTeams: 0, reconnectingPlayers: people.length - connectedIds.length,
        eligible: game.isGameStarted ? available(game, people).filter(p => connectedIds.includes(p.id)).length >= 3 : connectedIds.length >= 3 && connectedIds.length <= MAX_PLAYERS };
    return { player, active, host, speaker, reviewer, participant, roster, countdownRemainingMs, smallGame: false,
        canStartGame: host && !game.isGameStarted && roster.eligible, canStartRound: speaker && game.phase === 'idle' && roster.eligible,
        canSelect: reviewer && game.phase === 'selecting', canEndRound: reviewer && game.phase === 'describing' && !countdownRemainingMs,
        canGuess: active && party?.format === 'text' && live && turn.guesserIds.includes(actor.playerId),
        canClue: speaker && party?.format === 'text' && live,
        showWords: active && (game.phase === 'selecting' || speaker && live),
        remainingSeconds: game.phase === 'describing' && Number.isFinite(turn.deadline) ? Math.max(0, Math.ceil((turn.deadline - Math.max(now, turn.startedAt)) / 1000)) : null };
}
