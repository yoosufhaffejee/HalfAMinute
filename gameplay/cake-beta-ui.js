import { caseStory } from './cases.js?v=20261031.beta1';
import { countdownLabel } from './rules.js?v=20261030.2';
import { BETA_PUZZLES } from './cake-beta-state.js?v=20261031.beta2';
const h=(tag,cls='',text='')=>{const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;};
const note=(parent,text,cls='party-note')=>parent.appendChild(h('p',cls,text));
function button(text,action,disabled=false,data={}){const n=h('button','btn btn-success',text);n.type='button';n.dataset.betaAction=action;n.disabled=disabled;for(const[k,v]of Object.entries(data))n.dataset[k]=String(v);return n;}
const marks=['☀','☾','✿','●','★','▥'];
const aprons=['sun','moon','flower','plain','star','striped'];
const opening = [
    'The music stops at Amara’s birthday party. Everyone gathers for the candles—but the cake stand is empty.',
    'Dani’s latest photo seems to show a cake still in place. Nobody saw one carried through the kitchen door. So how did it disappear?',
    'Six helpers were preparing the surprise. One has hidden the real cake as a prank and is keeping quiet. A folded note lies beside the empty stand. Someone wants you to play along.'
];
function picture(kind,options={}){
    const n=document.createElementNS('http://www.w3.org/2000/svg','svg');n.setAttribute('viewBox','0 0 300 180');n.setAttribute('role','img');
    let body='',label='';
    if(kind==='scene'){
        label='Birthday party room: bunting, balloons, an empty cake stand and a folded note; kitchen door on the left, garden on the right.';
        body='<path d="M14 15q136 50 272 0" fill="none" stroke="#9d9c82" stroke-width="2"/><path d="M40 23l9 21 13-16m27 7l10 21 12-18m28 3l10 21 11-21m28-3l12 20 10-23m25-9l13 18 8-23" fill="#c77c77"/><rect x="12" y="65" width="44" height="95" rx="5" fill="#f3dfba" stroke="#ad9b7c"/><circle cx="47" cy="112" r="3" fill="#967f57"/><rect x="242" y="70" width="45" height="73" rx="5" fill="#d6e7d0"/><path d="M248 131l11-28 9 19 12-35" fill="none" stroke="#8da882" stroke-width="4"/><path d="M60 146h180v20H60z" fill="#e7b4a4"/><path d="M65 166v9m170-9v9" stroke="#a3825d" stroke-width="5"/><ellipse cx="150" cy="140" rx="40" ry="6" fill="#a7b6b6"/><path d="M145 141v10h10v-10" fill="#a7b6b6"/><path d="M127 129v-32h46v32" fill="none" stroke="#b0a58b" stroke-width="2" stroke-dasharray="4 4"/><text x="150" y="120" text-anchor="middle" font-size="26" fill="#8a7b62">?</text><path d="M201 135h19l-4 10h-19z" fill="#fffaf0" stroke="#a9987a"/><path d="M200 136l7 5 11-5" fill="none" stroke="#a9987a"/><ellipse cx="219" cy="66" rx="12" ry="17" fill="#d7b363"/><ellipse cx="202" cy="59" rx="12" ry="17" fill="#9bb8c4"/><path d="M219 83l-3 39m-14-46l14 46" stroke="#ae9d85" fill="none"/>';
    }else if(kind==='cake'){
        const gold=options.gold;label=gold?'Later photo: cake-shaped display with a gold ribbon, three red decorations and a silver stand.':'Before photo: real cake with a blue ribbon, three red decorations and a silver stand.';
        body=`<path d="M45 140h210v12H45z" fill="#8caaab"/><path d="M141 138v25h18v-25" fill="#bcc9ca"/><rect x="68" y="70" width="164" height="68" rx="10" fill="#f4d8b3"/><path d="M68 84q12 20 24 0t24 0t24 0t24 0t24 0t24 0v-14H68z" fill="#fff9eb"/><rect x="68" y="113" width="164" height="13" fill="${gold?'#b78318':'#3264b7'}"/><path d="M140 109l-15-6v26l15-6 15 6v-26z" fill="${gold?'#b78318':'#3264b7'}"/><g fill="#bd4450"><circle cx="105" cy="65" r="9"/><circle cx="150" cy="65" r="9"/><circle cx="195" cy="65" r="9"/></g><g stroke="#47754f" stroke-width="3"><path d="M105 57l5-10m40 10l5-10m40 10l5-10"/></g>`;
    }else if(kind==='table'){
        label=options.solved?'Under the table: two wheel tracks and an apron patch.':'Party table with four legs and a long, skirt-like tablecloth.';
        body=`<rect x="30" y="53" width="240" height="13" rx="5" fill="#997452"/><path d="M45 65v96m210-96v96M85 65v90m130-90v90" stroke="#997452" stroke-width="9"/><path d="M33 66h234v${options.solved?'30':'81'}q-16 15-32 0t-32 0t-32 0t-32 0t-32 0t-32 0t-12 0z" fill="#e9b9aa"/>${options.solved?'<path d="M87 141h120m-120 13h120" stroke="#6f7d82" stroke-width="5" stroke-dasharray="5 6"/><rect x="135" y="104" width="36" height="27" rx="5" fill="#f2e6d0"/><text x="153" y="125" text-anchor="middle" font-size="24" fill="#66563b">'+(marks.includes(options.mark)?options.mark:'')+'</text>':''}`;
    }else{
        const e=options.experiment,down=e.cloth==='down',trolley=e.transport==='trolley';label=`Experiment: ${e.prop==='foam'?'foam display':'real cake'} stays on table; ${trolley?'trolley':'hand-carried tray'} moves the other cake; cloth ${down?'lowered':'raised'}.`;
        body=`<rect x="22" y="63" width="165" height="10" rx="4" fill="#997452"/><path d="M35 72v87m140-87v87" stroke="#997452" stroke-width="7"/><rect x="80" y="35" width="50" height="27" rx="5" fill="${e.prop==='foam'?'#ddbb63':'#8bb6df'}"/><rect x="209" y="${trolley?'119':'56'}" width="46" height="28" rx="5" fill="${e.prop==='foam'?'#8bb6df':'#ddbb63'}"/>${trolley?'<path d="M198 150h68v-47" fill="none" stroke="#647682" stroke-width="6"/><circle cx="209" cy="160" r="7" fill="#405966"/><circle cx="253" cy="160" r="7" fill="#405966"/>':'<path d="M200 87h70m-25 0v49" stroke="#647682" stroke-width="7"/>'}<path d="M24 73h161v${down?'73':'20'}q-15 10-30 0t-30 0t-30 0t-30 0t-41 0z" fill="#e9b9aa"/><path d="M191 172h79" stroke="#517961" stroke-width="3"/>`;
    }
    n.setAttribute('aria-label',label);n.innerHTML=body;return n;
}
export function createBetaSurface(root,callbacks){
    let current,signature='',review=null,reveal=false,feedback='',phaseKey='',matchKey='',pending=null;
    function send(action){
        const shared=action.type.startsWith('beta-');
        if(shared&&pending)return;
        const token=shared?{match:current.game.matchId,turn:current.game.turn.id,revision:current.game.party.beta.revision}:null;
        if(shared){pending=token;signature='';render(current);}
        // Keep controls locked until the subscription has rendered the committed revision.
        // A transaction acknowledgement can arrive before that subscription update.
        void Promise.resolve(callbacks.send(action)).then(result=>{
            if(token&&pending===token&&(result===false||current.local)){pending=null;feedback='The scene changed before that choice was saved. Please try again.';signature='';render(current);}
        }).catch(()=>{if(pending===token)pending=null;feedback='That choice could not be saved. Please try again.';signature='';if(current)render(current);});
    }
    root.addEventListener('click',event=>{
        const target=event.target.closest('[data-beta-action]');if(!target||target.disabled||!current)return;
        const type=target.dataset.betaAction;
        if(type==='exit'){callbacks.exit();return;}if(type==='rejoin'){callbacks.rejoin();return;}
        if(type==='summary'){callbacks.summary(current.game);return;}
        if(type==='share'||type==='invite'){target.disabled=true;void callbacks[type](current.game).then(text=>{feedback=text||'';signature='';render(current)}).catch(()=>{feedback='Please try that action again.';signature='';render(current)});return;}
        if(type==='confirm'){const b=current.game.party.beta;review={...b.theory,revision:b.revision};signature='';render(current);return;}
        if(type==='edit'){review=null;signature='';render(current);return;}
        if(type==='request-reveal'||type==='cancel-reveal'){reveal=type==='request-reveal';signature='';render(current);return;}
        send({type:type==='replay'||type==='shuffle'?'rematch':type, revision:current.game.party?.beta?.revision,
            ...(type==='replay'||type==='shuffle'?{caseId:'cake',scenarioMode:type==='replay'?'same':'new'}:{}),
            ...(target.dataset.index!==undefined?{index:Number(target.dataset.index)}:{}),
            ...(target.dataset.answer?{answer:target.dataset.answer}:{}),...(target.dataset.playerId?{playerId:target.dataset.playerId}:{}),
            ...(type==='beta-accuse'?{theory:review}:{})});
    });
    root.addEventListener('change',event=>{const field=event.target.dataset.betaField;if(!field)return;send({type:field==='suspect'||field==='destination'?'beta-theory':'beta-experiment',field,value:event.target.value,index:Number(event.target.value),revision:current.game.party.beta.revision});});
    function people(parent,story){
        const section=h('details','beta-people');section.open=true;section.appendChild(h('summary','','Meet the party guests'));
        const list=h('div','beta-suspects');story.people.forEach((p,i)=>{const card=h('div','beta-suspect');card.appendChild(h('span','beta-apron',marks[i]));card.appendChild(h('strong','',p.name));card.appendChild(h('small','',p.role));card.appendChild(h('small','',`${aprons[i]} apron`));list.appendChild(card)});section.appendChild(list);parent.appendChild(section);
    }
    function briefing(parent,story,full=true){
        const scene=h('section','beta-briefing');
        if(full){scene.appendChild(h('span','party-eyebrow','The birthday bash · Moments before the candles'));scene.appendChild(h('h3','','The cake that couldn’t have vanished'));scene.appendChild(picture('scene'));}
        opening.forEach(text=>note(scene,text));
        const mission=h('div','beta-mission');mission.appendChild(h('strong','','Your mission'));note(mission,'Find who took the cake, uncover the trick, and recover it before the party resumes.');scene.appendChild(mission);parent.appendChild(scene);
        if(full){people(parent,story);note(parent,'Play word rounds to earn search points. Spend 2 points to follow a lead or ask for a hint. Investigate together; only the speaker sees the word card.','beta-how');}
    }
    function select(parent,label,field,choices,value,disabled){const wrap=h('div','form-field');const caption=h('label','',label);caption.htmlFor='beta-'+field;const input=h('select');input.id=caption.htmlFor;input.dataset.betaField=field;input.disabled=disabled;for(const[v,text]of choices){const option=h('option','',text);option.value=String(v);input.appendChild(option)}input.value=String(value);wrap.append(caption,input);parent.appendChild(wrap);}
    function board(parent,state){
        const {game,view,busy,local}=state,b=game.party.beta,story=caseStory(game),locked=busy||!view.canExplore;
        const recap=h('details','beta-recap');recap.appendChild(h('summary','','What happened? Read the case briefing'));briefing(recap,story,false);parent.appendChild(recap);
        const nav=h('div','beta-steps');BETA_PUZZLES.forEach((p,i)=>nav.appendChild(h('span',b.solved[i]?'is-solved':'',`${b.solved[i]?'✓':i+1} ${b.opened[i]||b.solved[i]||i===0?p.title:'Undiscovered lead'}`)));parent.appendChild(nav);
        const index=[0,1,2].find(i=>!b.solved[i]);
        if(index!==undefined){const p=BETA_PUZZLES[index],card=h('section','beta-puzzle');card.appendChild(h('h3','',`${p.icon} ${p.title}`));
            if(!b.opened[index]){note(card,index===0?'Someone left this note beside the empty stand. Earn your first search points to open it.':index===1?'The tracks suggest something moved. Dani took photos during the party—what did the camera see?':'The later photo shows a display. Can you explain how the real cake left without being seen?');card.appendChild(button(`Investigate · ${p.cost} points`,'beta-buy',locked||b.points<p.cost,{index}));if(b.points<p.cost)note(card,`Earn ${p.cost-b.points} more search point${p.cost-b.points===1?'':'s'} in a word round.`);}
            else{
                if(index===0){card.appendChild(picture('scene'));note(card,'Inside the folded note:');note(card,'“Four legs. A skirt. Something hidden underneath.”','beta-riddle');note(card,'Where would you look?');const choices=h('div','beta-choices');for(const[id,text]of [['table','🪑 Under the table'],['door','🚪 Behind the door'],['garden','🌿 In the garden'],['camera','📷 Inside the camera']])choices.appendChild(button(text,'beta-answer',locked,{index,answer:id}));card.appendChild(choices);}
                if(index===1){const pair=h('div','beta-photos');for(const[gold,label]of [[false,'Before the disappearance'],[true,'Later: a cake is still there']]){const panel=h('figure');panel.appendChild(picture('cake',{gold}));panel.appendChild(h('figcaption','',label));pair.appendChild(panel)}card.appendChild(pair);note(card,'What changed? The real cake has a blue ribbon. The foam display has a gold ribbon.');const choices=h('div','beta-choices');for(const[id,label]of [['ribbon','The ribbon'],['candles','The red decorations'],['stand','The stand']])choices.appendChild(button(label,'beta-answer',locked,{index,answer:id}));card.appendChild(choices);}
                if(index===2){note(card,'Make the real cake disappear, leave a cake for the later photo, and keep the escape hidden. Nobody saw a cake carried through the kitchen door.');card.appendChild(picture('experiment',{experiment:b.experiment}));select(card,'What stays on the table?','prop',[['real','Real cake · blue ribbon'],['foam','Foam display · gold ribbon']],b.experiment.prop,locked);select(card,'How does the other cake move?','transport',[['hand','Carried through the door'],['trolley','Trolley under the table']],b.experiment.transport,locked);select(card,'The tablecloth','cloth',[['up','Raised · trolley visible'],['down','Lowered · trolley hidden']],b.experiment.cloth,locked);card.appendChild(button('Try the escape','beta-test',locked));}
                const hints=b.hints[index]||0;for(let j=0;j<hints;j++)note(card,p.hints[j],'beta-hint');if(hints<p.hints.length)card.appendChild(button('Need a nudge? · 2 points','beta-hint',locked||b.points<2,{index}));
            }parent.appendChild(card);
        }else note(parent,'All three discoveries fit. Use the patch and the final trail to name the prankster and find the cake.','case-solution');
        const clues=h('div','beta-discoveries');
        if(b.solved[0]){const c=h('article','beta-clue');c.appendChild(picture('table',{solved:true,mark:marks[story.solution.suspect]}));c.appendChild(h('h4','','Under the table'));note(c,`Two wheel tracks. A torn patch: ${marks[story.solution.suspect]} — ${aprons[story.solution.suspect]} pattern.`);clues.appendChild(c);}
        if(b.solved[1]){const c=h('article','beta-clue');c.appendChild(h('h4','','The cake was switched'));note(c,'Blue ribbon = real cake. Gold ribbon = foam display. The later photo shows the display.');clues.appendChild(c);}
        if(b.solved[2]){const c=h('article','beta-clue beta-trail');c.appendChild(h('h4','','Follow the icing trail'));const places=['🌳 Picnic chest','🍽 Kitchen cupboard','🎈 Balloon tent'];places.forEach((place,i)=>c.appendChild(h('div',i===story.solution.destination?'is-traced':'',`${i===story.solution.destination?'🛒 · · · 🧁 → ':'○ '}${place}`)));note(c,'Fresh icing and a blue ribbon were found at the marked stop.');clues.appendChild(c);}
        parent.appendChild(clues);people(parent,story);
        if((view.host||local)&&game.phase!=='accusing'&&game.party.history.length&&(index===undefined||game.party.history.length>=game.settings.caseTurns))parent.appendChild(button('Make the final accusation','beta-review',busy));
    }
    function render(state){
        current=state;const {game,view,local,now,busy:remoteBusy,gateName,gateId}=state,b=game.party?.beta;
        if(pending&&(!state.connected||game.matchId!==pending.match||game.turn.id!==pending.turn||b?.revision>pending.revision))pending=null;
        const busy=remoteBusy||Boolean(pending);
        if(matchKey!==String(game.matchId)){matchKey=String(game.matchId);review=null;reveal=false;feedback='';}
        if(review&&(!b||review.revision!==b.revision||game.phase!=='accusing'))review=null;
        const clock=root.querySelector('#partyClock');if(clock)clock.textContent=view.countdownRemainingMs?countdownLabel(view.countdownRemainingMs):String(view.remainingSeconds);
        const {countdownRemainingMs,remainingSeconds,...stableView}=view;
        const next=JSON.stringify([game.matchId,game.phase,game.party,game.turn,Boolean(countdownRemainingMs),stableView,state.connected,busy,gateName,review,reveal,feedback]);if(next===signature)return;signature=next;
        const focus=document.activeElement?.id,key=`${game.matchId}:${game.phase}:${game.turn?.id}:${gateName}:${Boolean(view.countdownRemainingMs)}`,changed=phaseKey!==key;phaseKey=key;
        root.replaceChildren();root.className='party-game party-case cake-beta';
        const header=h('header','party-heading');header.appendChild(h('span','party-eyebrow','A playable prototype · Case Files'));header.appendChild(h('h2','','The Great Cake Escape'));header.appendChild(h('span','beta-badge','BETA · Visual mystery'));if(!local)note(header,`Lobby ${state.code} · Discuss on your usual voice call`,'party-progress');if(b)note(header,`${game.party.history.length}/${game.settings.caseTurns} word rounds · ${b.points} search points · ${Object.keys(b.solved).length}/3 discoveries`,'party-progress');root.appendChild(header);
        const body=h('section','party-stage');root.appendChild(body);const active=state.connected&&(view.active||local),host=view.host||local;
        if(feedback)note(body,feedback,'party-feedback');
        if(!active){note(body,state.connected?'Rejoin to restore your seat.':'Connection lost. Reconnecting…');body.appendChild(button('Rejoin lobby','rejoin',busy));}
        else if(!game.isGameStarted){body.appendChild(picture('scene'));body.appendChild(h('h3','','A birthday surprise has gone wrong'));note(body,'The guests are ready for the candles. The cake has vanished. Gather your crew to uncover what happened.');note(body,'2–12 players · One shared mystery');if(host)body.appendChild(button('Open the case','start-game',busy||!view.canStartGame));else note(body,'The host opens the case when everyone is ready.');}
        else if(game.phase==='briefing'){briefing(body,caseStory(game));if(host)body.appendChild(button('Begin investigation','beta-begin',busy));else note(body,'Read the scene together. The host begins the investigation when the crew is ready.');}
        else if(gateName&&game.phase!=='finished'){body.appendChild(h('h3','',`Pass the device to ${gateName}`));note(body,'Only the speaker sees the word card. Everyone guesses aloud.');body.appendChild(button(`I’m ${gateName}`,'local-ready',false,{playerId:gateId}));}
        else if(game.phase==='describing'){body.appendChild(h('h3','',view.countdownRemainingMs?'Get ready…':view.speaker?'Describe these words':'Guess aloud'));body.appendChild(h('strong','party-clock',view.countdownRemainingMs?countdownLabel(view.countdownRemainingMs):String(view.remainingSeconds))).id='partyClock';note(body,view.countdownRemainingMs?'Words stay hidden until Go.':'Every correct word earns one search point for the crew.');if(view.showWords){const list=h('ol','table-word-card');game.turn.words.forEach(word=>list.appendChild(h('li','party-word',word)));body.appendChild(list)}if(view.canEndRound)body.appendChild(button('End round','end-round',busy));}
        else if(game.phase==='selecting'){body.appendChild(h('h3','','Which words were guessed?'));note(body,'Each correct word earns 1 shared search point. Your saved points carry over.');game.turn.words.forEach((word,i)=>{const n=button(`${game.turn.selectedIndexes.includes(i)?'✓ ':''}${word}`,'toggle-answer',busy||!view.canSelect,{index:i});n.className='party-answer'+(game.turn.selectedIndexes.includes(i)?' is-selected':'');n.setAttribute('aria-pressed',String(game.turn.selectedIndexes.includes(i)));body.appendChild(n)});if(view.canSelect)body.appendChild(button('Bank search points','submit-round',busy));else note(body,'The speaker confirms the correct words.');}
        else if(game.phase==='finished'){
            const solved=game.finishReason==='solved',shown=solved||game.party.revealed,story=caseStory(game);body.appendChild(h('h3','',solved?'Cake found. Case solved!':game.party.revealed?'The solution is revealed':'The cake got away this time'));
            if(shown){note(body,`${story.people[story.solution.suspect].name} moved the real cake on the covered trolley and hid it in ${story.destinations[story.solution.destination].replace(/^The /,'the ')}.`,'case-solution');note(body,'The apron patch identifies the prankster. The gold ribbon proves the later photo shows the foam display. The icing trail leads to the real cake.');}
            else{note(body,'The answer stays hidden. Replay this scenario, or reveal what happened.');if(b.assessment?.suspect)note(body,`✓ You correctly identified ${story.people[b.theory.suspect].name}.`);if(b.assessment?.destination)note(body,`✓ You correctly chose ${story.destinations[b.theory.destination]}.`);if(!b.assessment?.discoveries)note(body,'Find all three discoveries to close the case.');}
            if(host){body.appendChild(button('Replay same scenario','replay',busy));body.appendChild(button('Try a different scenario','shuffle',busy));if(!shown){if(reveal){note(body,'Reveal this scenario’s prankster and hiding place?');body.appendChild(button('Reveal solution','reveal-case',busy));body.appendChild(button('Keep it hidden','cancel-reveal'));}else body.appendChild(button('Reveal what happened…','request-reveal'));}}
            body.appendChild(button('Share result card','share'));body.appendChild(button('Download summary','summary'));
        }else{
            if(b.feedback){const n=h('p','beta-feedback',b.feedback);n.setAttribute('role','status');body.appendChild(n);}
            if(['idle','waiting'].includes(game.phase)){const speaker=game.party.players.find(p=>p.id===game.turn.speakerId);body.appendChild(h('h3','',view.speaker?'Your word round':`${speaker?.name} is the speaker`));note(body,`Up to ${game.settings.numWords} words · ${game.settings.numSeconds} seconds · Correct words = search points`);if(view.speaker)body.appendChild(button('Start word round','start-round',busy||!view.canStartRound));else note(body,'The speaker starts the word round when the crew is ready.');if(game.phase==='waiting')note(body,'Waiting for the speaker and at least two connected players.');}
            if(game.phase==='evidence'&&game.party.history.length<game.settings.caseTurns){note(body,'Investigate below, or save your points and play another word round.');if(view.reviewer)body.appendChild(button('Next word round','continue-case',busy));}
            if(game.party.history.length>=game.settings.caseTurns)note(body,'Word rounds are finished. Spend your remaining points, then make your final accusation.');
            board(body,{...state,busy});
            if(game.phase==='accusing'){
                const panel=h('section','beta-final');panel.appendChild(h('h3','','Who moved the cake—and where?'));if(host){if(review){note(panel,`${caseStory(game).people[review.suspect].name} · ${caseStory(game).destinations[review.destination]}`);note(panel,'One final accusation. All three discoveries must be solved to close the case.');panel.appendChild(button('Submit accusation','beta-accuse',busy));panel.appendChild(button('Change my answer','edit',busy));}
                    else{const story=caseStory(game);select(panel,'The prankster','suspect',[[-1,'Choose a guest…'],...story.people.map((p,i)=>[i,`${p.name} · ${aprons[i]} apron`])],b.theory.suspect,busy);select(panel,'The hiding place','destination',[[-1,'Choose a place…'],...story.destinations.map((p,i)=>[i,p])],b.theory.destination,busy);panel.appendChild(button('Review accusation','confirm',busy||b.theory.suspect<0||b.theory.destination<0));}panel.appendChild(button('Back to the discoveries','beta-back',busy));}else note(panel,'Discuss together. The host records and confirms the crew’s answer.');body.appendChild(panel);
            }
        }
        const footer=h('div','party-footer');footer.appendChild(button(local?'New game':'Leave lobby','exit'));if(host&&game.isGameStarted&&game.phase!=='finished')footer.appendChild(button('End investigation','request-end',busy));if(!local&&active&&!['describing','selecting'].includes(game.phase))footer.appendChild(button('Invite friends','invite',busy));root.appendChild(footer);
        if(focus?.startsWith('beta-'))root.querySelector('#'+focus)?.focus({preventScroll:true});
        if(changed){const title=body.querySelector('h3');const announcement=document.getElementById('partyAnnouncement');if(announcement)announcement.textContent=title?.textContent||'Cake Escape Beta';if(title){title.tabIndex=-1;title.focus({preventScroll:true})}}
    }
    return {render,reset(){current=null;signature='';review=null;reveal=false;feedback='';phaseKey='';matchKey='';pending=null;}};
}
