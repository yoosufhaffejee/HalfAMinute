import { answerKey, random } from './rules.js?v=20261030.2';
import { caseFacts, availableFacts } from './cases.js?v=20261030.cases1';

export function caseWordObjects(id, dictionary) {
    const registry = new Map();
    for (const entry of dictionary) if (!registry.has(answerKey(entry.word))) registry.set(answerKey(entry.word), entry);
    return caseFacts(id).flatMap(fact => fact.words.map(word => {
        const entry = registry.get(answerKey(word));
        if (!entry) throw new Error(`Missing case vocabulary: ${word}`);
        return { ...entry, caseFactId: fact.id };
    }));
}
export function drawCaseCard(game, seed, words) {
    const facts = availableFacts(game.settings.caseId, game.party.found, game.turn.leadId), ids = new Set(facts.map(f => f.id));
    const pool = words.filter(w => ids.has(w.caseFactId) && (game.settings.difficulty === 'normal' || w.difficulty === game.settings.difficulty));
    const rng = random(seed), uses = { ...(game.caseWordUses || {}) }, selected = [], selectedKeys = new Set(), perFact = {};
    for (let i = 0; i < game.settings.numWords; i++) {
        const wanted = game.settings.difficulty === 'normal' ? i < Math.ceil(game.settings.numWords / 2) ? 'easy' : 'hard' : game.settings.difficulty;
        let eligible = pool.filter(w => !selectedKeys.has(answerKey(w.word)) && w.difficulty === wanted);
        if (!eligible.length) eligible = pool.filter(w => !selectedKeys.has(answerKey(w.word)));
        if (!eligible.length) break;
        const leastDealt = Math.min(...eligible.map(w => perFact[w.caseFactId] || 0));
        eligible = eligible.filter(w => (perFact[w.caseFactId] || 0) === leastDealt);
        const leastUsed = Math.min(...eligible.map(w => uses[answerKey(w.word)] || 0));
        eligible = eligible.filter(w => (uses[answerKey(w.word)] || 0) === leastUsed);
        const item = eligible[Math.floor(rng() * eligible.length)], key = answerKey(item.word);
        selected.push(item); selectedKeys.add(key); perFact[item.caseFactId] = (perFact[item.caseFactId] || 0) + 1; uses[key] = (uses[key] || 0) + 1;
    }
    return { words: selected.map(w => w.word), caseFactIds: selected.map(w => w.caseFactId), pools: { caseWordUses: uses } };
}
