import test from 'node:test';
import assert from 'node:assert/strict';
import { OnlineClient } from '../online/client.js';
import * as State from '../online/state.js';

const clone = value => value == null ? value : structuredClone(value);
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };
const actor = name => ({ playerId: `id-${name}`, playerName: name, connectionId: 'initial' });
function initial() {
    return { protocolVersion: 2, dateCreated: 1000000,
        settings: { numTeams: 2, numWords: 5, numSeconds: 30, pointsToWin: 20 },
        teams: [{ id: 0, points: 0 }, { id: 1, points: 0 }], numPlayers: 0,
        currentTeam: 1, currentRound: 0, phase: 'waiting', gameState: 'waiting', hostId: '', hostEpoch: 0 };
}

class Database {
    constructor() {
        this.game = initial(); this.now = 1000000; this.listeners = []; this.markers = new Map(); this.operations = [];
    }
    read(path) {
        let value = this.game;
        for (const key of path.split('/').slice(2)) value = value?.[key];
        return clone(value ?? null);
    }
    write(path, value) {
        const segments = path.split('/').slice(2);
        if (!segments.length) this.game = clone(value);
        else {
            this.game ??= {};
            let parent = this.game;
            for (const key of segments.slice(0, -1)) parent = parent[key] ??= {};
            parent[segments.at(-1)] = clone(value);
        }
        this.emit();
    }
    emit() {
        for (const listener of this.listeners) {
            if (listener.path.startsWith('.info/')) continue;
            const value = this.read(listener.path);
            queueMicrotask(() => { if (this.listeners.includes(listener)) listener.callback({ val: () => value }); });
        }
    }
    sdk(name, offset = 0) {
        const db = this;
        const info = { connected: true };
        const sdk = {
            ref: (_, path) => path,
            get: async path => ({ val: () => db.read(path) }),
            onValue(path, callback) {
                db.operations.push({ type: 'listen', name, path });
                const listener = { name, path, callback }; db.listeners.push(listener);
                queueMicrotask(() => callback({ val: () => path === '.info/connected' ? info.connected : path === '.info/serverTimeOffset' ? offset : db.read(path) }));
                return () => { db.listeners = db.listeners.filter(entry => entry !== listener); };
            },
            async runTransaction(path, update, options) {
                assert.equal(options.applyLocally, false);
                db.operations.push({ type: 'transaction', name, path });
                if (sdk.requireLiveCache && path === 'games/TEST'
                    && !db.listeners.some(listener => listener.name === name && listener.path === path)) {
                    update(null); return { committed: false };
                }
                if (sdk.nullNext) { sdk.nullNext = false; update(null); return { committed: false }; }
                if (sdk.retryNext) { sdk.retryNext = false; update(db.read(path)); }
                const result = update(db.read(path));
                if (result === undefined) return { committed: false };
                db.write(path, result);
                const response = { committed: true, snapshot: { val: () => clone(result) } };
                if (sdk.holdAck) { const hold = sdk.holdAck; sdk.holdAck = null; await hold; }
                return response;
            },
            onDisconnect(path) {
                return {
                    async update(values) { db.operations.push({ type: 'disconnect-registration', name, path }); db.markers.set(`${name}:${path}`, { path, values }); },
                    async cancel() { db.markers.delete(`${name}:${path}`); }
                };
            },
            serverTimestamp: () => ({ '.sv': 'timestamp' }),
            async update(path, values) {
                db.write(path, { ...db.read(path), ...Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value?.['.sv'] ? db.now : value])) });
            },
            async disconnect() {
                info.connected = false;
                for (const [key, marker] of db.markers) if (key.startsWith(`${name}:`)) {
                    await sdk.update(marker.path, marker.values); db.markers.delete(key);
                }
                for (const listener of db.listeners.filter(l => l.name === name && l.path === '.info/connected')) listener.callback({ val: () => false });
                await flush();
            },
            async reconnect() {
                info.connected = true;
                for (const listener of db.listeners.filter(l => l.name === name && l.path === '.info/connected')) listener.callback({ val: () => true });
                await flush();
            }
        };
        return sdk;
    }
}

