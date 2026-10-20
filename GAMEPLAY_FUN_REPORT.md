# Half A Minute: making the game more fun

18 October 2026 · Reviewed against commit `9d55fe8`

**Implementation update, 20 October:** the first improvements and optional reroll prototype have now been implemented. This report preserves the original assessment and pre-change simulation numbers. See [implementation notes](C:/Users/Yoosuf/Documents/HalfAMinute/GAMEPLAY_CHANGES.md) for the current rules and validation. The analyzer now writes updated-rule results to `reports/chaos-current-results.json`; the original baseline below remains in `chaos-balance-results.json`.

## Recommendation

Keep the fast describe-and-guess core. Make turns easier to read, shorten the time between them, and make Chaos surprising without allowing one roll to wipe out most of a match. Then test one small player decision that makes Chaos feel more personal.

The highest-value next release is a **clarity, pacing, and bounded-Chaos release**. More powerups, animations, and content should follow evidence that the current loop feels good.

This is an assessment and proposed backlog. Gameplay has not been changed. The existing online player-count exceptions, word visibility, speaker rotation, joining/leaving, and host authority remain the baseline. Proposed rule changes below are explicitly identified.

## What I reviewed and how certain the findings are

- **Observed in source:** README, word-curation guidance, settings, local and online turn flows, Chaos generation/resolution, word selection, board rendering, accessibility styles, and end-of-game behavior.
- **Observed in the browser:** a disposable local Chaos game at a 390 × 844 viewport, including the clue phase. This was a narrow browser viewport, not a physical-phone or multiplayer usability test.
- **Simulated:** 5,000 matches per configuration using the current authoritative Chaos functions, deterministic random seeds, and a simplified scoring model. Fourteen configurations produced 70,000 synthetic matches. These reveal structural risks; they do not establish what people find fun.
- **Design hypotheses:** changes intended to improve enjoyment, which need playtesting before being called successful.

I have not collected real match telemetry or watched groups play. Recommendations about frustration, excitement, familiarity, and rematch appetite are hypotheses grounded in the mechanics and interface, rather than measured player sentiment.

