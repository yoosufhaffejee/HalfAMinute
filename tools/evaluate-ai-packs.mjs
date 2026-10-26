// Explicit, opt-in live evaluation. Uses CLI auth in memory, removes its temporary
// App Check registration in finally, and never writes credentials or tokens.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { randomUUID, createHash } from 'node:crypto';
import { AI_SETTINGS } from '../gameplay/ai-client.js';
import * as Packs from '../gameplay/ai-packs.js';

if (!process.argv.includes('--live')) {
    console.log('Opt-in only: node tools/evaluate-ai-packs.mjs --live');
    process.exit(0);
}

const source = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const publicKey = source.match(/apiKey:\s*"([^"]+)"/)[1];
const appId = source.match(/appId:\s*"([^"]+)"/)[1];
const projectId = source.match(/projectId:\s*"([^"]+)"/)[1];
const projectNumber = source.match(/messagingSenderId:\s*"([^"]+)"/)[1];
const adminToken = execSync('gcloud auth print-access-token --quiet', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const adminHeaders = { Authorization: `Bearer ${adminToken}`, 'x-goog-user-project': projectId };
const clientHeaders = { Referer: 'https://yoosufhaffejee.github.io/HalfAMinute/', 'X-Goog-Api-Key': publicKey, 'X-Firebase-AppId': appId };
const appCheckRoot = `https://firebaseappcheck.googleapis.com/v1/projects/${projectNumber}/apps/${appId}`;
const baseline = JSON.parse(readFileSync(new URL('./fixtures/ai-prompts-before.json', import.meta.url), 'utf8'));
const promptHash = createHash('sha256').update(Packs.PACK_SYSTEM_INSTRUCTION).digest('hex');
const scopeEvaluation = process.argv.includes('--scope');
const reportUrl = new URL(scopeEvaluation ? '../reports/ai-scope-evaluation.json' : '../reports/ai-pack-evaluation.json', import.meta.url);
const report = { model: AI_SETTINGS.model, promptHash, generatedAt: new Date().toISOString(), baselineCommit: baseline.sourceCommit,
    caveat: 'Small live sample, not a controlled playtest. Labels and factual relevance require human review. No retries.', cases: [] };
if (process.argv.includes('--resume')) {
    const saved = JSON.parse(readFileSync(reportUrl, 'utf8'));
    report.cases = saved.cases.filter(item => item.version === 'before' || saved.promptHash === promptHash);
}

async function request(url, method, headers, body) {
    const response = await fetch(url, { method, headers: { ...headers, 'Content-Type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(180000) });
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const reason = JSON.stringify({ message: error.error?.message, details: error.error?.details })
            .replace(/https?:\/\/[^\s"\\]+/g, '[URL]').replace(/AIza[\w-]+/g, '[redacted]');
        throw new Error(`${method} ${new URL(url).pathname}: ${response.status} ${error.error?.status || ''} ${reason}`);
    }
    return response.status === 204 ? {} : response.json();
}

let registration;
try {
    const debugToken = randomUUID();
    registration = await request(`${appCheckRoot}/debugTokens`, 'POST', adminHeaders,
        { displayName: 'Temporary CLI AI pack evaluation', token: debugToken });
    async function generate(topic, version, history = [], strict = false) {
        const saved = report.cases.find(item => item.topic === topic && item.version === version);
        if (saved) return saved.entries;
        const attestation = await request(`${appCheckRoot}:exchangeDebugToken`, 'POST', clientHeaders,
            { debugToken, limitedUse: true });
        const modern = version !== 'before';
        const prompt = modern ? Packs.buildPackRequest(topic, { history, strict })
            : (strict ? baseline.strict.replaceAll('${strictTopic}', topic)
                : baseline.broad.replaceAll('${cleanTopic}', topic));
        const started = performance.now();
        const response = await request(`https://firebasevertexai.googleapis.com/v1beta/projects/${projectId}/models/${AI_SETTINGS.model}:generateContent`,
            'POST', { ...clientHeaders, 'X-Firebase-AppCheck': attestation.token }, {
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                ...(modern ? { systemInstruction: { role: 'system', parts: [{ text: Packs.PACK_SYSTEM_INSTRUCTION }] } } : {}),
                generationConfig: modern ? { maxOutputTokens: 12288, responseMimeType: 'application/json', responseSchema: Packs.PACK_RESPONSE_SCHEMA }
                    : { maxOutputTokens: 4096, responseMimeType: 'text/plain' }
            });
        const text = response.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('') || '';
        const finishReason = response.candidates?.[0]?.finishReason;
        let pack;
        try { pack = modern ? Packs.parseGeneratedPack(text, { history, finishReason })
            : { entries: Packs.parseManualWords(text).map(word => ({ word })) }; }
        catch (error) {
            report.failedSample = { topic, version, finishReason, validationError: error.code, rawOutput: text };
            throw error;
        }
        const result = { topic, version, scope: strict ? 'strict' : 'adaptive', durationMs: Math.round(performance.now() - started), finishReason,
            accepted: pack.entries.length, rejected: pack.rejected,
            easy: modern ? pack.entries.filter(entry => entry.difficulty === 'easy').length : null,
            hard: modern ? pack.entries.filter(entry => entry.difficulty === 'hard').length : null,
            ...(modern ? { groups: JSON.parse(text).groups?.map(group => ({ label: group.label, count: group.entries.length })) } : {}),
            usage: response.usageMetadata, entries: pack.entries };
        report.cases.push(result);
        console.log(JSON.stringify({ topic, version, accepted: result.accepted, easy: result.easy, hard: result.hard,
            rejected: result.rejected, durationMs: result.durationMs }));
        return pack.entries;
    }
    if (scopeEvaluation) {
        const selectedTopic = process.argv.find(arg => arg.startsWith('--topic='))?.slice('--topic='.length);
        const cases = [['Movies', false], ['Movies', true], ['football player names', false],
            ['Hollywood', false], ['South African general knowledge', false]];
        for (const [topic, strict] of cases) {
            if (!selectedTopic || selectedTopic === topic) await generate(topic, strict ? 'strict' : 'adaptive', [], strict);
        }
    } else {
        await generate('Football', 'before');
        const football = await generate('Football', 'after');
        await generate('Planets in our solar system', 'before', [], true);
        await generate('Planets in our solar system', 'after', [], true);
        await generate('Football', 'after-with-exclusions', football);
    }
} finally {
    if (registration) {
        await request(`https://firebaseappcheck.googleapis.com/v1/${registration.name}`, 'DELETE', adminHeaders);
        console.log('Temporary evaluation registration removed.');
    }
    writeFileSync(reportUrl, JSON.stringify(report, null, 2) + '\n');
}
