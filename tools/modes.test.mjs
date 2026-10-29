import test from 'node:test';
import assert from 'node:assert/strict';
import * as State from '../online/state.js';
import * as Modes from '../gameplay/modes.js';
import { CASES, caseEvidence, consistentSuspects } from '../gameplay/cases.js';

let clock = 1000000;
const actor = name => ({ playerId: name, playerName: name, connectionId: `connection-${name}` });
const rules = { drawWords: game => ({ words: game.settings.mode === 'table' ? ['The Apple'] : ['One', 'Two', 'Three', 'Four', 'Five'], aliases: ['Apple'], pools: {} }) };
function lobby(mode, names = ['A', 'B', 'C'], extra = {}) {
    clock = 1000000;
    const settings = Modes.normalizeModeSettings({ mode, numTeams: 2, numWords: 5, numSeconds: 30, pointsToWin: 10, difficulty: 'normal', caseId: 'trophy', caseTurns: 6, tableCycles: 1, ...extra });
    let game = { protocolVersion: State.PROTOCOL_VERSION, settings, teams: [{ points: 0, players: [] }, { points: 0, players: [] }], phase: 'waiting', currentTeam: 1, hostId: '', hostEpoch: 0, dateCreated: clock };
    for (const name of names) game = State.join(game, actor(name), clock);
    return game;
}
function act(game, type, name = game.turn?.speakerId || game.hostId, extra = {}) {
    const current = structuredClone(game);
    for (const record of Object.values(current.presence)) for (const value of Object.values(record.connections)) if (value.connected) value.lastSeen = clock;
    return State.act(current, actor(name), { type, matchId: game.matchId ?? 1, turnId: game.turn?.id, ...extra }, clock, rules);
}
function started(mode, names, extra) { return act(lobby(mode, names, extra), 'start-game', names?.[0] || 'A', { seed: 0 }); }
function clues(game, risky = false) { const next = act(game, 'start-round', undefined, { seed: 42, risky }); clock += 4500; return next; }
function score(game, earned = 0) {
    game = clues(game); game = act(game, 'end-round');
    for (let index = 0; index < earned; index++) game = act(game, 'toggle-answer', undefined, { index });
    return act(game, 'submit-round');
}
function guesses(game, values) {
    for (const [name, text] of Object.entries(values)) game = act(game, 'lock-guess', name, text === null ? { pass: true } : { text });
    return game;
}

test('mode normalization isolates incompatible settings without changing legacy team rules', () => {
    const table = Modes.normalizeModeSettings({ mode: 'table', chaosMode: true, chaosReroll: true, trainingMode: true, trackSeries: true, numWords: 15, numTeams: 4 });
    assert.equal(table.numWords, 1); assert.equal(table.numTeams, 2);
    for (const key of ['chaosMode', 'chaosReroll', 'trainingMode', 'trackSeries']) assert.equal(table[key], false);
    assert.equal(State.rosterStatus(lobby('table'), clock).eligible, true);
    assert.equal(State.rosterStatus(lobby('classic'), clock).eligible, false);
    assert.equal(Modes.modeOf({ chaosMode: true }), 'chaos');
});

test('stakes targets follow actual distinct eligible words, including tiny and single-difficulty packs', () => {
    const entries = [{ word: 'The Apple', difficulty: 'easy' }, { word: 'Apple', difficulty: 'easy' }, { word: 'Bee', difficulty: 'hard' }];
    assert.equal(Modes.eligibleCardSize(entries, { numWords: 5, difficulty: 'easy' }), 1);
    assert.equal(Modes.eligibleCardSize(entries, { numWords: 5, difficulty: 'normal' }), 2);
    assert.equal(Modes.riskTarget(1), 1); assert.equal(Modes.riskTarget(2), 2); assert.equal(Modes.riskTarget(5), 3); assert.equal(Modes.riskTarget(15), 9);
});

test('Boost Stakes keeps clue points, bounds deductions and requires a normal completed turn after risk', () => {
    let game = started('boost', ['A', 'B']);
    assert.equal(act(game, 'start-round', undefined, { seed: 1, risky: true }), undefined);
    game.teams[0].points = 5;
    game = clues(game, true); assert.equal(game.turn.risky, true);
    assert.equal(act(game, 'start-round', undefined, { seed: 2, risky: false }), undefined);
    game = act(game, 'end-round'); game = act(game, 'toggle-answer', undefined, { index: 0 }); game = act(game, 'submit-round');
    assert.equal(game.teams[0].points, 4); assert.equal(game.auditEvent.stakes.delta, -1);
    game = score(game); // B completes a turn.
    assert.equal(act(game, 'start-round', undefined, { seed: 1, risky: true }), undefined);
    game = score(game); game = score(game);
    assert.equal(Modes.riskAvailability(game.settings, game.teams[0].points, game.stakes[0]).allowed, true);
    assert.equal(Modes.stakesScore({ mode: 'boost' }, 0, 0, 5, true).after, 0);
    assert.equal(Modes.stakesScore({ mode: 'boost' }, 5, 3, 5, true).after, 10);
});

