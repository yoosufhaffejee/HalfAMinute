import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as State from '../online/state.js';
import * as Modes from '../gameplay/modes.js';
import { CASES, CASE_IDS, CASE_DIFFICULTIES, caseOptionLabel, caseFacts, availableFacts, caseSubmission, caseAssessment, caseFeedback, confirmedCasePart, caseStory, caseScenarioIds, chooseCaseScenario } from '../gameplay/cases.js';
import { caseWordObjects, drawCaseCard } from '../gameplay/case-draw.js';
const context=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('../data.js',import.meta.url),'utf8')+'\nthis.dictionary=Object.values(categories).flat();',context);
const dictionary=JSON.parse(JSON.stringify(context.dictionary));
let now;const actor=id=>({playerId:id,playerName:id,connectionId:'c-'+id});
const rules={drawWords:(g,seed)=>drawCaseCard(g,seed,caseWordObjects(g.settings.caseId,dictionary))};
function lobby(id='bank',names=['A','B'],extra={}){now=1000000;let g={protocolVersion:State.PROTOCOL_VERSION,dateCreated:now,settings:Modes.normalizeModeSettings({mode:'case',caseId:id,numTeams:2,numWords:5,numSeconds:30,difficulty:'normal',...extra}),teams:[{points:0,players:[]},{points:0,players:[]}],hostId:'',phase:'waiting',currentTeam:1};for(const name of names)g=State.join(g,actor(name),now);return g;}
function act(g,type,extra={},who=g.turn?.speakerId||g.hostId){const copy=structuredClone(g);for(const p of Object.values(copy.presence))for(const c of Object.values(p.connections))if(c.connected)c.lastSeen=now;return State.act(copy,actor(who),{type,turnId:g.turn?.id,matchId:g.matchId||1,...extra},now,rules);}
const started=(id,extra)=>act(lobby(id,undefined,extra),'start-game',{seed:0});
function begin(g,lead){g=act(g,'choose-lead',{leadId:lead||availableFacts(g.settings.caseId,g.party.found)[0].leadId});g=act(g,'start-round',{seed:g.party.history.length+10});now+=4500;return g;}
function score(g,indexes){g=act(g,'end-round');for(const index of indexes)g=act(g,'toggle-answer',{index});return act(g,'submit-round');}
function scenarioGame(id,seed){let g=act(lobby(id),'start-game',{seed});while(g.phase!=='accusing'){g=begin(g);g=score(g,g.turn.words.map((_,i)=>i));g=act(g,'continue-case');}return g;}
function answerScenario(g){const story=caseStory(g);for(const[field,index]of Object.entries(story.solution))g=act(g,'set-theory',{field,index},g.hostId);for(const eventId of story.chronology.order)g=act(g,'place-event',{eventId},g.hostId);for(const[index,factId]of story.connection.pairs[0].entries())g=act(g,'set-proof',{index,factId},g.hostId);return g;}
test('random Case Files speakers give everyone a turn before repeats in local and online games',()=>{
    const orders=new Set();
    for(const local of [false,true])for(const [players,turns]of [[2,12],[3,12],[12,4]])for(let seed=0;seed<6;seed++){
        const names=Array.from({length:players},(_,i)=>'P'+i);let waiting=lobby('bank',names,{caseTurns:turns});
        if(local)waiting.localPlayerOrder=names;
        let g=act(waiting,'start-game',{seed}),order=[];
        while(g.phase!=='accusing'){
            const speaker=g.party.players.find(p=>p.id===g.turn.speakerId);
            assert.equal(speaker.turns,Math.min(...g.party.players.map(p=>p.turns)));
            order.push(speaker.id);g=score(begin(g),[]);
            const copy=JSON.parse(JSON.stringify(g));
            assert.deepEqual(act(copy,'continue-case'),act(g,'continue-case'),'shared state/retries preserve the draw');
            g=act(g,'continue-case');
        }
        assert.equal(order.length,turns);
        for(let i=0;i<turns;i+=players)assert.equal(new Set(order.slice(i,i+players)).size,Math.min(players,turns-i));
        if(players===12&&!local)orders.add(order.join(','));
        g=act(g,'end-game',{},g.hostId);g=act(g,'rematch',{seed},g.hostId);
        assert.ok(g.party.players.every(p=>p.turns===0));
    }
    assert.ok(orders.size>1,'different seeds vary the speaker order');
    assert.ok([...orders].some(order=>order.split(',').some((id,i,list)=>i&&id!=='P'+((Number(list[i-1].slice(1))+1)%12))), 'randomize subsequent speakers, not only the starter');
});
test('speaker fairness includes late arrivals and skips departed players without spending a turn',()=>{
    let g=act(lobby('bank',['A','B','C'],{caseTurns:12}),'start-game',{seed:5});
    g=score(begin(g),[]);g=act(g,'continue-case');
    g=State.join(g,actor('D'),now);
    const first=g.party.history[0].speakerId,departed=g.turn.speakerId;
    g=State.leave(g,actor(departed),now);
    assert.equal(g.party.history.length,1);assert.notEqual(g.turn.speakerId,departed);assert.notEqual(g.turn.speakerId,first);
    const unseen=g.party.players.filter(p=>!p.departed&&!p.turns).map(p=>p.id),selected=[];
    for(let i=0;i<unseen.length;i++){selected.push(g.turn.speakerId);g=score(begin(g),[]);g=act(g,'continue-case');}
    assert.deepEqual(selected.sort(),unseen.sort());assert.ok(selected.includes('D'));
});
test('all 24 authored scenarios have three different culprits per case and independently solve with their own evidence',()=>{
    for(const id of CASE_IDS){const culprits=new Set();for(let seed=0;seed<3;seed++){let g=scenarioGame(id,seed),story=caseStory(g);culprits.add(story.solution.suspect);
        assert.equal(g.party.scenarioId,caseScenarioIds()[seed]);assert.equal(g.party.found.length,12);assert.equal(caseWordObjects(g,dictionary).length,48);
        assert.deepEqual([...story.chronology.events].sort((a,b)=>a.minute-b.minute).map(e=>e.id),story.chronology.order);
        assert.ok(story.leads.every(l=>l.facts.every(f=>f.records.length>=2&&f.requires.every(k=>caseFacts(g).some(other=>other.id===k)))));
        g=answerScenario(g);const wrong=structuredClone(g);wrong.party.theory.suspect=(story.solution.suspect+1)%6;assert.equal(caseAssessment(wrong,caseSubmission(wrong),g.party.found).solved,false);
        g=act(g,'accuse',{theory:caseSubmission(g)},g.hostId);assert.equal(g.finishReason,'solved',id+':'+seed);
    }assert.equal(culprits.size,3,id);}
});
test('same-scenario replay resets progress, different-scenario draws exclude the current scenario and reveals are host-only',()=>{
    for(const id of CASE_IDS){let g=scenarioGame(id,1),host=g.hostId,guest=g.party.players.find(p=>p.id!==host).id;
        assert.equal(act(g,'reveal-case',{},host),undefined);g=act(g,'end-game',{},host);const before=structuredClone(g);
        assert.equal(act(g,'reveal-case',{},guest),undefined);g=act(g,'reveal-case',{},host);assert.equal(g.party.revealed,true);assert.equal(g.finishReason,'stopped');assert.equal(act(g,'reveal-case',{},host),undefined);
        const same=act(g,'rematch',{seed:0,caseId:id,scenarioMode:'same'},host);assert.equal(same.party.scenarioId,before.party.scenarioId);assert.deepEqual(same.party.found,[]);assert.equal(same.party.revealed,false);assert.equal(same.party.attempts,0);assert.deepEqual(caseStory(same),caseStory(before));
        for(let seed=0;seed<6;seed++){const next=act(g,'rematch',{seed,caseId:id,scenarioMode:'new'},host);assert.notEqual(next.party.scenarioId,before.party.scenarioId);}
        assert.equal(act(g,'rematch',{seed:1,caseId:id,scenarioMode:'invented'},host),undefined);
    }
});
test('eight source-based cases use real vocabulary, balanced prompts and structured exhibits without named eliminations',()=>{
    assert.equal(CASE_IDS.length,8);
    for(const id of CASE_IDS){const s=CASES[id],facts=caseFacts(id),words=caseWordObjects(id,dictionary);assert.equal(s.people.length,6);assert.equal(s.methods.length,3);assert.equal(s.destinations.length,3);assert.equal(facts.length,12);assert.equal(words.length,48);
        assert.equal(new Set(words.map(w=>w.word.toLowerCase())).size,48);assert.equal(s.reveal.length,3);assert.equal(s.hints.length,3);assert.ok(s.groundRules&&s.intro.length>150);
        for(const f of facts){assert.ok(f.text.length>60&&f.source);assert.ok(f.records.length>=2&&f.records.every(row=>row.length===2&&row.every(value=>typeof value==='string'&&value.length)));assert.doesNotMatch(f.text,/rules? out|remaining possibilities|only .+ had|leaving .+ suspects/i);assert.ok(f.topic&&f.topic.length>20);assert.ok(words.some(w=>w.caseFactId===f.id&&w.difficulty==='easy'),`${id}/${f.id} easy`);assert.ok(words.some(w=>w.caseFactId===f.id&&w.difficulty==='hard'),`${id}/${f.id} hard`);for(const dep of f.requires)assert.ok(facts.some(x=>x.id===dep));}
    }
});
test('each chronology is uniquely ordered by authored times and each proof pair references distinct obtainable sources',()=>{
    for(const id of CASE_IDS){const story=CASES[id],facts=caseFacts(id);assert.equal(story.chronology.events.length,4);assert.equal(new Set(story.chronology.events.map(e=>e.id)).size,4);assert.equal(new Set(story.chronology.events.map(e=>e.minute)).size,4);
        assert.deepEqual([...story.chronology.events].sort((a,b)=>a.minute-b.minute).map(e=>e.id),story.chronology.order);
        for(const pair of story.connection.pairs){assert.equal(pair.length,2);assert.notEqual(pair[0],pair[1]);assert.ok(pair.every(key=>facts.some(f=>f.id===key)));}
        assert.equal(caseAssessment(id,{...story.solution,timeline:story.chronology.order,proof:story.connection.pairs[0]},facts.map(f=>f.id)).solved,true);
    }
});
test('case tiers have at least two cases each and every picker uses the ascending labelled catalogue',()=>{
    const ranks={easy:0,medium:1,hard:2};const counts={easy:0,medium:0,hard:0};let previous=-1;
    for(const id of CASE_IDS){const level=CASES[id].difficulty;assert.ok(Object.hasOwn(ranks,level));assert.ok(ranks[level]>=previous);previous=ranks[level];counts[level]++;assert.ok(caseOptionLabel(id).startsWith(CASE_DIFFICULTIES[level]+' · '));}
    assert.deepEqual(counts,{easy:3,medium:2,hard:3});assert.equal(Modes.normalizeModeSettings({mode:'case',difficulty:'hard'}).caseId,CASE_IDS[0]);
    for(const id of CASE_IDS)assert.equal(Modes.normalizeModeSettings({mode:'case',caseId:id,difficulty:'hard'}).difficulty,'hard');
    const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8').match(/<select id="caseId">([\s\S]*?)<\/select>/)[1];assert.deepEqual([...html.matchAll(/value="([^"]+)"/g)].map(m=>m[1]),CASE_IDS);for(const id of CASE_IDS)assert.ok(html.includes(caseOptionLabel(id)));
});
test('every exhibit and every case-specific proof pair is reachable across leads',()=>{
    for(const id of CASE_IDS){const facts=caseFacts(id);let reached=[];for(let i=0;i<12;i++)reached=[...new Set([...reached,...availableFacts(id,reached).map(f=>f.id)])];assert.equal(reached.length,12);
        assert.ok(CASES[id].connection.pairs.every(pair=>pair.every(key=>reached.includes(key))));
    }
});
test('curated deals are deterministic, follow lead/difficulty, spread evidence and avoid duplicate words',()=>{
    for(const id of CASE_IDS)for(const difficulty of ['easy','normal','hard'])for(const count of [1,5,15]){let g=started(id,{difficulty,numWords:count});for(const lead of CASES[id].leads){g.turn.leadId=lead.id;const words=caseWordObjects(id,dictionary),a=drawCaseCard(g,17,words),b=drawCaseCard(g,17,words);assert.deepEqual(a,b);assert.ok(a.words.length>0&&a.words.length<=count);assert.equal(new Set(a.words).size,a.words.length);assert.ok(a.caseFactIds.every(key=>availableFacts(id,[],lead.id).some(f=>f.id===key)));if(count>=5)assert.equal(new Set(a.caseFactIds).size,3);
        if(difficulty!=='normal')assert.ok(a.words.every(word=>words.find(w=>w.word===word).difficulty===difficulty));}}
});
test('all eight cases play through to a correct theory at easy, normal and hard without an AI request',()=>{
    for(const id of CASE_IDS)for(const difficulty of ['easy','normal','hard']){let g=started(id,{difficulty});let turns=0;while(g.phase!=='accusing'){g=begin(g);g=score(g,g.turn.words.map((_,i)=>i));assert.equal(g.phase,'evidence');g=act(g,'continue-case');assert.ok(++turns<=g.settings.caseTurns);}
        assert.equal(g.party.found.length,12);const before=structuredClone(g),who=g.hostId;for(const [field,index]of Object.entries(CASES[id].solution))g=act(g,'set-theory',{field,index},who);
        for(const eventId of CASES[id].chronology.order)g=act(g,'place-event',{eventId},who);
        for(const [index,factId]of CASES[id].connection.pairs[0].entries())g=act(g,'set-proof',{index,factId},who);
        assert.equal(act(g,'accuse',{theory:{...caseSubmission(g),suspect:(g.party.theory.suspect+1)%6}},who),undefined);
        g=act(g,'accuse',{theory:caseSubmission(g)},who);assert.equal(g.finishReason,'solved');assert.equal(before.phase,'accusing');
    }
});
test('all scenarios retain curated exhibit vocabulary and each remaining file is drawable at every difficulty',()=>{
    for(const id of CASE_IDS)for(let seed=0;seed<3;seed++){
        const g=act(lobby(id),'start-game',{seed}),words=caseWordObjects(g,dictionary);
        assert.deepEqual(words,caseWordObjects(id,dictionary),`${id}:${seed} stable exhibit mappings`);
        for(const fact of caseFacts(g))for(const difficulty of ['easy','normal','hard']){
            g.settings.difficulty=difficulty;g.turn.leadId=fact.leadId;
            // Last missing file: no unrelated lead or broad-category fallback can fill the card.
            g.party.found=caseFacts(g).filter(f=>f.id!==fact.id).map(f=>f.id);
            const deal=drawCaseCard(g,7,words);
            assert.ok(deal.words.length>0,`${id}:${seed}:${fact.id}:${difficulty}`);
            assert.ok(deal.caseFactIds.every(key=>key===fact.id));
            if(difficulty!=='normal')assert.ok(deal.words.every(word=>words.find(w=>w.word===word).difficulty===difficulty));
        }
    }
    const cake=caseWordObjects('cake',dictionary).map(w=>w.word.toLowerCase());
    for(const unrelated of ['penguin','sushi','whale','dining room table','dining table','allen key','sofa'])assert.ok(!cake.includes(unrelated),unrelated);
    assert.throws(()=>caseWordObjects('cake',dictionary.filter(w=>w.word!=='Fondant')),/Missing case vocabulary: Fondant/);
});
test('only confirmed words unlock matching files; repeated words from one file count once',()=>{
    let g=started();assert.equal(act(g,'start-round',{seed:1}),undefined);assert.equal(act(g,'choose-lead',{leadId:'missing'}),undefined);
    g=begin(g,'access');assert.equal(State.view(g,actor('B'),now).showWords,false);const groups=new Map();g.turn.caseFactIds.forEach((id,i)=>groups.set(id,[...(groups.get(id)||[]),i]));const pair=[...groups.values()].find(v=>v.length===2);assert.ok(pair);
    const before=structuredClone(g);g=act(g,'end-round');g=act(g,'toggle-answer',{index:pair[0]});assert.deepEqual(g.party.found,[]);g=act(g,'toggle-answer',{index:pair[1]});g=act(g,'submit-round');assert.equal(g.party.found.length,1);assert.equal(g.party.totalCorrect,2);assert.equal(g.party.history.length,1);
    assert.equal(State.act(g,actor(before.turn.speakerId),{type:'submit-round',turnId:g.turn.id,matchId:g.matchId},now,rules),undefined);
});
test('missed evidence stays available; the budget ends cleanly and wrong complete theories fail',()=>{
    let g=started('train',{caseTurns:4});for(let i=0;i<4;i++){g=begin(g);g=score(g,[]);assert.equal(g.party.found.length,0);g=act(g,'continue-case');}assert.equal(g.phase,'accusing');assert.equal(act(g,'resume-case',{},g.hostId),undefined);
    for(const field of ['suspect','method','destination'])g=act(g,'set-theory',{field,index:0},g.hostId);for(const eventId of CASES.train.chronology.order)g=act(g,'place-event',{eventId},g.hostId);g=act(g,'accuse',{theory:caseSubmission(g)},g.hostId);assert.equal(g.finishReason,'unsolved');assert.equal(g.party.assessment.connection,false);
});
test('the crew can discuss evidence, solve early, resume safely, and take three progressive shared nudges',()=>{
    let g=started();g=begin(g);g=score(g,[0]);assert.equal(act(g,'open-theory',{},'B'),undefined);g=act(g,'open-theory',{},g.hostId);assert.equal(g.phase,'accusing');g=act(g,'resume-case',{},g.hostId);assert.equal(g.phase,'evidence');g=act(g,'continue-case');g=begin(g);g=score(g,[]);
    for(let i=1;i<=3;i++){g=act(g,'case-hint',{},g.hostId);assert.equal(g.party.hintsUsed,i);}assert.equal(g.party.hintUsed,true);assert.equal(act(g,'case-hint',{},g.hostId),undefined);
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
    g=act(g,'end-game',{},g.hostId);g=act(g,'rematch',{seed:3},g.hostId);assert.equal(g.settings.caseId,CASE_IDS[(CASE_IDS.indexOf('bank')+1)%CASE_IDS.length]);assert.deepEqual(g.party.found,[]);assert.deepEqual(g.party.history,[]);assert.equal(g.party.hintUsed,false);assert.deepEqual(g.caseWordUses,{});
});
test('Firebase missing empty collections cannot break a first deal or zero-discovery debrief',()=>{
    function firebase(value){if(value==null)return undefined;if(Array.isArray(value))return value.length?value.map(firebase):undefined;if(typeof value==='object'){const entries=Object.entries(value).map(([k,v])=>[k,firebase(v)]).filter(([,v])=>v!==undefined);return entries.length?Object.fromEntries(entries):undefined;}return value;}
    let g=firebase(started());g=firebase(begin(g));g=firebase(score(g,[]));assert.equal(g.phase,'evidence');g=firebase(act(g,'continue-case'));assert.equal(g.phase,'idle');
});

