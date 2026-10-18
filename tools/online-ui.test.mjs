import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import * as OnlineState from '../online/state.js';
import { OnlineClient } from '../online/client.js';

const source = fs.readFileSync(new URL('../script.js', import.meta.url), 'utf8').replace(/^import .*$/gm, '');
const now = 1000000;
const actor = name => ({ playerId: `id-${name}`, playerName: name, connectionId: `connection-${name}` });
const rules = { drawWords: () => ({ words: ['One', 'Two', 'Three'], pools: {} }) };
function game(names = ['A', 'B', 'C', 'D']) {
    let data = { protocolVersion: 2, dateCreated: now, settings: {
        numTeams: 2, numWords: 3, numSeconds: 30, pointsToWin: 20,
        difficulty: 'normal', selectedTheme: 'None', selectedCategories: [], chaosMode: false, trainingMode: false
    }, teams: [{ id: 0, points: 0 }, { id: 1, points: 0 }], phase: 'waiting', gameState: 'waiting', currentTeam: 1, currentRound: 0, hostId: '', hostEpoch: 0 };
    for (const name of names) data = OnlineState.join(data, actor(name), now);
    data = OnlineState.act(data, actor('A'), { type: 'start-game' }, now);
    return data;
}
function act(data, type, extras = {}) {
    return OnlineState.act(data, actor('A'), { type, turnId: data.turn.id, ...extras }, now, rules);
}
function ui() {
    let clock = now;
    const nodes = new Map(), storage = new Map();
    const metrics = { intervals: [], commands: [], alerts: [], reloads: 0, history: [] };
    function element(id = '') {
        const classes = new Set(), events = new Map();
        return { id, hidden: true, disabled: false, value: '', textContent: '', innerHTML: '', style: {}, dataset: {}, children: [],
            classList: { contains: c => classes.has(c), add: (...cs) => cs.forEach(c => classes.add(c)), remove: (...cs) => cs.forEach(c => classes.delete(c)), toggle: (c, on) => on ? classes.add(c) : classes.delete(c) },
            appendChild(child) { this.children.push(child); }, prepend() {},
            addEventListener(name, callback, options) {
                if (!events.has(name)) events.set(name, []);
                events.get(name).push({ callback, once: options?.once });
            },
            removeEventListener(name, callback) { events.set(name, (events.get(name) || []).filter(item => item.callback !== callback)); },
            emit(name) { for (const item of [...events.get(name) || []]) { item.callback(); if (item.once) this.removeEventListener(name, item.callback); } },
            querySelectorAll: () => [] };
    }
    const el = id => { if (!nodes.has(id)) nodes.set(id, element(id)); return nodes.get(id); };
    const buttons = Array.from({ length: 16 }, () => element());
    const ctx = vm.createContext({
        OnlineState, OnlineClient, crypto: webcrypto,
        initializeApp: () => ({}), getDatabase: () => ({}), GoogleGenerativeAI: class { getGenerativeModel() { return {}; } },
        document: { readyState: 'loading', getElementById: el, querySelectorAll: selector => selector.includes('scoreButton') ? buttons : [],
            getElementsByClassName: name => name === 'scoreButton' ? buttons : [], body: element(), createElement: () => element(), addEventListener() {} },
        window: { addEventListener() {}, matchMedia: () => ({ matches: false }) },
        sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
        localStorage: { getItem: () => null, setItem() {} },
        setInterval: callback => { metrics.intervals.push(callback); return metrics.intervals.length; }, clearInterval() {}, setTimeout: () => 1, clearTimeout() {},
        console, alert: message => metrics.alerts.push(message), location: { reload: () => metrics.reloads++ },
        categories: { Sample: [
            { word: 'One', difficulty: 'easy', description: 'First number.' },
            { word: 'Two', difficulty: 'hard', description: 'Second number.' },
            { word: 'Three', difficulty: 'easy', description: 'Third number.' },
            { word: 'Four', difficulty: 'hard', description: 'Fourth number.' }
        ] }, themes: {}, metrics
    });
    vm.runInContext(source, ctx);
    const run = value => vm.runInContext(value, ctx);
    run(`updateBoard=()=>{};updateTeamScores=()=>{};updateCurrentTeamIndicator=()=>{};
        refreshChaosModeUi=()=>{};generateBoard=()=>{};createTeamAuditTables=()=>{};createTeamAuditColumns=()=>{};
        createTeamAuditRows=(...args)=>metrics.history.push(args);showNotification=()=>{};`);
    return { run, el, buttons, metrics, storage,
        set now(value) { clock = value; },
        mount(data, who = actor('A')) {
            ctx.data = structuredClone(data); ctx.who = who; ctx.clock = () => clock;
            run(`isOnlineGame=true;gameCode='TEST';onlineClient={snapshot:data,actor:who,serverNow:clock,connected:true,busy:false,
                close:async()=>{},command:async request=>{metrics.commands.push(request);return true}};renderOnlineSnapshot(data)`);
        },
        apply(data) { ctx.data = structuredClone(data); run('onlineClient.snapshot=data;renderOnlineSnapshot(data)'); }
    };
}

