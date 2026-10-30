# Half A Minute

Half A Minute is a fast, team-based word clue game inspired by **30 Seconds**.  
Play locally on one device, or run real-time online lobbies with host controls, team balancing, and live state sync.

## Features

- Offline local play
- Six game choices: Classic, Chaos, Boost Stakes, Double Stakes, Open Table and Case Files
- Online multiplayer lobbies (host + join by code)
- AI word packs for local and online play (adaptive topics and optional strict scope)
- Training mode (shows clue-friendly description hints per active word)
- Category and theme filtering
- Difficulty selection (`easy`, `normal`, `hard`)
- Configurable team count, points-to-win, round time, and words per round
- Searchable, scrollable theme selection; long boards expand across tablet/desktop widths while keeping phones vertical
- Round history/audit table (mobile-friendly vertical layout)
- Anti-repetition behavior with recent-word suppression
- Short / Standard / Long quick setup, with all existing advanced settings available
- Chaos: capped bombs, shields, readable effect reveals, and an optional once-per-team reroll
- Visible Chaos token movement, staged landing/effect reveals, and a reduced-motion alternative
- Ranked final scores, a compact final board, relevant Chaos breakdowns, summary downloads, and rematches with rotating starters
- Persistent mute, volume, and device/reduced/full motion preferences
- Confirmed perfect-card and team-best feedback, settled lead changes, final-round score context, and personal speaker handoffs
- Seven quick online reactions between turns, with expiry, rate limiting and reconnect replay suppression
- Optional session win/draw tallies across rematches; changing the roster or starting a new game resets the tally
- Shareable PNG result cards, invitation links that prefill the lobby code, and best-effort screen wake lock during visible play

## Project Files

- `index.html`: UI and modal structure
- `script.js`: core game logic, online sync, prompts, gameplay state
- `online/state.js`: transactional lobby membership, turn phases, host election, and speaker queues
- `online/client.js`: Firebase connection lifecycle, presence, reconnects, and turn commands
- `gameplay/rules.js`: deterministic word decks, presets, starting order, pacing, and recap helpers
- `gameplay/modes.js`: mode configuration, stakes arithmetic, targets and compatible settings
- `gameplay/party-state.js`: shared local/online Open Table and Case Files lifecycle
- `gameplay/party-ui.js`, `gameplay/party-results.js`: private role screens, device passes, evidence board and results
- `gameplay/cases.js`: authored suspect profiles and consistent evidence
- `gameplay/ai-client.js`: lazy Firebase AI Logic client and App Check configuration
- `gameplay/ai-packs.js`: game-specific system prompt, structured-pack validation, difficulty metadata and generation history
- `gameplay/online-packs.js`: validation and snapshots of shared custom lobby packs
- `gameplay/saved-packs.js`: bounded on-device pack library, including topics and difficulty metadata
- `gameplay/ai-errors.js`: safe, categorized generation feedback
- `data.js`: categories, themes, word metadata
- `style.css`: styling
- `gameplay/experience.js`: cosmetic round feedback, final-round context, session tallies and invitation helpers
- `gameplay/screen-awake.js`: optional screen wake lock lifecycle
- `tools/validate-data.js`: word-data validation and quality audit utility

## Quick Start

1. Clone/download the project.
2. Serve the folder locally (for example, `python -m http.server 8000`) and open `http://localhost:8000` in a modern browser.
3. Use the menu to start:
   - local game (`Start Game`)
   - online game (`Play Online`)
   - AI mode (`AI Mode`)

No bundler is required for basic use.

## External Dependencies

Runtime uses CDNs/services:

- Bootstrap 5 (CSS + JS bundle)
- Firebase Realtime Database (`firebase-app`, `firebase-database`)
- Firebase AI Logic and App Check (reCAPTCHA Enterprise), using the same Firebase JS SDK version as the database

Important:

