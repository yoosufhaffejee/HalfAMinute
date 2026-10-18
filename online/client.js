import * as State from './state.js';

// Firebase is injected so connection loss, retries and delayed commits can be
// exercised without touching a production database.
export class OnlineClient {
    constructor({ sdk, db, code, actor, rules, onSnapshot, onStatus, onError, now = Date.now, newConnectionId = () => crypto.randomUUID() }) {
        Object.assign(this, { sdk, db, code, actor, rules, onSnapshot, onStatus, onError, now, newConnectionId });
        this.offset = 0;
        this.connected = false;
        this.closed = false;
        this.busy = false;
        this.snapshot = null;
        this.unsubscribers = [];
        this.intervals = [];
        this.reference = sdk.ref(db, `games/${code}`);
    }

    serverNow() { return this.now() + this.offset; }

    async connect() {
        // A get() result need not populate the transaction's live cache. Attach
        // the root subscription first, rather than substituting a stale REST
        // snapshot when a cold transaction initially receives null.
        const initial = await new Promise((resolve, reject) => {
            this.unsubscribers.push(this.sdk.onValue(this.reference, snapshot => {
                const game = snapshot.val();
                this.receive(game);
                resolve(game);
            }, error => {
                this.error = error;
                this.connected = false;
                this.onStatus?.();
                this.onError?.(error);
                reject(error);
            }));
        });
        this.listening = true;
        const reason = State.joinReason(initial, this.actor);
        if (reason) throw new Error(reason);
        return new Promise((resolve, reject) => {
            this.unsubscribers.push(this.sdk.onValue(this.sdk.ref(this.db, '.info/serverTimeOffset'), snapshot => {
                this.offset = Number(snapshot.val()) || 0;
            }));
            this.unsubscribers.push(this.sdk.onValue(this.sdk.ref(this.db, '.info/connected'), snapshot => {
                if (this.closed) return;
                if (!snapshot.val()) {
                    this.connected = false;
                    this.onStatus?.();
                    return;
                }
                this.registerConnection().then(() => resolve(this.snapshot)).catch(error => {
                    this.error = error;
                    this.connected = false;
                    this.onStatus?.();
                    this.onError?.(error);
                    reject(error);
                });
            }, reject));
        });
    }

    async registerConnection(reclaim = false) {
        if (this.closed || this.registering) return;
        this.registering = true;
        try {
            const previousActor = { ...this.actor };
            const actor = { ...previousActor, connectionId: this.newConnectionId() };
            this.actor = actor;
            this.presenceRef = this.sdk.ref(this.db,
                `games/${this.code}/presence/${actor.playerId}/connections/${actor.connectionId}`);
            this.disconnect = this.sdk.onDisconnect(this.presenceRef);
            // Queue the server disconnect marker BEFORE advertising this session.
            await this.disconnect.update({ connected: false, lastSeen: this.sdk.serverTimestamp() });
            if (this.closed) { await this.disconnect.cancel(); return; }
            let reason, result;
            for (let attempt = 0; attempt < 3; attempt++) {
                result = await this.sdk.runTransaction(this.reference, game => {
                    if (this.closed || this.closing) return;
                    reason = State.joinReason(game, actor);
                    const seat = State.members(game).find(player => player.playerId === actor.playerId);
                    if (!reason && this.hasJoined && !reclaim && seat && seat.connectionId !== previousActor.connectionId) {
                        reason = 'session-replaced';
                    }
                    return reason ? undefined : State.join(game, actor, this.serverNow());
                }, { applyLocally: false });
                if (result.committed || this.closed) break;
                if (reason === 'session-replaced') break;
                // A cold local cache may initially be null. Read again and retry
                // the current transaction; never restore the preflight snapshot.
                const confirmed = (await this.sdk.get(this.reference)).val();
                reason = State.joinReason(confirmed, actor);
                if (reason) break;
            }
            if (!result.committed) throw new Error(reason || 'join-aborted');
            if (this.closed) return;
            this.connected = true;
            this.hasJoined = true;
            this.error = null;
            this.onSnapshot?.(this.snapshot);
            if (!this.ticking) {
                this.ticking = true;
                this.intervals.push(setInterval(() => { void this.health(); }, 4000));
                this.intervals.push(setInterval(() => { void this.tick(); }, 200));
            }
            this.onStatus?.();
        } finally {
            this.registering = false;
            this.onStatus?.();
        }
    }

