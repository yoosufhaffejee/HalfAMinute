import test from 'node:test';
import assert from 'node:assert/strict';
import * as State from '../online/state.js';

const NOW = 1000000;
const LEAD_IN = 4500;
const actor = (name, connectionId = `connection-${name}`) => ({ playerId: `id-${name}`, playerName: name, connectionId });
function lobby(teamCount = 2, extra = {}) {
    return {
        protocolVersion: State.PROTOCOL_VERSION, dateCreated: NOW,
        settings: { numTeams: teamCount, numWords: 5, numSeconds: 30, pointsToWin: 20, chaosMode: false, ...extra },
        teams: Array.from({ length: teamCount }, (_, id) => ({ id, points: 0, players: [] })),
        currentTeam: 1, currentRound: 0, phase: 'waiting', gameState: 'waiting', isGameStarted: false,
        hostId: '', hostEpoch: 0, chaos: { teamShields: Array(teamCount).fill(0) }
    };
}
function withPlayers(names = ['A', 'B'], teamCount = 2, extra = {}) {
    return names.reduce((game, name) => State.join(game, actor(name), NOW), lobby(teamCount, extra));
}
const rules = {
    drawWords: () => ({ words: ['One', 'Two', 'Three'], pools: { easyWords: ['Four'], hardWords: ['Five'] } }),
    planChaos: (game, points) => ({ points, basePoints: points, shields: [1, 0], summary: 'shield gained', powerups: {}, durationMs: 3000 })
};
function act(game, name, type, extra = {}, now = Math.max(NOW, game.turn?.startedAt || 0, game.turn?.selectingAt || 0, game.turn?.submittedAt || 0)) {
    return State.act(game, typeof name === 'string' ? actor(name) : name,
        { type, turnId: game.turn?.id, ...extra }, now, rules);
}
function started(names = ['A', 'B'], count = 2, extra = {}) {
    return act(withPlayers(names, count, extra), names[0], 'start-game');
}
function selection(game) {
    const speaker = State.members(game).find(player => player.playerId === game.turn.speakerId);
    game = act(game, speaker, 'start-round', { seed: 42 });
    return act(game, speaker, 'end-round');
}
function finish(game) {
    const speaker = State.members(game).find(player => player.playerId === game.turn.speakerId);
    return act(selection(game), speaker, 'submit-round');
}
function coherent(game) {
    assert.equal(game.numPlayers, State.members(game).length);
    assert.ok(game.teams.every(team => (team.players || []).every((p, i) => p.id === i)));
    if (game.phase === 'ended' || game.phase === 'resolving' || !game.isGameStarted) return;
    const speakers = State.members(game).filter(player => player.isSpeaker);
    assert.equal(speakers.length, 1);
    assert.equal(speakers[0].playerId, game.turn.speakerId);
    assert.equal(speakers[0].teamIndex, game.currentTeam - 1);
    assert.equal(game.turn.teamIndex, game.currentTeam - 1);
}

test('existing two/three player exceptions and four team eligibility are preserved', () => {
    for (let teams = 2; teams <= 4; teams++) for (let players = 0; players <= 12; players++) {
        assert.equal(State.canPlay(teams, players), (teams === 2 && players === 2) || (teams === 3 && players === 3) || players >= teams * 2);
    }
    assert.equal(started(['A', 'B', 'C'], 3).phase, 'idle');
    assert.equal(act(withPlayers(['A', 'B', 'C', 'D'], 4), 'A', 'start-game'), undefined);
});

test('the server schedules Go before clue time and refuses early end/expiry commands', () => {
    const game=act(started(['A','B','C','D']),'A','start-round',{seed:42},NOW);
    assert.equal(game.turn.startedAt,NOW+LEAD_IN);
    assert.equal(game.turn.deadline,game.turn.startedAt+30000);
    for(const time of [NOW,NOW+LEAD_IN-1]) {
        assert.equal(State.view(game,actor('A'),time).showWords,false);
        assert.equal(State.view(game,actor('B'),time).showWords,false);
        assert.equal(State.view(game,actor('A'),time).canEndRound,false);
        assert.equal(act(game,'A','end-round',{},time),undefined);
        assert.equal(act(game,'B','expire-round',{},time),undefined);
    }
    const go=State.view(game,actor('A'),game.turn.startedAt);
    assert.equal(go.showWords,true);assert.equal(go.canEndRound,true);assert.equal(go.remainingSeconds,30);
    assert.equal(State.view(game,actor('A'),game.turn.startedAt+1000).remainingSeconds,29);
});