- Online mode requires network access to Firebase.
- AI generation uses Firebase-managed Gemini authorization. Do not add a Gemini API key to the client, repository, or a frontend environment variable.
- The Firebase configuration and reCAPTCHA site key in the client are public identifiers. API restrictions and App Check protect access; they do not make these identifiers private.

## Game Modes

The Game selector explains each mode and shows only the setup that applies. How to play follows the chosen mode; live instructions explain the current turn. All modes support local and online play. Reload every player and create a new lobby for **online protocol 9**.

| Mode | Players / scoring | Length and special rules |
| --- | --- | --- |
| Classic / Chaos | Existing 2–4 team rules, including the existing 2/3-player online exceptions | Score target with equal turns (default) or first to target; Chaos alone has effects/rerolls |
| Boost Stakes | Existing team rules; normal clue points plus 2 on success or minus 2 on failure, floor zero | Bank 2 points to risk; complete one normal team turn before risking again |
| Double Stakes | Existing team rules; meet the target to double clue points, otherwise lose 3 banked points and earn no clue points | Bank 3 points; one risk per team per match |
| Open Table | **3–8 individuals**; first correct guesser(s) +1, with optional speaker +1 per solved word (default) | Numbered cards follow Words per round; 60-second default or Unlimited; 1–3 speaking turns each; online voice call or typed clues |
| Case Files | **2–12 players in one crew** | Five authored cases, three investigation leads, word-linked evidence, and a final who/how/where theory; no AI generation |

Both stakes modes lock the choice before the countdown and use a target of 60% of the actual distinct eligible card, rounded up (3 of 5). Risk resources are spent only when a turn is scored. Cancelled turns spend nothing. Their normal turns retain ordinary clue scoring, and both modes use the selected team win rule. They do not combine with Chaos.

Open Table uses the same complete card draw as the normal game (1–15 words, default five), including AI/custom packs and ordinary difficulty/exhaustion rules. Player one speaks first; rematches rotate the starter. The speaker holds the local device while everyone else guesses aloud. After the round, award each numbered word to its first correct guesser, or leave it on Nobody / skipped. If multiple guessers answer together, select all tied winners. Each gets 1 point; shared scoring still gives the speaker just 1 point for that word. Settings offers **guesser + speaker** (default: 1 point each per solved word) or **guesser only** (1 point to the guesser). Timing is separate from Classic: 60 seconds by default (15–300 configurable), or Unlimited with a manual finish. The countdown precedes the complete timer.

Online Open Table asks the host to choose **Voice call** or **Typed clues** at match start. Voice call uses your existing call; the app does not capture audio. In typed play, the speaker focuses one numbered word, sends clues, reads guesses in their transaction arrival order and awards the first correct answer, accepting sensible wording. Guessers see the clues and their own submissions; other players’ guesses stay private until review. There are at most 6 clue messages and 4 guesses per player per word, with text/length validation and stable message IDs. Skipping advances to another word; all handled words or timer expiry open shared review, where the speaker can correct awards or select multiple tied winners before committing points. A connected host can recover a disconnected speaker’s turn/review. Refresh retains committed clues and awards; unsent drafts survive ordinary updates but not a full page reload.

Everyone in the starting roster gets equal speaking opportunities. Late arrivals watch until rematch; departed players leave the ranking while their earned history remains. Removing a speaker cancels an unscored live turn. A temporary disconnect retains their seat and allows host recovery. New turns wait for three connected participants. Rematches can retain or switch the online format and reset scores/awards/messages while retaining deck exhaustion. Seven guarded between-turn reactions are available: applause, fire, laughter, shock, clever clue, close call and brutal miss.

Case Files has five fixed authored mysteries: **The Midnight Transfer**, **The Four-Minute Gallery**, **The Night Train Exchange**, **The False Signal**, and **The Silent Encore**. Each has six suspects, three possible methods, three destinations, three investigation leads and twelve verified evidence files. All 48 vocabulary prompts per case are references to existing `data.js` entries, with their actual easy/hard labels. There are no runtime AI calls, custom word packs or generated cases. Local play runs without a network connection after the app has loaded; online play uses Firebase and the group’s existing voice call.

