// Four distinct trait combinations: any two independent facts identify one suspect.
export const CASES = {
    trophy: { title: 'The Missing Trophy', location: 'The clubhouse', icon: '🏆', intro: 'The championship trophy vanished before the presentation. Follow the evidence to find who took it.',
        people: [ ['Mara', 'The captain', 'M'], ['Theo', 'The groundskeeper', 'T'], ['Lina', 'The photographer', 'L'], ['Jules', 'The organiser', 'J'] ],
        traits: [ ['Had a clubhouse key', 'Had no clubhouse key'], ['Wore a green jacket', 'Wore a blue jacket'], ['Arrived by bicycle', 'Arrived by car'] ] },
    blackout: { title: 'Blackout at the Observatory', location: 'The observatory', icon: '🔭', intro: 'Someone cut the power during the meteor shower. Which visitor reached the control room?',
        people: [ ['Nova', 'The astronomer', 'N'], ['Ash', 'The engineer', 'A'], ['Iris', 'The guide', 'I'], ['Felix', 'The journalist', 'F'] ],
        traits: [ ['Carried a staff badge', 'Carried a visitor pass'], ['Wore silver boots', 'Wore black boots'], ['Carried a red bag', 'Carried a yellow bag'] ] },
    blueprint: { title: 'The Vanishing Blueprint', location: 'The invention fair', icon: '⚙️', intro: 'A prize-winning blueprint disappeared from the display. Match the evidence to the people at the fair.',
        people: [ ['Ada', 'The inventor', 'A'], ['Remy', 'The judge', 'R'], ['Sage', 'The assistant', 'S'], ['Kit', 'The courier', 'K'] ],
        traits: [ ['Held a workshop pass', 'Held an exhibition pass'], ['Wore a striped scarf', 'Wore a plain scarf'], ['Carried a silver case', 'Carried a black case'] ] }
};
const TRAITS = [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]];
export function caseSolution(seed) { return (Number(seed) >>> 0) % 4; }
export function caseEvidence(caseId, culprit, index) {
    const story = CASES[caseId] || CASES.trophy;
    return `The culprit ${story.traits[index][TRAITS[culprit][index]].toLowerCase()}.`;
}
export function suspectTraits(caseId, suspect) { return TRAITS[suspect].map((value, index) => CASES[caseId].traits[index][value]); }
export function consistentSuspects(caseId, culprit, facts) {
    return [0, 1, 2, 3].filter(suspect => facts.every(index => TRAITS[suspect][index] === TRAITS[culprit][index]));
}