test('roster updates during a round keep words and timer visible and Start Round hidden', () => {
    const h = ui(); let data = act(game(['A', 'B', 'C', 'D', 'E', 'F']), 'start-round', { seed: 3 });
    h.mount(data);
    data = OnlineState.join(data, actor('G'), now); h.apply(data);
    assert.equal(h.el('startRoundButton').hidden, true);
    assert.equal(h.el('scoreInput').hidden, false);
    assert.equal(h.el('timer').hidden, false);
    assert.equal(h.buttons[0].textContent, 'One');
    assert.equal(h.metrics.intervals.length, 0); // online mode never starts a client-owned countdown
});

test('selection highlights, count and controls survive roster refreshes', () => {
    let data = act(act(game(['A', 'B', 'C', 'D', 'E', 'F']), 'start-round', { seed: 4 }), 'end-round');
    data = act(data, 'toggle-answer', { index: 1 });
    const h = ui(); h.mount(data);
    data = OnlineState.leave(data, actor('F'), now); h.apply(data);
    assert.equal(h.buttons[1].classList.contains('score-button-selected'), true);
    assert.equal(h.run('selectedButtons'), 1);
    assert.equal(h.el('nextRoundButton').hidden, false);
    assert.equal(h.el('startRoundButton').hidden, true);
});

test('late opposing join renders the current words and deadline from one snapshot', () => {
    let data = act(game(['A', 'B', 'C', 'D', 'E', 'F']), 'start-round', { seed: 1 });
    data = OnlineState.join(data, actor('G'), now); data = OnlineState.join(data, actor('H'), now);
    const h = ui(); h.now = now + 12000; h.mount(data, actor('H'));
    assert.equal(h.buttons[0].textContent, 'One');
    assert.equal(h.el('scoreInput').hidden, false);
    assert.equal(h.el('timer').textContent, '18');
    assert.equal(h.buttons[0].disabled, true);
});

test('two-player spectators and teammates never receive visible words', () => {
    const small = ui(); small.mount(act(game(['A', 'B']), 'start-round', { seed: 1 }), actor('B'));
    assert.equal(small.el('scoreInput').hidden, true);
    const teammate = ui(); teammate.mount(act(game(), 'start-round', { seed: 1 }), actor('C'));
    assert.equal(teammate.el('scoreInput').hidden, true);
});

test('opponents can observe selection but only the speaker has enabled answer controls', () => {
    const data = act(act(game(), 'start-round', { seed: 1 }), 'end-round');
    const h = ui(); h.mount(data, actor('B'));
    assert.equal(h.el('scoreInput').hidden, false);
    assert.equal(h.buttons[0].disabled, true);
    assert.equal(h.el('nextRoundButton').hidden, true);
    assert.equal(h.el('timer').hidden, true);
});

test('removal and connection loss immediately revoke local controls', () => {
    let data = act(game(['A', 'B', 'C', 'D', 'E', 'F']), 'start-round', { seed: 1 });
    const h = ui(); h.mount(data);
    h.run('onlineClient.connected=false;renderOnlineControls()');
    assert.equal(h.run('isSpeaker'), false); assert.equal(h.run('isHost'), false);
    assert.equal(h.el('endRoundButton').hidden, true); assert.equal(h.el('scoreInput').hidden, true);
    h.run('onlineClient.connected=true');
    data = OnlineState.leave(data, actor('A'), now); h.apply(data);
    assert.equal(h.run('isSpeaker'), false);
    assert.equal(h.el('rejoinOnlineGame').hidden, false);
});

test('reconnecting renders saved scoring selection rather than resetting it', () => {
    let data = act(act(game(), 'start-round', { seed: 1 }), 'end-round');
    data = act(data, 'toggle-answer', { index: 2 });
    const refreshed = { ...actor('A'), connectionId: 'refreshed' };
    data = OnlineState.join(data, refreshed, now);
    const h = ui(); h.mount(data, refreshed);
    assert.equal(h.buttons[2].classList.contains('score-button-selected'), true);
    assert.equal(h.el('nextRoundButton').hidden, false);
    assert.equal(h.el('startRoundButton').hidden, true);
    assert.equal(JSON.parse([...h.storage.values()][0]).playerId, actor('A').playerId);
});

