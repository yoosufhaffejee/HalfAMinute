import { CASE_CONTENT } from './case-content.js?v=20261030.reconstruction1';
import { CASE_VOCABULARY } from './case-vocabulary.js?v=20261030.reconstruction1';
export const CASES = Object.fromEntries(Object.entries(CASE_CONTENT).map(([id, story]) => [id, {
    ...story,
    leads: story.leads.map(source => ({ ...source, facts: source.facts.map(item => ({
        ...item, code: item.id.toUpperCase(), ...CASE_VOCABULARY[id][item.id]
    })) }))
}]));
export const CASE_IDS = Object.keys(CASES);
export function caseFacts(id) {
    return CASES[id].leads.flatMap(source => source.facts.map(item => ({ ...item, leadId: source.id })));
}
export function availableFacts(id, found = [], leadId) {
    return caseFacts(id).filter(item => (!leadId || item.leadId === leadId) && !found.includes(item.id)
        && item.requires.every(key => found.includes(key)));
}
export function caseFields(id) {
    const story = CASES[id];
    return [['suspect', 'Who was responsible?', story.people.map(p => `${p.name} · ${p.role}`)],
        ['method', story.methodQuestion, story.methods], ['destination', story.destinationQuestion, story.destinations]];
}
// Final confirmations cover the whole shared draft, including another client's edits.
export function caseSubmission(game) {
    const party = game.party || {};
    return { suspect: party.theory?.suspect ?? -1, method: party.theory?.method ?? -1,
        destination: party.theory?.destination ?? -1, timeline: [...(party.timeline || [])],
        proof: [party.proof?.[0] || '', party.proof?.[1] || ''] };
}
export function sameCaseSubmission(left, right) {
    return Boolean(right) && ['suspect', 'method', 'destination'].every(key => left[key] === right[key])
        && ['timeline', 'proof'].every(key => Array.isArray(right[key]) && left[key].length === right[key].length
            && left[key].every((value, index) => value === right[key][index]));
}
export function caseAssessment(id, submission, found = []) {
    const story = CASES[id], result = {};
    for (const field of ['suspect', 'method', 'destination']) result[field] = submission[field] === story.solution[field];
    result.timeline = Array.isArray(submission.timeline) && submission.timeline.length === story.chronology.order.length
        && story.chronology.order.every((key, index) => submission.timeline[index] === key);
    const pair = submission.proof || [];
    result.connection = pair.length === 2 && pair[0] !== pair[1] && pair.every(key => found.includes(key))
        && story.connection.pairs.some(accepted => accepted.every(key => pair.includes(key)));
    result.solved = Object.values(result).every(Boolean);
    return result;
}
