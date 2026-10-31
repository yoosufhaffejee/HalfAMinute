# Cake Escape Beta — riddle and deduction revision

## Scope and authoring rules

The beta remains a separate menu option. The eight original cases and their authored scenarios are preserved for comparison. Their shared suspect headings now use the actual cast size rather than hard-coded “six”.

The new beta content lives in gameplay/cake-beta-content.js. Case difficulty and word-card difficulty are separate: this Easy case always has two riddles, including when Hard words are selected. The authoring limits are at most two riddles for an Easy case and three for a Hard case. An Easy case can use just one; do not turn every discovery into a riddle or force the same mix onto every case.

## Story and full loop

The shared opening scene establishes the birthday party, missing cake, suspicious photograph, folded note, suspects and mission. The host acknowledges it before speaker handoff, words or puzzles. A briefing recap is available between rounds.

Correct words earn shared search points. Opening a discovery or buying a hint costs two; saved points carry forward. The three discoveries are:

1. **The folded note — riddle.** Players interpret the dinner/footprints riddle and type its answer. Trolley/cart/serving cart and common equivalents are accepted. Solving it leads to the actual carrier: icing on the shelf and a sleeve fibre at its handle. This colour matches multiple suspects.
2. **Dani’s photographs — visual deduction.** Two identically decorated cakes sit on thin trays. Using the adjacent load reference, players select the real-cake photograph AND the physical evidence supporting it. The centre of one tray visibly bends. Ribbon and cherry details are plausible alternatives, but neither distinguishes these pictures. A wrong attempt gives the same neutral feedback for either error; it does not identify the field to change.
3. **The second note — riddle plus image interpretation.** The mirror riddle unlocks a recovered reversed photograph. Players try orienting it, using the EXIT lettering. Its storage position must be compared with a left-to-right room guide. A cropped wrist supplies the second identity clue. The riddle answer alone does not complete this discovery.

The final accusation asks who and where. All three discoveries plus both answers must fit. Unsuccessful endings keep unconfirmed answers hidden; optional reveal has a confirmation step. Same/new-scenario replay, summaries and result cards remain available.

## Assistance and shared state

Each riddle begins with a text answer. Three valid but incorrect submissions unlock four related choices; blank, punctuation-only or overlong submissions are rejected without counting. The first choices are serving tray, trolley, waiter and wheelbarrow; the second are window, television, mirror and portrait. There are no unrelated joke distractors. Text entry remains available under an alternative-answer disclosure.

Attempts belong to the crew and the individual riddle, persist across turns and refresh, and reset on replay. Stale/repeated transaction requests cannot count a miss or spend points twice. Wrong guesses are free. Multiple-choice assistance is recorded for playtest summaries, without reducing rewards. Paid hints provide progressively more specific help.

Local and online play use the same authoritative reducer, private countdown, confirmed word scoring, fair random speakers, turn budget and departure recovery. All connected players can investigate between rounds. Host-only beginning, accusation and reveal are retained. Controls wait for the subscribed revision after a commit, avoiding acknowledgement/update races. Empty Firebase maps and arrays are normalized. The schema now uses online protocol 20: refresh all clients and create a new lobby.

## Suspects with overlapping traits

The beta has five suspects in its original outcome, four in alternate A and five in alternate B. Profiles mix personality, role and ordinary clothing/accessories. There are no one-to-one apron symbols.

Each sleeve colour matches at least two people. Each wrist style also matches at least two people. Only their intersection identifies one culprit. For example, in the original outcome several guests wear blue, and both Dani and Evie wear plain bangles. Neither fact alone identifies Evie. Different outcomes change the person, clue values, real photograph ordering and hiding place coherently.

The photograph deliberately gives only a wrist close-up; the sleeve clue comes from the carrier. The unlabelled covered storage positions need the room guide after correcting the reflected view. All relevant descriptions and discoveries remain available, so the challenge is interpretation rather than remembering a long notebook.

## Verification

251 automated tests pass. New coverage includes synonyms, malformed answers, exactly-three-miss assistance, locked choice endpoints, shared/stale attempts, independent riddle counters, photo AND evidence validation, mirror-answer versus orientation gating, cast sizes and non-unique individual traits, dynamic suspect bounds, all three outcomes at Easy/Normal/Hard word difficulties, plus existing privacy/recovery/replay tests.

Browser verification completes a local case and a two-client case with no production Firebase writes. It covers the opening, typed answers, delayed choices, persistence through refresh after two misses, guest photo/interpretation edits, scoring/privacy, hints, accusation, exports, reveal and replay. Twenty-four responsive checks pass at 320/390/1100px and 150% text. See cake-beta-browser.json and the briefing/riddle/photo/reflection screenshots.

Software tests establish correctness and usability, not enjoyment. The next blind playtest should check whether players can explain why their answers fit, whether the fallback helps without trivialising the clue, and whether combining the two identity observations feels satisfying.
