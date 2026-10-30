# Case Files word audit — 30 October 2026

## Finding and correction

The party cases used broad food, household and wildlife vocabulary rather than words selected for individual exhibits. The original five cases also contained loose associations. This made both the cards and “Recovered through…” labels feel disconnected from the investigation.

All 96 exhibits across eight cases now have four deliberately selected prompts (384 references, 48 distinct answers per case). Each mapping in `gameplay/case-vocabulary.js` includes a `topic` explaining the connection. The mappings were reviewed against all three authored scenarios per case; concepts that depend on one particular culprit or hiding place were avoided.

Examples in The Great Cake Escape:

- Decorator’s reference: Cake, Cherry, Fondant, Confectionery.
- Birthday photograph: Camera, Photographer, Viewfinder, Perspective.
- Kitchen witness: Doorway, Witness, Eyewitness Account, Line of Sight.
- Serving setup: Tablecloth, Trolley, Concealment, Table Skirting.
- Container inspection: Icing, Decoration, Edible, Physical Evidence.

248 missing entries were added to the existing dictionary categories with descriptions and clue-effort difficulty ratings. Existing entries, ratings and themes were preserved. Every exhibit has at least one Easy and one Hard prompt; there is no forced difficulty quota. Existing mixed-card fallback still applies, and a nearly exhausted lead may produce a shorter card.

The evidence chip now says “Words solved for this file:” rather than implying the word describes how evidence was physically recovered. Topic notes are authoring metadata, not hints shown to players. Obtaining a word still does not reveal its sealed exhibit. No runtime AI or general-category fallback was introduced.

## Verification

- 235 automated tests pass, including all 24 scenario completions, last-remaining-file deals at Easy/Normal/Hard, no unrelated Cake Escape examples, and missing-dictionary rejection.
- Dictionary validation passes; 125 real pool selections, training hints, recent-history suppression and six validator failure cases pass.
- Browser: complete local Cake Escape through countdown, expiry, evidence, reconstruction, verdict and next-case reset. Confirmed the revised recovery chips.
- Browser: two clients using the local Firebase-compatible adapter pass shared edits, role privacy, refresh persistence, stale review invalidation and rematch. No production Firebase writes were used for this audit.
- Evidence layout passes at 320, 390 and 1100 pixels, plus 150% text at 320 pixels. Screenshot: `case-word-evidence-mobile.png`.

Dictionary/module cache keys were refreshed. Online protocol is now 16, preventing older clients with different dictionary mappings from joining a new lobby; everyone should refresh before creating a new online game.

## Future edits

Edit exhibit prompts and their relevance notes in `gameplay/case-vocabulary.js`; add missing canonical entries to `data.js`. Check the source exhibit in `case-content.js` or `case-party-content.js` and its changes in `case-variants.js`. Preserve the file IDs, prerequisite graph and private reveal timing. The tests verify structure and reachability; semantic relevance still requires editorial review.
