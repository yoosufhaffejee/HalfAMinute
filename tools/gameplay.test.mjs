import test from 'node:test';
import assert from 'node:assert/strict';
import * as Rules from '../gameplay/rules.js';
import * as State from '../online/state.js';

const entries = (count, type) => Array.from({ length: count }, (_, i) => ({ word: `${type} ${i}`, difficulty: type }));
test('dealing is deterministic, normalized and does not mutate the saved deck', () => {
    const objects = [...entries(12, 'easy'), ...entries(8, 'hard'), { word: 'The EASY-0', difficulty: 'hard' }];
    const deck = { easy: ['easy1'], hard: [] }, before = structuredClone(deck);
    assert.deepEqual(Rules.drawWords(objects, deck, 'normal', 15, 9), Rules.drawWords(objects, deck, 'normal', 15, 9));
    const result = Rules.drawWords(objects, deck, 'normal', 15, 9);
    assert.equal(new Set(result.words.map(Rules.answerKey)).size, 15);
    assert.deepEqual(deck, before);
    assert.equal(Rules.answerKey('The Café-au-lait'), Rules.answerKey('Cafe au lait'));
});
test('every answer in a difficulty is used before recycling and other difficulty stays consumed', () => {
    const objects = [...entries(6, 'easy'), ...entries(12, 'hard')];
    let deck = {}, easy = new Set(), hard = new Set();
    for (let turn = 0; turn < 4; turn++) {
        const result = Rules.drawWords(objects, deck, 'normal', 5, turn); deck = result.deck;
        for (const word of result.words) {
            const set = word.startsWith('easy') ? easy : hard;
            if (word.startsWith('hard') || turn < 2) assert.equal(set.has(word), false);
            set.add(word);
        }
        if (turn === 2) assert.deepEqual(result.recycled, ['easy']);
    }
    assert.equal(easy.size, 6); assert.equal(hard.size, 8);
});
test('small and single-difficulty packs never duplicate a word on a card', () => {
    for (const difficulty of ['easy', 'hard', 'normal']) {
        const result = Rules.drawWords([...entries(2, 'easy'), ...entries(3, 'hard')], {}, difficulty, 15, 4);
        assert.equal(new Set(result.words).size, result.words.length);
        assert.equal(result.words.length, difficulty === 'normal' ? 5 : difficulty === 'easy' ? 2 : 3);
    }
});
test('a refill remembers the answers already drawn on this card', () => {
    const objects = entries(5, 'easy');
    const first = Rules.drawWords(objects, {}, 'easy', 3, 1);
    const second = Rules.drawWords(objects, first.deck, 'easy', 3, 2);
    assert.ok(second.recycled.includes('easy'));
    assert.equal(second.deck.easy.length, 3);
    assert.ok(second.words.every(word => second.deck.easy.includes(Rules.answerKey(word))));
});
test('Chaos pacing settles the board and reveals its map before the unchanged move and effect beats', () => {
    for (const value of Object.values(Rules.PRESETS)) { assert.equal(value.numWords, 5); assert.equal(value.numSeconds, 30); }
    for (const count of [0, 1, 5, 15]) {
        const timing = Rules.resolutionTiming(true, false, count);
        assert.equal(timing.boardMs, 350);
        assert.equal(timing.revealMs, 450);
        assert.ok(timing.moveMs >= Math.max(1000, count * 360));
        assert.ok(timing.landingMs >= 1400);
        assert.ok(timing.effectMs >= 1400);
        assert.ok(timing.resultMs >= 2400);
        assert.equal(Rules.resolutionDuration(true, false, count), timing.durationMs);
        assert.equal(timing.durationMs, 800 + timing.moveMs + timing.landingMs + timing.effectMs + timing.resultMs);
        const safe = Rules.resolutionTiming(false, false, count);
        assert.equal(safe.landingMs + safe.effectMs, 0);
        assert.ok(safe.resultMs >= 1600);
        assert.ok(safe.durationMs < timing.durationMs);
        assert.ok(Rules.resolutionTiming(false, true, count).resultMs >= 2000);
    }
});

test('turn messages use player language instead of score arithmetic', () => {
    assert.equal(Rules.recap({ teamIndex: 1, earned: 2, before: 0, after: 2 }), 'Team 2 scored 2 points.');
    assert.equal(Rules.recap({ teamIndex: 0, earned: 1, effect: 'No powerup' }), 'Team 1 scored 1 point.');
    assert.equal(Rules.recap({ teamIndex: 0, earned: 3, effect: { type: 'plus1' } }), 'Team 1 scored 3 points. Bonus point!');
    assert.equal(Rules.effectMessage({ type: 'bomb', actorDelta: -3 }), 'Bomb! Back 3 spaces.');
});
test('random starters are distributed and rematches give every team the first turn', () => {
    for (const teams of [2, 3, 4]) {
        const counts = Array(teams).fill(0);
        for (let seed = 0; seed < 12000; seed++) counts[Rules.startingTeam(seed, teams)]++;
        assert.ok(counts.every(n => Math.abs(n / 12000 - 1 / teams) < 0.02));
        let starter = Rules.startingTeam(19, teams); const seen = new Set();
        for (let i = 0; i < teams; i++) { seen.add(starter); starter = Rules.startingTeam(0, teams, starter); }
        assert.equal(seen.size, teams);
    }
});

