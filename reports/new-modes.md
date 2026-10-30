# Four new modes

Open Table’s original design below was replaced by the [Open Table rebuild](open-table-rebuild.md) on 30 October 2026.
30 October 2026

## Behavior

Boost Stakes and Double Stakes share the existing timed team game, speaker queues, deterministic dealing, review and equal-turn finish. Risk targets use the actual eligible distinct card size. Choices lock before the countdown; point requirements, alternating-turn cooldowns and once-per-match resources are enforced in the transactional reducer and mirrored locally. Only confirmed turns spend a risk. Score previews, recaps, history, final breakdowns and exports explain the stakes result.

Open Table uses 3–12 individual players, one untimed answer, simultaneous private guess locking and a shared review. A correct guess credits both the guesser and speaker. It preserves the other difficulty's exhaustion deck while alternating normal-mode difficulty. A two-player table is explicitly rejected because its scores could never separate. Starting rosters are sealed, everyone receives the configured speaking opportunities, and rematches admit waiting arrivals. Local play masks the device between private views. Long typed answers and invalid local names have recoverable validation.

Case Files uses 2–12 cooperative players and three authored investigations with SVG suspect portraits. A cumulative evidence meter unlocks facts, with surplus progress carried forward. Each case/culprit combination is uniquely solvable; every pair of independent facts identifies one suspect. The next turn becomes a crew accusation when all evidence is earned or the turn budget ends. The host's confirmed suspect must match the displayed choice, protecting against stale confirmations. Late cooperative arrivals join the crew. There is one shared solved/unsolved outcome; stopped cases declare neither.

Both individual/crew modes run the same pure reducer online and locally. Local presence is synthetic and never written to Firebase. Online they use the existing connection identities, transactional writes, server clock and host election. Empty collections omitted by Realtime Database are hydrated before use. Guessers' departures, missing speakers, host review recovery, actual roster changes, grace periods, stale sessions and rematches have explicit handling. No departure can reveal a clue before Go, and a table abandoned by all original participants ends without inventing a winner.

## Interface and compatibility

- One game selector with a short explanation, mode-specific setup, contextual How to play and phase-specific instructions. Irrelevant controls are hidden/disabled; their old preferences are preserved for later modes.
- Stakes choices sit alongside the normal start action. Preview arithmetic updates during answer selection. Chaos and rerolls remain exclusive to Chaos.
- Named local device passes, private typed guesses, retained typing across other players' updates, keyboard controls, screen-reader phase announcements, restored focus and reduced-motion behavior.
- Case profiles use responsive SVG illustrations and a compact evidence board, with profiles disclosed during investigation and expanded for accusation. Confirming the named suspect follows the cards.
- Separate individual/crew score/result presentation, anonymous summary exports, PNG sharing/download fallback, invitation links, history and expiring between-turn reactions.
- Existing AI/strict-topic/saved-pack logic remains. New local modes support larger pasted packs; online packs keep the existing 150-answer bound. Custom packs never receive built-in training hints. Built-in timed games retain speaker-only hints.
- Failed leave attempts keep the active screen and permit retry. Intentional exits suppress stale snapshots while closing, stop timers/audio, release wake lock and restore the setup screen.
- Online protocol **8** prevents mixing incompatible rules. All players must reload and create a new lobby after release.

## Verification

The pre-change baseline was 174 tests. The final automated suite passed **199 tests**, including scoring bounds, actual/tiny-card targets, risk requirements and cooldowns, cancellation, equal-turn endings, private/retried/stale commands, connected-seat rules, untimed client behavior, host recovery, Firebase empty collections, all-pass review, departures during countdown, abandoned tables, case solvability and accusation guards. Open Table scores and equal speaking turns were independently checked over multiple group sizes and 1–3 cycles. The existing AI, pack, gameplay, UI, presence, reconnect and Chaos regressions remain in the suite. Word-data checks passed 125 real pool selections, training hints, recent history and six validator failure cases.

Real-browser local scenarios cover all four modes, masked handoffs, actual timer expiry, score previews, resource reset, individual result sharing, cooperative evidence/accusation, larger local custom packs, recovery after invalid pasted answers and switching back to Classic. Layout checks cover 320, 390 and 1100 pixel widths and 150% text at phone width.

Multi-client browser scenarios ran against an isolated Firebase-compatible adapter with real transaction contention/polling, including the database's empty-collection behavior. Open Table used three clients, including a typed draft surviving someone else's submission, refresh and a rematch. Stakes and Case Files used two clients. A separate live Firebase pass verified all four modes with the actual SDK/database; temporary test players explicitly left each room afterward. Neither browser suite requested AI generation.

Evidence: `new-modes-browser.json`, `new-modes-local-browser.json`, `new-modes-live.json`, `boost-stakes-mobile.png`, `double-stakes-mobile.png`, `open-table-review-mobile.png` and `case-files-mobile.png`.

## Limits

These checks establish the implemented rules and technical flows, not measured enjoyment or a statistically validated difficulty balance. The initial cases are compact introductory investigations. The project retains its existing client-trusted, unauthenticated Firebase room model; private views enforce interface visibility, not server-side anti-cheat. Local games retain the existing behavior that a full page reload starts setup again. Online reconnects restore committed state, while an unsubmitted typed draft is retained during live updates but is not persisted across a full reload. No database rules, authentication, billing, microphone/video service or AI model configuration were changed.