test('a disconnected reserved seat cannot make starting a game or round eligible', () => {
    let game=withPlayers();
    State.connection(game,State.ownsSeat(game,actor('B'))).connected=false;
    assert.equal(game.numPlayers,2); // Reconnect grace keeps the seat, not start permission.
    assert.equal(State.view(game,actor('A'),NOW).canStartGame,false);
    assert.equal(act(game,'A','start-game'),undefined);
    game=State.join(game,actor('B','replacement'),NOW+1);
    game=act(game,'A','start-game');
    State.connection(game,State.ownsSeat(game,actor('B','replacement'))).connected=false;
    assert.equal(State.view(game,actor('A'),NOW+2).canStartRound,false);
    assert.equal(act(game,'A','start-round',{seed:1}),undefined);
    assert.equal(game.teams[1].players.length,1);
});

test('connected-player exceptions retain word privacy and require a connected opposing team', () => {
    let game=started(['A','B','C','D']);
    for(const name of ['C','D'])State.connection(game,State.ownsSeat(game,actor(name))).connected=false;
    assert.equal(State.rosterStatus(game,NOW).eligible,true);
    game=act(game,'A','start-round',{seed:1});
    assert.equal(State.view(game,actor('B'),game.turn.startedAt).showWords,false);
    game=State.join(game,actor('C','returning'),NOW+1);
    assert.equal(State.view(game,actor('B'),game.turn.startedAt).showWords,false); // Joining never exposes a small round's answers.
    const sameTeam=started(['A','B','C','D']);
    for(const name of ['B','D'])State.connection(sameTeam,State.ownsSeat(sameTeam,actor(name))).connected=false;
    assert.equal(State.rosterStatus(sameTeam,NOW).connectedPlayers,2);
    assert.equal(State.rosterStatus(sameTeam,NOW).eligible,false);
});

test('a temporary disconnect preserves a running round and sealed results but blocks the next start', () => {
    let game=act(started(),'A','start-round',{seed:1});
    const id=game.turn.id, deadline=game.turn.deadline;
    State.connection(game,State.ownsSeat(game,actor('B'))).connected=false;
    game=State.prune(game,actor('A'),NOW+1)||game;
    assert.equal(game.turn.id,id);assert.equal(game.turn.deadline,deadline);
    game=act(game,'A','end-round',{},game.turn.startedAt);
    game=act(game,'A','toggle-answer',{index:0});game=act(game,'A','submit-round');
    assert.equal(game.teams[0].points,1);
    assert.equal(State.view(game,actor('A'),NOW+LEAD_IN).canStartRound,false);
    game=State.join(game,actor('B','fresh'),NOW+LEAD_IN+1);
    assert.equal(game.teams[0].points,1);
    assert.equal(State.view(game,actor('B','fresh'),NOW+LEAD_IN+1).canStartRound,true);
});

test('joins balance teams without moving existing players', () => {
    const game = withPlayers(['A', 'B', 'C', 'D', 'E']);
    assert.deepEqual(game.teams.map(t => t.players.map(p => p.playerName)), [['A', 'C', 'E'], ['B', 'D']]);
});

test('stale round completion cannot erase a new join or resurrect a departure', () => {
    let game = selection(started(['A', 'B', 'C', 'D', 'E', 'F']));
    const old = structuredClone(game);
    game = State.join(game, actor('G'), NOW);
    game = State.leave(game, actor('F'), NOW);
    const next = State.act(game, actor('A'), { type: 'submit-round', turnId: old.turn.id }, NOW, rules);
    assert.ok(State.members(next).some(p => p.playerName === 'G'));
    assert.ok(!State.members(next).some(p => p.playerName === 'F'));
    coherent(next);
});

