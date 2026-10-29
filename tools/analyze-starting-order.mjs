// Synthetic equal-skill Classic matches: compare the former immediate finish
// against the shared production equal-turn evaluator. No network or player data.
import fs from 'node:fs';
import { random, startingTeam, matchProgress } from '../gameplay/rules.js';
const samples = 10000, cases = [];
for (const teamCount of [2, 3, 4]) for (const target of [10, 20, 40]) {
    const results = [];
    for (const finish of ['immediate', 'equal-turns']) for (const mode of ['fixed', 'random']) {
        const wins=Array(teamCount).fill(0),credits=Array(teamCount).fill(0),slots=Array(teamCount).fill(0);
        let draws=0;
        for (let match = 0; match < samples; match++) {
            const starter = mode === 'fixed' ? 0 : startingTeam(815739 + match * 1307, teamCount);
            const rng = random(20261020 + match * 1021), points = Array(teamCount).fill(0);
            const events=[];let progress;
            for (let turn = 0; turn < 1000; turn++) {
                const actor = (starter + turn) % teamCount;
                for (let word = 0; word < 5; word++) if (rng() < 0.6) points[actor]++;
                events.push({teamIndex:actor});
                progress=finish==='equal-turns'?matchProgress(points,target,events,progress?.finalTurnCount)
                    : {finished:points[actor]>=target,winners:[actor]};
                if (progress.finished) {
                    if(finish==='equal-turns'&&new Set(progress.turns).size!==1)throw new Error('Unequal completed turns');
                    if(progress.winners.length>1)draws++;
                    for(const winner of progress.winners) {
                        if(progress.winners.length===1)wins[winner]++;
                        credits[winner]+=1/progress.winners.length;
                        slots[(winner-starter+teamCount)%teamCount]+=1/progress.winners.length;
                    }
                    break;
                }
            }
        }
        const percent = values => values.map(n => Number((n / samples * 100).toFixed(2)));
        results.push({finish,starter:mode,outrightWinPercentByTeam:percent(wins),drawPercent:Number((draws/samples*100).toFixed(2)),
            sharedWinCreditPercentByTeam:percent(credits),sharedWinCreditPercentByTurnSlot:percent(slots)});
    }
    cases.push({teamCount,target,samplesPerMode:samples,results});
}
const output = { assumptions: 'Equal teams, independent 60% success for each of five words, Classic only. No human behavior or Chaos/reroll model. 10,000 matches per configuration, starter mode and finish rule. A draw splits one unit of win credit among tied leaders.',
    conclusion: 'Equal-turn matches stop only after every team has played the same number of turns. Compare turn-slot win credit with the legacy immediate-finish baseline; finite samples retain random variation.', cases };
fs.mkdirSync(new URL('../reports/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../reports/starting-order-equal-turns.json', import.meta.url), JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify(output, null, 2));
