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
- Round history/audit table (mobile-friendly vertical layout)
- Anti-repetition behavior with recent-word suppression

## Project Files

- `index.html`: UI and modal structure
- `script.js`: core game logic, online sync, prompts, gameplay state
- `online/state.js`: transactional lobby membership, turn phases, host election, and speaker queues
- `online/client.js`: Firebase connection lifecycle, presence, reconnects, and turn commands
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
- Google Generative AI SDK (`@google/generative-ai`)

Important:

- Online mode requires network access to Firebase.
- AI generation requires a valid Gemini API key.
- Current keys/config are inline in `script.js`; move to secure env/config before production deployment.

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
- Online protocol version 2 requires a newly created lobby; old-version lobbies show a message asking the host to recreate them.
- Each team rotates its own speaker queue. Empty teams are skipped safely without changing the player-count eligibility rules.

## AI Mode

- Enter topic and generate a playable list.
- Prefix topic with `!` for strict scope generation.
- Generated entries are cleaned and deduped before play.

## Training Mode

- Enable `Training Mode` in settings.
- During a speaker turn, the game shows each active word with its short description.
- Hints are hidden when the round moves to answer selection.

## Gameplay Flow

1. Speaker starts round.
2. Timer runs (`Round Duration`).
3. Speaker describes words without saying the target word.
4. After timer/end-round, correct words are selected.
5. Team gains one point per correct answer.
6. Speaker rotates and next team/round continues.
7. First team to `Points to Win` wins.

## Lobby Rules and Start Eligibility

Online game can start only when team/player distribution is valid:

- 2-team game with exactly 2 players: allowed
- 3-team game with exactly 3 players: allowed
- Otherwise: requires at least 2 players per configured team

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