The design approach is to judge the experience produced by mechanics, then iterate. That follows the original [MDA framework](https://www.cs.northwestern.edu/~hunicke/MDA.pdf); it does not imply that any particular powerup or number below is proven to be fun.

## What is already worth preserving

The core task is immediate and social: explain familiar things under time pressure. Flexible local/online play and the unusual small-player online variants broaden when the game can be played. Training hints provide an existing route for less confident speakers. Category/theme selection and the recent vocabulary expansion already provide substantial variety.

Chaos already has understandable building blocks: boosts, setbacks, protection, and stealing from the leader. Keep those recognizable ideas. The main weaknesses are how much they interrupt play, how clearly they are explained, and how little influence players have over them.

Do not make another bulk vocabulary expansion the first priority. The current audit records 5,103 distinct category answers and 991 distinct theme answers, with overlap between these collections. Better selection, familiarity, and repeat prevention now have more value than adding arbitrary volume.

## The evidence that most affects priorities

### 1. Chaos spends substantial time resolving outcomes

The current resolution includes a 3-second reveal, 420 ms per earned movement step, another 2 seconds when an effect lands, 420 ms per effect movement step, and a 450 ms clearing pause. The reveal happens even when the landing has no effect. A winning turn also gets resolution time even though a powerup cannot change its result.

In the simulation, the median Chaos resolution was **5.13 seconds**. In a two-team, 20-point game, the mean total resolution time was **68 seconds per match**. At 60 points it was **215 seconds**. The longest observed 60-point resolution was **31.49 seconds**, largely because resetting a team to the start animates the distance.

That is a pacing problem before it is an animation-style problem. Anticipation can be entertaining; repeated waits with no decision or meaningful outcome are the first time to recover.

### 2. Bomb rarity does not limit bomb severity

An eligible landing has these probabilities:

| Result | Chance per eligible landing | Current consequence |
| --- | ---: | --- |
| Nothing | 60.0% | No effect |
| +1 | 13.6% | Gain 1 |
| +2 | 2.8% | Gain 2 |
| −1 | 11.2% | Lose 1 unless shielded |
| −2 | 2.0% | Lose 2 unless shielded |
| Bomb | 0.8% | Reset to zero unless shielded |
| Shield | 5.6% | Store one protection |
| Steal | 4.0% | Gain 1; leading opponent loses 1 if possible |

These are not unconditional per-turn probabilities. The start and last board cell are excluded, and reaching the target bypasses the landing effect. Shields further alter consequences.

The bomb is unusual because its loss scales with progress while all other movement effects stay small. At 18 points it can erase six average three-point turns. On longer boards the potential loss is much larger. Replacing “reset” with a bounded loss would preserve the dramatic event while protecting the work of playing well.

For an unshielded eligible landing at position `p ≥ 2`, ignoring floor clipping and opponent losses, the expected immediate change to the acting team's points is `0.08 − 0.008p`. This is zero at position 10 and negative beyond it. This narrow calculation excludes the future value of shields and the relative benefit of stealing; it is not a complete fairness measure. It illustrates how the reset dominates more strongly near the end.

### 3. Match length and starting order matter

All rows below assume equal teams: five independent words with a 60% chance of success each, fixed 30-second rounds, and an assumed six seconds for scoring/handoff. They include the current Chaos resolution time but exclude sound startup, countdown startup, network delays, and early round endings. Times are **synthetic planning estimates**, not observed session lengths.

| Teams / target | Classic median turns | Chaos median turns | Classic estimated median minutes | Chaos estimated median minutes | Chaos games with an unblocked bomb |
| --- | ---: | ---: | ---: | ---: | ---: |
| 2 / 10 | 6 | 6 | 3.60 | 4.11 | 3.36% |
| 2 / 20 | 13 | 12 | 7.80 | 8.34 | 7.34% |
| 2 / 40 | 25 | 25 | 15.00 | 17.28 | 14.32% |
| 2 / 60 | 38 | 37 | 22.80 | 25.87 | 20.10% |
| 3 / 20 | 17 | 17 | 10.20 | 11.81 | 9.76% |
| 4 / 20 | 22 | 22 | 13.20 | 15.22 | 13.40% |

The first team also benefits from winning immediately on reaching the target, before everyone necessarily gets the same number of turns:

| Equal-skill, 20-point model | Classic win split by turn order | Chaos win split by turn order |
| --- | --- | --- |
| 2 teams | 64.92% / 35.08% | 62.34% / 37.66% |
| 3 teams | 49.80% / 30.18% / 20.02% | 46.88% / 31.24% / 21.88% |
| 4 teams | 42.72% / 26.40% / 18.10% / 12.78% | 39.54% / 25.84% / 19.52% / 15.10% |

This model strongly suggests measuring starting-order fairness. It does not justify silently replacing the finish rule. Randomizing the first match's starter and rotating the starter across rematches is a smaller intervention; an equal-turn finish is a separate optional experiment.

At 5,000 samples, a win proportion near 50% has roughly ±1.4 percentage points of 95% Monte Carlo sampling uncertainty. Differences in real player behavior could be much larger. The additional stronger-team scenarios in the raw results also give that team the first turn, so they do not isolate skill from starting order and are not used to claim a skill/luck balance.

### 4. The interface competes with the actual game

At 390 × 844, the local clue screen puts the banner, current team, timer, board, and scores before the words. The fifth word and round action require scrolling; the word panel also has its own scrollbar. The screenshot below captures this directly. A physical phone may use four board columns instead of five because board generation checks the user agent, while the surrounding layout checks viewport width. Responsive behavior should use a consistent layout rule.

![Current local clue screen at 390 × 844](C:/Users/Yoosuf/Documents/HalfAMinute/reports/mobile-gameplay-review.png)

Online has an additional source-confirmed issue: clue cards are disabled buttons during describing, and the disabled style reduces their opacity. The most important content visually resembles an unavailable control. The board itself has no numbered path or labeled finish; on a 20-point board, scores of 19 and 20 map to the same final cell.

## Prioritized backlog

The ordering below is the suggested implementation order, not a claim that every idea should ship. **S** means a contained UI/content change, **M** spans several views or game logic, and **L** spans lifecycle, shared state, or substantial testing. These are relative scope estimates, not delivery dates.

### High priority: improve the next match

| Rank | Change | Why it earns priority | Scope / rule impact |
| --- | --- | --- | --- |
| 1 | Put words, timer, and personal role first | Improves every clue round; directly supported by phone inspection | M · presentation |
| 2 | Shorten and cap Chaos resolution | Removes repeated dead time without needing more mechanics | M · pacing |
| 3 | Replace the full reset with a bounded bomb in the proposed default Chaos profile | Protects earned progress, especially in long games | M · rule experiment |
| 4 | Show earned points, effect, net result, and next action | Makes success and consequences understandable | M · presentation |
| 5 | Make scoring deliberate and readable | Reduces post-round uncertainty and accidental progression | S–M · presentation |
| 6 | Teach Chaos and make shield behavior consistent | Prevents surprise from looking like a bug | M · copy; possible rule change |
| 7 | Make board positions and the finish accurate | Restores a trustworthy sense of progress | M · presentation |
| 8 | Add a proper result screen and easy rematch | Turns a completed game into another game | L · lifecycle |
| 9 | Improve word dealing and repeat prevention | Preserves variety already present in the data | M · dealing behavior |
| 10 | Add quick presets and a useful setup summary | Gets groups into a suitable game faster | M · setup |
| 11 | Add sound, motion, readability, and input controls | Makes play work in more rooms and for more people | M · presentation |
| 12 | Establish a small playtest baseline | Prevents balancing by intuition alone | M · validation |

**1. Make the clue screen about giving clues.** During describing, prioritize a compact role/team header, a visible timer, and the word card. Collapse the board to a compact progress strip, hide the full legend, and keep optional hints behind a clear disclosure. At scoring, promote selections and the confirmation action; between turns, bring back the board.

Use full-contrast text cards while describing; switch to selectable controls only when selection is legal. Give each player explicit instructions derived from the existing online visibility rules: who speaks, who guesses, who waits, and who selects correct answers. Include the speaker's name and the next speaker/team. The two-player and three-player exceptions need their own correct role copy; do not assume everyone has a conventional teammate.

For the default five-word card, aim for all five words, the timer, and the current primary action to fit a common phone viewport without nested scrolling. Fifteen-word games and expanded training hints need an intentionally scrollable layout with a persistent timer, rather than shrinking everything to unreadable text. Test 320/390/430 px widths, landscape, large text, long answers, and all team counts.

**2. Compress the reveal, preserve the punchline.** Combine earned movement and the outcome into a short sequence. Give empty landings a quick acknowledgement; spend the animation budget on a meaningful effect. Animate large movements by distance-independent travel, rather than waiting 420 ms for every tile. On a winning turn, move directly into the victory moment.

Suggested targets to test: an empty outcome under one second; ordinary effect outcomes around 1.5–3 seconds; a hard maximum around four seconds. These are initial product targets. Reduced-motion mode should present the same result immediately. Online resolution must remain one authoritative outcome with a shared deadline; a local animation preference must not allow early commands or change the next turn.

**3. Try a bomb that loses up to three points.** For a proposed balanced Chaos profile, start with `lose min(3, current points)` rather than resetting to zero. Keep the existing effect weights for the first comparison, so the impact of this change can be understood. Keep floor-at-zero, existing finish immunity, and no effect chaining explicit.

Treat the three-point cap as a starting hypothesis, not an optimized number. Compare perceived excitement, frustration, comeback potential, and match completion. The existing reset could later live in a clearly labeled optional Wild profile if players actively want it. Do not make full resets the default merely because they are rare.

**4. Explain the result in one glance.** Use a persistent short recap such as **“3 correct → +3 earned → −1 slip → net +2. Team Blue: 12/20.”** For a steal, show both teams' changes and name the target. For a blocked event, show the shield being consumed. Keep this accessible in history after the animation disappears. Distinguish earned points from Chaos points so good clue giving still gets credit.

Also surface “Team Red is 2 from the finish” between turns. Avoid celebratory movement that obscures whether a team actually gained or lost ground. Clear system status and recognizable next actions are established usability principles; see [Nielsen Norman Group's heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).

**5. Give scoring its own clear state.** Display **“3 of 5 correct · +3 earned”** while toggling answers. Use checkmarks and a visible selected state, including `aria-pressed`. Replace “Next Round” during scoring with **“Confirm 3 correct”** or **“Confirm score”**, then show the outcome and next speaker. Let the authorized scorer correct selections before committing.

Move “End Game” into a secondary menu and confirm that action because it ends the shared match. Keep ordinary round confirmation quick. Any post-commit score correction should be a separately designed, audited shared action; do not add a casual local undo that can diverge between clients.

**6. Give Chaos a short, truthful introduction.** Teach the loop in three steps: earn points, land, resolve one effect. Explain when the map appears, that it changes every turn, which tiles are protected, and how shields and steal targeting work. Keep the seven-effect reference available on demand instead of permanently competing with the game.

There are two specific consistency decisions:

- A shield is described as blocking the next negative effect, but currently does not protect its owner from another team's steal. Either explicitly describe its narrower protection or test letting it block incoming point loss, including a steal. Choose one rule and apply it everywhere. Define whether the stealing team still gains its point when a victim blocks.
- Receiving a second shield currently leaves the count at one. Show “Shield already ready” at minimum. A replacement bonus might be more satisfying, but changes the balance and should be tested separately.

Also disclose that a zero-correct turn can currently trigger an effect when already on an eligible tile. Compare this with “effects only after at least one correct answer” later; retain the current rule until that comparison is made. Rewarding a completely unsuccessful turn may feel forgiving or arbitrary depending on the group.

**7. Give the board an understandable race.** Show start at zero, a distinct finish at the target, numbered milestones, and a clear route. Give each team a labeled token or shape as well as a color; several teams on one tile should remain individually identifiable. Make 19 and 20 visibly different in a 20-point game. Show powerup names in readable outcome cards instead of relying on tiny board emoji.

This fixes the representation without changing scoring or adding a more complicated movement system. Use CSS/container width to choose columns and preserve the route when a window resizes.

**8. End with a payoff and an invitation to play again.** Replace the alert-and-reload ending with a result screen: winner, final scores, earned points, Chaos swing, and one or two lighthearted match highlights. Offer rematch with the same settings, change settings, and leave. Rotate the starting team across rematches; show who starts.

Online rematch is substantial work: retain the intended roster and invite context through an explicit new match identity, reset turn/history/powerup state, and preserve all current membership and authority protections. Do not revive an ended match by toggling a flag. Start with a clean victory screen if the complete rematch lifecycle cannot fit the first release.

**9. Use the existing vocabulary better.** Maintain a per-match normalized seen-answer set in online and local play. Draw unused easy/hard answers independently and replenish an exhausted difficulty without prematurely recycling the other pool. When a narrow pack genuinely runs out, explain the recycle or offer to expand the pack between games.

The current online pools refill when a needed difficulty runs short, without a durable per-lobby seen-answer history across refills. Local recent history is not a complete shared solution. This matters most for narrow themes, large cards, and long matches. Keep the intended easy/hard mix, but avoid a card full of closely related answers or near-duplicates. Add a post-round “unfamiliar / poor clue / duplicate” report action later; use actual feedback to curate difficulty. Do not auto-adjust difficulty mid-match invisibly.

**10. Offer a few useful starts, then advanced settings.** Present Classic and Chaos clearly, followed by Short / Standard / Long and a compact summary: teams, target, seconds, words, difficulty, pack, training. Explain that larger targets and more teams generally increase game time; calibrate displayed duration ranges from real sessions rather than presenting the simulation as a prediction for every group.

Keep every existing configuration available under advanced settings. Replace phone-unfriendly category multi-select with searchable chips or a clear picker. Show the selected theme/categories before starting and prevent contradictory combinations through the UI. Give Training a welcoming practice preset. Replace the hidden `!` strict-topic convention in AI mode with an explicit switch when that screen is next improved.

**11. Make the game comfortable to use.** Add mute and separate effect-volume control; keep timer cues visible when muted. Use one predictable countdown and reveal words/start timing independently of whether an audio file ends successfully. Reserve distinctive sounds for start, urgency, round end, and major outcomes; avoid a noisy cue on every render.

Support reduced motion, readable text sizing, keyboard selection, visible focus, labeled icon controls, and announcements for phase/result changes. Do not announce the timer every 200 ms. Check contrast in every actual team/disabled/selected state. Use text/shapes alongside color. A 44–48 CSS-pixel target is a useful product goal for important touch controls; WCAG's minimum target criterion is 24 × 24 with exceptions, not 44 everywhere. See [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) and [Microsoft's motion guidance](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/117).

Avoid rebuilding unchanged word/hint content on each clock tick. The online control render currently recreates training hint markup repeatedly, which could disturb scroll/focus and wastes work. Update the clock separately from the stable clue view. This is a source-level risk to verify on devices, not an observed performance failure.

**12. Measure a few experiences before balancing more numbers.** Record turns, correct answers, earned points, Chaos changes, time between clue rounds, match length, and finish order in a development/playtest build. Pair those with short questions about excitement, confusion, fairness, frustration, and wanting another match. Do not mistake “more effects” or “more evenly distributed winners” for more fun.

### Medium priority: add agency and replay value

| Rank | Proposal | Concrete next step | Scope / rule impact |
| --- | --- | --- | --- |
| 13 | Give Chaos one meaningful decision | Prototype a once-per-team, per-match reroll | M–L · experiment |
| 14 | Address starting-order fairness | Randomize first starter; rotate rematches; separately test equal-turn finish | M · rule change |
| 15 | Build coherent modes instead of many toggles | Classic, tested balanced Chaos, optional Wild only if wanted | M · product/rules |
| 16 | Make handoffs and waiting enjoyable | Named next-speaker card, brief recap, clearer waiting status | M · presentation |
| 17 | Give teams identity and easier invites | Names, labeled tokens, share/copy invite, optional QR | M · presentation |
| 18 | Calibrate pack familiarity and difficulty | Review feedback and success rates by pack; build suitable mixes | M · curation |
| 19 | Improve practice without diluting competitive turns | One practice round and reviewed legal starter hints | M · onboarding |
| 20 | Add restrained match highlights | Celebrate clue success and recovery without shaming players | M · presentation |

**13. Prototype one decision, not a powerup inventory.** My first candidate is one reroll per team per match, usable after seeing an eligible landing effect. Require accepting the reroll, show clearly when it is available, and resolve the decision before a short deadline with an automatic default. The active authorized player decides; the rest see the result. Test whether the extra interruption is worth the ownership it gives.

An alternative is a board whose effects persist for a complete team cycle and are visible before play, giving players something to anticipate. This changes the current per-turn map and can encourage stopping early or manipulating scores. It needs explicit scoring safeguards. Prototype this **instead of**, not simultaneously with, the reroll. If neither produces better group reactions, keep Chaos automatic and fast.

**14. Treat the finish rule as a real design choice.** Random selection spreads the advantage between groups; it does not remove it within a match. An optional equal-turn finish would let remaining teams complete the current cycle, compare final totals, and use a declared tie rule. This changes pacing, victory timing, and endgame strategy, so test it separately from the bounded bomb. Preserve the normal speaker/team rotation and all special online player-count rules.

**15. Prefer understandable profiles.** Classic should remain the familiar experience. A tested balanced Chaos profile should prioritize short outcomes and recoverable losses. A possible Wild profile could preserve full resets for groups that explicitly enjoy severe swings. Do not expose independent settings for every weight, immunity, shield interaction, and animation duration on the main setup screen. Only add profiles players can distinguish and choose meaningfully.

**16–17. Make the social context visible.** Between rounds, show “Maya is next for Team Red” and a clear handover cue on a shared device. Online players should know whether they are guessing, watching, scoring, or waiting for reconnection. Give the group a simple reminder to use its existing voice call when remote; built-in voice is not required for these improvements. Let teams choose short names and icons and make joining by code/link straightforward. These are presentation changes around the current joining and assignment rules.

**18–19. Reduce blank stares without removing challenge.** Use pack descriptions and sample answers before a game to establish familiarity. Offer curated accessible mixes and specialist packs as explicit choices. Difficulty should continue to mean the effort of giving a legal clue, as the current curation guidance specifies. Avoid treating obscurity as automatically worthwhile difficulty.

Training could provide a sample turn before the real match, with rule examples and starter hints. Review hints for answer words and derivatives before encouraging people to read them aloud: a definition is not automatically a legal clue. Keep assistance visibly selected before a match, rather than secretly changing competitive difficulty.

**20. Celebrate what players did.** Good highlights include a five-answer turn, a comeback, a shield save, or the biggest earned round. Show earned performance separately from random benefits. Avoid public “worst player” labels and elaborate statistics that delay rematch. This is a social game; give the table a talking point and move on.

### Low priority: experiment after the loop improves

| Rank | Idea | Constraint before investing |
| --- | --- | --- |
| 21 | Optional funny round constraints, such as no gestures | Short, opt-in, compatible with existing clue rules; test whether they distract |
| 22 | A cooperative score challenge | Reuse the core flow and curated cards; develop only if groups want another format |
| 23 | Private custom word packs | Need validation, preview, duplicate checks, and clear familiarity expectations |
| 24 | Seasonal or occasion packs | Curate for recognition and clue quality; current theme breadth is already substantial |
| 25 | Cosmetic themes, token styles, restrained celebrations | Preserve readability, load speed, mute, and reduced motion |
| 26 | Extra powerup types | Add only if an identified experience is missing; first remove redundancy/confusion |
| 27 | Persistent achievements or group records | Favor memorable shared accomplishments; avoid chores that interrupt the party |

Ranked play, accounts, a large progression economy, daily streaks, built-in voice, elaborate 3D boards, and monetization systems have weak near-term value for this request. Reconsider only when there is evidence they solve a retention or coordination problem. They are not prerequisites for a fun party game.

## Suggested sequence and acceptance targets

**First release: clarity and flow.** Implement ranks 1, 2, 4, 5, 6's accurate rules copy, 7, and the essential parts of 11. Add a simple victory screen and basic playtest recording. These establish a clearer baseline without requiring a new strategic layer.

**Second release: tested balanced Chaos.** Compare the capped bomb against the current reset with the same weights, cards, and time budget. Add the selected shield rule explicitly. Validate short and long games, two through four teams, and the existing small-player online variants. Tune event density only after outcome severity and pacing are understandable; test a range around the current 40% eligible-tile density rather than claiming a new magic percentage.

**Third release: replay and setup.** Complete safe rematches, starting-team rotation, better no-repeat dealing, presets, and team identity. These reduce the effort of playing again.

**Fourth release: one agency prototype.** Compare the reroll or persistent-map idea against the improved automatic Chaos. Keep it only if the decisions create better moments than the time and rules they add. Then consider low-priority variety.

Proposed acceptance targets, to validate and revise:

- Default five-word clue view fits a common phone screen without nested scrolling; larger cards have a persistent timer and deliberate scroll behavior.
- A new player can identify their role and next action within five seconds after the short introduction in at least 90% of observed test turns.
- Empty Chaos resolution takes under one second; ordinary effects usually take 1.5–3 seconds; no resolution exceeds the chosen four-second cap.
- Every score recap explains earned points, effect, and final position in one sentence; shield/steal behavior matches the rules reference.
- The proposed balanced bomb cannot remove more than three points. No change affects Classic scoring.
- Muted and reduced-motion play remain fully understandable. Enlarged text, keyboard focus, and the smallest supported viewport remain usable.
- Rematch starts a clean match with the intended roster and settings, and gives a different team the first turn where applicable.
- Current online authorization, reconnection, membership, and word-visibility protections continue to pass their regression checks.

## A practical playtest plan

Use six to eight groups as an initial formative round, spanning local/remote, phone/shared screen, two/three/four teams, and mixed word familiarity. Include the supported two-player and three-player variants. This is enough to discover recurring problems, not to prove small statistical improvements.

Start by observing the current version. Then compare the clarity/pacing changes and bounded bomb in staged comparisons, changing one major rule at a time. Counterbalance which version a group tries first, which team starts, and comparable card sets. Do not compare a short easy Classic game with a long specialist Chaos game and attribute the difference to Chaos.

Capture:

- **Flow:** elapsed time, time spent describing versus between turns, early endings, and matches abandoned.
- **Understanding:** questions about whose turn it is, incorrect control attempts, scoring corrections, and misunderstood effects.
- **Balance:** correct answers by team, starting order, earned versus random point swing, lead changes, and severe setbacks.
- **Enjoyment:** immediate reactions to effects, a short fairness/frustration rating, and whether the group actually chooses a rematch.

Ask after a match: “Which moment was best?”, “Which moment felt unfair?”, “When were you waiting?”, and “Would you play this version again?” Collect only necessary playtest data with participant agreement; recording microphones or private calls is unnecessary.

Reject a feature if people repeatedly need the host to explain it, if it delays speaking more than it creates enjoyable interaction, or if players feel their clue giving no longer matters. Keep changes that produce clearer turns, memorable recoveries, and voluntary rematches.

## Source map and reproducibility

| Area | Main source locations |
| --- | --- |
| Game identity, settings, online eligibility | [README](C:/Users/Yoosuf/Documents/HalfAMinute/README.md) |
| Vocabulary size and difficulty principles | [Word curation](C:/Users/Yoosuf/Documents/HalfAMinute/WORD_CURATION.md) |
| Effect weights and timing | [script.js](C:/Users/Yoosuf/Documents/HalfAMinute/script.js:77), `CHAOS_POWERUP_TYPES` |
| Map generation, protection, stealing | [script.js](C:/Users/Yoosuf/Documents/HalfAMinute/script.js:619), `generateRoundPowerupsMap`, `applyChaosPowerupToState` |
| Local resolution and scoring | [script.js](C:/Users/Yoosuf/Documents/HalfAMinute/script.js:1713), `runChaosResolutionLocally`, `nextRound` |
| Board/score representation | [script.js](C:/Users/Yoosuf/Documents/HalfAMinute/script.js:2037), `generateBoard`, `updateBoard`, `updateTeamScores` |
| Authoritative Chaos planning and online view | [script.js](C:/Users/Yoosuf/Documents/HalfAMinute/script.js:2595), `planOnlineChaos`, `renderOnlineControls`, `renderOnlineSnapshot` |
| Immediate victory and shared-state rules | [online/state.js](C:/Users/Yoosuf/Documents/HalfAMinute/online/state.js:205), `completeTurn` |
| Word dealing and refills | [script.js](C:/Users/Yoosuf/Documents/HalfAMinute/script.js:2562), `drawOnlineWords`; [script.js](C:/Users/Yoosuf/Documents/HalfAMinute/script.js:1803), `displayCurrentWords` |
| Mobile layout, disabled clues, motion | [style.css](C:/Users/Yoosuf/Documents/HalfAMinute/style.css) |
| Clock/control render cadence | [online/client.js](C:/Users/Yoosuf/Documents/HalfAMinute/online/client.js), `tick`; [script.js](C:/Users/Yoosuf/Documents/HalfAMinute/script.js:965), `renderTrainingHints` |

The read-only [analysis script](C:/Users/Yoosuf/Documents/HalfAMinute/tools/analyze-chaos.cjs) extracts the current Chaos functions into an isolated Node VM. It does not import the browser application, connect to Firebase, or create lobbies. Run from the project directory:

```powershell
node tools/analyze-chaos.cjs 5000
```

The [raw results](C:/Users/Yoosuf/Documents/HalfAMinute/reports/chaos-balance-results.json) include assumptions, scenario results, and a source hash. The simulation uses a fixed model of correct answers and cannot measure human strategy, vocabulary familiarity, social enjoyment, or interface confusion. The screenshot is evidence of one layout, not a full device compatibility audit.
