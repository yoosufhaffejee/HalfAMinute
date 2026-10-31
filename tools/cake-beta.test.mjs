import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as State from '../online/state.js';
import * as Modes from '../gameplay/modes.js';
import { caseStory, CASE_IDS } from '../gameplay/cases.js';
import { caseWordObjects, drawCaseCard } from '../gameplay/case-draw.js';
const c=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('../data.js',import.meta.url),'utf8')+';this.words=Object.values(categories).flat();',c);
const dictionary=JSON.parse(JSON.stringify(c.words)),rules={drawWords:(g,seed)=>drawCaseCard(g,seed,caseWordObjects(g,dictionary))};
let now=1000000;const actor=id=>({playerId:id,playerName:id,connectionId:'c-'+id});
function lobby(extra={}){now=1000000;let g={protocolVersion:State.PROTOCOL_VERSION,dateCreated:now,settings:Modes.normalizeModeSettings({mode:'cakebeta',caseTurns:6,numWords:5,numSeconds:30,difficulty:'normal',...extra}),teams:[{points:0,players:[]},{points:0,players:[]}],hostId:'',phase:'waiting',currentTeam:1};for(const id of ['A','B','C'])g=State.join(g,actor(id),now);return g;}
function act(g,type,extra={},id=g.turn?.speakerId||g.hostId){const copy=structuredClone(g);for(const p of Object.values(copy.presence))for(const v of Object.values(p.connections))if(v.connected)v.lastSeen=now;return State.act(copy,actor(id),{type,matchId:g.matchId||1,turnId:g.turn?.id,revision:g.party?.beta?.revision,...extra},now,rules);}
const start=(seed=0,extra={})=>act(lobby(extra),'start-game',{seed});
function score(g,count){g=act(g,'start-round',{seed:(g.party.history?.length||0)+30});now+=4500;g=act(g,'end-round');for(let i=0;i<Math.min(count,g.turn.words.length);i++)g=act(g,'toggle-answer',{index:i});return act(g,'submit-round');}
function solve(g,index){g=act(g,'beta-buy',{index});if(index<2)return act(g,'beta-answer',{index,answer:index===0?'table':'ribbon'});for(const[field,value]of [['prop','foam'],['transport','trolley'],['cloth','down']])g=act(g,'beta-experiment',{field,value});return act(g,'beta-test');}
function accusation(g,wrong=false){g=act(g,'beta-review',{},g.hostId);const solution=caseStory(g).solution;for(const field of ['suspect','destination'])g=act(g,'beta-theory',{field,index:wrong&&field==='suspect'?(solution[field]+1)%6:solution[field]},g.hostId);return g;}
test('beta is additive and isolates fixed words from custom packs and unrelated settings',()=>{
    assert.equal(CASE_IDS.length,8);assert.ok(Modes.isParty({mode:'cakebeta'}));
    const g=lobby({caseId:'bank',selectedCategories:['Wildlife'],selectedTheme:'Holiday Time',trainingMode:true});
    assert.equal(g.settings.caseId,'cake');assert.deepEqual(g.settings.selectedCategories,[]);assert.equal(g.settings.selectedTheme,'None');assert.equal(g.settings.trainingMode,false);
    g.wordPack={kind:'custom',entries:[{word:'Penguin',difficulty:'easy'}]};assert.equal(act(g,'start-game',{seed:0}),undefined);
});
test('all three beta scenarios solve with real word rounds, purchases, experiment and final confirmation',()=>{
    for(let seed=0;seed<3;seed++)for(const difficulty of ['easy','normal','hard']){
        let g=start(seed,{difficulty});g=score(g,5);assert.equal(g.party.beta.points,5);g=solve(g,0);g=solve(g,1);assert.equal(g.party.beta.points,1);
        g=act(g,'continue-case');g=score(g,5);g=solve(g,2);assert.equal(g.party.beta.points,4);assert.deepEqual(g.party.found,[]);
        g=accusation(g);g=act(g,'beta-accuse',{theory:{...g.party.beta.theory,revision:g.party.beta.revision}},g.hostId);assert.equal(g.finishReason,'solved');
    }
});
test('search economy carries odd points, deduplicates purchases and serializes shared hints',()=>{
    let g=score(start(),3);g=act(g,'beta-buy',{index:0});assert.equal(g.party.beta.points,1);
    assert.equal(act(g,'beta-buy',{index:0}),undefined);assert.equal(act(g,'beta-buy',{index:1}),undefined);assert.equal(act(g,'beta-hint',{index:0}),undefined);
    g=act(g,'continue-case');g=score(g,3);const before=structuredClone(g);g=act(g,'beta-hint',{index:0},'B');assert.equal(g.party.beta.points,2);
    assert.equal(act(g,'beta-hint',{index:0,revision:before.party.beta.revision},'C'),undefined);
    assert.equal(act(g,'beta-answer',{index:0,answer:'ceiling'}),undefined);
    const wrong=act(g,'beta-answer',{index:0,answer:'door'});assert.equal(wrong.party.beta.points,2);assert.equal(wrong.party.beta.solved[0],undefined);
});
test('private countdown, expiry, departed-speaker recovery and fair random turns survive the beta wrapper',()=>{
    let g=start(),speaker=g.turn.speakerId,other=g.party.players.find(p=>p.id!==speaker).id;
    g=act(g,'start-round',{seed:3});assert.equal(State.view(g,actor(speaker),now).showWords,false);now+=4500;
    assert.equal(State.view(g,actor(speaker),now).showWords,true);assert.equal(State.view(g,actor(other),now).showWords,false);
    assert.equal(act(g,'beta-buy',{index:0},other),undefined);now=g.turn.deadline;g=act(g,'expire-round',{},other);
    g=act(g,'toggle-answer',{index:0});g=State.leave(g,actor(speaker),now);g=act(g,'submit-round',{},g.hostId);assert.equal(g.party.beta.points,1);
    g=act(g,'continue-case',{},g.hostId);assert.notEqual(g.turn.speakerId,speaker);assert.ok(g.turn.leadId);
});
test('zero-score budget exhaustion remains a playable loss and never grants an answer or free discovery',()=>{
    let g=start(0,{caseTurns:4});for(let i=0;i<4;i++){g=score(g,0);g=act(g,'continue-case');}assert.equal(g.phase,'accusing');assert.equal(g.party.beta.points,0);
    assert.equal(act(g,'start-round',{seed:4}),undefined);g=accusation(g);g=act(g,'beta-accuse',{theory:{...g.party.beta.theory,revision:g.party.beta.revision}},g.hostId);
    assert.equal(g.finishReason,'unsolved');assert.equal(g.party.revealed,false);assert.equal(g.party.beta.assessment.discoveries,false);
});
test('guests cannot accuse, stale reviews fail and old Case Files actions cannot bypass beta objectives',()=>{
    let g=score(start(),5);g=solve(solve(g,0),1);g=score(act(g,'continue-case'),5);g=solve(g,2);g=accusation(g);
    const guest=g.party.players.find(p=>p.id!==g.hostId).id,theory={...g.party.beta.theory,revision:g.party.beta.revision};
    const cleared=act(g,'beta-theory',{field:'suspect',index:-1},g.hostId);assert.equal(cleared.party.beta.theory.suspect,-1);
    assert.equal(act(g,'beta-accuse',{theory},guest),undefined);assert.equal(act(g,'accuse',{theory},g.hostId),undefined);
    g=act(g,'beta-theory',{field:'suspect',index:(theory.suspect+1)%6},g.hostId);assert.equal(act(g,'beta-accuse',{theory},g.hostId),undefined);
    assert.equal(act(g,'set-theory',{field:'suspect',index:0},g.hostId),undefined);
});
test('wrong endings keep solutions hidden, reveals are host-only and same/new replays clear the prototype state',()=>{
    let g=score(start(1),5);g=solve(solve(g,0),1);g=score(act(g,'continue-case'),5);g=solve(g,2);g=accusation(g,true);g=act(g,'beta-accuse',{theory:{...g.party.beta.theory,revision:g.party.beta.revision}},g.hostId);
    assert.equal(g.finishReason,'unsolved');assert.equal(g.party.revealed,false);const scenario=g.party.scenarioId,guest=g.party.players.find(p=>p.id!==g.hostId).id;
    assert.equal(act(g,'reveal-case',{},guest),undefined);g=act(g,'reveal-case',{},g.hostId);assert.equal(g.party.revealed,true);
    const same=act(g,'rematch',{seed:8,caseId:'cake',scenarioMode:'same'},g.hostId),fresh=act(g,'rematch',{seed:8,caseId:'cake',scenarioMode:'new'},g.hostId);
    assert.equal(same.party.scenarioId,scenario);assert.notEqual(fresh.party.scenarioId,scenario);assert.equal(same.party.beta.points,0);assert.deepEqual(same.party.beta.solved,{});assert.equal(same.party.revealed,false);assert.equal(same.party.history.length,0);
});
test('Firebase empty collection removal cannot break a purchase, word deal or final theory',()=>{
    function clean(value){if(value==null)return undefined;if(Array.isArray(value))return value.length?value.map(clean):undefined;if(typeof value==='object'){const entries=Object.entries(value).map(([k,v])=>[k,clean(v)]).filter(([,v])=>v!==undefined);return entries.length?Object.fromEntries(entries):undefined;}return value;}
    let g=clean(start());g=clean(score(g,3));g=clean(solve(g,0));assert.equal(g.party.beta.points,1);g=clean(act(g,'continue-case'));g=clean(score(g,3));assert.equal(g.party.beta.points,4);
});
