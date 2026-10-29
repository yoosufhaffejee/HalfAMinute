import { answerKey } from './rules.js?v=20261029.2';
export const MODE_VERSION = '20261030.1';
export const MODES = {
    classic: { name: 'Classic', description: 'Describe, guess and race to the finish. One point per correct answer.' },
    chaos: { name: 'Chaos', description: 'The clue game with board effects, shields and unexpected turns.' },
    boost: { name: 'Boost Stakes', description: 'Keep your clue points. Risk a turn for +2 if you meet the target, or −2 if you miss. Play a normal turn before risking again.' },
    double: { name: 'Double Stakes', description: 'One risk per team: meet the target to double your clue points. Miss and lose 3 banked points, with no clue points.' },
    table: { name: 'Open Table', description: 'For 3–12 players. Everyone guesses privately, without a timer. Each correct guess earns the guesser and speaker one point.' },
    case: { name: 'Case Files', description: 'One crew, a rotating speaker and a mystery to solve. Correct answers unlock evidence. Discuss, then accuse together.' }
};
export function modeOf(settings = {}) { return Object.hasOwn(MODES, settings.mode) ? settings.mode : settings.chaosMode ? 'chaos' : 'classic'; }
export function isParty(settings) { return ['table', 'case'].includes(modeOf(settings)); }
export function isStakes(settings) { return ['boost', 'double'].includes(modeOf(settings)); }
export function minimumPlayers(settings) { return modeOf(settings) === 'table' ? 3 : 2; }
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
        trainingMode: mode !== 'table' && Boolean(settings.trainingMode), trackSeries: !party && Boolean(settings.trackSeries),
        numTeams: party ? 2 : settings.numTeams, numWords: mode === 'table' ? 1 : settings.numWords,
        tableCycles: Math.max(1, Math.min(3, Math.round(Number(settings.tableCycles) || 2))),
        caseTurns: Math.max(4, Math.min(12, Math.round(Number(settings.caseTurns) || 6))),
        caseId: ['trophy', 'blackout', 'blueprint'].includes(settings.caseId) ? settings.caseId : 'trophy' };
}