test('Double Stakes spends once only on scored turns, pays doubles and resets on rematch', () => {
    let game = started('double', ['A', 'B']); game.teams[0].points = 5;
    game = clues(game, true); assert.equal(game.stakes?.[0]?.used, undefined);
    game = act(game, 'end-round'); for (let i = 0; i < 3; i++) game = act(game, 'toggle-answer', undefined, { index: i });
    const submitted = game; game = act(game, 'submit-round');
    assert.equal(game.teams[0].points, 11); assert.equal(game.stakes[0].used, true); assert.equal(game.phase, 'idle');
    assert.equal(State.act(game, actor('A'), { type: 'submit-round', matchId: 1, turnId: submitted.turn.id }, clock, rules), undefined);
    game = score(game); assert.equal(game.phase, 'finished');
    game = act(game, 'rematch', game.hostId, { seed: 1 }); assert.deepEqual(game.stakes, {});
    assert.equal(Modes.stakesScore({ mode: 'double' }, 5, 2, 5, true).after, 2);
});

test('Open Table preserves countdown privacy, hides guesses until every listener locks, and shares speaker credit', () => {
    let game = started('table'); game = clues(game);
    assert.equal(State.view(game, actor(game.turn.speakerId), game.turn.startedAt - 1).showWords, false);
    assert.equal(game.turn.deadline, null);
    assert.equal(State.view(game, actor('B'), clock).showWords, false);
    game = act(game, 'lock-guess', 'B', { text: 'apple' });
    const view = State.view(game, actor('C'), clock); assert.equal(view.ownGuess, undefined); assert.equal(game.phase, 'describing');
    assert.equal(act(game, 'lock-guess', 'B', { text: 'wrong' }), undefined);
    assert.equal(act(game, 'expire-round', 'A'), undefined);
    game = act(game, 'lock-guess', 'C', { text: 'A fruit' }); assert.equal(game.phase, 'selecting');
    assert.deepEqual(game.turn.correctIds, ['B']);
    assert.equal(act(game, 'toggle-correct', 'B', { playerId: 'C' }), undefined);
    game = act(game, 'toggle-correct', 'A', { playerId: 'C' }); game = act(game, 'submit-round', 'A');
    assert.deepEqual(game.party.players.map(player => player.points), [2, 1, 1]);
    assert.equal(game.turn.speakerId, 'B');
});

test('Open Table gives equal speaking opportunities, spectators join on rematch and stale commands are rejected', () => {
    let game = started('table');
    game = State.join(game, actor('D'), clock); assert.equal(State.view(game, actor('D'), clock).participant, undefined);
    let lastTurn;
    for (let i = 0; i < 3; i++) {
        game = clues(game); for (const name of game.turn.guesserIds) game = act(game, 'lock-guess', name, { pass: true });
        lastTurn = game.turn.id; game = act(game, 'submit-round');
    }
    assert.equal(game.phase, 'finished'); assert.deepEqual(game.party.players.map(player => player.turns), [1, 1, 1]); assert.deepEqual(game.party.winners, ['A', 'B', 'C']);
    game = act(game, 'rematch', 'A', { seed: 7 }); assert.equal(game.party.players.length, 4); assert.equal(game.turn.speakerId, 'B');
    assert.equal(State.act(game, actor('A'), { type: 'submit-round', turnId: lastTurn, matchId: 1 }, clock, rules), undefined);
    assert.deepEqual(game.party.players.map(player => player.points), [0, 0, 0, 0]);
});

test('Open Table handles passes, long or empty guesses, speaker departure and recoverable shared review', () => {
    let game = clues(started('table'));
    for (const text of ['', 'a'.repeat(81), '<script>', 'x\ny']) assert.equal(act(game, 'lock-guess', 'B', { text }), undefined);
    game = guesses(game, { B: 'Apple', C: null });
    assert.deepEqual(game.turn.correctIds, ['B']);
    // A keeps the host, but B is the speaker on its next turn.
    game = act(game, 'submit-round', 'A'); game = clues(game); game = guesses(game, { A: 'Apple', C: 'Apple' });
    game.presence.B.connections['connection-B'].connected = false;
    assert.equal(State.view(game, actor('A'), clock).canSelect, true);
    game = act(game, 'submit-round', 'A'); assert.equal(game.party.history.length, 2);
    let other = clues(started('table')); other = State.leave(other, actor('A'), clock);
    assert.equal(other.party.players[0].departed, true); assert.equal(other.turn.speakerId, 'B'); assert.equal(other.party.history.length, 0);
});

