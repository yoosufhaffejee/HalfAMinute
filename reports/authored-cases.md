# Case Files: evidence and reconstruction

The five mysteries have been reauthored around primary-source exhibits. The previous clues stated named exclusions and remaining answers; the replacement makes players interpret records, rebuild events and support a specific connection. The detailed pre-implementation plan and research are in [case-reconstruction-design.md](case-reconstruction-design.md).

## What players do

Choose a lead, describe the familiar built-in words, and confirm the correctly guessed words to recover documents. Receiving a prompt never reveals its sealed document. Related prompts can open the same exhibit once, and the recovered prompt remains attached to that exhibit. Found documents leave the word pool; missed documents remain obtainable. The existing countdown, timer, handoff and private online speaker screen are retained.

During discussion the crew drafts a four-event timeline and selects two recovered exhibits supporting the case's connection question. The notebook groups records by lead; selected documents can be expanded together for comparison. Structured receipts, coordinate diagrams and channel sample strips replace the old lists of conclusions. All specialist procedures needed to interpret them are included in the case.

The host records who, how and where, then reviews the complete reconstruction. A correct name alone does not solve the case: all three answers, the chronology and a supported evidence pair must fit. There is no per-field correctness feedback before final submission. Zero-evidence investigations can still end with an unsupported final attempt. The debrief explains each part and distinguishes matched and missed components.

Six investigations remains the default. Existing 4–12 turn settings, word counts, difficulty and round timing remain available. Three optional progressive nudges unlock after two confirmed turns. Replays are labelled as the same authored solution. No AI service constructs cases, supplies words, or judges answers.

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

The online protocol is now **12**, with versioned modules and CSS. Everyone must reload and create a new lobby. The existing client-trusted Firebase model and usual online voice-call assumption remain. Local gameplay works after the application has loaded; no first-visit offline service worker has been introduced.

## Verification

- **227 automated tests passed** across the existing baseline and the case rules. Focused case checks also pass after the concurrent-edit adjustment.
- Every case completed independently at Easy, Normal and Hard. Tests cover wrong timelines with correct three-part answers, wrong and reversed evidence pairs, unavailable/duplicate exhibit IDs, shared edits, stale confirmations, private phases, progressive nudges, zero-evidence forced endings, rematches and Firebase-empty collections.
- All five local browser cases completed, including private countdowns, timer expiry, source documents, timeline placement, proof selection, final review, debrief and next-case reset. Bank also completed with all network access disabled after load.
- Evidence, reconstruction and both visual exhibits passed layout checks at **320, 390 and 1100px**, plus 150% text at 320px. Screenshots were inspected. Source comparison is expandable to keep the final form compact.
- The two-client browser flow passed against both the [isolated backend](cases-online-browser.json) and [live Firebase](cases-live.json): shared guest edits, refresh persistence, changes invalidating host review, full submission and rematch. The temporary live lobby was closed through the UI and verified empty. [Local cases and layout results](cases-browser.json) are recorded separately.

Automated and browser checks establish content consistency and lifecycle behavior. Fresh group play is still needed to judge the actual difficulty and enjoyment; clue counts are not used as a proxy.
