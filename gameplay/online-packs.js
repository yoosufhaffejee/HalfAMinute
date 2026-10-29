import { answerKey } from './rules.js?v=20261029.2';

export const ONLINE_PACK_LIMIT = 150;

function invalid(reason) {
    const error = new Error('invalid-word-pack'); error.reason = reason; throw error;
}

function label(value, limit) {
    if (typeof value !== 'string' || /[\r\n\t\p{Cc}<>]/u.test(value)) return '';
    const text = value.trim().replace(/\s+/g, ' ');
    return text.length <= limit && /[\p{L}\p{N}]/u.test(text) ? text : '';
}

// A lobby owns one bounded snapshot. Never consult a player's local editor or
// substitute built-in words when a shared pack is missing/malformed.
export function normalizeOnlinePack(value) {
    if (value == null) return null;
    if (value.kind !== 'custom' || !Array.isArray(value.entries) || !value.entries.length) invalid('empty');
    if (value.entries.length > ONLINE_PACK_LIMIT) invalid('count');
    const entries = [], seen = new Set();
    for (const entry of value.entries) {
        const word = label(entry?.word, 80), canonical = label(entry?.canonical, 96);
        if (!word || !canonical || !['easy', 'hard'].includes(entry?.difficulty)) invalid('entry');
        const keys = [answerKey(word), answerKey(canonical)];
        if (keys.some(key => seen.has(key))) continue;
        keys.forEach(key => seen.add(key)); entries.push({ word, canonical, difficulty: entry.difficulty });
    }
    if (!entries.length) invalid('empty');
    return { kind: 'custom', entries };
}
