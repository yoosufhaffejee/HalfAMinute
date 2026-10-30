import { CASES, CASE_IDS, caseFacts, availableFacts } from './cases.js?v=20261030.cases1';
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
        if(type==='review-theory'){confirmed={...current.game.party.theory};signature='';render(current);const title=root.querySelector('.case-theory-confirm h4');if(title){title.tabIndex=-1;title.focus();}return;}
        if(type==='edit-theory'){confirmed=null;signature='';render(current);root.querySelector('#case-suspect')?.focus();return;}
        callbacks.send({type,...(target.dataset.playerId?{playerId:target.dataset.playerId}:{}),...(target.dataset.leadId?{leadId:target.dataset.leadId}:{}),
            ...(target.dataset.index!==undefined?{index:Number(target.dataset.index)}:{}),...(type==='accuse'?{theory:confirmed}:{}),
            ...(type==='rematch'?{caseId:root.querySelector('#nextCase')?.value}:{}),...(type==='react'?{reaction:target.dataset.reaction,reviewId:current.game.roundReview.turnId}:{})});
    });
    root.addEventListener('change',event=>{const field=event.target.dataset.caseField;if(field&&current?.view.host)callbacks.send({type:'set-theory',field,index:Number(event.target.value)});});
    function evidence(parent, item, extra='') { const card=h('article','case-evidence-card');card.appendChild(h('h4','',`${extra}${item.title}`));note(card,item.text);parent.appendChild(card); }
    function briefing(parent,story){const n=h('div','case-brief');n.appendChild(h('span','case-file-icon',story.icon));note(n,story.intro);note(n,'One person is responsible. The recorded evidence is reliable; all answers are supported inside this case.','case-ground-rules');parent.appendChild(n);}
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
        const brief=disclosure('brief','Read the briefing');note(brief,story.intro);book.appendChild(brief);
        const found=facts.filter(f=>final||game.party.found.includes(f.id));
        if(!found.length)note(book,'Evidence appears here after confirmed correct words. The speaker never sees a sealed fact just by receiving its word.');
        found.forEach(f=>evidence(book,f,final&&!game.party.found.includes(f.id)?'Uncovered in debrief · ':''));
        if(game.party.hintUsed)note(book,story.hint,'case-investigation-hint');
        else if(view.host&&game.party.history.length>=2&&!final)book.appendChild(button('Need a reasoning hint?', 'case-hint',busy));
        parent.appendChild(book);
    }
    function theory(parent,state){
        const {game,view,busy}=state,story=CASES[game.settings.caseId],value=game.party.theory;
        parent.appendChild(h('h3','','Build your final theory'));
        note(parent,view.host?'Agree on all three answers. Review the evidence before making your final submission.':'Discuss the evidence. The host records and confirms the crew’s theory.');
        const fields=[['suspect','Who was responsible?',story.people.map(p=>p.name+' · '+p.role)],['method',story.methodQuestion,story.methods],['destination',story.destinationQuestion,story.destinations]];
        if(confirmed){
            const panel=h('div','case-theory-confirm');panel.appendChild(h('h4','','Confirm the crew’s final answer'));
            fields.forEach(([key,label,options])=>note(panel,`${label} ${options[confirmed[key]]}`));note(panel,'Submitting ends this investigation.');
            panel.appendChild(button('Submit final theory','accuse',busy||!view.host));panel.appendChild(button('Edit these answers','edit-theory',busy));parent.appendChild(panel);
        }else{
            fields.forEach(([key,label,options])=>{const field=h('div','form-field');const l=h('label','',label);l.htmlFor='case-'+key;field.appendChild(l);const select=h('select');select.id='case-'+key;select.dataset.caseField=key;select.disabled=busy||!view.host;
                const empty=h('option','','Choose together…');empty.value='-1';select.appendChild(empty);options.forEach((text,index)=>{const option=h('option','',text);option.value=String(index);select.appendChild(option)});select.value=String(value[key]);field.appendChild(select);parent.appendChild(field)});
            if(view.host)parent.appendChild(button('Review final theory','review-theory',busy||fields.some(([key])=>value[key]<0)));
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
        const ckey=JSON.stringify([game.matchId,game.settings.caseId,party?.theory]);if(confirmationKey!==ckey){confirmationKey=ckey;confirmed=null;}
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
            if(!stopped){const answer=story.solution;note(body,`${story.people[answer.suspect].name} · ${story.methods[answer.method]} · ${story.destinations[answer.destination]}`,'case-solution');story.reveal.forEach(text=>note(body,text));note(body,`${party.found.length}/12 evidence found · ${party.history.length} investigations${party.hintUsed?' · Reasoning hint used':''}`);}
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
