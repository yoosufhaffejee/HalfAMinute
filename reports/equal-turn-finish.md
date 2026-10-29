# Equal-turn finish — 29 October 2026

Reaching the target starts a final cycle instead of ending the match immediately. Completed turn events determine how many turns each team has taken. Teams still below the cycle's turn count keep their owed turns, then the highest full score wins. Equal highest scores are a draw. This applies online and locally.

The final cycle is sealed when first triggered: Chaos can still change scores, but cannot cancel the final opportunity. Final totals can exceed the finish tile. Earned moves reaching the target still skip landing effects. A missing/disconnected team retains its owed turn; existing connection and player-count requirements remain in force. The host can still choose to stop a match, which displays “Match ended” rather than declaring a premature winner.

Online protocol 5 prevents older immediate-finish clients from joining new matches. Reload all players' tabs and create a new lobby. Final-cycle state resets on rematch. Per-team round labels now follow completed-turn counts rather than the numeric team-order wrap.

## Regression checks

149 automated tests passed. New coverage includes:

- A team reaching 21 while the other remains eligible to finish at 19, 21 or 22.
- Every starting position for two, three and four teams.
- No bonus turn when the last team in the cycle reaches the target.
- Zero-correct final turns; cancelled turns do not count.
- A missing final team, waiting-state stability, replacement players, and host handover during a sealed Chaos resolution.
- A Chaos steal producing a draw below the original target while retaining the sealed final cycle.
- Local last-turn eligibility, final-round notice, draw/highest-score results, and rematch resets.

Two browser clients connected to the existing Firebase database in a temporary short match. Randomized Team 2 started. Both teams scored five on their first turn. Team 2 reached ten on its second turn; Team 1 still had an enabled Start Round button and a notice naming its owed turn. The notice survived a refresh. Team 1 scored five on its second turn and both clients showed a 10–10 draw. Both players left and the temporary lobby closed. Screenshots: `equal-turns-final-turn.png` and `equal-turns-draw.png`.

## Synthetic starting-order comparison

`node tools/analyze-starting-order.mjs` simulated 10,000 matches per configuration for 2/3/4 teams and targets 10/20/40, with both fixed/random starters and both old/new finish rules: 360,000 matches total. The production equal-turn evaluator asserted equal completed-turn counts in every completed new-rule match.

For a 20-point target and fixed starter:

| Teams | Old win credit by turn slot | Equal-turn win credit by turn slot | New draw rate |
| --- | --- | --- | --- |
| 2 | 64.97%, 35.03% | 50.20%, 49.80% | 7.81% |
| 3 | 50.93%, 29.53%, 19.54% | 33.74%, 33.04%, 33.22% | 12.00% |
| 4 | 42.35%, 26.48%, 18.34%, 12.83% | 25.23%, 24.85%, 24.61%, 25.32% | 15.14% |

A draw splits one unit of win credit among tied leaders; these percentages are not outright win percentages. This model assumes independent 60% success on each of five words, equal skill and Classic scoring. It does not model human behavior, clue difficulty or Chaos strategy. Full output: `starting-order-equal-turns.json`. Historical immediate-finish reports remain unchanged.
