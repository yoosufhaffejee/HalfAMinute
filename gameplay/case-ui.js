import { CASES, CASE_IDS, caseFacts, availableFacts, caseFields, caseSubmission } from './cases.js?v=20261030.reconstruction1';
import { countdownLabel } from './rules.js?v=20261030.2';
import { REACTIONS, REACTION_LABELS, REACTION_TTL_MS } from './experience.js?v=20261030.4';
const h = (tag, cls = '', text = '') => { const n = document.createElement(tag); n.className = cls; n.textContent = text; return n; };
function button(text, type, disabled = false, payload = {}) { const n = h('button','btn btn-success',text); n.type='button';n.dataset.caseAction=type;n.disabled=disabled;Object.entries(payload).forEach(([key,value])=>{n.dataset[key]=String(value)});return n; }
const note = (parent,text,cls='party-note') => parent.appendChild(h('p',cls,text));
export function createCaseSurface(root, callbacks) {
    let current, signature='', feedback='', confirmed=null, confirmationKey='', phaseKey='', reactionKey='', disclosureKey='', disclosures=new Map(), suppressed=new Set();
    root.addEventListener('toggle',event=>{const key=event.target.dataset.caseDisclosure;if(key&&root.contains(event.target))disclosures.set(key,event.target.open)},true);
    function disclosure(key, title, open=false){const n=h('details');n.dataset.caseDisclosure=key;n.open=disclosures.has(key)?disclosures.get(key):open;n.appendChild(h('summary','',title));return n;}
    root.addEventListener('click',event=>{
        const target=event.target.closest('button[data-case-action]');if(!target||target.disabled||!current)return;
        const type=target.dataset.caseAction;
        if(type==='exit'){callbacks.exit();return;}if(type==='rejoin'){callbacks.rejoin();return;}
        if(type==='summary'){callbacks.summary(current.game);return;}
        if(type==='share'||type==='invite'){target.disabled=true;void(type==='share'?callbacks.share(current.game):callbacks.invite()).then(text=>{feedback=text||'';signature='';if(current)render(current)}).catch(()=>{feedback='Unable to complete that action. Please try again.';signature='';if(current)render(current)});return;}
        if(type==='review-theory'){confirmed=caseSubmission(current.game);signature='';render(current);const title=root.querySelector('.case-theory-confirm h4');if(title){title.tabIndex=-1;title.focus();}return;}
        if(type==='edit-theory'){confirmed=null;signature='';render(current);root.querySelector('#case-suspect')?.focus();return;}
        callbacks.send({type,...(target.dataset.playerId?{playerId:target.dataset.playerId}:{}),...(target.dataset.leadId?{leadId:target.dataset.leadId}:{}),
            ...(target.dataset.index!==undefined?{index:Number(target.dataset.index)}:{}),...(target.dataset.eventId?{eventId:target.dataset.eventId}:{}),...(type==='accuse'?{theory:confirmed}:{}),
            ...(type==='rematch'?{caseId:root.querySelector('#nextCase')?.value}:{}),...(type==='react'?{reaction:target.dataset.reaction,reviewId:current.game.roundReview.turnId}:{})});
    });
    root.addEventListener('change',event=>{
        if(event.target.dataset.caseProof!==undefined&&current){callbacks.send({type:'set-proof',index:Number(event.target.dataset.caseProof),factId:event.target.value});return;}
        const field=event.target.dataset.caseField;if(field&&current?.view.host)callbacks.send({type:'set-theory',field,index:Number(event.target.value)});
    });
    function evidence(parent,item,extra='') {
        const card=h('article','case-evidence-card');card.appendChild(h('span','case-source',`${item.code} · ${item.source}`));card.appendChild(h('h4','',`${extra}${item.title}`));
        const recovered=[...new Set((current?.game.party?.history||[]).flatMap(entry=>(entry.correct||[]).filter(index=>entry.caseFactIds?.[index]===item.id).map(index=>entry.words[index])))];
        if(recovered.length)note(card,'Recovered through '+recovered.slice(0,2).join(' · '),'case-recovered-words');note(card,item.text);
        if(item.visual)visual(card,item.visual);
        const records=h('dl','case-records');for(const [label,value]of item.records){const row=h('div','case-record');row.appendChild(h('dt','',label));row.appendChild(h('dd','',value));records.appendChild(row);}card.appendChild(records);parent.appendChild(card);
    }
    function visual(parent,data){
        const figure=h('figure','case-visual');figure.setAttribute('aria-label',data.kind==='pixels'?'Raw and published coordinate diagrams':'Stereo sample diagrams; values transcribed below');
        for(const panel of data.panels){const part=h('div','case-visual-panel');part.appendChild(h('div','case-visual-label',panel.label));
            if(data.kind==='pixels'){const grid=h('div','case-pixel-grid');grid.setAttribute('role','img');grid.setAttribute('aria-label',`${panel.label}: bright cells ${panel.points.map(p=>p.join(',')).join('; ')}. Coordinates also listed below.`);for(let y=3;y>=1;y--)for(let x=1;x<=5;x++){const on=panel.points.some(p=>p[0]===x&&p[1]===y),cell=h('span',on?'is-bright':'',on?'✦':'');cell.title=`(${x},${y})`;grid.appendChild(cell);}part.appendChild(grid);}
            else{const bars=h('div','case-wave');bars.setAttribute('aria-hidden','true');panel.samples.forEach(sample=>{const bar=h('span',sample<0?'is-negative':'');bar.style.setProperty('--level',String(Math.abs(sample)*9)+'px');bars.appendChild(bar)});part.appendChild(bars);}figure.appendChild(part);
        }parent.appendChild(figure);
    }
    function scene(parent,story){const n=h('ol','case-scene');n.setAttribute('aria-label','Case locations and record sources');story.scene.forEach((label,index)=>{const item=h('li');item.appendChild(h('span','',String(index+1).padStart(2,'0')));item.appendChild(h('strong','',label));n.appendChild(item)});parent.appendChild(n);}
    function briefing(parent,story){const n=h('div','case-brief');n.appendChild(h('span','case-file-icon',story.icon));note(n,story.intro);scene(n,story);note(n,story.groundRules,'case-ground-rules');note(n,'Recover documents through word rounds. Rebuild four events, connect two exhibits, then submit who, how and where. A correct name alone does not close the case.','case-ground-rules');parent.appendChild(n);}
    function leads(parent,state){
        const {game,view,busy}=state,story=CASES[game.settings.caseId];const list=h('div','case-lead-list');
        story.leads.forEach(source=>{
            const found=source.facts.filter(f=>game.party.found.includes(f.id)).length,available=availableFacts(game.settings.caseId,game.party.found,source.id).length;
            const n=button('', 'choose-lead',busy||!view.speaker||game.phase!=='idle'||!available,{leadId:source.id});n.className=`case-lead${game.turn.leadId===source.id?' is-chosen':''}`;n.setAttribute('aria-pressed',String(game.turn.leadId===source.id));
            n.appendChild(h('span','case-lead-icon',source.icon));n.appendChild(h('strong','',source.name));n.appendChild(h('span','',source.question));
            n.appendChild(h('small','',`${found}/${source.facts.length} files found${!available&&found<source.facts.length?' · Follow-up needs another lead':found===source.facts.length?' · Complete':''}`));list.appendChild(n);
        });parent.appendChild(list);
    }
    function notebook(parent,state){
        const {game,view,busy}=state,story=CASES[game.settings.caseId],facts=caseFacts(game.settings.caseId),final=game.phase==='finished'&&game.finishReason!=='stopped';
        const book=disclosure('notebook',`Case notebook · ${game.party.found.length}/${facts.length} evidence files`,game.phase==='accusing');book.className='case-notebook';
        const profiles=disclosure('profiles','Meet the six suspects');profiles.className='case-profiles';const people=h('div','case-person-list');
        story.people.forEach((p,index)=>{const card=h('article','case-person');card.appendChild(h('span',`case-initial case-initial-${index%4}`,p.name.slice(0,1)));card.appendChild(h('h4','',p.name));card.appendChild(h('strong','',p.role));note(card,p.profile);people.appendChild(card)});profiles.appendChild(people);book.appendChild(profiles);
        const brief=disclosure('brief','Briefing & ground rules');note(brief,story.intro);scene(brief,story);note(brief,story.groundRules);book.appendChild(brief);
        const found=facts.filter(f=>final||game.party.found.includes(f.id));
        if(!found.length)note(book,'Evidence appears here after confirmed correct words. The speaker never sees a sealed fact just by receiving its word.');
        story.leads.forEach(source=>{const files=found.filter(f=>f.leadId===source.id);if(!files.length)return;const group=disclosure('source:'+source.id,`${source.icon} ${source.name} · ${files.length}/${source.facts.length}`,false);group.className='case-source-group';files.forEach(f=>{const file=disclosure('file:'+f.id,`${f.code} · ${f.title}${final&&!game.party.found.includes(f.id)?' · Missed during play':''}`);file.className='case-file';evidence(file,f);group.appendChild(file)});book.appendChild(group);});
        const used=game.party.hintsUsed||0;
        story.hints.slice(0,used).forEach((text,index)=>note(book,`Nudge ${index+1}: ${text}`,'case-investigation-hint'));
        if(view.host&&game.party.history.length>=2&&!final&&used<story.hints.length)book.appendChild(button(used?`Reveal nudge ${used+1} of ${story.hints.length}`:'Need a nudge? (optional)', 'case-hint',busy));
        parent.appendChild(book);
    }
    function reconstruction(parent,state,final=false){
        const {game,view,busy}=state,story=CASES[game.settings.caseId],party=game.party,timeline=party.timeline||[],proof=party.proof||[],editable=view.active&&state.connected&&!busy;
        const panel=disclosure(final?'final-reconstruction':'draft-reconstruction',`Reconstruction · ${timeline.length}/4 events · ${proof.filter(Boolean).length}/2 exhibits`,final);panel.className='case-reconstruction';
        note(panel,state.local?'Build this together between word rounds. Your draft is not checked until final submission.':'Anyone in the crew can edit this shared draft. The host submits the final theory. Drafts are not checked.','case-draft-note');
        panel.appendChild(h('h4','','1. Rebuild the timeline'));
        note(panel,'Place all four events from earliest to latest in real time. Compare clocks and distinguish an event from its later report.');
        const list=h('ol','case-timeline');list.setAttribute('aria-label','Your proposed order, earliest first');
        timeline.forEach((key,index)=>{const event=story.chronology.events.find(e=>e.id===key),row=h('li');row.appendChild(h('span','case-event-number',String(index+1)));row.appendChild(h('strong','',event?.label||key));const controls=h('div','case-event-controls');
            const up=button('↑','timeline-up',!editable||!index,{index,eventId:key});up.setAttribute('aria-label',`Move ${event?.label} earlier`);up.title='Move earlier';up.id='case-up-'+key;controls.appendChild(up);
            const remove=button('×','timeline-remove',!editable,{index,eventId:key});remove.setAttribute('aria-label',`Remove ${event?.label} from timeline`);remove.title='Remove from timeline';controls.appendChild(remove);row.appendChild(controls);list.appendChild(row)});
        if(!timeline.length)note(panel,'No events placed yet. Tap an event below to place it first.','case-empty');panel.appendChild(list);
        const bank=h('div','case-event-bank');story.chronology.events.filter(e=>!timeline.includes(e.id)).forEach(e=>{const n=button('+ '+e.label,'place-event',!editable,{eventId:e.id});n.id='case-place-'+e.id;bank.appendChild(n)});panel.appendChild(bank);
        panel.appendChild(h('h4','','2. Connect the evidence'));note(panel,story.connection.question,'case-connection-question');
        const facts=caseFacts(game.settings.caseId).filter(f=>party.found.includes(f.id)),fields=h('div','case-proof-fields');
        for(let i=0;i<2;i++){const field=h('div','form-field'),label=h('label','',`Exhibit ${i+1}`);label.htmlFor='case-proof-'+i;field.appendChild(label);const select=h('select');select.id=label.htmlFor;select.dataset.caseProof=String(i);select.disabled=!editable;
            const empty=h('option','','Choose a recovered exhibit…');empty.value='';select.appendChild(empty);facts.forEach(f=>{const option=h('option','',`${f.code} · ${f.title}`);option.value=f.id;option.disabled=proof[1-i]===f.id;select.appendChild(option)});select.value=proof[i]||'';field.appendChild(select);fields.appendChild(field)}panel.appendChild(fields);
        if(facts.length<2)note(panel,'Recover at least two exhibits to build a supported connection. You can still submit an incomplete investigation.','case-empty');
        const comparison=h('div','case-comparison');proof.filter(Boolean).forEach(key=>{const item=facts.find(f=>f.id===key);if(item)evidence(comparison,item)});if(comparison.childElementCount){const compare=disclosure(final?'final-compare':'draft-compare','Compare selected exhibits');compare.className='case-compare-disclosure';compare.appendChild(comparison);panel.appendChild(compare);}
        parent.appendChild(panel);
    }
    function theory(parent,state){
        const {game,view,busy}=state,story=CASES[game.settings.caseId],value=game.party.theory;
        parent.appendChild(h('h3','','Build your final theory'));
        note(parent,view.host?'A solved case needs the right explanation, event order and evidence connection. Review the complete reconstruction before submitting.':'Discuss and edit the shared reconstruction. The host records who, how and where, then submits for the crew.');
        const fields=caseFields(game.settings.caseId);
        if(confirmed){
            const panel=h('div','case-theory-confirm');panel.appendChild(h('h4','','Confirm the crew’s final answer'));
            fields.forEach(([key,label,options])=>note(panel,`${label} ${options[confirmed[key]]}`));
            note(panel,'Your timeline: '+confirmed.timeline.map(key=>story.chronology.events.find(e=>e.id===key)?.label).join(' → '));
            note(panel,'Your evidence connection: '+confirmed.proof.map(key=>caseFacts(game.settings.caseId).find(f=>f.id===key)?.title||'Missing exhibit').join(' + '));
            if(confirmed.proof.some(key=>!key))note(panel,'This theory has missing support. It can be submitted, but cannot close the case.','case-investigation-hint');
            note(panel,'Submitting ends this investigation. The entire reconstruction is checked together.');
            panel.appendChild(button('Submit final theory','accuse',busy||!view.host));panel.appendChild(button('Edit these answers','edit-theory',busy));parent.appendChild(panel);
        }else{
            reconstruction(parent,state,true);parent.appendChild(h('h4','','3. Explain the case'));
            fields.forEach(([key,label,options])=>{const field=h('div','form-field');const l=h('label','',label);l.htmlFor='case-'+key;field.appendChild(l);const select=h('select');select.id='case-'+key;select.dataset.caseField=key;select.disabled=busy||!view.host;
                const empty=h('option','','Choose together…');empty.value='-1';select.appendChild(empty);options.forEach((text,index)=>{const option=h('option','',text);option.value=String(index);select.appendChild(option)});select.value=String(value[key]);field.appendChild(select);parent.appendChild(field)});
            if(view.host)parent.appendChild(button('Review final theory','review-theory',busy||fields.some(([key])=>value[key]<0)||(game.party.timeline||[]).length!==4));
            if(view.host&&game.party.returnPhase)parent.appendChild(button('Continue investigating','resume-case',busy));
        }
    }
    function reactions(parent,state){
        const {game,actor,now,busy}=state;if(state.local||!game.roundReview)return;
        const reviewId=game.roundReview.turnId,key=`${game.matchId}:${reviewId}:${actor.connectionId}`;
        if(key!==reactionKey){reactionKey=key;suppressed=new Set(Object.entries(game.reactions||{}).map(([id,r])=>`${id}:${r.at}`));}
        const row=h('div','party-reactions');row.setAttribute('aria-label','React to this discovery');
        for(const [reaction,emoji]of Object.entries(REACTIONS)){const n=button(emoji,'react',busy||Boolean(game.reactions?.[actor.playerId]&&now-game.reactions[actor.playerId].at<1800),{reaction});n.setAttribute('aria-label',REACTION_LABELS[reaction]);n.title=REACTION_LABELS[reaction];row.appendChild(n)}
        const feed=h('span','',Object.entries(game.reactions||{}).filter(([id,r])=>r.reviewId===reviewId&&now>=r.at&&now-r.at<REACTION_TTL_MS&&!suppressed.has(`${id}:${r.at}`)).map(([id,r])=>`${REACTIONS[r.reaction]} ${game.party.players.find(p=>p.id===id)?.name||''}`).join(' · '));feed.setAttribute('role','status');row.appendChild(feed);parent.appendChild(row);
    }
    function render(state){
        if(state.local&&!state.view.host)state={...state,view:{...state.view,host:true}};
        current=state;const {game,view,local,now,busy,gateName,gateId}=state,story=CASES[game.settings.caseId],party=game.party,turn=game.turn;
        const dk=`${game.matchId}:${game.settings.caseId}`;if(disclosureKey!==dk){disclosureKey=dk;disclosures.clear();}
        const ckey=JSON.stringify([game.matchId,game.settings.caseId,caseSubmission(game)]);if(confirmationKey!==ckey){confirmationKey=ckey;confirmed=null;}
        const {countdownRemainingMs,remainingSeconds,...stableView}=view;
        const live=Object.entries(game.reactions||{}).filter(([,r])=>now>=r.at&&now-r.at<REACTION_TTL_MS);
        const next=JSON.stringify([game.matchId,game.settings,game.phase,party,turn,stableView,Boolean(countdownRemainingMs),busy,state.connected,gateName,confirmed,feedback,live]);
        const clock=root.querySelector('#partyClock');if(clock)clock.textContent=countdownRemainingMs?countdownLabel(countdownRemainingMs):String(remainingSeconds);
        if(next===signature)return;signature=next;
        const focused=document.activeElement?.id;const changed=phaseKey!==`${game.matchId}:${game.phase}:${turn?.id}:${gateName}:${Boolean(countdownRemainingMs)}`;phaseKey=`${game.matchId}:${game.phase}:${turn?.id}:${gateName}:${Boolean(countdownRemainingMs)}`;
        root.replaceChildren();root.className=`party-game party-case case-phase-${game.phase}`;
        const header=h('div','party-heading');header.appendChild(h('span','party-eyebrow',`Case ${String(CASE_IDS.indexOf(game.settings.caseId)+1).padStart(2,'0')} · ${story.location}`));header.appendChild(h('h2','',story.title));
        if(!local)note(header,`Lobby ${state.code} · Use your usual voice call`,'party-progress');
        if(party)note(header,`${party.history.length}/${game.settings.caseTurns} investigations · ${party.found.length}/12 evidence files`,'party-progress');root.appendChild(header);
        const body=h('section','party-stage');root.appendChild(body);const active=view.active&&state.connected;
        if(feedback)note(body,feedback,'party-feedback');
        if(!active&&!local){note(body,state.connected?'Rejoin to restore your seat.':'Connection lost. Reconnecting…');body.appendChild(button('Rejoin lobby','rejoin',busy));}
        else if(gateName&&game.phase!=='finished'){body.appendChild(h('h3','',`Pass the device to ${gateName}`));note(body,'The speaker holds the screen. Everyone else guesses aloud.');body.appendChild(button(`I’m ${gateName}`,'local-ready',false,{playerId:gateId}));}
        else if(!game.isGameStarted){briefing(body,story);note(body,`${view.roster.connectedPlayers} connected · 2–12 players. Choose leads, describe words, connect the evidence.`);if(view.host)body.appendChild(button('Open the case','start-game',busy||!view.canStartGame));else note(body,'The host opens the case when everyone is ready.');}
        else if(game.phase==='finished'){
            const stopped=game.finishReason==='stopped';body.appendChild(h('h3','',stopped?'Investigation ended':game.finishReason==='solved'?'Case solved!':'The theory didn’t fit'));
            if(!stopped){const answer=story.solution,assessment=party.assessment||{};const verdict=h('div','case-verdict');for(const [key,label]of [['suspect','Who'],['method','How'],['destination','Where'],['timeline','Timeline'],['connection','Evidence link']])verdict.appendChild(h('span',assessment[key]?'is-matched':'is-missed',`${assessment[key]?'✓':'×'} ${label}`));body.appendChild(verdict);
                note(body,`${story.people[answer.suspect].name} · ${story.methods[answer.method]} · ${story.destinations[answer.destination]}`,'case-solution');story.reveal.forEach(text=>note(body,text));
                const debrief=h('div','case-debrief');debrief.appendChild(h('h4','','What actually happened'));const ordered=h('ol');story.chronology.order.forEach(key=>ordered.appendChild(h('li','',story.chronology.events.find(e=>e.id===key).label)));debrief.appendChild(ordered);note(debrief,story.chronology.explanation);debrief.appendChild(h('h4','','The evidence connection'));note(debrief,story.connection.explanation);body.appendChild(debrief);
                note(body,`${party.found.length}/12 evidence found · ${party.history.length} investigations${party.hintUsed?` · ${party.hintsUsed||1} nudges used`:''}`);}
            if(view.host||local){const field=h('div','form-field');const label=h('label','','Choose your next case');label.htmlFor='nextCase';field.appendChild(label);const select=h('select');select.id='nextCase';
                for(const id of CASE_IDS){const option=h('option','',`${CASES[id].title}${id===game.settings.caseId?' · Replay the same solution':''}`);option.value=id;select.appendChild(option)}select.value=CASE_IDS[(CASE_IDS.indexOf(game.settings.caseId)+1)%CASE_IDS.length];field.appendChild(select);body.appendChild(field);body.appendChild(button('Open another case','rematch',busy));}
            else note(body,'The host can choose another case.');body.appendChild(button('Share result card','share'));body.appendChild(button('Download summary','summary'));
        }else if(['idle','waiting'].includes(game.phase)){
            const speaker=party.players.find(p=>p.id===turn.speakerId);body.appendChild(h('h3','',view.speaker?'Which lead will you follow?':`${speaker?.name||'The next speaker'} chooses the lead`));
            if(!party.history.length)briefing(body,story);
            note(body,`Up to ${game.settings.numWords} words · ${game.settings.numSeconds} seconds. Each correct word uncovers its matching file; related words can open the same file once.`);
            leads(body,state);if(view.speaker)body.appendChild(button('Investigate this lead','start-round',busy||!view.canStartRound));
            if(game.phase==='waiting')note(body,'Waiting for the assigned speaker and at least two connected crew members.');
        }else if(game.phase==='describing'){
            const time=h('strong','party-clock',countdownRemainingMs?countdownLabel(countdownRemainingMs):String(remainingSeconds));time.id='partyClock';body.appendChild(time);
            if(countdownRemainingMs){body.appendChild(h('h3','','Get ready'));note(body,'Words stay hidden until Go. The full timer starts then.');}
            else{const source=story.leads.find(l=>l.id===turn.leadId);body.appendChild(h('h3','',source.name));note(body,view.speaker?'Describe the words in any order. The case facts stay sealed until correct answers are confirmed.':'Guess aloud. Only the speaker sees the words.');
                if(view.showWords){const list=h('ol','table-word-card');turn.words.forEach(word=>list.appendChild(h('li','party-word',word)));body.appendChild(list);}if(view.canEndRound)body.appendChild(button(view.speaker?'End round':'Recover round & review','end-round',busy));}
        }else if(game.phase==='selecting'){
            body.appendChild(h('h3','','Which words were guessed?'));note(body,view.reviewer?'Mark the correct words, then confirm to open their evidence files.':'The speaker or recovery host confirms the correct words.');
            turn.words.forEach((word,index)=>{const selected=turn.selectedIndexes.includes(index),n=button(`${selected?'✓ ':''}${index+1}. ${word}`,'toggle-answer',busy||!view.canSelect,{index});n.className=`party-review-answer${selected?' is-correct':''}`;n.setAttribute('aria-pressed',String(selected));body.appendChild(n)});
            const discoveries=new Set(turn.selectedIndexes.map(i=>turn.caseFactIds[i]).filter(id=>!party.found.includes(id)));note(body,`${turn.selectedIndexes.length} correct words · ${discoveries.size} new evidence ${discoveries.size===1?'file':'files'}`,'party-recap');
            if(view.canSelect)body.appendChild(button('Confirm & uncover evidence','submit-round',busy));
        }else if(game.phase==='evidence'){
            body.appendChild(h('h3','',party.discoveries.length?'New evidence uncovered':'No new evidence this turn'));
            if(!party.discoveries.length)note(body,'Those files stay available through related words. Choose a lead to try again.');
            caseFacts(game.settings.caseId).filter(f=>party.discoveries.includes(f.id)).forEach(f=>evidence(body,f));
            const finished=party.history.length>=game.settings.caseTurns||party.found.length===12;
            if(view.reviewer)body.appendChild(button(finished?'Build the final theory':'Pass to the next investigator','continue-case',busy));else note(body,'Read the new evidence together. The speaker continues when the crew is ready.');
        }else if(game.phase==='accusing')theory(body,state);
        if(party&&active&&!gateName&&!['describing','selecting'].includes(game.phase)){
            if(view.host&&party.found.length>=5&&['idle','waiting','evidence'].includes(game.phase)){const shortcut=button('Ready to solve? Build a theory','open-theory',busy);shortcut.className='btn btn-outline-success';root.appendChild(shortcut);}
            if(!['accusing','finished'].includes(game.phase))reconstruction(root,state);
            notebook(root,state);reactions(root,state);
            if(party.history.length){const details=h('details','party-history');details.appendChild(h('summary','','Investigation history'));party.history.forEach((e,i)=>note(details,`${i+1}. ${story.leads.find(l=>l.id===e.leadId).name} · ${e.earned}/${e.wordCount} correct · ${(e.discoveries||[]).length} files`));root.appendChild(details);}
        }
        const footer=h('div','party-footer');footer.appendChild(button(local?'New game':'Leave lobby','exit'));if(!local&&active&&!['describing','selecting'].includes(game.phase))footer.appendChild(button('Invite friends','invite'));if(view.host&&game.isGameStarted&&game.phase!=='finished')footer.appendChild(button('End investigation','request-end',busy));root.appendChild(footer);
        if(focused?.startsWith('case-'))root.querySelector('#'+focused)?.focus({preventScroll:true});
        if(changed){const announcement=document.getElementById('partyAnnouncement');if(announcement)announcement.textContent=gateName?`Pass the device to ${gateName}.`:game.phase==='describing'?countdownRemainingMs?'Get ready. Words remain hidden until Go.':'Clue time has started.':body.querySelector('h3')?.textContent||story.title;
            if(gateName||['idle','evidence','selecting','accusing','finished'].includes(game.phase)){const heading=body.querySelector('h3');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}}}
    }
    return {render,reset(){current=null;signature='';feedback='';confirmed=null;confirmationKey='';phaseKey='';reactionKey='';disclosureKey='';disclosures.clear();suppressed.clear();}};
}
