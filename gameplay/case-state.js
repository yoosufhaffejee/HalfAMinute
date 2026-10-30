import { ROUND_COUNTDOWN_MS, random, answerKey } from './rules.js?v=20261030.2';
import { CASES, CASE_IDS, caseFacts, availableFacts } from './cases.js?v=20261030.cases1';
import { normalizeModeSettings } from './modes.js?v=20261030.cases1';

export function caseSnapshot(data) {
    return { ...data, ...(data.party ? { party: { ...data.party, players: data.party.players || [], history: data.party.history || [], found: data.party.found || [], discoveries: data.party.discoveries || [] } } : {}),
        ...(data.turn ? { turn: { ...data.turn, words: data.turn.words || [], selectedIndexes: data.turn.selectedIndexes || [], caseFactIds: data.turn.caseFactIds || [] } } : {}) };
}
const participants = (g, people) => g.party.players.filter(p => !p.departed && people.some(member => member.playerId === p.id));
function nextTurn(g, preferred) {
    for (let offset = 0; offset < g.party.players.length; offset++) {
        const index = (preferred + offset) % g.party.players.length, player = g.party.players[index];
        if (player.departed) continue;
        g.turn = { id: (g.turn?.id || 0) + 1, speakerId: player.id, speakerIndex: index, leadId: '', words: [], selectedIndexes: [], caseFactIds: [] };
        g.phase = 'idle'; g.roundActive = false; return;
    }
    g.phase = 'finished'; g.finishReason = 'stopped'; g.roundActive = false;
}
export function reconcileCase(g, people, connectedIds) {
    Object.assign(g, caseSnapshot(g));
    if (!g.isGameStarted || !g.party) { g.phase = connectedIds.length >= 2 && connectedIds.length <= 12 ? 'ready' : 'waiting'; return; }
    if (['finished', 'ended'].includes(g.phase)) return;
    for (const p of people) if (!g.party.players.some(member => member.id === p.playerId)) g.party.players.push({ id: p.playerId, name: p.playerName, points: 0, turns: 0 });
    for (const p of g.party.players) p.departed = !people.some(member => member.playerId === p.id);
    const speaker = g.party.players.find(p => p.id === g.turn.speakerId);
    if (speaker?.departed && ['idle', 'waiting', 'describing'].includes(g.phase)) nextTurn(g, (g.turn.speakerIndex + 1) % g.party.players.length);
    if (['idle', 'waiting'].includes(g.phase)) g.phase = participants(g, people).filter(p => connectedIds.includes(p.id)).length >= 2 && connectedIds.includes(g.turn.speakerId) ? 'idle' : 'waiting';
}
export function actCase(data, actor, action, now, rules, { people, connectedIds }) {
    const g = caseSnapshot(structuredClone(data)), host = actor.playerId === g.hostId;
    g.settings = normalizeModeSettings(g.settings);
    if ((action.matchId ?? 1) !== (g.matchId ?? 1) || g.wordPack) return;
    if (action.type === 'start-game' || action.type === 'rematch') {
        if (!host || !Number.isInteger(action.seed) || action.seed < 0 || action.seed > 0xFFFFFFFF) return;
        if (action.type === 'rematch' ? g.phase !== 'finished' : g.isGameStarted || !['ready', 'waiting'].includes(g.phase)) return;
        const roster = people.filter(p => connectedIds.includes(p.playerId)).sort((a, b) => g.localPlayerOrder ? g.localPlayerOrder.indexOf(a.playerId) - g.localPlayerOrder.indexOf(b.playerId) : (a.joinedAt || 0) - (b.joinedAt || 0) || a.playerName.localeCompare(b.playerName));
        if (roster.length < 2 || roster.length > 12) return;
        if (action.type === 'rematch') {
            const nextCase = action.caseId || CASE_IDS[(CASE_IDS.indexOf(g.settings.caseId) + 1) % CASE_IDS.length];
            if (!CASES[nextCase]) return;
            g.settings.caseId = nextCase;
        }
        const previous = roster.findIndex(p => p.playerId === g.party?.starterId), starter = previous >= 0 ? (previous + 1) % roster.length : Math.floor(random(action.seed)() * roster.length);
        g.matchId = action.type === 'rematch' ? (g.matchId || 1) + 1 : g.matchId || 1;
        g.party = { starterId: roster[starter].playerId, players: roster.map(p => ({id:p.playerId,name:p.playerName,points:0,turns:0})), history: [], found: [], discoveries: [], totalCorrect: 0, hintUsed: false, theory: { suspect: -1, method: -1, destination: -1 } };
        g.caseWordUses = {}; g.roundReview = null; g.reactions = null; g.finishReason = null; g.endedAt = null; g.auditEvents = {}; g.auditEvent = null;
        g.isGameStarted = true; nextTurn(g, starter);
    } else if (action.type === 'end-game') {
        if (!host || g.phase === 'finished') return;
        g.phase = 'finished'; g.finishReason = 'stopped'; g.roundActive = false;
    } else {
        const party = g.party, turn = g.turn;
        if (!party || !turn || action.turnId !== turn.id) return;
        const speaker = actor.playerId === turn.speakerId, reviewer = connectedIds.includes(turn.speakerId) ? speaker : host;
        const facts = caseFacts(g.settings.caseId), budgetOver = party.history.length >= g.settings.caseTurns || party.found.length === facts.length;
        if (action.type === 'choose-lead') {
            if (!speaker || g.phase !== 'idle' || !availableFacts(g.settings.caseId, party.found, action.leadId).length || !CASES[g.settings.caseId].leads.some(l => l.id === action.leadId)) return;
            turn.leadId = action.leadId;
        } else if (action.type === 'start-round') {
            if (!speaker || g.phase !== 'idle' || participants(g, people).filter(p => connectedIds.includes(p.id)).length < 2 || budgetOver
                || !turn.leadId || !Number.isInteger(action.seed) || action.seed < 0 || action.seed > 0xFFFFFFFF) return;
            const draw = rules.drawWords?.(g, action.seed), eligible = availableFacts(g.settings.caseId, party.found, turn.leadId);
            if (!draw?.words?.length || draw.words.length > g.settings.numWords || draw.caseFactIds?.length !== draw.words.length || new Set(draw.words.map(answerKey)).size !== draw.words.length) return;
            if (!draw.words.every((word, i) => eligible.some(f => f.id === draw.caseFactIds[i] && f.words.some(w => answerKey(w) === answerKey(word))))) return;
            Object.assign(g, draw.pools); turn.words = draw.words; turn.caseFactIds = draw.caseFactIds; turn.selectedIndexes = [];
            turn.countdownAt = now; turn.startedAt = now + ROUND_COUNTDOWN_MS; turn.deadline = turn.startedAt + g.settings.numSeconds * 1000;
            g.phase = 'describing'; g.roundActive = true; g.roundReview = null; g.reactions = null; party.discoveries = [];
        } else if (action.type === 'end-round' || action.type === 'expire-round') {
            if (g.phase !== 'describing' || now < turn.startedAt || (action.type === 'end-round' ? !reviewer : now < turn.deadline)) return;
            g.phase = 'selecting'; g.roundActive = false;
        } else if (action.type === 'toggle-answer') {
            if (!reviewer || g.phase !== 'selecting' || !Number.isInteger(action.index) || action.index < 0 || action.index >= turn.words.length) return;
            const selected = new Set(turn.selectedIndexes); if (selected.has(action.index)) selected.delete(action.index); else selected.add(action.index);
            turn.selectedIndexes = [...selected].sort((a,b) => a-b);
        } else if (action.type === 'submit-round') {
            if (!reviewer || g.phase !== 'selecting') return;
            const discoveries = [...new Set(turn.selectedIndexes.map(i => turn.caseFactIds[i]))].filter(id => !party.found.includes(id));
            party.found.push(...discoveries); party.discoveries = discoveries; party.totalCorrect += turn.selectedIndexes.length; party.players[turn.speakerIndex].turns++;
            party.history.push({ turnId:turn.id, speakerId:turn.speakerId, leadId:turn.leadId, words:[...turn.words], correct:[...turn.selectedIndexes], earned:turn.selectedIndexes.length, wordCount:turn.words.length, discoveries });
            g.roundReview = { turnId:turn.id, teamIndex:0, words:[...turn.words], selectedIndexes:[...turn.selectedIndexes] }; g.phase = 'evidence';
        } else if (action.type === 'continue-case') {
            if (!reviewer || g.phase !== 'evidence') return;
            if (budgetOver) { party.returnPhase = ''; g.phase = 'accusing'; } else nextTurn(g, (turn.speakerIndex + 1) % party.players.length);
        } else if (action.type === 'open-theory') {
            if (!host || !['idle', 'waiting', 'evidence'].includes(g.phase) || !party.history.length) return;
            party.returnPhase = budgetOver ? '' : g.phase; g.phase = 'accusing';
        } else if (action.type === 'resume-case') {
            if (!host || g.phase !== 'accusing' || !party.returnPhase || budgetOver) return;
            g.phase = party.returnPhase; party.returnPhase = '';
        } else if (action.type === 'case-hint') {
            if (!host || !['idle','waiting','evidence','accusing'].includes(g.phase) || party.history.length < 2 || party.hintUsed) return;
            party.hintUsed = true;
        } else if (action.type === 'set-theory') {
            if (!host || g.phase !== 'accusing' || !['suspect','method','destination'].includes(action.field) || !Number.isInteger(action.index) || action.index < 0 || action.index >= (action.field === 'suspect' ? 6 : 3)) return;
            party.theory[action.field] = action.index;
        } else if (action.type === 'accuse') {
            if (!host || g.phase !== 'accusing' || !['suspect','method','destination'].every(f => party.theory[f] >= 0 && party.theory[f] === action.theory?.[f])) return;
            g.phase = 'finished'; g.finishReason = ['suspect','method','destination'].every(f => party.theory[f] === CASES[g.settings.caseId].solution[f]) ? 'solved' : 'unsolved';
        } else return;
    }
    g.gameState = g.phase === 'finished' ? 'finished' : g.phase === 'waiting' ? 'waiting' : 'resumed';
    if (g.phase === 'finished') g.endedAt = now;
    return g;
}
export function caseView(data, actor, now, { player, active, people, connectedIds }) {
    const g = caseSnapshot(data), party = g.party, turn = g.turn;
    const participant = party?.players.find(p => p.id === actor.playerId && !p.departed), speaker = active && Boolean(participant) && turn?.speakerId === actor.playerId;
    const host = active && actor.playerId === g.hostId, reviewer = active && (connectedIds.includes(turn?.speakerId) ? speaker : host);
    const countdownRemainingMs = g.phase === 'describing' ? Math.max(0, turn.startedAt - now) : 0;
    const roster = {connectedPlayers:connectedIds.length,connectedTeams:0,reconnectingPlayers:people.length-connectedIds.length,eligible:g.isGameStarted ? participants(g,people).filter(p=>connectedIds.includes(p.id)).length>=2 : connectedIds.length>=2&&connectedIds.length<=12};
    return {player,active,host,speaker,reviewer,participant,roster,countdownRemainingMs,smallGame:false,
        canStartGame:host&&!g.isGameStarted&&roster.eligible,canStartRound:speaker&&g.phase==='idle'&&roster.eligible&&Boolean(turn.leadId)&&availableFacts(g.settings.caseId,party.found,turn.leadId).length>0,
        canSelect:reviewer&&g.phase==='selecting',canEndRound:reviewer&&g.phase==='describing'&&!countdownRemainingMs,
        showWords:active&&(g.phase==='selecting'||speaker&&g.phase==='describing'&&!countdownRemainingMs),
        remainingSeconds:g.phase==='describing'?Math.max(0,Math.ceil((turn.deadline-Math.max(now,turn.startedAt))/1000)):0};
}
