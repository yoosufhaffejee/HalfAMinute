import { countdownLabel } from './rules.js?v=20261030.2';
import { REACTIONS, REACTION_LABELS, REACTION_TTL_MS } from './experience.js?v=20261030.4';

const node = (tag, cls = '', text = '') => { const value = document.createElement(tag); value.className = cls; value.textContent = text; return value; };
function button(text, action, disabled = false, data = {}) {
    const value = node('button', 'btn btn-success', text); value.type = 'button'; value.dataset.tableAction = action; value.disabled = disabled;
    Object.entries(data).forEach(([key, item]) => { value.dataset[key] = String(item); }); return value;
}
function note(parent, text, cls = 'party-note') { parent.appendChild(node('p', cls, text)); }
const person = (game, id) => game.party?.players.find(p => p.id === id)?.name || 'Player';
export function createTableSurface(root, callbacks) {
    let current, signature = '', draft = '', draftKey = '', feedback = '', announced = '', reactionKey = '', movingFrom = '', restoreDraftFocus = false, sending = false, suppressed = new Set();
    const validDraft = () => draft.trim().length > 0 && draft.trim().length <= (current?.view.speaker ? 180 : 80) && !/[\p{Cc}<>]/u.test(draft);
    async function sendDraft() {
        if (sending || !validDraft() || current.busy || !current.connected || !(current.view.canClue || current.view.canGuess)) return;
        const text = draft, key = draftKey, messageId = crypto.randomUUID(); sending = true; restoreDraftFocus = true;
        try {
            const saved = await callbacks.send({ type: current.view.speaker ? 'send-clue' : 'send-guess', index: current.game.turn.activeIndex, text, messageId });
            if (saved && draftKey === key && draft === text) { draft = ''; feedback = ''; }
            if (!saved && draftKey === key) feedback = 'That message was not saved. Your text is kept; check the connection or current word and try again.';
        } catch { feedback = 'Unable to send. Your text is kept; please try again.'; }
        finally { sending = false; signature = ''; if (current) render(current); }
    }
    root.addEventListener('click', event => {
        const target = event.target.closest('button[data-table-action]'); if (!target || target.disabled || !current) return;
        const type = target.dataset.tableAction;
        if (type === 'exit') { callbacks.exit(); return; }
        if (type === 'rejoin') { callbacks.rejoin(); return; }
        if (type === 'summary') { callbacks.summary(current.game); return; }
        if (type === 'share' || type === 'invite') {
            target.disabled = true;
            void (type === 'share' ? callbacks.share(current.game) : callbacks.invite()).then(text => { feedback = text || ''; signature = ''; render(current); })
                .catch(() => { feedback = 'Unable to complete that action. Please try again.'; signature = ''; render(current); }); return;
        }
        if (type === 'send-draft') { sendDraft(); return; }
        const payload = { type, ...(target.dataset.index !== undefined ? { index: Number(target.dataset.index) } : {}),
            ...(target.dataset.playerId !== undefined ? { playerId: target.dataset.playerId } : {}),
            ...(target.dataset.messageId ? { messageId: target.dataset.messageId } : {}), ...(target.dataset.format ? { format: target.dataset.format } : {}),
            ...(type === 'assign-word' ? { selected: target.getAttribute('aria-pressed') !== 'true' } : {}),
            ...(type === 'react' ? { reaction: target.dataset.reaction, reviewId: current.game.roundReview.turnId } : {}) };
        if (['award-guess', 'skip-word', 'focus-word'].includes(type)) {
            if (movingFrom || type === 'focus-word' && payload.index === current.game.turn.activeIndex) return;
            movingFrom = `${current.game.matchId}:${current.game.turn.id}:${current.game.phase}:${current.game.turn.activeIndex}`;
            void Promise.resolve(callbacks.send(payload)).then(saved => {
                if (!saved) { movingFrom = ''; feedback = 'That word change was not saved. Check your connection and try again.'; signature = ''; if (current) render(current); }
            }).catch(() => { movingFrom = ''; feedback = 'Unable to change the word. Please try again.'; signature = ''; if (current) render(current); });
            signature = ''; render(current); return;
        }
        callbacks.send(payload);
    });
    root.addEventListener('input', event => {
        if (event.target.id !== 'tableDraft') return;
        draft = event.target.value;
        event.target.setAttribute('aria-invalid', String(Boolean(draft.trim()) && !validDraft()));
        const send = root.querySelector('[data-table-action="send-draft"]'); if (send) send.disabled = sending || current.busy || !validDraft();
    });
    root.addEventListener('submit', event => { if (event.target.id === 'tableMessageForm') { event.preventDefault(); sendDraft(); } });
    function scores(parent, game) {
        const list = node('ol', 'party-scores');
        [...game.party.players].sort((a, b) => Number(Boolean(a.departed)) - Number(Boolean(b.departed)) || b.points - a.points).forEach(p => {
            const row = node('li', game.party.winners?.includes(p.id) ? 'party-winner' : ''); row.appendChild(node('span', '', `${p.name}${p.departed ? ' · left, not ranked' : ''}`)); row.appendChild(node('strong', '', `${p.points} pts`)); list.appendChild(row);
        }); parent.appendChild(list);
    }
    function clock(body, state) {
        const value = state.view.countdownRemainingMs ? countdownLabel(state.view.countdownRemainingMs) : state.view.remainingSeconds === null ? 'Unlimited' : String(state.view.remainingSeconds);
        const clock = node('strong', `party-clock${state.view.remainingSeconds === null && !state.view.countdownRemainingMs ? ' table-unlimited' : ''}`, value); clock.id = 'partyClock'; body.appendChild(clock);
    }
    function transcript(body, state) {
        const { game, view, actor } = state, index = game.turn.activeIndex;
        const messages = game.turn.messages.filter(m => m.index === index && (m.kind === 'clue' || view.speaker || m.playerId === actor.playerId));
        const log = node('div', 'table-transcript'); log.setAttribute('role', 'log'); log.setAttribute('aria-label', `Word ${index + 1} clues and guesses`);
        messages.forEach(message => {
            const row = node('div', `table-message table-message-${message.kind}`);
            row.appendChild(node('strong', '', message.kind === 'clue' ? 'Clue' : person(game, message.playerId))); row.appendChild(node('span', '', message.text));
            if (view.speaker && message.kind === 'guess') row.appendChild(button(`Award to ${person(game, message.playerId)}`, 'award-guess', state.busy || Boolean(movingFrom) || !view.canClue, { messageId: message.messageId }));
            log.appendChild(row);
        });
        if (!messages.length) note(log, view.speaker ? 'Your clues and incoming guesses appear here.' : 'Waiting for the speaker’s first clue.');
        body.appendChild(log);
        const ownCount = game.turn.messages.filter(m => m.index === index && m.playerId === actor.playerId && m.kind === (view.speaker ? 'clue' : 'guess')).length;
        if (ownCount >= (view.speaker ? 6 : 4)) { note(body, view.speaker ? 'Clue limit reached for this word. Award a guess or skip.' : 'Four guesses sent for this word. Wait for the speaker.'); return; }
        if (!(view.canClue || view.canGuess)) return;
        const form = node('form', 'party-guess-form'); form.id = 'tableMessageForm';
        const label = node('label', '', view.speaker ? 'Describe this word' : 'Your guess'); label.htmlFor = 'tableDraft'; form.appendChild(label);
        const input = node('input'); input.id = 'tableDraft'; input.type = 'text'; input.value = draft; input.maxLength = view.speaker ? 180 : 80; input.autocomplete = 'off'; input.disabled = state.busy;
        input.setAttribute('aria-describedby', 'tableDraftHint'); form.appendChild(input);
        form.appendChild(button(view.speaker ? 'Send clue' : 'Send guess', 'send-draft', sending || state.busy || !validDraft()));
        const hint = node('small', 'party-note', view.speaker ? 'Do not type the answer. Award the first correct guess; accept sensible spelling alternatives.' : 'Only the speaker sees your guesses. Guesses are ordered as they reach the game.'); hint.id = 'tableDraftHint'; form.appendChild(hint); body.appendChild(form);
    }
    function review(body, state) {
        const { game, view, busy } = state, turn = game.turn;
        body.appendChild(node('h3', '', 'Who guessed each word first?'));
        note(body, view.reviewer ? 'Choose the first correct guesser for each word. Select all tied guessers. Leave skipped or unanswered words on Nobody.' : `${person(game, turn.speakerId)} is awarding the words. Follow the selections below.`);
        turn.words.forEach((word, index) => {
            const field = node('fieldset', 'table-award'); field.disabled = busy || !view.canSelect;
            field.appendChild(node('legend', '', `${index + 1}. ${word}`));
            const options = node('div', 'table-award-options');
            for (const id of ['', ...turn.guesserIds]) {
                const selected = id ? Boolean(turn.awards[index]?.includes(id)) : !turn.awards[index]?.length;
                const item = button(`${selected ? '✓ ' : ''}${id ? person(game, id) : 'Nobody'}`, 'assign-word', busy || !view.canSelect, { index, playerId: id });
                item.className = `table-award-choice${selected ? ' is-chosen' : ''}`; item.setAttribute('aria-pressed', String(selected)); options.appendChild(item);
            }
            field.appendChild(options);
            if (game.party.format === 'text') {
                const guesses = turn.messages.filter(m => m.index === index && m.kind === 'guess');
                if (guesses.length) { const details = node('details'); details.appendChild(node('summary', '', 'Guesses in arrival order')); guesses.forEach(m => note(details, `${person(game, m.playerId)}: ${m.text}`)); field.appendChild(details); }
            }
            body.appendChild(field);
        });
        const totals = Object.values(turn.awards).flat().reduce((all, id) => { all[id] = (all[id] || 0) + 1; return all; }, {}), count = Object.keys(turn.awards).length;
        note(body, `${count}/${turn.words.length} words awarded${game.settings.tableScoring === 'guesser' ? ' · No speaker points' : ` · ${person(game, turn.speakerId)} +${count} for describing`}${Object.entries(totals).map(([id, points]) => ` · ${person(game, id)} +${points}`).join('')}`, 'party-recap');
        if (view.canSelect) body.appendChild(button(`Confirm ${count} awarded ${count === 1 ? 'word' : 'words'}`, 'submit-round', busy));
    }
    function render(state) {
        current = state;
        const { game, view, busy, local, now, gateName, gateId } = state, turn = game.turn, party = game.party;
        if (movingFrom && movingFrom !== `${game.matchId}:${turn?.id}:${game.phase}:${turn?.activeIndex}`) movingFrom = '';
        const active = view.active && state.connected, speakerName = party ? person(game, turn?.speakerId) : '';
        const key = `${game.matchId}:${turn?.id}:${turn?.activeIndex}:${state.actor.playerId}`;
        if (draftKey !== key) { draftKey = key; draft = ''; }
        const reactionEntries = Object.entries(game.reactions || {}).filter(([, r]) => now >= r.at && now - r.at < REACTION_TTL_MS);
        const { countdownRemainingMs, remainingSeconds, ...stableView } = view;
        const next = JSON.stringify([game.matchId, game.phase, turn, party, stableView, Boolean(countdownRemainingMs), busy, sending, movingFrom, active, gateName, reactionEntries, feedback]);
        const currentClock = root.querySelector('#partyClock');
        if (currentClock) currentClock.textContent = view.countdownRemainingMs ? countdownLabel(view.countdownRemainingMs) : view.remainingSeconds === null ? 'Unlimited' : String(view.remainingSeconds);
        if (signature === next) return; signature = next;
        const focused = document.activeElement?.id === 'tableDraft', selection = focused ? document.activeElement.selectionStart : null;
        const oldLog = root.querySelector('.table-transcript'), oldScroll = oldLog?.scrollTop || 0;
        const followMessages = !oldLog || oldLog.scrollHeight - oldLog.clientHeight - oldScroll < 24;
        const change = `${game.matchId}:${turn?.id}:${game.phase}:${gateName}:${Boolean(view.countdownRemainingMs)}:${turn?.activeIndex}`;
        const changed = announced !== change; announced = change;
        root.replaceChildren(); root.className = `party-game party-table party-phase-${game.phase}`;
        const header = node('div', 'party-heading'); header.appendChild(node('span', 'party-eyebrow', 'Every word has a winner')); header.appendChild(node('h2', '', 'Open Table'));
        if (!local) note(header, `Lobby ${state.code}${party ? ` · ${party.format === 'text' ? 'Typed clues' : 'Voice call'}` : ''}`, 'party-progress');
        if (party && game.phase !== 'finished') note(header, `${party.history.length} turns complete · ${game.settings.tableCycles} speaking ${game.settings.tableCycles === 1 ? 'turn' : 'turns'} each`, 'party-progress');
        root.appendChild(header); const body = node('section', 'party-stage'); root.appendChild(body);
        if (feedback) note(body, feedback, 'party-feedback');
        if (!active && !local) { note(body, state.connected ? 'Rejoin to restore your connection.' : 'Connection lost. Reconnecting…'); body.appendChild(button('Rejoin lobby', 'rejoin', busy)); }
        else if (gateName && game.phase !== 'finished') {
            body.appendChild(node('h3', '', `Pass the device to ${gateName}`)); note(body, 'Only the speaker should see the screen. Everyone else guesses aloud.');
            body.appendChild(button(`I'm ${gateName}`, 'local-ready', false, { playerId: gateId }));
        } else if (!game.isGameStarted) {
            body.appendChild(node('h3', '', view.host ? 'How will you give clues?' : 'Getting the table ready'));
            note(body, `${view.roster.connectedPlayers} connected · 3–8 players. The first correct guesser wins each word.`);
            if (view.host) {
                const choices = node('div', 'table-format-choices');
                for (const [format, title, text] of [['voice', 'Voice call', 'Talk on your usual call. The speaker awards each word after the round.'], ['text', 'Typed clues', 'No call needed. Type clues and guesses; the speaker awards the first correct answer.']]) {
                    const card = node('div', 'table-format-card'); card.appendChild(node('h4', '', title)); note(card, text); card.appendChild(button(`Start with ${title.toLowerCase()}`, 'start-game', busy || !view.canStartGame, { format })); choices.appendChild(card);
                } body.appendChild(choices);
            } else note(body, 'The host chooses voice call or typed clues when everyone is ready.');
        } else if (game.phase === 'finished') {
            const title = game.finishReason === 'stopped' ? 'Match ended' : party.winners.length > 1 ? 'It’s a draw!' : `${person(game, party.winners[0])} wins!`;
            body.appendChild(node('h3', '', title)); scores(body, game);
            if (view.host || local) {
                body.appendChild(button('Play again', 'rematch', busy, { format: party.format }));
                if (!local) body.appendChild(button(party.format === 'text' ? 'Rematch with voice call' : 'Rematch with typed clues', 'rematch', busy, { format: party.format === 'text' ? 'voice' : 'text' }));
            } else note(body, 'Waiting for the host to start a rematch.');
            body.appendChild(button('Share result card', 'share')); body.appendChild(button('Download summary', 'summary'));
        } else if (['idle', 'waiting'].includes(game.phase)) {
            body.appendChild(node('h3', '', view.speaker ? `You're up, ${speakerName}` : `${speakerName} speaks next`));
            note(body, `${game.settings.numWords} numbered words · ${game.settings.tableTiming === 'unlimited' ? 'Unlimited time' : game.settings.tableSeconds + ' seconds'}. ${local || party.format === 'voice' ? 'Everyone else guesses aloud.' : 'Give clues one word at a time in the chat.'}`);
            note(body, game.settings.tableScoring === 'guesser' ? 'Each solved word: first correct guesser +1. No speaker points.' : 'Each solved word: first correct guesser +1, speaker +1.');
            if (!view.roster.eligible || game.phase === 'waiting') note(body, 'Waiting for the speaker and at least three connected participants. Late arrivals join the next rematch.');
            if (view.speaker) body.appendChild(button('Start your turn', 'start-round', busy || !view.canStartRound));
            if (game.roundReview) note(body, `${party.history.at(-1).earned}/${party.history.at(-1).wordCount} words awarded last turn.`, 'party-recap');
        } else if (game.phase === 'describing') {
            clock(body, state);
            if (view.countdownRemainingMs) { body.appendChild(node('h3', '', 'Get ready')); note(body, 'Words and the full round time begin after Go.'); }
            else if (party.format === 'text') {
                body.appendChild(node('h3', '', `Word ${turn.activeIndex + 1} of ${turn.words.length}`));
                if (view.speaker) {
                    const tabs = node('div', 'table-word-tabs');
                    turn.words.forEach((word, index) => { const tab = button(`${index + 1}${turn.awards[index] ? ' ✓' : turn.skipped[index] ? ' ↷' : ''}`, 'focus-word', busy || Boolean(movingFrom) || !view.canClue || Boolean(turn.awards[index]), { index }); tab.className = `table-word-tab${index === turn.activeIndex ? ' is-chosen' : ''}`; tab.setAttribute('aria-label', `Word ${index + 1}${turn.awards[index] ? ', awarded' : turn.skipped[index] ? ', skipped' : ''}`); tab.setAttribute('aria-pressed', String(index === turn.activeIndex)); tabs.appendChild(tab); }); body.appendChild(tabs);
                    body.appendChild(node('div', 'party-answer', turn.words[turn.activeIndex]));
                    note(body, 'Read guesses in arrival order. Award the first correct one, then the next word opens.');
                } else note(body, view.participant ? `${speakerName} is typing clues. Guess the current numbered word below.` : 'You are watching. Join the rotation on rematch.');
                if (view.participant) transcript(body, state);
                if (view.canClue) body.appendChild(button('Skip this word', 'skip-word', busy || Boolean(movingFrom), { index: turn.activeIndex }));
            } else {
                body.appendChild(node('h3', '', view.speaker ? 'Describe these words' : `${speakerName} is giving clues`));
                note(body, view.speaker ? 'Describe in any order. Remember who guesses each numbered word first; award the words after the round.' : view.participant ? 'Guess aloud. The first correct guesser wins each word.' : 'You are watching. Join the rotation on rematch.');
                if (view.showWords) { const list = node('ol', 'table-word-card'); turn.words.forEach(word => list.appendChild(node('li', 'party-word', word))); body.appendChild(list); }
            }
            if (view.canEndRound) body.appendChild(button(view.speaker ? 'End round & award words' : 'Recover turn & award words', 'end-round', busy));
        } else if (game.phase === 'selecting') review(body, state);
        if (party && active && !gateName && !['describing', 'selecting'].includes(game.phase)) {
            if (game.phase !== 'finished') { const details = node('details', 'party-score-drawer'); details.appendChild(node('summary', '', 'Player scores')); scores(details, game); root.appendChild(details); }
            if (party.history.length) {
                const details = node('details', 'party-history'); details.appendChild(node('summary', '', 'Round history'));
                for (const event of party.history) {
                    const entry = node('details'); entry.appendChild(node('summary', '', `${person(game, event.speakerId)} · ${event.earned}/${event.wordCount} words awarded`));
                    event.words.forEach((word, index) => note(entry, `${index + 1}. ${word} · ${event.awards[index]?.length ? event.awards[index].map(id => person(game, id)).join(' + ') : 'Nobody / skipped'}`)); details.appendChild(entry);
                } root.appendChild(details);
            }
            if (!local && game.roundReview) {
                const key = `${game.matchId}:${game.roundReview.turnId}:${state.actor.connectionId}`;
                if (reactionKey !== key) { reactionKey = key; suppressed = new Set(reactionEntries.map(([id, r]) => `${id}:${r.at}`)); }
                const row = node('div', 'party-reactions'); row.setAttribute('aria-label', 'React to this round');
                for (const [reaction, emoji] of Object.entries(REACTIONS)) { const b = button(emoji, 'react', busy || Boolean(game.reactions?.[state.actor.playerId] && now - game.reactions[state.actor.playerId].at < 1800), { reaction }); b.setAttribute('aria-label', REACTION_LABELS[reaction]); b.title = REACTION_LABELS[reaction]; row.appendChild(b); }
                const feed = node('span', '', reactionEntries.filter(([id, r]) => r.reviewId === game.roundReview.turnId && !suppressed.has(`${id}:${r.at}`)).map(([id, r]) => `${REACTIONS[r.reaction] || ''} ${person(game, id)}`).join(' · ')); feed.setAttribute('role', 'status'); row.appendChild(feed); root.appendChild(row);
            }
        }
        const footer = node('div', 'party-footer'); footer.appendChild(button(local ? 'New game' : 'Leave lobby', 'exit'));
        if (!local && active && !['describing', 'selecting'].includes(game.phase)) footer.appendChild(button('Invite friends', 'invite'));
        if (view.host && game.isGameStarted && game.phase !== 'finished') footer.appendChild(button('End match', 'request-end', busy)); root.appendChild(footer);
        const log = root.querySelector('.table-transcript'); if (log) log.scrollTop = changed || followMessages ? log.scrollHeight : oldScroll;
        if (focused || restoreDraftFocus) { const input = root.querySelector('#tableDraft'); if (input && !input.disabled) { input.focus({ preventScroll: true }); restoreDraftFocus = false; if (selection !== null) input.setSelectionRange(selection, selection); } }
        if (changed) {
            const announcement = document.getElementById('partyAnnouncement'); if (announcement) announcement.textContent = gateName ? `Pass the device to ${gateName}.` : view.countdownRemainingMs ? 'Get ready. Words appear after Go.' : root.querySelector('.party-stage h3')?.textContent || 'Open Table';
            if (!focused && (gateName || ['idle', 'selecting', 'finished'].includes(game.phase))) { const heading = root.querySelector('.party-stage h3'); if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); } }
        }
    }
    return { render, reset() { current = null; signature = ''; draft = ''; draftKey = ''; feedback = ''; announced = ''; reactionKey = ''; movingFrom = ''; restoreDraftFocus = false; sending = false; suppressed.clear(); } };
}
