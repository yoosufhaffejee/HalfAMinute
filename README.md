# Half A Minute

Half A Minute is a fast, team-based word clue game inspired by **30 Seconds**.  
Play locally on one device, or run real-time online lobbies with host controls, team balancing, and live state sync.

## Features

- Offline local play
- Online multiplayer lobbies (host + join by code)
- AI word generation mode (topic-based and strict-topic mode)
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

## Project Files

- `index.html`: UI and modal structure
- `script.js`: core game logic, online sync, prompts, gameplay state
- `online/state.js`: transactional lobby membership, turn phases, host election, and speaker queues
- `online/client.js`: Firebase connection lifecycle, presence, reconnects, and turn commands
- `gameplay/rules.js`: deterministic word decks, presets, starting order, pacing, and recap helpers
- `gameplay/ai-client.js`: lazy Firebase AI Logic client and App Check configuration
- `gameplay/ai-errors.js`: safe, categorized generation feedback
- `data.js`: categories, themes, word metadata
- `style.css`: styling
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
- Online protocol version 4 requires a newly created lobby; old-version lobbies show a message asking the host to recreate them. The new version keeps all clients on the same scheduled countdown start.
- Each team rotates its own speaker queue. Empty teams are skipped safely without changing the player-count eligibility rules.

## AI Mode

- Enter topic and generate a playable list.
- Prefix topic with `!` for strict scope generation.
- Generated entries are cleaned and deduped before play.
- AI SDK loading and App Check initialization happen on the first generation request, so AI availability does not block local or online play.
- The pinned text model is `gemini-3.5-flash-lite`, with a bounded output size and no automatic generation retries.
- Failed requests keep an existing pack playable and restore generation/editing controls.

### Firebase AI setup

The existing project `halfaminute-01` uses the Gemini Developer API through Firebase AI Logic. Its web app has a score-based reCAPTCHA Enterprise App Check provider restricted to `yoosufhaffejee.github.io`. AI Logic App Check enforcement is enabled. The existing browser API key keeps its live-domain referrer restrictions and allows the Firebase App Check API in addition to its existing APIs. Database rules and enforcement were not changed.

The project remains on Spark, with billing disabled. Free-tier availability and quotas still apply. See [Firebase AI Logic pricing](https://firebase.google.com/docs/ai-logic/pricing).

Local gameplay and automated tests need no AI credentials. Live AI generation is intentionally restricted to the production origin. For local AI integration work, use a separately restricted development Firebase app/key and a registered private App Check debug token; never add localhost to the production reCAPTCHA domain list or commit a debug token. The CLI smoke test uses a temporary debug registration and removes it immediately afterward.

See [Firebase setup](https://firebase.google.com/docs/ai-logic/get-started?platform=web) and [App Check](https://firebase.google.com/docs/ai-logic/app-check) for administrative changes. The App Check service identifier for AI Logic is `firebaseml.googleapis.com`; the runtime API is `firebasevertexai.googleapis.com`.

## Training Mode

- Enable `Training Mode` in settings.
- During a speaker turn, the game shows each active word with its short description.
- Hints are hidden when the round moves to answer selection.

## Gameplay Flow

1. Speaker starts round. A visible 3, 2, 1, Go lead-in plays before any words or round time are shown. The full configured round duration starts afterward, using a shared scheduled time online.
2. Timer runs (`Round Duration`).
3. Speaker describes words without saying the target word.
4. After timer/end-round, correct words are selected.
5. Team gains one point per correct answer.
6. Speaker rotates and next team/round continues.
7. First team to `Points to Win` wins.

The initial starter is randomized. Rematches keep the roster/settings and rotate the starter; immediate victory on reaching the target is unchanged. Scores and Chaos resources reset for the new match identity. Word exhaustion history carries across rematches for the same group.

## Chaos rules

- The map changes each turn. Start, the tile before the finish, and a winning earned move have no effect. Resolve one landing effect, without chaining. A zero-correct turn can still land on an effect.
- Boosts add 1 or 2; slips lose 1 or 2; bombs lose **up to 3 points**, with a floor of zero. Effect weights remain unchanged.
- One shield blocks a landing penalty or incoming steal loss, then is consumed. Shields do not stack. A blocked steal still gives the stealing team its +1; the victim keeps their point. Steals target the leading opponent, with seeded random ties.
- Movement allows 360 ms per space (at least one second), followed by a 1.4-second landing reveal, a 1.4-second effect, and 2.4 seconds to read the result. A typical effect turn takes 6–7 seconds. Safe landings skip the effect stages and hold the result for 1.6 seconds; wins hold it for two seconds. The result card remains until the next round starts. Reduced motion shows the outcome immediately while the online authoritative deadline still applies.
- The **optional reroll prototype**, off by default, offers one reroll per team per match after an eligible effect. The speaker chooses within five seconds, must accept the new result, and cannot reroll again that match. No choice defaults to keep; the current host recovers the timeout if the speaker disconnects/leaves.

Word dealing tracks normalized answers and separate easy/hard exhaustion cycles. A difficulty reshuffles only after its own pool runs out; the other difficulty's deck history stays intact. No card repeats the same normalized answer. Narrow packs may repeat after exhaustion. The explicit match-summary download includes counts, scores, effects, and phase timings, with no player names or answer text. Online phase timings live in the normal shared match history; no separate analytics service is used.

See [GAMEPLAY_CHANGES.md](GAMEPLAY_CHANGES.md) for the implementation and verification notes, and [GAMEPLAY_FUN_REPORT.md](GAMEPLAY_FUN_REPORT.md) for the original prioritized assessment.

## Gameplay regression checks

```powershell
node --test tools/ai-client.test.mjs tools/ai-errors.test.mjs tools/gameplay.test.mjs tools/online-state.test.mjs tools/online-client.test.mjs tools/online-ui.test.mjs
node tools/test-word-data.js
node tools/analyze-starting-order.mjs
node tools/analyze-chaos.cjs 5000
```

The analysis scripts are isolated simulations and never connect to Firebase. They write `reports/starting-order-results.json` and `reports/chaos-current-results.json`. The earlier `chaos-balance-results.json` preserves the pre-change report baseline. Simulation is not a substitute for group playtesting.

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