function makeClient(t, db, name, options = {}) {
    let serial = 0;
    const sdk = db.sdk(name, options.offset || 0);
    const errors = [], snapshots = [];
    const client = new OnlineClient({ sdk, db: {}, code: 'TEST', actor: actor(name),
        now: options.now || (() => db.now), newConnectionId: () => `${name}-${++serial}`,
        rules: {
            drawWords: () => ({ words: ['One', 'Two'], pools: {} }),
            planChaos: (_, points) => ({ points, shields: [0, 0], summary: 'No powerup', powerups: {}, durationMs: 3000 })
        },
        onSnapshot: snapshot => snapshots.push(clone(snapshot)), onError: error => errors.push(error),
    });
    t.after(async () => { await client.close(); });
    return { client, sdk, errors, snapshots };
}

test('disconnect is registered before membership is advertised and uses server timestamps', async t => {
    const db = new Database(), { client } = makeClient(t, db, 'A');
    await client.connect();
    assert.ok(db.operations.findIndex(op => op.type === 'disconnect-registration') < db.operations.findIndex(op => op.type === 'transaction'));
    const marker = [...db.markers.values()][0];
    assert.deepEqual(marker.values.lastSeen, { '.sv': 'timestamp' });
    assert.equal(client.snapshot.numPlayers, 1);
});

test('server clock offset is used despite a badly skewed local device clock', async t => {
    const db = new Database(), { client } = makeClient(t, db, 'A', { now: () => 1234, offset: 998766 });
    await client.connect();
    assert.equal(client.serverNow(), 1000000);
    assert.equal(State.members(db.game)[0].joinedAt, 1000000);
});

test('cold transaction cache retries a current read instead of restoring preflight data', async t => {
    const db = new Database(), { client, sdk } = makeClient(t, db, 'A'); sdk.nullNext = true;
    await client.connect();
    assert.equal(client.connected, true);
    assert.equal(db.game.numPlayers, 1);
});

test('initial root subscription primes a live cache that get alone cannot populate', async t => {
    const db = new Database(), { client, sdk } = makeClient(t, db, 'A'); sdk.requireLiveCache = true;
    await client.connect();
    assert.equal(client.connected, true);
    assert.equal(client.snapshot.numPlayers, 1);
    assert.equal(db.operations[0].type, 'listen');
    assert.equal(db.operations[0].path, 'games/TEST');
});

test('a lobby deleted after preflight is not recreated during join or cleanup', async t => {
    const db = new Database(), { client, sdk } = makeClient(t, db, 'A');
    const original = sdk.onDisconnect;
    sdk.onDisconnect = path => {
        const handler = original(path);
        return { ...handler, update: async values => { await handler.update(values); db.game = null; } };
    };
    await assert.rejects(client.connect(), /lobby-unavailable/);
    await client.close();
    assert.equal(db.game, null);
});

test('multiple clients and a retried turn commit preserve the latest roster', async t => {
    const db = new Database();
    const a = makeClient(t, db, 'A'), b = makeClient(t, db, 'B'), c = makeClient(t, db, 'C'), d = makeClient(t, db, 'D');
    await a.client.connect(); await b.client.connect();
    await a.client.command({ type: 'start-game' });
    await a.client.command({ type: 'start-round', seed: 42 });
    await c.client.connect(); await d.client.connect();
    // Joining the third player pauses; the fourth restores an idle, repaired turn.
    assert.equal(db.game.phase, 'idle');
    await a.client.command({ type: 'start-round', seed: 42 });
    await a.client.command({ type: 'end-round' });
    await a.client.command({ type: 'toggle-answer', index: 0 });
    a.sdk.retryNext = true;
    await a.client.command({ type: 'submit-round' });
    assert.equal(db.game.numPlayers, 4);
    assert.equal(db.game.teams[0].points, 1);
    assert.equal(Object.keys(db.game.auditEvents).length, 1);
    assert.deepEqual(a.client.snapshot.teams, d.client.snapshot.teams);
});

test('a delayed commit acknowledgement never rewinds a newer roster snapshot', async t => {
    const db = new Database(), a = makeClient(t, db, 'A'), b = makeClient(t, db, 'B');
    await a.client.connect(); await b.client.connect();
    let release;
    a.sdk.holdAck = new Promise(resolve => { release = resolve; });
    const command = a.client.command({ type: 'start-game' });
    await flush();
    const newActor = { ...actor('C'), connectionId: 'C-live' };
    db.write('games/TEST', State.join(db.game, newActor, db.now));
    await flush(); release(); await command;
    assert.equal(a.client.snapshot.numPlayers, 3);
});