test('late join restores the complete round history and does not duplicate it', () => {
    let data = act(act(game(), 'start-round', { seed: 1 }), 'end-round');
    data = act(data, 'toggle-answer', { index: 0 }); data = act(data, 'submit-round');
    const h = ui(); h.mount(data, actor('B')); h.apply(data);
    assert.equal(h.metrics.history.length, 1);
    assert.equal(h.metrics.history[0][2][0], 'One');
});

test('terminal snapshot closes locally without sending deletion or resumed writes', () => {
    let data = game(); data = OnlineState.act(data, actor('A'), { type: 'end-game' }, now);
    const h = ui(); h.mount(data); h.apply(data);
    assert.equal(h.metrics.reloads, 1);
    assert.equal(h.metrics.alerts.length, 1);
    assert.equal(h.metrics.commands.length, 0);
    assert.equal(h.storage.size, 0);
});

test('online word drawing is deterministic, consumes pools and never repeats within a round', () => {
    const h = ui(), data = game(); h.mount(data);
    const result = h.run('drawOnlineWords(data,123)');
    assert.deepEqual(JSON.parse(JSON.stringify(result)), JSON.parse(h.run('JSON.stringify(drawOnlineWords(data,123))')));
    assert.equal(new Set(result.words).size, 3);
    const remaining = [...result.pools.easyWords, ...result.pools.hardWords];
    assert.equal(remaining.some(word => result.words.includes(word)), false);
});

test('actual Chaos planner is deterministic and final resolution keeps joins and animation scores coherent', () => {
    let data = act(act(game(['A', 'B', 'C', 'D', 'E', 'F']), 'start-round', { seed: 99 }), 'end-round');
    data = act(data, 'toggle-answer', { index: 0 }); data.settings.chaosMode = true;
    const h = ui(); h.mount(data);
    const plan = h.run('planOnlineChaos(data,[1,0])');
    assert.deepEqual(JSON.parse(JSON.stringify(plan)), JSON.parse(h.run('JSON.stringify(planOnlineChaos(data,[1,0]))')));
    data = OnlineState.act(data, actor('A'), { type: 'submit-round', turnId: data.turn.id }, now,
        { planChaos: (g, points) => { h.apply(g); return h.run(`planOnlineChaos(data,${JSON.stringify(points)})`); } });
    data = OnlineState.join(data, actor('G'), now + 1); h.apply(data);
    h.now = now + data.turn.resolution.durationMs; h.run('renderOnlineClock()');
    assert.deepEqual(JSON.parse(h.run('JSON.stringify(teams.map(t=>t.points))')), [...plan.points]);
    data = OnlineState.act(data, actor('A'), { type: 'resolve-chaos', turnId: data.turn.id, hostEpoch: data.hostEpoch }, now + plan.durationMs);
    assert.equal(data.numPlayers, 7);
    assert.deepEqual(data.teams.map(t => t.points), [...plan.points]);
});

test('offline start, selection and score advance still work without online writes', async () => {
    const h = ui();
    h.run(`isOnlineGame=false;isChaosMode=false;isTrainingMode=false;numWords=2;numSeconds=30;difficulty='easy';
        teams=[{points:0},{points:0}];currentTeam=1;currentRound=0;currentGameWords=['One','Three','Four'];
        playSound=async()=>{};startRound()`);
    await Promise.resolve(); await Promise.resolve();
    assert.equal(h.buttons[0].textContent, 'One');
    assert.equal(h.el('timer').hidden, false);
    h.run('endRound();setScoreButtonSelected(document.querySelectorAll(".scoreButton")[0],true)');
    await h.run('nextRound()');
    assert.equal(h.run('teams[0].points'), 1);
    assert.equal(h.run('currentTeam'), 2);
    assert.equal(h.metrics.commands.length, 0);
});

test('a fast join defers modal hiding until opening completes, without hiding the next opening', () => {
    const h = ui(), modal = h.el('onlineModal');
    modal.classList.add('show');
    h.run(`globalThis.HTMLElement=class{};registerModalFocusGuards=()=>{};metrics.hides=0;globalThis.opening=true;
        getModalInstance=()=>({hide:()=>{metrics.hides++;if(!opening)document.getElementById('onlineModal').classList.remove('show')}});
        hideModalById('onlineModal')`);
    assert.equal(modal.classList.contains('show'), true);
    h.run('opening=false'); modal.emit('shown.bs.modal'); modal.emit('hidden.bs.modal');
    assert.equal(modal.classList.contains('show'), false);
    assert.equal(h.metrics.hides, 2);
    modal.classList.add('show'); modal.emit('shown.bs.modal');
    assert.equal(modal.classList.contains('show'), true);
});