test('equal-turn progress freezes the final cycle and compares full scores rather than board positions', () => {
    let progress=Rules.matchProgress([21,19],20,[{teamIndex:0}],null);
    assert.equal(progress.finalTurnCount,1);assert.equal(progress.finished,false);
    assert.deepEqual(progress.pendingTeams,[1]);
    assert.match(Rules.finalRoundMessage(progress),/Team 2 has one turn left/);
    const events=[{teamIndex:0},{teamIndex:1}];
    for(const [points,winners] of [[[21,22],[1]],[[21,21],[0,1]],[[19,19],[0,1]]]) {
        progress=Rules.matchProgress(points,20,events,1);
        assert.equal(progress.finished,true);assert.deepEqual(progress.winners,winners);
        assert.equal(Rules.finalRoundMessage(progress),'');
    }
    const catchup=Rules.matchProgress([21,15,18],20,[{teamIndex:0},{teamIndex:0},{teamIndex:1}],null);
    assert.equal(catchup.finalTurnCount,2);assert.deepEqual(catchup.pendingTeams,[1,2]);
});

test('equal-skill turns remove the starting-slot advantage across all deterministic scoring permutations', () => {
    // Every permutation of the same performances must produce the same high-score result,
    // with equal completed turns, regardless of the starting team.
    for(const scores of [[3,1],[1,3],[3,3],[0,2,3],[3,0,2],[2,3,0],[2,2,2]]) {
        for(let starter=0;starter<scores.length;starter++) {
            const points=Array(scores.length).fill(0),events=[];
            let progress,turn=0;
            do {
                const teamIndex=(starter+turn++)%scores.length;
                points[teamIndex]+=scores[teamIndex];events.push({teamIndex});
                progress=Rules.matchProgress(points,10,events,progress?.finalTurnCount);
            }while(!progress.finished&&turn<100);
            assert.equal(progress.finished,true);
            assert.equal(new Set(progress.turns).size,1);
            assert.deepEqual(progress.winners,Rules.scoreLeaders(scores));
        }
    }
});

test('first-to-target finishes at the resolved target without reply turns, while unknown rules keep equal turns', () => {
    for (const points of [[20,19],[21,19],[0,20,18],[0,1,2,23]]) {
        const progress=Rules.matchProgress(points,20,[{teamIndex:points.indexOf(Math.max(...points))}],2,'first-to-target');
        assert.equal(progress.finished,true);assert.equal(progress.finalTurnCount,null);
        assert.deepEqual(progress.pendingTeams,[]);assert.deepEqual(progress.winners,Rules.scoreLeaders(points));
        assert.equal(Rules.finalRoundMessage(progress),'');
    }
    assert.equal(Rules.matchProgress([19,18],20,[],null,'first-to-target').finished,false);
    assert.equal(Rules.matchProgress([20,19],20,[{teamIndex:0}],null,'bad').finished,false);
    assert.equal(Rules.normalizeWinRule(undefined),'equal-turns');
    assert.equal(Rules.winRuleLabel('first-to-target'),'First to target');
});

