import { answerKey } from './rules.js?v=20261029.2';
import { CASE_IDS } from './cases.js?v=20261031.beta1';
export const MODE_VERSION = '20261031.beta1';
export const MODES = {
    classic: { name: 'Classic', description: 'Describe, guess and race to the finish. One point per correct answer.' },
    chaos: { name: 'Chaos', description: 'The clue game with board effects, shields and unexpected turns.' },
    boost: { name: 'Boost Stakes', description: 'Keep your clue points. Risk a turn for +2 if you meet the target, or −2 if you miss. Play a normal turn before risking again.' },
    double: { name: 'Double Stakes', description: 'One risk per team: meet the target to double your clue points. Miss and lose 3 banked points, with no clue points.' },
    table: { name: 'Open Table', description: 'For 3–8 players. One speaker describes a numbered card. The first correct guesser wins each word; the speaker awards the points. Play timed or unlimited.' },
    case: { name: 'Case Files', description: 'Eight case files, 24 scenarios, from Easy to Hard. Recover documents through word rounds, rebuild the timeline and support your explanation with evidence.' },
    cakebeta: { name: 'Cake Escape Beta', description: 'A new visual mystery prototype. Guess words to earn search points. Solve a riddle, compare photos and recreate the cake’s escape. One crew, three discoveries.' }
};
export function modeOf(settings = {}) { return Object.hasOwn(MODES, settings.mode) ? settings.mode : settings.chaosMode ? 'chaos' : 'classic'; }
export function isParty(settings) { return ['table', 'case', 'cakebeta'].includes(modeOf(settings)); }
export function isInvestigation(settings) { return ['case', 'cakebeta'].includes(modeOf(settings)); }
export function isStakes(settings) { return ['boost', 'double'].includes(modeOf(settings)); }
export function minimumPlayers(settings) { return modeOf(settings) === 'table' ? 3 : 2; }
export function maximumPlayers(settings) { return modeOf(settings) === 'table' ? 8 : 12; }
export function riskTarget(cardSize) { return Math.max(1, Math.ceil(Math.max(1, cardSize) * 0.6)); }
export function eligibleCardSize(entries, settings) {
    return Math.min(settings.numWords, new Set(entries.filter(entry => settings.difficulty === 'normal' || entry.difficulty === settings.difficulty)
        .map(entry => answerKey(entry.word))).size);
}
export function riskAvailability(settings, points, resource = {}) {
    const mode = modeOf(settings);
    if (!isStakes(settings)) return { allowed: false, reason: '' };
    if (mode === 'double' && resource.used) return { allowed: false, reason: 'Your team has used its risk for this match.' };
    if (mode === 'boost' && resource.cooldown) return { allowed: false, reason: 'Complete one normal turn before risking again.' };
    const stake = mode === 'boost' ? 2 : 3;
    if (points < stake) return { allowed: false, reason: `Bank ${stake} points before risking a turn.` };
    return { allowed: true, reason: mode === 'boost' ? 'Available again after one normal turn.' : 'One attempt per team this match.' };
}
export function stakesScore(settings, before, earned, cardSize, risky) {
    const mode = modeOf(settings), target = riskTarget(cardSize), met = earned >= target;
    let delta = earned;
    if (risky && mode === 'boost') delta = earned + (met ? 2 : -2);
    if (risky && mode === 'double') delta = met ? earned * 2 : -3;
    const after = Math.max(0, before + delta);
    const message = !risky ? `${earned} correct · +${earned} points.` : mode === 'boost'
        ? `${earned} correct ${met ? '+ 2 boost' : '− 2 stakes'} · ${after - before >= 0 ? '+' : '−'}${Math.abs(after - before)} points.`
        : met ? `Target reached! ${earned} correct × 2 = +${earned * 2}.` : 'Target missed. −3 points; no clue points earned.';
    return { before, after, earned, delta: after - before, risky, target, met, message };
}
export function nextRiskResource(settings, risky, previous = {}) {
    return modeOf(settings) === 'boost' ? { cooldown: Boolean(risky) } : { used: Boolean(previous.used || risky) };
}
export function normalizeModeSettings(settings) {
    const mode = modeOf(settings), party = isParty({ mode });
    return { ...settings, mode, chaosMode: mode === 'chaos', chaosReroll: mode === 'chaos' && Boolean(settings.chaosReroll),
        trainingMode: !party && Boolean(settings.trainingMode), trackSeries: !party && Boolean(settings.trackSeries),
        selectedTheme: isInvestigation(settings) ? 'None' : settings.selectedTheme, selectedCategories: isInvestigation(settings) ? [] : settings.selectedCategories,
        numTeams: party ? 2 : settings.numTeams, numWords: settings.numWords,
        tableTiming: settings.tableTiming === 'unlimited' ? 'unlimited' : 'timed',
        tableScoring: settings.tableScoring === 'guesser' ? 'guesser' : 'shared',
        tableSeconds: Math.max(15, Math.min(300, Math.round(Number(settings.tableSeconds) || 60))),
        tableCycles: Math.max(1, Math.min(3, Math.round(Number(settings.tableCycles) || 2))),
        caseTurns: Math.max(4, Math.ceil(6 / Math.max(1, Number(settings.numWords) || 5)), Math.min(12, Math.round(Number(settings.caseTurns) || 6))),
        caseId: mode === 'cakebeta' ? 'cake' : CASE_IDS.includes(settings.caseId) ? settings.caseId : CASE_IDS[0] };
}
