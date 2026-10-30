# Authored Case Files — 30 October 2026

Five complete, fixed mysteries replace the original three binary-trait investigations. There are no AI requests for case construction, vocabulary, clue generation or judging.

| Case | Reasoning focus |
|---|---|
| The Midnight Transfer | Distinguish an account owner from its operator; combine access, authorisation routes and payee controls. |
| The Four-Minute Gallery | Correct a clock, separate discovery from removal, and trace a canvas through packing records. |
| The Night Train Exchange | Compare a time-stamped parcel movement with station stops, restricted routes and sealed compartments. |
| The False Signal | Use instrument rules, reference stars and raw-image checks to distinguish physical, calibration and editing faults. |
| The Silent Encore | Separate sound, file integrity and physical-media custody, then follow the freight trail. |

Each case has six suspects, three methods, three destinations, three investigation leads and twelve reliable evidence files. Its 48 word references all resolve to existing entries in `data.js`. Each evidence file has two easy and two hard prompts. The cases use the existing labels rather than introducing generated vocabulary or copying a second word database.

The speaker chooses the lead before drawing. The full countdown hides the card; the normal timer follows Go. Correct words open their mapped evidence only when scoring is confirmed. Multiple words can corroborate the same file once. Found files leave the pool; missed files remain available through related words. Follow-ups have explicit cross-lead prerequisites. Word use is tracked to vary subsequent attempts, and cards spread their words across available files. A nearly completed source can produce a smaller card instead of unrelated filler.

Confirmed rounds enter a shared evidence pause. The speaker or a recovery host continues after discussion. The notebook preserves opened disclosures across updates, holds profiles and collected facts, and offers one optional reasoning hint after two turns. A final theory requires culprit, method and destination. Review displays the complete named theory before one final submission; changed or stale confirmations are rejected. An early theory can be resumed while investigation turns remain. A forced end does not reveal the solution.

The default budget is six investigations. Normal word difficulty, card size and round time remain available. One-word cards require at least six investigations. AI/custom source, category/theme and training controls are incompatible and hidden, with underlying preferences retained for other modes. A prior AI editor or pending hosting pack cannot replace case vocabulary. No team target or individual score applies. Local play passes one device between speakers; online play uses the existing voice-call assumption and a 2–12-person cooperative crew. Late arrivals can join, and unscored speaker removals do not consume a turn.

Every solution is authored and fixed. The result screen defaults to a different case; replay is explicitly labelled as retaining the same solution. Debriefs explain all three answers and make missed evidence available. JSON and image exports use cooperative case progress.

## Verification

- **222 automated tests passed**, covering the existing gameplay, AI/custom packs, Open Table, online state/client/UI and experience suites, plus authored-case rules and content.
- All five mysteries have exactly one complete solution among 54 initial theories. No four evidence files determine the complete answer. Every clue agrees with its authored solution, every follow-up is reachable, and removing any single evidence route still leaves an alternative proof. Reachable proof sizes and vocabulary counts are recorded in [case-integrity.json](case-integrity.json).
- Every case plays to a correct final theory at Easy, Normal and Hard. Deterministic deals, 1/5/15-word settings, source/difficulty filters, no duplicate words, zero-correct rounds, turn budgets, wrong theories, stale confirmations, rematches, late joins, speaker removal, host recovery and Firebase omitted collections are covered.
- Built-in word-data checks passed: 125 real pool selections and six invalid-data cases.
- The browser suite completed all five local cases, actual timer expiry, the full theory confirmation, debrief, next-case reset and a result-card download. The bank case completed with **all networking disabled after the app loaded**.
- Eight layout checks passed for evidence and theory screens at 320, 390 and 1100px, including 150% text at 320px. No horizontal overflow or browser JavaScript errors. [Browser results](cases-browser.json).
- A complete two-client case passed against both the isolated backend and **live Firebase**, including private word roles, shared discoveries, selection refresh and a different-case rematch. The temporary live lobby was closed through the UI and verified with no remaining players. [Live results](cases-live.json).

Protocol 11 and versioned assets require all players to reload and start a new lobby. Offline play here means local gameplay after the app and its dependencies have loaded; this change does not introduce a service worker for a first visit without internet. The existing client-trusted Firebase model remains in place. These technical checks establish consistency and lifecycle behavior; group play feedback will still inform pacing and clue clarity.
