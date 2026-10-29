import test from 'node:test';
import assert from 'node:assert/strict';
import * as Experience from '../gameplay/experience.js';
import { createScreenAwake } from '../gameplay/screen-awake.js';

test('round highlights use actual card size and clue points, with a settled lead change', () => {
    const event = { id: 3, teamIndex: 0, earned: 2, wordCount: 2, pointsBeforeAll: [3, 4] };
    assert.equal(Experience.roundHighlight(event), 'Perfect card! 2/2');
    assert.equal(Experience.leadChange(event, [2, 4]), ''); // Chaos can erase a temporary lead.
    assert.equal(Experience.leadChange(event, [5, 4]), 'Team 1 takes the lead!');
    assert.equal(Experience.roundHighlight({ ...event, wordCount: 5 }, [{ id: 1, teamIndex: 0, earned: 1 }]), "Your team's best round!");
    assert.equal(Experience.roundHighlight({ ...event, earned: 0 }), '');
    assert.equal(Experience.roundHighlight({ ...event, wordCount: 5 }, [event]), '');
});

test('finish context respects equal turns, available card points and unresolved Chaos', () => {
    const progress = { finalTurnCount: 2, pendingTeams: [1], finished: false };
    assert.equal(Experience.finishContext(progress, [20, 16], 1, false, 5), '4 points to tie · 5 to take the lead.');
    assert.equal(Experience.finishContext(progress, [20, 16], 1, true, 5), 'Team 2 trails the lead by 4.');
    assert.equal(Experience.finishContext(progress, [20, 16], 1, false, 3), 'Team 2 trails the lead by 4.');
    assert.equal(Experience.finishContext(progress, [20, 16], 0, false, 5), '');
    assert.equal(Experience.finishContext({ ...progress, finished: true }, [20, 16], 1, false, 5), '');
});

test('series records a result once, counts draws separately and ignores player ordering', () => {
    const series = Experience.recordSeries(Experience.freshSeries(2), 1, [1]);
    assert.deepEqual(series.wins, [0, 1]);
    assert.deepEqual(Experience.recordSeries(series, 1, [1]), series);
    const draw = Experience.recordSeries(series, 2, [0, 1]);
    assert.deepEqual(draw.wins, [0, 1]); assert.equal(draw.draws, 1);
    assert.match(Experience.seriesLabel(draw), /Team 2: 1.*1 draw/);
    assert.equal(Experience.rosterKey([{ players: [{ playerId: 'b' }, { playerId: 'a' }] }]),
        Experience.rosterKey([{ players: [{ playerId: 'a' }, { playerId: 'b' }] }]));
});

test('invitations accept only a four-letter code and exclude unrelated URL data', () => {
    assert.equal(Experience.inviteCode('https://example.com/game/?lobby=abcd'), 'ABCD');
    assert.equal(Experience.inviteCode('https://example.com/?lobby=AB%3C%3E'), '');
    assert.equal(Experience.inviteCode('not a url'), '');
    assert.equal(Experience.inviteLink('https://example.com/game/?unrelated=secret#fragment', 'ABCD'), 'https://example.com/game/?lobby=ABCD');
    assert.throws(() => Experience.inviteLink('https://example.com/', '1234'));
});

test('screen lock releases a pending request when hidden and does not retry rejected requests on every render', async () => {
    let resolveRequest, requests = 0, releases = 0, visibility;
    const document = { visibilityState: 'visible', addEventListener: (_, callback) => { visibility = callback; } };
    const lock = createScreenAwake({ wakeLock: { request: () => { requests++; return new Promise(resolve => { resolveRequest = resolve; }); } } }, document);
    lock.setActive(true); lock.setActive(true); assert.equal(requests, 1);
    document.visibilityState = 'hidden'; visibility();
    resolveRequest({ release: async () => { releases++; }, addEventListener() {} });
    await new Promise(resolve => setImmediate(resolve)); assert.equal(releases, 1);
    document.visibilityState = 'visible'; visibility(); assert.equal(requests, 2);
    lock.setActive(false); resolveRequest({ release: async () => { releases++; } });
    await new Promise(resolve => setImmediate(resolve)); assert.equal(releases, 2);
    let failures = 0;
    const denied = createScreenAwake({ wakeLock: { request: async () => { failures++; throw new Error('denied'); } } }, document);
    denied.setActive(true); await new Promise(resolve => setImmediate(resolve));
    denied.setActive(true); denied.setActive(true); assert.equal(failures, 1);
    createScreenAwake({}, document).setActive(true);
});
