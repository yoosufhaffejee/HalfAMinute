import { normalizeOnlinePack } from './online-packs.js?v=20261029.3';
import { normalizeTopics } from './ai-packs.js?v=20261029.5';

export const SAVED_PACKS_KEY = 'half_a_minute_saved_packs_v1';
export const SAVED_PACK_LIMIT = 12;

export function readPacks(storage) {
    try {
        const value = JSON.parse(storage.getItem(SAVED_PACKS_KEY) || '[]');
        if (!Array.isArray(value)) return [];
        return value.slice(0, SAVED_PACK_LIMIT).flatMap(item => {
            try {
                if (typeof item.id !== 'string' || typeof item.name !== 'string' || !item.name.trim() || item.name.length > 60) return [];
                return [{ id: item.id, name: item.name, topics: normalizeTopics(item.topics ?? [String(item.topic || '').slice(0, 240)], { allowEmpty: true }), strict: item.strict === true,
                    difficulty: ['normal', 'easy', 'hard'].includes(item.difficulty) ? item.difficulty : 'normal',
                    entries: normalizeOnlinePack({ kind: 'custom', entries: item.entries }).entries }];
            } catch { return []; }
        });
    } catch { return []; }
}

// Storage failure is explicit; it must never wipe the editor or its usable pack.
export function savePack(storage, pack) {
    const name = String(pack.name || '').trim().slice(0, 60);
    if (!name) throw new Error('Name this pack first.');
    const entries = normalizeOnlinePack({ kind: 'custom', entries: pack.entries }).entries;
    const all = readPacks(storage), match = all.find(item => item.name.toLowerCase() === name.toLowerCase());
    const existing = all.filter(item => item !== match);
    if (!match && existing.length >= SAVED_PACK_LIMIT) throw new Error('Your library is full. Delete a saved pack before adding another.');
    const saved = { id: match?.id || String(pack.id), name, entries,
        topics: normalizeTopics(pack.topics ?? [String(pack.topic || '')], { allowEmpty: true }), strict: pack.strict === true,
        difficulty: ['normal', 'easy', 'hard'].includes(pack.difficulty) ? pack.difficulty : 'normal' };
    storage.setItem(SAVED_PACKS_KEY, JSON.stringify([saved, ...existing]));
    return saved;
}

export function deletePack(storage, id) {
    storage.setItem(SAVED_PACKS_KEY, JSON.stringify(readPacks(storage).filter(item => item.id !== id)));
}
