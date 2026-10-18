# Online reliability audit

Date: 18 October 2026. Original audit baseline: `6107e7a`.

Scope: README, online lobby lifecycle, presence, host transfer, speaker rotation, round transitions, player controls, scoring, and Chaos mode. All eleven findings below have now been addressed. The original findings and line numbers are retained as a record of the baseline, rather than references to the current file layout.

## Implementation and verification

- `online/state.js` owns membership, host election, per-team speaker queues, phase transitions, scoring, and terminal game state. Transactions check the current session, role, and turn; round completion cannot overwrite an outdated roster or score twice.
- `online/client.js` subscribes to a coherent lobby snapshot before joining, registers server disconnect markers before announcing presence, uses server clock offset, and reconnects through a new connection ID. Old sessions cannot remove or overwrite a restored seat. Heartbeat updates target only presence, and the current host can finish an already-submitted Chaos result once.
- `script.js` derives controls, words, timer, selections, and history from that snapshot. Online timers use a shared deadline; Chaos animation projects a stored deterministic result without writing membership. A refresh restores the per-tab identity and selected answers. A fast join also waits for the modal's opening transition to finish before hiding it.
- `index.html` adds explicit Leave Lobby and Rejoin Lobby controls.
- Original two-player/three-player exceptions and variable team sizes are preserved. Empty teams are skipped safely. A delayed heartbeat may transfer host authority, but only a disconnected or missing presence record expires a seat after the 90-second grace period.
- The new `.js` modules are in an ES module package under `online/`, so Windows Python static hosting serves them with a valid JavaScript MIME type. Old-protocol lobbies are rejected with a clear recreate-lobby message.

Automated verification: **53 passing tests** across state, injected Firebase connection behavior, and actual UI functions with a stubbed DOM. The existing word-data suite also passes **125 real pool selections**, training hints, recent-history suppression, and six malformed-data cases.

```bash
node --test tools/online-state.test.mjs tools/online-client.test.mjs tools/online-ui.test.mjs
node tools/test-word-data.js
```

A two-client browser smoke test against a disposable live Firebase lobby verified joining, start eligibility, speaker controls, two-player word privacy, answer selection, refresh restoration, score commit, rotation, leaving, host reassignment, rejoining, and ending. Browser testing also exposed and corrected local module MIME handling, unsupported REST reads of `.info` metadata, and a cold Firebase transaction cache. Existing access rules were not changed.

Remaining release checks: real devices and mobile suspension/network loss, three-player and larger live games, and live Chaos takeover during a connection interruption. The corresponding state transitions and Chaos recovery are covered by automated tests; these broader device/network checks were not performed.

The existing online rules must be preserved: two teams with two players and three teams with three players are allowed; otherwise the existing minimum is two players per configured team. Joining fills the least populated team. Small games hide words from other players; larger games allow opposing teams to see them. Robust handling of departures should preserve these rules and explicitly handle empty teams rather than silently changing eligibility.

## Original audit validation

At the original audit, the existing Graphify graph matched HEAD and was used to find relevant functions. Findings were then checked against the baseline source.

A local Node VM harness executed the actual `script.js` functions and registered listeners with an in-memory database and stubbed DOM. Fifteen failure scenarios reproduced. Fourteen exercise direct state/transition failures; one deliberately reverses related listener delivery to expose order dependence. The harness does not emulate Firebase transaction retries, real socket disconnections, browser suspension, or real rendering. No production lobby was accessed or modified.

Those failure checks have been replaced by the repository regression suites above, which assert the repaired behavior.

## Priority 1: fix before relying on online play

### 1. Round writes can undo a join or departure

**Code:** `script.js:3418`, `script.js:3346`, `script.js:3200`, `script.js:2950`.

Join and leave use transactions, but round completion writes entire local copies of `teams` and `numPlayers` back with ordinary updates. Chaos animation also replaces the complete teams node on movement steps. A client whose roster is behind the database can erase new players or restore removed ones.

**Reproduction:** the server contains four players after two joins; the speaker still has the previous two-player snapshot. Calling normal `nextRound()` writes the roster back to two players. Presence entries for the lost joiners remain, producing inconsistent membership.

**Fix:** commit round results against current database state, checking the acting player, turn identity, and phase inside the transaction. Keep score changes from replacing membership arrays. Give each turn/result a stable identifier so retries cannot score or rotate twice. Chaos animation should render progress without repeatedly replacing membership.

