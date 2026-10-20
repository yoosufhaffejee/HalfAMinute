# AI pack improvements

The generator now targets up to 150 answers in both broad and strict scope. Strict scope and usable answers take priority over filling a number. The UI displays the validated count, explains smaller packs and retains the simple editable word list.

## Prompt and format

Permanent game rules are system instructions; the topic, scope, difficulty, desired mix and recent-answer exclusions are JSON data in the user message. Clueability includes the actual spoken-clue restrictions. Hard means a recognizable answer needing a more inventive clue or deeper topic familiarity, rather than arbitrary obscurity. Instructions discourage vague filler, ambiguous surnames, verb forms and loosely associated words. Broad topics request varied answer types; strict topics stay within the named class.

Structured output includes `word`, `canonical` and `difficulty`. The response schema constrains fields and difficulty labels. Local checks validate bounded labels, cap candidates at 150, filter unsuitable labels, and deduplicate normalized display and canonical identities. JSON parsing, truncation, empty/fresh-pool and selected-difficulty failures preserve the previous pack. These checks validate structure and known identities; they do not prove factual correctness or semantic relevance.

The schema deliberately omits a large `maxItems`: that constraint caused HTTP 400 on the current model/proxy. The cap is enforced in application code. Output has a 12288-token budget to accommodate metadata, with no automatic retries or repair requests.

## Difficulty and history

Generated difficulty survives list editing and is used by the existing dealing logic. Normal requests match the actual per-card split (90 easy / 60 hard for a full five-word-card pack). That mix is advisory for smaller Normal packs, which may be entirely easy. Easy/Hard requests and dealing use their respective labels. New manual answers use the chosen difficulty, with Easy as the Normal-mode default. An empty selected-difficulty pool cannot start a match.

The last 450 accepted generated display/canonical identities are stored locally. Each request reads current storage, and validation reads it again after generation to include changes from other tabs. Only accepted packs update history; unavailable/corrupt storage is tolerated. Cross-device prevention and perfect semantic alias resolution are not claimed. A model can still label an alias inconsistently, misjudge difficulty or produce an unsuitable answer; manual editing remains available.

## Evaluation

The saved before/after fixtures use the same model, the prior prompts from commit `5f5b205`, broad Football and strict solar-system planets. A second broad pack includes exclusions from the first. Initial samples are preserved separately because manual review exposed an off-topic answer, ambiguous names and a repeat-generation pack dominated by player names; that review informed the revised instructions.

This is a small live sample with ordinary model variability, different requested pack sizes and no human playtest. Counts and identity overlap can be checked automatically; enjoyment, familiarity and clue fairness need actual groups to play the packs.

| Topic | Previous prompt | Final prompt |
| --- | --- | --- |
| Football | 49 unique answers | 80 accepted; 50 easy / 30 hard |
| Strict planets in our solar system | 60 answers, including moons, dwarf planets and aliases | The eight planets; all easy |
| Football again, excluding the previous accepted pack | No exclusion feature | 144 accepted; zero matching display/canonical identities from the preceding 80 |

The larger target is a goal, not a promise that every request returns 150. The final samples took about 7.3 seconds, 1.7 seconds and 6.5 seconds respectively. Difficulty ratios are approximate model judgments: the second Football pack skewed harder than requested. Actual dealing still uses the selected difficulty and normal card split.

Manual review found residual semantic issues in the repeat pack: `Signal Iduna Park` and `Westfalenstadion` were given different canonical labels despite referring to the same stadium; `Anfield Road` overlaps another stadium answer. One unusual person/name association also needs factual verification. The validator cannot detect these without a reliable external entity catalog. The improved instructions and canonical filtering reduce known repeats, but they cannot establish zero semantic repeats or factual accuracy. No automatic follow-up model call or external fact-check service was added.

Evidence: [final samples](ai-pack-evaluation.json), [initial samples used during refinement](ai-pack-evaluation-initial.json), [mobile editor](ai-pack-mobile-editor.png). The plain editor, duplicate count, persistent footer and scrolling modal were verified at 390 × 844. Production SDK verification is recorded after publication.

## Automated validation

125 tests cover lazy AI initialization, JSON/difficulty validation, oversize caps, alias/recent filtering, bounded/corrupt storage, metadata after edits, selected-difficulty dealing, failure preservation and existing local/online gameplay. Ordinary tests make no network requests.

AI match team count/finish targets and the online protocol/rules are unchanged. Firebase account settings, domain restrictions, enforcement and billing were not modified for this prompt change. Live evaluation uses temporary debug registrations and removes them in `finally`; no token or Gemini credential is committed.
