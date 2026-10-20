// Classify provider failures without showing URLs, credentials or raw responses.
export function describeGeminiError(error) {
    const message = String(error?.message || '');
    const details = error?.errorDetails || error?.error?.details || [];
    const text = `${message} ${JSON.stringify(details)}`;
    const symbolic = String(error?.code || error?.error?.status || '').toUpperCase();
    let status = [error?.status, error?.code, error?.error?.code, error?.response?.status]
        .map(Number).find(value => Number.isInteger(value) && value >= 400 && value <= 599);
    // Legacy SDK errors include "[404 Not Found]" in their message.
    status ||= Number(message.match(/\[(4\d\d|5\d\d)\b/)?.[1]) || undefined;
    const result = (kind, playerMessage, extra = {}) => ({ kind, status, message: playerMessage, ...extra });

    if (/reported as leaked|api[_ ]key[_ ](?:invalid|expired)|invalid api key|api key (?:is )?not valid/i.test(text)) {
        return result('credentials', 'AI access needs attention from the game owner. You can paste a word pack below to keep playing.');
    }
    if (status === 401 || status === 403 || symbolic === 'PERMISSION_DENIED' || symbolic === 'UNAUTHENTICATED') {
        return result('credentials', 'AI access is unavailable for this game. You can paste a word pack below to keep playing.');
    }
    if (status === 404 || symbolic === 'NOT_FOUND' || /\bmodel\b[^\n]*(?:not found|not supported|no longer available)/i.test(message)) {
        return result('model', 'The AI model is unavailable and needs an update. You can paste a word pack below to keep playing.');
    }
    if (status === 429 || symbolic === 'RESOURCE_EXHAUSTED') {
        if (/perday|per_day|per day|daily|limit\s*:\s*0\b/i.test(text)) {
            return result('quota', 'AI generation has reached its usage allowance. Please try later, or paste a word pack below.');
        }
        const retry = details.find?.(detail => String(detail?.['@type'] || '').endsWith('RetryInfo'));
        const delay = String(retry?.retryDelay || '').match(/^(\d+(?:\.\d+)?)s$/);
        const seconds = delay ? Math.ceil(Number(delay[1])) : 0;
        return result('rate-limit', seconds
            ? `AI generation is busy. Please try again in ${seconds} ${seconds === 1 ? 'second' : 'seconds'}, or paste a word pack below.`
            : 'AI generation is busy or out of quota. Please try later, or paste a word pack below.',
        seconds ? { retryAfterSeconds: seconds } : {});
    }
    if (status >= 500 || status === 408 || /\b(?:UNAVAILABLE|DEADLINE_EXCEEDED)\b/.test(symbolic)) {
        return result('unavailable', 'AI generation is temporarily unavailable. Please try again shortly.');
    }
    if (/\b(?:safety|blocked by safety|blocked for safety)\b/i.test(message)) {
        return result('safety', 'This topic could not be generated. Try a different topic or paste a word pack below.');
    }
    if (status === 400 || symbolic === 'INVALID_ARGUMENT') {
        return result('request', 'AI generation could not accept this request. Try a different topic or paste a word pack below.');
    }
    if (/\bnetwork\b|failed to fetch|fetch failed/i.test(message)) {
        return result('network', 'Could not reach the AI service. Check your connection and try again.');
    }
    return result('unknown', 'Could not generate words right now. You can try again or paste a word pack below.');
}
