// A best-effort device convenience, independent of the gameplay clock.
export function createScreenAwake(navigator, document) {
    let active = false, lock = null, pending = false;
    async function sync() {
        const wanted = active && document.visibilityState === 'visible';
        if (!wanted && lock) { const previous = lock; lock = null; try { await previous.release(); } catch { /* Optional. */ } }
        if (!wanted || lock || pending || !navigator?.wakeLock?.request) return;
        pending = true;
        try {
            const next = await navigator.wakeLock.request('screen');
            if (!active || document.visibilityState !== 'visible') await next.release();
            else { lock = next; next.addEventListener('release', () => { if (lock === next) lock = null; }, { once: true }); }
        } catch { /* Unsupported, denied or low battery: play normally. */ }
        finally { pending = false; }
    }
    document.addEventListener('visibilitychange', () => { void sync(); });
    return { setActive(value) { const next = Boolean(value); if (next === active) return; active = next; void sync(); } };
}
