// Synthetic equal-skill Classic matches. Starting identity and turn-slot advantage
// are different: randomizing/rotating starters distributes, not removes, the latter.
import fs from 'node:fs';
import { random, startingTeam } from '../gameplay/rules.js';
const samples = 10000, cases = [];
for (const teamCount of [2, 3, 4]) for (const target of [10, 20, 40]) {
    const fixed = Array(teamCount).fill(0), randomized = Array(teamCount).fill(0), slots = Array(teamCount).fill(0);
    for (let match = 0; match < samples; match++) {
        for (const mode of ['fixed', 'random']) {
            const starter = mode === 'fixed' ? 0 : startingTeam(815739 + match * 1307, teamCount);
            const rng = random(20261020 + match * 1021), points = Array(teamCount).fill(0);
            for (let turn = 0; turn < 1000; turn++) {
                const actor = (starter + turn) % teamCount;
                for (let word = 0; word < 5; word++) if (rng() < 0.6) points[actor]++;
                if (points[actor] >= target) {
                    (mode === 'fixed' ? fixed : randomized)[actor]++;
                    if (mode === 'random') slots[turn % teamCount]++;
                    break;
                }
            }
        }
    }
    const percent = values => values.map(n => Number((n / samples * 100).toFixed(2)));
    cases.push({ teamCount, target, samplesPerMode: samples, fixedStarterWinPercentByTeam: percent(fixed),
        randomStarterWinPercentByTeam: percent(randomized), randomStarterWinPercentByTurnSlot: percent(slots) });
}
const output = { assumptions: 'Equal teams, independent 60% success for each of five words, immediate finish, Classic only. No human behavior or reroll model. 10,000 matches per configuration per mode.',
    conclusion: 'Random starting identity distributes the existing first-slot advantage. Rotating starters across rematches gives each team that slot equally over a full cycle; the immediate-finish rule still advantages early turn slots within an individual match.', cases };
fs.mkdirSync(new URL('../reports/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../reports/starting-order-results.json', import.meta.url), JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify(output, null, 2));
