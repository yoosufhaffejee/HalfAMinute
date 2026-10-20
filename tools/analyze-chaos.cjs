#!/usr/bin/env node
// Read-only gameplay analysis. Extracts and executes the current Chaos rules;
// never imports the browser app or connects to Firebase.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

async function main() {
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const names = ['createSeededRandom', 'createInitialTeamShields', 'normalizeTeamShields',
    'sanitizeChaosPowerupType', 'pickWeightedChaosPowerup', 'generateRoundPowerupsMap',
    'getBoardCellIndexForPoints', 'getLeadingOpponentIndexes', 'applyChaosPowerupToState',
    'formatChaosSummaryForAudit', 'planOnlineChaos'];
const functions = names.map(name => {
    const match = source.match(new RegExp(`^function ${name}\\([^]*?^}\\s*$`, 'm'));
    if (!match) throw new Error(`Missing source function: ${name}`);
    return match[0];
}).join('\n');
const weights = source.match(/^const CHAOS_POWERUP_TYPES = \{[^]*?^};/m)?.[0];
const context = vm.createContext({ Gameplay: await import('../gameplay/rules.js') });
vm.runInContext(`let teams=[],numTeams=2,pointsToWin=20;${weights}\n${functions}
    this.api={createSeededRandom,planOnlineChaos,applyChaosPowerupToState,types:CHAOS_POWERUP_TYPES};`, context);
const api = context.api;
const sampleCount = Number(process.argv[2] || 5000);
const quantile = (sorted, p) => sorted[Math.floor((sorted.length - 1) * p)];
const rounded = (value, digits = 3) => Number(value.toFixed(digits));

function simulate(teamCount, target, chaos, strong = false) {
    const turns = [], seconds = [], resolutions = [], winners = Array(teamCount).fill(0);
    let bombGames = 0, bombHits = 0, backwardTurns = 0, allTurns = 0, durationSum = 0, effectTurns = 0;
    for (let match = 0; match < sampleCount; match++) {
        const scoreRandom = api.createSeededRandom(20261018 + match * 1021);
        const seedRandom = api.createSeededRandom(815739 + match * 1307);
        let points = Array(teamCount).fill(0), shields = Array(teamCount).fill(0), turnCount = 0, waitMs = 0, bombThisGame = false;
        while (turnCount < 1000) {
            const actor = turnCount % teamCount;
            const success = strong ? (actor === 0 ? 0.7 : 0.55) : 0.6;
            let score = 0;
            for (let word = 0; word < 5; word++) if (scoreRandom() < success) score++;
            const seed = Math.floor(seedRandom() * 0x100000000);
            const before = points[actor];
            const basePoints = [...points]; basePoints[actor] += score;
            if (chaos) {
                const plan = api.planOnlineChaos({ settings: { pointsToWin: target },
                    teams: points.map(points => ({ points })), chaos: { teamShields: shields },
                    turn: { seed, teamIndex: actor, selectedIndexes: Array.from({ length: score }, (_, i) => i) } }, basePoints);
                points = [...plan.points]; shields = [...plan.shields];
                resolutions.push(plan.durationMs / 1000); waitMs += plan.durationMs;
                if (plan.landing) effectTurns++;
                if (plan.landing?.type === 'bomb' && points[actor] === 0 && basePoints[actor] > 0) {
                    bombThisGame = true; bombHits++;
                }
                if (points[actor] < before) backwardTurns++;
            } else points = basePoints;
            turnCount++; allTurns++;
            const winner = points.findIndex(value => value >= target);
            if (winner >= 0) { winners[winner]++; break; }
        }
        if (bombThisGame) bombGames++;
        turns.push(turnCount);
        // Assumed 30s clue round + 6s scoring/handoff; excludes audio/countdown startup and network delays.
        seconds.push(turnCount * 36 + waitMs / 1000);
        durationSum += waitMs / 1000;
    }
    turns.sort((a, b) => a - b); seconds.sort((a, b) => a - b); resolutions.sort((a, b) => a - b);
    return {
        teamCount, target, chaos, skillModel: strong ? 'first team 0.70, other teams 0.55' : 'all teams 0.60',
        sampleCount, medianTurns: quantile(turns, 0.5), p90Turns: quantile(turns, 0.9),
        medianEstimatedMinutes: rounded(quantile(seconds, 0.5) / 60, 2), p90EstimatedMinutes: rounded(quantile(seconds, 0.9) / 60, 2),
        winnerPercent: winners.map(n => rounded(n / sampleCount * 100, 2)),
        gamesWithUnblockedBombPercent: rounded(bombGames / sampleCount * 100, 2),
        unblockedBombHits: bombHits, backwardTurnsPercent: rounded(backwardTurns / allTurns * 100, 2),
        meanResolutionSecondsPerGame: rounded(durationSum / sampleCount, 2),
        effectTurnsPercent: rounded(effectTurns / allTurns * 100, 2),
        resolutionSeconds: chaos ? { median: quantile(resolutions, 0.5), p95: quantile(resolutions, 0.95), p99: quantile(resolutions, 0.99), max: resolutions.at(-1) } : null
    };
}

const cases = [];
for (const [teamCount, target] of [[2, 10], [2, 20], [2, 40], [2, 60], [3, 20], [4, 20]]) {
    cases.push(simulate(teamCount, target, false), simulate(teamCount, target, true));
}
cases.push(simulate(2, 20, false, true), simulate(2, 20, true, true));

const shieldCase = api.applyChaosPowerupToState({ teamsData: [{ points: 2 }, { points: 8 }], shields: [0, 1], actingTeamIndex: 0, powerupType: 'steal1', rng: () => 0 });
const artifact = {
    generatedFor: 'Half A Minute gameplay report, 20 October 2026',
    source: 'script.js current Chaos functions, extracted at run time',
    sourceSha256: crypto.createHash('sha256').update(source).digest('hex'),
    gameplaySha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'gameplay', 'rules.js'))).digest('hex'),
    assumptions: {
        wordsPerTurn: 5, secondsPerClueRound: 30, assumedSecondsScoringAndHandoff: 6,
        independentBinomialWordSuccess: true, scoreSuccessEqual: 0.6, startingTeam: 0,
        notes: 'Synthetic outcomes, not measured player behavior. No early ending, disconnects, word familiarity effects, player decisions, or sound startup time. Optional player rerolls are not modeled. Current finish immunity, persistent shields, automatic steal targeting and terminal scoring are included.'
    },
    eligibleLandingProbabilities: { none: 0.6, ...Object.fromEntries(Object.entries(api.types).map(([key, value]) => [key, value.weight / 100 * 0.4])) },
    shieldStealCheck: { victimDelta: shieldCase.victimDelta, victimBlocked: shieldCase.victimBlocked },
    cases
};
const output = path.join(root, 'reports', 'chaos-current-results.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(artifact, null, 2) + '\n');
console.log(JSON.stringify({ output, cases }, null, 2));

}
main().catch(error => { console.error(error); process.exitCode = 1; });
