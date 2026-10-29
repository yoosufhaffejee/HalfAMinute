// Shared, deterministic rules. No browser, storage, clock or network access.
// The spoken countdown clip is 4.344s; leave it a small lead-out before clues.
export const ROUND_COUNTDOWN_MS = 4500;
export function countdownLabel(remainingMs) {
    const beat = Math.max(0, Math.min(3, Math.ceil(remainingMs / (ROUND_COUNTDOWN_MS / 4)) - 1));
    return beat ? String(beat) : 'Go!';
}
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

export function completedTurns(events, teamCount) {
    const counts = Array(teamCount).fill(0);
    for (const event of events) if (Number.isInteger(event?.teamIndex) && event.teamIndex >= 0 && event.teamIndex < teamCount) counts[event.teamIndex]++;
    return counts;
}

export function scoreLeaders(points) {
    const highest = Math.max(...points);
    return points.flatMap((score, index) => score === highest ? [index] : []);
}

export function normalizeWinRule(value) { return value === 'first-to-target' ? value : 'equal-turns'; }
export function winRuleLabel(value) { return normalizeWinRule(value) === 'first-to-target' ? 'First to target' : 'Equal turns'; }

export function matchProgress(points, target, events, finalTurnCount = null, winRule = 'equal-turns') {
    const turns = completedTurns(events, points.length);
    if (normalizeWinRule(winRule) === 'first-to-target') {
        const finished = points.some(score => score >= target);
        return { turns, finalTurnCount: null, pendingTeams: [], finished, winners: finished ? scoreLeaders(points) : [] };
    }
    // Once triggered, the final round remains sealed even if a Chaos steal lowers a score.
    if (!finalTurnCount && points.some(score => score >= target)) finalTurnCount = Math.max(1, ...turns);
    const pendingTeams = finalTurnCount ? turns.flatMap((count, index) => count < finalTurnCount ? [index] : []) : [];
    const finished = Boolean(finalTurnCount && !pendingTeams.length);
    return { turns, finalTurnCount, pendingTeams, finished, winners: finished ? scoreLeaders(points) : [] };
}

export function finalRoundMessage(progress) {
    if (!progress.finalTurnCount || progress.finished) return '';
    if (progress.pendingTeams.length === 1) {
        const index = progress.pendingTeams[0], remaining = progress.finalTurnCount - progress.turns[index];
        return `Final round. Team ${index + 1} has ${remaining === 1 ? 'one turn' : remaining + ' turns'} left. Highest score wins.`;
    }
    const names = progress.pendingTeams.map(index => index + 1);
    return `Final round. Teams ${names.slice(0, -1).join(', ')} and ${names.at(-1)} still have turns. Highest score wins.`;
}

export function resolutionTiming(hasEffect, won = false, moveCount = 5) {
    // Let the board settle, reveal its map, then keep the existing movement/effect pace.
    const boardMs = 350, revealMs = 450;
    const moveMs = Math.max(1000, Math.min(15, Math.max(0, Number(moveCount) || 0)) * 360 + 300);
    const landingMs = hasEffect && !won ? 1400 : 0;
    const effectMs = hasEffect && !won ? 1400 : 0;
    const resultMs = hasEffect && !won ? 2400 : won ? 2000 : 1600;
    return { boardMs, revealMs, moveMs, landingMs, effectMs, resultMs,
        durationMs: boardMs + revealMs + moveMs + landingMs + effectMs + resultMs };
}

export function resolutionDuration(hasEffect, won = false, moveCount = 5) {
    return resolutionTiming(hasEffect, won, moveCount).durationMs;
}

export function effectMessage(effect) {
    if (!effect) return '';
    if (typeof effect === 'string') return /^(no effect|no powerup)$/i.test(effect) ? '' : effect;
    if (effect.blockedByShield) return 'Your shield blocked the hit!';
    switch (effect.type) {
        case 'plus1': return 'Bonus point!';
        case 'plus2': return 'Two bonus points!';
        case 'minus1': case 'minus2': return `Slipped back ${Math.abs(effect.actorDelta)} ${Math.abs(effect.actorDelta) === 1 ? 'space' : 'spaces'}.`;
        case 'bomb': return `Bomb! Back ${Math.abs(effect.actorDelta)} ${Math.abs(effect.actorDelta) === 1 ? 'space' : 'spaces'}.`;
        case 'shield': return effect.shieldAlreadyReady ? 'Your shield is still ready.' : 'Shield ready for the next hit!';
        case 'steal1': return effect.victimBlocked ? `Bonus point! Team ${effect.victimTeamIndex + 1}'s shield protected them.`
            : effect.victimDelta < 0 ? `Stole a point from Team ${effect.victimTeamIndex + 1}!` : 'Bonus point!';
        default: return '';
    }
}

export function recap({ teamIndex, earned, effect = null }) {
    const score = `Team ${teamIndex + 1} scored ${earned} ${earned === 1 ? 'point' : 'points'}.`;
    const extra = effectMessage(effect);
    return extra ? `${score} ${extra}` : score;
}