test('duplicate submit and stale actions cannot score or advance twice', () => {
    let game = selection(started());
    game = act(game, 'A', 'toggle-answer', { index: 0 });
    const oldId = game.turn.id;
    game = act(game, 'A', 'submit-round');
    assert.equal(game.teams[0].points, 1);
    assert.equal(State.act(game, actor('A'), { type: 'submit-round', turnId: oldId }, NOW, rules), undefined);
    assert.equal(State.act(game, actor('B'), { type: 'start-round', turnId: oldId, seed: 42 }, NOW, rules), undefined);
    assert.equal(Object.keys(game.auditEvents).length, 1);
});

test('join and non-speaker leave preserve live phase, words, deadline and selections', () => {
    let game = started(['A', 'B', 'C', 'D', 'E', 'F']);
    game = act(game, 'A', 'start-round', { seed: 1 });
    const liveTurn = structuredClone(game.turn);
    game = State.join(game, actor('G'), NOW + 1);
    game = State.leave(game, actor('F'), NOW + 2);
    assert.equal(game.phase, 'describing');
    assert.deepEqual(game.turn, liveTurn);
    game = act(game, 'A', 'end-round');
    game = act(game, 'A', 'toggle-answer', { index: 1 });
    game = State.join(game, actor('H'), NOW + 3);
    assert.equal(game.phase, 'selecting');
    assert.deepEqual(game.turn.selectedIndexes, [1]);
    const result = act(game, 'A', 'submit-round');
    assert.equal(result.teams[0].points, 1);
    assert.deepEqual(Object.values(result.auditEvents)[0].correctAnswers, ['Two']);
});

test('eleven second host delay transfers authority while retaining all four seats', () => {
    let game = started(['A', 'B', 'C', 'D']);
    game = State.heartbeat(game, actor('B'), NOW + 11001);
    assert.equal(game.numPlayers, 4);
    assert.equal(game.hostId, actor('B').playerId);
    assert.equal(game.phase, 'idle');
    assert.ok(State.members(game).some(p => p.playerName === 'A'));
});

test('explicit disconnect transfers host before the ninety second removal grace', () => {
    let game = started(['A', 'B', 'C', 'D']);
    game.presence['id-A'].connections['connection-A'] = { connected: false, lastSeen: NOW };
    game = State.prune(game, actor('B'), NOW + 1);
    assert.equal(game.hostId, 'id-C');
    assert.equal(game.numPlayers, 4);
    game = State.heartbeat(game, actor('B'), NOW + 90001);
    game = State.prune(game, actor('B'), NOW + 90001);
    assert.ok(!State.members(game).some(p => p.playerName === 'A'));
    assert.equal(game.numPlayers, 3);
    coherent(game);
});

test('background heartbeat throttling never ejects a server-connected player', () => {
    let game = started(['A', 'B', 'C', 'D']);
    game = State.heartbeat(game, actor('B'), NOW + 300000);
    const cleaned = State.prune(game, actor('B'), NOW + 300000) || game;
    assert.equal(cleaned.numPlayers, 4);
    assert.equal(cleaned.hostId, 'id-B');
});

test('missing non-host presence is pruned after the same grace period', () => {
    let game = started(['A', 'B', 'C', 'D']);
    delete game.presence['id-D'];
    game = State.heartbeat(game, actor('A'), NOW + 90001);
    game = State.prune(game, actor('A'), NOW + 90001);
    assert.equal(State.members(game).some(p => p.playerName === 'D'), false);
});

test('presence uses identity so distinct punctuation names never collide', () => {
    const game = withPlayers(['Jo.Smith', 'Jo_Smith']);
    assert.equal(Object.keys(game.presence).length, 2);
    assert.equal(State.joinReason(game, actor('jo.smith')), 'duplicate-player-name');
});

