// Shared, deterministic rules. No browser, storage, clock or network access.
export const PRESETS = {
    short: { pointsToWin: 10, numSeconds: 30, numWords: 5 },
    standard: { pointsToWin: 20, numSeconds: 30, numWords: 5 },
    long: { pointsToWin: 40, numSeconds: 30, numWords: 5 }
};

export function random(seed) {
    let t = Number(seed) >>> 0;
    return () => {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

export function answerKey(value) {
    return String(value || '').normalize('NFD').replace(/\p{M}/gu, '')
        .toLowerCase().replace(/^the\s+/, '').replace(/[^\p{L}\p{N}]/gu, '');
}

// Each difficulty has its own exhaustion cycle. Refilling easy never resets hard.
// Already-chosen answers are excluded even when a tiny pack has to recycle.
export function drawWords(objects, deck = {}, difficulty = 'normal', count = 5, seed = 0) {
    const unique = new Map();
    for (const entry of objects) {
        const key = answerKey(entry.word);
        if (key && !unique.has(key) && ['easy', 'hard'].includes(entry.difficulty)
            && (difficulty === 'normal' || entry.difficulty === difficulty)) unique.set(key, entry);
    }
    const pools = { easy: [], hard: [] }, seen = {}, rng = random(seed);
    for (const [key, entry] of unique) pools[entry.difficulty].push({ key, word: entry.word });
    for (const type of ['easy', 'hard']) seen[type] = new Set((deck[type] || []).filter(key => unique.has(key)));
    const chosen = [], keys = new Set(), recycled = new Set();
    const take = type => {
        let available = pools[type].filter(entry => !keys.has(entry.key) && !seen[type].has(entry.key));
        if (!available.length && pools[type].some(entry => !keys.has(entry.key))) {
            seen[type] = new Set([...keys].filter(key => pools[type].some(entry => entry.key === key)));
            recycled.add(type);
            available = pools[type].filter(entry => !keys.has(entry.key));
        }
        if (!available.length) return false;
        const entry = available[Math.floor(rng() * available.length)];
        chosen.push(entry.word); keys.add(entry.key); seen[type].add(entry.key);
        return true;
    };
    const easyCount = difficulty === 'hard' ? 0 : difficulty === 'easy' ? count : Math.ceil(count / 2);
    for (let i = 0; i < count; i++) {
        const type = i < easyCount ? 'easy' : 'hard';
        if (!take(type)) take(type === 'easy' ? 'hard' : 'easy');
    }
    for (let i = chosen.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
    }
    return { words: chosen, deck: { easy: [...seen.easy], hard: [...seen.hard] }, recycled: [...recycled] };
}

export function startingTeam(seed, teamCount, previous = null) {
    return previous === null ? Math.floor(random(seed)() * teamCount) : (previous + 1) % teamCount;
}

export function resolutionDuration(hasEffect, won = false) {
    return won ? 350 : hasEffect ? 2200 : 650;
}

export function recap({ teamIndex, earned, before, after, effect = 'No effect' }) {
    const net = after - before;
    return `Team ${teamIndex + 1}: ${earned} correct · +${earned} earned · ${effect} · net ${net >= 0 ? '+' : ''}${net} · ${after} points`;
}
