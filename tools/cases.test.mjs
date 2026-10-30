import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as State from '../online/state.js';
import * as Modes from '../gameplay/modes.js';
import { CASES, CASE_IDS, caseFacts, availableFacts, matchesRule, matchingTheories } from '../gameplay/cases.js';
import { caseWordObjects, drawCaseCard } from '../gameplay/case-draw.js';
const context=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('../data.js',import.meta.url),'utf8')+'\nthis.dictionary=Object.values(categories).flat();',context);
const dictionary=JSON.parse(JSON.stringify(context.dictionary));
let now;const actor=id=>({playerId:id,playerName:id,connectionId:'c-'+id});
const rules={drawWords:(g,seed)=>drawCaseCard(g,seed,caseWordObjects(g.settings.caseId,dictionary))};
function lobby(id='bank',names=['A','B'],extra={}){now=1000000;let g={protocolVersion:State.PROTOCOL_VERSION,dateCreated:now,settings:Modes.normalizeModeSettings({mode:'case',caseId:id,numTeams:2,numWords:5,numSeconds:30,difficulty:'normal',caseTurns:8,...extra}),teams:[{points:0,players:[]},{points:0,players:[]}],hostId:'',phase:'waiting',currentTeam:1};for(const name of names)g=State.join(g,actor(name),now);return g;}
function act(g,type,extra={},who=g.turn?.speakerId||g.hostId){const copy=structuredClone(g);for(const p of Object.values(copy.presence))for(const c of Object.values(p.connections))if(c.connected)c.lastSeen=now;return State.act(copy,actor(who),{type,turnId:g.turn?.id,matchId:g.matchId||1,...extra},now,rules);}
const started=(id,extra)=>act(lobby(id,undefined,extra),'start-game',{seed:0});
function begin(g,lead){g=act(g,'choose-lead',{leadId:lead||availableFacts(g.settings.caseId,g.party.found)[0].leadId});g=act(g,'start-round',{seed:g.party.history.length+10});now+=4500;return g;}
function score(g,indexes){g=act(g,'end-round');for(const index of indexes)g=act(g,'toggle-answer',{index});return act(g,'submit-round');}
test('five authored cases use real built-in vocabulary, balanced word choices and explicit reliable evidence',()=>{
    assert.equal(CASE_IDS.length,5);
    for(const id of CASE_IDS){const s=CASES[id],facts=caseFacts(id),words=caseWordObjects(id,dictionary);assert.equal(s.people.length,6);assert.equal(s.methods.length,3);assert.equal(s.destinations.length,3);assert.equal(facts.length,12);assert.equal(words.length,48);
        assert.equal(new Set(words.map(w=>w.word.toLowerCase())).size,48);assert.equal(s.reveal.length,3);assert.ok(s.hint&&s.intro.length>150);
        for(const f of facts){assert.ok(f.text.length>60);assert.equal(words.filter(w=>w.caseFactId===f.id&&w.difficulty==='easy').length,2,`${id}/${f.id} easy`);assert.equal(words.filter(w=>w.caseFactId===f.id&&w.difficulty==='hard').length,2);for(const dep of f.requires)assert.ok(facts.some(x=>x.id===dep));}
    }
});
test('every complete mystery has one correct theory; no four clues can give away the whole case',()=>{
    for(const id of CASE_IDS){const facts=caseFacts(id);assert.equal(matchingTheories(id).length,54);for(const f of facts)assert.equal(matchesRule(CASES[id].solution,f.rule),true,`${id}/${f.id}`);
        assert.deepEqual(matchingTheories(id,facts.map(f=>f.id)),[CASES[id].solution]);let minimum=12;
        for(let mask=1;mask<4096;mask++){const ids=facts.filter((_,i)=>mask&(1<<i)).map(f=>f.id);if(ids.length>minimum)continue;if(matchingTheories(id,ids).length===1)minimum=ids.length;}
        assert.ok(minimum>=5,`${id}: minimum ${minimum}`);
    }
});
test('every lead is reachable and losing any one evidence route leaves an alternative proof',()=>{
    for(const id of CASE_IDS){const facts=caseFacts(id);let reached=[];for(let i=0;i<12;i++)reached=[...new Set([...reached,...availableFacts(id,reached).map(f=>f.id)])];assert.equal(reached.length,12);
        for(const blocked of facts){let reached=[];for(let i=0;i<12;i++)reached=[...new Set([...reached,...availableFacts(id,reached).filter(f=>f.id!==blocked.id).map(f=>f.id)])];assert.deepEqual(matchingTheories(id,reached),[CASES[id].solution],`${id}: alternative to ${blocked.id}`);}
    }
});
test('curated deals are deterministic, follow lead/difficulty, spread evidence and avoid duplicate words',()=>{
    for(const id of CASE_IDS)for(const difficulty of ['easy','normal','hard'])for(const count of [1,5,15]){let g=started(id,{difficulty,numWords:count});for(const lead of CASES[id].leads){g.turn.leadId=lead.id;const words=caseWordObjects(id,dictionary),a=drawCaseCard(g,17,words),b=drawCaseCard(g,17,words);assert.deepEqual(a,b);assert.ok(a.words.length>0&&a.words.length<=count);assert.equal(new Set(a.words).size,a.words.length);assert.ok(a.caseFactIds.every(key=>availableFacts(id,[],lead.id).some(f=>f.id===key)));if(count>=5)assert.equal(new Set(a.caseFactIds).size,3);
        if(difficulty!=='normal')assert.ok(a.words.every(word=>words.find(w=>w.word===word).difficulty===difficulty));}}
});
test('all five cases play through to a correct theory at easy, normal and hard without an AI request',()=>{
    for(const id of CASE_IDS)for(const difficulty of ['easy','normal','hard']){let g=started(id,{difficulty});let turns=0;while(g.phase!=='accusing'){g=begin(g);g=score(g,g.turn.words.map((_,i)=>i));assert.equal(g.phase,'evidence');g=act(g,'continue-case');assert.ok(++turns<=8);}
        assert.equal(g.party.found.length,12);const before=structuredClone(g),who=g.hostId;for(const [field,index]of Object.entries(CASES[id].solution))g=act(g,'set-theory',{field,index},who);
        assert.equal(act(g,'accuse',{theory:{...g.party.theory,suspect:(g.party.theory.suspect+1)%6}},who),undefined);
        g=act(g,'accuse',{theory:{...g.party.theory}},who);assert.equal(g.finishReason,'solved');assert.equal(before.phase,'accusing');
    }
});
test('only confirmed words unlock matching files; repeated words from one file count once',()=>{
    let g=started();assert.equal(act(g,'start-round',{seed:1}),undefined);assert.equal(act(g,'choose-lead',{leadId:'missing'}),undefined);
    g=begin(g,'access');assert.equal(State.view(g,actor('B'),now).showWords,false);const groups=new Map();g.turn.caseFactIds.forEach((id,i)=>groups.set(id,[...(groups.get(id)||[]),i]));const pair=[...groups.values()].find(v=>v.length===2);assert.ok(pair);
    const before=structuredClone(g);g=act(g,'end-round');g=act(g,'toggle-answer',{index:pair[0]});assert.deepEqual(g.party.found,[]);g=act(g,'toggle-answer',{index:pair[1]});g=act(g,'submit-round');assert.equal(g.party.found.length,1);assert.equal(g.party.totalCorrect,2);assert.equal(g.party.history.length,1);
    assert.equal(State.act(g,actor(before.turn.speakerId),{type:'submit-round',turnId:g.turn.id,matchId:g.matchId},now,rules),undefined);
});
test('missed evidence stays available; the budget ends cleanly and wrong complete theories fail',()=>{
    let g=started('train',{caseTurns:4});for(let i=0;i<4;i++){g=begin(g);g=score(g,[]);assert.equal(g.party.found.length,0);g=act(g,'continue-case');}assert.equal(g.phase,'accusing');assert.equal(act(g,'resume-case',{},g.hostId),undefined);
    for(const field of ['suspect','method','destination'])g=act(g,'set-theory',{field,index:0},g.hostId);g=act(g,'accuse',{theory:{...g.party.theory}},g.hostId);assert.equal(g.finishReason,'unsolved');
});
test('the crew can discuss evidence, solve early, resume safely, and take one optional hint',()=>{
    let g=started();g=begin(g);g=score(g,[0]);assert.equal(act(g,'open-theory',{},'B'),undefined);g=act(g,'open-theory',{},g.hostId);assert.equal(g.phase,'accusing');g=act(g,'resume-case',{},g.hostId);assert.equal(g.phase,'evidence');g=act(g,'continue-case');g=begin(g);g=score(g,[]);
    g=act(g,'case-hint',{},g.hostId);assert.equal(g.party.hintUsed,true);assert.equal(act(g,'case-hint',{},g.hostId),undefined);
});
test('countdown, clock expiry and recovery preserve the current lead and committed evidence',()=>{
    let g=started();g=act(g,'choose-lead',{leadId:'network'});g=act(g,'start-round',{seed:1});assert.equal(State.view(g,actor('A'),now).showWords,false);assert.equal(act(g,'end-round'),undefined);
    now=g.turn.deadline-1;assert.equal(act(g,'expire-round',{},'B'),undefined);now++;g=act(g,'expire-round',{},'B');g=act(g,'toggle-answer',{index:0});g=State.leave(g,actor('A'),now);assert.equal(State.view(g,actor(g.hostId),now).canSelect,true);
    g=act(g,'submit-round',{},g.hostId);assert.equal(g.party.found.length,1);assert.equal(g.party.history[0].leadId,'network');
});
test('case settings isolate custom sources and prevent a one-word card with an impossible four-turn budget',()=>{
    const s=Modes.normalizeModeSettings({mode:'case',numWords:1,caseTurns:4,selectedTheme:'Holiday Time',selectedCategories:['Sports'],trainingMode:true});assert.equal(s.caseTurns,6);assert.equal(s.selectedTheme,'None');assert.deepEqual(s.selectedCategories,[]);assert.equal(s.trainingMode,false);
    let g=lobby();g.wordPack={kind:'custom',entries:[{word:'Apple',difficulty:'easy',canonical:'Apple'}]};assert.equal(act(g,'start-game',{seed:1}),undefined);
});
test('cooperative late arrivals join, unscored departures spend no turn, and next-case rematches reset everything',()=>{
    let g=begin(started());g=State.join(g,actor('C'),now);assert.equal(State.view(g,actor('C'),now).participant.name,'C');g=State.leave(g,actor(g.turn.speakerId),now);assert.equal(g.party.history.length,0);assert.equal(g.phase,'idle');
    g=act(g,'end-game',{},g.hostId);g=act(g,'rematch',{seed:3},g.hostId);assert.equal(g.settings.caseId,'museum');assert.deepEqual(g.party.found,[]);assert.deepEqual(g.party.history,[]);assert.equal(g.party.hintUsed,false);assert.deepEqual(g.caseWordUses,{});
});
test('Firebase missing empty collections cannot break a first deal or zero-discovery debrief',()=>{
    function firebase(value){if(value==null)return undefined;if(Array.isArray(value))return value.length?value.map(firebase):undefined;if(typeof value==='object'){const entries=Object.entries(value).map(([k,v])=>[k,firebase(v)]).filter(([,v])=>v!==undefined);return entries.length?Object.fromEntries(entries):undefined;}return value;}
    let g=firebase(started());g=firebase(begin(g));g=firebase(score(g,[]));assert.equal(g.phase,'evidence');g=firebase(act(g,'continue-case'));assert.equal(g.phase,'idle');
});