test('refresh restores team, turn and selections and revokes the old connection', () => {
    let game = selection(started());
    game = act(game, 'A', 'toggle-answer', { index: 2 });
    const old = structuredClone(game.turn);
    const refreshed = actor('A', 'refreshed-connection');
    game = State.join(game, refreshed, NOW + 1);
    assert.deepEqual(game.turn, old);
    assert.equal(game.numPlayers, 2);
    assert.equal(State.act(game, actor('A'), { type: 'submit-round', turnId: old.id }, NOW + 2, rules), undefined);
    assert.equal(State.leave(game, actor('A'), NOW + 2), undefined);
    assert.equal(State.heartbeat(game, actor('A'), NOW + 2), undefined);
    assert.equal(State.view(game, refreshed, NOW + 2).canSelect, true);
});

test('an old disconnect marker cannot disconnect the refreshed session', () => {
    let game = started();
    const fresh = actor('A', 'fresh');
    game = State.join(game, fresh, NOW + 1);
    game.presence['id-A'].connections['connection-A'] = { connected: false, lastSeen: NOW + 2 };
    assert.equal(State.view(game, fresh, NOW + 2).speaker, true);
    assert.equal(State.view(game, actor('A'), NOW + 2).speaker, false);
});

test('removed players have no controls and cannot start, select, submit, or end a game', () => {
    let game = selection(started(['A', 'B', 'C', 'D', 'E', 'F']));
    const oldId = game.turn.id;
    game = State.leave(game, actor('A'), NOW);
    const view = State.view(game, actor('A'), NOW);
    assert.equal(view.speaker, false);
    assert.equal(view.host, false);
    assert.equal(view.showWords, false);
    for (const type of ['start-round', 'toggle-answer', 'submit-round', 'end-round', 'end-game']) {
        assert.equal(State.act(game, actor('A'), { type, turnId: oldId, index: 0, seed: 1 }, NOW, rules), undefined);
    }
    coherent(game);
});

test('uneven two/three rotation eventually reaches every player', () => {
    let game = withPlayers(['A', 'B', 'C', 'D', 'E', 'F']);
    game = State.leave(game, actor('E'), NOW); // teams of two and three
    game = act(game, 'A', 'start-game');
    const seen = new Set();
    for (let index = 0; index < 24; index++) {
        coherent(game); seen.add(game.turn.speakerId); game = finish(game);
    }
    assert.deepEqual([...seen].sort(), State.members(game).map(p => p.playerId).sort());
});

test('queues remain fair across joins and departures on four teams', () => {
    let game = started(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 4);
    for (let index = 0; index < 12; index++) { coherent(game); game = finish(game); }
    game = State.join(game, actor('I'), NOW);
    const seen = new Set();
    for (let index = 0; index < 36; index++) { coherent(game); seen.add(game.turn.speakerId); game = finish(game); }
    assert.equal(seen.size, 9);
});