The speaker chooses a lead before the countdown. After Go, only that speaker sees its card. Correct words reveal their mapped evidence files after confirmation; related words can open the same file once. Already discovered files leave the drawing pool. Follow-ups unlock as evidence from other leads supplies context, and missed files can be retried through related words. A nearly completed lead can have a shorter card rather than filler. Each confirmed turn spends one investigation turn; cancelling an unscored turn does not. A debrief pause lets the crew read discoveries before passing the device or role. The notebook contains profiles, reliable evidence, the briefing and an optional once-per-case reasoning hint after two turns. A complete solution needs at least five evidence files, with alternative proofs if one route is missed.

Word difficulty, card size (1–15) and round timing still apply. The default investigation budget is eight turns (4–12 configurable); one-word cards require at least six turns. AI/custom source and training controls are hidden for this mode, with the underlying preferences retained for other games. Category/theme filters do not override authored case vocabulary. Case Files has one shared solved/unsolved outcome, no team target or individual points. The host reviews and submits one final theory covering culprit, method and destination; stale or partial confirmations are rejected. The crew can resume an early theory until the turn budget ends. All evidence and choices survive online refreshes; the host can recover review or a debrief if its speaker disconnects. Late arrivals can join the cooperative crew.

Solutions are fixed: replay changes word order, not the truth. The result screen defaults to another case and clearly labels replays. Results explain all three answers and show previously missed evidence. Ending an investigation early keeps unrevealed facts sealed.

AI/custom word sources remain available for Classic, Chaos, Stakes and Open Table; online shared packs retain the 150-answer limit. Local Open Table supports larger manually pasted packs. Session team tallies apply only to team modes.

See [authored Case Files and verification](reports/authored-cases.md), [Open Table rebuild and verification](reports/open-table-rebuild.md), [original design and lifecycle contract](reports/new-modes-design.md) and [implementation/verification report](reports/new-modes.md).

## Offline Mode

- One device, local rounds.
- Teams rotate speakers automatically.
- History/audit tracked locally.

## Online Mode

- Host creates a lobby and shares a 4-letter code.
- Players join with unique names.
- Team assignment is auto-balanced.
- Host starts game once team/player requirements are valid.
- Host transfer happens automatically if host disconnects/leaves.
- Server disconnect markers and connection-specific presence detect dropped tabs/connections.
- Host authority transfers without ejecting a player just because their tab's heartbeat was delayed.
- Disconnected seats have a 90-second reconnect grace period. A server-connected tab is not removed solely for delayed heartbeats.
- Refresh restores the same player, team, turn, and answer selection using per-tab session storage.
- `Leave Lobby` explicitly releases a seat; `Rejoin Lobby` can restore a lost or superseded connection.
- Online protocol version 11 requires a newly created lobby; old-version lobbies show a message asking every player to reload and the host to recreate them. All clients share the scheduled countdown, mode rules, lobby word source, reactions and applicable results.
- Each team rotates its own speaker queue. Empty teams are skipped safely without changing the player-count eligibility rules.

## AI Mode

