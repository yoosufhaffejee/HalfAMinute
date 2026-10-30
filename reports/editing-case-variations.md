# Editing Case Files variations

**Author reference: contains puzzle details and solutions.**

Each of the eight cases now has three scenarios: `original`, `alternate-a`, `alternate-b`. Scenario IDs are stored in `game.party.scenarioId`, independent of the word-dealing seed. Every clue, profile, hint, theory option and debrief resolves through `caseStory(game)` in `gameplay/cases.js`.

## Where to edit

- **Alternate scenarios:** `gameplay/case-variants.js`. `buildCaseVariant` has a clearly named branch for each case. Within a branch, `b` selects alternate B; otherwise the branch builds alternate A. Change the culprit, records, timeline, hints and debrief together. The short `rows`, `prose`, `storage` and `timeline` helpers apply authored changes to an isolated clone; base cases are never mutated.
- **Original scenarios:** `gameplay/case-content.js` (five original titles) and `gameplay/case-party-content.js` (cake, duck, ghost). Shared wording in these files also affects alternates unless their recipe overrides it.
- **Word references and follow-up prerequisites:** `gameplay/case-vocabulary.js`. All variants retain the same twelve exhibit IDs and curated dictionary references. Receiving a prompt still does not reveal its exhibit.
- **Selection, replay and reveal rules:** `gameplay/case-state.js`; scenario resolver/selector in `gameplay/cases.js`; end-of-case controls in `gameplay/case-ui.js`.

## What varies (spoilers)

| Case | Original / A / B culprits | Other authored changes |
|---|---|---|
| Great Cake Escape | Evie / Ben / Cleo | Apron observations, destination (picnic chest / balloon tent / kitchen cupboard), photo timing and storage trail. |
| Captain Quack | Pippa / Luca / Rory | Cap observations, destination (basket / cupboard / shed), pump timing relative to the gate and storage records. |
| Ghost / Popcorn | Beau / Dex / Ivy | Badge observations, destination (hamper / sack / drawer), storage and lights-out order. |
| Four-Minute Gallery | Jules / Mara / Lina | Personal transport credential, destination (van / crate / roof), independent receipts and alarm/restoration order. |
| Night Train Exchange | Theo / Mara / Nova | Key custody (loan versus retained ownership), culprit and alert delivery relative to departure. The parcel remains in the station cage; this case's physical route is deliberately retained. |
| Midnight Transfer | Mira / Jon / Sana | Physical export pass and access explanation, export before/after the camera portrait, receiving route and account type (supplier / personal / charity). |
| False Signal | Remy / Ash / Kit | Console bookings, handovers, preview versus full-file transfers, upload/purge order, original location (feed / server / laptop). |
| Silent Encore | Jules / Lina / Kit | Console operator, storage bay (lighting / drums / van), freight/mute order, and SIDE on matching channels versus MID on opposite channels. |

The central puzzle family stays recognizable; these are not eight completely different rule systems. In particular, a variant need not change the method choice if its changed operator, timing and destination already form a different supported outcome. No AI invents clues at runtime.

## Adding another variant safely

Add an ID to `SCENARIO_IDS` **and** an explicit authored branch; merely adding an ID would reuse the A recipe. Keep existing IDs stable for saved matches. All references must agree: scene and profiles, raw records, chronology, the accepted evidence pairs, hints and all debrief paragraphs. Do not update only `solution`.

New investigations draw deterministically from the match seed. “Play a different scenario” excludes the current ID. “Replay same scenario” preserves it but clears progress, hints, draft, assessment and reveal status. “Try this case again” revises an unrevealed failed attempt with its notebook intact. Revealing is host-only, requires UI confirmation, is shared across the crew and never changes the result into a solve. Revealed attempts cannot be revised into a win; a fresh replay is available and labelled as already seen.

Protocol 15 requires all online players to reload and start a new lobby. No backend service or runtime AI dependency was added.

## Verification

234 automated tests pass, including independent completions of all 24 scenarios, three distinct culprits per case, chronological ordering, vocabulary/dependency validity, wrong-answer rejection, stable same replay, guaranteed different draws and reveal authorization. Local browser checks cover alternate-specific clues, reveal confirmation/cancel, correct current-scenario debrief, unchanged result, replay/shuffle and four responsive layout checks. The two-client browser check covers scenario-aware answers, shared edits, refresh and rematch. See `case-variations-browser.json` and the separate live report.

These tests establish state and content structure. The author coherence review traces the changed observations, custody/booking permissions and dates; it does not claim independent human playtesting of every variant's difficulty.
