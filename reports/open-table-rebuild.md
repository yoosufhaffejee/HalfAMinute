# Open Table rebuild — 30 October 2026

Open Table now uses a complete numbered word card and speaker-controlled awards. Local play is spoken, on one device. Online matches offer voice-call or typed-clue play at match start.

## Rules and setup

- 3–8 players; the first local name speaks first. Everyone receives the chosen 1–3 speaking turns. Rematches rotate the starter.
- Words per card follows the normal 1–15 setting (default five), with the same deterministic draw, difficulty mix, deck exhaustion and AI/custom sources.
- Open Table has its own 60-second default, configurable from 15–300 seconds, or Unlimited. Classic’s timing preference is preserved. The countdown always precedes the full timer and answer reveal.
- The speaker awards each word to the first correct guesser. Select every genuinely tied guesser, or Nobody for a skipped/unanswered word. Award selections are explicit, repeat-safe updates.
- Default scoring gives every selected guesser +1 and the speaker +1 **per solved word**, including a tie. Settings also supports guesser-only scoring. Speaker self-awards and awards to spectators are rejected.
- A confirmed round commits scores once, records awards, and advances the speaker. Awards can be changed before confirmation.

## Online and typed play

Voice-call play uses the group’s existing call; the app does not transmit audio. The live answer card belongs to the speaker. Connected players see shared review after the round.

Typed play focuses one numbered word at a time. The speaker sends clues, reads guesses in transaction arrival order, and accepts the first correct answer, including sensible spelling/phrasing alternatives. Awarding or skipping advances to the next unhandled word. Skipped words may be revisited before the round ends. Finishing the card or expiring the timer opens review, where tied guessers can be added. The speaker judges ties; network arrival order is not a measurement of simultaneous speech.

Only clues and a guesser’s own submissions appear on the guesser’s live screen. The speaker sees incoming guesses. Messages have stable IDs, validation and per-word limits (6 clues; 4 guesses per guesser). Duplicate messages, old-word submissions, premature countdown actions and late timed submissions are rejected. Word-changing controls remain locked until a fresh shared snapshot confirms the transition. Timer ticks do not rebuild the chat form; updates preserve unsent text, focus and scroll position. Failed sends keep the draft. Full page reloads restore committed messages and awards, but discard unsent drafts.

Temporary disconnects preserve the seat. A connected host can recover an abandoned live turn or scoring review. Actual speaker removal cancels an unscored live turn; completed scoring is retained. Late arrivals join the rotation on rematch. A new turn requires three connected participants. Departed players keep their historical awards but leave the ranking.

Seven online reactions now cover applause, fire, laughter, shock, clever clues, close calls and brutal misses. Existing rate limits, expiry, clue-phase restrictions and replay suppression remain in force.

## Implementation and verification

`gameplay/table-state.js` contains the pure Open Table reducer and view. `gameplay/table-ui.js` contains the mode surface. Existing party dispatch routes Open Table through these modules; Classic, Chaos, Stakes and Case Files retain their own scoring paths. Protocol 10 and versioned assets require everyone to reload and create a new lobby.

- **211 automated tests passed**, covering the existing AI, pack, gameplay, online state/client/UI and experience suites, plus Open Table baseline and edge cases.
- The isolated browser suite passed local spoken play, eight players with ten words, both scoring settings, ties, actual timer expiry, Unlimited, custom packs, equal turns, sharing, refresh and rematch.
- Three-browser online voice and typed flows passed against the isolated Firebase-compatible adapter, including omitted empty collections and committed message ordering.
- Twelve layout checks passed: voice review, eight-player/ten-word review and typed speaker screens at 320, 390 and 1100px, plus 150% text at 320px. No horizontal overflow or browser JavaScript errors.
- Both three-client flows also passed against **live Firebase**, including review refresh and rematch after host handover. All players left through the UI; both test lobbies were verified as ended with no members or presence records (the existing lifecycle retains an empty ended record).
- Detailed browser results: [open-table-browser.json](open-table-browser.json), [open-table-live.json](open-table-live.json).

The app retains its existing client-trusted Firebase model. Live screen masking is not server-side anti-cheat enforcement. Technical tests establish rule and lifecycle behavior; fairness in spoken guessing still depends on the speaker’s judgement and the group’s agreement.
