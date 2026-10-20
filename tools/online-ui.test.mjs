import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import * as OnlineState from '../online/state.js';
import { OnlineClient } from '../online/client.js';
import * as Gameplay from '../gameplay/rules.js';
import * as AiErrors from '../gameplay/ai-errors.js';

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
    const nodes = new Map(), storage = new Map();
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
        OnlineState, OnlineClient, Gameplay, AiErrors, crypto: webcrypto,
        initializeApp: () => ({}), getDatabase: () => ({}), GoogleGenerativeAI: class { getGenerativeModel() { return {}; } },
        document: { readyState: 'loading', getElementById: el, querySelectorAll: selector => selector.includes('scoreButton') ? buttons : [],
            getElementsByClassName: name => name === 'scoreButton' ? buttons : [], body: element(), createElement: () => element(), addEventListener() {} },
        window: { addEventListener() {}, matchMedia: () => ({ matches: false }) },
        sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
        localStorage: { getItem: () => null, setItem() {} },
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
    return { run, el, buttons, metrics, storage,
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

test('Chaos frames move first, reveal the landing, then apply the effect without changing the plan', () => {
    const h = ui();
    h.run(`teams=[{points:2},{points:7}];pointsToWin=20;preferences.motion='full';
        globalThis.plan={actorIndex:0,moveCount:3,basePoints:[5,7],points:[2,7],shields:[0,0],
        powerups:{5:'bomb'},landing:{teamIndex:0,tileIndex:5,type:'bomb'},actorDelta:-3,victimDelta:0,
        effect:{type:'bomb',actorDelta:-3},durationMs:Gameplay.resolutionDuration(true,false,3)};renderResolutionFrame(plan,0)`);
    const saved = h.run('JSON.stringify(plan)');
    assert.equal(h.run('teams[0].points'), 2);
    assert.equal(h.run('powerupRevealVisible'), false);
    assert.equal(h.el('chaosMessage').textContent, 'Team 1 moves 3 spaces…');
    h.run('renderResolutionFrame(plan,1380)');
    assert.equal(h.run('teams[0].points'), 5);
    assert.equal(h.run('powerupRevealVisible'), true);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Landed');
    h.run('renderResolutionFrame(plan,2780)');
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Chaos!');
    assert.match(h.el('chaosMessage').textContent, /Bomb!/);
    h.run('renderResolutionFrame(plan,4180)');
    assert.equal(h.run('teams[0].points'), 2);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Turn result');
    assert.equal(h.el('chaosTotal').textContent, '2 points');
    assert.match(h.el('chaosDetail').textContent, /space 5.*space 2/);
    h.run('renderResolutionFrame(plan,6579)');
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Turn result');
    assert.equal(h.run('JSON.stringify(plan)'), saved);
    h.run('preferences.motion="reduced";onlineBoardSignature="";renderResolutionFrame(plan,0)');
    assert.equal(h.run('teams[0].points'), 2);
    assert.equal(h.el('chaosStep').textContent, 'Team 1 · Turn result');
    assert.match(h.el('chaosMessage').textContent, /Bomb! Back 3 spaces/);
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
    assert.equal(h.el('resultsContext').textContent, 'Chaos · First to 20');
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
    assert.equal(h.el('btnAiGame').disabled,true);
    h.run('finishGeneration({response:{text:()=>"One\\nTwo\\none"}})');await pending;
    assert.equal(h.el('btnGenerate').disabled,false);assert.equal(h.el('aiWords').disabled,false);
    assert.equal(h.el('btnAiGame').disabled,false);
    assert.equal(h.el('aiPackStatus').textContent,'2 words ready to play.');
    assert.equal(h.el('aiFeedback').classList.contains('is-error'),false);
});

test('a rejected AI credential preserves a ready pack and restores all generation controls', async () => {
    const h=ui();h.run(`globalThis.HTMLElement=class{};initializeMenu();document.getElementById('aiWords').value='One\\nTwo';
        syncAiPack();model.generateContent=async()=>{throw {status:403,message:'Error fetching generateContent: Your API key was reported as leaked.'}}`);
    await h.run('run("Football players")');
    assert.equal(h.el('aiWords').value,'One\nTwo');
    assert.equal(h.el('btnGenerate').disabled,false);
    assert.equal(h.el('aiWords').disabled,false);
    assert.equal(h.el('btnAiGame').disabled,false);
    assert.match(h.el('aiFeedback').textContent,/game owner/);
    assert.doesNotMatch(h.el('aiFeedback').textContent,/rate.limit|few seconds/i);
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