test('empty teams keep a coherent speaker queue but cannot start another round', () => {
    let game = started(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    for (const name of ['A', 'C', 'E', 'G']) game = State.leave(game, actor(name), NOW);
    assert.deepEqual(game.teams.map(t => t.players.length), [0, 4]);
    coherent(game);
    const speaker = State.members(game).find(p => p.playerId === game.turn.speakerId);
    assert.equal(State.view(game, speaker, NOW).canStartRound, false);
    assert.equal(act(game, speaker, 'start-round', {seed:1}), undefined);
    game = State.join(game, actor('I'), NOW);
    assert.equal(State.view(game, speaker, NOW).canStartRound, true);
    coherent(selection(game));
});

test('pregame leave/rejoin always assigns an initial speaker on start', () => {
    let game = State.leave(withPlayers(), actor('A'), NOW);
    game = State.join(game, actor('C'), NOW);
    game = act(game, 'B', 'start-game');
    assert.equal(game.phase, 'idle');
    coherent(game);
});

test('dropping below minimum invalidates the old turn and later joins repair it', () => {
    let game = act(started(['A', 'B', 'C', 'D']), 'A', 'start-round', { seed: 1 });
    const oldId = game.turn.id;
    game = State.leave(game, actor('D'), NOW);
    assert.equal(game.phase, 'waiting');
    assert.ok(game.turn.id > oldId);
    assert.equal(game.roundActive, false);
    game = State.join(game, actor('E'), NOW);
    assert.equal(game.phase, 'idle');
    assert.equal(State.act(game, actor('A'), { type: 'expire-round', turnId: oldId }, NOW + 40000, rules), undefined);
    coherent(game);
});

test('only the actual speaker can control a turn and only the actual host can start/end', () => {
    const waiting = withPlayers();
    assert.equal(act(waiting, 'B', 'start-game'), undefined);
    const game = started();
    assert.equal(act(game, 'B', 'start-round', { seed: 1 }), undefined);
    assert.equal(act(game, 'B', 'end-game'), undefined);
    assert.equal(act(game, 'A', 'toggle-answer', { index: 0 }), undefined);
});

test('deadline expiry can be recovered by another client after a sleeping speaker', () => {
    let game = act(started(), 'A', 'start-round', { seed: 1 });
    assert.equal(act(game, 'B', 'expire-round', {}, game.turn.deadline - 1), undefined);
    game = act(game, 'B', 'expire-round', {}, game.turn.deadline);
    assert.equal(game.phase, 'selecting');
    assert.equal(game.roundActive, false);
    assert.equal(State.view(game, actor('A'), game.turn.deadline).canSelect, true);
});

test('small-game words remain private; opponents in larger games can observe but not select', () => {
    let small = act(started(), 'A', 'start-round', { seed: 1 });
    assert.equal(State.view(small, actor('B'), NOW).showWords, false);
    let larger = act(started(['A', 'B', 'C', 'D']), 'A', 'start-round', { seed: 1 });
    assert.equal(State.view(larger, actor('B'), larger.turn.startedAt).showWords, true);
    assert.equal(State.view(larger, actor('C'), NOW).showWords, false);
    larger = act(larger, 'A', 'end-round');
    assert.equal(State.view(larger, actor('B'), NOW).showWords, true);
    assert.equal(State.view(larger, actor('B'), NOW).canSelect, false);
});

test('Chaos result survives host/speaker departure and is finished once by the new host', () => {
    let game = selection(started(['A', 'B', 'C', 'D'], 2, { chaosMode: true }));
    game = act(game, 'A', 'toggle-answer', { index: 0 });
    game = act(game, 'A', 'submit-round');
    const oldEpoch = game.hostEpoch, id = game.turn.id;
    game = State.leave(game, actor('A'), NOW + 1);
    assert.equal(game.phase, 'resolving');
    assert.equal(game.hostId, 'id-C');
    assert.equal(State.act(game, actor('A'), { type: 'resolve-chaos', turnId: id, hostEpoch: oldEpoch }, NOW + 4000, rules), undefined);
    assert.equal(act(game, 'C', 'resolve-chaos', { hostEpoch: game.hostEpoch }, NOW + 2999), undefined);
    game = act(game, 'C', 'resolve-chaos', { hostEpoch: game.hostEpoch }, game.turn.resolution.startedAt + 3000);
    assert.equal(game.teams[0].points, 1);
    assert.equal(game.phase, 'waiting'); // three remaining players, original minimum preserved
    assert.equal(Object.keys(game.auditEvents).length, 1);
    assert.equal(State.act(game, actor('C'), { type: 'resolve-chaos', turnId: id, hostEpoch: game.hostEpoch }, NOW + 4000, rules), undefined);
});

test('every team sees live scoring selections while only the speaker can change or confirm them', () => {
    for (const [names, teamCount] of [[['A','B'],2], [['A','B','C'],3], [['A','B','C','D'],2],
        [['A','B','C','D','E','F'],3]]) {
        let game=selection(started(names,teamCount));
        game=act(game,'A','toggle-answer',{index:1});
        for(const name of names) {
            const view=State.view(game,actor(name),game.turn.selectingAt);
            assert.equal(view.showWords,true,`${name} in ${names.length}-player game`);
            assert.equal(view.canSelect,name==='A');
            if(name!=='A') {
                assert.equal(act(game,name,'toggle-answer',{index:0}),undefined);
                assert.equal(act(game,name,'submit-round'),undefined);
            }
        }
        assert.equal(State.view(game,actor('outsider'),NOW).showWords,false);
    }
});

test('confirmed review keeps every option and its selections across refresh/join, then clears at the next countdown', () => {
    for(const indexes of [[],[0,2]]) {
        let game=selection(started());
        for(const index of indexes)game=act(game,'A','toggle-answer',{index});
        game=act(game,'A','submit-round');
        assert.deepEqual(game.roundReview.words,['One','Two','Three']);
        assert.deepEqual(game.roundReview.selectedIndexes,indexes);
        const refreshed=actor('B','refreshed');
        game=State.join(game,refreshed,NOW+LEAD_IN+1);
        assert.deepEqual(State.view(game,refreshed,NOW+LEAD_IN+1).review,game.roundReview);
        assert.equal(State.view(game,actor('B'),NOW+LEAD_IN+1).review,null);
        game=State.join(game,actor('C'),NOW+LEAD_IN+2);
        assert.deepEqual(State.view(game,actor('C'),NOW+LEAD_IN+2).review.words,['One','Two','Three']);
        game=State.join(game,actor('D'),NOW+LEAD_IN+3);
        game=act(game,refreshed,'start-round',{seed:2},NOW+LEAD_IN+4);
        assert.equal(game.roundReview,null);
        assert.equal(State.view(game,refreshed,NOW+LEAD_IN+4).review,null);
        assert.equal(State.view(game,actor('A'),NOW+LEAD_IN+4).showWords,false);
    }
});

test('Chaos review survives resolution and a match finish, but never carries into a rematch', () => {
    let game=selection(started(['A','B'],2,{chaosMode:true}));
    game=act(game,'A','toggle-answer',{index:2});
    game=act(game,'A','submit-round');
    assert.deepEqual(State.view(game,actor('B'),NOW+LEAD_IN).review.selectedIndexes,[2]);
    assert.deepEqual(State.view(game,actor('B'),NOW+LEAD_IN).review.words,['One','Two','Three']);
    game=act(game,'A','resolve-chaos',{hostEpoch:game.hostEpoch},game.turn.resolution.startedAt+3000);
    assert.deepEqual(State.view(game,actor('B'),NOW+LEAD_IN+3000).review.selectedIndexes,[2]);
    game=act(game,'A','end-game',{matchId:game.matchId},NOW+LEAD_IN+3001);
    assert.deepEqual(State.view(game,actor('B'),NOW+LEAD_IN+3001).review.words,['One','Two','Three']);
    game=act(game,'A','rematch',{matchId:game.matchId},NOW+LEAD_IN+3002);
    assert.equal(game.roundReview,null);
    assert.equal(State.view(game,actor('B'),NOW+LEAD_IN+3002).review,null);
});

test('same host with an obsolete host epoch cannot finish a Chaos turn', () => {
    let game = act(selection(started(['A', 'B'], 2, { chaosMode: true })), 'A', 'submit-round');
    assert.equal(act(game, 'A', 'resolve-chaos', { hostEpoch: game.hostEpoch - 1 }, NOW + 3000), undefined);
});

test('winning seals scoring while keeping the roster connected for a new match', () => {
    let game = selection(started()); game.teams[0].points = 19;
    game = act(game, 'A', 'toggle-answer', { index: 0 });
    game = act(game, 'A', 'submit-round');
    assert.equal(game.phase,'idle');
    assert.equal(game.finalTurnCount,1);
    game = selection(game); // Team B gets its equally numbered turn, even scoring zero.
    game = act(game,'B','submit-round');
    assert.equal(game.phase, 'finished');
    assert.equal(game.gameState, 'finished');
    assert.ok(game.settings);
    for (const type of ['start-game', 'start-round', 'end-game', 'submit-round']) assert.equal(act(game, 'A', type), undefined);
    assert.equal(State.join(game, actor('C'), NOW).phase, 'finished');
    assert.equal(State.heartbeat(game, actor('A'), NOW).phase, 'finished');
});

test('the last team can lose, draw, or beat the first team after it reaches 21', () => {
    for(const [correct,expected,reason] of [[0,[21,19],'winner'],[2,[21,21],'draw'],[3,[21,22],'winner']]) {
        let game=started();game.teams.forEach(team=>team.points=19);
        game=selection(game);
        for(const index of [0,1])game=act(game,'A','toggle-answer',{index});
        game=act(game,'A','submit-round');
        assert.equal(game.phase,'idle');assert.equal(game.turn.teamIndex,1);
        assert.equal(game.finalTurnCount,1);
        const untouched=structuredClone(game);
        game=selection(game);
        for(let index=0;index<correct;index++)game=act(game,'B','toggle-answer',{index});
        game=act(game,'B','submit-round');
        assert.equal(game.phase,'finished');assert.equal(game.finishReason,reason);
        assert.deepEqual(game.teams.map(team=>team.points),expected);
        assert.equal(Object.values(game.auditEvents).filter(event=>event.teamIndex===0).length,1);
        assert.equal(Object.values(game.auditEvents).filter(event=>event.teamIndex===1).length,1);
        assert.equal(untouched.phase,'idle');
    }
});

test('every starting slot gets equal completed turns with two, three, or four teams', () => {
    for(const count of [2,3,4])for(let starter=0;starter<count;starter++) {
        const names=Array.from({length:count===4?8:count},(_,i)=>String.fromCharCode(65+i));
        let game=withPlayers(names,count);game.currentTeam=starter+1;
        game=act(game,'A','start-game');game.teams.forEach(team=>team.points=19);
        for(let slot=0;slot<count;slot++) {
            const teamIndex=(starter+slot)%count;
            assert.equal(game.turn.teamIndex,teamIndex);
            assert.equal(game.turn.roundNumber,1); // Randomized starters do not shift history's round labels.
            const speaker=State.members(game).find(player=>player.playerId===game.turn.speakerId);
            game=selection(game);
            game=act(game,speaker,'toggle-answer',{index:0});
            game=act(game,speaker,'submit-round');
            assert.equal(game.phase,slot===count-1?'finished':'idle');
        }
        assert.equal(game.finishReason,'draw');
        for(let team=0;team<count;team++)assert.equal(Object.values(game.auditEvents).filter(event=>event.teamIndex===team).length,1);
    }
});

test('a target reached by the last team ends that cycle without giving an extra turn', () => {
    let game=started();game.teams[0].points=18;game.teams[1].points=19;
    game=act(selection(game),'A','submit-round');
    assert.equal(game.finalTurnCount,null);
    game=act(selection(game),'B','toggle-answer',{index:0});
    game=act(game,'B','submit-round');
    assert.equal(game.phase,'finished');assert.equal(Object.keys(game.auditEvents).length,2);
});

test('an absent team keeps its final turn; completed teams cannot take it or churn waiting turn IDs', () => {
    let game=selection(started());game.teams[0].points=19;
    game=act(game,'A','toggle-answer',{index:0});game=act(game,'A','submit-round');
    const time=NOW+LEAD_IN+1;
    game=act(game,'B','start-round',{seed:2},time); // Leaving cancels this unscored turn, not the entitlement.
    game=State.leave(game,actor('B'),time);
    assert.equal(game.phase,'waiting');assert.equal(game.turn.teamIndex,1);
    assert.equal(game.turn.speakerId,'');
    const id=game.turn.id;
    game=State.heartbeat(game,actor('A'),time+1);
    assert.equal(game.turn.id,id);assert.equal(game.finalTurnCount,1);
    assert.equal(State.view(game,actor('A'),time+1).canStartRound,false);
    assert.equal(act(game,'A','start-round',{seed:1},time+1),undefined);
    game=State.join(game,actor('C'),time+2);
    assert.equal(game.turn.speakerId,'id-C');
    game=act(selection(game),'C','submit-round');
    assert.equal(game.phase,'finished');
});

test('Chaos final turns stay sealed through a steal, host departure, and scores dropping below target', () => {
    let game=selection(started(['A','B'],2,{chaosMode:true}));
    game.teams[0].points=19;game.teams[1].points=17;
    game=act(game,'A','toggle-answer',{index:0});game=act(game,'A','submit-round');
    game=act(game,'A','resolve-chaos',{hostEpoch:game.hostEpoch},game.turn.resolution.startedAt+3000);
    assert.equal(game.phase,'idle');assert.equal(game.finalTurnCount,1);
    game=act(selection(game),'B','toggle-answer',{index:0});
    const time=game.turn.selectingAt;
    game=State.act(game,actor('B'),{type:'submit-round',turnId:game.turn.id},time,{planChaos:()=>({
        points:[19,19],basePoints:[20,18],shields:[0,0],powerups:{},durationMs:3000,
        effect:{type:'steal1',actorDelta:1,victimTeamIndex:0,victimDelta:-1},summary:'Steal 1'})});
    game=State.leave(game,actor('A'),time+1);
    assert.equal(game.phase,'resolving');assert.equal(game.hostId,'id-B');
    game=act(game,'B','resolve-chaos',{hostEpoch:game.hostEpoch},time+3000);
    assert.equal(game.phase,'finished');assert.equal(game.finishReason,'draw');
    assert.deepEqual(game.teams.map(team=>team.points),[19,19]);
    const next=act(game,'B','rematch',{matchId:game.matchId},time+3001);
    assert.equal(next.finalTurnCount,null);assert.deepEqual(next.auditEvents,{});
});

test('null snapshots and old protocol lobbies are never resurrected by a reducer', () => {
    assert.equal(State.join(null, actor('A'), NOW), undefined);
    assert.equal(State.act(null, actor('A'), { type: 'start-game' }, NOW), undefined);
    assert.equal(State.prune(null, actor('A'), NOW), undefined);
    const old = lobby(); delete old.protocolVersion;
    assert.equal(State.joinReason(old, actor('A')), 'incompatible-lobby');
    old.protocolVersion=State.PROTOCOL_VERSION-1;
    assert.equal(State.joinReason(old,actor('A')),'incompatible-lobby');
    assert.equal(State.act(old,actor('A'),{type:'start-game'},NOW,rules),undefined);
});

test('shared word packs are validated on join and start, including the selected difficulty', () => {
    const base=started();
    for(const pack of [{kind:'custom',entries:[]},{kind:'custom',entries:[{word:'Bad',canonical:'Bad',difficulty:'normal'}]}]) {
        const game={...base,wordPack:pack};
        assert.equal(State.joinReason(game,actor('C')),'invalid-word-pack');
        assert.equal(act(game,'A','start-round',{seed:1}),undefined);
        assert.ok(act(game,'A','end-game')); // A bad pack never prevents closing a lobby.
    }
    const hardOnly={...base,settings:{...base.settings,difficulty:'easy'},wordPack:{kind:'custom',entries:[{word:'Hard',canonical:'Hard',difficulty:'hard'}]}};
    assert.equal(State.joinReason(hardOnly,actor('C')),'invalid-word-pack');
});

test('the lobby pack survives joins, host departure and rematch without depending on the creator', () => {
    let game=started(['A','B','C','D']);
    game.wordPack={kind:'custom',entries:[{word:'Custom',canonical:'Custom',difficulty:'easy'}]};
    const saved=structuredClone(game.wordPack);
    game=State.join(game,actor('E'),NOW+1);game=State.leave(game,actor('A'),NOW+2);
    assert.deepEqual(game.wordPack,saved);assert.equal(game.hostId,'id-C');
    game=State.act(game,actor('C'),{type:'start-round',turnId:game.turn.id,seed:1},NOW+3,
        {drawWords:g=>({words:g.wordPack.entries.map(entry=>entry.word),pools:{}})});
    assert.deepEqual(game.turn.words,['Custom']);
    game=act(game,'C','end-game',{},NOW+4);
    game=act(game,'C','rematch',{matchId:game.matchId},NOW+5);
    assert.deepEqual(game.wordPack,saved);
});

test('transaction retries are deterministic and do not mutate their input', () => {
    const game = selection(started()); const original = structuredClone(game);
    assert.deepEqual(act(game, 'A', 'submit-round'), act(game, 'A', 'submit-round'));
    assert.deepEqual(game, original);
});
