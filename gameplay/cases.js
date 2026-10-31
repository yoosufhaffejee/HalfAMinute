import { CASE_CONTENT } from './case-content.js?v=20261031.beta1';
import { CASE_VOCABULARY } from './case-vocabulary.js?v=20261031.beta1';
import { PARTY_CASES } from './case-party-content.js?v=20261031.beta1';
import { SCENARIO_IDS, buildCaseVariant } from './case-variants.js?v=20261031.beta1';
export const CASE_DIFFICULTIES = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
const ratings = { museum: 'medium', train: 'medium', encore: 'hard', bank: 'hard', observatory: 'hard' };
export const CASES = Object.fromEntries(Object.entries({ ...PARTY_CASES, ...CASE_CONTENT }).map(([id, story]) => [id, {
    ...story, difficulty: story.difficulty || ratings[id],
    leads: story.leads.map(source => ({ ...source, facts: source.facts.map(item => ({
        ...item, code: item.id.toUpperCase(), ...CASE_VOCABULARY[id][item.id]
    })) }))
}]));
const rank = { easy: 0, medium: 1, hard: 2 };
export const CASE_IDS = Object.keys(CASES).sort((a,b) => rank[CASES[a].difficulty] - rank[CASES[b].difficulty]);
export function caseOptionLabel(id) { return `${CASE_DIFFICULTIES[CASES[id].difficulty]} · ${CASES[id].title}`; }
const scenarios = new Map();
export function caseStory(input, scenarioId) {
    const id = typeof input === 'string' ? input : input.settings.caseId;
    const variant = scenarioId || (typeof input === 'object' ? input.party?.scenarioId : '') || 'original';
    if(!CASES[id] || !SCENARIO_IDS.includes(variant))throw new Error('Unknown case scenario');
    const key=id+':'+variant;
    if(!scenarios.has(key))scenarios.set(key,buildCaseVariant(CASES[id],id,variant));
    return scenarios.get(key);
}
export function caseScenarioIds() { return [...SCENARIO_IDS]; }
export function chooseCaseScenario(seed, previous) {
    const choices=SCENARIO_IDS.filter(id=>id!==previous);
    return choices[seed % choices.length];
}
export function caseFacts(id) {
    return caseStory(id).leads.flatMap(source => source.facts.map(item => ({ ...item, leadId: source.id })));
}
export function availableFacts(id, found = [], leadId) {
    return caseFacts(id).filter(item => (!leadId || item.leadId === leadId) && !found.includes(item.id)
        && item.requires.every(key => found.includes(key)));
}
export function caseFields(id) {
    const story = caseStory(id);
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
    const story = caseStory(id), result = {};
    for (const field of ['suspect', 'method', 'destination']) result[field] = submission[field] === story.solution[field];
    result.timeline = Array.isArray(submission.timeline) && submission.timeline.length === story.chronology.order.length
        && story.chronology.order.every((key, index) => submission.timeline[index] === key);
    const pair = submission.proof || [];
    result.connection = pair.length === 2 && pair[0] !== pair[1] && pair.every(key => found.includes(key))
        && story.connection.pairs.some(accepted => accepted.every(key => pair.includes(key)));
    result.solved = Object.values(result).every(Boolean);
    return result;
}
// Failed results repeat only the player's confirmed answers, never authored solutions.
export function caseFeedback(game) {
    const id = game, story = caseStory(game), submission = caseSubmission(game), assessment = game.party.assessment || {};
    const labels = { suspect: 'Who', method: 'How', destination: 'Where' };
    const parts = caseFields(id).map(([key,,options]) => ({ key, label: labels[key], correct: Boolean(assessment[key]),
        answer: assessment[key] ? options[submission[key]] : '' }));
    parts.push({ key: 'timeline', label: 'Timeline', correct: Boolean(assessment.timeline),
        answer: assessment.timeline ? submission.timeline.map(key => story.chronology.events.find(event => event.id === key)?.label).join(' → ') : '' });
    parts.push({ key: 'connection', label: 'Evidence link', correct: Boolean(assessment.connection),
        answer: assessment.connection ? submission.proof.map(key => caseFacts(id).find(fact => fact.id === key)?.title).join(' + ') : '' });
    return parts;
}
export function confirmedCasePart(game, key) {
    const known = game.party.confirmedParts || {}, submission = caseSubmission(game);
    if (key === 'timeline') return Array.isArray(known.timeline) && known.timeline.length === submission.timeline.length
        && known.timeline.every((value, index) => value === submission.timeline[index]);
    if (key === 'connection') return Array.isArray(known.connection) && known.connection.length === 2
        && known.connection.every(value => submission.proof.includes(value));
    return Object.hasOwn(known, key) && known[key] === submission[key];
}