    receive(game) {
        if (this.closed) return;
        this.snapshot = game;
        if (this.hasJoined) this.onSnapshot?.(game);
    }

    async transaction(reducer) {
        if (this.closed || this.closing || !this.connected || this.suspended) return false;
        const result = await this.sdk.runTransaction(this.reference, game =>
            reducer(game, this.serverNow()), { applyLocally: false });
        // Once subscribed, only onValue renders snapshots. A commit acknowledgement
        // may arrive after a newer roster event and must not rewind the UI.
        if (result.committed && !this.closed && !this.listening) this.receive(result.snapshot.val());
        return result.committed;
    }

    async command(action) {
        if (this.busy || !this.connected || this.closed) return false;
        // Capture the rendered turn before any network delay. A stale click may
        // never apply to a subsequent turn, even when the same person speaks.
        const request = { turnId: this.snapshot?.turn?.id, ...action };
        const actor = { ...this.actor };
        this.busy = true;
        this.onStatus?.();
        try {
            return await this.transaction((game, now) => State.act(game, actor, request, now, this.rules));
        } finally {
            this.busy = false;
            this.onStatus?.();
        }
    }

    async health() {
        if (this.healthBusy || !this.connected || this.closed || this.suspended) return;
        this.healthBusy = true;
        const actor = { ...this.actor };
        try {
            if (!State.ownsSeat(this.snapshot, actor) || this.snapshot.phase === 'ended') return;
            await this.sdk.runTransaction(this.sdk.ref(this.db, `games/${this.code}/presence/${actor.playerId}`), record => {
                if (!record || record.activeConnectionId !== actor.connectionId) return;
                return { activeConnectionId: actor.connectionId, connections: {
                    [actor.connectionId]: { connected: true, lastSeen: this.serverNow() }
                } };
            }, { applyLocally: false });
            await this.transaction((game, now) => State.prune(game, actor, now));
        } catch (error) {
            this.onError?.(error);
        } finally { this.healthBusy = false; }
    }

    async tick() {
        this.onStatus?.();
        if (this.autoBusy || !this.connected || this.closed || this.suspended || !this.snapshot?.turn) return;
        const { phase, turn, hostId, hostEpoch } = this.snapshot;
        let action;
        if (phase === 'describing' && this.serverNow() >= turn.deadline) action = { type: 'expire-round', turnId: turn.id };
        if (phase === 'resolving' && hostId === this.actor.playerId
            && this.serverNow() >= turn.resolution.startedAt + turn.resolution.durationMs) {
            action = { type: 'resolve-chaos', turnId: turn.id, hostEpoch };
        }
        if (!action) return;
        this.autoBusy = true;
        const actor = { ...this.actor };
        try { await this.transaction((game, now) => State.act(game, actor, action, now, this.rules)); }
        catch (error) { this.onError?.(error); }
        finally { this.autoBusy = false; }
    }

    suspend() {
        this.suspended = true;
        this.connected = false;
        this.onStatus?.();
        // Best effort only. The registered server action handles crashes/unloads.
        if (this.presenceRef) void this.sdk.update(this.presenceRef,
            { connected: false, lastSeen: this.sdk.serverTimestamp() }).catch(() => {});
    }

    async resume(reclaim = false) {
        if (this.closed) return;
        this.suspended = false;
        await this.registerConnection(reclaim);
    }

    async close(leave = false) {
        if (this.closed || this.closing) return;
        this.closing = true;
        const actor = { ...this.actor };
        try {
            if (leave) {
                await this.sdk.runTransaction(this.reference, game =>
                    State.leave(game, actor, this.serverNow()), { applyLocally: false });
            }
        } catch (error) {
            this.closing = false;
            throw error;
        }
        this.closed = true;
        this.connected = false;
        for (const unsubscribe of this.unsubscribers) unsubscribe();
        for (const interval of this.intervals) clearInterval(interval);
        // A graceful close must not cancel the server marker while advertising
        // an otherwise healthy connection. Mark only this connection offline.
        try {
            if (!leave && this.presenceRef) {
                await this.sdk.runTransaction(this.sdk.ref(this.db, `games/${this.code}/presence/${actor.playerId}`), record => {
                    if (!record || record.activeConnectionId !== actor.connectionId) return;
                    record.connections[actor.connectionId] = { connected: false, lastSeen: this.serverNow() };
                    return record;
                }, { applyLocally: false });
            }
            await this.disconnect?.cancel();
        } catch (error) { this.onError?.(error); }
    }
}