### 2. Roster updates reset the interface in the middle of a turn

**Code:** `script.js:1861`, `script.js:1881`, `script.js:2358`.

Every teams update calls `updateUI()` and then `hideTimerAndAnswers()`. `updateUI()` shows Start Round whenever the local player is speaker, regardless of whether that round is already active or answers are being selected. It also clears answer highlights without clearing `selectedButtons`.

**Reproductions:** a teams update during an active turn hides the speaker's words and shows Start Round again. During scoring, two selected points can remain in the counter while zero answers remain highlighted. Joins, departures, and Chaos score movements all reach this path.

**Fix:** render controls from membership, role, and a shared round phase. Updating a roster should preserve an active timer and scoring selection. Store selected answer IDs in one place and derive the score count from that selection.

### 3. Host failover ejects the host; departure detection has gaps

**Code:** `script.js:74`, `script.js:1346`, `script.js:1369`, `script.js:1549`, `script.js:1559`, `script.js:1611`.

A host heartbeat older than ten seconds is treated as a reason to remove that person from the game, not just transfer the host role. Other players get ninety seconds. Heartbeats use each device's `Date.now()`. Exit handling relies on an asynchronous transaction launched during `beforeunload`/`pagehide`; there is no database disconnect registration or connection-state listener. Cleanup scans existing presence entries, so a non-host whose entry is missing is invisible to that scan.

**Reproductions:** an eleven-second host heartbeat gap removes the host and changes a valid four-player match to waiting with three players. A non-host with no presence entry survives cleanup. Actual background-tab timing and unload reliability still need browser tests.

**Fix:** distinguish connection loss, host transfer, temporary disconnection, and confirmed membership removal. Use connection/session presence with server-based time, disconnect registration, and an explicit grace period. Validate roster members against presence as well as presence entries against the roster. Elect a connected member and provide a reconnect path.

### 4. Evicted players retain roles, and old timers can keep running

**Code:** `script.js:2361`, `script.js:1852`, `script.js:1969`, `script.js:2860`, `script.js:3242`, `script.js:3648`.

`updateUI()` only changes `isSpeaker` if it finds the local name in the roster. If the player has been removed, the old role survives. The `endRoundEarly` listener shadows the global variable rather than updating it, and remote `roundActive=false` does not cancel the countdown. Round mutation handlers depend on UI visibility rather than validating the current role and turn against database state.

**Reproductions:** a removed speaker still has `isSpeaker=true` after `updateUI()`. A remote stop leaves the speaker's local `endRoundEarly=false`. The timer callback can therefore continue after a server-side pause and expose old scoring controls.

**Fix:** default absent membership to no role and stop its timers and writes. Cancel the active timer whenever its turn or authority ends. Validate membership, role, phase, and turn ID for each round-changing operation. Ignore callbacks belonging to an old turn.

### 5. Uneven teams do not rotate fairly

**Code:** `script.js:2448`.

Rotation copies one team's speaker array index into the next team, then wraps using the first team's size. This loses each team's independent position.

**Reproduction:** with teams `[A, B]` and `[C, D, E]`, rotation repeats `A, C, B, D`; E never receives a turn across twenty-four checked turns. This is reachable after a player leaves a previously balanced game.

**Fix:** track each team's next speaker independently, using stable player IDs. Repair only the affected team's position on joins and departures. Preserve the existing order in which teams take turns.

### 6. Empty teams can crash rotation or disconnect the speaker from the scoring team

**Code:** `script.js:1069`, `script.js:1093`, `script.js:1322`, `script.js:1638`, `script.js:2495`, `script.js:3548`.

Eligibility checks total player count, so departures can leave an empty team while the total remains valid. Rotation assumes the next team has a player. Fallback assignment can choose someone on a different team without updating `currentTeam`; points are still awarded using `currentTeam`.

**Reproductions:** a two-team roster of four players on one team and zero on the other passes the existing count check, then rotation throws when assigning `isSpeaker`. Fallback from an empty Team 1 selects Team 2 while `currentTeam` remains 1.

**Fix:** reconcile the active team and speaker together in one membership transition. Handle empty teams explicitly through the intended reassignment/pause behavior. Preserve the documented player-count rules; do not impose a new minimum without a product decision.

### 7. A pregame leave/rejoin can start a match with no speaker

**Code:** `script.js:1305`, `script.js:1176`, `script.js:1194`, `script.js:2306`.

