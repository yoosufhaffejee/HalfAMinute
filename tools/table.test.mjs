import test from 'node:test';
import assert from 'node:assert/strict';
import * as State from '../online/state.js';
import * as Modes from '../gameplay/modes.js';
import { REACTIONS, REACTION_LABELS } from '../gameplay/experience.js';
let now;
const actor = name => ({ playerId: name, playerName: name, connectionId: `c-${name}` });
const rules = { drawWords: g => ({ words: ['Apple', 'Bee', 'Cat', 'Dog', 'Elephant', 'Fox', 'Goat', 'Horse', 'Ice', 'Jam', 'Kite', 'Lemon', 'Moon', 'Nest', 'Owl'].slice(0, g.settings.numWords), pools: {} }) };
function lobby(names = ['A', 'B', 'C'], extra = {}) {
    now = 1000000;
    let g = { protocolVersion: State.PROTOCOL_VERSION, settings: Modes.normalizeModeSettings({ mode: 'table', numWords: 5, numTeams: 2, tableCycles: 1, ...extra }), teams: [{ points: 0, players: [] }, { points: 0, players: [] }], hostId: '', phase: 'waiting', currentTeam: 1, dateCreated: now };
    for (const name of names) g = State.join(g, actor(name), now);
    return g;
}
function act(g, type, extra = {}, who = g.turn?.speakerId || g.hostId) {
    const copy = structuredClone(g);
    for (const records of Object.values(copy.presence)) for (const p of Object.values(records.connections)) if (p.connected) p.lastSeen = now;
    return State.act(copy, actor(who), { type, turnId: g.turn?.id, matchId: g.matchId || 1, ...extra }, now, rules);
}
const start = (names, settings, format = 'voice') => act(lobby(names, settings), 'start-game', { seed: 123, format });
function round(g) { g = act(g, 'start-round', { seed: 7 }); now += 4500; return g; }
function firebase(value) {
    if (value == null) return undefined;
    if (Array.isArray(value)) return value.length ? value.map(firebase) : undefined;
    if (typeof value === 'object') { const entries = Object.entries(value).map(([k, v]) => [k, firebase(v)]).filter(([, v]) => v !== undefined); return entries.length ? Object.fromEntries(entries) : undefined; }
    return value;
}
test('full cards follow word settings; sixty-second and unlimited clocks start only after Go', () => {
    for (const words of [1, 5, 10, 15]) {
        let g = start(undefined, { numWords: words }); assert.equal(g.turn.speakerId, 'A');
        g = act(g, 'start-round', { seed: 1 });
        assert.equal(g.turn.words.length, words); assert.equal(g.turn.deadline - g.turn.startedAt, 60000);
        assert.equal(State.view(g, actor('A'), g.turn.startedAt - 1).showWords, false);
        assert.equal(State.view(g, actor('B'), g.turn.startedAt).showWords, false);
        assert.equal(act(g, 'end-round'), undefined); now = g.turn.deadline - 1; assert.equal(act(g, 'expire-round'), undefined);
        now++; g = act(g, 'expire-round', {}, 'B'); assert.equal(g.phase, 'selecting');
    }
    let g = round(start(undefined, { tableTiming: 'unlimited' })); now += 300000;
    assert.equal(act(g, 'expire-round'), undefined); assert.equal(act(g, 'end-round').phase, 'selecting');
});
test('word winners can be corrected, shared for ties, or skipped, and points commit exactly once', () => {
    let g = round(start()); g = act(g, 'end-round');
    for (const id of ['A', 'outsider']) assert.equal(act(g, 'assign-word', { index: 0, playerId: id }), undefined);
    assert.equal(act(g, 'assign-word', { index: 5, playerId: 'B' }), undefined);
    assert.equal(act(g, 'assign-word', { index: 0, playerId: 'B' }, 'B'), undefined);
    g = act(g, 'assign-word', { index: 0, playerId: 'B' }); g = act(g, 'assign-word', { index: 0, playerId: 'C' }); g = act(g, 'assign-word', { index: 0, playerId: 'B' });
    g = act(g, 'assign-word', { index: 1, playerId: 'B' }); g = act(g, 'assign-word', { index: 1, playerId: '' });
    g = act(g, 'assign-word', { index: 3, playerId: 'B' }); const turn = g.turn.id;
    g = act(g, 'submit-round'); assert.deepEqual(g.party.players.map(p => p.points), [2, 1, 1]);
    assert.deepEqual(g.party.history[0].awards, { 0: ['C'], 3: ['B'] }); assert.equal(g.turn.speakerId, 'B');
    assert.equal(State.act(g, actor('A'), { type: 'submit-round', matchId: 1, turnId: turn }, now, rules), undefined);
});
test('typed clues and guesses have committed ordering, role checks, limits and retry protection', () => {
    let g = round(start(undefined, { tableTiming: 'unlimited' }, 'text'));
    assert.equal(act(g, 'send-clue', { index: 0, text: 'Fruit', messageId: 'c1' }, 'B'), undefined);
    assert.equal(act(g, 'send-guess', { index: 0, text: 'Apple', messageId: 'g0' }, 'A'), undefined);
    g = act(g, 'send-clue', { index: 0, text: 'A crunchy fruit', messageId: 'c1' });
    assert.equal(act(g, 'send-clue', { index: 0, text: 'A crunchy fruit', messageId: 'c1' }), undefined);
    for (const text of ['', '<script>', 'x\ny', 'x'.repeat(81)]) assert.equal(act(g, 'send-guess', { index: 0, text, messageId: 'bad' }, 'B'), undefined);
    g = act(g, 'send-guess', { index: 0, text: 'An apple', messageId: 'b1' }, 'B');
    g = act(g, 'send-guess', { index: 0, text: 'Apple', messageId: 'c2' }, 'C');
    assert.deepEqual(g.turn.messages.map(m => m.seq), [1, 2, 3]);
    assert.equal(act(g, 'award-guess', { messageId: 'b1' }, 'C'), undefined);
    g = act(g, 'award-guess', { messageId: 'b1' }); assert.deepEqual(g.turn.awards[0], ['B']); assert.equal(g.turn.activeIndex, 1);
    assert.equal(act(g, 'send-guess', { index: 0, text: 'Apple', messageId: 'late' }, 'C'), undefined);
    assert.equal(act(g, 'award-guess', { messageId: 'c2' }), undefined);
    for (let i = 0; i < 4; i++) g = act(g, 'send-guess', { index: 1, text: 'Bee', messageId: `b-${i}` }, 'B');
    assert.equal(act(g, 'send-guess', { index: 1, text: 'Bee', messageId: 'too-many' }, 'B'), undefined);
    g = act(g, 'skip-word', { index: 1 }); g = act(g, 'focus-word', { index: 1 }); assert.equal(g.turn.skipped[1], undefined);
    for (const index of [1, 2, 3, 4]) g = act(g, 'skip-word', { index });
    assert.equal(g.phase, 'selecting'); assert.equal(g.party.players[0].points, 0);
    g = act(g, 'submit-round'); assert.deepEqual(g.party.players.map(p => p.points), [1, 1, 0]);
});
test('guesser-only scoring is optional, persists on rematch, and leaves the speaker without points', () => {
    assert.equal(Modes.normalizeModeSettings({ mode: 'table' }).tableScoring, 'shared');
    let g = round(start(undefined, { tableScoring: 'guesser' })); g = act(g, 'end-round');
    g = act(g, 'assign-word', { index: 0, playerId: 'B' }); g = act(g, 'submit-round');
    assert.deepEqual(g.party.players.map(p => p.points), [0, 1, 0]);
    g = act(g, 'end-game', {}, g.hostId); g = act(g, 'rematch', { seed: 2 }, g.hostId);
    assert.equal(g.settings.tableScoring, 'guesser'); assert.ok(g.party.players.every(p => p.points === 0));
});
test('a genuine tie awards each guesser once and the speaker once per word under either scoring rule', () => {
    for (const scoring of ['shared', 'guesser']) {
        let g = round(start(undefined, { tableScoring: scoring })); g = act(g, 'end-round');
        g = act(g, 'assign-word', { index: 0, playerId: 'B', selected: true }); g = act(g, 'assign-word', { index: 0, playerId: 'B', selected: true });
        g = act(g, 'assign-word', { index: 0, playerId: 'C', selected: true });
        assert.deepEqual(g.turn.awards[0], ['B', 'C']);
        g = firebase(g); g = act(g, 'submit-round');
        assert.deepEqual(g.party.players.map(p => p.points), [scoring === 'shared' ? 1 : 0, 1, 1]);
        assert.equal(g.party.history[0].earned, 1); assert.deepEqual(g.party.history[0].awards[0], ['B', 'C']);
    }
});
test('typed commands stop at the deadline and cannot expose a word during countdown', () => {
    let g = start(undefined, {}, 'text'); g = act(g, 'start-round', { seed: 1 });
    assert.equal(act(g, 'send-clue', { index: 0, text: 'Fruit', messageId: 'early' }), undefined);
    now = g.turn.deadline; assert.equal(act(g, 'send-guess', { index: 0, text: 'Apple', messageId: 'late' }, 'B'), undefined);
    assert.equal(act(g, 'skip-word', { index: 0 }), undefined); g = act(g, 'expire-round'); assert.equal(g.phase, 'selecting');
});
test('all seven guessers may share one word without multiplying speaker credit', () => {
    const names = Array.from({ length: 8 }, (_, i) => `P${i}`); let g = round(start(names)); g = act(g, 'end-round');
    for (const id of names.slice(1)) g = act(g, 'assign-word', { index: 0, playerId: id, selected: true });
    g = act(g, 'submit-round'); assert.deepEqual(g.party.players.map(p => p.points), Array(8).fill(1)); assert.equal(g.party.history[0].earned, 1);
});
test('disconnect recovery preserves awards and departed speakers cancel only unscored turns', () => {
    let g = round(start()); g = act(g, 'end-round'); g = act(g, 'assign-word', { index: 0, playerId: 'B' });
    g = State.leave(g, actor('A'), now); assert.equal(State.view(g, actor(g.hostId), now).canSelect, true);
    g = act(g, 'submit-round', {}, g.hostId); assert.equal(g.party.history.length, 1); assert.equal(g.party.players[1].points, 1);
    g = round(start()); g.presence.A.connections['c-A'].connected = false;
    g = State.heartbeat(g, actor('B'), now + State.HOST_TIMEOUT_MS + 1); now += State.HOST_TIMEOUT_MS + 1;
    assert.notEqual(g.hostId, 'A'); g = act(g, 'end-round', {}, g.hostId); assert.equal(g.phase, 'selecting');
    g = round(start()); g = State.leave(g, actor('A'), now); assert.equal(g.party.history.length, 0); assert.equal(g.turn.speakerId, 'B'); assert.equal(g.phase, 'waiting');
});
test('equal speaking opportunities and independent score totals hold for three to eight players', () => {
    for (const count of [3, 5, 8]) for (const cycles of [1, 2, 3]) {
        const names = Array.from({ length: count }, (_, i) => `P${i}`); let g = start(names, { tableCycles: cycles });
        const totals = Object.fromEntries(names.map(name => [name, 0])); let turns = 0;
        while (g.phase !== 'finished') {
            g = round(g); const speaker = g.turn.speakerId; g = act(g, 'end-round');
            for (let i = 0; i < 5; i++) if ((turns + i) % 3 !== 0) { const winner = g.turn.guesserIds[(turns + i) % (count - 1)]; totals[winner]++; totals[speaker]++; g = act(g, 'assign-word', { index: i, playerId: winner }); }
            g = act(g, 'submit-round'); turns++; assert.ok(turns <= count * cycles);
        }
        assert.equal(turns, count * cycles); for (const p of g.party.players) { assert.equal(p.turns, cycles); assert.equal(p.points, totals[p.id]); }
        g = act(g, 'rematch', { seed: 3 }, g.hostId); assert.equal(g.turn.speakerId, names[1]); assert.equal(g.party.format, 'voice'); assert.ok(g.party.players.every(p => p.points === 0));
    }
});
test('lobby requires a format and three to eight players; late arrivals wait for rematch', () => {
    let g = lobby(); assert.equal(act(g, 'start-game', { seed: 1 }), undefined);
    assert.equal(act(lobby(['A', 'B']), 'start-game', { seed: 1, format: 'voice' }), undefined);
    g = lobby(Array.from({ length: 8 }, (_, i) => `P${i}`)); assert.equal(State.joinReason(g, actor('extra')), 'lobby-full');
    assert.equal(State.joinReason(g, { ...actor('P0'), connectionId: 'replacement' }), null);
    g = start(); g = State.join(g, actor('D'), now); assert.equal(State.view(g, actor('D'), now).participant, undefined);
    for (const id of ['A', 'B', 'C']) g = State.leave(g, actor(id), now);
    assert.equal(g.finishReason, 'stopped'); assert.deepEqual(g.party.winners, []);
});
test('one-device play follows entered name order even when all join timestamps match', () => {
    let g = lobby(['Zoe', 'Amy', 'Bob']); g.localPlayerOrder = ['Zoe', 'Amy', 'Bob'];
    g = act(g, 'start-game', { seed: 1, format: 'voice' }); assert.equal(g.turn.speakerId, 'Zoe');
    g = round(g); g = act(g, 'end-round'); g = act(g, 'submit-round'); assert.equal(g.turn.speakerId, 'Amy');
});
test('Firebase empty-collection round trips preserve typed turns and zero-award scoring', () => {
    let g = firebase(start(undefined, { tableTiming: 'unlimited' }, 'text')); g = firebase(round(g));
    g = firebase(act(g, 'send-clue', { index: 0, text: 'Fruit', messageId: 'm1' })); assert.equal(g.turn.messages[0].text, 'Fruit');
    g = firebase(act(g, 'end-round')); g = firebase(act(g, 'submit-round')); assert.equal(g.party.history[0].earned, 0);
});
test('seven distinct reactions share accessible labels and existing guarded reaction rules', () => {
    assert.equal(Object.keys(REACTIONS).length, 7); assert.equal(new Set(Object.values(REACTIONS)).size, 7);
    let g = round(start()); g = act(g, 'end-round'); g = act(g, 'submit-round');
    for (const key of Object.keys(REACTIONS)) { assert.ok(REACTION_LABELS[key]); now += 2000; g = act(g, 'react', { reaction: key, reviewId: g.roundReview.turnId }, 'B'); assert.equal(g.reactions.B.reaction, key); }
    g = round(g); assert.equal(act(g, 'react', { reaction: 'shock', reviewId: 1 }, 'B'), undefined);
});
