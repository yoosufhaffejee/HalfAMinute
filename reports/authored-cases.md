# Case Files: evidence and reconstruction

The catalogue contains eight case files and 24 authored scenarios built around primary-source exhibits. Three accessible party mysteries join the five original reconstructions. Case pickers label and sort Easy, Medium and Hard independently of word difficulty. The [expansion plan and research](eight-cases-plan.md) records the new designs; the original reconstruction plan is in [case-reconstruction-design.md](case-reconstruction-design.md).

## What players do

Choose a lead, describe the familiar built-in words, and confirm the correctly guessed words to recover documents. Receiving a prompt never reveals its sealed document. Related prompts can open the same exhibit once, and the recovered prompt remains attached to that exhibit. Found documents leave the word pool; missed documents remain obtainable. The existing countdown, timer, handoff and private online speaker screen are retained.

During discussion the crew drafts a four-event timeline and selects two recovered exhibits supporting the case's connection question. The notebook groups records by lead; selected documents can be expanded together for comparison. Structured receipts, coordinate diagrams and channel sample strips replace the old lists of conclusions. All specialist procedures needed to interpret them are included in the case.

The host records who, how and where, then reviews the complete reconstruction. A correct name alone does not solve the case: all three answers, the chronology and a supported evidence pair must fit. There is no per-field correctness feedback before submitting an attempt. An unsuccessful attempt confirms only the parts the crew actually got right. Unresolved answers, their explanations and unopened exhibits stay hidden unless the host explicitly confirms a shared end-of-case reveal. The host can retry with the same notebook, answers and previously confirmed parts; an early attempt can also return to investigation while its original budget remains. Full explanations and missed exhibits appear after a complete solve or confirmed reveal of the current scenario. Reveal does not count as solving. Zero-evidence investigations can still submit an unsupported attempt.

Six investigations remains the default. Existing 4–12 turn settings, word counts, difficulty and round timing remain available. Three optional progressive nudges unlock after two confirmed turns. Retrying revises the existing investigation; choosing the same case with “Start over” resets progress and word deals for its fixed mystery. Finished cases offer confirmed reveal, fresh same-scenario replay and a guaranteed different scenario draw. No AI service constructs cases, supplies words, or judges answers.

## Author coherence review (contains solutions)

| Case | Source-to-conclusion chain |
|---|---|
| Midnight Transfer | A2 gives Mira physical possession of B1 at A3's 23:54 export. N2 converts camera 00:04 to bank 23:58, after that export. N1 ties cached token R8 to the external human-approved session; N3 records approval and settlement. M1/M2/M3 trace Q7 through ledger 88 to the dormant supplier, despite the charity display name. |
| Four-Minute Gallery | X1 or X2 identifies the original's broken crescent in T4. T2 converts wall 21:02 to reference 21:06, after T1's alarm. T3 distinguishes the sealed wall fitting from the sliding cassette. X3/C1 trace R12 into T7; C3 identifies carrier J4 as Jules, and C2 maps zone K to the van. |
| Night Train Exchange | R2 converts sensor 02:17 to reference 01:57, before R1's departure. R3's 02:18 is delivery, not movement. P2 records service key P9, which P3 loans to Theo during the relevant interval. D1/D2 trace B12 through G4-6 to the station cage; D4 independently corroborates the location. |
| False Signal | I2's reference cells remain fixed while two cells are added. I3's reversal cannot produce that change. I4's 22:18 SV8 write maps through S3 to console A and through S1 to Remy. O1 is an upload submission; O2 is the completed, retained full raw upload. O3 removes the local original and distinguishes the laptop thumbnail. |
| Silent Encore | A1 supplies matching audible stereo samples. A3 defines SIDE as (L − R) / 2, so A2's SIDE export cancels them to zero at 22:41, before the mute. H1/H2 identify D4's operator as Jules; H3 preserves S17's hardware identity. F1/F2 trace original A9 through case N7 and bay 2 to the lighting case, with F3 corroboration. |

These are author consistency checks, not independent first-time playtests. The old '54 theories' and minimum-clue measurements are retired: they did not measure human reasoning difficulty.

## Shared state and compatibility

Local and online play use the same case reducer. Active crew members can change the reconstruction during discussion; the host alone controls the final three answers and submission. Event edits use stable event IDs against the current transaction, so concurrent moves cannot act on the wrong row. Every proof ID must identify an already recovered exhibit, and the two IDs must differ. A change to any answer, timeline or evidence selection invalidates an older final confirmation.

Drafts survive refresh, temporary disconnection and host replacement. Firebase-omitted empty collections are normalized. Draft editing is blocked during countdown, description and answer selection. Rematches clear the reconstruction, assessment, hints and word history. Stopped games reveal no solution.

The online protocol is now **15**, with versioned modules and CSS. Everyone must reload and create a new lobby. Retry commands increment the turn command ID without spending an investigation, rejecting stale submissions from the previous attempt. The existing client-trusted Firebase model and usual online voice-call assumption remain. Local gameplay works after the application has loaded; no first-visit offline service worker has been introduced.

## Verification

- **234 automated tests passed** across the existing baseline and all eight case rules, including tier ordering, partial-result privacy, preserved retry state, stale-attempt rejection, early retry/resume and fresh restart reset. New-case browser results are linked in the expansion plan.
- The [focused retry browser checks](case-retry-browser.json) passed locally and with two clients: hidden unresolved answers and unopened exhibits, safe summary/share output, preserved correct answers, retry and fresh restart. Four responsive layout checks passed, including large text, with the [failure screen inspected](case-retry-mobile.png).
- Every case completed independently at Easy, Normal and Hard. Tests cover wrong timelines with correct three-part answers, wrong and reversed evidence pairs, unavailable/duplicate exhibit IDs, shared edits, stale confirmations, private phases, progressive nudges, zero-evidence forced endings, rematches and Firebase-empty collections.
- All five local browser cases completed, including private countdowns, timer expiry, source documents, timeline placement, proof selection, final review, debrief and next-case reset. Bank also completed with all network access disabled after load.
- Evidence, reconstruction and both visual exhibits passed layout checks at **320, 390 and 1100px**, plus 150% text at 320px. Screenshots were inspected. Source comparison is expandable to keep the final form compact.
- The two-client browser flow passed against both the [isolated backend](cases-online-browser.json) and [live Firebase](cases-live.json): shared guest edits, refresh persistence, changes invalidating host review, full submission and rematch. The temporary live lobby was closed through the UI and verified empty. [Local cases and layout results](cases-browser.json) are recorded separately.

Automated and browser checks establish content consistency and lifecycle behavior. Fresh group play is still needed to judge the actual difficulty and enjoyment; clue counts are not used as a proxy.

Scenario authoring and replay/reveal checks: see [editing-case-variations.md](editing-case-variations.md), which contains spoilers. Scenario IDs are shared match state and never rerolled by a reconnect or word round.
