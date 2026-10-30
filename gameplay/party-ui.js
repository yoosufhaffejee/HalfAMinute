import { modeOf, MODES } from './modes.js?v=20261030.4';
import { CASES, caseEvidence, suspectTraits } from './cases.js?v=20261030.1';
import { countdownLabel } from './rules.js?v=20261029.2';
import { REACTIONS, REACTION_LABELS, REACTION_TTL_MS } from './experience.js?v=20261030.4';
import { createTableSurface } from './table-ui.js?v=20261030.4';

const h = (tag, className = '', text = '') => { const node = document.createElement(tag); node.className = className; node.textContent = text; return node; };
function button(text, action, disabled = false, payload = {}) {
    const node = h('button', 'btn btn-success', text); node.type = 'button'; node.dataset.partyAction = action; node.disabled = disabled;
    for (const [key, value] of Object.entries(payload)) node.dataset[key] = String(value);
    return node;
}
function note(parent, text, className = 'party-note') { parent.appendChild(h('p', className, text)); }
function portrait(index) {
    const node = h('span', 'case-portrait');
    const skin = ['#e8b08d', '#a86b4e', '#d49a77', '#efc4a5'][index], hair = ['#50382f', '#302b2b', '#312c30', '#a8693d'][index];
    const hairShape = [ 'M19 40V27C19 4 61 4 61 27V45L52 30 28 24Z', 'M19 31C16 8 64 7 62 31L55 25 25 25Z', 'M14 61V30C11 4 69 3 66 30V65L54 54V26H27V56Z', 'M19 32C13 3 64 5 64 30L48 23 27 30Z' ][index];
    node.innerHTML = `<svg viewBox="0 0 80 88" aria-hidden="true"><path fill="#344d5d" d="M6 88c0-25 17-32 34-32s34 7 34 32"/><path fill="${skin}" d="M33 49h14v20H33z"/><path fill="${hair}" d="${hairShape}"/><ellipse cx="40" cy="36" rx="19" ry="24" fill="${skin}"/><path fill="${hair}" d="M21 30V24C22 8 58 8 59 25L52 24 45 18 27 29Z"/><g fill="#302b2b"><circle cx="32" cy="36" r="1.6"/><circle cx="48" cy="36" r="1.6"/></g><path d="M35 47q5 4 10 0" fill="none" stroke="#854f42" stroke-width="1.6" stroke-linecap="round"/><path fill="#fff8ea" d="m28 65 12 8 12-8-4 22H32Z"/></svg>`;
    return node;
}

