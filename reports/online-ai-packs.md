# Shared AI word packs online

## Behavior

AI words now offers **Play here** and **Host online**. Hosting snapshots the current reviewed/generated/pasted pack, then opens the normal name/create-lobby flow. Guests join by code without an AI request or a local copy of the pack. Cancelling clears the pending hosting source without clearing the editor.

The lobby stores a bounded custom pack with answer, canonical identity and difficulty. Every client uses this source and the existing shared exhaustion deck. Refresh, host transfer and rematch retain it. Online team counts, start eligibility, countdown, answer privacy/review, equal-turn finish and Chaos rules stay the same. Online settings are retained; built-in category/theme selection and training hints do not apply to custom packs.

Empty, malformed, over-150 or difficulty-empty packs fail explicitly. No malformed pack silently falls back to built-in answers. Protocol 6 prevents older clients from drawing built-in answers in a shared-pack lobby; all players must reload and create a new lobby after updating.

## Verification — 29 October 2026

- 158 automated tests passed across AI client/packs/errors, gameplay, online pack validation, state, client and UI suites. New coverage includes metadata, deterministic dealing, exhaustion, editor independence, cancellation, invalid packs, non-default team/target settings, refresh-compatible snapshots, host transfer, rematch and suppressed training hints.
- Two local browser clients used the real Firebase lobby flow with a pasted ten-answer fixture, without consuming AI quota. The guest joined through the normal online dialog, received the custom source, and saw no live answers while guessing. Answer selection synchronized to the guest.
- After refreshing, the guest's turn used the other five answers with no repeats. A rematch kept the source and exhaustion history. The original host left, a replacement joined, and the new host started a custom-pack round. Exhaustion was reported correctly after all ten answers had been dealt. No guest console errors were observed.
- Checked the AI footer at 320 px, the hosting dialog at 390 px, and desktop play. Buttons remained reachable and the modal content scrollable. Screenshots: [AI actions](online-ai-pack-mobile.png), [mobile hosting](online-ai-host-mobile.png), [guest turn](online-ai-guest-round.png).
- Both test players left; the temporary lobby closed. No database rules, domain restrictions, billing, or AI model configuration changed.

This checks sharing of the same editor data used by generated packs; it does not make a new live Gemini request or assess generation quality.
