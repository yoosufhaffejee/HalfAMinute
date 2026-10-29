// Optional real-browser integration checks. No production Firebase or AI calls.
// PLAYWRIGHT_MODULE may point at a bundled Playwright installation.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs'), path = require('node:path'), http = require('node:http'), assert = require('node:assert/strict');
const live = process.argv.includes('--live');
const firebaseURL = fs.readFileSync('script.js', 'utf8').match(/databaseURL:\s*"([^"]+)"/)[1];
const report = { backend: live ? 'Live Firebase; temporary UI-created test lobbies, explicitly left afterward; no AI requests' : 'Local Firebase-compatible CAS/polling adapter; no production writes or AI requests', completed: false, checks: [], layouts: [], errors: [] };
let database = { games: {} }, revision = 0, transactions = 0;
const clone = value => value == null ? value : structuredClone(value);
function clean(value) {
    if (value == null) return undefined;
    if (Array.isArray(value)) return value.length ? value.map(clean) : undefined;
    if (typeof value === 'object') { const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clean(item)]).filter(([, item]) => item !== undefined)); return Object.keys(result).length ? result : undefined; }
    return value;
}
function read(key) { return key.split('/').reduce((value, segment) => value?.[segment], database) ?? null; }
function write(key, value) {
    const parts = key.split('/'); let parent = database;
    for (const part of parts.slice(0, -1)) parent = parent[part] ||= {};
    const next = clean(value); if (next === undefined) delete parent[parts.at(-1)]; else parent[parts.at(-1)] = next;
    revision++;
}
const sdk = `
export const initializeApp=()=>({}),getDatabase=()=>({}),ref=(_,path)=>path,serverTimestamp=()=>Date.now();
async function request(path,body){const text=body?JSON.stringify(body):'';const r=await fetch('/__firebase?path='+encodeURIComponent(path),body?{method:'POST',headers:{'Content-Type':'application/json'},body:text,keepalive:text.length<50000}:{});return r.json()}
export async function get(path){const data=await request(path);return {val:()=>data.value}}
export function onValue(path,callback,onError,options){let closed=false,last='';async function poll(){try{let value=path==='.info/connected'?true:path==='.info/serverTimeOffset'?0:(await request(path)).value;const next=JSON.stringify(value);if(!closed&&next!==last){last=next;callback({val:()=>value});if(options?.onlyOnce)closed=true}}catch(error){if(!closed)onError?.(error)}}void poll();const timer=setInterval(()=>{if(!closed)void poll()},100);return ()=>{closed=true;clearInterval(timer)}}
export async function runTransaction(path,reducer,options){for(let i=0;i<50;i++){const before=await request(path),next=reducer(before.value);if(next===undefined)return {committed:false};const result=await request(path,{revision:before.revision,value:next});if(result.committed)return {committed:true,snapshot:{val:()=>result.value}}}throw Error('transaction-contention')}
export async function update(path,patch){return runTransaction(path,value=>({...value,...patch}),{applyLocally:false})}
export function onDisconnect(){return {update:async()=>{},cancel:async()=>{}}}
`;
const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/__firebase') {
        res.setHeader('Content-Type', 'application/json'); const key = url.searchParams.get('path');
        if (!key?.startsWith('games/')) { res.end('{}'); return; }
        if (req.method === 'POST') {
            let body = ''; for await (const chunk of req) body += chunk;
            const data = JSON.parse(body); transactions++;
            if (data.revision !== revision) { res.end(JSON.stringify({ committed: false })); return; }
            write(key, data.value); res.end(JSON.stringify({ committed: true, value: read(key) })); return;
        }
        res.end(JSON.stringify({ value: read(key), revision })); return;
    }
    const filename = path.resolve(process.cwd(), '.' + (url.pathname === '/' ? '/index.html' : url.pathname));
    if (!filename.startsWith(process.cwd() + path.sep) || url.pathname.includes('/.')) { res.writeHead(403); res.end(); return; }
    try { res.setHeader('Content-Type', filename.endsWith('.js') ? 'application/javascript' : filename.endsWith('.css') ? 'text/css' : filename.endsWith('.html') ? 'text/html' : 'application/octet-stream'); res.end(fs.readFileSync(filename)); }
    catch { res.writeHead(404); res.end(); }
});
let browser, base;
async function pageFor(width = 390) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, acceptDownloads: true, reducedMotion: 'reduce' });
    const page = await context.newPage(); page.setDefaultTimeout(12000);
    page.on('pageerror', error => { report.errors.push(error.message); console.error(error.stack); });
    if (!live) {
        await page.route('**/firebase-app.js', route => route.fulfill({ contentType: 'application/javascript', body: sdk }));
        await page.route('**/firebase-database.js', route => route.fulfill({ contentType: 'application/javascript', body: sdk }));
    }
    await page.addInitScript(() => Object.defineProperty(navigator, 'canShare', { value: () => false }));
    await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 }); await page.locator('#modeDescription').filter({ hasText: 'Describe' }).waitFor();
    return { page, context };
}
async function layout(page, label) {
    for (const width of [320, 390, 1100]) {
        await page.setViewportSize({ width, height: 900 });
        const result = await page.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth }));
        report.layouts.push({ label, ...result }); assert.equal(result.overflow, false, `${label} overflow at ${width}`);
    }
    await page.setViewportSize({ width: 320, height: 900 });
    const largeText = await page.addStyleTag({ content: 'html { font-size: 150% !important; }' });
    const result = await page.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth }));
    report.layouts.push({ label: label + ' large text', ...result }); assert.equal(result.overflow, false, `${label} large text overflow`);
    await largeText.evaluate(node => node.remove());
    await page.setViewportSize({ width: 390, height: 900 });
}
async function settings(page, values) {
    await page.locator('#settings').click();
    for (const [id, value] of Object.entries(values)) await page.locator('#' + id).fill(String(value));
    await page.getByRole('button', { name: 'Done', exact: true }).click();
}
async function localClue(page) {
    await page.locator('#startRoundButton').click(); assert.equal(await page.locator('#scoreInput').isVisible(), false);
    await page.clock.runFor(4600); await page.locator('#endRoundButton').click();
}
async function markLegacy(page, count) {
    const answers = page.locator('.scoreButton:visible'); for (let i = 0; i < count; i++) await answers.nth(i).click();
    await page.locator('#nextRoundButton').click();
}
async function localStakes(mode) {
    const { page, context } = await pageFor(); await page.clock.install();
    await page.locator('#quickMode').selectOption(mode); await settings(page, { pointsToWin: 30 });
    await page.locator('#startGameButton').click();
    assert.equal(await page.locator('#riskRoundButton').isDisabled(), true);
    for (let i = 0; i < 2; i++) { await localClue(page); await markLegacy(page, 3); }
    assert.equal(await page.locator('#riskRoundButton').isEnabled(), true);
    await page.locator('#riskRoundButton').click(); await page.clock.runFor(4600); await page.locator('#endRoundButton').click();
    const answers = page.locator('.scoreButton:visible'); for (let i = 0; i < 3; i++) await answers.nth(i).click();
    assert.match(await page.locator('#selectionSummary').innerText(), mode === 'boost' ? /boost/ : /× 2/);
    await page.locator('#nextRoundButton').click();
    await page.screenshot({ path: `reports/${mode}-stakes-mobile.png`, fullPage: true });
    await localClue(page); await markLegacy(page, 0);
    assert.equal(await page.locator('#riskRoundButton').isDisabled(), true);
    assert.match(await page.locator('#stakesAvailability').innerText(), mode === 'boost' ? /normal turn/ : /used/);
    await layout(page, mode + ' local');
    await page.locator('#endGameButton').click(); await page.locator('#confirmEndGameButton').click(); await page.locator('#rematchButton').click();
    assert.match(await page.locator('#stakesAvailability').innerText(), /Bank/);
    report.checks.push(`${mode}: local bank/risk/preview/resource/rematch`); await context.close();
}
async function gate(page) { const ready = page.locator('[data-party-action="local-ready"]'); await ready.waitFor(); await ready.click(); }
async function localTable() {
    const { page, context } = await pageFor(); await page.clock.install();
    await page.locator('#quickMode').selectOption('table'); await page.locator('#tableCycles').selectOption('1');
    await page.locator('#startGameButton').click(); assert.match(await page.locator('#localNamesError').innerText(), /3–12/);
    await page.locator('#localPlayerNames').fill('Alice\nAlice\nCara'); await page.locator('#startGameButton').click(); assert.match(await page.locator('#localNamesError').innerText(), /different/);
    await page.locator('#localPlayerNames').fill('Alice\nBob\nCara'); await page.locator('#startGameButton').click();
    for (let turn = 0; turn < 3; turn++) {
        await gate(page); await page.locator('[data-party-action="start-round"]').click(); assert.equal(await page.locator('.party-answer').count(), 0);
        await page.clock.runFor(4600); const answer = await page.locator('.party-answer').innerText();
        await page.locator('[data-party-action="pass-device"]').click(); assert.equal(await page.locator('.party-answer').count(), 0);
        for (let guesser = 0; guesser < 2; guesser++) {
            await gate(page); await page.locator('#partyGuessInput').fill(answer); await page.clock.runFor(1000);
            assert.equal(await page.locator('#partyGuessInput').inputValue(), answer);
            await page.locator('[data-party-action="lock-guess"]').click();
        }
        if (!turn) { await layout(page, 'table review'); await page.screenshot({ path: 'reports/open-table-review-mobile.png', fullPage: true }); }
        await page.locator('[data-party-action="submit-round"]').click();
    }
    assert.match(await page.locator('.party-stage').innerText(), /draw/); assert.deepEqual(await page.locator('.party-scores strong').allTextContents(), ['4 pts', '4 pts', '4 pts']);
    const download = page.waitForEvent('download'); await page.locator('[data-party-action="share"]').click(); assert.equal((await download).suggestedFilename(), 'half-a-minute-result.png');
    await page.locator('[data-party-action="rematch"]').click(); await page.locator('[data-party-action="local-ready"]').waitFor();
    report.checks.push('table: local name validation, private device passes, untimed draft, equal turns, shared points, PNG and rematch'); await context.close();
}
async function localCase() {
    const { page, context } = await pageFor(); await page.clock.install();
    await page.locator('#quickMode').selectOption('case'); await page.locator('#localPlayerNames').fill('Alice\nBob'); await settings(page, { txtWords: 2, txtSeconds: 5 }); await page.locator('#startGameButton').click();
    for (let turn = 0; turn < 3; turn++) {
        await gate(page); await page.locator('[data-party-action="start-round"]').click(); await page.clock.runFor(4600);
        if (!turn) await page.clock.runFor(5100); else await page.locator('[data-party-action="end-round"]').click();
        const words = page.locator('[data-party-action="toggle-answer"]'); for (let i = 0; i < 2; i++) await words.nth(i).click();
        await page.locator('[data-party-action="submit-round"]').click();
    }
    const facts = (await page.locator('.case-evidence').allTextContents()).map(text => text.replace('The culprit ', '').replace(/\.$/, '').toLowerCase());
    const cards = page.locator('.case-suspect'); let culprit = -1;
    for (let i = 0; i < 4; i++) { const text = (await cards.nth(i).innerText()).toLowerCase(); if (facts.every(fact => text.includes(fact))) culprit = i; }
    assert.notEqual(culprit, -1); await cards.nth(culprit).click(); await layout(page, 'case accusation');
    await page.screenshot({ path: 'reports/case-files-mobile.png', fullPage: true }); await page.locator('[data-party-action="accuse"]').click();
    assert.match(await page.locator('.party-stage').innerText(), /Case solved/);
    await page.locator('[data-party-action="rematch"]').click(); assert.match(await page.locator('.party-progress').first().innerText(), /0\/3 evidence/);
    report.checks.push('case: local private handoff, actual timer expiry, cumulative evidence, solvable profiles, accusation and reset'); await context.close();
}
async function localAiCompatibility() {
    const { page, context } = await pageFor(); await page.clock.install();
    await page.locator('#quickMode').selectOption('table'); await page.locator('#localPlayerNames').fill('Alice\nBob\nCara');
    await page.locator('#ai').click(); await page.locator('#showAIWords').check();
    await page.locator('#aiWords').fill('x'.repeat(81)); await page.locator('#btnAiGame').click();
    assert.match(await page.locator('#menuNotice').innerText(), /80 characters/); assert.equal(await page.locator('#ai').isVisible(), true);
    await page.locator('#ai').click(); await page.locator('#aiWords').fill(Array.from({ length: 160 }, (_, index) => `Test answer ${index}`).join('\n')); await page.locator('#btnAiGame').click();
    await gate(page); await page.locator('[data-party-action="start-round"]').click(); await page.clock.runFor(4600);
    assert.match(await page.locator('.party-answer').innerText(), /Test answer/);
    await page.locator('[data-party-action="exit"]').click(); await page.locator('#menu').waitFor({ state: 'visible' });
    await page.locator('#quickMode').selectOption('classic'); assert.equal(await page.locator('#quickLengthField').isVisible(), true);
    await page.locator('#startGameButton').click(); await localClue(page); await markLegacy(page, 1);
    assert.equal(await page.locator('#stakesPanel').isVisible(), false);
    report.checks.push('local custom packs: long typed-answer validation, editable recovery, 160-answer local pack, and return to Classic'); await context.close();
}
async function gameState(code) { return live ? (await fetch(`${firebaseURL}/games/${code}.json`)).json() : clone(read('games/' + code)); }
async function waitState(code, predicate) {
    const until = Date.now() + 16000; while (Date.now() < until) { const value = await gameState(code); if (value && predicate(value)) return value; await new Promise(resolve => setTimeout(resolve, live ? 250 : 60)); } throw Error(`Shared state wait timed out: ${code}`);
}
async function onlinePair(mode) {
    console.log(`Checking ${mode} online`);
    const host = await pageFor(), guest = await pageFor();
    await host.page.locator('#quickMode').selectOption(mode);
    if (mode === 'table') await host.page.locator('#tableCycles').selectOption('1');
    if (mode === 'case') await settings(host.page, { txtWords: 2, txtSeconds: 15 });
    else if (mode !== 'table') await settings(host.page, { pointsToWin: 30 });
    await host.page.locator('#online').click(); await host.page.locator('#playerName').fill('Host'); await host.page.locator('#createLobbyButton').click();
    await host.page.waitForFunction(() => /\b[A-Z]{4}\b/.test(document.getElementById('lblGameCode').textContent));
    const code = (await host.page.locator('#lblGameCode').textContent()).match(/\b[A-Z]{4}\b/)[0]; await waitState(code, game => game?.numPlayers === 1);
    await guest.page.locator('#online').click(); await guest.page.locator('#playerName').fill('Guest'); await guest.page.locator('#joinLobbyCode').fill(code); await guest.page.locator('#joinLobbyButton').click();
    await waitState(code, game => game.numPlayers === 2);
    let third = null;
    if (mode === 'table') {
        assert.equal(await host.page.locator('[data-party-action="start-game"]').isDisabled(), true);
        third = await pageFor(); await third.page.locator('#online').click(); await third.page.locator('#playerName').fill('Third'); await third.page.locator('#joinLobbyCode').fill(code); await third.page.locator('#joinLobbyButton').click();
        await waitState(code, game => game.numPlayers === 3);
    }
    const party = ['table', 'case'].includes(mode);
    await host.page.locator(party ? '[data-party-action="start-game"]' : '#startOnlineGame').click();
    const lookup = game => {
        const person = game.teams.flatMap(team => team.players || []).find(player => player.playerId === game.turn.speakerId);
        return person.playerName === 'Host' ? [host.page, guest.page] : person.playerName === 'Third' ? [third.page, host.page] : [guest.page, host.page];
    };
    if (mode === 'table') {
        const pages = { Host: host.page, Guest: guest.page, Third: third.page };
        for (let i = 0; i < 3; i++) {
            let game = await waitState(code, value => value.phase === 'idle'), [speaker, listener] = lookup(game);
            await speaker.locator('[data-party-action="start-round"]').click(); assert.equal(await listener.locator('.party-answer').count(), 0);
            await speaker.locator('.party-answer').waitFor(); const answer = await speaker.locator('.party-answer').innerText();
            const listeners = game.party.players.filter(player => player.id !== game.turn.speakerId).map(player => pages[player.name]);
            await listeners[0].locator('#partyGuessInput').fill(answer);
            await listeners[1].locator('#partyGuessInput').fill(answer); await listeners[1].locator('[data-party-action="lock-guess"]').click();
            await listeners[0].waitForTimeout(600); assert.equal(await listeners[0].locator('#partyGuessInput').inputValue(), answer);
            await listeners[0].locator('[data-party-action="lock-guess"]').click(); await speaker.locator('[data-party-action="submit-round"]').click();
            if (!i) { await guest.page.reload({ waitUntil: 'domcontentloaded' }); await waitState(code, value => value.numPlayers === 3); }
        }
        const result = await waitState(code, game => game.phase === 'finished'); assert.equal(result.finishReason, 'draw');
        assert.deepEqual(result.party.players.map(player => player.points), [4, 4, 4]);
    } else if (mode === 'case') {
        let game = await waitState(code, value => value.phase === 'idle'), [speaker, listener] = lookup(game);
        await speaker.locator('[data-party-action="start-round"]').click(); await speaker.locator('.party-word').first().waitFor(); assert.equal(await listener.locator('.party-word').count(), 0);
        await speaker.locator('[data-party-action="end-round"]').click(); await speaker.locator('[data-party-action="toggle-answer"]').first().click();
        await speaker.locator('[data-party-action="submit-round"]').click(); await waitState(code, value => value.party.totalCorrect === 1);
        await guest.page.reload({ waitUntil: 'domcontentloaded' }); await guest.page.locator('#partyGame').waitFor();
    } else {
        for (let i = 0; i < 3; i++) {
            const game = await waitState(code, value => value.phase === 'idle'), [speaker, listener] = lookup(game);
            await speaker.locator(i === 2 ? '#riskRoundButton' : '#startRoundButton').click();
            await listener.locator('#roundCountdown').waitFor({ state: 'visible' }); assert.equal(await listener.locator('#scoreInput').isVisible(), false); await speaker.locator('#endRoundButton').waitFor({ state: 'visible' });
            assert.equal(await listener.locator('#scoreInput').isVisible(), false);
            await speaker.locator('#endRoundButton').click(); await markLegacy(speaker, 3);
        }
        const game = await waitState(code, value => value.phase === 'idle'); assert.equal(game.auditEvent.stakes.risky, true);
        assert.equal(game.auditEvent.stakes.delta, mode === 'boost' ? 5 : 6);
    }
    if ((await gameState(code)).phase !== 'finished') {
        if (party) { await host.page.locator('[data-party-action="request-end"]').click(); await host.page.locator('#confirmEndGameButton').click(); }
        else { await host.page.locator('#endGameButton').click(); await host.page.locator('#confirmEndGameButton').click(); }
    }
    if (party) { await host.page.locator('[data-party-action="rematch"]').click(); await waitState(code, value => value.matchId === 2); }
    report.checks.push(`${mode}: ${third ? 'three' : 'two'} real browser clients, shared transactions, roles/word privacy, scoring${mode === 'table' || mode === 'case' ? ', refresh and rematch' : ''}`);
    if (live) for (const entry of [host, guest, third].filter(Boolean)) {
        const leave = entry.page.locator(party ? '[data-party-action="exit"]' : '#changeSettingsButton'); await leave.click(); await entry.page.locator('#menu').waitFor({ state: 'visible' });
    }
    await host.context.close(); await guest.context.close(); await third?.context.close();
}
(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); base = `http://127.0.0.1:${server.address().port}/`;
    browser = await chromium.launch({ ...(process.platform === 'win32' ? { channel: 'msedge' } : {}), headless: true });
    try {
        if (!process.argv.includes('--online-only')) { if (!process.argv.includes('--party-only')) { await localStakes('boost'); await localStakes('double'); } await localTable(); await localCase(); await localAiCompatibility(); }
        if (!process.argv.includes('--local-only')) for (const mode of process.argv.includes('--party-only') ? ['table', 'case'] : ['boost', 'double', 'table', 'case']) await onlinePair(mode);
        if (!live) report.transactions = transactions;
        assert.deepEqual(report.errors, []); report.completed = true; console.log(JSON.stringify(report, null, 2));
    } catch (error) { report.failure = error.message; throw error;
    } finally { fs.writeFileSync(live ? 'reports/new-modes-live.json' : process.argv.includes('--local-only') ? 'reports/new-modes-local-browser.json' : 'reports/new-modes-browser.json', JSON.stringify(report, null, 2)); await browser?.close(); server.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; server.close(); });