export function createPartySurface(root, { send, exit, invite, share, summary, rejoin }) {
    const tableSurface = createTableSurface(root, { send, exit, invite, share, summary, rejoin });
    let current, signature = '', feedback = '', draftKey = '', draft = '', reactionContext = '', suppressed = new Set(), announcedPhase = '';
    root.addEventListener('click', event => {
        const target = event.target.closest('button[data-party-action]'); if (!target || target.disabled) return;
        const type = target.dataset.partyAction;
        if (type === 'exit') { exit(); return; }
        if (type === 'rejoin') { rejoin(); return; }
        if (type === 'invite' || type === 'share') {
            target.disabled = true;
            void (type === 'invite' ? invite() : share(current.game)).then(text => { feedback = text || ''; signature = ''; render(current); })
                .catch(() => { feedback = 'Unable to complete that action. Please try again.'; signature = ''; render(current); }); return;
        }
        if (type === 'summary') { summary(current.game); return; }
        if (type === 'lock-guess') send({ type, text: draft });
        else send({ type, ...(target.dataset.playerId ? { playerId: target.dataset.playerId } : {}),
            ...(target.dataset.index !== undefined ? { index: Number(target.dataset.index) } : {}),
            ...(type === 'pass-guess' ? { type: 'lock-guess', pass: true } : {}),
            ...(type === 'react' ? { reaction: target.dataset.reaction, reviewId: current.game.roundReview?.turnId } : {}) });
    });
    const validGuess = () => Boolean(draft.trim()) && draft.trim().length <= 80 && !/[\p{Cc}<>]/u.test(draft);
    root.addEventListener('input', event => {
        if (event.target.id !== 'partyGuessInput') return;
        draft = event.target.value; event.target.setAttribute('aria-invalid', String(Boolean(draft.trim()) && !validGuess()));
        const lock = root.querySelector('[data-party-action="lock-guess"]'); if (lock) lock.disabled = current.busy || !current.view.canGuess || !validGuess();
    });
    root.addEventListener('submit', event => { event.preventDefault(); if (event.target.id === 'partyGuessForm' && current.view.canGuess && !current.busy && validGuess()) send({ type: 'lock-guess', text: draft }); });

    function render(state) {
        current = state;
        if (modeOf(state.game.settings) === 'table') { tableSurface.render(state); return; }
        const { game, view, now, busy, local, gateName, gateId } = state;
        const mode = modeOf(game.settings), table = mode === 'table', story = CASES[game.settings.caseId] || CASES.trophy;
        const party = game.party, turn = game.turn, active = view.active && state.connected;
        const speaker = party?.players.find(player => player.id === turn?.speakerId);
        const key = `${game.matchId}:${turn?.id}:${state.actor?.playerId}`;
        if (draftKey !== key) { draftKey = key; draft = ''; }
        const liveReactions = Object.entries(game.reactions || {}).filter(([, item]) => now >= item.at && now - item.at < REACTION_TTL_MS).map(([id, item]) => `${id}:${item.at}`);
        const phaseKey = JSON.stringify([game.matchId, game.phase, turn, party, liveReactions, view, busy, state.connected, gateName, Math.ceil(view.countdownRemainingMs / 1000), view.remainingSeconds, feedback]);
        const clock = root.querySelector('#partyClock');
        if (clock) clock.textContent = view.countdownRemainingMs ? countdownLabel(view.countdownRemainingMs) : !table && game.phase === 'describing' ? String(view.remainingSeconds) : '';
        // Do not rebuild input fields or the case board for ordinary timer ticks.
        if (signature === phaseKey) return;
        signature = phaseKey;
        const focused = document.activeElement?.id === 'partyGuessInput';
        const selection = focused ? document.activeElement.selectionStart : null;
        const announcementKey = `${key}:${game.phase}:${gateName}:${active}:${Boolean(view.countdownRemainingMs)}:${Boolean(view.ownGuess)}`;
        const phaseChanged = announcedPhase !== announcementKey; announcedPhase = announcementKey;
        root.replaceChildren(); root.className = `party-game party-${mode} party-phase-${game.phase}`;
        const header = h('div', 'party-heading');
        header.appendChild(h('span', 'party-eyebrow', table ? 'A seat for everyone' : story.location));
        header.appendChild(h('h2', '', table ? 'Open Table' : story.title));
        if (!local) note(header, `Lobby ${state.code}`, 'party-progress');
        if (party && game.phase !== 'finished') note(header, table
            ? `${party.history.length} turns complete · ${game.settings.tableCycles} speaking ${game.settings.tableCycles === 1 ? 'turn' : 'turns'} each`
            : game.phase === 'accusing' ? `${party.history.length} turns played · ${party.evidenceCount}/3 evidence` : `Turn ${Math.min(party.history.length + 1, game.settings.caseTurns)} of ${game.settings.caseTurns} · ${party.evidenceCount}/3 evidence`, 'party-progress');
        root.appendChild(header);
        const body = h('section', 'party-stage'); root.appendChild(body);
        const disabled = !active || busy;
        if (feedback) note(body, feedback, 'party-feedback');
        if (!active && !local) { note(body, state.connected ? 'Your connection needs restoring. Rejoin to continue.' : 'Connection lost. Reconnecting…'); body.appendChild(button('Rejoin lobby', 'rejoin', busy)); }
        else if (gateName && game.phase !== 'finished') {
            body.appendChild(h('div', 'party-pass-icon', '↗'));
            body.appendChild(h('h3', '', `Pass the device to ${gateName}`));
            note(body, 'Keep the screen facing away from everyone else.');
            body.appendChild(button(`I'm ${gateName}`, 'local-ready', false, { playerId: gateId }));
        } else if (!game.isGameStarted) {
            note(body, MODES[mode].description);
            note(body, `${view.roster.connectedPlayers} connected · ${table ? '3' : '2'}–12 players needed. Everyone joins the same ${table ? 'table' : 'crew'}.`);
            if (table && view.roster.connectedPlayers < 3) note(body, 'Three players let shared speaker credit produce different scores. For two players, choose Case Files or a team mode.');
            if (view.host) body.appendChild(button('Start match', 'start-game', disabled || !view.canStartGame));
            else note(body, 'The host starts when everyone is ready.');
        } else if (game.phase === 'finished') {
            const stopped = game.finishReason === 'stopped';
            const winners = party.winners || [];
            const title = stopped ? 'Match ended' : table ? winners.length > 1 ? "It's a draw!" : `${party.players.find(player => player.id === winners[0])?.name || 'Player'} wins!`
                : game.finishReason === 'solved' ? 'Case solved!' : 'The culprit got away';
            body.appendChild(h('div', 'party-result-seal', stopped ? '◇' : table ? '✦' : game.finishReason === 'solved' ? '✓' : '?'));
            body.appendChild(h('h3', '', title));
            if (!table && !stopped) note(body, `${story.people[party.culprit][0]} was responsible. ${party.evidenceCount}/3 evidence collected · ${party.totalCorrect} correct answers.`);
            if (table) renderScores(body, party, winners);
            if (view.host || local) body.appendChild(button('Play again', 'rematch', disabled));
            else note(body, 'Waiting for the host to start a rematch.');
            body.appendChild(button('Share result card', 'share'));
            body.appendChild(button('Download summary', 'summary'));
        } else if (game.phase === 'idle' || game.phase === 'waiting') {
            body.appendChild(h('div', 'party-turn-avatar', speaker?.name.slice(0, 1).toUpperCase() || '?'));
            body.appendChild(h('h3', '', view.speaker ? `You're up, ${speaker.name}` : `${speaker?.name || 'Next player'} speaks next`));
            note(body, table ? 'One answer. No timer. Help every listener earn a point—and earn one yourself for each correct guess.'
                : `Describe ${game.settings.numWords} words in ${game.settings.numSeconds} seconds. Correct guesses build the next evidence card.`);
            if (!view.roster.eligible || game.phase === 'waiting') note(body, `Waiting for the assigned speaker and at least ${table ? 'three' : 'two'} connected participants.${table ? ' Late arrivals can enter the rotation on rematch.' : ''}`);
            if (view.speaker) body.appendChild(button('Start your turn', 'start-round', disabled || !view.canStartRound));
            if (!table && !party.history.length) note(body, story.intro);
            if (game.roundReview) note(body, `${party.history.at(-1)?.earned || 0} ${table ? 'correct guesses confirmed' : 'words confirmed'} last turn.`, 'party-recap');
        } else if (game.phase === 'describing') {
            if (view.countdownRemainingMs) {
                note(body, 'Get ready'); body.appendChild(h('strong', 'party-clock', countdownLabel(view.countdownRemainingMs))).id = 'partyClock';
                note(body, table ? 'The answer appears after Go. Take your time.' : 'Words and the full timer begin after Go.');
            } else if (table) {
                if (view.speaker) {
                    note(body, 'Describe this answer. Each correct guess earns the guesser and you 1 point.');
                    body.appendChild(h('div', 'party-answer', turn.words[0]));
                    if (local) body.appendChild(button('Hide answer & pass for guesses', 'pass-device'));
                } else if (view.canGuess) {
                    body.appendChild(h('h3', '', `${speaker.name} is giving clues`));
                    note(body, 'Ask questions aloud. Keep your final answer private; all guesses reveal together.');
                    const form = h('form', 'party-guess-form'); form.id = 'partyGuessForm';
                    const label = h('label', '', 'Your final guess'); label.htmlFor = 'partyGuessInput'; form.appendChild(label);
                    const input = h('input'); input.id = 'partyGuessInput'; input.maxLength = 80; input.autocomplete = 'off'; input.value = draft; input.disabled = disabled; form.appendChild(input);
                    form.appendChild(button('Lock my guess', 'lock-guess', disabled || !validGuess())); form.appendChild(button('Pass this answer', 'pass-guess', disabled)); body.appendChild(form);
                } else note(body, view.ownGuess ? 'Your answer is locked. Waiting for the other guesses.' : 'Watch this match. You can join the player rotation on the next rematch.');
                note(body, `${turn.guesserIds.length - view.waitingFor.length}/${turn.guesserIds.length} guesses locked`, 'party-progress');
                if (view.host) for (const id of view.waitingFor) if (!state.connectedIds.includes(id)) {
                    const name = party.players.find(player => player.id === id)?.name;
                    body.appendChild(button(`Pass for ${name} (disconnected)`, 'pass-disconnected', disabled, { playerId: id }));
                }
            } else {
                body.appendChild(h('strong', 'party-clock', String(view.remainingSeconds))).id = 'partyClock';
                note(body, view.speaker ? 'Describe these words in any order. Everyone else guesses aloud.' : `${speaker.name} is speaking. Guess aloud; the answers stay hidden.`);
                if (view.showWords) {
                    turn.words.forEach(word => body.appendChild(h('div', 'party-word', word)));
                    if (state.hints?.length) { const details = h('details', 'party-hints'); details.appendChild(h('summary', '', 'Training hints')); state.hints.forEach(item => note(details, `${item.word}: ${item.description}`)); body.appendChild(details); }
                }
                if (view.canEndRound) body.appendChild(button('End round', 'end-round', disabled));
            }
        } else if (game.phase === 'selecting') {
            body.appendChild(h('h3', '', table ? `The answer: ${turn.words[0]}` : 'Which words were guessed?'));
            note(body, view.reviewer ? table ? 'Review together. Accept correct wording and spelling alternatives, then confirm.' : 'Mark the correct answers, then confirm to unlock evidence.'
                : `${state.connectedIds.includes(turn.speakerId) ? speaker.name : 'The host'} is reviewing. Everyone can follow the selections.`);
            if (table) for (const id of turn.guesserIds) {
                const guess = turn.guesses[id], name = party.players.find(player => player.id === id)?.name;
                const node = button(`${turn.correctIds.includes(id) ? '✓' : '—'} ${name}: ${guess.pass ? 'Passed' : guess.text}`, 'toggle-correct', disabled || !view.reviewer || guess.pass, { playerId: id });
                node.className = `party-review-answer${turn.correctIds.includes(id) ? ' is-correct' : ''}`;
                node.setAttribute('aria-pressed', String(turn.correctIds.includes(id))); body.appendChild(node);
            } else turn.words.forEach((word, index) => {
                const chosen = turn.selectedIndexes.includes(index), node = button(`${chosen ? '✓ ' : ''}${word}`, 'toggle-answer', disabled || !view.reviewer, { index });
                node.className = `party-review-answer${chosen ? ' is-correct' : ''}`; node.setAttribute('aria-pressed', String(chosen)); body.appendChild(node);
            });
            const earned = table ? turn.correctIds.length : turn.selectedIndexes.length;
            note(body, table ? `${speaker.name} +${earned} · Each correct guesser +1` : `${earned} correct · Evidence progress +${earned}`, 'party-recap');
            if (view.reviewer) body.appendChild(button(`Confirm ${earned} correct`, 'submit-round', disabled));
        } else if (game.phase === 'accusing') {
            body.appendChild(h('h3', '', 'Make your accusation'));
            note(body, local ? 'Discuss the evidence together. Choose a suspect below, then confirm your crew’s final answer.' : 'Discuss the evidence together. Choose one suspect; the host confirms the crew’s final answer.');
            if (!view.host) note(body, 'The host will confirm your crew’s decision.');
        }
        if (party && !gateName && active) {
            if (!table && game.phase !== 'describing' && game.phase !== 'selecting') renderCase(root, game, view, busy);
            if (table && game.phase !== 'finished') {
                const details = h('details', 'party-score-drawer'); details.appendChild(h('summary', '', 'Player scores')); renderScores(details, party, []); root.appendChild(details);
            }
            if (game.roundReview && !['describing', 'selecting'].includes(game.phase)) renderReactions(root, state);
            if (party.history.length && !['describing', 'selecting'].includes(game.phase)) {
                const details = h('details', 'party-history'); details.appendChild(h('summary', '', 'Round history'));
                party.history.forEach((event, index) => note(details, `Turn ${index + 1} · ${party.players.find(player => player.id === event.speakerId)?.name} · ${event.earned} correct`)); root.appendChild(details);
            }
        }
        const footer = h('div', 'party-footer');
        footer.appendChild(button(local ? 'New game' : 'Leave lobby', 'exit'));
        if (!local && active && !['describing', 'selecting'].includes(game.phase)) footer.appendChild(button('Invite friends', 'invite'));
        if (view.host && game.isGameStarted && game.phase !== 'finished') footer.appendChild(button('End match', 'request-end', disabled));
        root.appendChild(footer);
        if (focused) { const input = root.querySelector('#partyGuessInput'); input?.focus({ preventScroll: true }); if (selection !== null) input?.setSelectionRange(selection, selection); }
        if (phaseChanged) {
            const announcement = document.getElementById('partyAnnouncement');
            if (announcement) announcement.textContent = gateName ? `Pass the device to ${gateName}.` : !active ? 'Connection needs restoring.' : game.phase === 'describing'
                ? view.countdownRemainingMs ? 'Get ready. Answers remain hidden until Go.' : view.ownGuess ? 'Your guess is locked. Waiting for other players.' : table ? view.speaker ? 'Give your clues. There is no timer.' : 'Ask questions, then lock your final guess.' : 'Clue time has started.'
                : root.querySelector('.party-stage h3')?.textContent || MODES[mode].description;
            if ((!focused && ['idle', 'selecting', 'accusing', 'finished'].includes(game.phase)) || gateName) {
                const heading = root.querySelector('.party-stage h3'); if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
                root.querySelector('.party-stage')?.scrollIntoView({ block: 'nearest' });
            }
        }
    }
    function renderScores(parent, party, winners) {
        const list = h('ol', 'party-scores');
        [...party.players].sort((a, b) => Number(Boolean(a.departed)) - Number(Boolean(b.departed)) || b.points - a.points).forEach(player => {
            const row = h('li', winners.includes(player.id) ? 'party-winner' : ''); row.appendChild(h('span', '', `${player.name}${player.departed ? ' · left, not ranked' : ''}`)); row.appendChild(h('strong', '', `${player.points} pts`)); list.appendChild(row);
        }); parent.appendChild(list);
    }
    function renderCase(parent, game, view, busy) {
        const party = game.party, story = CASES[game.settings.caseId], scene = h('section', 'case-board');
        scene.appendChild(h('h3', '', 'The evidence board'));
        const meter = h('div', 'case-meter'); meter.setAttribute('aria-label', `${party.evidenceCount} of 3 evidence cards unlocked`);
        for (let i = 0; i < 3; i++) meter.appendChild(h('span', i < party.evidenceCount ? 'is-unlocked' : '', i < party.evidenceCount ? '✓' : String(i + 1)));
        scene.appendChild(meter);
        if (party.evidenceCount < 3 && game.phase !== 'finished') {
            const every = party.evidenceEvery || Math.max(1, Math.ceil(game.settings.numWords * .6));
            note(scene, `${every - party.totalCorrect % every} more correct ${every - party.totalCorrect % every === 1 ? 'answer unlocks' : 'answers unlock'} the next evidence card.`);
        }
        for (let i = 0; i < party.evidenceCount; i++) note(scene, caseEvidence(game.settings.caseId, party.culprit, i), 'case-evidence');
        const profiles = h('details', 'case-profiles'); profiles.open = game.phase === 'accusing' || game.phase === 'finished'; profiles.appendChild(h('summary', '', 'Suspect profiles'));
        const suspects = h('div', 'case-suspects');
        story.people.forEach(([name, role, initial], index) => {
            const card = h('button', `case-suspect suspect-${index}${party.accusation === index ? ' is-chosen' : ''}`); card.type = 'button';
            card.disabled = busy || !view.host || game.phase !== 'accusing'; card.dataset.partyAction = 'choose-suspect'; card.dataset.index = String(index);
            card.setAttribute('aria-pressed', String(party.accusation === index));
            card.appendChild(portrait(index)); card.appendChild(h('strong', '', `${party.accusation === index ? '✓ ' : ''}${name}`)); card.appendChild(h('small', '', role));
            suspectTraits(game.settings.caseId, index).forEach(trait => card.appendChild(h('span', 'case-trait', trait)));
            suspects.appendChild(card);
        }); profiles.appendChild(suspects); scene.appendChild(profiles);
        if (game.phase === 'accusing' && view.host) scene.appendChild(button(party.accusation < 0 ? 'Choose a suspect above' : `Accuse ${story.people[party.accusation][0]}`, 'accuse', busy || party.accusation < 0, { index: party.accusation }));
        parent.appendChild(scene);
    }
    function renderReactions(parent, state) {
        const reviewId = state.game.roundReview.turnId, key = `${state.game.matchId}:${reviewId}:${state.actor.playerId}:${state.actor.connectionId}`;
        if (key !== reactionContext) { reactionContext = key; suppressed = new Set(Object.entries(state.game.reactions || {}).map(([id, item]) => `${id}:${item.at}`)); }
        const row = h('div', 'party-reactions');
        const recent = state.game.reactions?.[state.actor.playerId];
        for (const [reaction, emoji] of Object.entries(REACTIONS)) {
            const node = button(emoji, 'react', state.busy || Boolean(recent && state.now - recent.at < 1800), { reaction }); node.setAttribute('aria-label', REACTION_LABELS[reaction]); node.title = REACTION_LABELS[reaction]; row.appendChild(node);
        }
        const text = Object.entries(state.game.reactions || {}).filter(([id, item]) => item.reviewId === reviewId && !suppressed.has(`${id}:${item.at}`) && state.now - item.at < REACTION_TTL_MS && state.now >= item.at)
            .map(([id, item]) => `${REACTIONS[item.reaction] || ''} ${state.game.party.players.find(player => player.id === id)?.name || ''}`).join(' · ');
        row.appendChild(h('span', '', text)); if (!state.local) parent.appendChild(row);
    }
    return { render, reset() { tableSurface.reset(); signature = ''; feedback = ''; draft = ''; draftKey = ''; reactionContext = ''; announcedPhase = ''; suppressed.clear(); } };
}
