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
let browser, base, caseContent;
const openedPages = [], liveCodes = [];
async function pageFor(width = 390) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, acceptDownloads: true, reducedMotion: 'reduce' });
    const page = await context.newPage(); page.setDefaultTimeout(12000);
    openedPages.push(page);
    page.on('pageerror', error => { report.errors.push(error.message); console.error(error.stack); });
    if (!live) {
        await page.route('**/firebase-app.js', route => route.fulfill({ contentType: 'application/javascript', body: sdk }));
        await page.route('**/firebase-database.js', route => route.fulfill({ contentType: 'application/javascript', body: sdk }));
    }
    await page.addInitScript(() => Object.defineProperty(navigator, 'canShare', { value: () => false }));
    // Test-only observation hook; never included in the application files.
    if(process.argv.includes('--variants-only'))await page.route('**/script.js*',route=>route.fulfill({contentType:'application/javascript',body:fs.readFileSync('script.js','utf8')+'\nwindow.caseTestState=()=>structuredClone(localPartyGame);'}));
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
    report.layouts.push({ label: label + ' large text', ...result });
    if(result.overflow){console.log(await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<0)}).map(el=>({tag:el.tagName,cls:el.className,id:el.id,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right})).slice(-15)));await page.screenshot({path:'reports/open-table-overflow-debug.png',fullPage:true});}
    assert.equal(result.overflow, false, `${label} large text overflow`);
    await largeText.evaluate(node => node.remove());
    await page.setViewportSize({ width: 390, height: 900 });
}
async function settings(page, values) {
    await page.locator('#settings').click();
    for (const [id, value] of Object.entries(values)) {
        const field = page.locator('#' + id);
        if (await field.evaluate(el => el.tagName === 'SELECT')) await field.selectOption(String(value));
        else await field.fill(String(value));
    }
    await page.getByRole('button', { name: 'Done', exact: true }).click();
}
async function localClue(page) {
    await page.locator('#startRoundButton').click(); assert.equal(await page.locator('#scoreInput').isVisible(), false);
    await page.clock.runFor(4800); await page.locator('#endRoundButton').click();
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
    await page.locator('#riskRoundButton').click(); await page.clock.runFor(4800); await page.locator('#endRoundButton').click();
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
async function gate(page) { const ready = page.locator('[data-case-action="local-ready"], [data-party-action="local-ready"], [data-table-action="local-ready"], [data-beta-action="local-ready"]'); await ready.waitFor(); await ready.click(); }
async function localTable() {
    const { page, context } = await pageFor(); await page.clock.install();
    await page.locator('#quickMode').selectOption('table');
    assert.equal(await page.locator('#partySetup select:visible, #partySetup input:visible').count(), 0);
    await page.locator('#settings').click();
    assert.equal(await page.locator('#modePlayOptions').isVisible(), false);
    await page.locator('#tableCycles').selectOption('1');
    assert.equal(await page.locator('#tableSeconds').inputValue(),'60');
    await page.locator('#tableTiming').selectOption('unlimited');
    assert.equal(await page.locator('#tableSecondsField').isVisible(), false);
    await page.locator('#settingsModal .modal-footer button').click();
    await page.locator('#settingsModal').waitFor({ state: 'hidden' });
    await page.locator('#startGameButton').click(); assert.match(await page.locator('#localNamesError').innerText(), /3–8/);
    await page.locator('#localPlayerNames').fill('Alice\nAlice\nCara'); await page.locator('#startGameButton').click(); assert.match(await page.locator('#localNamesError').innerText(), /different/);
    await page.locator('#localPlayerNames').fill('Alice\nBob\nCara'); await page.locator('#startGameButton').click();
    for (let turn = 0; turn < 3; turn++) {
        await gate(page); await page.locator('[data-table-action="start-round"]').click(); assert.equal(await page.locator('.table-word-card').count(),0);
        await page.clock.runFor(4800); assert.equal(await page.locator('.table-word-card li').count(),5);
        await page.clock.runFor(120000); assert.equal(await page.locator('.table-word-card li').count(),5);
        assert.equal(await page.locator('#tableDraft').count(),0);
        await page.locator('[data-table-action="end-round"]').click();
        const fields=page.locator('.table-award'); assert.equal(await fields.count(),5);
        await fields.nth(0).locator('[data-table-action="assign-word"]').nth(1).click();
        if(!turn){await fields.nth(0).locator('[data-table-action="assign-word"]').nth(2).click();assert.equal(await fields.nth(0).locator('[aria-pressed="true"]').count(),2);await fields.nth(0).locator('[data-table-action="assign-word"]').nth(2).click();}
        await fields.nth(1).locator('[data-table-action="assign-word"]').nth(2).click();
        if(!turn){await layout(page,'Open Table voice review');await page.screenshot({path:'reports/open-table-voice-mobile.png',fullPage:true});}
        await page.locator('[data-table-action="submit-round"]').click();
    }
    assert.match(await page.locator('.party-stage').innerText(),/draw/);assert.deepEqual(await page.locator('.party-scores strong').allTextContents(),['4 pts','4 pts','4 pts']);
    const download=page.waitForEvent('download');await page.locator('[data-table-action="share"]').click();assert.equal((await download).suggestedFilename(),'half-a-minute-result.png');
    await page.locator('[data-table-action="rematch"]').click();await page.locator('[data-table-action="local-ready"]').waitFor();
    report.checks.push('Open Table local: 3-player spoken full cards, unlimited clock, per-word winners/skips, shared scoring, equal turns, PNG, rematch');await context.close();
}
async function localTableTimed(){
    const {page,context}=await pageFor();await page.clock.install();await page.locator('#quickMode').selectOption('table');
    await page.locator('#localPlayerNames').fill(Array.from({length:8},(_,i)=>'Player '+(i+1)).join('\n'));
    await settings(page,{txtWords:10,tableScoring:'guesser'});await page.locator('#startGameButton').click();await gate(page);
    await page.locator('[data-table-action="start-round"]').click();await page.clock.runFor(4800);assert.equal(await page.locator('.table-word-card li').count(),10);
    assert.equal(await page.locator('#partyClock').innerText(),'60');await page.clock.runFor(60100);assert.equal(await page.locator('.table-award').count(),10);
    const first=page.locator('.table-award').first();await first.locator('[data-table-action="assign-word"]').nth(1).click();await first.locator('[data-table-action="assign-word"]').first().click();
    await page.locator('.table-award').nth(9).locator('[data-table-action="assign-word"]').nth(7).click();
    await page.locator('.table-award').nth(9).locator('[data-table-action="assign-word"]').nth(6).click();
    assert.match(await page.locator('.party-recap').innerText(),/No speaker points/);await layout(page,'8 players / 10 words');
    await page.locator('[data-table-action="submit-round"]').click();await gate(page);await page.getByText('Player scores',{exact:true}).click();
    assert.equal((await page.locator('.party-scores strong').allTextContents()).filter(x=>x==='1 pts').length,2);
    report.checks.push('Open Table local edge: 8 players, configured 10 words, full 60-second timer, guesser-only scoring, correction to skipped, small-screen review');await context.close();
}
async function reconstruct(page,id,story=caseContent.CASES[id]){
    const panel=page.locator('[data-case-disclosure="final-reconstruction"]');if(!await panel.evaluate(el=>el.open))await panel.locator('summary').first().click();
    for(const eventId of story.chronology.order)await page.locator(`[data-case-action="place-event"][data-event-id="${eventId}"]`).click();
    for(const [index,factId]of story.connection.pairs[0].entries())await page.locator('#case-proof-'+index).selectOption(factId);
}
async function localVariations(){
    const {page,context}=await pageFor();await page.clock.install();await page.evaluate(()=>{crypto.getRandomValues=a=>{a.fill(2);return a}});await page.locator('#quickMode').selectOption('case');await page.locator('#caseId').selectOption('bank');await page.locator('#caseTurns').fill('4');await page.locator('#localPlayerNames').fill('Alice\nBob');await settings(page,{txtSeconds:5});await page.locator('#startGameButton').click();
    const initial=await page.evaluate(()=>window.caseTestState());assert.equal(initial.party.scenarioId,'alternate-b');const story=caseContent.caseStory(initial);
    for(let i=0;i<4;i++){await gate(page);await page.locator('[data-case-action="choose-lead"]:enabled').first().click();await page.locator('[data-case-action="start-round"]').click();await page.clock.runFor(4800);await page.locator('[data-case-action="end-round"]').click();await page.locator('[data-case-action="submit-round"]').click();await page.locator('[data-case-action="continue-case"]').click();}
    for(const eventId of story.chronology.order)await page.locator(`[data-case-action="place-event"][data-event-id="${eventId}"]`).click();for(const[field,index]of Object.entries(story.solution))await page.locator('#case-'+field).selectOption(String(index));await page.locator('[data-case-action="review-theory"]').click();await page.locator('[data-case-action="accuse"]').click();
    assert.equal(await page.locator('.case-solution').count(),0);await page.locator('[data-case-action="request-reveal"]').click();assert.equal(await page.locator('.case-solution').count(),0);await page.locator('[data-case-action="cancel-reveal"]').click();assert.equal(await page.locator('.case-solution').count(),0);await page.locator('[data-case-action="request-reveal"]').click();await page.locator('[data-case-action="reveal-case"]').click();
    assert.ok((await page.locator('.case-solution').innerText()).includes(story.people[story.solution.suspect].name));assert.equal((await page.evaluate(()=>window.caseTestState())).finishReason,'unsolved');assert.equal(await page.locator('[data-case-disclosure^="file:"]').count(),12);await layout(page,'Scenario reveal choices');await page.screenshot({path:'reports/case-variations-mobile.png',fullPage:true});
    await page.locator('[data-case-action="replay-case"]').click();assert.equal((await page.evaluate(()=>window.caseTestState())).party.scenarioId,initial.party.scenarioId);assert.equal((await page.evaluate(()=>window.caseTestState())).party.found.length,0);await gate(page);await page.locator('[data-case-action="request-end"]').click();await page.locator('#confirmEndGameButton').click();await page.locator('[data-case-action="shuffle-case"]').click();const next=await page.evaluate(()=>window.caseTestState());assert.notEqual(next.party.scenarioId,initial.party.scenarioId);assert.equal(next.party.revealed,false);
    report.checks.push('Local alternate scenario: correct current evidence/debrief, reveal confirmation/cancel, no false win, same replay, different draw, reveal reset, mobile layouts');await context.close();
}
async function localCase(id='bank') {
    const {page,context}=await pageFor();await page.clock.install();await page.evaluate(()=>{crypto.getRandomValues=a=>{a.fill(0);return a}});await page.locator('#quickMode').selectOption('case');await page.locator('#caseId').selectOption(id);
    assert.equal(await page.locator('#ai').isVisible(),false);await page.locator('#localPlayerNames').fill('Alice\nBob');await settings(page,{txtSeconds:5,txtWords:5});
    if(id==='bank'){await page.evaluate(()=>document.fonts.ready);await context.setOffline(true);}
    await page.locator('#startGameButton').click();let turns=0;
    while(!await page.locator('#case-suspect').count()){
        await gate(page);await page.locator('[data-case-action="choose-lead"]:enabled').first().click();await page.locator('[data-case-action="start-round"]').click();
        assert.equal(await page.locator('.table-word-card').count(),0);await page.clock.runFor(4800);await page.locator('.table-word-card li').first().waitFor();
        if(!turns)await page.clock.runFor(5200);else await page.locator('[data-case-action="end-round"]').click();
        const words=page.locator('[data-case-action="toggle-answer"]');const count=await words.count();for(let i=0;i<count;i++)await words.nth(i).click();
        await page.locator('[data-case-action="submit-round"]').click();await page.locator('[data-case-action="continue-case"]').waitFor();
        if(!turns&&id==='bank'){await layout(page,'Case evidence / offline');await page.screenshot({path:'reports/case-evidence-mobile.png',fullPage:true});}
        await page.locator('[data-case-action="continue-case"]').click();assert.ok(++turns<=8);
    }
    await reconstruct(page,id);
    if(process.argv.includes('--new-cases-only')){assert.deepEqual(await page.locator('#caseId option').allTextContents(),caseContent.CASE_IDS.map(caseContent.caseOptionLabel));await layout(page,'New case '+id);if(id==='cake')await page.screenshot({path:'reports/new-case-mobile.png',fullPage:true});}
    if(id==='museum'){await layout(page,'Case reconstruction');await page.screenshot({path:'reports/case-theory-mobile.png',fullPage:true});}
    if(['observatory','encore'].includes(id)){
        const notebook=page.locator('[data-case-disclosure="notebook"]');if(!await notebook.evaluate(el=>el.open))await notebook.locator('summary').first().click();
        const source=page.locator(`[data-case-disclosure="source:${id==='observatory'?'instrument':'audio'}"]`);await source.locator('summary').first().click();
        const file=page.locator(`[data-case-disclosure="file:${id==='observatory'?'i2':'a1'}"]`);await file.locator('summary').first().click();
        await layout(page,id+' visual exhibit');await file.screenshot({path:'reports/case-'+id+'-exhibit.png'});
    }
    const solution=caseContent.CASES[id].solution;for(const [field,index]of Object.entries(solution))await page.locator('#case-'+field).selectOption(String(index));
    await page.locator('[data-case-action="review-theory"]').click();assert.match(await page.locator('.case-theory-confirm').innerText(),/unresolved answers stay hidden/);await page.locator('[data-case-action="accuse"]').click();
    assert.match(await page.locator('.party-stage h3').innerText(),/Case solved/);
    if(id==='encore'){const download=page.waitForEvent('download');await page.locator('[data-case-action="share"]').click();assert.equal((await download).suggestedFilename(),'half-a-minute-result.png');}
    await page.locator('[data-case-action="rematch"]').click();await gate(page);assert.equal(await page.locator('.case-lead').count(),3);assert.match(await page.locator('.party-progress').first().innerText(),/0\/12 evidence/);
    assert.equal(await page.locator('.case-timeline li').count(),0);
    report.checks.push(`${id}: complete local case, private countdown, real expiry, structured exhibits, four-event reconstruction, supported connection, final review, debrief, next-case reset${id==='bank'?', offline with all network disabled':''}`);await context.close();
}
async function localAiCompatibility() {
    const {page,context}=await pageFor();await page.clock.install();await page.locator('#quickMode').selectOption('table');await page.locator('#localPlayerNames').fill('Alice\nBob\nCara');
    await page.locator('#ai').click();await page.locator('#showAIWords').check();
    await page.locator('#aiWords').fill(Array.from({length:160},(_,i)=>`Test answer ${i}`).join('\n'));await page.locator('#btnAiGame').click();
    await gate(page);await page.locator('[data-table-action="start-round"]').click();await page.clock.runFor(4800);
    assert.equal(await page.locator('.table-word-card li').count(),5);assert.match(await page.locator('.table-word-card').innerText(),/Test answer/);
    await page.locator('[data-table-action="exit"]').click();await page.locator('#menu').waitFor({state:'visible'});
    await page.locator('#quickMode').selectOption('classic');assert.equal(await page.locator('#quickLengthField').isVisible(),true);
    await page.locator('#startGameButton').click();await localClue(page);await markLegacy(page,1);assert.equal(await page.locator('#stakesPanel').isVisible(),false);
    report.checks.push('Local 160-answer custom pack supplies full Open Table cards; returning to Classic retains the ordinary flow');await context.close();
}
async function gameState(code) { return live ? (await fetch(`${firebaseURL}/games/${code}.json`)).json() : clone(read('games/' + code)); }
async function waitState(code, predicate) {
    const until = Date.now() + 16000; while (Date.now() < until) { const value = await gameState(code); if (value && predicate(value)) return value; await new Promise(resolve => setTimeout(resolve, live ? 250 : 60)); } throw Error(`Shared state wait timed out: ${code}`);
}
async function assertFailedCase(page,found){
    await page.getByRole('heading',{name:'The case is still open',exact:true}).waitFor();
    assert.equal(await page.locator('.case-result-parts .is-matched').count(),1);
    assert.match(await page.locator('[data-case-result="method"]').innerText(),/How · Correct/);
    assert.ok((await page.locator('[data-case-result="method"]').innerText()).includes(caseContent.CASES.bank.methods[caseContent.CASES.bank.solution.method]));
    assert.equal(await page.locator('.case-result-parts .is-unresolved').count(),4);
    assert.equal(await page.locator('.case-solution,.case-debrief').count(),0);
    assert.equal(await page.locator('[data-case-disclosure^="file:"]').count(),found);
    const text=await page.locator('#partyGame').textContent();for(const explanation of [...caseContent.CASES.bank.reveal,caseContent.CASES.bank.chronology.explanation,caseContent.CASES.bank.connection.explanation])assert.ok(!text.includes(explanation));
    assert.ok(!(await page.locator('.party-stage').textContent()).includes(caseContent.CASES.bank.people[caseContent.CASES.bank.solution.suspect].name));
    assert.ok(!(await page.locator('.party-stage').textContent()).includes(caseContent.CASES.bank.destinations[caseContent.CASES.bank.solution.destination]));
}
async function localCaseRetry(){
    const {page,context}=await pageFor();await page.clock.install();await page.evaluate(()=>{crypto.getRandomValues=a=>{a.fill(0);return a}});await page.locator('#quickMode').selectOption('case');await page.locator('#caseId').selectOption('bank');await page.locator('#caseTurns').fill('4');await page.locator('#localPlayerNames').fill('Alice\nBob');await settings(page,{txtSeconds:5,txtWords:5});await page.locator('#startGameButton').click();
    for(let i=0;i<4;i++){await gate(page);await page.locator('[data-case-action="choose-lead"]:enabled').first().click();await page.locator('[data-case-action="start-round"]').click();await page.clock.runFor(4800);await page.locator('[data-case-action="end-round"]').click();await page.locator('[data-case-action="toggle-answer"]').first().click();await page.locator('[data-case-action="submit-round"]').click();await page.locator('[data-case-action="continue-case"]').click();}
    for(const eventId of [...caseContent.CASES.bank.chronology.order].reverse())await page.locator(`[data-case-action="place-event"][data-event-id="${eventId}"]`).click();
    for(const [field,index]of Object.entries(caseContent.CASES.bank.solution))await page.locator('#case-'+field).selectOption(String(field==='method'?index:(index+1)%(field==='suspect'?6:3)));
    await page.locator('[data-case-action="review-theory"]').click();await page.locator('[data-case-action="accuse"]').click();await assertFailedCase(page,4);
    await layout(page,'Unsolved case without spoilers');await page.screenshot({path:'reports/case-retry-mobile.png',fullPage:true});
    const downloaded=page.waitForEvent('download');await page.locator('[data-case-action="summary"]').click();const summary=JSON.parse(fs.readFileSync(await(await downloaded).path(),'utf8'));
    assert.equal(summary.finishReason,'unsolved');assert.equal(summary.assessment.method,true);assert.equal(summary.reconstruction.suspect,(caseContent.CASES.bank.solution.suspect+1)%6);assert.equal(Object.hasOwn(summary,'solution'),false);assert.equal(Object.hasOwn(summary,'reveal'),false);
    await page.evaluate(()=>{window.caseShareText=[];const original=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(text,...rest){window.caseShareText.push(text);return original.call(this,text,...rest)};});
    const card=page.waitForEvent('download');await page.locator('[data-case-action="share"]').click();assert.equal((await card).suggestedFilename(),'half-a-minute-result.png');
    assert.ok((await page.evaluate(()=>window.caseShareText)).includes('Case still open'));
    await page.locator('[data-case-action="retry-case"]').click();await page.locator('#case-method').waitFor();assert.equal(await page.locator('#case-method').inputValue(),String(caseContent.CASES.bank.solution.method));assert.equal(await page.locator('.case-confirmed').count(),1);assert.equal(await page.locator('[data-case-action="accuse"]').count(),0);assert.equal(await page.locator('[data-case-disclosure^="file:"]').count(),4);
    await page.locator('[data-case-action="review-theory"]').click();await page.locator('[data-case-action="accuse"]').click();await assertFailedCase(page,4);
    await page.locator('#nextCase').selectOption('bank');await page.locator('[data-case-action="rematch"]').click();await gate(page);assert.match(await page.locator('.party-progress').first().innerText(),/0\/12 evidence/);assert.equal(await page.locator('.case-confirmed').count(),0);
    report.checks.push('Local failed case: only How confirmed; wrong answers/explanations and eight unopened exhibits hidden; safe summary/PNG; repeat attempt keeps notebook and answers; fresh restart resets progress');await context.close();
}
async function onlineCase(retry=false){
    const id=process.argv.includes('--new-cases-only')?'duck':'bank';
    console.log('Checking authored Case Files online');const host=await pageFor(),guest=await pageFor();await host.page.locator('#quickMode').selectOption('case');await host.page.locator('#caseId').selectOption(id);
    await host.page.locator('#online').click();await host.page.locator('#playerName').fill('Host');await host.page.locator('#createLobbyButton').click();
    await host.page.waitForFunction(()=>/\b[A-Z]{4}\b/.test(document.getElementById('lblGameCode').textContent));const code=(await host.page.locator('#lblGameCode').textContent()).match(/\b[A-Z]{4}\b/)[0];if(live)liveCodes.push(code);
    await guest.page.locator('#online').click();await guest.page.locator('#playerName').fill('Guest');await guest.page.locator('#joinLobbyCode').fill(code);await guest.page.locator('#joinLobbyButton').click();await waitState(code,g=>g.numPlayers===2);
    const pageForId=(g,id)=>g.teams.flatMap(t=>t.players||[]).find(p=>p.playerId===id).playerName==='Host'?host.page:guest.page;
    let g=await gameState(code);await pageForId(g,g.hostId).locator('[data-case-action="start-game"]').click();let turns=0;
    while(true){g=await waitState(code,g=>g.phase==='idle'||g.phase==='accusing');if(g.phase==='accusing')break;const speaker=pageForId(g,g.turn.speakerId),listener=speaker===host.page?guest.page:host.page;
        await speaker.locator('[data-case-action="choose-lead"]:enabled').first().click();await speaker.locator('[data-case-action="start-round"]').click();assert.equal(await listener.locator('.table-word-card').count(),0);
        await speaker.locator('.table-word-card li').first().waitFor();assert.equal(await listener.locator('.table-word-card').count(),0);await speaker.locator('[data-case-action="end-round"]').click();
        const words=speaker.locator('[data-case-action="toggle-answer"]');await words.first().waitFor();const count=await words.count();for(let i=0;i<count;i++)await words.nth(i).click();
        await waitState(code,g=>g.phase==='selecting'&&(g.turn.selectedIndexes||[]).length===count);
        if(!turns){await listener.reload({waitUntil:'domcontentloaded'});try{await listener.locator('.party-review-answer.is-correct').first().waitFor();}catch(error){console.log('Restored case screen:',await listener.locator('#partyGame').innerText());console.log('Shared review:',await gameState(code));throw error;}}
        await speaker.locator('[data-case-action="submit-round"]').click();await waitState(code,g=>g.phase==='evidence');await listener.locator('.case-evidence-card').first().waitFor();
        g=await gameState(code);await pageForId(g,g.turn.speakerId).locator('[data-case-action="continue-case"]').click();assert.ok(++turns<=8);
    }
    const story=caseContent.caseStory(g);
    let leader=pageForId(g,g.hostId),collaborator=leader===host.page?guest.page:host.page;await reconstruct(collaborator,id,story);
    await waitState(code,g=>(g.party.timeline||[]).length===4&&(g.party.proof||[]).filter(Boolean).length===2);
    await collaborator.reload({waitUntil:'domcontentloaded'});await collaborator.locator('#case-suspect').waitFor();
    assert.equal(await collaborator.locator('.case-timeline li').count(),4);assert.equal(await collaborator.locator('#case-proof-0').inputValue(),story.connection.pairs[0][0]);
    for(const[field,index]of Object.entries(story.solution)){g=await gameState(code);leader=pageForId(g,g.hostId);await leader.locator('#case-'+field).selectOption(String(index));}
    await leader.locator('[data-case-action="review-theory"]').click();
    await collaborator.locator('[data-case-action="timeline-up"][data-event-id="'+story.chronology.order[3]+'"]').click();await leader.locator('[data-case-action="review-theory"]').waitFor();
    await collaborator.locator('[data-case-action="timeline-up"][data-event-id="'+story.chronology.order[2]+'"]').click();
    await waitState(code,g=>g.party.timeline.join(',')===story.chronology.order.join(','));
    const labels=story.chronology.order.map(key=>story.chronology.events.find(e=>e.id===key).label);
    await leader.waitForFunction(labels=>[...document.querySelectorAll('.case-timeline li strong')].map(el=>el.textContent).join('|')===labels.join('|'),labels);
    if(retry){
        for(const field of ['suspect','destination'])await leader.locator('#case-'+field).selectOption(String((story.solution[field]+1)%(field==='suspect'?6:3)));
        await collaborator.locator('#case-proof-0').selectOption('a1');await collaborator.locator('#case-proof-1').selectOption('a2');await collaborator.locator('[data-case-action="timeline-up"][data-event-id="'+story.chronology.order[3]+'"]').click();
        await leader.waitForFunction(()=>document.querySelectorAll('.case-timeline li strong')[2]?.textContent==='Funds leave the bank');
        await leader.locator('[data-case-action="review-theory"]').click();await leader.locator('[data-case-action="accuse"]').click();g=await waitState(code,g=>g.phase==='finished');const failedTurn=g.turn.id,foundCount=g.party.found.length;
        await assertFailedCase(leader,foundCount);await assertFailedCase(collaborator,foundCount);await collaborator.reload({waitUntil:'domcontentloaded'});await assertFailedCase(collaborator,foundCount);assert.equal(await collaborator.locator('[data-case-action="retry-case"]').count(),0);
        await leader.locator('[data-case-action="retry-case"]').click();await waitState(code,g=>g.phase==='accusing'&&g.turn.id>failedTurn);await collaborator.reload({waitUntil:'domcontentloaded'});await collaborator.locator('#case-method').waitFor();assert.equal(await collaborator.locator('.case-confirmed').count(),1);assert.equal(await collaborator.locator('#case-method').inputValue(),String(story.solution.method));
        await collaborator.locator('[data-case-action="timeline-up"][data-event-id="'+story.chronology.order[2]+'"]').click();for(const[index,factId]of story.connection.pairs[0].entries())await collaborator.locator('#case-proof-'+index).selectOption(factId);
        for(const[field,index]of Object.entries(story.solution))await leader.locator('#case-'+field).selectOption(String(index));
        await leader.waitForFunction(labels=>[...document.querySelectorAll('.case-timeline li strong')].map(el=>el.textContent).join('|')===labels.join('|'),labels);
    }
    await leader.waitForFunction(({labels,theory,proof})=>labels.join('|')===[...document.querySelectorAll('.case-timeline li strong')].map(el=>el.textContent).join('|')&&Object.entries(theory).every(([field,value])=>document.getElementById('case-'+field)?.value===String(value))&&proof.every((value,index)=>document.getElementById('case-proof-'+index)?.value===value),{labels,theory:story.solution,proof:story.connection.pairs[0]});
    await leader.locator('[data-case-action="review-theory"]').click();await leader.locator('[data-case-action="accuse"]').click();g=await waitState(code,g=>g.phase==='finished');assert.equal(g.finishReason,'solved');
    if(retry)report.checks.push('Online failed case: both clients hide unsolved answers; only host retries; same notebook/answers and confirmed part survive refresh; corrected retry solves');
    leader=pageForId(g,g.hostId);
    if(process.argv.includes('--variants-only')){
        const originalScenario=g.party.scenarioId;await leader.locator('[data-case-action="replay-case"]').click();g=await waitState(code,g=>g.matchId===2);assert.equal(g.party.scenarioId,originalScenario);assert.equal((g.party.found||[]).length,0);
        await leader.locator('[data-case-action="request-end"]').click();await leader.locator('#confirmEndGameButton').click();await leader.locator('[data-case-action="shuffle-case"]').click();g=await waitState(code,g=>g.matchId===3);assert.notEqual(g.party.scenarioId,originalScenario);assert.equal(g.party.revealed,false);
        const nextStory=caseContent.caseStory(g);await leader.locator('[data-case-action="request-end"]').click();await leader.locator('#confirmEndGameButton').click();await leader.locator('[data-case-action="request-reveal"]').click();assert.equal(await collaborator.locator('[data-case-action="reveal-case"]').count(),0);await leader.locator('[data-case-action="reveal-case"]').click();g=await waitState(code,g=>g.party.revealed);assert.equal(g.finishReason,'stopped');
        await collaborator.locator('.case-solution').waitFor();assert.ok((await collaborator.locator('.case-solution').innerText()).includes(nextStory.people[nextStory.solution.suspect].name));await collaborator.reload({waitUntil:'domcontentloaded'});await collaborator.locator('.case-solution').waitFor();assert.ok((await collaborator.locator('.case-solution').innerText()).includes(nextStory.people[nextStory.solution.suspect].name));
        report.checks.push('Online scenario ID survives refresh; same replay retains ID; new draw excludes it; host-only reveal synchronizes the current variant and survives refresh without awarding a solve');
    }else{await leader.locator('[data-case-action="rematch"]').click();g=await waitState(code,g=>g.matchId===2);assert.equal(g.settings.caseId,caseContent.CASE_IDS[(caseContent.CASE_IDS.indexOf(id)+1)%caseContent.CASE_IDS.length]);assert.equal((g.party.found||[]).length,0);}
    if(live)for(const page of [host.page,guest.page]){await page.locator('[data-case-action="exit"]').click();await page.locator('#menu').waitFor({state:'visible'});}
    report.checks.push('Reconstructed Case Files: two online clients, role privacy, shared guest edits, refresh persistence, stale host review invalidation, complete timeline/proof/theory, next-case rematch');await host.context.close();await guest.context.close();
}
async function onlinePair(mode, format = 'voice') {
    console.log(`Checking ${mode} online`);
    const host = await pageFor(), guest = await pageFor();
    await host.page.locator('#quickMode').selectOption(mode);
    if (mode === 'table') await settings(host.page, { tableCycles: '1', ...(format === 'text' ? { tableTiming: 'unlimited' } : {}) });
    if (mode === 'case') await settings(host.page, { txtWords: 2, txtSeconds: 15 });
    else if (mode !== 'table') await settings(host.page, { pointsToWin: 30 });
    await host.page.locator('#online').click(); await host.page.locator('#playerName').fill('Host'); await host.page.locator('#createLobbyButton').click();
    await host.page.waitForFunction(() => /\b[A-Z]{4}\b/.test(document.getElementById('lblGameCode').textContent));
    const code = (await host.page.locator('#lblGameCode').textContent()).match(/\b[A-Z]{4}\b/)[0]; if(live)liveCodes.push(code); await waitState(code, game => game?.numPlayers === 1);
    await guest.page.locator('#online').click(); await guest.page.locator('#playerName').fill('Guest'); await guest.page.locator('#joinLobbyCode').fill(code); await guest.page.locator('#joinLobbyButton').click();
    await waitState(code, game => game.numPlayers === 2);
    let third = null;
    if (mode === 'table') {
        assert.equal(await host.page.locator('[data-table-action="start-game"][data-format="voice"]').isDisabled(), true);
        third = await pageFor(); await third.page.locator('#online').click(); await third.page.locator('#playerName').fill('Third'); await third.page.locator('#joinLobbyCode').fill(code); await third.page.locator('#joinLobbyButton').click();
        await waitState(code, game => game.numPlayers === 3);
    }
    const party = ['table', 'case'].includes(mode);
    await host.page.locator(mode === 'table' ? `[data-table-action="start-game"][data-format="${format}"]` : party ? '[data-party-action="start-game"]' : '#startOnlineGame').click();
    const lookup = game => {
        const person = game.teams.flatMap(team => team.players || []).find(player => player.playerId === game.turn.speakerId);
        return person.playerName === 'Host' ? [host.page, guest.page] : person.playerName === 'Third' ? [third.page, host.page] : [guest.page, host.page];
    };
    if (mode === 'table') {
        const pages={Host:host.page,Guest:guest.page,Third:third.page};
        for(let i=0;i<3;i++){
            const game=await waitState(code,g=>g.phase==='idle'),[speaker]=lookup(game);
            await speaker.locator('[data-table-action="start-round"]').click();assert.equal(await guest.page.locator('.table-word-card').count(),0);
            const started=await waitState(code,g=>g.phase==='describing');
            const others=game.party.players.filter(p=>p.id!==game.turn.speakerId).map(p=>pages[p.name]);
            if(format==='voice'){
                await speaker.locator('.table-word-card li').first().waitFor();assert.equal(await speaker.locator('.table-word-card li').count(),5);
                assert.equal(await others[0].locator('.table-word-card').count(),0);await speaker.locator('[data-table-action="end-round"]').click();
                await speaker.locator('.table-award').nth(0).locator('[data-table-action="assign-word"]').nth(1).click();
                await speaker.locator('.table-award').nth(1).locator('[data-table-action="assign-word"]').nth(2).click();
            }else{
                await speaker.locator('#tableDraft').waitFor();await speaker.locator('#tableDraft').fill('A helpful clue');await speaker.locator('[data-table-action="send-draft"]').click();
                await others[0].getByText('A helpful clue',{exact:true}).waitFor();await others[1].locator('#tableDraft').fill('Unsent draft');
                await others[0].locator('#tableDraft').fill('Wrong guess');await others[0].locator('[data-table-action="send-draft"]').click();
                await speaker.getByText('Wrong guess',{exact:true}).waitFor();assert.equal(await others[1].locator('#tableDraft').inputValue(),'Unsent draft');assert.equal(await others[1].getByText('Wrong guess',{exact:true}).count(),0);
                const answer=started.turn.words[0].trim();await others[1].locator('#tableDraft').fill(answer);await others[1].locator('[data-table-action="send-draft"]').click();
                await speaker.getByText(answer,{exact:true}).last().waitFor();
                const guessed=await waitState(code,g=>(g.turn.messages||[]).filter(m=>m.kind==='guess').length===2), message=guessed.turn.messages.filter(m=>m.kind==='guess')[1];
                assert.equal(message.text,answer);
                assert.equal(guessed.turn.messages.filter(m=>m.kind==='guess')[0].text,'Wrong guess');
                if(!i){await layout(speaker,'Typed clues / speaker');await speaker.screenshot({path:'reports/open-table-typed-mobile.png',fullPage:true});}
                await speaker.locator(`[data-table-action="award-guess"][data-message-id="${message.messageId}"]`).click();
                await waitState(code,g=>g.turn.activeIndex===1);
                for(let word=1;word<5;word++)await speaker.locator('[data-table-action="skip-word"]').click();
            }
            await waitState(code,g=>g.phase==='selecting');await others[0].reload({waitUntil:'domcontentloaded'});await others[0].locator('.table-award').first().waitFor();
            await speaker.locator('[data-table-action="submit-round"]').click();
            const scored=await waitState(code,g=>(g.party.history||[]).length===i+1);assert.equal(scored.party.history[i].earned,format==='voice'?2:1);
            await host.page.locator('[data-table-action="react"]').first().waitFor();
            assert.equal(await host.page.locator('[data-table-action="react"]').count(),7);
        }
        assert.equal((await gameState(code)).phase,'finished');
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
    if (party) {
        const latest = await gameState(code), hostName = latest.teams.flatMap(t=>t.players||[]).find(p=>p.playerId===latest.hostId).playerName;
        const hostPage = hostName==='Host'?host.page:hostName==='Guest'?guest.page:third.page;
        await hostPage.locator(mode==='table'?'[data-table-action="rematch"]':'[data-party-action="rematch"]').first().click(); await waitState(code, value => value.matchId === 2);
    }
    report.checks.push(`${mode}${mode==='table'?' / '+format:''}: ${third ? 'three' : 'two'} real browser clients, shared transactions, roles/word privacy, scoring${mode === 'table' || mode === 'case' ? ', refresh and rematch' : ''}`);
    if (live) for (const entry of [host, guest, third].filter(Boolean)) {
        const leave = entry.page.locator(mode==='table'?'[data-table-action="exit"]':party?'[data-party-action="exit"]':'#changeSettingsButton'); await leave.click(); await entry.page.locator('#menu').waitFor({ state: 'visible' });
    }
    await host.context.close(); await guest.context.close(); await third?.context.close();
}
(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); base = `http://127.0.0.1:${server.address().port}/`;
    browser = await chromium.launch({ ...(process.platform === 'win32' ? { channel: 'msedge' } : {}), headless: true });
    try {
        caseContent=await import('../gameplay/cases.js');
        if(process.argv.includes('--beta-only')){const beta=require('./test-cake-beta-browser.cjs')({pageFor,gate,settings,layout,report,gameState,waitState,live,liveCodes,caseContent});if(!process.argv.includes('--online-only'))await beta.local();if(!process.argv.includes('--local-only'))await beta.online();}
        else if(process.argv.includes('--variants-only')){if(!process.argv.includes('--online-only'))await localVariations();if(!process.argv.includes('--local-only'))await onlineCase();}
        else if(process.argv.includes('--new-cases-only')){if(!process.argv.includes('--online-only'))for(const id of ['cake','duck','ghost'])await localCase(id);if(!process.argv.includes('--local-only'))await onlineCase();}
        else if(process.argv.includes('--case-retry-only')){if(!process.argv.includes('--online-only'))await localCaseRetry();if(!process.argv.includes('--local-only'))await onlineCase(true);}
        else if(process.argv.includes('--cases-only')) {if(!process.argv.includes('--online-only'))for(const id of caseContent.CASE_IDS)await localCase(id);if(!process.argv.includes('--local-only'))await onlineCase();}
        else if(process.argv.includes('--table-only')) {
            if(!process.argv.includes('--online-only')){await localTable();await localTableTimed();await localAiCompatibility();}
            if(!process.argv.includes('--local-only')){if(!process.argv.includes('--typed-only'))await onlinePair('table','voice');await onlinePair('table','text');}
        }
        else { if (!process.argv.includes('--online-only')) { if (!process.argv.includes('--party-only')) { await localStakes('boost'); await localStakes('double'); } await localTable(); await localCase(); await localAiCompatibility(); }
        if (!process.argv.includes('--local-only')) for (const mode of process.argv.includes('--party-only') ? ['table', 'case'] : ['boost', 'double', 'table', 'case']) if(mode==='case')await onlineCase();else await onlinePair(mode); }
        if (!live) report.transactions = transactions;
        assert.deepEqual(report.errors, []); report.completed = true; console.log(JSON.stringify(report, null, 2));
    } catch (error) { report.failure = error.message; throw error;
    } finally {
        if(live){
            for(const page of openedPages)if(!page.isClosed())try{const exit=page.locator('[data-beta-action="exit"]:visible, [data-case-action="exit"]:visible, [data-table-action="exit"]:visible, [data-party-action="exit"]:visible, #changeSettingsButton:visible').first();if(await exit.count()){await exit.click({timeout:5000});await page.locator('#menu').waitFor({state:'visible',timeout:5000});}}catch(error){console.error('Test lobby exit:',error.message);}
            report.cleanup = { created:liveCodes.length, closed:0, remaining:[] };
            for(const code of liveCodes){const game=await gameState(code);if(!game||game.phase==='ended'&&!game.teams.some(t=>(t.players||[]).length))report.cleanup.closed++;else report.cleanup.remaining.push(code);}
            if(report.cleanup.remaining.length){report.completed=false;report.failure='Temporary test lobby cleanup incomplete';process.exitCode=1;}
        }
        fs.writeFileSync(process.argv.includes('--beta-only')?(live?'reports/cake-beta-live.json':process.argv.includes('--local-only')?'reports/cake-beta-local-browser.json':process.argv.includes('--online-only')?'reports/cake-beta-online-browser.json':'reports/cake-beta-browser.json'):process.argv.includes('--variants-only')?(live?'reports/case-variations-live.json':'reports/case-variations-browser.json'):process.argv.includes('--new-cases-only')?(live?'reports/new-cases-live.json':'reports/new-cases-browser.json'):process.argv.includes('--case-retry-only')?(live?'reports/case-retry-live.json':'reports/case-retry-browser.json'):process.argv.includes('--cases-only')?(live?'reports/cases-live.json':process.argv.includes('--online-only')?'reports/cases-online-browser.json':'reports/cases-browser.json'):process.argv.includes('--table-only')?(live?'reports/open-table-live.json':'reports/open-table-browser.json'):live ? 'reports/new-modes-live.json' : process.argv.includes('--local-only') ? 'reports/new-modes-local-browser.json' : 'reports/new-modes-browser.json', JSON.stringify(report, null, 2)); await browser?.close(); server.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; server.close(); });