- Add up to **five topics** with **+** or Enter; Generate includes any topic still typed. Topics stay independent interests, rather than an intersection. One request aims for 150 answers total with roughly equal topic shares and per-topic difficulty budgets, then shuffles the combined editor list. Narrow topics can contribute fewer. Scope applies separately to each topic.
- With an existing pack, generation is labelled **Replace words**. A successful generation or saved-pack load offers **Undo replacement**, restoring the previous edits, difficulty metadata, topics and review visibility. Failed generation preserves the current pack and existing Undo. There is no append mode.
- Name a pack and choose **Save pack**, then reopen it from the compact **Saved packs** library. Up to 12 packs are stored in this device/browser's local storage, including the actual answers, canonical names, difficulty labels, topics and strict-scope choice. Loading uses no AI request and keeps answers hidden. The library survives reloads; it does not sync across devices, and clearing browser data removes it. Saving with the same name updates that pack; a full library asks you to remove a pack rather than silently evicting one.
- Enter a topic and generate up to **150** fresh answers. Narrow or exhausted topics may produce smaller packs; quality and topic boundaries take priority over padding.
- Choose **Play here** for one-device play, or **Host online** to create a lobby with the current pack. Enter your name, create the lobby, and share its code. Friends join through the normal online dialog; they do not need to generate or paste anything.
- Hosting copies the reviewed pack into the lobby, including its difficulty labels. All clients draw from that snapshot through refreshes, host changes and rematches, using the shared exhaustion deck. Later editor changes do not change a running lobby. Cancel hosting to return to the normal built-in lobby flow.
- Online packs use the configured team count, target, timing, card size and Chaos options. Built-in categories/themes and training hints do not apply to a custom pack. Shared packs support up to 150 distinct answers; invalid or difficulty-empty packs cannot start.
- Broad topics adapt naturally: Movies includes mostly titles plus related people and ideas; Hollywood and South African general knowledge cover varied relevant subtopics. Specific requests such as football player names stay within that answer type.
- Check **Keep to the exact topic** for direct examples only (Movies becomes titles only). Scope is independent of difficulty. Topics are plain text; punctuation has no special mode-switching meaning.
- Requests separate the topic/exclusions from the game's permanent system instructions. The model builds named groups internally to budget variety across answer types, then the app interleaves them into a simple editable word list. Strict and specific topics keep all groups within the requested answer type.
- Generated answers carry easy/hard labels and canonical identities. Normal-mode mix targets match actual card dealing (3 easy / 2 hard for five-word cards); Easy and Hard filter/deal their respective answers. Smaller Normal packs may have any mix.
- Normalized display/canonical identities remove duplicates and known aliases. The last 450 accepted generated answer identities are stored locally and excluded from later generations on the same browser/origin. Storage errors do not prevent play. This is not shared across devices, and model-missed synonyms can still slip through.
- Editing an unchanged answer or its known canonical name keeps its generated difficulty. New/pasted answers use the selected difficulty (Easy for Normal). Manual editing can deliberately reuse answers. A pack with no eligible answers cannot start at that difficulty.
- AI SDK loading and App Check initialization happen on the first generation request, so AI availability does not block local or online play.
- The pinned text model is `gemini-3.5-flash-lite`, with JSON output capped at 12288 tokens and no automatic generation retries. The application considers at most 150 entries, validates fields/difficulty and filters recent identities before accepting a pack.
- Failed, malformed, truncated or exhausted responses keep the existing pack, edits and difficulty metadata intact and restore generation/editing controls. The UI reports the accepted count rather than claiming every request reached 150.

Prompt samples and limitations are documented in [AI pack improvements](reports/ai-pack-improvements.md). Explicit live comparison: `node tools/evaluate-ai-packs.mjs --live` (requires authorized Google Cloud CLI access; uses a temporary App Check registration and deletes it afterward). This command makes real model requests; ordinary tests do not.

Adaptive/strict scope samples and responsive dialog checks are documented in [AI topic scope](reports/ai-topic-scope.md). Run that live evaluation with `node tools/evaluate-ai-packs.mjs --live --scope`.

Mixed-topic generation, save/load/Undo and mobile checks are documented in [Mixed AI packs](reports/ai-mixed-packs.md). Explicit live mixed-topic evaluation: `node tools/evaluate-ai-packs.mjs --live --mix`.

### Firebase AI setup

The existing project `halfaminute-01` uses the Gemini Developer API through Firebase AI Logic. Its web app has a score-based reCAPTCHA Enterprise App Check provider restricted to `yoosufhaffejee.github.io`. AI Logic App Check enforcement is enabled. The existing browser API key keeps its live-domain referrer restrictions and allows the Firebase App Check API in addition to its existing APIs. Database rules and enforcement were not changed.