Dropping below the required count clears all speakers even before the game starts. A later join only sets the new player as speaker if the lobby was empty, and fallback repair is restricted to already-started games. Starting the game does not repair the missing assignment.

**Reproduction:** A and B are ready in a two-player lobby. A leaves; C joins. B starts the game. The database says started with zero speakers.

**Fix:** enforce exactly one eligible initial speaker, aligned with the current team, in the start transaction. Membership repair must also work before the first round.

### 8. Chaos host takeover can leave a submitted turn stuck

**Code:** `script.js:2023`, `script.js:2037`, `script.js:3117`, `script.js:3176`.

Non-hosts ignore the pending Chaos turn event. Becoming host changes controls but never checks whether pending work already exists. If the pending node stays unchanged, its listener does not retry that work. A resolver that already started also does not recheck host ownership after its asynchronous animation steps.

**Reproduction:** deliver pending work while A is not host, then promote A. A becomes host, but the resolver is never called. Concurrent resolution during a takeover is a source-level risk that still needs integration testing.

**Fix:** on acquiring host authority, inspect and claim unresolved work. Use a transactional claim tied to the current host generation and turn ID. Completion must be idempotent, and an old host must lose its ability to commit that result.

### 9. Winning a normal game can be followed by a write that recreates it

**Code:** `script.js:3406`, `script.js:3415`, `script.js:3435`.

After a win, `nextRound()` calls `endGame()` but does not return. `endGame()` schedules an ended update and deletion, and the caller then sends another update with `gameState='resumed'`. Teardown writes are not awaited before reload.

**Reproduction:** in the local database stub, the win deletes the lobby, then the remaining round update recreates an incomplete object with resumed state and no settings. Actual request completion around reload needs browser verification.

**Fix:** make ending a single terminal transition; return immediately after a win and await its commit. Treat cleanup/deletion separately so no active client can accidentally recreate or resume the ended match.

## Priority 2: address in the same reliability pass

### 10. Player names are unsafe identities for presence and reconnects

**Code:** `script.js:398`, `script.js:1001`, `script.js:1165`, `script.js:1182`, `script.js:2229`.

Different allowed names can map to the same presence key: `Jo.Smith` and `Jo_Smith` both become `jo_smith`. Duplicate-name validation permits both, so they overwrite one another's presence. Local identity is also reset on refresh, and joining the still-present name is rejected rather than restoring the same session.

**Reproduction:** the two valid distinct names produce exactly the same key. Refresh restoration is already listed as a README limitation and was reviewed in source rather than browser-tested.

**Fix:** separate stable player identity, connection/session identity, and display name. Retain unique display-name rules while allowing the same player to reconnect safely. Guard against an old session removing or overwriting a newer one.

### 11. Separate listeners can render inconsistent combinations of state

**Code:** `script.js:1772`, `script.js:1804`, `script.js:1852`, `script.js:1861`, `script.js:1889`, `script.js:1917`, `script.js:1952`.

Game phase, roles, roster, current team, words, and timer each have separate listeners that immediately change the DOM. The words listener can discard a snapshot when the local round-active flag is false. The round-active listener does not restore those words. Join/leave transactions also set resumed whenever the count is valid, including while a round is already active.

**Adverse-order reproduction:** deliver a words snapshot before round activation to an eligible opposing player, then activate the round. The words remain blank and hidden. This explicitly forces callback ordering; live Firebase delivery behavior was not tested. The unconditional UI reset in finding 2 is independently reproduced without this ordering assumption.

**Fix:** apply a coherent lobby/turn snapshot before rendering, or cache all fields and render through one reducer using a versioned phase. Distinguish waiting, ready, describing, selecting answers, resolving, and ended. Roster changes should not imply a new round phase when the current turn can continue.

## Implementation sequence

1. Stable identities and shared membership/turn invariants.
2. Transactional, idempotent round commits and terminal game ending.
3. Presence, reconnect handling, and host transfer.
4. Per-team rotation, fallback assignment, and initial speaker repair.
5. Unified phase/role rendering, timer cancellation, and scoring selection.
6. Chaos takeover and result recovery.

Before release, run real multi-client tests covering two-player, three-player, uneven-team, and four-team games; simultaneous joins and departures; host and speaker departures during every phase; refresh, connection loss, background/resume, and delayed writes; and host takeover during Chaos resolution. The existing data validator is unrelated to these multiplayer invariants and would not detect these failures.