test('disconnected guesses can be passed by the host; live guesses and stale connections cannot be overridden', () => {
    let game = clues(started('table'));
    assert.equal(act(game, 'pass-disconnected', 'A', { playerId: 'B' }), undefined);
    game.presence.B.connections['connection-B'].connected = false;
    assert.equal(act(game, 'pass-disconnected', 'C', { playerId: 'B' }), undefined);
    game = act(game, 'pass-disconnected', 'A', { playerId: 'B' }); game = act(game, 'lock-guess', 'C', { text: 'Apple' });
    assert.equal(game.phase, 'selecting'); assert.equal(game.turn.guesses.B.pass, true);
});

test('every authored case has a unique culprit and every pair of evidence facts is sufficient', () => {
    for (const id of Object.keys(CASES)) for (let culprit = 0; culprit < 4; culprit++) {
        for (const facts of [[0, 1], [1, 2], [0, 2]]) assert.deepEqual(consistentSuspects(id, culprit, facts), [culprit]);
        for (let i = 0; i < 3; i++) assert.match(caseEvidence(id, culprit, i), /^The culprit /);
    }
});

test('Case Files carries evidence progress, keeps live answers speaker-only and confirms one final accusation', () => {
    let game = started('case'); game = clues(game);
    assert.equal(State.view(game, actor('B'), clock).showWords, false);
    assert.equal(act(game, 'lock-guess', 'B', { text: 'One' }), undefined);
    game = act(game, 'end-round'); game = act(game, 'toggle-answer', undefined, { index: 0 }); game = act(game, 'submit-round');
    assert.equal(game.party.totalCorrect, 1); assert.equal(game.party.evidenceCount, 0);
    game = score(game, 2); assert.equal(game.party.evidenceCount, 1);
    game = score(game, 5); assert.equal(game.party.totalCorrect, 8); assert.equal(game.party.evidenceCount, 2);
    game = score(game, 1); assert.equal(game.phase, 'accusing');
    assert.equal(act(game, 'choose-suspect', 'B', { index: 0 }), undefined);
    assert.equal(act(game, 'accuse', 'A'), undefined);
    assert.equal(act(game, 'choose-suspect', 'A', { index: 4 }), undefined);
    game = act(game, 'choose-suspect', 'A', { index: game.party.culprit });
    assert.equal(act(game, 'accuse', 'A', { index: (game.party.accusation + 1) % 4 }), undefined);
    game = act(game, 'accuse', 'A', { index: game.party.accusation });
    assert.equal(game.finishReason, 'solved'); assert.equal(act(game, 'accuse', 'A'), undefined);
    game = act(game, 'rematch', 'A', { seed: 2 }); assert.equal(game.party.evidenceCount, 0); assert.equal(game.party.totalCorrect, 0); assert.equal(game.party.accusation, -1);
});

test('Case Files enforces turn budgets, wrong accusations, host handover and stopped outcomes', () => {
    let game = started('case', ['A', 'B'], { caseTurns: 4 });
    for (let i = 0; i < 4; i++) game = score(game);
    assert.equal(game.phase, 'accusing'); assert.equal(game.party.evidenceCount, 0);
    game = State.leave(game, actor('A'), clock); assert.equal(game.hostId, 'B');
    game = act(game, 'choose-suspect', 'B', { index: (game.party.culprit + 1) % 4 }); game = act(game, 'accuse', 'B', { index: game.party.accusation }); assert.equal(game.finishReason, 'unsolved');
    const stopped = act(started('case'), 'end-game', 'A'); assert.equal(stopped.finishReason, 'stopped');
});

test('party reducer retries are deterministic, preserve the input and respect old connections', () => {
    const game = started('table'), copy = structuredClone(game), action = { type: 'start-round', seed: 17, turnId: game.turn.id, matchId: game.matchId };
    const first = State.act(game, actor('A'), action, clock, rules), retry = State.act(game, actor('A'), action, clock, rules);
    assert.deepEqual(game, copy); assert.deepEqual(first, retry);
    assert.equal(State.act(game, { ...actor('A'), connectionId: 'old' }, action, clock, rules), undefined);
});

