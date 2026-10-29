# Four additional modes: implementation contract

29 October 2026

## Modes and scoring

- Boost Stakes: ordinary clue points, plus 2 on meeting a 60% card target, minus 2 otherwise, floor zero. A team needs 2 banked points to risk. After a scored risk turn it must complete one normal turn before risking again. Cancelled turns spend nothing.
- Double Stakes: one risk per team per match, requiring 3 banked points. Meet the same target to double clue points; otherwise lose 3 banked points and earn no clue points. Cancelled turns spend nothing. Both stakes modes retain the existing equal-turn finish and speaker queues. Risk is locked before words/countdown, and targets use the eligible distinct card size, including tiny custom packs.
- Open Table: 3–12 individual players; one untimed answer per turn. Guesses are locked privately or passed, then revealed together. Each correct guess earns its author and the speaker one point. Exact normalized matches are initially marked correct; shared review allows the reviewer to accept wording alternatives. The speaker confirms; the host may recover review when the speaker is disconnected. Everyone remaining in the starting roster receives the configured number of speaking turns. Late Open Table arrivals watch until rematch. Departed players retain history but are excluded from final ranking. There are no speed bonuses.
- Case Files: 2–12 players in one cooperative crew, authored suspect/evidence cases, rotating speakers, timed cards, a cumulative evidence meter and a final host-confirmed accusation. Default: six turns, five words, one evidence card per three correct answers. Smaller cards scale the evidence requirement. Three independent facts identify exactly one suspect; no model is asked to invent or adjudicate the solution. A correct final accusation wins together. A stopped case has no winner. Cooperative late arrivals join the crew.

## Settings and clarity

One mode selector, one short explanation, then mode-relevant settings. Stakes are separate from Chaos. Rerolls belong to Chaos. Open Table fixes the card size to one, is untimed and uses speaker cycles instead of a score target. Case Files uses a case selector and turn budget instead of teams/points. Training hints are disabled for Open Table because guessers would have unlimited assistance; Case Files and stakes retain speaker-only built-in hints. AI/custom packs work in all four modes. Local individual/crew play asks for named players; one-device Open Table explicitly passes and masks the device between private views. How to play and live phase instructions explain each mode in context. Incompatible controls are hidden/disabled with an explanation; irrelevant values never affect a match.

## Lifecycle and visibility

The existing countdown remains the authority for word revelation. New-mode listeners never see live answers. In Open Table, only the author sees a locked guess until review. No answers are evaluated visibly before all guesses lock. Guess text, selections, risk, evidence, scores and phases survive reconnects. Commands include match and turn identities, authorize their actor and are idempotent. Server clock drives timed cases. An untimed turn never receives automatic expiry.

Host election and per-connection presence remain shared. A disconnected seat retains its grace period. Hosts may pass a disconnected guesser; removed guessers are passed automatically. Removing an active Open Table speaker cancels an unscored clue turn; review can be recovered by the host. Starting requires the assigned speaker and enough connected original participants. Local play executes the same individual/crew reducer using synthetic local presence; it never writes Firebase.

Rematches reset score, risk resources, evidence, guesses and turn state; rotate starters; retain exhaustion decks. Open Table reseals the currently connected roster. Session team tallies are available for team modes; individual and cooperative modes use their own result presentation. Results, summary exports, sharing, invitations, reactions, audio, motion, exit and settings behavior are handled by the mode that owns the screen.

## Verification plan

Start with the 174-test baseline. Independently exercise scoring/targets/cooldowns and equal-turn finishes for both stakes modes; private guesses, equal speaking turns, typing preservation, passes, departures/reconnects and result recovery for Open Table; case solvability, cumulative evidence, shared clock, final accusation, failure and rematch for Case Files. Then run the existing regression suite and real-browser local/online UI flows, including narrow phones, large text, keyboard operation, short packs, refresh and stale/retried commands. Document what was checked and any material remaining limitations.
