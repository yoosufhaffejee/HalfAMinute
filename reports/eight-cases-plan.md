# Eight cases: accessible mysteries and difficulty

Research before implementation: [Golden Idol designer interview](https://www.gamedeveloper.com/design/case-of-the-golden-idol) on connected thought paths and avoiding clues that bypass reasoning; [Unlock! publisher overview](https://www.spacecowboys-games.com/fr/game/unlock/) on varied adventures, observation/association and three difficulty levels. These inform original cases, not copied puzzles.

Classify by interpretation and reference burden, independently of word difficulty. Easy: three new cases. Medium: Four-Minute Gallery and Night Train Exchange. Hard: Silent Encore, Midnight Transfer and False Signal. Eight total, at least two per tier. These are editorial starting ratings, not measured solve rates.

New design constraints: six suspects, twelve exhibits, three leads, four ordered events and one evidence connection. Keep existing rounds, retries, hidden failed answers and settings. Use familiar objects, descriptive names, one accurate clock and short records. Every necessary rule is supplied. No runtime AI. Curated prompts reference data.js, with two Easy and two Hard words per exhibit; word difficulty remains a separate preference.

- **The Great Cake Escape:** a birthday centrepiece disappears although its stand seems occupied. Compare an edible cake with a display prop, follow the moving cloth and trolley, and distinguish a witnessed delivery from who moved it. The fun is seeing how an ordinary serving setup hid the whole cake.
- **Who Kidnapped Captain Quack?:** a huge inflatable duck disappears through a small laundry hatch. Compare its inflated size with the route and the pump instructions. Identify the person with the repair materials and trace a folded yellow bundle. No arithmetic beyond ordinary times.
- **The Ghost Who Stole the Popcorn:** a tiny prop creates a giant ghost at a snack stall while a prize tin disappears. Compare a shadow demonstration with the lighting cues, distinguish the noise source from the shadow source, and trace the tin through the cleanup. No supernatural rules or electronics knowledge.

UI: central sorted case catalogue and label formatter; identical difficulty labels/order in setup and next-case pickers, plus briefing/progress context. Start new setups on an Easy case. Existing explicit case IDs remain valid; rematches advance through the sorted catalogue. Keep the old authored case solutions intact.

Verification: content/vocabulary/dependency checks for all eight, at least two per tier, chronological consistency, explicit wrong-answer/retry regressions, independent new-case completion at all word difficulties; browser completion and menu order on mobile, plus one online new-case flow. Do not use a minimum-clue count as a difficulty claim.

## Completed checks

232 automated tests passed. All eight cases complete at Easy, Normal and Hard word settings. The browser suite completed all three new local cases and a two-client Captain Quack investigation, including private cards, shared draft editing, refresh, stale confirmation rejection and rematch. Twelve layout checks passed at 320/390/1100px and 150% text. Both setup and next-case menus use the same labelled catalogue. The failure/retry regression tests still pass. Results: [new-cases-browser.json](new-cases-browser.json). The mobile reconstruction screenshot was inspected.

The existing five case stories and solutions are retained. The new cases use familiar physical observations rather than account aliases or clock corrections. Their Easy rating describes the mystery, not the optional word challenge. Protocol 14 prevents older clients from interpreting a new case as a different investigation; online groups must reload and create a new lobby.
