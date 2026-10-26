# AI topic scope and checkbox — 26 October 2026

The topic field is plain text. The unchecked **Keep to the exact topic** control sends adaptive scope; checking it sends strict scope. Both the button and Enter use the same request path. Topic and scope controls are disabled while a request is pending, then restored on success or failure.

Adaptive scope interprets a topic's natural breadth. Movies favors titles while including related people, characters, objects and filmmaking concepts. A specific answer type such as football player names stays specific without requiring the checkbox. Strict scope requests direct examples only. General knowledge remains varied within its stated region in either scope.

The model now returns named groups internally. This made variety more reliable than a flat list during live review. The app interleaves groups before applying the 150-entry cap, duplicate filtering, recent-history exclusions and difficulty checks. The editor remains a plain list, with no extra player-facing categories. The earlier flat response format is also accepted.

## Final live samples

These used the production Firebase AI Logic model and schema through the CLI evaluation tool. Temporary App Check registrations were removed after each evaluation. No production origin restrictions, database rules or billing settings changed.

| Topic | Scope | Accepted | Easy / hard | Observed variety |
| --- | --- | ---: | ---: | --- |
| Movies | Adaptive | 149 | 90 / 59 | Majority titles, plus Spielberg, Darth Vader, Lightsaber, Screenplay and other related answers |
| Movies | Strict | 140 | 90 / 50 | Movie titles only in the reviewed sample |
| football player names | Adaptive | 149 | 84 / 65 | Player names across eras and regions, without clubs or stadiums |
| Hollywood | Adaptive | 137 | 93 / 44 | Films, people, studios, landmarks and filmmaking concepts |
| South African general knowledge | Adaptive | 149 | 78 / 71 | People/history, places/nature, culture/food/language, sport/science/everyday life |

Raw answers and model-reported group counts are in `ai-scope-evaluation.json`. Group counts precede the cap and filters; they are not independently verified classifications. The live tool can be rerun explicitly with `node tools/evaluate-ai-packs.mjs --live --scope`.

This is a small sample, not a controlled playtest. The model still sometimes returns fewer than 150 answers or misses its difficulty budget. Semantic quality and alias identity are not guaranteed: the regional sample included weak answers such as “Pram” and two versions of Albert Luthuli that the model did not give the same canonical identity. The existing review/edit option remains useful. Grouping improves breadth; it does not independently fact-check answers.

## Verification

128 automated tests passed, covering request scope, literal punctuation, Enter submission, pending controls, grouped parsing/interleaving, malformed/empty groups, filtering and gameplay regressions. Browser checks covered desktop 1280×800, mobile 390×844 and compact 320×568. The compact modal body scrolls while the header and footer stay accessible. Screenshots: `ai-scope-desktop.png` and `ai-scope-mobile.png`.
