# Experience enhancements

29 October 2026

All additions follow the existing countdown, clue, selection, Chaos and equal-turn finish phases. Cosmetic feedback never changes scores, deadlines, eligibility or word visibility.

- Confirmed rounds show a perfect-card or team-best message. Perfect cards use the actual dealt card size. Lead changes appear after final scores settle. Motion and a quiet chime respect existing motion/mute/volume preferences; restored snapshots show static feedback without replaying it.
- The final-round notice includes the active team's score context. Classic shows points needed to tie/take the lead when within the configured card size; Chaos reports the current gap. A lead is never called a win before equal turns finish.
- The assigned online speaker gets a named handoff and a Start your turn action. Local turns name the team. The same countdown and full-duration word reveal remain in use.
- Online players may send applause, fire or laughter after confirmation and between turns. Reactions expire after 3.5 seconds, are rate limited per player, and carry the match, current turn and reviewed-turn identities. Clue/selection phases, stale commands and disconnected seats are rejected. Refresh/reconnect does not replay old reactions.
- AI/custom packs have a local saved-pack library. The parallel AI update owns its implementation and verification, including preserved metadata and hidden previews. Hosting still snapshots one fixed pack per lobby.
- Track rematches is optional in match setup. Natural wins and draws are recorded once; stopped matches are omitted. The tally survives rematches, refreshes and host handovers. Changes of player identity/team assignment reset the online tally; new local games reset it. Results can be shared as a PNG or downloaded when file sharing is unavailable. The card has scores, mode and best round, without player names or answer text.
- Invite friends shares or copies a clean URL with a four-letter lobby code. A fallback selectable link handles clipboard restrictions. Opening an invitation fills the code and opens the normal join dialog without autojoining. Screen wake lock is best effort, released on hidden/finished play, and denied requests do not retry on every render.

Online protocol is now **7**. All players must reload and create a new lobby after deployment.

## Verification

The pre-change focused baseline passed 133 tests. The final combined suite passed **174 tests**, including the AI and saved-pack suites. Focused added checks cover confirmed feedback/countdown cleanup, reaction expiry and reconnects, stale and illegal reactions, session result deduplication and roster changes, final-round/Chaos context, invite validation, and interrupted/denied wake-lock requests. Existing multiplayer and gameplay regression checks remain in place.

The browser smoke check passed a local five-word perfect round, hidden words during countdown, clearing feedback at the next countdown, stopping/rematching, PNG result download, and invitation prefill. Results had no horizontal overflow at 320, 390 and 1100 pixels, and no JavaScript errors were recorded. It uses a temporary local server and stubbed Firebase exports; it does not create production lobbies or make AI requests. See `experience-verification.json` for the recorded checks, `experience-mobile.png` for the mobile turn recap and `experience-result-card.png` for the exported card. Online concurrency is covered by the existing in-memory transactional adapter and focused reducer/UI tests, rather than a new live multiplayer session.