const now = 1000000;
const actor = name => ({ playerId: name, playerName: name, connectionId: `c-${name}` });
const rules = {
    drawWords: () => ({ words: ['One', 'Two'], pools: { deck: { easy: ['one', 'two'], hard: [] } } }),
    planChaos: (game, points) => ({ actorIndex: game.turn.teamIndex, points: points.map((p, i) => p + (i === game.turn.teamIndex ? 1 : 0)),
        basePoints: points, shields: [0, 0], summary: 'Boost +1', landing: { type: 'plus1' },
        powerups: { 1: 'plus1' }, durationMs: 2200, seed: game.turn.seed })
};
function act(game, who, type, extras = {}, time = Math.max(now, game.turn?.startedAt || 0, game.turn?.selectingAt || 0, game.turn?.submittedAt || 0)) {
    return State.act(game, actor(who), { type, turnId: game.turn?.id, matchId: game.matchId, ...extras }, time, rules);
}
function choice() {
    let game = { protocolVersion: State.PROTOCOL_VERSION, teams: [{ points: 0 }, { points: 0 }], settings: { numTeams: 2, numSeconds: 30,
        pointsToWin: 20, chaosMode: true, chaosReroll: true }, currentTeam: 1, currentRound: 0, phase: 'waiting', hostEpoch: 0,
        chaos: { teamShields: [0, 0] } };
    for (const name of ['A', 'B', 'C', 'D']) game = State.join(game, actor(name), now);
    game = act(game, 'A', 'start-game'); game = act(game, 'A', 'start-round', { seed: 17 });
    game = act(game, 'A', 'end-round'); game = act(game, 'A', 'toggle-answer', { index: 0 });
    return act(game, 'A', 'submit-round');
}
test('only the current speaker can choose; reroll is deterministic and spends one team resource', () => {
    const game = choice(), original = structuredClone(game);
    assert.equal(game.phase, 'chaos-choice');
    assert.equal(act(game, 'B', 'reroll-chaos'), undefined);
    const result = act(game, 'A', 'reroll-chaos');
    assert.deepEqual(result, act(game, 'A', 'reroll-chaos'));
    assert.deepEqual(game, original);
    assert.equal(result.phase, 'resolving'); assert.equal(result.chaos.rerollsUsed[0], true);
    assert.deepEqual(result.turn.resolution.basePoints, [1, 0]);
    assert.equal(result.turn.resolution.seed, (17 ^ 0x9E3779B9) >>> 0);
    assert.equal(act(result, 'A', 'reroll-chaos'), undefined);
});
test('choice expiry is host/epoch/deadline guarded and commits the kept result once', () => {
    const game = choice(), deadline = game.turn.choiceDeadline;
    assert.equal(act(game, 'A', 'expire-choice', { hostEpoch: game.hostEpoch }, deadline - 1), undefined);
    assert.equal(act(game, 'B', 'expire-choice', { hostEpoch: game.hostEpoch }, deadline), undefined);
    assert.equal(act(game, 'A', 'expire-choice', { hostEpoch: game.hostEpoch - 1 }, deadline), undefined);
    assert.equal(act(game, 'A', 'reroll-chaos', {}, deadline), undefined);
    let result = act(game, 'A', 'expire-choice', { hostEpoch: game.hostEpoch }, deadline);
    assert.equal(result.phase, 'resolving'); assert.equal(result.chaos.rerollsUsed, undefined);
    result = act(result, 'A', 'resolve-chaos', { hostEpoch: result.hostEpoch }, deadline + 2200);
    assert.equal(result.teams[0].points, 2); assert.equal(Object.keys(result.auditEvents).length, 1);
});
test('host/speaker departure and refresh preserve a sealed choice and the new host can recover it', () => {
    let game = choice(); const deadline = game.turn.choiceDeadline;
    game = State.join(game, { ...actor('A'), connectionId: 'refresh' }, now + 1);
    assert.equal(game.phase, 'chaos-choice'); assert.equal(act(game, 'A', 'reroll-chaos'), undefined);
    game = State.leave(game, { ...actor('A'), connectionId: 'refresh' }, now + 2);
    assert.equal(game.phase, 'chaos-choice'); assert.equal(game.hostId, 'C');
    game = act(game, 'C', 'expire-choice', { hostEpoch: game.hostEpoch }, deadline);
    game = act(game, 'C', 'resolve-chaos', { hostEpoch: game.hostEpoch }, deadline + 2200);
    assert.equal(game.teams[0].points, 2); assert.equal(game.phase, 'waiting');
});
test('rematch creates a new match, rotates the starter, resets resources and rejects stale attempts', () => {
    let game = choice(); game = act(game, 'A', 'keep-chaos');
    game = act(game, 'A', 'resolve-chaos', { hostEpoch: game.hostEpoch }, game.turn.resolution.startedAt + 2200);
    game = act(game, 'A', 'end-game'); const original = structuredClone(game), oldTurn = game.turn.id;
    assert.equal(act(game, 'B', 'rematch'), undefined);
    const result = act(game, 'A', 'rematch');
    assert.equal(result.matchId, game.matchId + 1); assert.equal(result.currentTeam, 2);
    assert.equal(result.phase, 'ready'); assert.equal(result.isGameStarted, false);
    assert.deepEqual(result.teams.map(t => t.points), [0, 0]);
    assert.deepEqual(State.members(result).map(p => p.playerId), State.members(game).map(p => p.playerId));
    assert.deepEqual(result.deck, game.deck); assert.deepEqual(result.chaos.rerollsUsed, [false, false]);
    assert.deepEqual(result.auditEvents, {}); assert.ok(result.turn.id > oldTurn);
    assert.deepEqual(game, original);
    let next = act(result, 'A', 'start-game'); next = act(next, 'A', 'end-game');
    assert.equal(act(next, 'A', 'rematch', { matchId: game.matchId }), undefined);
    assert.equal(act(next, 'A', 'end-game', { matchId: game.matchId }), undefined);
    assert.equal(act(next, 'A', 'submit-round', { turnId: oldTurn }), undefined);
});

test('a delayed start command cannot start a later rematch', () => {
    let game = choice(); game = act(game, 'A', 'keep-chaos');
    game = act(game, 'A', 'resolve-chaos', { hostEpoch: game.hostEpoch }, game.turn.resolution.startedAt + 2200);
    game = act(game, 'A', 'end-game'); const oldMatchId = game.matchId;
    game = act(game, 'A', 'rematch');
    assert.equal(act(game, 'A', 'start-game', { matchId: oldMatchId }), undefined);
    assert.equal(act(game, 'A', 'start-game').phase, 'idle');
});
