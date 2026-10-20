# Gameplay improvements — 20 October 2026

Implemented the high-priority gameplay work and requested follow-ups from the fun report. Existing online eligibility exceptions, team assignment, word visibility, reconnect protection, and team/speaker rotation remain in place. No Firebase firewall, origin, or access rules were changed.

## Tool accent colors

Restored soft grey for Settings, green for Play online, blue for AI words, and yellow for How to play. Each accent carries through the launcher, hover/pressed states, keyboard focus ring, dialog icon and primary actions. Settings controls use slate, and the rules goal/step markers use amber. Shared spacing and the clearer guide format are unchanged. The guide was checked against the original: scoring, speaker rotation, allowed clues and all prohibited clue types remain; repeated wording was consolidated.

Verification: **84 automated tests pass**. All four dialogs fit at 1280×720 and 390×844 without horizontal overflow. Browser checks confirmed four distinct hover colors and visible 3-pixel keyboard focus rings. Launcher, hover and enabled primary-action text contrast ranges from **4.53:1 to 9.52:1**. No browser warnings/errors were recorded.

Previews: [menu](reports/menu-accents.png), [phone menu](reports/menu-accents-mobile.png), [How to play](reports/rules-accents.png). [Color, contrast and layout measurements](reports/accent-verification.json).

## Settings, online, AI and rules dialogs

The four toolbar dialogs share the game's white surfaces, consistent title/icon headers, labelled controls, 44-pixel actions, a single scrolling body, and footer actions that remain reachable. Launchers and dialogs use the matching accents described above. Settings groups audio, match setup, play options and word packs; opening it during a match shows sound/motion controls only. Categories and themes retain their existing mutually exclusive selection behavior and now expose their expanded state.

Play online separates hosting from joining, with a shared player name and a clear four-letter code field. Empty names and malformed codes get inline feedback and focus the relevant input before any connection is attempted. AI words has a topic row, optional pack editing, a live unique-word count, inline generation feedback, and a disabled play action until a pack is ready. Editing/play remain disabled during generation. An invalid empty AI start no longer changes the game mode. The rules guide preserves the clue restrictions and explains the three-step turn, Chaos and online roles in scannable sections.

Keyboard verification found that Tab could move beyond the final dialog control. Explicit forward/backward boundary wrapping now complements Bootstrap's focus handling. Escape closes each dialog and restores focus to its launcher.

Verification: **84 automated tests pass**, including manual/generated pack readiness, inline lobby validation, and keyboard boundaries. **30 browser layout checks** passed at 1384×830, 768×1024, 390×844, 320×720 and 780×500, including expanded category/theme pickers, manual word editing, validation feedback and in-match settings. No control overlaps or horizontal overflow were found; headers and footers stayed within the viewport. Browser keyboard checks verified both Tab directions and all four Escape/focus-return paths. No browser warnings/errors were recorded. Geometry sweeps used reduced motion. AI success was tested with a stubbed model response; browser checks used manual words and local validation, without creating Firebase lobbies or sending generation requests.

Previews: [Settings](reports/modal-settings.png), [Play online](reports/modal-online.png), [AI words](reports/modal-ai.png), [How to play](reports/modal-rules.png), [phone layout](reports/modal-mobile.png). [Layout and keyboard measurements](reports/modal-verification.json).

## Chaos presentation and starting-team clarity

The missing local animation was a real visibility bug: resolution began while the answer controls still kept the board hidden. Local submission now closes the cards before resolution, and both local/online resolution and reroll choices own board focus. Tokens visibly hop between positions, a trail marks progress, the map is revealed on landing, and a landing highlight and impact pulse accompany the effect. A short **Move → Land → Chaos → Result** indicator explains the sequence; a safe landing skips the effect steps. The existing 650/2200/350 ms resolution budgets and all scoring/authority rules are unchanged. Reduced motion settles directly and keeps a textual explanation.

The legend was already corrected by the consolidated stylesheet, but its icons still shared the board marker class. They now have independent layout styles. Board markers occupy their own space within each tile, and cells grow when stacked tokens require it, preventing marker/token overlaps. Fresh Classic and Chaos games still draw a random starting team; rematches still rotate it. The menu and opening turn now explain that behavior.

Verification: **80 automated tests pass**, covering staged score interpolation, delayed effect reveal, board focus before local resolution, online phase cleanup, reduced motion, and starter copy for both modes. Real local browser turns showed actual non-identity token transforms, all four visual stages, a visible board with hidden cards throughout resolution, and exact final scores. An additional reduced-motion turn settled without token transforms and showed its steal result. Expanded legend checks passed at 320, 390, 768, and 1384 pixels with all seven icons inside their rows and no horizontal overflow. No browser warnings/errors were recorded. Online behavior was checked through the reducer/client/UI tests; this change did not create live Firebase lobbies.