The project remains on Spark, with billing disabled. Free-tier availability and quotas still apply. See [Firebase AI Logic pricing](https://firebase.google.com/docs/ai-logic/pricing).

Local gameplay and automated tests need no AI credentials. Live AI generation is intentionally restricted to the production origin. For local AI integration work, use a separately restricted development Firebase app/key and a registered private App Check debug token; never add localhost to the production reCAPTCHA domain list or commit a debug token. The CLI smoke test uses a temporary debug registration and removes it immediately afterward.

See [Firebase setup](https://firebase.google.com/docs/ai-logic/get-started?platform=web) and [App Check](https://firebase.google.com/docs/ai-logic/app-check) for administrative changes. The App Check service identifier for AI Logic is `firebaseml.googleapis.com`; the runtime API is `firebasevertexai.googleapis.com`.

## Training Mode

- Enable `Training Mode` in settings.
- During a speaker turn, the game shows each active word with its short description.
- Only words with an available description appear in the hints drawer. Missing descriptions do not receive generic fallback text, and a round with no descriptions hides the drawer.
- AI-generated and pasted packs have no training hints, so the drawer stays hidden even when Training Mode is enabled. The preference is preserved for later built-in games.
- Hints are hidden when the round moves to answer selection.

## Gameplay Flow

1. Speaker starts round. A visible 3, 2, 1, Go lead-in plays before any words or round time are shown. The full configured round duration starts afterward, using a shared scheduled time online.
2. Timer runs (`Round Duration`).
3. Speaker describes words without saying the target word.
4. After timer/end-round, correct words are selected.
5. Team gains one point per correct answer.
6. Speaker rotates and next team/round continues.
7. Reaching `Points to Win` starts the final round. Teams still owed turns play until every team has the same number of completed turns. Highest final score wins; equal highest scores are a draw.

The initial starter is randomized. Rematches keep the roster/settings and rotate the starter. A final-round notice names the teams still owed turns. The final round remains active even if Chaos lowers a score below the target; compare the full final totals, including points beyond the board's finish. Completed-turn counts come from scored turn events, so cancelled turns do not consume a team's final opportunity. A missing team keeps its owed turns and the existing connection/roster requirements still apply. Scores, final-round state and Chaos resources reset for the new match identity. Word exhaustion history carries across rematches for the same group. This finish rule applies online and locally.

**Settings → Match setup → Win rule** chooses the team finish. **Equal turns** remains the default and keeps the fair final cycle described above. **First to target** ends the match as soon as a completed turn's final score reaches or passes the target; other teams do not get reply turns. Chaos movement/effects and Stakes scoring finish before deciding the winner. The selection is shared online and retained on rematch; missing or invalid values default to Equal turns. Open Table and Case Files keep their own finish rules and hide this setting.

Current matches use online protocol 9, including the equal-turn team finish introduced in protocol 5 and selectable first-to-target finish. Reload every player's tab and create a new lobby; older clients/lobbies are incompatible, so an old client cannot apply a different win rule or mode/visibility rules.

Online answer review is shared by all connected players once a round ends, including small-game guessers and the speaker's teammates. Only the speaker can change selections or confirm. Confirmed options and checkmarks remain in a read-only review below the board through Chaos and between turns, including after refreshing or rejoining. The review clears when the next round's countdown starts and on rematch. Live-round answer visibility and team-size rules are unchanged.

## Chaos rules

- The map changes each turn. Start, the tile before the finish, and an earned move reaching the target have no effect. Resolve one landing effect, without chaining. A zero-correct turn can still land on an effect.
- Boosts add 1 or 2; slips lose 1 or 2; bombs lose **up to 3 points**, with a floor of zero. Effect weights remain unchanged.
- One shield blocks a landing penalty or incoming steal loss, then is consumed. Shields do not stack. A blocked steal still gives the stealing team its +1; the victim keeps their point. Steals target the leading opponent, with seeded random ties.
- After confirmation, the board settles for 350 ms, then the power-ups pop in and remain visible for 450 ms before movement starts. Movement keeps its 360 ms per space (at least one second), followed by a 1.4-second landing reveal, a 1.4-second effect, and 2.4 seconds to read the result. A typical effect turn takes 7–8 seconds. Safe landings skip the effect stages and hold the result for 1.6 seconds; moves reaching the target hold it for two seconds. The result card remains until the next round starts. Reduced motion shows the outcome immediately while the online authoritative deadline still applies.
- The **optional reroll prototype**, off by default, offers one reroll per team per match after an eligible effect. The speaker chooses within five seconds, must accept the new result, and cannot reroll again that match. No choice defaults to keep; the current host recovers the timeout if the speaker disconnects/leaves.

Word dealing tracks normalized answers and separate easy/hard exhaustion cycles. A difficulty reshuffles only after its own pool runs out; the other difficulty's deck history stays intact. No card repeats the same normalized answer. Narrow packs may repeat after exhaustion. The explicit match-summary download includes counts, scores, effects, and phase timings, with no player names or answer text. Online phase timings live in the normal shared match history; no separate analytics service is used.

See [GAMEPLAY_CHANGES.md](GAMEPLAY_CHANGES.md) for the implementation and verification notes, and [GAMEPLAY_FUN_REPORT.md](GAMEPLAY_FUN_REPORT.md) for the original prioritized assessment.

## Gameplay regression checks

```powershell
node --test tools/cases.test.mjs tools/table.test.mjs tools/ai-client.test.mjs tools/ai-packs.test.mjs tools/ai-errors.test.mjs tools/gameplay.test.mjs tools/online-packs.test.mjs tools/saved-packs.test.mjs tools/online-state.test.mjs tools/online-client.test.mjs tools/online-ui.test.mjs
node --test tools/modes.test.mjs tools/experience.test.mjs
node tools/test-word-data.js
node tools/analyze-starting-order.mjs
node tools/analyze-chaos.cjs 5000
```

The analysis scripts are isolated simulations and never connect to Firebase. They write `reports/starting-order-equal-turns.json` (legacy immediate-finish versus equal-turn results) and `reports/chaos-current-results.json`. The earlier `starting-order-results.json` and `chaos-balance-results.json` preserve the pre-change report baselines. Simulation is not a substitute for group playtesting.

## Lobby Rules and Start Eligibility

Online game can start only when team/player distribution is valid:

- 2-team game with exactly 2 players: allowed
- 3-team game with exactly 3 players: allowed
- Otherwise: requires at least 2 players per configured team

Start eligibility uses connected players, with at least one connected member on each configured team. Reserved disconnected seats do not satisfy the count. A round already underway can finish and its result is retained; the next round waits for a playable connected group and its assigned speaker. Disconnected seats keep their existing 90-second reconnect grace period. The lobby and board distinguish empty teams from reconnecting teams.

## Configuration

Available settings:

- `Number of Teams` (`2`-`4`)
- `Difficulty` (`easy`, `normal`, `hard`)
- `Points to Win` (`10`-`60`)
- `Round Duration` (`5`-`300` seconds)
- `Words per Round` (`1`-`15`)
- `Training Mode` (toggle)
- Category multi-select or single theme (mutually exclusive)

Input values are sanitized/clamped before game creation/start.

## data.js Model

Each entry should follow:

```js
{
  word: "Example Word",
  difficulty: "easy", // or "hard"
  description: "Short clue-oriented description."
}
```

Top-level objects:

- `categories`: broad gameplay pools
- `themes`: curated themed sets

## Data Curation Guidelines

Prioritize quality over filler:

- Use clueable, specific, game-relevant terms.
- Mix familiar and challenging terms.
- Avoid overly abstract/generic words.
- Avoid near-duplicates and trivial rewordings.
- Keep descriptions concise and useful.
- Rate the effort of giving a legal clue, not word length, spelling, pronunciation, or how advanced the subject sounds.
- Use `easy` when a distinctive function, scene, action, or association leads directly to the answer without saying its words or derivatives.
- Use `hard` when the obvious clue is blocked, several plausible answers compete, or the explanation needs multiple steps.
- Familiarity matters, but obscurity alone is not a reason to include a hard prompt.
- For new entries, write a short legal starter clue as a practical check on playability.

See [WORD_CURATION.md](WORD_CURATION.md) for examples, the October 2026 expansion audit, and maintenance rules.

Duplicate policy used in this project:

- **Soft Unique**: remove noisy repeats, but allow selective overlap where category fit is strong.

## Validator Tool

Run:

```bash
node tools/validate-data.js
```

Validator checks:

- missing/invalid fields
- invalid difficulty values (including casing that the game would fail to load)
- placeholder descriptions
- intra-category duplicates, including accent/punctuation/article variants (these fail validation)
- inter-category duplicates
- per-category/theme difficulty distribution
- distinct-answer totals and difficulty pools too small to fill a 15-word card

Use this after major data edits before release.

Run the focused pool-loading checks with `node tools/test-word-data.js`. They exercise the actual game loading functions for every category/theme and difficulty, combined pools, training hints, and recent-history filtering without contacting online services.

## Troubleshooting

## Online: "Unable to join lobby"

- Ensure lobby code is correct and not expired/ended.
- Ensure player name is unique in that lobby.
- Retry if transient sync/transaction conflict occurs.
- Confirm internet access and Firebase availability.

## Host cannot start game

- Verify enough players for configured team count.
- Wait for lobby status to become `ready`.

## Players vanish unexpectedly

- Presence cleanup removes stale players after inactivity threshold.
- Rejoin lobby if browser/tab was closed or connection dropped too long.

## Repetitive words

- Recent-word suppression is active.
- For narrow categories/themes, repetition can still happen once small pools are exhausted.
- Expand category/theme pools in `data.js` for longer sessions.

## Audit/history looks wrong

- History is stored as one row per round (vertical layout) per team.
- Duplicate event guards prevent repeated row creation.

## Multiplayer Regression Tests

Run the state, connection, and UI regression suites with Node.js 18 or newer:

```bash
node --test tools/online-state.test.mjs tools/online-client.test.mjs tools/online-ui.test.mjs
```

These tests use an in-memory Firebase adapter and execute the UI functions with a stubbed DOM. They cover stale roster writes, transaction retries, simultaneous clients, reconnects and old sessions, host handover, uneven teams, round controls, scoring, Chaos recovery, game ending, and offline-play regression. They do not contact the production database. See `ONLINE_RELIABILITY_AUDIT.md` for the resolution record and remaining real-browser checks.

The additional optional browser suite is `node tools/test-modes-browser.cjs` (requires Playwright; set `PLAYWRIGHT_MODULE` to its installed package path if it is not on Node's module path). It uses a temporary local Firebase-compatible adapter with transaction retries and Firebase empty-collection behavior. `--local-only` and `--online-only` select flows. `--cases-only` plays all five authored cases locally (including an offline run) and one complete two-client online case; `--cases-only --online-only --live` explicitly checks the live Firebase flow with a temporary lobby and no AI requests. `--table-only` runs the rebuilt Open Table local, eight-player/timer edge, custom-pack, online voice and online typed flows against the isolated backend. **Explicit live check:** `--online-only --live` creates temporary lobbies in the configured Firebase database and leaves them through the UI; it makes no AI requests. Ordinary tests never run that flag.

## Known Limitations

- Client-side API keys/config are not production-safe.
- No authentication/authorization layer for online lobbies.
- No server-authoritative anti-cheat or moderation logic.
- Clearing per-tab session storage creates a new online player identity.

## Roadmap

1. Move secrets/config to secure environment management.
2. Add auth and role-based lobby permissions.
3. Add Firebase Emulator and real-browser multiplayer integration coverage.
4. Add richer analytics for word usage, difficulty balance, and duplicates.
5. Add automated data CI checks using validator output thresholds.
