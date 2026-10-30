import { CASES } from '../gameplay/cases.js';
import { caseWordObjects, drawCaseCard } from '../gameplay/case-draw.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import * as OnlineState from '../online/state.js';
import { OnlineClient } from '../online/client.js';
import * as Gameplay from '../gameplay/rules.js';
import * as AiErrors from '../gameplay/ai-errors.js';
import * as AiPacks from '../gameplay/ai-packs.js';
import { normalizeOnlinePack } from '../gameplay/online-packs.js';
import * as Experience from '../gameplay/experience.js';
import * as PackLibrary from '../gameplay/saved-packs.js';
import { createScreenAwake } from '../gameplay/screen-awake.js';
import * as Modes from '../gameplay/modes.js';

const caseDataContext=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('../data.js',import.meta.url),'utf8')+'\nthis.caseDictionary=categories;',caseDataContext);
const caseDictionary=JSON.parse(JSON.stringify(caseDataContext.caseDictionary));

const source = fs.readFileSync(new URL('../script.js', import.meta.url), 'utf8').replace(/^import .*$/gm, '');
const now = 1000000;
const actor = name => ({ playerId: `id-${name}`, playerName: name, connectionId: `connection-${name}` });
const rules = { drawWords: () => ({ words: ['One', 'Two', 'Three'], pools: {} }) };
function game(names = ['A', 'B', 'C', 'D']) {
    let data = { protocolVersion: OnlineState.PROTOCOL_VERSION, dateCreated: now, settings: {
        numTeams: 2, numWords: 3, numSeconds: 30, pointsToWin: 20,
        difficulty: 'normal', selectedTheme: 'None', selectedCategories: [], chaosMode: false, trainingMode: false
    }, teams: [{ id: 0, points: 0 }, { id: 1, points: 0 }], phase: 'waiting', gameState: 'waiting', currentTeam: 1, currentRound: 0, hostId: '', hostEpoch: 0 };
    for (const name of names) data = OnlineState.join(data, actor(name), now);
    data = OnlineState.act(data, actor('A'), { type: 'start-game' }, now);
    return data;
}
function act(data, type, extras = {}) {
    return OnlineState.act(data, actor('A'), { type, turnId: data.turn.id, ...extras },
        Math.max(now, data.turn?.startedAt || 0, data.turn?.selectingAt || 0, data.turn?.submittedAt || 0), rules);
}
function ui() {
    let clock = now + Gameplay.ROUND_COUNTDOWN_MS;
    const nodes = new Map(), storage = new Map(), localStorageData = new Map();
    const metrics = { intervals: [], commands: [], alerts: [], reloads: 0, history: [], audioPlays: [] };
    function element(id = '') {
        const classes = new Set(), events = new Map();
        return { id, hidden: true, disabled: false, value: '', textContent: '', innerHTML: '', style: {}, dataset: {}, children: [], options: [], selectedOptions: [],
            classList: { contains: c => classes.has(c), add: (...cs) => cs.forEach(c => classes.add(c)), remove: (...cs) => cs.forEach(c => classes.delete(c)), toggle: (c, on) => on ? classes.add(c) : classes.delete(c) },
            setAttribute(name, value) { this[name] = value; },
            appendChild(child) { this.children.push(child); if (['categoriesSelect', 'themesSelect', 'quickPreset'].includes(id)) this.options.push(child); }, prepend() {},
            paused: true,
            play() { this.paused = false; metrics.audioPlays.push(id); return Promise.resolve(); },
            pause() { this.paused = true; },
            addEventListener(name, callback, options) {
                if (!events.has(name)) events.set(name, []);
                events.get(name).push({ callback, once: options?.once });
            },
            removeEventListener(name, callback) { events.set(name, (events.get(name) || []).filter(item => item.callback !== callback)); },
            emit(name, event = { target: this }) { for (const item of [...events.get(name) || []]) { item.callback(event); if (item.once) this.removeEventListener(name, item.callback); } },
            querySelectorAll: () => [] };
    }
    const el = id => { if (!nodes.has(id)) nodes.set(id, element(id)); return nodes.get(id); };
    const buttons = Array.from({ length: 16 }, () => element());
    const ctx = vm.createContext({
        OnlineState, OnlineClient, Gameplay, AiErrors, AiPacks, normalizeOnlinePack, Experience, PackLibrary, createScreenAwake, Modes, CASES, caseWordObjects, drawCaseCard, caseDictionary, crypto: webcrypto,
        initializeApp: () => ({}), getDatabase: () => ({}), createAiWordClient: () => ({}),
        document: { readyState: 'loading', getElementById: el, querySelectorAll: selector => selector.includes('scoreButton') ? buttons : [],
            getElementsByClassName: name => name === 'scoreButton' ? buttons : [], body: element(), createElement: () => element(), addEventListener() {} },
        window: { addEventListener() {}, matchMedia: () => ({ matches: false }) },
        sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
        localStorage: { getItem: key => localStorageData.get(key), setItem: (key, value) => localStorageData.set(key, value) },
        Date: class extends Date { static now() { return clock; } },
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
    run(`globalThis.actualUpdateBoard=updateBoard;globalThis.actualUpdateTeamScores=updateTeamScores;globalThis.actualGenerateBoard=generateBoard;
        updateBoard=()=>{};updateTeamScores=()=>{};updateCurrentTeamIndicator=()=>{};
        refreshChaosModeUi=()=>{};generateBoard=()=>{};createTeamAuditTables=()=>{};createTeamAuditColumns=()=>{};
        createTeamAuditRows=(...args)=>metrics.history.push(args);showNotification=()=>{};`);
    return { run, el, buttons, metrics, storage, localStorageData,
        set now(value) { clock = value; },
        mount(data, who = actor('A')) {
            ctx.data = structuredClone(data); ctx.who = who; ctx.clock = () => clock;
            run(`isOnlineGame=true;gameCode='TEST';onlineClient={snapshot:data,actor:who,serverNow:clock,connected:true,busy:false,
                close:async()=>{},command:async request=>{metrics.commands.push(request);return true}};renderOnlineSnapshot(data)`);
        },
        apply(data) { ctx.data = structuredClone(data); run('if(onlineClient)onlineClient.snapshot=data;renderOnlineSnapshot(data)'); }
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
    const h = ui(); h.now = now + Gameplay.ROUND_COUNTDOWN_MS + 12000; h.mount(data, actor('H'));
    assert.equal(h.buttons[0].textContent, 'One');
    assert.equal(h.el('scoreInput').hidden, false);
    assert.equal(h.el('timer').textContent, '18');
    assert.equal(h.buttons[0].disabled, true);
});

test('two-player guessers and teammates do not see words during the live round', () => {
    const small = ui(); small.mount(act(game(['A', 'B']), 'start-round', { seed: 1 }), actor('B'));
    assert.equal(small.el('scoreInput').hidden, true);
    const teammate = ui(); teammate.mount(act(game(), 'start-round', { seed: 1 }), actor('C'));
    assert.equal(teammate.el('scoreInput').hidden, true);
});

test('all players see live selection changes, including small-game guessers and the speaker teammate', () => {
    for(const names of [['A','B'],['A','B','C','D']]) {
        let data=act(act(game(names),'start-round',{seed:1}),'end-round');
        const viewers=names.map(name=>{const h=ui();h.mount(data,actor(name));return h;});
        for(const h of viewers)assert.equal(h.el('scoreInput').hidden,false);
        data=act(data,'toggle-answer',{index:1});
        viewers.forEach((h,index)=>{
            h.apply(data);
            assert.equal(h.buttons[1].classList.contains('score-button-selected'),true);
            assert.equal(h.buttons[1]['aria-pressed'],'true');
            assert.equal(h.buttons[0].textContent,'One');
            assert.equal(h.buttons[0].disabled,index!==0);
            assert.equal(h.el('nextRoundButton').hidden,index!==0);
            assert.equal(h.el('onlineRoundReview').hidden,true);
        });
        data=act(data,'toggle-answer',{index:1});
        for(const h of viewers){h.apply(data);assert.equal(h.buttons[1].classList.contains('score-button-selected'),false);}
    }
});

test('confirmed review shows all options without stealing board focus and clears before the next round', () => {
    let data=act(act(game(['A','B']),'start-round',{seed:1}),'end-round');
    data=act(data,'toggle-answer',{index:1});
    data=act(data,'submit-round');
    const h=ui();h.mount(data,actor('B'));
    assert.equal(h.el('scoreInput').hidden,true);
    assert.equal(h.el('onlineRoundReview').hidden,false);
    assert.equal(h.el('roundReviewTitle').textContent,"Team 1's answers");
    const rows=h.el('roundReviewAnswers').children;
    assert.deepEqual(rows.map(row=>row.children[1].textContent),['One','Two','Three']);
    assert.deepEqual(rows.map(row=>row.classList.contains('is-correct')),[false,true,false]);
    assert.equal(h.run('areWordsInFocusPhase()'),false);
    assert.equal(h.el('nextRoundButton').hidden,true);
    const signature=h.el('onlineRoundReview').dataset.signature;
    h.apply(data);assert.equal(h.el('onlineRoundReview').dataset.signature,signature);
    data=OnlineState.act(data,actor('B'),{type:'start-round',turnId:data.turn.id,seed:2},now+10000,rules);
    h.now=now+10000;h.apply(data);
    assert.equal(h.el('onlineRoundReview').hidden,true);
    assert.equal(h.el('roundReviewTitle').textContent,'');
    assert.equal(h.el('roundReviewAnswers').innerHTML,'');
    assert.equal(h.el('scoreInput').hidden,true);
    assert.equal(h.el('roundCountdown').hidden,false);
});

test('confirmed review remains visible through Chaos and hides when the viewer loses access', () => {
    let data=act(act(game(['A','B']),'start-round',{seed:99}),'end-round');
    data.settings.chaosMode=true;data.turn.selectedIndexes=[0,1];
    const h=ui();h.mount(data,actor('B'));
    data=OnlineState.act(data,actor('A'),{type:'submit-round',turnId:data.turn.id},now,
        {planChaos:(g,p)=>h.run(`planOnlineChaos(${JSON.stringify(g)},${JSON.stringify(p)})`)});
    h.apply(data);
    assert.equal(h.el('onlineRoundReview').hidden,false);
    assert.equal(h.el('scoreInput').hidden,true);
    assert.equal(h.run('areWordsInFocusPhase()'),false);
    data=OnlineState.act(data,actor('A'),{type:'resolve-chaos',turnId:data.turn.id,hostEpoch:data.hostEpoch},now+data.turn.resolution.durationMs);
    h.apply(data);assert.equal(h.el('onlineRoundReview').hidden,false);
    h.run('onlineClient.connected=false;renderOnlineControls()');
    assert.equal(h.el('onlineRoundReview').hidden,true);
    h.run('onlineClient.connected=true;renderOnlineControls()');
    assert.equal(h.el('onlineRoundReview').hidden,false);
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

test('a removed lobby closes locally without sending deletion or resumed writes', () => {
    let data = game(); data = OnlineState.act(data, actor('A'), { type: 'end-game' }, now);
    data.phase = 'ended';
    const h = ui(); h.mount(data); h.apply(data);
    assert.equal(h.metrics.reloads, 0);
    assert.equal(h.metrics.alerts.length, 0);
    assert.match(h.el('menuNotice').textContent, /lobby has closed/);
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

test('every client draws from the lobby pack with shared difficulty and exhaustion history, independent of its editor', () => {
    const data=game(['A','B']);
    data.wordPack=normalizeOnlinePack({kind:'custom',entries:[
        ...['E1','E2','E3','E4'].map(word=>({word,canonical:word,difficulty:'easy'})),
        ...['H1','H2'].map(word=>({word,canonical:word,difficulty:'hard'}))]});
    const first=ui(),second=ui();first.mount(data);second.mount(data,actor('B'));
    first.el('aiWords').value='Only in this browser';
    const draw=first.run('drawOnlineWords(data,123)');
    assert.deepEqual(JSON.parse(JSON.stringify(draw)),JSON.parse(second.run('JSON.stringify(drawOnlineWords(data,123))')));
    assert.equal(draw.words.filter(word=>word.startsWith('E')).length,2);
    assert.equal(draw.words.filter(word=>word.startsWith('H')).length,1);
    data.deck=draw.pools.deck;second.apply(data);
    const next=second.run('drawOnlineWords(data,456)');
    assert.equal(next.words.some(word=>draw.words.includes(word)),false);
    assert.ok([...draw.words,...next.words].every(word=>/^[EH]\d$/.test(word)));
    data.wordPack={kind:'custom',entries:[]};second.apply(data);
    assert.throws(()=>second.run('drawOnlineWords(data,1)'),/invalid-word-pack/);
});

test('AI host preparation snapshots the editor, waits for modal close, and cancellation restores normal online choices', () => {
    const h=ui();h.run(`globalThis.HTMLElement=class{};initializeMenu();
        getModalInstance=id=>({show:()=>{metrics.shown=id}});hideModalById=id=>{metrics.hidden=id};
        document.getElementById('aiWords').value='Mars\\nVenus';`);
    h.el('aiModal').classList.add('show');
    h.run('hostAIWordsOnline()');
    assert.equal(h.metrics.hidden,'aiModal');assert.equal(h.metrics.shown,undefined);
    assert.equal(h.el('joinLobbyChoice').hidden,true);
    assert.match(h.el('onlinePackNotice').textContent,/2-word pack/);
    h.el('aiWords').value='Edited after preparing';
    assert.equal(h.run('pendingOnlinePack.entries[0].word'),'Mars');
    h.el('aiModal').emit('hidden.bs.modal');assert.equal(h.metrics.shown,'onlineModal');
    h.el('onlineModal').emit('hidden.bs.modal');
    assert.equal(h.run('pendingOnlinePack'),null);
    assert.equal(h.el('joinLobbyChoice').hidden,false);
    assert.equal(h.el('createLobbyButton').textContent,'Create lobby');
});

test('hosting a shared pack retains normal online team/target settings and never loads built-in pools', async () => {
    const h=ui();
    h.run(`pendingOnlinePack=normalizeOnlinePack({kind:'custom',entries:[
            {word:'Custom easy',canonical:'Custom easy',difficulty:'easy'},
            {word:'Custom hard',canonical:'Custom hard',difficulty:'hard'}]});
        txtPlayerName.value='Pack Host';txtTeams.value='4';document.getElementById('pointsToWin').value='40';
        document.getElementById('winRule').value='first-to-target';
        document.getElementById('chkTraining').checked=true;
        loadWords=()=>{throw new Error('Built-in words must not be loaded')};
        ref=(db,path)=>({path});onValue=(ref,callback)=>callback({val:()=>0});get=async()=>({});
        serverTimestamp=()=>123;generateGameCode=()=>'PACK';
        runTransaction=async(ref,update)=>{metrics.initial=update(null);return {committed:true}};
        onLobbyJoined=async actor=>{metrics.joined=actor;isOnlineGame=true};`);
    await h.run('createGameLobby()');
    const initial=h.metrics.initial;
    assert.equal(initial.settings.numTeams,4);assert.equal(initial.settings.pointsToWin,40);
    assert.equal(initial.settings.winRule,'first-to-target');
    assert.equal(initial.settings.trainingMode,false);assert.equal(initial.settings.selectedTheme,'None');
    assert.equal(initial.wordPack.entries.length,2);
    assert.deepEqual([...initial.easyWords],['Custom easy']);assert.deepEqual([...initial.hardWords],['Custom hard']);
    assert.equal(initial.protocolVersion,OnlineState.PROTOCOL_VERSION);
    assert.equal(h.metrics.joined.playerName,'Pack Host');
});

test('online hosting rejects empty or overlarge packs without destroying the current editor', () => {
    const h=ui();
    h.run(`getModalInstance=()=>({show(){}});document.getElementById('aiWords').value='';hostAIWordsOnline()`);
    assert.match(h.el('aiFeedback').textContent,/Generate or paste/);
    h.el('aiWords').value=Array.from({length:151},(_,i)=>`Word ${i}`).join('\n');
    h.run('hostAIWordsOnline()');
    assert.match(h.el('aiFeedback').textContent,/up to 150/);
    assert.equal(h.el('aiWords').value.split('\n').length,151);
    assert.equal(h.run('pendingOnlinePack'),null);
});

test('online custom packs never borrow training descriptions from matching built-in words', () => {
    const data=act(game(['A','B']),'start-round',{seed:1});data.settings.trainingMode=true;
    data.wordPack={kind:'custom',entries:[{word:'One',canonical:'One',difficulty:'easy'}]};
    const h=ui();h.mount(data);
    assert.equal(h.el('currentWords').hidden,true);assert.equal(h.el('trainingHintsDrawer').hidden,true);
    assert.match(h.el('lobbySummary').textContent,/Custom pack: 1 word\b/);
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
    h.now = now + Gameplay.ROUND_COUNTDOWN_MS * 2; h.metrics.intervals.at(-1)();
    assert.ok(['One','Three','Four'].includes(h.buttons[0].textContent));
    assert.equal(h.el('timer').hidden, false);
    assert.equal(h.el('tickSound').paused, false);
    h.run('endRound();setScoreButtonSelected(document.querySelectorAll(".scoreButton")[0],true)');
    assert.equal(h.el('tickSound').paused, true);
    await h.run('nextRound()');
    assert.equal(h.run('teams[0].points'), 1);
    assert.equal(h.run('currentTeam'), 2);
    assert.equal(h.metrics.commands.length, 0);
});

test('local 3-2-1-Go hides words and ticking, then grants the full timer independently of audio', async () => {
    for (const audioMode of ['normal','muted','blocked']) {
        const h=ui();h.now=now;
        h.run(`isOnlineGame=false;teams=[{points:0},{points:0}];currentTeam=1;numSeconds=30;numWords=2;
            currentGameWords=['One','Two','Three'];preferences.muted=${audioMode==='muted'};
            ${audioMode==='blocked'?`countdownSound.play=()=>Promise.reject(new Error('blocked'));`:''}startRound()`);
        const render=h.metrics.intervals.at(-1), count=h.metrics.intervals.length;
        h.run('startRound();endRound()'); // No duplicate countdown or early completion.
        assert.equal(h.metrics.intervals.length,count);
        for(const [elapsed,label] of [[0,'3'],[1200,'2'],[2400,'1'],[3600,'Go!'],[4499,'Go!']]) {
            h.now=now+elapsed;render();
            assert.equal(h.el('roundCountdownValue').textContent,label);
            assert.equal(h.el('timer').hidden,true);
            assert.equal(h.el('scoreInput').hidden,true);
            assert.ok(h.buttons.every(button=>button.hidden&&button.textContent===''));
            assert.equal(h.el('tickSound').paused,true);
            assert.equal(h.el('endRoundButton').hidden,true);
        }
        h.now=now+Gameplay.ROUND_COUNTDOWN_MS;render();
        assert.equal(h.el('roundCountdown').hidden,true);
        assert.equal(h.el('timer').textContent,'30');
        assert.equal(h.el('timer').hidden,false);
        assert.equal(h.buttons[0].hidden,false);
        assert.equal(h.el('countdownSound').paused,true);
        assert.equal(h.run('localTurnStartedAt'),now+Gameplay.ROUND_COUNTDOWN_MS);
        h.now=now+Gameplay.ROUND_COUNTDOWN_MS+1000;render();
        assert.equal(h.el('timer').textContent,'29');
        await Promise.resolve();
    }
});

test('online countdown reconnects seek the cue and reveal words only at the shared start', () => {
    const data=act(game(), 'start-round', {seed:1}),h=ui();
    data.settings.trainingMode=true;
    h.now=now+2500;h.mount(data);
    assert.equal(h.el('roundCountdownValue').textContent,'1');
    assert.equal(h.el('countdownSound').currentTime,2.5);
    assert.ok(h.buttons.every(button=>button.hidden&&button.textContent===''));
    assert.equal(h.el('timer').hidden,true);
    assert.equal(h.el('currentWords').hidden,true);
    h.apply(data);
    assert.equal(h.metrics.audioPlays.filter(id=>id==='countdownSound').length,1);
    h.now=data.turn.startedAt;h.run('renderOnlineControls()');
    assert.equal(h.el('roundCountdown').hidden,true);
    assert.equal(h.el('timer').textContent,'30');
    assert.equal(h.buttons[0].textContent,'One');
    assert.equal(h.el('currentWords').hidden,false);
    assert.equal(h.el('tickSound').paused,false);
    assert.equal(h.el('countdownSound').paused,true);
    h.now=data.turn.startedAt+2000;h.apply(data);
    assert.equal(h.el('timer').textContent,'28');
    assert.equal(h.metrics.audioPlays.filter(id=>id==='countdownSound').length,1);
});

test('AI and pasted packs hide training hints even for words that match the built-in dictionary', () => {
    const h=ui();
    h.run(`isTrainingMode=true;isAiGame=false;renderTrainingHints(['One'])`);
    assert.equal(h.el('trainingHintsDrawer').hidden,false);
    assert.equal(h.el('currentWords').hidden,false);
    assert.match(h.el('currentWords').children[1].children[1].textContent,/First number/);
    h.run(`isAiGame=true;renderTrainingHints(['One','Molecular Formula'])`);
    assert.equal(h.el('trainingHintsDrawer').hidden,true);
    assert.equal(h.el('currentWords').hidden,true);
    assert.equal(h.el('currentWords').innerHTML,'');
    assert.equal(h.run('isTrainingMode'),true); // Preserve the preference for built-in games.
    h.run(`isAiGame=false;renderTrainingHints(['Two'])`);
    assert.equal(h.el('trainingHintsDrawer').hidden,false);
});

test('training hints omit missing descriptions and hide the drawer when none are available', () => {
    const h=ui();
    h.run(`isTrainingMode=true;renderTrainingHints(['One','Unknown answer'])`);
    assert.equal(h.el('trainingHintsDrawer').hidden,false);
    const cards=h.el('currentWords').children.slice(1);
    assert.equal(cards.length,1);
    assert.equal(cards[0].children[0].textContent,'One');
    assert.equal(h.run(`getTrainingDescription('Unknown answer')`),'');
    h.run(`renderTrainingHints(['Molecular Formula',"Huygens' Principle"])`);
    assert.equal(h.el('trainingHintsDrawer').hidden,true);
    assert.equal(h.el('currentWords').hidden,true);
    assert.equal(h.el('currentWords').innerHTML,'');
    assert.equal(h.run('trainingSignature'),'');
});

test('training hint cache follows description changes and respects speaker access', () => {
    const h=ui();
    h.run(`isTrainingMode=true;setWordDescriptionsFromObjects([{word:'One',description:'Original hint'}]);renderTrainingHints(['One'])`);
    const before=h.run('trainingSignature');
    h.run(`setWordDescriptionsFromObjects([{word:'One',description:'Updated hint'}]);renderTrainingHints(['One'])`);
    assert.notEqual(h.run('trainingSignature'),before);
    h.run(`isOnlineGame=true;isSpeaker=false;renderTrainingHints(['One'])`);
    assert.equal(h.el('trainingHintsDrawer').hidden,true);
    h.run(`isSpeaker=true;renderTrainingHints(['One'])`);
    assert.equal(h.el('trainingHintsDrawer').hidden,false);
    h.run(`isTrainingMode=false;renderTrainingHints(['One'])`);
    assert.equal(h.el('trainingHintsDrawer').hidden,true);
});

test('ending during a local lead-in cancels its sound and cannot reveal words later', async () => {
    const h=ui();h.now=now;
    h.run(`isOnlineGame=false;teams=[{points:0},{points:0}];currentTeam=1;currentGameWords=['One'];
        hideModalById=()=>{};startRound()`);
    const queued=h.metrics.intervals.at(-1);
    await h.run('endGame()');
    assert.equal(h.el('roundCountdown').hidden,true);
    assert.equal(h.el('countdownSound').paused,true);
    h.now=now+10000;queued();
    assert.equal(h.el('timer').hidden,true);
    assert.ok(h.buttons.every(button=>button.hidden));
});

test('online lobby counts and actual board tokens reflect empty and disconnected teams', () => {
    let data=game(['A','B']);data.isGameStarted=false;
    data=OnlineState.leave(data,actor('B'),now);
    const h=ui();h.mount(data);
    h.run('actualGenerateBoard();actualUpdateBoard();actualUpdateTeamScores()');
    const tokens=h.el('gameBoard').children[0].children.find(e=>e.className==='board-tokens').children;
    assert.equal(tokens.length,1);
    assert.equal(h.el('onlineLabel').textContent,'Lobby');
    assert.equal(h.el('onlineModalLabel').textContent,'Lobby');
    assert.match(h.el('lobbySummary').textContent,/1 player connected.*1 of 2 teams online/);
    assert.equal(h.el('startOnlineGame').disabled,true);
    assert.match(h.el('teamScores').children[1].textContent,/waiting for players/);
    data=OnlineState.join(data,actor('B'),now);
    OnlineState.connection(data,OnlineState.ownsSeat(data,actor('B'))).connected=false;
    const disconnected=ui();disconnected.mount(data);
    disconnected.run('actualGenerateBoard();actualUpdateBoard()');
    const heldTokens=disconnected.el('gameBoard').children[0].children.find(e=>e.className==='board-tokens').children;
    assert.equal(heldTokens.length,2);
    assert.equal(heldTokens[1].classList.contains('team-token-disconnected'),true);
    assert.match(disconnected.el('lobbySummary').textContent,/1 reconnecting/);
    assert.equal(disconnected.el('startOnlineGame').disabled,true);
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

test('bomb loss is capped and a shield blocks either a bomb or incoming steal loss', () => {
    const h = ui();
    for (const points of [1, 18, 59]) {
        const result = h.run(`(()=>{const teamsData=[{points:${points}},{points:0}],shields=[0,0];
            const effect=applyChaosPowerupToState({teamsData,shields,actingTeamIndex:0,powerupType:'bomb'});
            return {points:teamsData[0].points,delta:effect.actorDelta};})()`);
        assert.equal(result.points, Math.max(0, points - 3));
        assert.equal(result.delta, -Math.min(3, points));
    }
    const protectedBomb = h.run(`(()=>{const teamsData=[{points:18},{points:0}],shields=[1,0];
        applyChaosPowerupToState({teamsData,shields,actingTeamIndex:0,powerupType:'bomb'});return {teamsData,shields};})()`);
    assert.equal(protectedBomb.teamsData[0].points, 18); assert.equal(protectedBomb.shields[0], 0);
    const steal = h.run(`(()=>{const teamsData=[{points:2},{points:8}],shields=[0,1];
        const effect=applyChaosPowerupToState({teamsData,shields,actingTeamIndex:0,powerupType:'steal1',rng:()=>0});return {teamsData,shields,effect};})()`);
    assert.equal(steal.teamsData[0].points, 3); assert.equal(steal.teamsData[1].points, 8);
    assert.equal(steal.shields[1], 0); assert.equal(steal.effect.victimBlocked, true);
    const duplicate = h.run(`(()=>{const shields=[1,0]; const effect=applyChaosPowerupToState({teamsData:[{points:1},{points:0}],shields,actingTeamIndex:0,powerupType:'shield'});
        return {shields,text:formatChaosSummaryForAudit(effect)};})()`);
    assert.equal(duplicate.shields[0], 1); assert.match(duplicate.text, /already ready/);
});

test('a winning Chaos move skips effects and leaves time to see the finish', () => {
    const h = ui(), data = act(act(game(), 'start-round', { seed: 6 }), 'end-round');
    data.settings.chaosMode = true; data.turn.selectedIndexes = [0, 1, 2];
    h.mount(data);
    const plan = h.run('planOnlineChaos(data,[22,0])');
    assert.equal(plan.landing, null); assert.equal(plan.points[0], 22);
    assert.equal(plan.durationMs, Gameplay.resolutionDuration(false, true, 3));
});

test('Chaos frames settle, reveal power-ups before moving, then keep the same landing and effect sequence', () => {
    const h = ui();
    h.run(`teams=[{points:2},{points:7}];pointsToWin=20;preferences.motion='full';
        globalThis.plan={actorIndex:0,moveCount:3,basePoints:[5,7],points:[2,7],shields:[0,0],
        powerups:{5:'bomb'},landing:{teamIndex:0,tileIndex:5,type:'bomb'},actorDelta:-3,victimDelta:0,
        effect:{type:'bomb',actorDelta:-3},durationMs:Gameplay.resolutionDuration(true,false,3)};renderResolutionFrame(plan,0)`);
    const saved = h.run('JSON.stringify(plan)');
    assert.equal(h.run('teams[0].points'), 2);
    assert.equal(h.run('powerupRevealVisible'), false);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · The board');
    h.run('renderResolutionFrame(plan,349)');
    assert.equal(h.run('powerupRevealVisible'), false);
    h.run('renderResolutionFrame(plan,350)');
    assert.equal(h.run('powerupRevealVisible'), true);
    assert.equal(h.run('teams[0].points'), 2);
    assert.equal(h.run('landedPowerupPreview'), null);
    assert.equal(h.el('chaosMessage').textContent, 'Power-ups revealed!');
    h.run('renderResolutionFrame(plan,799)');
    assert.equal(h.run('teams[0].points'), 2);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Power-ups');
    h.run('renderResolutionFrame(plan,800)');
    assert.equal(h.el('chaosMessage').textContent, 'Team 1 moves 3 spaces…');
    h.run('renderResolutionFrame(plan,1260)');
    assert.equal(h.run('teams[0].points'), 3);
    assert.equal(h.run('powerupRevealVisible'), true);
    assert.equal(h.run('landedPowerupPreview'), null);
    h.run('renderResolutionFrame(plan,2180)');
    assert.equal(h.run('teams[0].points'), 5);
    assert.equal(h.run('powerupRevealVisible'), true);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Landed');
    h.run('renderResolutionFrame(plan,3580)');
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Chaos!');
    assert.match(h.el('chaosMessage').textContent, /Bomb!/);
    h.run('renderResolutionFrame(plan,4980)');
    assert.equal(h.run('teams[0].points'), 2);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Turn result');
    assert.equal(h.el('chaosTotal').textContent, '2 points');
    assert.match(h.el('chaosDetail').textContent, /space 5.*space 2/);
    h.run('renderResolutionFrame(plan,7379)');
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Turn result');
    assert.equal(h.run('JSON.stringify(plan)'), saved);
    h.run('preferences.motion="reduced";onlineBoardSignature="";renderResolutionFrame(plan,0)');
    assert.equal(h.run('teams[0].points'), 2);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Turn result');
    assert.match(h.el('chaosMessage').textContent, /Bomb! Back 3 spaces/);
});

test('board badges pop only during the reveal and do not highlight the landing before arrival', () => {
    for (const [elapsed, shown, popping, landed] of [[0,false,false,false], [349,false,false,false],
        [350,true,true,false], [799,true,true,false], [800,true,false,false], [1260,true,false,false], [2180,true,false,true]]) {
        const h=ui();
        h.run(`teams=[{points:2},{points:7}];pointsToWin=20;isChaosMode=true;preferences.motion='full';
            actualGenerateBoard();updateBoard=actualUpdateBoard;
            renderResolutionFrame({actorIndex:0,moveCount:3,basePoints:[5,7],points:[2,7],shields:[0,0],
                powerups:{5:'bomb'},landing:{teamIndex:0,tileIndex:5,type:'bomb'},actorDelta:-3,victimDelta:0,
                effect:{type:'bomb',actorDelta:-3},durationMs:Gameplay.resolutionDuration(true,false,3)},${elapsed})`);
        const cell=h.el('gameBoard').children[5],badge=cell.children.find(node=>node.className?.startsWith('board-powerup '));
        assert.equal(Boolean(badge),shown,`badge at ${elapsed}ms`);
        if(badge)assert.equal(badge.classList.contains('board-powerup-reveal'),popping);
        assert.equal(cell.classList.contains('board-cell-landed-powerup'),landed,`landing at ${elapsed}ms`);
    }
});

test('online viewers share the board pause, reveal and movement schedule, including late joins', () => {
    let data=act(act(game(), 'start-round', {seed:99}), 'end-round');
    data.settings.chaosMode=true;data.turn.selectedIndexes=[0,1,2];
    const planner=ui();
    data=OnlineState.act(data,actor('A'),{type:'submit-round',turnId:data.turn.id},now,
        {planChaos:(g,p)=>planner.run(`planOnlineChaos(${JSON.stringify(g)},${JSON.stringify(p)})`)});
    for(const [elapsed,phase,shown] of [[0,'board',false],[349,'board',false],[350,'reveal',true],
        [799,'reveal',true],[800,'moving',true],[1260,'moving',true]]) {
        const h=ui();h.now=data.turn.resolution.startedAt+elapsed;h.mount(data,actor('B'));
        assert.equal(h.el('chaosResolution').dataset.phase,phase);
        assert.equal(h.run('powerupRevealVisible'),shown);
        assert.equal(h.el('scoreInput').hidden,true);
        if(elapsed<800)assert.equal(h.run('teams[0].points'),0);
    }
});

test('local Chaos retains a readable outcome until the next round starts', async () => {
    const h = ui();
    h.run(`teams=[{points:0},{points:0}];currentTeam=1;currentRound=0;isChaosMode=true;isRoundActive=false;
        btnNextRound.hidden=false;btnAnswers.hidden=false;document.querySelectorAll('.scoreButton')[0].hidden=false;
        setScoreButtonSelected(document.querySelectorAll('.scoreButton')[0],true);
        runChaosResolutionLocally=async()=>{metrics.wordsHidden=btnAnswers.hidden;metrics.wordsInFocus=areWordsInFocusPhase();
        teams[0].points=1;setChaosPresentation('moving','Moving');return {resolutionSummary:{type:null}}}`);
    await h.run('nextRound()');
    assert.equal(h.metrics.wordsHidden, true);
    assert.equal(h.metrics.wordsInFocus, false);
    assert.equal(h.el('chaosResolution').hidden, false);
    assert.equal(h.el('chaosMessage').textContent, 'Safe landing!');
    assert.equal(h.el('chaosTotal').textContent, '1 point');
    assert.equal(h.el('turnRecap').hidden, true);
    assert.equal(h.el('game').classList.contains('resolving-board'), false);
    assert.equal(h.el('startRoundButton').hidden, false);
    h.run(`playSound=async()=>{};currentGameWords=['One'];numWords=1;startRound()`);
    assert.equal(h.el('chaosResolution').hidden, true);
});

test('online Chaos owns board focus and resets visual state after the authoritative result', () => {
    let data = act(act(game(), 'start-round', { seed: 99 }), 'end-round');
    data.settings.chaosMode = true;
    const h = ui(); h.mount(data);
    data = OnlineState.act(data, actor('A'), { type:'submit-round',turnId:data.turn.id }, now,
        {planChaos:(g,points)=>h.run(`planOnlineChaos(${JSON.stringify(g)},${JSON.stringify(points)})`)});
    h.apply(data);
    assert.equal(h.run('areWordsInFocusPhase()'), false);
    assert.equal(h.el('chaosResolution').hidden, false);
    data = OnlineState.act(data, actor('A'), {type:'resolve-chaos',turnId:data.turn.id,hostEpoch:data.hostEpoch}, now + data.turn.resolution.durationMs);
    h.apply(data);
    assert.equal(h.el('chaosResolution').hidden, false);
    assert.equal(h.run('chaosVisual'), null);
    h.apply(data); // Roster/connection renders do not erase the result.
    assert.equal(h.el('chaosResolution').hidden, false);
    const speaker = data.turn.speakerId;
    data = OnlineState.act(data, actor(speaker.slice(3)), {type:'start-round',turnId:data.turn.id,seed:2}, now + 10000, rules);
    h.apply(data);
    assert.equal(h.el('chaosResolution').hidden, true);
});

test('Chaos result cards explain hits, protection and steals without losing final scores', () => {
    for (const [effect, after, tone, detail] of [
        [{type:'bomb',actorDelta:-3},4,'negative',/space 7.*space 4/],
        [{type:'bomb',actorDelta:0,blockedByShield:true},7,'protected',/shield was used/],
        [{type:'steal1',actorDelta:1,victimTeamIndex:1,victimDelta:-1},8,'positive',/Team 2 moved back/],
        [{type:'steal1',actorDelta:1,victimTeamIndex:1,victimDelta:0,victimBlocked:true},8,'protected',/shield blocked the steal/],
        [{type:'shield',actorDelta:0},7,'positive',/landed on space 7/],
        [{type:null,actorDelta:0},7,'positive',/landed on space 7/]
    ]) {
        const h=ui();
        h.run(`showChaosOutcome(${JSON.stringify({teamIndex:0,earned:3,pointsBefore:4,pointsAfter:after,effect})})`);
        assert.equal(h.el('chaosTotal').textContent, `${after} points`);
        assert.equal(h.el('chaosEarned').textContent, '3 correct answers');
        assert.equal(h.el('chaosResolution').dataset.tone, tone);
        assert.match(h.el('chaosDetail').textContent, detail);
        assert.equal(h.el('game').classList.contains('resolving-board'), false);
    }
});

test('the longer Chaos deadline is authoritative and late viewers join its current stage', () => {
    let data=act(act(game(), 'start-round', {seed:99}), 'end-round');
    data.settings.chaosMode=true;data.turn.selectedIndexes=[0,1,2];
    const h=ui();h.mount(data);
    data=OnlineState.act(data,actor('A'),{type:'submit-round',turnId:data.turn.id},now,
        {planChaos:(g,p)=>h.run(`planOnlineChaos(${JSON.stringify(g)},${JSON.stringify(p)})`)});
    const plan=data.turn.resolution, deadline=now+plan.durationMs;
    assert.ok(plan.durationMs>=2600);
    assert.equal(OnlineState.act(data,actor('A'),{type:'resolve-chaos',turnId:data.turn.id,hostEpoch:data.hostEpoch},deadline-1),undefined);
    h.now=deadline-1;h.apply(data);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Turn result');
    assert.deepEqual(JSON.parse(h.run('JSON.stringify(teams.map(t=>t.points))')),[...plan.points]);
    assert.ok(OnlineState.act(data,actor('A'),{type:'resolve-chaos',turnId:data.turn.id,hostEpoch:data.hostEpoch},deadline));
});

test('local resolution waits for its plan and settles exactly; reduced motion skips the wait', async () => {
    for (const motion of ['full','reduced']) {
        const h=ui();
        h.run(`teams=[{points:4},{points:9}];pointsToWin=20;preferences.motion='${motion}';randomSeed=()=>99;
            sleep=async ms=>{metrics.waitedMs=ms};`);
        const result=await h.run('runChaosResolutionLocally({teamIndexForRound:0,selectedPoints:3,roundNumberForRound:1})');
        assert.deepEqual(JSON.parse(h.run('JSON.stringify(teams.map(t=>t.points))')),[...result.plan.points]);
        assert.equal(h.el('chaosResolution').dataset.phase,'complete');
        if(motion==='full')assert.equal(h.metrics.waitedMs,result.plan.durationMs);
        else assert.equal(h.metrics.waitedMs,undefined);
    }
});

test('a stored short Chaos plan still reaches its own exact outcome at its deadline', () => {
    const h=ui();
    h.run(`teams=[{points:4},{points:9}];pointsToWin=20;preferences.motion='full';
        globalThis.oldPlan={actorIndex:0,moveCount:3,basePoints:[7,9],points:[4,9],shields:[0,0],
        powerups:{7:'bomb'},landing:{teamIndex:0,tileIndex:7,type:'bomb'},actorDelta:-3,victimDelta:0,
        effect:{type:'bomb',actorDelta:-3},durationMs:2200};renderResolutionFrame(oldPlan,2200)`);
    assert.equal(h.run('teams[0].points'),4);
    assert.equal(h.el('chaosResolution').dataset.phase,'complete');
    assert.equal(h.el('chaosTotal').textContent,'4 points');
});

test('Classic and Chaos both explain the randomized first team', () => {
    for (const chaos of [false,true]) {
        const data=game();data.settings.chaosMode=chaos;const h=ui();h.mount(data);
        assert.match(h.el('roleInstruction').textContent, new RegExp(`Team ${data.starterTeam+1} was drawn to start`));
    }
});

test('a finished match renders results without closing the connection or reloading', () => {
    let data = act(act(game(), 'start-round', { seed: 3 }), 'end-round');
    data.teams[0].points = 19; data = act(data, 'toggle-answer', { index: 0 }); data = act(data, 'submit-round');
    data=OnlineState.act(data,actor('B'),{type:'start-round',turnId:data.turn.id,seed:1},now+10000,rules);
    data=OnlineState.act(data,actor('B'),{type:'end-round',turnId:data.turn.id},now+15000,rules);
    data=OnlineState.act(data,actor('B'),{type:'submit-round',turnId:data.turn.id},now+15001,rules);
    const h = ui(); h.mount(data); h.apply(data);
    assert.equal(h.el('matchResults').hidden, false); assert.equal(h.el('resultsTitle').textContent, 'Team 1 wins!');
    assert.equal(h.el('game').classList.contains('match-finished'), true);
    assert.equal(h.el('rematchButton').hidden, false); assert.equal(h.metrics.reloads, 0); assert.equal(h.metrics.alerts.length, 0);
    assert.ok(h.storage.size > 0); assert.equal(h.el('startRoundButton').hidden, true);
    const viewer = ui(); viewer.mount(data, actor('B')); assert.equal(viewer.el('rematchButton').hidden, true);
    const replaced = OnlineState.join(data, { ...actor('A'), connectionId: 'replacement' }, now);
    h.apply(replaced); assert.equal(h.el('rematchButton').disabled, true);
    const next = OnlineState.act(data, actor('A'), { type: 'rematch', matchId: data.matchId }, now);
    h.apply(next); assert.equal(h.el('matchResults').hidden, true); assert.equal(h.el('startOnlineGame').hidden, false);
    assert.equal(h.el('game').classList.contains('match-finished'), false);
});

test('final scores rank teams by points and keep Chaos breakdowns secondary', () => {
    const h = ui();
    h.run(`teams=[{points:3},{points:8},{points:5}];pointsToWin=20;isChaosMode=true;
        localAudit=[{teamIndex:0,earned:4},{teamIndex:1,earned:6}];renderMatchResults(null,true)`);
    const rows = h.el('resultsScores').children;
    assert.deepEqual(rows.map(row => row.children[1].textContent), ['8 ', '5 ', '3 ']);
    assert.equal(rows[0].children[0].children[0].children[1].textContent, 'Team 2');
    assert.equal(rows[0].children[0].children[1].textContent, '6 from clues · +2 from Chaos');
    assert.equal(rows[2].children[0].children[1].textContent, '4 from clues · -1 from Chaos');
    assert.equal(h.el('resultsTitle').textContent, 'Match ended'); // stopping early does not invent a winner
    assert.equal(h.el('resultsContext').textContent, 'Chaos · Target 20 · Equal turns');
    const stopped=ui();
    stopped.run(`teams=[{points:21},{points:22}];pointsToWin=20;localFinalTurnCount=2;localMatchFinished=false;renderMatchResults(null,true)`);
    assert.equal(stopped.el('resultsTitle').textContent,'Match ended');
    assert.ok(stopped.el('resultsScores').children.every(row=>!row.className.includes('is-winner')));
});

test('a final-round banner keeps the owed speaker playable and results use the highest total or a draw', () => {
    for(const [correct,title] of [[0,'Team 1 wins!'],[2,"It's a draw!"],[3,'Team 2 wins!']]) {
        let data=act(act(game(['A','B']),'start-round',{seed:1}),'end-round');
        data.teams.forEach(team=>team.points=19);
        for(const index of [0,1])data=act(data,'toggle-answer',{index});
        data=act(data,'submit-round');
        const h=ui();h.mount(data,actor('B'));
        assert.equal(h.el('matchResults').hidden,true);
        assert.equal(h.el('startRoundButton').hidden,false);
        assert.match(h.el('finalRoundNotice').textContent,/Team 2 has one turn left/);
        assert.equal(h.el('onlineRoundReview').hidden,false);
        data=OnlineState.act(data,actor('B'),{type:'start-round',turnId:data.turn.id,seed:2},now+10000,rules);
        data=OnlineState.act(data,actor('B'),{type:'end-round',turnId:data.turn.id},now+15000,rules);
        for(let index=0;index<correct;index++)data=OnlineState.act(data,actor('B'),{type:'toggle-answer',turnId:data.turn.id,index},now+15001,rules);
        data=OnlineState.act(data,actor('B'),{type:'submit-round',turnId:data.turn.id},now+15002,rules);
        h.apply(data);
        assert.equal(h.el('matchResults').hidden,false);assert.equal(h.el('resultsTitle').textContent,title);
        assert.equal(h.el('finalRoundNotice').hidden,true);
        const leaderRows=h.el('resultsScores').children.filter(row=>row.className.includes('is-winner'));
        assert.equal(leaderRows.length,correct===2?2:1);
    }
});

test('local matches use the same equal-turn finish and can crown the replying team', async () => {
    const h=ui();h.run(`teams=[{points:19},{points:19}];pointsToWin=20;currentTeam=1;numWords=3;
        localAudit=[];localFinalTurnCount=null;localMatchFinished=false;btnNextRound.hidden=false;btnAnswers.hidden=false;
        document.querySelectorAll('.scoreButton').slice(0,3).forEach((button,index)=>{button.hidden=false;button.textContent=['One','Two','Three'][index];setScoreButtonSelected(button,index<2)})`);
    await h.run('nextRound()');
    assert.equal(h.run('currentTeam'),2);assert.equal(h.run('localMatchFinished'),false);
    assert.equal(h.el('matchResults').hidden,true);
    assert.match(h.el('finalRoundNotice').textContent,/Team 2 has one turn left/);
    h.run(`btnNextRound.hidden=false;btnAnswers.hidden=false;
        document.querySelectorAll('.scoreButton').slice(0,3).forEach(button=>{button.hidden=false;setScoreButtonSelected(button,true)})`);
    await h.run('nextRound()');
    assert.equal(h.run('localMatchFinished'),true);
    assert.equal(h.el('resultsTitle').textContent,'Team 2 wins!');
});

test('a local team can start its final turn even when another team has passed the target', () => {
    const h=ui();h.run(`teams=[{points:21},{points:19}];currentTeam=2;pointsToWin=20;
        localFinalTurnCount=1;localMatchFinished=false;currentGameWords=['One'];startRound()`);
    assert.equal(h.run('isRoundActive'),true);assert.equal(h.el('roundCountdown').hidden,false);
});

test('local first-to-target ends without an equalizing turn and labels the result', async () => {
    const h=ui();h.run(`teams=[{points:19},{points:19}];pointsToWin=20;winRule='first-to-target';currentTeam=1;numWords=3;
        localAudit=[];btnNextRound.hidden=false;btnAnswers.hidden=false;
        document.querySelectorAll('.scoreButton').slice(0,3).forEach((button,index)=>{button.hidden=false;button.textContent=['One','Two','Three'][index];setScoreButtonSelected(button,index===0)})`);
    await h.run('nextRound()');
    assert.equal(h.run('localMatchFinished'),true);assert.equal(h.run('localFinalTurnCount'),null);
    assert.equal(h.el('resultsTitle').textContent,'Team 1 wins!');assert.equal(h.el('finalRoundNotice').hidden,true);
    assert.equal(h.el('resultsContext').textContent,'Classic · Target 20 · First to target');
});

test('win-rule settings default safely, apply to lobby creation, and hide for party modes', () => {
    const h=ui();h.el('winRule').value='first-to-target';
    assert.equal(h.run('getSanitizedSettingsFromInputs().winRule'),'first-to-target');
    assert.equal(h.run("sanitizeGameSettingsFromDb({winRule:'first-to-target'}).winRule"),'first-to-target');
    assert.equal(h.run("sanitizeGameSettingsFromDb({winRule:'bad'}).winRule"),'equal-turns');
    h.el('quickMode').value='table';h.run('updateSetupSummary()');
    assert.equal(h.el('winRuleSetting').hidden,true);assert.equal(h.el('winRule').disabled,true);
    h.el('quickMode').value='classic';h.run('updateSetupSummary()');
    assert.equal(h.el('winRuleSetting').hidden,false);assert.equal(h.el('winRule').disabled,false);
    assert.match(h.el('setupSummary').textContent,/First to target/);
    assert.match(h.el('standardWinRule').textContent,/do not get a reply turn/);
    h.el('winRule').value='equal-turns';h.run('updateSetupSummary()');
    assert.match(h.el('winRuleHint').textContent,/same number of turns/);
    assert.match(h.el('standardWinRule').textContent,/highest score wins/);
    h.el('winRule').value='first-to-target';h.run('updateSetupSummary()');
    assert.match(h.el('winRuleHint').textContent,/first team to reach/);
});

test('online first-to-target uses the shared rule and hides final-round reply notices for all clients', () => {
    let data=game(['A','B']);data.settings.winRule='first-to-target';data.teams[0].points=19;
    const host=ui(),guest=ui();host.mount(data);guest.mount(data,actor('B'));
    for(const h of [host,guest]) {assert.equal(h.run('winRule'),'first-to-target');assert.match(h.el('lobbySummary').textContent,/First to target/);}
    data=act(act(data,'start-round',{seed:1}),'end-round');data=act(data,'toggle-answer',{index:0});data=act(data,'submit-round');
    for(const h of [host,guest]) {h.apply(data);assert.equal(h.el('matchResults').hidden,false);assert.equal(h.el('finalRoundNotice').hidden,true);assert.match(h.el('resultsContext').textContent,/First to target/);}
});

test('Classic results omit repeated earned totals and empty best-round highlights', () => {
    const h = ui();
    h.run('teams=[{points:0},{points:0}];isChaosMode=false;localAudit=[];renderMatchResults(null,true)');
    assert.equal(h.el('resultsHighlights').hidden, true);
    assert.equal(h.el('resultsScores').children[0].children[0].children.length, 1);
    const chaos = ui();
    chaos.run('teams=[{points:0},{points:0}];isChaosMode=true;localAudit=[];renderMatchResults(null,true)');
    assert.equal(chaos.el('resultsScores').children[0].children[0].children.length, 1);
});

test('online clue cards stay disabled while the role copy respects small-game guessing', () => {
    const data = act(game(['A', 'B']), 'start-round', { seed: 8 });
    const h = ui(); h.mount(data, actor('B'));
    assert.match(h.el('roleInstruction').textContent, /Guess aloud; answers stay hidden/);
    assert.equal(h.el('scoreInput').hidden, true);
    h.mount(data, actor('A')); assert.equal(h.buttons[0].disabled, true);
    assert.match(h.el('roleInstruction').textContent, /You are speaking/);
});

test('menu initialization wires the setup and gameplay controls without a browser network connection', () => {
    const h = ui();
    h.run('globalThis.HTMLElement=class{};initializeMenu()');
    assert.equal(h.el('categoryChoices').children.length, 1);
    assert.match(h.el('setupSummary').textContent, /2 teams/);
    assert.equal(h.el('quickPreset').value, 'standard');
});

test('theme choices search, select one pack and clear conflicting categories', () => {
    const h=ui();
    h.run(`themes['Adventure Trip']=[];themes['Winter Sports']=[];
        themesSelect.options.push(...['None','Adventure Trip','Winter Sports'].map(value=>({value,textContent:value})));
        themesSelect.value='None';categoriesSelect.options.push({value:'Sample',selected:true});
        initializeThemePicker();globalThis.themeRows=document.getElementById('themeChoices').children;
        globalThis.themeRadios=themeRows.map(row=>row.children[0]);
        document.getElementById('themeChoices').querySelectorAll=()=>themeRadios;`);
    const rows=h.el('themeChoices').children;
    rows[2].children[0].checked=true;rows[2].children[0].emit('input');
    assert.equal(h.el('themesSelect').value,'Winter Sports');
    assert.equal(h.el('categoriesSelect').options[0].selected,false);
    assert.deepEqual(rows.map(row=>row.children[0].checked),[false,false,true]);
    h.el('themeSearch').value='WiNtEr';h.el('themeSearch').emit('input');
    assert.deepEqual(rows.map(row=>row.hidden),[true,true,false]);
    assert.equal(h.el('themeEmpty').hidden,true);
    h.el('themeSearch').value='no matching pack';h.el('themeSearch').emit('input');
    assert.equal(h.el('themeEmpty').hidden,false);
    assert.equal(h.el('themesSelect').value,'Winter Sports'); // Filtering never changes the selection.
    h.run(`themesSelect.value='None';updateSetupSummary()`);
    assert.deepEqual(rows.map(row=>row.children[0].checked),[true,false,false]);
});

test('AI pack editing counts unique entries, controls visibility and guards an empty start', () => {
    const h=ui();h.run('globalThis.HTMLElement=class{};initializeMenu()');
    assert.equal(h.el('btnAiGame').disabled,true);
    assert.equal(h.el('btnAiOnline').disabled,true);
    h.el('showAIWords').checked=true;h.el('showAIWords').emit('change');
    assert.equal(h.el('aiWords').hidden,false);
    h.el('aiWords').value='One\nTwo\none';h.el('aiWords').emit('input');
    assert.equal(h.el('aiPackStatus').textContent,'2 words ready to play.');
    assert.equal(h.el('btnAiGame').disabled,false);
    h.el('aiWords').value='';h.el('aiWords').emit('input');h.run('startAIGame()');
    assert.equal(h.el('btnAiGame').disabled,true);assert.equal(h.run('isAiGame'),false);
    assert.equal(h.el('aiFeedback').hidden,false);
});

test('AI generation shows inline feedback and restores editing and play controls', async () => {
    const h=ui();h.run('globalThis.HTMLElement=class{};initializeMenu()');
    await h.run('run("")');
    assert.match(h.el('aiFeedback').textContent,/Enter a topic/);
    h.run('globalThis.finishGeneration=null;model.generateContent=()=>new Promise(resolve=>finishGeneration=resolve)');
    const pending=h.run('run("Football players")');
    assert.equal(h.el('btnGenerate').disabled,true);assert.equal(h.el('aiWords').disabled,true);
    assert.equal(h.el('btnAiOnline').disabled,true);
    assert.equal(h.el('topic').disabled,true);assert.equal(h.el('strictAiTopic').disabled,true);
    assert.equal(h.el('btnAiGame').disabled,true);
    h.run(`finishGeneration({response:{text:()=>JSON.stringify({groups:[{label:'Answers',entries:[
        {word:'One',canonical:'One',difficulty:'easy'}, {word:'Two',canonical:'Two',difficulty:'hard'},
        {word:'one',canonical:'One',difficulty:'easy'}]}]})}})`);await pending;
    assert.equal(h.el('btnGenerate').disabled,false);assert.equal(h.el('aiWords').disabled,false);
    assert.equal(h.el('btnAiOnline').disabled,false);
    assert.equal(h.el('topic').disabled,false);assert.equal(h.el('strictAiTopic').disabled,false);
    assert.equal(h.el('btnAiGame').disabled,false);
    assert.match(h.el('aiPackStatus').textContent,/2 words ready to play.*1 easy.*1 hard/);
    assert.equal(h.el('aiFeedback').classList.contains('is-error'),false);
});

test('AI scope checkbox applies to the topic chips without punctuation shortcuts', async () => {
    const h=ui();h.run('globalThis.HTMLElement=class{};initializeMenu()');
    h.run(`model.generateContent=async prompt=>{
        metrics.request=JSON.parse(prompt);
        const word=metrics.request.topic+' '+metrics.request.scope;
        return {response:{text:()=>JSON.stringify({entries:[{word,canonical:word,difficulty:'easy'}]})}};
    }`);
    h.el('topic').value='Movies';
    h.run('generate()'); await new Promise(resolve=>setImmediate(resolve));
    assert.equal(h.metrics.request.scope,'adaptive');
    assert.equal(h.metrics.request.topic,'Movies');
    h.el('strictAiTopic').checked=true;h.el('strictAiTopic').emit('change');
    assert.equal(h.el('aiFeedback').hidden,true);
    assert.equal(h.el('topic').value,'');
    assert.equal(h.run('aiTopics[0]'),'Movies');
    h.run('generate()');
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(h.metrics.request.scope,'strict');
    assert.equal(h.metrics.request.topic,'Movies');
    h.el('strictAiTopic').checked=false;
    await h.run('run("!Movies")');
    assert.equal(h.metrics.request.scope,'adaptive');
    assert.equal(h.metrics.request.topic,'!Movies');
});

test('Enter adds chips without generating, five-topic limit and removal are enforced, and Generate includes pending text', async () => {
    const h=ui();h.run('globalThis.HTMLElement=class{};initializeMenu()');
    h.el('topic').value='Minecraft';h.el('topic').emit('keydown',{key:'Enter',preventDefault(){}});
    assert.equal(h.run('aiTopics.length'),1);assert.equal(h.el('topic').value,'');
    h.el('topic').value='minecraft';h.run('addAiTopic()');
    assert.equal(h.run('aiTopics.length'),1);assert.match(h.el('aiFeedback').textContent,/already/);
    h.run("aiTopics=['Minecraft','Airports','Braais','Retro gadgets'];renderAiTopics()");
    h.el('topic').value='School tuck shops';
    h.run(`model.generateContent=async prompt=>{metrics.request=JSON.parse(prompt);return {response:{text:()=>JSON.stringify({entries:[{word:'Mars',canonical:'Mars',difficulty:'easy'}]})}}};generate()`);
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(h.metrics.request.topics.length,5);assert.equal(h.metrics.request.targetCount,150);
    assert.equal(h.el('topic').disabled,true);assert.equal(h.el('addAiTopic').disabled,true);
    h.run("aiTopics.push('Sixth');document.getElementById('topic').value='';generate()");
    assert.match(h.el('aiFeedback').textContent,/five/);
    h.run("aiTopics=['Minecraft'];renderAiTopics()");
    const chip=h.el('aiTopics').children.at(-1);chip.children[1].emit('click');
    assert.equal(h.run('aiTopics.length'),0);assert.equal(h.el('topic').disabled,false);
});

test('replacement is atomic, shuffled once and undo restores raw edits, labels, topics and review state', async () => {
    const h=ui();h.run(`document.getElementById('aiWords').value='- Existing\\nManual edit';
        aiGeneratedEntries=[{word:'Existing',canonical:'Existing full',difficulty:'hard'}];
        aiTopics=['Old topic'];document.getElementById('savedPackName').value='Favourite';
        document.getElementById('showAIWords').checked=true;
        shuffleArray=items=>[...items].reverse();
        model.generateContent=async()=>({response:{text:()=>JSON.stringify({entries:[
            {word:'First',canonical:'First',difficulty:'easy'}, {word:'Second',canonical:'Second',difficulty:'hard'}]})}})`);
    await h.run("run(['New topic','Another topic'])");
    assert.equal(h.el('aiWords').value,'Second\nFirst');
    assert.equal(h.el('btnGenerate').textContent,'Replace words');assert.equal(h.el('undoAiPack').hidden,false);
    h.run('undoAiReplacement()');
    assert.equal(h.el('aiWords').value,'- Existing\nManual edit');
    assert.equal(h.run('aiGeneratedEntries[0].difficulty'),'hard');assert.equal(h.run('aiTopics[0]'),'Old topic');
    assert.equal(h.el('savedPackName').value,'Favourite');assert.equal(h.el('aiWords').hidden,false);
    assert.equal(h.el('undoAiPack').hidden,true);
});

test('saved mixed packs restore metadata with answers hidden and can be hosted without generation', () => {
    const h=ui();h.run(`getModalInstance=()=>({show(){}});
        document.getElementById('aiWords').value='Earth\\nNeptune';
        aiGeneratedEntries=[{word:'Earth',canonical:'Earth',difficulty:'easy'},{word:'Neptune',canonical:'Neptune',difficulty:'hard'}];
        aiTopics=['Space','Retro gadgets'];document.getElementById('savedPackName').value='Mixed night';
        document.getElementById('strictAiTopic').checked=true;saveCurrentPack();
        aiGeneratedEntries=[];aiTopics=[];document.getElementById('aiWords').value='Another pack';renderSavedPacks()`);
    const row=h.el('savedPacksList').children.at(-1);row.children[1].emit('click');
    assert.equal(h.el('aiWords').value,'Earth\nNeptune');assert.equal(h.el('aiWords').hidden,true);
    assert.equal(h.run('aiTopics.length'),2);assert.equal(h.el('strictAiTopic').checked,true);
    assert.equal(h.run('getAiWordObjects()[1].difficulty'),'hard');assert.equal(h.el('undoAiPack').hidden,false);
    h.run('hostAIWordsOnline()');
    assert.equal(h.run('pendingOnlinePack.entries.length'),2);assert.equal(h.run('pendingOnlinePack.entries[1].difficulty'),'hard');
    h.run("localStorage.setItem=()=>{throw new Error('quota')};saveCurrentPack()");
    assert.match(h.el('packLibraryStatus').textContent,/Unable to save/);assert.equal(h.el('aiWords').value,'Earth\nNeptune');
});

test('a rejected AI credential preserves a ready pack and restores all generation controls', async () => {
    const h=ui();h.run(`globalThis.HTMLElement=class{};initializeMenu();document.getElementById('aiWords').value='One\\nTwo';
        syncAiPack();model.generateContent=async()=>{throw {status:403,message:'Error fetching generateContent: Your API key was reported as leaked.'}}`);
    await h.run('run("Football players")');
    assert.equal(h.el('aiWords').value,'One\nTwo');
    assert.equal(h.el('btnGenerate').disabled,false);
    assert.equal(h.el('aiWords').disabled,false);
    assert.equal(h.el('topic').disabled,false);assert.equal(h.el('strictAiTopic').disabled,false);
    assert.equal(h.el('btnAiGame').disabled,false);
    assert.match(h.el('aiFeedback').textContent,/game owner/);
    assert.doesNotMatch(h.el('aiFeedback').textContent,/rate.limit|few seconds/i);
});

test('bad structured responses, truncation and exhausted topics preserve edits, metadata and history', async () => {
    for (const response of [
        { text: () => 'Broken JSON' },
        { text: () => JSON.stringify({ entries: [] }) },
        { text: () => JSON.stringify({ entries: [{ word: 'New', canonical: 'New', difficulty: 'easy' }] }), candidates: [{ finishReason: 'MAX_TOKENS' }] }
    ]) {
        const h=ui();h.run(`document.getElementById('aiWords').value='Existing';
            aiGeneratedEntries=[{word:'Existing',canonical:'Existing',difficulty:'hard'}];syncAiPack()`);
        h.run('model.generateContent=async()=>metrics.response');h.metrics.response=response;
        await h.run('run("Football")');
        assert.equal(h.el('aiWords').value,'Existing');
        assert.equal(h.run('aiGeneratedEntries[0].difficulty'),'hard');
        assert.equal(h.localStorageData.has(AiPacks.HISTORY_STORAGE_KEY),false);
        assert.equal(h.el('btnGenerate').disabled,false);
        assert.equal(h.el('btnAiGame').disabled,false);
        assert.equal(h.el('aiFeedback').classList.contains('is-error'),true);
    }
});

test('generation sends saved exclusions and excludes answers accepted by another tab while pending', async () => {
    const h=ui();
    h.localStorageData.set(AiPacks.HISTORY_STORAGE_KEY,JSON.stringify([{word:'Messi',canonical:'Lionel Messi'}]));
    h.run('model.generateContent=prompt=>{metrics.request=JSON.parse(prompt);return new Promise(resolve=>metrics.finish=resolve)}');
    const pending=h.run('run("Football")');
    assert.equal(h.metrics.request.targetCount,150);
    assert.equal(h.metrics.request.recentAnswers[0].canonical,'Lionel Messi');
    h.localStorageData.set(AiPacks.HISTORY_STORAGE_KEY,JSON.stringify([
        {word:'Messi',canonical:'Lionel Messi'},{word:'Venus',canonical:'Venus'}]));
    h.metrics.finish({response:{text:()=>JSON.stringify({entries:[
        {word:'Lionel Messi',canonical:'Lionel Messi',difficulty:'easy'},
        {word:'Venus',canonical:'Venus',difficulty:'easy'},
        {word:'Mars',canonical:'Mars',difficulty:'hard'}]})}});
    await pending;
    assert.equal(h.el('aiWords').value,'Mars');
    assert.equal(h.run('aiGeneratedEntries[0].difficulty'),'hard');
    assert.equal(JSON.parse(h.localStorageData.get(AiPacks.HISTORY_STORAGE_KEY)).length,3);
    assert.match(h.el('aiFeedback').textContent,/1 fresh answer is/);
});

test('AI cards respect difficulty, retain generated metadata after editing and reject an ineligible start', () => {
    const h=ui();h.run(`aiGeneratedEntries=[{word:'Earth',canonical:'Earth',difficulty:'easy'},
        {word:'Neptune',canonical:'Neptune',difficulty:'hard'}];
        document.getElementById('aiWords').value='Earth\\nNeptune\\nAdded';
        document.getElementById('difficulty').value='hard';
        localWordObjects=getAiWordObjects();difficulty='hard';isAiGame=true;numWords=5;displayCurrentWords()`);
    const shown=h.buttons.filter(button=>!button.hidden).map(button=>button.textContent).sort();
    assert.deepEqual(shown,['Added','Neptune']);
    h.run(`isAiGame=false;document.getElementById('aiWords').value='Earth';syncAiPack();startAIGame()`);
    assert.equal(h.el('btnAiGame').disabled,true);
    assert.equal(h.run('isAiGame'),false);
    assert.match(h.el('aiFeedback').textContent,/selected difficulty/);
});

test('online dialog validates inline before joining and preserves the normalized lobby request', () => {
    const h=ui();h.run('globalThis.HTMLElement=class{};initializeMenu();joinGameLobby=async()=>{metrics.joinAttempt={name:txtPlayerName.value,code:txtGameCode.value}}');
    h.el('createLobbyButton').emit('click');
    assert.equal(h.el('onlineFormStatus').hidden,false);assert.equal(h.el('playerName')['aria-invalid'],'true');
    assert.equal(h.metrics.alerts.length,0);
    h.el('playerName').value=' Pat ';h.el('joinLobbyCode').value='1234';h.el('joinLobbyButton').emit('click');
    assert.equal(h.metrics.joinAttempt,undefined);assert.equal(h.el('joinLobbyCode')['aria-invalid'],'true');
    h.el('joinLobbyCode').value='aBcD';h.el('joinLobbyButton').emit('click');
    assert.equal(h.metrics.joinAttempt.name,'Pat');assert.equal(h.metrics.joinAttempt.code,'ABCD');
    assert.equal(h.el('onlineFormStatus').hidden,true);
});

test('dialog Tab boundaries wrap in both directions and skip hidden or disabled controls', () => {
    const h=ui();
    h.run(`globalThis.modal=document.getElementById('testDialog');modal.classList.add('show');
        globalThis.controls=['first','hidden','disabled','last'].map(id=>document.getElementById(id));
        controls.forEach((node,index)=>{node.tabIndex=0;node.disabled=index===2;node.getClientRects=()=>index===1?[]:[{}];
            node.closest=()=>null;node.focus=()=>document.activeElement=node});
        modal.querySelectorAll=()=>controls;document.activeElement=controls[3];
        cycleModalFocus(modal,{key:'Tab',shiftKey:false,preventDefault:()=>metrics.prevented=true})`);
    assert.equal(h.run('document.activeElement.id'),'first');assert.equal(h.metrics.prevented,true);
    h.run(`metrics.prevented=false;cycleModalFocus(modal,{key:'Tab',shiftKey:true,preventDefault:()=>metrics.prevented=true})`);
    assert.equal(h.run('document.activeElement.id'),'last');assert.equal(h.metrics.prevented,true);
});

test('online ticking loops without restarting on renders and stops at the warning or disconnect', () => {
    const h = ui(); h.mount(act(game(), 'start-round', { seed: 1 }));
    assert.equal(h.el('tickSound').loop, true); assert.equal(h.el('tickSound').paused, false);
    for (let i = 0; i < 12; i++) h.run('renderOnlineControls()');
    assert.equal(h.metrics.audioPlays.filter(id => id === 'tickSound').length, 1);
    h.now = now + Gameplay.ROUND_COUNTDOWN_MS + 26000; h.run('renderOnlineControls()');
    assert.equal(h.el('tickSound').paused, true);
    h.now = now + Gameplay.ROUND_COUNTDOWN_MS + 1000; h.run('renderOnlineControls()');
    assert.equal(h.el('tickSound').paused, false);
    h.run('onlineClient.connected=false;renderOnlineControls()');
    assert.equal(h.el('tickSound').paused, true);
});

test('mute and zero volume suppress ticking and unmute can resume it during the round', () => {
    const h = ui();
    h.run('preferences.muted=true;syncTickSound(20,true)'); assert.equal(h.metrics.audioPlays.length, 0);
    h.run('preferences.muted=false;preferences.volume=0;syncTickSound(20,true)'); assert.equal(h.metrics.audioPlays.length, 0);
    h.run('preferences.volume=0.4;syncTickSound(20,true)'); assert.equal(h.el('tickSound').paused, false);
    assert.equal(h.el('tickSound').volume, 0.4);
    h.run('preferences.muted=true;syncTickSound(20,true)'); assert.equal(h.el('tickSound').paused, true);
    h.run('preferences.muted=false;syncTickSound(20,true)'); assert.equal(h.metrics.audioPlays.length, 2);
    h.run('syncTickSound(20,false)'); assert.equal(h.el('tickSound').paused, true);
});

test('legacy detailed audit recaps are presented as a simple player result', () => {
    let data = act(act(game(), 'start-round', { seed: 1 }), 'end-round');
    data = act(data, 'toggle-answer', { index: 0 }); data = act(data, 'submit-round');
    data.auditEvent.recap = 'Team 1: 1 correct · +1 earned · No effect · net +1 · 1 points';
    const h = ui(); h.mount(data);
    assert.equal(h.el('turnRecap').textContent, 'Team 1 scored 1 point.');
});

test('confirmed perfect rounds celebrate once and clear before the next synchronized countdown', () => {
    let data = act(act(game(['A', 'B']), 'start-round', { seed: 1 }), 'end-round');
    data.turn.selectedIndexes = [0, 1, 2];
    const h = ui(); h.mount(data); assert.equal(h.el('roundHighlight').hidden, true);
    data = act(data, 'submit-round'); h.apply(data);
    assert.match(h.el('roundHighlight').textContent, /Perfect card! 3\/3/);
    assert.equal(h.el('roundHighlight').classList.contains('celebrate'), true);
    const restored = ui(); restored.mount(data); assert.equal(restored.el('roundHighlight').classList.contains('celebrate'), false);
    h.run('onlineClient.connected=false;renderOnlineControls()'); h.run('onlineClient.connected=true;renderOnlineControls()');
    assert.equal(h.el('roundHighlight').classList.contains('celebrate'), false);
    data = OnlineState.act(data, actor('B'), { type: 'start-round', turnId: data.turn.id, seed: 1 }, now + 10000, rules);
    h.now = now + 10000; h.apply(data);
    assert.equal(h.el('roundHighlight').hidden, true); assert.equal(h.el('roundReactions').hidden, true);
    assert.equal(h.el('scoreInput').hidden, true); assert.equal(h.el('roundCountdown').hidden, false);
});

test('online reactions expire, stay out of clues and do not replay after refreshing', () => {
    let data = act(act(game(['A', 'B']), 'start-round', { seed: 1 }), 'end-round');
    const h = ui(); h.mount(data); assert.equal(h.el('roundReactions').hidden, true);
    data = act(data, 'submit-round'); h.apply(data); assert.equal(h.el('roundReactions').hidden, false);
    data.reactions = { 'id-B': { reaction: 'clap', at: now + Gameplay.ROUND_COUNTDOWN_MS, reviewId: data.roundReview.turnId } };
    h.apply(data); assert.match(h.el('reactionFeed').textContent, /👏 B/);
    const restored = ui(); restored.mount(data); assert.equal(restored.el('reactionFeed').textContent, '');
    h.now = now + Gameplay.ROUND_COUNTDOWN_MS + 4000; h.run('renderOnlineControls()');
    assert.equal(h.el('reactionFeed').textContent, '');
});

test('new mode setup disables incompatible options while retaining ordinary setup preferences', () => {
    const h = ui();
    h.run(`initializeQuickSetup();document.getElementById('quickMode').value='table';chkChaos.checked=true;chkTraining.checked=true;
        document.getElementById('chkSeries').checked=true;txtWords.value='5';updateSetupSummary()`);
    const table = h.run('getSanitizedSettingsFromInputs()');
    assert.equal(table.mode, 'table'); assert.equal(table.numWords, 5); assert.equal(table.chaosMode, false);
    assert.equal(table.trainingMode, false); assert.equal(table.trackSeries, false);
    assert.equal(h.el('txtSeconds').disabled, true); assert.equal(h.el('targetSetting').hidden, true);
    h.run(`document.getElementById('quickMode').value='classic';chkChaos.checked=false;updateSetupSummary()`);
    assert.equal(h.el('txtWords').value, '5'); assert.equal(h.el('txtWords').disabled, false);
    assert.equal(h.run('getSanitizedSettingsFromInputs().trainingMode'), true);
});

test('local Boost Stakes previews and scores the actual short card instead of the configured five words', async () => {
    const h = ui();
    h.run(`registerModal=()=>{};document.getElementById('quickMode').value='boost';txtWords.value='5';document.getElementById('difficulty').value='normal';
        isAiGame=true;document.getElementById('aiWords').value='Apple\\nPear';`);
    await h.run('startGame()');
    h.run(`teams[currentTeam-1].points=2;renderStakesUi()`);
    assert.match(h.el('stakesInstruction').textContent, /2 of 2/);
    assert.equal(h.el('riskRoundButton').disabled, false);
    h.run('startRound({risky:true})'); h.now = now + 9000; h.metrics.intervals.at(-1)();
    h.run('endRound()'); h.buttons[0].onclick();
    assert.match(h.el('selectionSummary').textContent, /− 2 stakes/);
    const index = h.run('currentTeam-1'); await h.run('nextRound()');
    assert.equal(h.run(`teams[${index}].points`), 1);
    assert.equal(h.run(`localStakes[${index}].cooldown`), true);
    assert.match(h.el('turnRecap').textContent, new RegExp(`^Team ${index + 1}:`));
});

test('a failed leave preserves the active game and releases the exit guard so the player can retry', async () => {
    const h = ui(); h.mount(game());
    h.run(`game.hidden=false;menu.hidden=true;onlineClient.close=async()=>{throw new Error('offline')}`);
    await h.run('returnToSetup()');
    assert.equal(h.run('isOnlineGame'), true); assert.equal(h.el('game').hidden, false); assert.equal(h.el('menu').hidden, true);
    assert.equal(h.el('game').inert, false); assert.equal(h.run('isReturningToSetup'), false);
    assert.match(h.metrics.alerts[0], /Unable to leave/);
});

test('Open Table deals the configured full card with the normal difficulty mix', () => {
    const h = ui();
    h.run(`globalThis.tableGame={settings:{mode:'table',numWords:5,difficulty:'normal',selectedTheme:'None',selectedCategories:[]},teams:[{},{}],deck:{}};
        getOnlineWordObjects=()=>[...Array.from({length:20},(_,i)=>({word:'Easy '+i,difficulty:'easy'})),...Array.from({length:20},(_,i)=>({word:'Hard '+i,difficulty:'hard'}))];
        globalThis.first=drawOnlineWords(tableGame,1);tableGame.deck=first.pools.deck;globalThis.second=drawOnlineWords(tableGame,2)`);
    assert.equal(h.run('first.words.length'), 5); assert.equal(h.run('second.words.length'), 5);
    assert.equal(h.run('first.words.filter(word=>word.startsWith("Easy")).length'), 3);
    assert.equal(h.run('first.words.filter(word=>word.startsWith("Hard")).length'), 2);
    assert.equal(h.run('second.words.some(word=>first.words.includes(word))'), false);
});

test('Open Table timing and word settings preserve the Classic timing preference', () => {
    const h=ui(); h.run(`initializeQuickSetup();txtSeconds.value='30';txtWords.value='10';document.getElementById('quickMode').value='table';
        document.getElementById('tableTiming').value='unlimited';document.getElementById('tableSeconds').value='90';updateSetupSummary()`);
    assert.equal(h.run('getSanitizedSettingsFromInputs().numWords'),10);
    assert.equal(h.run('getSanitizedSettingsFromInputs().tableTiming'),'unlimited');
    assert.equal(h.el('tableSecondsField').hidden,true); assert.equal(h.el('txtWords').disabled,false);
    h.run(`document.getElementById('quickMode').value='classic';updateSetupSummary()`);
    assert.equal(h.run('getSanitizedSettingsFromInputs().numSeconds'),30);
});
test('an Open Table lobby renders before any turn exists and offers the host format selection', () => {
    const h = ui();
    h.run(`globalThis.partySnapshot=value=>value;globalThis.sharePartyResult=()=>{};globalThis.partySummary=()=>{};globalThis.createPartySurface=()=>({render:state=>{metrics.partyStage=state},reset(){}})`);
    let data = { protocolVersion: OnlineState.PROTOCOL_VERSION, dateCreated: now, settings: Modes.normalizeModeSettings({mode:'table',numWords:5,numTeams:2}), teams:[{points:0,players:[]},{points:0,players:[]}], phase:'waiting', hostId:'', currentTeam:1 };
    for(const name of ['A','B','C'])data=OnlineState.join(data,actor(name),now);
    assert.equal(data.turn,undefined); h.mount(data);
    assert.equal(h.el('partyGame').hidden,false);assert.equal(h.metrics.partyStage.view.canStartGame,true);
});

test('Case Files uses authored data and hides incompatible packs while retaining the AI editor', () => {
    const h=ui();h.run(`categories=caseDictionary;menu.hidden=false;document.getElementById('quickMode').value='case';document.getElementById('caseId').value='bank';
        document.getElementById('difficulty').value='normal';document.getElementById('aiWords').value='My saved edits';
        pendingOnlinePack={kind:'custom',entries:[{word:'Apple',canonical:'Apple',difficulty:'easy'}]};updateSetupSummary()`);
    assert.equal(h.el('wordPacksSection').hidden,true);assert.equal(h.el('modePlayOptions').hidden,true);assert.equal(h.el('ai').hidden,true);assert.equal(h.run('pendingOnlinePack'),null);
    assert.equal(h.run('getOnlineWordObjects(getSanitizedSettingsFromInputs()).length'),48);
    h.run('startAIGame();hostAIWordsOnline()');assert.equal(h.el('aiWords').value,'My saved edits');assert.match(h.el('aiFeedback').textContent,/authored built-in words/);
    h.run(`document.getElementById('quickMode').value='classic';updateSetupSummary()`);assert.equal(h.el('wordPacksSection').hidden,false);assert.equal(h.el('ai').hidden,false);
});
test('local Case Files ignores a previous AI pack and starts from the built-in evidence vocabulary', () => {
    const h=ui();h.run(`categories=caseDictionary;menu.hidden=false;globalThis.partySnapshot=value=>value;globalThis.sharePartyResult=()=>{};globalThis.partySummary=()=>{};
        globalThis.createPartySurface=()=>({render:state=>{metrics.partyStage=state},reset(){}});
        document.getElementById('quickMode').value='case';document.getElementById('caseId').value='bank';document.getElementById('difficulty').value='normal';
        document.getElementById('localPlayerNames').value='Alice\\nBob';isAiGame=true;document.getElementById('aiWords').value='Unrelated custom word';
        startLocalParty(getSanitizedSettingsFromInputs())`);
    assert.equal(h.run('localPartyGame.customWords'),false);assert.equal(h.run('Boolean(localPartyGame.wordPack)'),false);
    assert.equal(h.run('localWordObjects.length'),48);assert.equal(h.metrics.partyStage.game.settings.caseId,'bank');assert.equal(h.el('aiWords').value,'Unrelated custom word');
});
