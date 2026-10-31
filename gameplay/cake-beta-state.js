// A separate prototype. The original Case Files reducer/content is unchanged.
import { actCase, caseSnapshot, reconcileCase, caseView } from './case-state.js?v=20261031.beta1';
import { caseStory } from './cases.js?v=20261031.beta1';

export const BETA_PUZZLES = [
    { title: 'The folded note', cost: 2, icon: '✉', hints: ['The skirt is made of fabric.', 'Look for furniture with four legs and a tablecloth.'] },
    { title: 'Dani’s photographs', cost: 2, icon: '📷', hints: ['The decoration tells you which cake you are looking at.', 'Compare the ribbons. Blue is real; gold belongs to the foam display.'] },
    { title: 'The missing minutes', cost: 2, icon: '🕯', hints: ['The later photo must still show a cake. Leave the display behind.', 'Leave the foam display, lower the cloth, and use the trolley.'] }
];
export function betaSnapshot(data) {
    const g = caseSnapshot(data);
    if (g.party?.beta) {
        const b = g.party.beta;
        g.party.beta = { ...b, opened: b.opened || {}, solved: b.solved || {}, hints: b.hints || {},
            experiment: b.experiment || { prop: 'real', transport: 'hand', cloth: 'up' },
            theory: b.theory || { suspect: -1, destination: -1 } };
    }
    return g;
}
function prepare(g) {
    if (g?.party && g.phase === 'idle') g.turn.leadId = caseStory(g).leads[g.party.history.length % 3].id;
    return g;
}
export function reconcileBeta(g, people, connectedIds) { Object.assign(g, betaSnapshot(g)); reconcileCase(g, people, connectedIds); prepare(g); }
export function actBeta(data, actor, action, now, rules, context) {
    let g = betaSnapshot(structuredClone(data));
    if (typeof action.type !== 'string') return;
    if ((action.matchId ?? 1) !== (g.matchId ?? 1) || g.wordPack || action.turnId !== g.turn?.id && !['start-game','rematch'].includes(action.type)) return;
    if (['start-game','rematch'].includes(action.type)) {
        g = actCase(g, actor, { ...action, caseId: 'cake' }, now, rules, context);
        if (!g) return;
        g.party.beta = { points: 0, opened: {}, solved: {}, hints: {}, revision: 0, feedback: '',
            experiment: { prop: 'real', transport: 'hand', cloth: 'up' }, theory: { suspect: -1, destination: -1 } };
        g.phase = 'briefing';
        return g;
    }
    const b = g.party?.beta, host = actor.playerId === g.hostId;
    if (!b) return;
    if (action.type === 'beta-begin') {
        if (!host || g.phase !== 'briefing' || action.revision !== b.revision) return;
        b.revision++; g.phase = 'idle'; g.gameState = 'resumed';
        reconcileBeta(g, context.people, context.connectedIds);
        return prepare(g);
    }
    const member = context.connectedIds.includes(actor.playerId) && g.party.players.some(p => p.id === actor.playerId && !p.departed);
    const board = member && ['idle','waiting','evidence','accusing'].includes(g.phase);
    if (action.type.startsWith('beta-')) {
        if (!board || action.revision !== b.revision) return;
        const i = action.index, puzzle = Number.isInteger(i) && BETA_PUZZLES[i];
        if (action.type === 'beta-buy' || action.type === 'beta-hint') {
            if (!puzzle || b.solved[i] || b.points < 2) return;
            if (action.type === 'beta-buy') {
                if (b.opened[i] || i > 0 && !b.solved[i-1]) return;
                b.opened[i] = true; b.feedback = '';
            } else {
                if (!b.opened[i] || (b.hints[i] || 0) >= puzzle.hints.length) return;
                b.hints[i] = (b.hints[i] || 0) + 1; b.feedback = 'A new hint is ready.';
            }
            b.points -= 2;
        } else if (action.type === 'beta-answer') {
            if (![0,1].includes(i) || !b.opened[i] || b.solved[i] || typeof action.answer !== 'string') return;
            const allowed = i === 0 ? ['table','door','garden','camera'] : ['ribbon','candles','stand'];
            if (!allowed.includes(action.answer)) return;
            if (action.answer === (i === 0 ? 'table' : 'ribbon')) {
                b.solved[i] = true; b.feedback = i === 0 ? 'Found it! Wheel marks and a torn apron patch were under the table.' : 'A switch! The later picture shows the foam display, not the real cake.';
            } else b.feedback = i === 0 ? 'That does not fit all three parts of the riddle. Try another spot.' : 'That detail stayed the same. Look for something that changed.';
        } else if (action.type === 'beta-experiment') {
            if (!b.opened[2] || b.solved[2] || !Object.hasOwn({ prop: ['real','foam'], transport: ['hand','trolley'], cloth: ['up','down'] }, action.field)) return;
            const choices = { prop: ['real','foam'], transport: ['hand','trolley'], cloth: ['up','down'] };
            if (!choices[action.field].includes(action.value)) return;
            b.experiment[action.field] = action.value; b.feedback = '';
        } else if (action.type === 'beta-test') {
            if (!b.opened[2] || b.solved[2]) return;
            const e = b.experiment;
            if (e.prop !== 'foam') b.feedback = 'The real cake is still on the table. Try leaving the display there instead.';
            else if (e.transport !== 'trolley') b.feedback = 'An uncovered cake carried through the door would have been seen. Try the lower route.';
            else if (e.cloth !== 'down') b.feedback = 'The trolley is visible. What could hide it under the table?';
            else { b.solved[2] = true; b.feedback = 'It works! The trolley rolls out under cover. Follow the icing trail to its last stop.'; }
        } else if (action.type === 'beta-review') {
            if (!host || !g.party.history.length || ![0,1,2].every(k=>b.solved[k]) && g.party.history.length < g.settings.caseTurns) return;
            b.returnPhase = g.phase === 'accusing' ? 'evidence' : g.phase; g.phase = 'accusing';
        } else if (action.type === 'beta-back') {
            if (!host || g.phase !== 'accusing') return;
            g.phase = g.party.history.length >= g.settings.caseTurns ? 'evidence' : b.returnPhase || 'evidence';
        } else if (action.type === 'beta-theory') {
            if (!host || g.phase !== 'accusing' || !['suspect','destination'].includes(action.field) || !Number.isInteger(action.index)
                || action.index < -1 || action.index >= (action.field === 'suspect' ? 6 : 3)) return;
            b.theory[action.field] = action.index;
        } else if (action.type === 'beta-accuse') {
            const draft = action.theory;
            if (!host || g.phase !== 'accusing' || !g.party.history.length || !draft || draft.revision !== b.revision
                || draft.suspect !== b.theory.suspect || draft.destination !== b.theory.destination
                || !Number.isInteger(draft.suspect) || draft.suspect < 0 || draft.suspect > 5
                || !Number.isInteger(draft.destination) || draft.destination < 0 || draft.destination > 2) return;
            const solution = caseStory(g).solution;
            b.assessment = { suspect: draft.suspect === solution.suspect, destination: draft.destination === solution.destination,
                discoveries: [0,1,2].every(k=>b.solved[k]) };
            g.phase = 'finished'; g.roundActive = false; g.endedAt = now;
            g.finishReason = Object.values(b.assessment).every(Boolean) ? 'solved' : 'unsolved';
        } else return;
        b.revision++; g.gameState = g.phase === 'finished' ? 'finished' : 'resumed'; return g;
    }
    if (!['start-round','end-round','expire-round','toggle-answer','submit-round','continue-case','end-game','reveal-case'].includes(action.type)) return;
    g = actCase(g, actor, action, now, rules, context);
    if (g && action.type === 'submit-round') {
        g.party.beta.points += g.turn.selectedIndexes.length;
        g.party.beta.feedback = `${g.turn.selectedIndexes.length} correct · ${g.turn.selectedIndexes.length} search points earned.`;
        g.party.found = []; g.party.discoveries = []; g.party.beta.revision++;
    }
    return prepare(g);
}
export function betaView(data, actor, now, context) {
    const g = betaSnapshot(data), view = caseView(g, actor, now, context);
    return { ...view, canStartRound: view.canStartRound && (g.party?.history.length || 0) < g.settings.caseTurns,
        canExplore: view.active && Boolean(view.participant) && ['idle','waiting','evidence','accusing'].includes(g.phase) };
}
