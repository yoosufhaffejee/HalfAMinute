# Case Files: evidence and reconstruction

## Problem and research

The old evidence delivered conclusions (named exclusions and lists of remaining options). Its 54-theory solver measured information coverage, not the work a player performed. Shortening the budget did not address that problem. Replace those deductions, rather than simply increasing the number of choices or withholding more files.

Research consulted before implementation:

- [Golden Idol designer interview](https://www.gamedeveloper.com/design/case-of-the-golden-idol): players need to express deductions; limited inputs should still require reasoning. Remove clues that bypass a thought path, provide alternative routes, and avoid irrelevant walls of text.
- [Golden Idol thought paths](https://www.gamedeveloper.com/business/-the-case-of-the-golden-idol-i-used-frequent-testing-to-improve-its-mystery-solving): ground small puzzles in the incident, connect sequential and parallel deductions, and distinguish an author's logic checks from first-time human playtesting.
- [Sherlock Holmes Consulting Detective rulebook](https://cdn.svc.asmodee.net/production-spacecowboys/uploads/2025/11/59baa2_6b8d120337b04e9b881d8a135d0a189c.pdf): cooperative discussion and choosing investigative leads.
- [Codenames](https://www.czechgames.com/games/codenames) and [Decrypto](https://www.scorpionmasque.com/en/decrypto): simple communication rules can create interesting connections between words and information. Keep Half A Minute's familiar speaking round; do not graft their competitive rules into this cooperative mode.

Our application of these principles is an original design, not a reproduction of another game's cases or assets.

## Player loop and information order

1. A short briefing establishes the incident and the exact scope of the question. A compact location diagram provides orientation, without showing a solution path. Profiles describe people, not eligibility sets.
2. The rotating speaker chooses one of three leads. Existing curated words are references into data.js; no runtime AI, new vocabulary database, or generated judging.
3. Preserve the countdown, private speaker card, normal timed description, spoken guesses, and explicit confirmation. Receiving a word never displays its sealed evidence. Related prompts can recover the same exhibit; one exhibit opens once.
4. Confirmation reveals primary-source exhibits: timestamped logs, custody receipts, reference diagrams, device manuals and manifests. Excerpts contain observations and documented procedures, not conclusions such as 'this leaves only X'. Recovered words remain traceable in history.
5. Between rounds the crew compares exhibits in a notebook and drafts a shared reconstruction. Four event cards must be placed in real chronological order. No drag-only controls: place, move and remove buttons work on touch and keyboard. Two recovered exhibits must be attached to a case-specific inference question. Drafts do not receive correctness feedback.
6. At six default investigations, or when solving early, the host enters who/how/where and reviews those answers together with the timeline and evidence pair. There is one final submission. A correct suspect alone is insufficient: the explanation, chronology and supporting connection must also fit.
7. The debrief separately explains the theory, actual order and evidence connection, including the team's errors. Stopped games do not reveal answers. A replay is explicitly the same authored puzzle.

## Five distinct thought paths

| Case | Central reasoning | Reconstruction and connection |
|---|---|---|
| Midnight Transfer | Separate account identity, borrowed physical pass and operator; interpret remote-session and payee alias records. | Reconcile a camera crossing midnight with server time. Pair the export receipt and camera calibration to establish the photograph's place in the sequence. |
| Four-Minute Gallery | Identify the original from a visual hallmark, reconcile a slow clock and the alarm, then trace a removable transport cassette. | Order blackout restoration, alarm, photograph and departure. Pair the reference plate and contact sheet to establish what was photographed. |
| Night Train Exchange | Distinguish sensor time from alert delivery, borrowed service access from its owner, and luggage tags from storage locations. | Correct the sensor clock against departure. Pair the timetable and calibration ticket to establish whether the parcel moved before the journey. |
| False Signal | Compare a reference pattern, a documented coordinate transformation and altered image data; separate job submission from completion and raw files from previews. | Rebuild capture, upload, edit and purge. Pair image comparison with instrument rules (or independent edit audit). |
| Silent Encore | Apply the documented MID/SIDE formulas to matching stereo samples; distinguish a silent conversion from a later mute or hardware switch, and sign-off from operation. | Rebuild original export, silent export, mute and freight seal. Pair the hardware receipt and content journal to establish the contents changed on the same drive. |

Each case gets newly authored exhibits and an explicit worked solution. The bank solution changes from the previously exposed version. Other case solutions are also reauthored; simply remembering the old three choices does not close a new investigation.

## State and UX constraints

- Keep twelve exhibits, three leads, authored word mappings, the six-turn default, current difficulty/timing/card settings, local handoff, online voice-call assumption and 2–12 players.
- Draft reconstruction is shared between active crew members during discussion phases; the host alone controls final theory and submission. Local players use the same reducer. Validate every event, position and recovered evidence ID; duplicate events and evidence are rejected.
- Normalize absent Firebase collections, preserve drafts across refresh/reconnect, reject stale confirmation after any draft changes, and clear all draft/confirmation/hint state on rematch. Reorder/remove actions target stable event IDs in the transaction's current order, avoiding stale row positions during concurrent crew edits.
- Do not edit drafts during countdown, description or answer selection. Do not display notebook or reconstruction on a private word screen. The host can recover a departed speaker as before.
- Permit a final attempt with insufficient evidence rather than trapping a zero-correct game. Explain that missing support cannot produce a fully solved verdict. No hidden minimum evidence count is used as a substitute for puzzle depth.
- Three optional progressive nudges identify a useful comparison before giving a worked partial inference. They never choose the culprit for the crew. Hints are shared, disclosed on the result, and require two completed turns.
- Use compact source cards and grouped notebook sections. Expand the reconstruction when needed; avoid putting the full dossier and every control on screen at once. Public diagrams use HTML/CSS and text equivalents, with no image dependencies.
- Version the changed module graph and bump the online protocol so old lobbies cannot run a different final-answer contract.

## Verification and acceptance

- Content: all word references exist, 2 easy/2 hard per exhibit, unique prompts, valid dependencies, documented chronological timestamps and unique event IDs, valid proof pairs. Audit every worked answer against the primary sources. Remove named-exclusion clue prose and retire the misleading 54-theory difficulty metric.
- Reducer: independently complete all five cases; right theory with wrong timeline loses; right timeline with unsupported/wrong proof loses; reverse pair order is accepted; unopened evidence is rejected; no feedback before final; guest/host permissions, concurrent edits, stale final confirmations, zero-correct forced endings, refresh, departure and rematch.
- Baseline: focused existing mode/online tests. Browser: all five local cases, a complete two-client online case, offline-after-load case, countdown privacy, proof/timeline editing, missing evidence and final review. Check 320/390/1100px and larger text, with screenshots inspected.
- These checks can establish fair inputs and coherent behavior. They cannot certify subjective difficulty or replace fresh group playtests; report that limit honestly.
