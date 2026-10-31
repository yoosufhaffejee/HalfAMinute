// Authored beta puzzles and casts. Original Case Files content stays independent.
export const CASE_RIDDLE_LIMITS = { easy: 2, medium: 3, hard: 3 };
export const BETA_PUZZLES = [
    { title:'The folded note',kind:'riddle',cost:2,icon:'✉',
        lines:['I brought everyone’s dinner, but never took a bite.','I crossed the room without taking a step.','Where others left footprints, I left two continuous lines.'],
        answers:['trolley','cart','serving cart','serving trolley','food trolley','food cart','tea trolley','catering trolley','kitchen trolley','tea cart','trolly','serving trolly'],
        choices:[['tray','A serving tray'],['trolley','A serving trolley'],['waiter','A waiter'],['wheelbarrow','A wheelbarrow']],
        hints:['Think about how something moves, rather than who carried it.','The two lines come from wheels. Look for a carrier used for serving food.'] },
    { title:'Dani’s photographs',kind:'deduction',cost:2,icon:'📷',
        hints:['Use the tray reference to interpret the photos. The decoration alone is not proof.','Compare the thin trays: which one is bending under a load?'] },
    { title:'The second note',kind:'riddle',cost:2,icon:'✉',
        lines:['I stand still while everyone inside me moves.','Raise your right hand; my guest raises their left.','I need no power, and you cannot look through me.','I saw the cake leave—but only backwards.'],
        answers:['mirror','looking glass','wall mirror','reflection','a reflection','mirrored glass'],
        choices:[['window','A window'],['television','A television'],['mirror','A mirror'],['portrait','A portrait']],
        hints:['The “guest” is a copy of the person looking in.','A mirror gives a reversed view. The room guide can help you read the photograph.'] }
];
export function riddleKey(value){return String(value).normalize('NFKD').toLowerCase().trim().replace(/^(?:it is|it’s|it's)\s+/,'').replace(/^(?:a|an|the)\s+/,'').replace(/[^a-z0-9]/g,'');}
export function acceptsRiddle(index,value){return BETA_PUZZLES[index]?.answers?.some(answer=>riddleKey(answer)===riddleKey(value))||false;}
const guests={
    Amara:{name:'Amara',role:'Birthday host',profile:'Makes sure everyone has eaten. Her blue blouse and silver watch are still spotless.',sleeve:'blue',wrist:'watch'},
    Ben:{name:'Ben',role:'Balloon artist',profile:'Always has a joke ready. Wears a blue overshirt; a woven bracelet peeks out when he ties balloons.',sleeve:'blue',wrist:'braid'},
    Cleo:{name:'Cleo',role:'Cake decorator',profile:'Quiet until someone mentions baking. Green cardigan, rolled sleeves, and a woven bracelet she made herself.',sleeve:'green',wrist:'braid'},
    Dani:{name:'Dani',role:'Party photographer',profile:'Keeps pulling people into photos. An ochre shirt brightens her outfit; a plain metal bangle taps against the camera.',sleeve:'ochre',wrist:'bangle'},
    Evie:{name:'Evie',role:'Snack helper',profile:'Quick to lend a hand, especially near the snacks. Blue jacket, dark jeans, and a plain metal bangle.',sleeve:'blue',wrist:'bangle'},
    Finn:{name:'Finn',role:'Games leader',profile:'Turns everything into a competition. His green hoodie sleeves are pushed up above a metal bangle.',sleeve:'green',wrist:'bangle'}
};
const scenarios={
    original:{names:['Amara','Ben','Cleo','Dani','Evie'],culprit:'Evie',destination:0,realPhoto:'a'},
    'alternate-a':{names:['Amara','Ben','Cleo','Evie'],culprit:'Ben',destination:2,realPhoto:'b'},
    'alternate-b':{names:['Ben','Cleo','Dani','Evie','Finn'],culprit:'Cleo',destination:1,realPhoto:'a'}
};
export const WRIST_LABELS={watch:'a round-faced watch',braid:'a woven bracelet',bangle:'a plain metal bangle'};
export function betaStory(game){
    const scenario=scenarios[game.party?.scenarioId||'original'];if(!scenario)throw Error('Unknown beta scenario');
    const people=scenario.names.map(name=>guests[name]);
    return {title:'The Great Cake Escape',difficulty:'easy',people,realPhoto:scenario.realPhoto,
        destinations:['The picnic chest','The kitchen cupboard','The balloon tent'],
        solution:{suspect:people.findIndex(p=>p.name===scenario.culprit),destination:scenario.destination},
        sleeve:guests[scenario.culprit].sleeve,wrist:guests[scenario.culprit].wrist};
}
