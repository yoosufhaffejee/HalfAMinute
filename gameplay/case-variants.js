// Authored scenario recipes. Keep edits to evidence, hints and debrief together.
// The original is stored in case-content.js / case-party-content.js.
export const SCENARIO_IDS = ['original','alternate-a','alternate-b'];
const fact=(c,id)=>c.leads.flatMap(l=>l.facts).find(f=>f.id===id);
function rows(c,id,records){fact(c,id).records=records;}
function replace(value,pairs){
    if(typeof value==='string')return pairs.reduce((text,[from,to])=>text.split(from).join(to),value);
    if(Array.isArray(value))return value.map(item=>replace(item,pairs));
    if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,replace(item,pairs)]));
    return value;
}
function prose(c,pairs){ // Never rename people or reorder answer choices.
    for(const key of ['intro','groundRules','scene','leads','hints','reveal','chronology','connection'])c[key]=replace(c[key],pairs);
}
function timeline(c,changes){
    for(const [id,minute,label]of changes){const event=c.chronology.events.find(e=>e.id===id);event.minute=minute;if(label)event.label=label;}
    c.chronology.order=[...c.chronology.events].sort((a,b)=>a.minute-b.minute).map(e=>e.id);
    const time=n=>`${String(Math.floor(n/60)%24).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
    c.chronology.explanation=c.chronology.order.map(id=>{const e=c.chronology.events.find(e=>e.id===id);return `${time(e.minute)} · ${e.label}`;}).join('. ')+'. Times are expressed on the reference clock.';
}
function storage(c,ids,target,marker,time,action='opened'){
    const descriptions=[[[time,`${target} ${action}; ${marker} visible at the opening`],['Container',target]],
        [['Storage location',target],['Capacity','Room for the item described in the reference exhibit']],
        [['Inside container',marker],['Inspection','Container and item photographed together']],
        [['Second observation',`${marker} inside ${target}`],['After delivery','Carrier leaves with empty hands']]];
    ids.forEach((id,i)=>{const f=fact(c,id);f.title=['Storage photograph','Storage guide','Container inspection','Second delivery view'][i];f.source='Scene records · independent observations';f.text='These records describe the final storage location. Compare the item’s visible features with the reference exhibits and follow its movement through the scene.';f.records=descriptions[i];});
}
export function buildCaseVariant(base,id,variant){
    const c=structuredClone(base);if(variant==='original')return c;
    if(!SCENARIO_IDS.includes(variant))throw new Error('Unknown case scenario');
    const b=variant==='alternate-b';
    if(id==='cake'){
        const who=b?2:1,name=c.people[who].name,apron=b?'Flower':'Moon',target=b?'The kitchen cupboard':'The balloon tent';
        prose(c,[['Evie',name],['Star apron',`${apron} apron`],['star apron',`${apron.toLowerCase()} apron`],['Large star',`Large ${apron.toLowerCase()}`]]);
        c.solution={suspect:who,method:1,destination:b?1:2};
        c.leads[2].name='Serving trail';c.leads[2].question='Where did the covered trolley stop?';
        rows(c,'t2',[['15:02',`Covered trolley rolls from under table towards ${b?'kitchen':'balloon tent'}`],['Person pushing',`${apron} apron; both hands on handle`]]);
        rows(c,'k3',[['Kitchen doorway','No one carries an uncovered cake through the doorway'],['Other movement','A covered trolley passes; its contents cannot be seen']]);
        storage(c,['g1','g2','g3','g4'],target,'whole cake on silver tray, blue ribbon and three cherries','15:08');
        c.scene=['Party table · long cloth','Kitchen · serving trolley','Photo corner · foam prop',target];
        if(b)prose(c,[['15:05','15:01']]);
        timeline(c,[['photo',b?901:905],['open',908,`${target} opened`]]);
        c.hints=['Identify the photographed centrepiece using its ribbon and base.','A covered trolley can move the whole cake without anyone carrying it. Compare the visible apron with the profiles.',`Follow the ${apron.toLowerCase()} apron and the blue-ribbon tray; the storage records describe its final container.`];
        c.reveal=[`${name} wears the ${apron.toLowerCase()} apron shown pushing the covered trolley. The second view records the same apron.`,`The silver tray travels whole on the trolley beneath the long tablecloth. The gold-ribbon centrepiece is the foam display.`,`${target} receives the blue-ribbon, three-cherry cake. Both the delivery photograph and container inspection corroborate that location.`];
    }else if(id==='duck'){
        const who=b?4:0,name=c.people[who].name,cap=b?'White':'Red',target=b?'The garden shed':'The snack cupboard';
        prose(c,[['Pippa',name],['Purple-capped',`${cap}-capped`],['purple-capped',`${cap.toLowerCase()}-capped`],['Purple cap',`${cap} cap`],['purple cap',`${cap.toLowerCase()} cap`]]);
        c.solution={suspect:who,method:1,destination:b?2:0};
        storage(c,['b1','b2','b3','b4'],target,'folded yellow plastic with Captain Quack’s purple heart patch','14:08','closed');
        c.scene[3]='Service passage · storage';
        if(b)prose(c,[['14:03','13:58']]);
        timeline(c,[['pump',b?838:843],['basket',848,`${target} closed`]]);
        c.hints=['Compare the patch and material, not just the yellow colour.','Check what the pump’s AIR OUT socket does. The hatch can fit the duck in a different shape.',`Compare the ${cap.toLowerCase()} cap with the profiles and follow the patched bundle into storage.`];
        c.reveal=[`${name} wears the ${cap.toLowerCase()} cap recorded at the hatch. The patch identifies the bundle as Captain Quack.`,`AIR OUT removes air. The folded duck can pass through the laundry hatch while the gate remains locked.`,`${target} contains the patched yellow bundle. Two independent storage observations identify both container and contents.`];
    }else if(id==='ghost'){
        const who=b?4:3,name=c.people[who].name,badge=b?'Heart':'Lightning',target=b?'The ticket drawer':'The popcorn sack';
        prose(c,[['Beau',name],['Moon badge',`${badge} badge`],['moon badge',`${badge.toLowerCase()} badge`]]);
        c.solution={suspect:who,method:1,destination:b?0:1};
        const f=fact(c,'p2');f.title='Prize delivery photograph';f.source='Fair camera · 18:34';f.text='The camera records the prize entering its final hiding place. Compare the lid markings with the prize reference and the container with the storage guide.';
        rows(c,'p2',[['18:34',`Golden red-star tin placed in ${target}; container then closed`],['At opening','Round tin and red star visible together']]);
        rows(c,'p3',[['Container',target],['Size','Large enough to conceal the round prize tin']]);
        rows(c,'p4',[['Inside container',`Golden red-star tin inside ${target}`],['Other storage','Other prize containers checked empty']]);
        fact(c,'p3').title='Prize storage guide';fact(c,'p4').title='Prize container inspection';
        fact(c,'p4').text='An independent photograph records the prize inside its container. The star and round lid match the prize reference rather than the plain serving tubs.';
        timeline(c,[['lid',1114,`${target} closed`]]);
        if(!b){prose(c,[['18:35','18:38']]);timeline(c,[['dark',1118]]);}
        c.hints=['Separate the visible outline from the rattling sound.','Compare the small prop’s position with the shadow demonstration; then identify its holder’s badge.',`The ${badge.toLowerCase()} badge appears at the prop and prize table. Trace the red-star tin through the storage records.`];
        c.reveal=[`${name} wears the ${badge.toLowerCase()} badge photographed holding the paper ghost and moving the prize.`,`The paper shape close to the lamp projects a large outline. The wind-up box makes the separate rattling sound.`,`${target} contains the red-star prize tin; the delivery and inspection records agree.`];
    }else if(id==='bank'){
        const who=b?4:3,name=c.people[who].name,pass=b?'B5':'B4',route=b?'Q5':'Q2',ledger=b?'44':'17';
        c.solution={suspect:who,method:1,destination:b?1:0};
        c.groundRules+=' Any registered pass can be used at the kiosk with a valid account credential; a job title is not a separate permission.';
        c.people[who].profile+=b?' Delivers replacement credentials and keeps her registered visitor pass.':'Inspects approval exports using his own registered visitor pass.';
        rows(c,'a2',[['23:35–00:01','B4 remains with Jon; B5 remains with Sana'],['Other loans','B1: Nandi to Mira, 23:45–23:56'],['Return','B1 returned before midnight']]);
        for(const key of ['a3','a4']){const f=fact(c,key);Object.assign(f,replace(f,[['pass B1',`pass ${pass}`],['B1 ·',`${pass} ·`],['23:54',b?'23:57':'00:00'],['23:55',b?'23:58':'00:01']]));}
        rows(c,'a4',[[`Job 318 · ${b?'23:57':'00:00'}`,`EXPORT ELI.remote / R8 / pass ${pass}`],['Carbon status','Matches the completed kiosk receipt']]);
        rows(c,'m1',[['Amount','R48,000'],['Display name','CEDAR CARE'],['Verified routing key',route]]);
        rows(c,'m4',[['TX-61 · 00:10',`Received on ${route} / ledger ${ledger}`],['Sender label','CEDAR CARE · unverified free text']]);
        rows(c,'n3',[['00:02 · TX-61','Approval accepted; settlement pending'],['00:10 · TX-61',`Funds released; routing key ${route}`]]);
        timeline(c,[['export',b?1437:1440]]);
        c.connection.explanation=`The camera is six minutes fast, so its 00:04 portrait is bank 23:58. Compare that with the export receipt or carbon copy: ${b?'23:57, just before the portrait':'00:00, after the portrait'}.`;
        c.hints=['Use the physical pass field rather than the account username. The access record states who retained each pass.','Convert the camera timestamp into bank time before ordering the photograph and export.',`Trace routing key ${route} through the receiving-bank index and ledger classification.`];
        c.reveal=[`${name} retained ${pass}; the kiosk and carbon records identify that pass at the export. The account name still identifies Eli’s credential, not its operator.`,`The external CACHED session uses the exported R8 token and a human response. It is neither a branch-terminal approval nor an automatic job.`,`Routing key ${route} resolves to ledger ${ledger}: ${c.destinations[c.solution.destination]}. The display label does not determine the receiving account.`];
    }else if(id==='museum'){
        const who=b?2:0,name=c.people[who].name,code=b?'L2':'M1',zone=b?'R':'W';c.solution={suspect:who,method:2,destination:b?2:1};
        c.people[who].profile+=` Registered for transport duty with personal carrier credential ${code}.`;
        for(const key of ['x3','c1','c4'])Object.assign(fact(c,key),replace(fact(c,key),[['J4',code],['zone K',`zone ${zone}`]]));
        rows(c,'c3',[[code,`${name} · sleeve T7 · trolley 7`],['Packer','Lina · prepared replica backing'],['Other transport','Jules’s credential J4 was not scanned for T7']]);
        rows(c,'c2',[['K','Courier van lane'],['W','Sealed restoration crate in workshop store'],['R','Rooftop cache, reached by the roof lift']]);
        if(b)prose(c,[['21:05','21:03']]);
        timeline(c,[['alarm',b?1263:1265]]);
        c.hints=['Identify the pictured canvas from its border mark before using its photograph as evidence.','The wall clock is four minutes slow. The outer seal does not cover the separate cassette release.',`Follow carrier ${code}, sleeve T7 and loading zone ${zone}; their meanings are in the dispatch records.`];
        c.reveal=[`${code} is ${name}’s personal transport credential, scanned for T7 containing R12.`,`The contact sheet still shows the original at reference 21:06, after the alarm. The inner cassette can leave without breaking the outer wall seal.`,`The scanner routes T7 to zone ${zone}; the bay key identifies ${c.destinations[c.solution.destination]}.`];
    }else if(id==='train'){
        const who=b?3:0,name=c.people[who].name;c.solution={suspect:who,method:0,destination:0};
        rows(c,'p3',[['Permanent issue','P9 · Nova'],['01:50–01:59',b?'P9 remains with Nova; no loan during loading':'P9 loaned to Mara; returned to Nova'],['Other keys','P7 with Jon; P8 operates the dispatch desk, not the parcel hatch']]);
        if(b){prose(c,[['02:18','01:59']]);c.intro=c.intro.replace('arrives during a non-stop journey','reaches the guard around departure');rows(c,'r3',[['Payload','LOSS · sensor event 02:17'],['Delivered to guard','Reference 01:59'],['Queue note','Handset retried a message interrupted during loading']]);}
        timeline(c,[['alert',b?119:138]]);
        c.hints=['Convert the sensor time before deciding whether the train was moving.','A key’s registered owner and its current holder may differ; read the complete loading interval.','The pressure-mat loss is reference 01:57. Compare that with departure and trace storage tag G4-6.'];
        c.reveal=[`${name} held P9 at 01:57, the corrected parcel movement time. The hatch reader records P9.`,`The sensor is twenty minutes fast. Its 02:17 loss is reference 01:57, before departure, so this was a platform handoff.`,`B12 was resealed under G4-6, the station parcel cage. The later station inventory corroborates the same parcel there.`];
    }else if(id==='observatory'){
        const who=b?5:3,name=c.people[who].name,other=b?'Remy':'Kit',first=b?'Ash':'Remy';c.solution={suspect:who,method:2,destination:b?2:0};
        if(!b)c.intro=c.intro.replace('its untouched observation record has disappeared from the control server','its untouched observation record cannot be found in the public viewer');
        for(const index of [3,4,5])c.people[index].profile='Works on observation analysis and maintenance. The signed booking records who controls each console at a particular time.';
        rows(c,'s1',[['Console A · 22:00–22:10',first],['Console A · 22:10–22:20',name],['Console A · 22:20–22:30',other],['Console B / viewers','Iris / Nova and Felix; read-only viewers']]);
        rows(c,'s4',[['22:10',`SV8 handed from ${first} to ${name}`],['22:20',`SV8 handed from ${name} to ${other}`],['Intervening handovers','None']]);
        rows(c,'o1',[['22:10 · C32','Raw capture complete · raw-7B.fits'],['22:11 · U32','Upload display preview to public feed SUBMITTED'],['22:12 · P32',b?'Copy full raw-7B.fits to service laptop SUBMITTED':'Create laptop thumbnail SUBMITTED']]);
        rows(c,'o2',[[b?'22:14 · U32':'22:19 · U32','Display preview received; no raw file uploaded'],['Retention','Feed retains display previews only; no full exposure'],['Display image','Derivative hash 91']]);
        rows(c,'o3',[[b?'22:17':'22:20',b?'Control raw-7B.fits purged':'Control display preview purged; raw-7B.fits retained'],['Control server remaining',b?'Derivative hash 91 only':'Full raw exposure · hash 7B'],['Service laptop remaining',b?'Full raw-7B.fits · 4096 × 4096 · hash 7B':'512-pixel thumbnail only']]);
        rows(c,'o4',[[b?'22:14 · U32':'22:19 · U32','Display preview / public feed'],['22:15 · P32',b?'Full raw-7B.fits / service laptop / hash 7B':'512-pixel thumbnail / service laptop']]);
        timeline(c,[['upload',b?1334:1339,'Display upload completes'],['purge',b?1337:1340,b?'Local original purged':'Local preview purged']]);
        c.hints=['Compare the reference coordinates with the published cells using the instrument card.','Map the rewrite’s endpoint to the console booking at that time.','Separate previews from full exposures; look for completed copies and the final storage sweep.'];
        c.reveal=[`SV8 is console A, controlled by ${name} at the 22:18 rewrite.`,`The references remain fixed while new cells appear; the content audit records a rewrite without an orientation change.`,`The untouched full exposure survives on ${c.destinations[c.solution.destination].toLowerCase()}. The other destinations have only previews or a derivative, as the completion records and storage sweep show.`];
    }else if(id==='encore'){
        const who=b?5:2,name=c.people[who].name,profile=b?'MID':'SIDE',bay=b?'3':'1';c.solution={suspect:who,method:2,destination:b?2:1};
        rows(c,'h1',[['D4 · 22:30–22:45',name],['D2 · 22:30–22:45','Jules'],['Dispatch sign-off','Kit after preparation; recipient Ash'],['Other duties','Mira on stage; Theo on freight trolley']]);
        rows(c,'h2',[['22:30',`D4 handed to ${name}`],['22:45',`D4 returned by ${name}`],['Intervening handovers','None']]);
        c.people[who].profile+=' Holds an exclusive edit-console booking during preparation.';
        for(const key of ['f1','f3','f4'])Object.assign(fact(c,key),replace(fact(c,key),[['bay 2',`bay ${bay}`],['Bay 2',`Bay ${bay}`]]));
        if(b){
            rows(c,'a1',[['Left channel L','2 · 4 · −2 · −4'],['Right channel R','−2 · −4 · 2 · 4'],['22:25–22:35','Both stereo channels audible; equal and opposite samples throughout']]);fact(c,'a1').text='The stereo original has two audible channels. These representative samples have equal size and opposite signs throughout the original recording.';fact(c,'a1').visual.panels[1].samples=[-2,-4,2,4];
            for(const key of ['a2','a4'])Object.assign(fact(c,key),replace(fact(c,key),[['SIDE','MID']]));
            Object.assign(fact(c,'a4'),replace(fact(c,'a4'),[['22:39','22:36']]));
            Object.assign(fact(c,'f1'),replace(fact(c,'f1'),[['22:43','22:38'],['22:44','22:39']]));Object.assign(fact(c,'f4'),replace(fact(c,'f4'),[['22:45','22:40']]));
            timeline(c,[['export',1356],['seal',1360]]);
        }else{prose(c,[['22:42','22:47'],['22:43 · MUTE','22:48 · MUTE']]);rows(c,'a3',[['MID profile','Output = (L + R) / 2'],['SIDE profile','Output = (L − R) / 2'],['22:47 / 22:48','MUTE enabled / disabled'],['Export status at mute','Export completed before the mute']]);timeline(c,[['mute',1367]]);}
        c.hints=['Compare the actual source samples with the formula for the profile selected by the export job.','Hardware identity and file contents are separate. Check the console booking and original’s freight trail.',`Apply ${profile} to both source channels. Follow original A9 through N7 and the freight-bay key.`];
        c.reveal=[`${name} controls D4 during the 22:41 export; the booking and handover receipt agree.`,`The ${profile} formula cancels these particular stereo channels to zero. The delivery drive stays S17, and the later mute is a separate event.`,`A9 travels inside N7 to bay ${bay}, identified by the freight key as ${c.destinations[c.solution.destination].toLowerCase()}.`];
    }
    c.scenarioId=variant;
    return c;
}
