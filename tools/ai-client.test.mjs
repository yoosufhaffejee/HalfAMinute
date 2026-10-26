import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createAiWordClient, AI_SETTINGS } from '../gameplay/ai-client.js';

function harness() {
    const calls = [];
    const app = { name: 'game' };
    const model = { generateContent: async prompt => { calls.push(['generate', prompt]); return { response: { text: () => 'One\nTwo' } }; } };
    const sdk = {
        ReCaptchaEnterpriseProvider: class { constructor(key) { this.key = key; } },
        GoogleAIBackend: class {},
        initializeAppCheck: (app, options) => { calls.push(['check', app, options]); },
        getAI: (app, options) => { calls.push(['ai', app, options]); return 'ai-instance'; },
        getGenerativeModel: (ai, options) => { calls.push(['model', ai, options]); return model; }
    };
    let loads = 0;
    const loadSdk = async () => { loads++; return sdk; };
    return { app, sdk, calls, model, loadSdk, get loads() { return loads; } };
}

test('AI is lazy and attestation is initialized before the protected backend', async () => {
    const h = harness();
    const client = createAiWordClient(h.app, { loadSdk: h.loadSdk });
    assert.equal(h.loads, 0);
    assert.deepEqual(h.calls, []);
    const result = await client.generateContent('Football');
    assert.equal(result.response.text(), 'One\nTwo');
    assert.deepEqual(h.calls.map(call => call[0]), ['check', 'ai', 'model', 'generate']);
    assert.equal(h.calls[0][1], h.app);
    assert.equal(h.calls[0][2].provider.key, AI_SETTINGS.siteKey);
    assert.equal(h.calls[0][2].isTokenAutoRefreshEnabled, true);
    assert.ok(h.calls[1][2].backend instanceof h.sdk.GoogleAIBackend);
    assert.equal(h.calls[1][2].useLimitedUseAppCheckTokens, true);
    assert.equal(h.calls[2][2].generationConfig.maxOutputTokens, 12288);
    assert.equal(h.calls[2][2].generationConfig.responseMimeType, 'application/json');
    assert.deepEqual(h.calls[2][2].generationConfig.responseSchema.properties.groups.items.properties.entries.items.properties.difficulty.enum, ['easy', 'hard']);
    assert.match(h.calls[2][2].systemInstruction, /Players describe answers/);
});

test('concurrent and later generations share a single App Check and model initialization', async () => {
    const h = harness();
    const client = createAiWordClient(h.app, { loadSdk: h.loadSdk });
    await Promise.all([client.generateContent('A'), client.generateContent('B')]);
    await client.generateContent('C');
    assert.equal(h.loads, 1);
    assert.equal(h.calls.filter(call => call[0] === 'check').length, 1);
    assert.deepEqual(h.calls.filter(call => call[0] === 'generate').map(call => call[1]), ['A', 'B', 'C']);
});

test('an SDK loading failure can recover on a later explicit attempt', async () => {
    const h = harness(); let attempts = 0;
    const client = createAiWordClient(h.app, { loadSdk: async () => {
        if (++attempts === 1) throw new Error('Failed to fetch');
        return h.sdk;
    } });
    await assert.rejects(client.generateContent('A'), /Failed to fetch/);
    assert.deepEqual(h.calls, []);
    await client.generateContent('B');
    assert.equal(attempts, 2);
});

test('backend initialization failure never registers App Check twice', async () => {
    const h = harness(); const original = h.sdk.getAI; let attempts = 0;
    h.sdk.getAI = (...args) => { if (++attempts === 1) throw new Error('Backend unavailable'); return original(...args); };
    const client = createAiWordClient(h.app, { loadSdk: h.loadSdk });
    await assert.rejects(client.generateContent('A'), /Backend unavailable/);
    await client.generateContent('B');
    assert.equal(h.calls.filter(call => call[0] === 'check').length, 1);
});

test('a provider rejection is propagated without automatic retries or losing the ready client', async () => {
    const h = harness(); let attempts = 0;
    const rejected = { code: 'fetch-error', customErrorData: { status: 429 } };
    h.model.generateContent = async () => { attempts++; throw rejected; };
    const client = createAiWordClient(h.app, { loadSdk: h.loadSdk });
    await assert.rejects(client.generateContent('A'), error => error === rejected);
    assert.equal(attempts, 1);
    await assert.rejects(client.generateContent('B'), error => error === rejected);
    assert.equal(h.loads, 1);
});

test('the shipped integration contains no direct Gemini key or production debug token', () => {
    const source = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
    const client = readFileSync(new URL('../gameplay/ai-client.js', import.meta.url), 'utf8');
    assert.doesNotMatch(source, /GoogleGenerativeAI|const GEMINI|esm\.run\/\@google\/generative-ai/);
    assert.doesNotMatch(client, /AIza[\w-]{20,}|FIREBASE_APPCHECK_DEBUG_TOKEN\s*=/);
    const versions = [...source.matchAll(/firebasejs\/([\d.]+)\//g)].map(match => match[1]);
    assert.deepEqual([...new Set(versions)], ['13.0.0']);
    assert.match(client, /firebasejs\/13\.0\.0\/firebase-ai\.js/);
});
