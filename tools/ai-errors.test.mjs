import test from 'node:test';
import assert from 'node:assert/strict';
import { describeGeminiError } from '../gameplay/ai-errors.js';

const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=test-secret';

test('generateContent in a provider URL cannot turn 403 or 404 into a rate limit', () => {
    for (const [status, kind] of [[403,'credentials'],[404,'model'],[400,'request'],[503,'unavailable']]) {
        const result=describeGeminiError({status,message:`Error fetching from ${url}: [${status} Error] Request failed`});
        assert.equal(result.kind,kind);
        assert.equal(result.status,status);
        assert.ok(!result.message.includes('test-secret'));
        assert.ok(!result.message.includes('https://'));
        assert.doesNotMatch(result.message,/rate.limit/i);
    }
});

test('the provider-confirmed leaked credential is actionable and is not retryable quota', () => {
    const error={status:403,message:`Error fetching from ${url}: Your API key was reported as leaked. Please use another API key.`};
    const result=describeGeminiError(error);
    assert.equal(result.kind,'credentials');
    assert.match(result.message,/game owner/);
    assert.equal(result.retryAfterSeconds,undefined);
    assert.doesNotMatch(result.message,/few seconds|try again in/i);
});

test('invalid keys and referrer restrictions do not masquerade as model failures', () => {
    assert.equal(describeGeminiError({status:400,message:'API key not valid. Please pass a valid API key.'}).kind,'credentials');
    assert.equal(describeGeminiError({status:403,message:'Requests from referer <empty> are blocked.'}).kind,'credentials');
    assert.equal(describeGeminiError({error:{code:403,status:'PERMISSION_DENIED'}}).kind,'credentials');
});

test('legacy model-not-found errors are recognized without treating generate as rate', () => {
    const result=describeGeminiError({message:`Error fetching from ${url}: [404 Not Found] Model is not supported for generateContent`});
    assert.equal(result.kind,'model');
    assert.match(result.message,/needs an update/);
    assert.equal(describeGeminiError({message:'Could not generate words about interest rates.'}).kind,'unknown');
});

test('real temporary rate limits respect the provider RetryInfo duration', () => {
    const result=describeGeminiError({status:429,errorDetails:[{'@type':'type.googleapis.com/google.rpc.RetryInfo',retryDelay:'42.3s'}]});
    assert.equal(result.kind,'rate-limit');
    assert.equal(result.retryAfterSeconds,43);
    assert.match(result.message,/43 seconds/);
});

test('daily or zero quota is not described as a few-second delay', () => {
    for(const message of ['GenerateRequestsPerDayPerProject quota exceeded','Quota exceeded, limit: 0','Daily quota exceeded']) {
        const result=describeGeminiError({status:429,message});
        assert.equal(result.kind,'quota');
        assert.match(result.message,/usage allowance/);
        assert.equal(result.retryAfterSeconds,undefined);
    }
    assert.equal(describeGeminiError({code:'RESOURCE_EXHAUSTED'}).kind,'rate-limit');
});

test('network, service and safety failures retain their own recovery guidance', () => {
    assert.equal(describeGeminiError({message:'Failed to fetch'}).kind,'network');
    assert.equal(describeGeminiError({status:503,message:`Error fetching from ${url}`}).kind,'unavailable');
    assert.equal(describeGeminiError({message:'Response blocked by safety filters'}).kind,'safety');
    assert.equal(describeGeminiError(null).kind,'unknown');
});

test('Firebase AI errors use customErrorData status and retry details', () => {
    const result = describeGeminiError({code:'fetch-error',customErrorData:{status:429,errorDetails:[
        {'@type':'type.googleapis.com/google.rpc.RetryInfo',retryDelay:'12s'}
    ]}});
    assert.equal(result.kind,'rate-limit');
    assert.equal(result.retryAfterSeconds,12);
    assert.equal(describeGeminiError({code:'fetch-error',customErrorData:{status:404}}).kind,'model');
    assert.equal(describeGeminiError({code:'api-not-enabled'}).kind,'configuration');
});

test('App Check failures explain browser verification without blaming rate limits', () => {
    const result=describeGeminiError({code:'fetch-error',customErrorData:{status:403},message:'Firebase App Check token is invalid'});
    assert.equal(result.kind,'verification');
    assert.match(result.message,/verify this browser/);
    assert.doesNotMatch(result.message,/rate.limit|API key/);
});