Evidence: [movement](reports/chaos-moving.png), [landing reveal](reports/chaos-landing.png), [effect](reports/chaos-effect.png), [legend](reports/chaos-legend-fixed.png), [browser frame and layout measurements](reports/chaos-animation-frames.json).

## End-of-match summary polish

Results now have a single score list ordered by final points, aligned score columns, team-colored tokens, and a subtle winner highlight. Classic omits the duplicate earned total; Chaos adds a secondary breakdown only when an effect changed the total. Empty best-round highlights are omitted. An early end still says **Match ended**, without declaring a winner before the target is reached.

**Play again** is the primary action, **New game** (or **Leave lobby** online) is secondary, and downloading the detailed summary is a quieter text action. The repeated last-turn recap, role message, live score strip, and Chaos instructions are hidden on the results screen. The final board stays visible below a divider, with smaller neutral tiles, no stale powerup badges, and enough height for stacked team tokens. Rejoining remains accessible when an online seat needs recovery. Rematches restore the normal gameplay layout.

Verification: **76 automated tests pass**, including score ordering, positive/negative Chaos breakdowns, zero-detail suppression, host-only rematches, and exiting results mode. Browser checks covered Classic and four-team Chaos results at 320, 390, 768, and 1384 pixels wide, plus the rematch and return-to-setup flows. All 13 measurements found no intersecting controls or horizontal overflow; the board remained visible and duplicated score/recap elements were hidden. All four tokens fit within a shared cell at 320 pixels. No browser errors or warnings were recorded.

Evidence: [desktop summary](reports/results-desktop.png), [mobile summary](reports/results-mobile.png), [measurements](reports/results-verification.json).

## Layout and audio correction

The first implementation left absolutely positioned corner buttons on a page that now had more controls, and loaded app CSS before Bootstrap. This caused the overlaps and oversized desktop container reported in the screenshots. The layout now uses a dedicated 768-pixel maximum shell, a wrapping toolbar with text labels, grouped setup fields, and one consolidated stylesheet loaded after Bootstrap. Navigation no longer floats over other content.

Sound/motion controls are in a single Settings dialog, available during play. The game setup fields are hidden there once playing, so sound can change without altering a live match. The extra Match options and Sound & motion drawers have been removed from the game screen. End Game is a direct secondary action with its existing confirmation.

Ticking was mistakenly removed in the audio refactor. It now loops during both local and online countdowns, stops for the five-second warning/end/disconnect, respects mute/volume, and can resume after unmuting. Browser playback was verified as running (`paused: false`, advancing playback time), paused on mute, resumed on unmute, and stopped at round end.

The verbose score-arithmetic banner is replaced by a quiet player-facing result, such as **“Team 2 scored 2 points.”** Chaos adds a short message such as **“Bonus point!”** Existing detailed audit records remain available, and older saved recap strings are not shown verbatim.

Final verification: **74 automated tests pass** plus the word-data checks. Browser geometry checks found no intersecting visible controls or horizontal overflow in 18 foreground menu/settings/game states, across 1384×830, 1384×730, 1024×768, 768×1024, 390×844, and 320×720. Modal background controls are excluded while a dialog is open, and clipped offscreen controls are measured only within their visible scroll bounds. Size sweeps used reduced motion to avoid measuring transition frames; the normal-motion menu and dialog were also inspected visually. End Game cancellation was checked in the browser.

Evidence: [desktop menu](reports/layout-desktop-fixed.png), [phone menu](reports/layout-mobile-fixed.png), [simplified game screen](reports/layout-game-fixed.png), [geometry measurements](reports/layout-verification.json).

## What changed

- The clue/scoring screen prioritizes words, timer, role, and the primary action. The full board and legend are hidden during the card phase. Cards remain full contrast while read-only, selections have checkmarks and accessible pressed state, and scoring shows the selected count before confirmation.
- Personal online role copy handles the existing two-player and three-player variants. Between turns, the next speaker is named. A numbered board now has a separate finish at the actual target and labeled team tokens that work without color alone.
- Chaos keeps its existing effect weights. Bombs lose at most three points. A shield blocks a landing penalty or an incoming steal loss, then is consumed; the stealing team still receives its +1. Duplicate shields explicitly say they are already ready. Protected positions and no-chaining rules are unchanged.
- Resolution budgets are 650 ms for no effect, 2.2 seconds for an effect, and 350 ms for a winning move. Movement duration no longer grows with distance. Reduced-motion users see results immediately, while online commands still respect the authoritative shared deadline. Network delay, a sleeping host, and reconnect recovery can add waiting beyond the animation budget.
- Turns show a short score result and a brief Chaos message when relevant. Results show final scores, earned/Chaos totals, and a best clue round. A host-controlled online rematch creates a new match identity, resets scores/resources/history, preserves the roster and deck history, and rotates the starting team. Winning turns also advance that team's speaker queue for the next match.
- Initial starters are randomized; rematches rotate the starter. The immediate-finish rule remains unchanged. This distributes first-slot advantage across matches rather than removing it within an individual match.
- Separate normalized easy/hard deck histories prevent repeats until each difficulty exhausts its own pool. Recycling one difficulty does not reset the other. Cards never contain the same normalized answer twice. Deck history carries across rematches with the same group; narrow pools still recycle when genuinely exhausted.
- Short/Standard/Long presets keep five words and 30-second rounds, with targets of 10/20/40. Advanced settings remain available, show a setup summary, and include a searchable category checklist. Category/theme selection is mutually exclusive through the UI.
- Mute, volume, and device/reduced/full motion preferences persist locally. Audio does not control word reveal or round timing. Training hints are optional disclosures, keep stable markup between clock ticks, and remind speakers to avoid answer words/derivatives.
- Ending a shared match uses an in-app confirmation. Creating a lobby no longer asks for a redundant native confirmation. Closed lobbies return to setup with a status message rather than an alert/reload.
- A local match-summary download contains settings, team scores, earned points, effect descriptions, and clue/scoring/resolution timings. It excludes player names and answer text. No separate analytics service was added; online phase timings are part of the normal shared match history. Downloading the summary is explicit.

