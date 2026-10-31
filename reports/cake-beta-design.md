# Cake Escape Beta — playable prototype

## Scope

Choose **Cake Escape Beta · Prototype** from the Game menu. It is a separate mode; the eight original Case Files, their notebook/reconstruction flow and the other game modes remain available. The beta reuses the three authored Cake Escape outcomes (Evie/chest, Ben/tent, Cleo/cupboard). The three puzzle mechanisms repeat across outcomes; it is a prototype for testing the investigation loop, not a claim of unlimited puzzle replayability.

## Complete loop

1. Guess cake-related built-in words in the existing private countdown/word/review flow. Each confirmed word banks one shared search point. No word opens a document.
2. Spend two points to open the next discovery. Unspent points carry between rounds. Wrong puzzle attempts and experiment changes are free.
3. Solve the table riddle; uncover wheel tracks and a patterned apron patch. Guests and their apron symbols are visible together.
4. Compare before/later cake pictures; identify the changed ribbon and the substitution.
5. Recreate the escape with three controls: leave the foam display, move the real cake on the trolley, lower the cloth. Trying an inconsistent setup provides short feedback. The successful experiment unlocks a visual icing trail to the hiding place.
6. The host reviews and submits the crew’s prankster/hiding-place accusation. All three discoveries and both selections must be correct to close the case. There is no timeline or evidence-pair form.

Opening a puzzle or buying one of its two progressive hints costs two points. Spending points is a crew decision; a bad word round never corrupts clues or removes progress. Six shared word rounds is the default, with the existing 4–12 setting and feasibility minimum for one-word cards. Exhausting the budget still allows spending saved points and a final accusation; insufficient discoveries produce an unsuccessful ending. The crew can also end early, reveal optionally with confirmation, replay the same scenario or draw a different one. Exports report beta discoveries and search points rather than the original twelve-file metric.

## Shared rules and integration

- `cake-beta-state.js` wraps the original Case Files round/roster reducer. It keeps the established random speaker fairness, private countdown, confirmed scoring, expiry and departure/reviewer recovery. It explicitly rejects original Case Files theory actions.
- The beta auto-selects a different existing word lead each round; drawing remains deterministic and respects word count/difficulty. Existing curated Cake Escape words are used without AI, external packs or unrelated categories. Correct words become currency instead of opening their linked files.
- All connected crew members can investigate between word rounds. Host-only final decisions and reveals remain explicit. Each puzzle command carries a shared revision; stale/repeated commands cannot spend points twice or submit an outdated accusation. Beta controls stay locked until the subscription renders the saved revision, including when a transaction acknowledgement arrives first.
- Firebase-omitted empty arrays/maps are normalized. Refreshing restores the purchased puzzles, hints, experiment, points, scenario and final draft. Local play uses the same reducer and passes the phone privately for word cards.
- SVG scenes and matching text descriptions fit the existing vanilla-JS stack. Nothing depends on a new image/CDN/AI service. Tap/select controls work without dragging or precise gestures.
- New mode rules appear in How to play; incompatible pack/theme/training controls are hidden or normalized. Original investigation selection remains in Case Files; the beta has its own menu entry and fixed cake setting.

## Validation and next playtest

245 automated tests pass, including all three beta outcomes at every word difficulty, economy and stale revisions, auth/privacy, scoring/expiry/departure recovery, zero-score loss, optional reveal, replay resets and Firebase serialization. The existing 237 checks still pass.

Browser checks complete local play and a two-client game using the Firebase-compatible local transaction adapter. Coverage includes word privacy, odd-point carryover, hints, wrong puzzle retries, all discoveries, final confirmation, summary/PNG, replay/reveal/shuffle, guest edits and refresh recovery. Sixteen layout checks pass at 320/390/1100px and 150% text. See `cake-beta-browser.json` and the three beta screenshots. This is software verification, not evidence of player enjoyment.

For the first blind playtest, watch whether the next action is clear, whether the images invite discussion and whether several players contribute. Ask which discovery felt satisfying and whether they want another case. Adjust the two-point cost and clue strength from those observations before extending the format to other cases.

Online protocol is 18. Refresh all clients and create a new lobby after deployment.
