# Shared online answer review — 29 October 2026

During selection, every connected player can see the complete option list and the speaker's live checkmarks. Only the current speaker can change or confirm selections. Live-round privacy for small games and guessing teammates is unchanged.

After confirmation, all options remain in a read-only review below the board, with checkmarks for the selected answers. Chaos uses the sealed current turn during resolution; completed turns retain one bounded review snapshot in the lobby. Refreshes and rejoining recover the same review. The next round's countdown clears it, and a rematch clears it too. Disconnected or inactive viewers do not render the review.

139 automated tests passed. New coverage includes two- and three-team player counts, teammates and small-game guessers, selection toggles, edit/confirm permissions, zero-correct rounds, refresh/rejoin, stale connections, Chaos resolution, finished matches and rematches.

Two local browser clients connected to the existing Firebase database in a temporary test lobby. The guest's live-round answers stayed hidden; after End Round, all five options appeared. Selecting Clash Royale and Alliteration on the host immediately updated the guest's checkmarks. Confirming kept all five options and both checks visible. Reloading the guest restored the review. At 390 px, the review used one column with no horizontal page overflow. Starting the guest's next round cleared the review at the countdown. Both test players left and the temporary lobby closed.

Screenshots: `online-live-selection-review.png`, `online-confirmed-answer-review.png`, and `online-answer-review-mobile.png`.

No database rules, domain restrictions, player-count rules, scoring rules, or AI service settings changed. Existing older clients must reload to receive the shared-review UI and persistence behavior.