test('Firebase removal of empty arrays and objects cannot break the first turn or an all-pass review', () => {
    function firebase(value) {
        if (value === null || value === undefined) return undefined;
        if (Array.isArray(value)) return value.length ? value.map(firebase) : undefined;
        if (typeof value === 'object') { const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, firebase(item)]).filter(([, item]) => item !== undefined)); return Object.keys(result).length ? result : undefined; }
        return value;
    }
    let game = firebase(started('table'));
    game = firebase(clues(game)); game = firebase(act(game, 'lock-guess', 'B', { pass: true })); game = firebase(act(game, 'lock-guess', 'C', { pass: true }));
    assert.equal(game.phase, 'selecting'); assert.equal(State.view(game, actor('A'), clock).canSelect, true);
    game = firebase(act(game, 'submit-round', 'A')); assert.equal(game.party.history.length, 1);
    game = firebase(started('case')); game = firebase(clues(game)); game = firebase(act(game, 'end-round')); game = firebase(act(game, 'submit-round'));
    assert.equal(game.party.totalCorrect, 0); assert.equal(game.party.history.length, 1);
});

test('Open Table finishes with equal turns and independently tallied scores across group sizes and cycle lengths', () => {
    for (const size of [3, 5, 12]) for (const cycles of [1, 2, 3]) {
        const names = Array.from({ length: size }, (_, index) => `P${String(index).padStart(2, '0')}`);
        let game = started('table', names, { tableCycles: cycles }); const expected = Object.fromEntries(names.map(name => [name, 0])); let turns = 0;
        // IDs are names in this fixture, with exactly one point to each correct guesser and speaker.
        while (game.phase !== 'finished') {
            game = clues(game); const speaker = game.turn.speakerId;
            for (let index = 0; index < game.turn.guesserIds.length; index++) {
                const name = game.turn.guesserIds[index], correct = (turns + index) % 3 !== 0;
                game = act(game, 'lock-guess', name, correct ? { text: 'Apple' } : { pass: true });
                if (correct) { expected[name]++; expected[speaker]++; }
            }
            game = act(game, 'submit-round', speaker); turns++;
            assert.ok(turns <= size * cycles);
        }
        assert.equal(turns, size * cycles);
        for (const player of game.party.players) { assert.equal(player.turns, cycles); assert.equal(player.points, expected[player.id]); }
    }
});

test('Open Table rejects two-player competition while Case Files and existing team variants remain playable', () => {
    const game = lobby('table', ['A', 'B']); assert.equal(State.rosterStatus(game, clock).eligible, false);
    assert.equal(State.view(game, actor('A'), clock).canStartGame, false);
    assert.equal(act(game, 'start-game', 'A', { seed: 0 }), undefined);
    assert.equal(started('case', ['A', 'B']).phase, 'idle');
    assert.equal(started('boost', ['A', 'B']).phase, 'idle');
});

test('cooperative late arrivals join the crew while party lobby caps still allow existing seats to reconnect', () => {
    let game = started('case', ['A', 'B']); game = State.leave(game, actor('B'), clock);
    game = State.join(game, actor('C'), clock);
    assert.equal(game.phase, 'idle'); assert.ok(game.party.players.some(player => player.id === 'C'));
    assert.equal(State.view(game, actor('C'), clock).participant.name, 'C');
    const names = Array.from({ length: 12 }, (_, index) => `P${index}`); game = lobby('table', names);
    assert.equal(State.joinReason(game, actor('extra')), 'lobby-full');
    assert.equal(State.joinReason(game, { ...actor(names[0]), connectionId: 'new' }), null);
});

test('departures during the lead-in cannot reveal an Open Table answer before Go', () => {
    let game = started('table'); game = act(game, 'start-round', undefined, { seed: 1 });
    game = State.leave(game, actor('B'), clock); game = State.leave(game, actor('C'), clock);
    assert.equal(game.phase, 'describing'); assert.equal(State.view(game, actor('A'), clock).showWords, false);
    clock += 4500; game = State.heartbeat(game, actor('A'), clock);
    assert.equal(game.phase, 'selecting');
});

test('a table with only late spectators left ends without inventing a winner', () => {
    let game = started('table'); game = State.join(game, actor('D'), clock);
    for (const name of ['A', 'B', 'C']) game = State.leave(game, actor(name), clock);
    assert.equal(game.phase, 'finished'); assert.equal(game.finishReason, 'stopped'); assert.deepEqual(game.party.winners, []);
});