## Optional Chaos decision prototype

Enable **Chaos reroll prototype** in Settings. It is off by default. Each team gets one reroll per match, offered only after an eligible effect. The active speaker can keep the effect or spend the reroll and accept a deterministic new result, which may be no effect. There is a five-second decision window; timeout keeps the original result. The team resource is shown as ready/used.

Transactions guard the speaker, connection ownership, phase, turn, deadline, and per-team resource. Only the current host/epoch can recover an expired choice or commit a finished resolution. A sealed result survives joins, refreshes, and the speaker/host leaving. Match-scoped start/end/rematch requests reject obsolete match identities.

The five-second choice adds time when enabled. This is a prototype to playtest, not a claim that extra choice necessarily makes the game more fun. No additional powerup types, progression systems, cosmetics, or new game modes were added.

## Verification

- **74 automated tests pass** across shared gameplay, online state, client lifecycle, and UI integration. Coverage includes separate deck exhaustion, normalized duplicates, capped bombs, shield/steal interactions, winning-move pacing, role privacy, results, rematch identity/reset, stale commands, choice recovery after host/speaker departure, audio lifecycle, and concise messages.
- The existing word-data check passes **125 real pool selections**, training hints/recent-history checks, and six invalid-data cases.
- A local browser playthrough at **390 × 844** verified five clues plus the round action without the old nested scroll, score confirmation and recap, victory, persistent mute/reduced motion, and starter rotation on rematch. Screenshot: [updated mobile clue view](reports/gameplay-mobile-after.png).
- Live two-client Firebase UI verification was attempted but did not complete: the browser tool became stuck on the earlier native creation confirmation and subsequent clicks did not reliably open dialogs. No live test lobby was successfully created in this turn. Automated client/state/UI tests provide coverage; a manual two-device smoke test remains advisable before deployment. The redundant native creation confirmation has been removed in the final build.
- Online protocol is now **3** because new phases and match identities require compatible clients. Refresh clients and create a new lobby when upgrading from protocol 2. Existing lobbies are not migrated in place.

## Simulation checks

Run `node tools/analyze-starting-order.mjs` for 180,000 synthetic Classic matches across two/three/four teams and targets of 10/20/40. At two teams/20 points, fixed first-team wins were 64.97%/35.03%; randomized starting identities were 50.07%/49.93%. The first turn slot still won 64.97%. These are equal-skill model outcomes, not measured player results.

Run `node tools/analyze-chaos.cjs 5000` for 70,000 updated-rule synthetic matches. The original report baseline is preserved separately. Under the same simplified five-word, 60%-success model, mean total Chaos resolution budget in a two-team/20-point match fell from **68.11 to 14.22 seconds**; at 60 points it fell from **215.03 to 46.28 seconds**. Updated resolutions have a 0.65-second median and 2.2-second maximum in the model. Optional reroll decisions are not modeled. These estimates exclude network/audio startup and assume fixed clue/handoff timing; they do not demonstrate enjoyment or predict every group's match duration.

Results: [starting order](reports/starting-order-results.json), [updated Chaos](reports/chaos-current-results.json), [original Chaos baseline](reports/chaos-balance-results.json).

## Next validation

Before deployment, play on two real devices through a complete Classic and Chaos match, turn on the reroll prototype, let a choice expire, refresh during scoring, disconnect a host during a choice, and rematch after victory. Check the existing small-player variants as well as conventional teams. Include narrow themes, long/15-word cards, training hints, enlarged text, and smaller/landscape screens.

Use a few mixed-familiarity groups to compare the capped bomb and fast pacing against the old experience before tuning weights further. Compare the reroll both on and off. Record confusion, waiting, frustration, exciting moments, and voluntary rematches; simulation cannot answer those questions.