function completeDraft(g,{timeline=CASES[g.settings.caseId].chronology.order,proof=CASES[g.settings.caseId].connection.pairs[0]}={}){
    const host=g.hostId;for(const [field,index]of Object.entries(CASES[g.settings.caseId].solution))g=act(g,'set-theory',{field,index},host);
    for(const eventId of timeline)g=act(g,'place-event',{eventId},host);
    for(const [index,factId]of proof.entries())g=act(g,'set-proof',{index,factId},host);return g;
}
function recoveredCase(id='bank'){
    let g=started(id);while(g.phase!=='accusing'){g=begin(g);g=score(g,g.turn.words.map((_,i)=>i));g=act(g,'continue-case');}return g;
}
test('a correct three-choice answer cannot bypass the chronology or evidence connection in any case',()=>{
    for(const id of CASE_IDS){const base=recoveredCase(id),story=CASES[id];
        let g=completeDraft(base,{timeline:[...story.chronology.order].reverse()});g=act(g,'accuse',{theory:caseSubmission(g)},g.hostId);assert.equal(g.finishReason,'unsolved');assert.equal(g.party.assessment.suspect,true);assert.equal(g.party.assessment.timeline,false);
        const wrongPair=caseFacts(id).map(f=>f.id).filter(key=>!story.connection.pairs.some(pair=>pair.includes(key))).slice(0,2);
        g=completeDraft(base,{proof:wrongPair});g=act(g,'accuse',{theory:caseSubmission(g)},g.hostId);assert.equal(g.finishReason,'unsolved');assert.equal(g.party.assessment.timeline,true);assert.equal(g.party.assessment.connection,false);
        g=completeDraft(base,{proof:[...story.connection.pairs[0]].reverse()});g=act(g,'accuse',{theory:caseSubmission(g)},g.hostId);assert.equal(g.finishReason,'solved');
    }
});
test('shared drafts reject invalid, duplicate, unopened and private-phase actions; concurrent moves target event IDs',()=>{
    let g=started(),guest=g.party.players.find(p=>p.id!==g.hostId).id;
    assert.equal(act(g,'set-proof',{index:0,factId:'a3'},guest),undefined);assert.equal(act(g,'place-event',{eventId:'invented'},guest),undefined);
    g=act(g,'place-event',{eventId:'portrait'},guest);assert.deepEqual(g.party.timeline,['portrait']);assert.equal(act(g,'place-event',{eventId:'portrait'},guest),undefined);
    g=act(g,'place-event',{eventId:'export'},guest);assert.equal(act(g,'timeline-up',{index:1,eventId:'approval'},guest),undefined);
    g=act(g,'timeline-up',{index:1,eventId:'export'},guest);assert.deepEqual(g.party.timeline,['export','portrait']);
    assert.equal(act(g,'timeline-remove',{index:1,eventId:'missing'},guest),undefined);
    g=act(g,'timeline-remove',{index:0,eventId:'portrait'},guest);assert.deepEqual(g.party.timeline,['export']);
    g=begin(g);assert.equal(act(g,'place-event',{eventId:'portrait'},guest),undefined);g=act(g,'end-round');assert.equal(act(g,'place-event',{eventId:'portrait'},guest),undefined);
    g=scoreFromReview(g);assert.equal(g.phase,'evidence');assert.equal(g.party.timeline[0],'export');
    function scoreFromReview(value){value=act(value,'toggle-answer',{index:0});return act(value,'submit-round');}
});
test('another crew member changing a draft invalidates the host confirmation without leaking correctness',()=>{
    let g=completeDraft(recoveredCase()),guest=g.party.players.find(p=>p.id!==g.hostId).id;
    const cleared=act(g,'set-theory',{field:'suspect',index:-1},g.hostId);assert.equal(cleared.party.theory.suspect,-1);assert.equal(act(cleared,'accuse',{theory:caseSubmission(cleared)},g.hostId),undefined);
    const confirmed=caseSubmission(g);g=act(g,'timeline-up',{index:3,eventId:'settled'},guest);
    assert.equal(g.party.assessment,undefined);assert.equal(act(g,'accuse',{theory:confirmed},g.hostId),undefined);
    assert.equal(act(g,'accuse',{theory:caseSubmission(g)},guest),undefined);
    assert.equal(act(g,'set-proof',{index:1,factId:g.party.proof[0]},guest),undefined);
    g=act(g,'set-proof',{index:1,factId:''},guest);assert.equal(g.party.proof[1],'');
    const fresh=caseSubmission(g);g=act(g,'accuse',{theory:fresh},g.hostId);assert.equal(g.finishReason,'unsolved');
});
test('a zero-evidence forced ending remains submittable, and a rematch clears all reconstruction state',()=>{
    let g=started('bank',{caseTurns:4});for(let i=0;i<4;i++){g=begin(g);g=score(g,[]);g=act(g,'continue-case');}
    g=completeDraft(g,{proof:[]});g=act(g,'accuse',{theory:caseSubmission(g)},g.hostId);assert.equal(g.finishReason,'unsolved');assert.equal(g.party.assessment.connection,false);
    g=act(g,'rematch',{seed:2},g.hostId);assert.deepEqual(g.party.timeline,[]);assert.deepEqual(g.party.proof,['','']);assert.equal(g.party.assessment,undefined);assert.equal(g.party.hintsUsed,0);
});
test('the audio cancellation and image transformation use the values actually shown to investigators',()=>{
    const samples=caseFacts('encore').find(f=>f.id==='a1').visual.panels;
    assert.ok(samples[0].samples.some(value=>value!==0));assert.deepEqual(samples[0].samples.map((value,i)=>(value-samples[1].samples[i])/2),[0,0,0,0]);
    const patterns=caseFacts('observatory').find(f=>f.id==='i2').visual.panels;
    const key=points=>points.map(p=>p.join(',')).sort().join('|');
    assert.notEqual(key(patterns[0].points.map(([x,y])=>[6-x,y])),key(patterns[1].points));
    assert.ok(patterns[0].points.every(p=>patterns[1].points.some(other=>other[0]===p[0]&&other[1]===p[1])));
});
function failedAttempt(id='bank'){
    let g=completeDraft(recoveredCase(id),{timeline:[...CASES[id].chronology.order].reverse(),proof:[]});
    for(const field of ['suspect','destination'])g=act(g,'set-theory',{field,index:(CASES[id].solution[field]+1)%(field==='suspect'?6:3)},g.hostId);
    return act(g,'accuse',{theory:caseSubmission(g)},g.hostId);
}
test('failed results disclose only the correctly submitted parts across every case',()=>{
    for(const id of CASE_IDS){const g=failedAttempt(id),feedback=caseFeedback(g);assert.equal(g.finishReason,'unsolved');assert.equal(g.party.attempts,1);
        assert.deepEqual(feedback.filter(part=>part.correct).map(part=>part.key),['method']);assert.equal(feedback.find(part=>part.key==='method').answer,CASES[id].methods[CASES[id].solution.method]);
        assert.ok(feedback.filter(part=>!part.correct).every(part=>part.answer===''));assert.deepEqual(Object.keys(g.party.confirmedParts),['method']);
    }
});
test('host retries preserve the investigation and confirmed answers but revoke every previous-attempt command',()=>{
    let g=failedAttempt(),before=structuredClone(g),guest=g.party.players.find(p=>p.id!==g.hostId).id;
    assert.equal(act(g,'retry-case',{},guest),undefined);g=act(g,'retry-case',{},g.hostId);assert.equal(g.phase,'accusing');assert.equal(g.finishReason,null);assert.equal(g.endedAt,null);
    assert.equal(g.turn.id,before.turn.id+1);assert.equal(g.matchId,before.matchId);assert.deepEqual(g.party.found,before.party.found);assert.deepEqual(g.party.history,before.party.history);assert.deepEqual(g.caseWordUses,before.caseWordUses);assert.deepEqual(g.party.theory,before.party.theory);
    assert.equal(g.party.attempts,1);assert.equal(confirmedCasePart(g,'method'),true);assert.equal(confirmedCasePart(g,'suspect'),false);assert.equal(act(g,'retry-case',{},g.hostId),undefined);
    assert.equal(State.act(g,actor(g.hostId),{type:'accuse',turnId:before.turn.id,matchId:g.matchId,theory:caseSubmission(g)},now,rules),undefined);
    assert.equal(State.act(g,actor(g.hostId),{type:'retry-case',turnId:before.turn.id,matchId:g.matchId},now,rules),undefined);
    for(const eventId of [...g.party.timeline])g=act(g,'timeline-remove',{eventId},g.hostId);g=completeDraft(g);
    g=act(g,'accuse',{theory:caseSubmission(g)},g.hostId);assert.equal(g.finishReason,'solved');assert.equal(g.party.attempts,2);assert.equal(act(g,'retry-case',{},g.hostId),undefined);
    g=act(g,'rematch',{seed:3},g.hostId);assert.equal(g.party.attempts,0);assert.deepEqual(g.party.confirmedParts,{});
});
test('retry state survives omitted Firebase collections and stopped cases cannot retry',()=>{
    let g=failedAttempt();delete g.party.discoveries;delete g.party.proof;g=act(g,'retry-case',{},g.hostId);assert.deepEqual(g.party.proof,['','']);assert.equal(confirmedCasePart(g,'method'),true);
    g=act(g,'set-theory',{field:'method',index:(g.party.theory.method+1)%3},g.hostId);assert.equal(confirmedCasePart(g,'method'),false);
    g=act(g,'end-game',{},g.hostId);assert.equal(act(g,'retry-case',{},g.hostId),undefined);
});
test('an early failed theory can reopen its original discussion and continue investigating within the budget',()=>{
    let g=score(begin(started()),[0]);g=act(g,'open-theory',{},g.hostId);g=completeDraft(g,{proof:[]});g=act(g,'accuse',{theory:caseSubmission(g)},g.hostId);
    assert.equal(g.finishReason,'unsolved');g=act(g,'retry-case',{},g.hostId);g=act(g,'resume-case',{},g.hostId);assert.equal(g.phase,'evidence');assert.equal(g.party.history.length,1);assert.equal(g.party.found.length,1);
    g=act(g,'continue-case');assert.equal(g.phase,'idle');assert.equal(g.party.attempts,1);
});
