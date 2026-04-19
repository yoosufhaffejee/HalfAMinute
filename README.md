# Half A Minute

Half A Minute is a fast, team-based word clue game inspired by **30 Seconds**.  
Play locally on one device, or run real-time online lobbies with host controls, team balancing, and live state sync.

## Features

- Offline local play
- Online multiplayer lobbies (host + join by code)
- AI word generation mode (topic-based and strict-topic mode)
- Category and theme filtering
- Difficulty selection (`easy`, `normal`, `hard`)
- Configurable team count, points-to-win, round time, and words per round
- Round history/audit table (mobile-friendly vertical layout)
- Anti-repetition behavior with recent-word suppression

## Project Files

- `index.html`: UI and modal structure
- `script.js`: core game logic, online sync, prompts, gameplay state
- `data.js`: categories, themes, word metadata
- `style.css`: styling
- `tools/validate-data.js`: word-data validation and quality audit utility

## Quick Start

1. Clone/download the project.
2. Open `index.html` in a modern browser.
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
- Presence heartbeat + stale cleanup handle dropped tabs/connections.

## AI Mode

- Enter topic and generate a playable list.
- Prefix topic with `!` for strict scope generation.
- Generated entries are cleaned and deduped before play.

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
- Use `easy` for broadly recognizable entries.
- Use `hard` for deeper or less obvious references.

Duplicate policy used in this project:

- **Soft Unique**: remove noisy repeats, but allow selective overlap where category fit is strong.

## Validator Tool

Run:

```bash
node tools/validate-data.js
```

Validator checks:

- missing/invalid fields
- invalid difficulty values
- placeholder descriptions
- intra-category duplicates
- inter-category duplicates
- per-category/theme difficulty distribution

Use this after major data edits before release.

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

## Known Limitations

- Client-side API keys/config are not production-safe.
- No authentication/authorization layer for online lobbies.
- No server-authoritative anti-cheat or moderation logic.
- Browser refresh resets local client state.

## Roadmap

1. Move secrets/config to secure environment management.
2. Add auth and role-based lobby permissions.
3. Add reconnect-aware state restoration for mid-round reconnects.
4. Add richer analytics for word usage, difficulty balance, and duplicates.
5. Add automated data CI checks using validator output thresholds.