test('disconnect/reconnect uses a new connection and restores the same active turn', async t => {
    const db = new Database(), a = makeClient(t, db, 'A'), b = makeClient(t, db, 'B');
    await a.client.connect(); await b.client.connect();
    await a.client.command({ type: 'start-game' });
    await a.client.command({ type: 'start-round', seed: 4 });
    const turn = clone(db.game.turn), oldConnection = a.client.actor.connectionId;
    await a.sdk.disconnect();
    assert.equal(a.client.connected, false);
    assert.equal(State.connection(db.game, State.ownsSeat(db.game, a.client.actor)).connected, false);
    await a.sdk.reconnect();
    assert.equal(a.client.connected, true);
    assert.notEqual(a.client.actor.connectionId, oldConnection);
    assert.deepEqual(db.game.turn, turn);
    assert.equal(db.game.numPlayers, 2);
});

test('background page restoration cannot be overwritten by an old pagehide marker', async t => {
    const db = new Database(), a = makeClient(t, db, 'A'); await a.client.connect();
    const oldPath = a.client.presenceRef;
    a.client.suspend(); await flush();
    await a.client.resume();
    await a.sdk.update(oldPath, { connected: false, lastSeen: db.now });
    assert.equal(State.view(db.game, a.client.actor, db.now).active, true);
});

test('a superseded connection cannot heartbeat, leave, or claim the new seat', async t => {
    const db = new Database(), a = makeClient(t, db, 'A'); await a.client.connect();
    const fresh = { ...a.client.actor, connectionId: 'new-tab' };
    db.write('games/TEST', State.join(db.game, fresh, db.now)); await flush();
    const before = clone(db.game);
    await a.client.health(); await a.client.close(true);
    assert.deepEqual(db.game, before);
});

test('automatic reconnect cannot steal a seat already restored in another tab', async t => {
    const db = new Database(), a = makeClient(t, db, 'A'); await a.client.connect();
    const fresh = { ...a.client.actor, connectionId: 'other-tab' };
    db.write('games/TEST', State.join(db.game, fresh, db.now)); await flush();
    await a.sdk.disconnect(); await a.sdk.reconnect();
    assert.equal(a.client.connected, false);
    assert.equal(State.members(db.game)[0].connectionId, 'other-tab');
    assert.equal(a.errors.at(-1).message, 'session-replaced');
    await a.client.resume(true); // Explicit Rejoin may reclaim the seat.
    assert.equal(a.client.connected, true);
    assert.equal(State.ownsSeat(db.game, a.client.actor).playerId, 'id-A');
});

test('new host tick resumes pending Chaos work without another pending event', async t => {
    const db = new Database(); db.game.settings.chaosMode = true;
    const a = makeClient(t, db, 'A'), b = makeClient(t, db, 'B'), c = makeClient(t, db, 'C'), d = makeClient(t, db, 'D');
    for (const entry of [a, b, c, d]) await entry.client.connect();
    await a.client.command({ type: 'start-game' });
    await a.client.command({ type: 'start-round', seed: 7 });
    await a.client.command({ type: 'end-round' });
    await a.client.command({ type: 'toggle-answer', index: 1 });
    await a.client.command({ type: 'submit-round' });
    await a.client.close(true); await flush();
    assert.equal(c.client.snapshot.hostId, 'id-C');
    db.now += 3000; await c.client.tick(); await flush();
    assert.equal(db.game.teams[0].points, 1);
    assert.equal(db.game.phase, 'waiting');
    assert.equal(Object.keys(db.game.auditEvents).length, 1);
});

test('expiry is recovered by a connected non-speaker using the shared deadline', async t => {
    const db = new Database(), a = makeClient(t, db, 'A'), b = makeClient(t, db, 'B');
    await a.client.connect(); await b.client.connect();
    await a.client.command({ type: 'start-game' }); await a.client.command({ type: 'start-round', seed: 1 });
    db.now += 30000; await b.client.tick(); await flush();
    assert.equal(db.game.phase, 'selecting');
    assert.equal(a.client.snapshot.roundActive, false);
});

test('closing disposes subscriptions and timers and marks only its own connection offline', async t => {
    const db = new Database(), a = makeClient(t, db, 'A'); await a.client.connect();
    const actor = { ...a.client.actor };
    await a.client.close();
    assert.equal(a.client.closed, true);
    assert.equal(db.listeners.filter(l => l.name === 'A').length, 0);
    assert.equal(db.markers.size, 0);
    assert.equal(State.connection(db.game, State.ownsSeat(db.game, actor)).connected, false);
    assert.equal(await a.client.command({ type: 'start-game' }), false);
});
