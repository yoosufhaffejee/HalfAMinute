import test from 'node:test';
import assert from 'node:assert/strict';
import * as State from '../online/state.js';
import * as Modes from '../gameplay/modes.js';
import { availableFacts } from '../gameplay/cases.js';

let clock = 1000000;
const actor = name => ({ playerId: name, playerName: name, connectionId: `connection-${name}` });
const rules = { drawWords: game => { if(game.settings.mode==='case'){const f=availableFacts(game.settings.caseId,game.party.found,game.turn.leadId);const words=f.flatMap(item=>item.words.map(word=>({word,id:item.id}))).slice(0,game.settings.numWords);return {words:words.map(w=>w.word),caseFactIds:words.map(w=>w.id),pools:{}};}return {words:['One','Two','Three','Four','Five'].slice(0,game.settings.numWords),pools:{}};} };
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
function started(mode, names, extra) { return act(lobby(mode, names, extra), 'start-game', names?.[0] || 'A', { seed: 0, ...(mode === 'table' ? { format: 'voice' } : {}) }); }
function clues(game, risky = false) { if(game.settings.mode==='case')game=act(game,'choose-lead',undefined,{leadId:availableFacts(game.settings.caseId,game.party.found)[0].leadId}); const next = act(game, 'start-round', undefined, { seed: 42, risky }); clock += 4500; return next; }
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
    assert.equal(table.numWords, 15); assert.equal(table.numTeams, 2);
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















test('party reducer retries are deterministic, preserve the input and respect old connections', () => {
    const game = started('table'), copy = structuredClone(game), action = { type: 'start-round', seed: 17, turnId: game.turn.id, matchId: game.matchId };
    const first = State.act(game, actor('A'), action, clock, rules), retry = State.act(game, actor('A'), action, clock, rules);
    assert.deepEqual(game, copy); assert.deepEqual(first, retry);
    assert.equal(State.act(game, { ...actor('A'), connectionId: 'old' }, action, clock, rules), undefined);
});

test('Firebase removal of empty arrays and objects cannot break the first turn or a zero-award review', () => {
    function firebase(value) {
        if (value === null || value === undefined) return undefined;
        if (Array.isArray(value)) return value.length ? value.map(firebase) : undefined;
        if (typeof value === 'object') { const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, firebase(item)]).filter(([, item]) => item !== undefined)); return Object.keys(result).length ? result : undefined; }
        return value;
    }
    let game = firebase(started('table'));
    game = firebase(clues(game)); game = firebase(act(game, 'end-round'));
    assert.equal(game.phase, 'selecting'); assert.equal(State.view(game, actor('A'), clock).canSelect, true);
    game = firebase(act(game, 'submit-round', 'A')); assert.equal(game.party.history.length, 1);
    game = firebase(started('case')); game = firebase(clues(game)); game = firebase(act(game, 'end-round')); game = firebase(act(game, 'submit-round'));
    assert.equal(game.party.totalCorrect, 0); assert.equal(game.party.history.length, 1);
});





test('cooperative late arrivals join the crew while party lobby caps still allow existing seats to reconnect', () => {
    let game = started('case', ['A', 'B']); game = State.leave(game, actor('B'), clock);
    game = State.join(game, actor('C'), clock);
    assert.equal(game.phase, 'idle'); assert.ok(game.party.players.some(player => player.id === 'C'));
    assert.equal(State.view(game, actor('C'), clock).participant.name, 'C');
    const names = Array.from({ length: 8 }, (_, index) => `P${index}`); game = lobby('table', names);
    assert.equal(State.joinReason(game, actor('extra')), 'lobby-full');
    assert.equal(State.joinReason(game, { ...actor(names[0]), connectionId: 'new' }), null);
});
