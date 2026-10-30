import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getDatabase, onValue, ref, get, update, runTransaction, onDisconnect, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js"
import * as OnlineState from './online/state.js?v=20261030.4';
import { OnlineClient } from './online/client.js?v=20261030.4';
import * as Gameplay from './gameplay/rules.js?v=20261030.2';
import * as AiErrors from './gameplay/ai-errors.js?v=20261020.14';
import { createAiWordClient } from './gameplay/ai-client.js?v=20261029.5';
import * as AiPacks from './gameplay/ai-packs.js?v=20261029.5';
import { normalizeOnlinePack } from './gameplay/online-packs.js?v=20261029.3';
import * as Experience from './gameplay/experience.js?v=20261030.4';
import * as PackLibrary from './gameplay/saved-packs.js?v=20261029.5';
import { createScreenAwake } from './gameplay/screen-awake.js?v=20261029.4';
import * as Modes from './gameplay/modes.js?v=20261030.4';
import { createPartySurface } from './gameplay/party-ui.js?v=20261030.4';
import { partySummary, sharePartyResult } from './gameplay/party-results.js?v=20261030.4';
import { partySnapshot } from './gameplay/party-state.js?v=20261030.4';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAHasvP2vwEY-WCPpSe4PGRTQKYuvzccaI",
    authDomain: "halfaminute-01.firebaseapp.com",
    databaseURL: "https://halfaminute-01-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "halfaminute-01",
    storageBucket: "halfaminute-01.appspot.com",
    messagingSenderId: "1004209997324",
    appId: "1:1004209997324:web:1bca3f479b0d89538f5029"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Firebase manages Gemini authorization; no Gemini credential is shipped to players.
const model = createAiWordClient(app);
let aiGeneratedEntries = [];
let aiTopics = [];
let aiUndoPack = null;
let pendingOnlinePack = null;
let aiGenerationHistory = AiPacks.readHistory({ getItem: key => localStorage.getItem(key) });

// Game state variables
let teams = [];
let currentGameWords = [];
let easyWords = [];
let hardWords = [];
let currentTeam = 0;
let currentRound = 0;
let localFinalTurnCount = null;
let localMatchFinished = false;
let countdownTimer;
let endRoundEarly = false;
let selectedButtons = 0;

let gameCode = '';
let numPlayers = 0;
let isHost = false;
let isOnlineGame = false;
let isSpeaker = false;
let playerName = "";
let isGameStarted = false;
let countdownSoundPlaying = false;
let hasRegisteredLobbyExitHandlers = false;
let isLeavingLobby = false;
let onlineClient = null;
let onlineLobbyActionPending = false;
let onlineEndedHandled = false;
let onlineBoardSignature = '';
const ONLINE_SESSION_KEY = 'half_a_minute_online_session_v2';

// Game settings variables
let isAiGame = false;
let numTeams = 2;
let pointsToWin = 20;
let winRule = 'equal-turns';
let numWords = 5;
let numSeconds = 30;
let difficulty = 'normal';
let isChaosMode = false;
let isTrainingMode = false;
let activeSelectedTheme = "None";
let activeSelectedCategories = [];
let wordDescriptionLookup = new Map();
let globalWordDescriptionLookup = null;
let isRoundActive = false;
let isPreparingRound = false;
let onlineGameState = "waiting";
let roundPowerups = {};
let powerupRevealVisible = false;
let landedPowerupPreview = null;
let chaosVisual = null;
let teamShields = [];
let isResolvingChaosMove = false;
let localDeck = {};
let localWordObjects = [];
let localRerollsUsed = [];
let localStarter = null;
let localMatchId = 0;
let localAudit = [];
let localChoice = null;
let finishLocalRound = null;
let trainingSignature = '';
let preferences = { muted: false, volume: 0.6, motion: 'system' };
let lastOnlineCue = '';
let localTurnStartedAt = 0;
let localSelectingAt = 0;
let localSeries = null;
let screenAwake = null;
let experienceContext = '';
let experienceHydrated = false;
const celebratedTurns = new Set();
let reactionContext = '';
const seenReactions = new Set();
let resultShareBusy = false;
let activeMode = 'classic';
let localStakes = {}, localTurnRisky = false, localTurnCardSize = 5;
let partySurface = null, localPartyGame = null, partyTick = null, localPartySeat = '', localPartyPassed = false, localPartyTurnKey = '';
let partyLastPhase = '', partyWarningCue = '';
let presentedMode = '';
let isReturningToSetup = false;

function modeSettingsPresentation(settings) {
    const mode = Modes.modeOf(settings), party = Modes.isParty(settings);
    const presentationKey = `${mode}:${Gameplay.normalizeWinRule(settings.winRule)}:${settings.tableTiming}:${settings.tableScoring}`;
    if (presentedMode === presentationKey) return;
    presentedMode = presentationKey;
    document.getElementById('modeDescription').textContent = Modes.MODES[mode].description;
    document.getElementById('teamCountField').hidden = party;
    document.getElementById('quickLengthField').hidden = party;
    document.getElementById('quickSetup')?.classList.toggle('party-mode-setup', party);
    document.getElementById('partySetup').hidden = !party;
    document.getElementById('localNamesHint').textContent = `For local play, enter ${Modes.minimumPlayers(settings)}–${Modes.maximumPlayers(settings)} different names. Online, each friend joins from their own device.`;
    document.getElementById('localNamesError').hidden = true;
    document.getElementById('tableCyclesField').hidden = mode !== 'table';
    document.getElementById('tableScoringField').hidden = mode !== 'table';
    document.getElementById('tableTimingField').hidden = mode !== 'table';
    document.getElementById('tableSecondsField').hidden = mode !== 'table' || settings.tableTiming === 'unlimited';
    document.getElementById('tableSeconds').disabled = mode !== 'table' || settings.tableTiming === 'unlimited';
    document.getElementById('caseIdField').hidden = document.getElementById('caseTurnsField').hidden = mode !== 'case';
    document.getElementById('setupStarterNote').textContent = party ? 'Local play passes one device between named players. Online play gives each player their own private screen.'
        : 'The starting team is drawn at random. Rematches rotate the starter. Customize cards, packs, and timing in Settings.';
    document.getElementById('targetSetting').hidden = party;
    document.getElementById('winRuleSetting').hidden = party;
    document.getElementById('winRule').disabled = party;
    document.getElementById('winRuleHint').textContent = settings.winRule === 'first-to-target'
        ? 'The first team to reach the target wins after its turn, including any effects.'
        : 'Finish the round so every team has the same number of turns. Highest score wins.';
    document.getElementById('timeSetting').hidden = mode === 'table';
    document.getElementById('wordsSetting').hidden = false;
    txtSeconds.disabled = mode === 'table'; txtWords.disabled = false;
    document.getElementById('pointsToWin').disabled = txtTeams.disabled = party;
    chkChaos.disabled = mode !== 'classic' && mode !== 'chaos';
    document.getElementById('chkReroll').disabled = mode !== 'chaos';
    document.getElementById('chkSeries').disabled = party;
    chkTraining.disabled = mode === 'table';
    document.getElementById('chaosOption').hidden = party || Modes.isStakes(settings);
    document.getElementById('rerollOption').hidden = mode !== 'chaos';
    document.getElementById('trainingOption').hidden = mode === 'table';
    document.getElementById('seriesOption').hidden = party;
    document.getElementById('modePlayOptions').hidden = mode === 'table';
    const message = party ? mode === 'table' ? 'Open Table uses numbered word cards, individual scores and equal speaking turns. Choose speaking turns, timing and words per card here. Team targets, training hints, Chaos and team tallies do not apply.'
        : 'Case Files uses one crew and the investigation turn budget. Team score targets, Chaos and session team tallies do not apply.'
        : Modes.isStakes(settings) ? 'Stakes has its own scoring. Chaos effects and rerolls do not apply. The risk target follows the actual eligible card size.' : '';
    document.getElementById('modeSettingsNote').textContent = message; document.getElementById('modeSettingsNote').hidden = !message;
    const rules = {
        boost: 'Choose a normal turn or risk before the words appear. Get at least 60% correct (3 of 5) to add 2 to your clue points; miss and subtract 2, with a floor of zero. Bank 2 points first. After risking, complete one normal turn before risking again.',
        double: 'Once per team per match, risk before seeing the card. Meet the 60% target (3 of 5) to double your clue points. Miss and lose 3 banked points, earning no clue points. Bank 3 points first.',
        table: `For 3–8 players. Only the speaker sees the numbered word card after Go. Local play and online voice-call play use spoken guesses. After the round, the speaker awards each word to the first correct guesser, or Nobody if skipped. Select every tied guesser for simultaneous correct answers; speaker credit stays 1 per solved word. ${settings.tableScoring === 'guesser' ? 'Only the first correct guesser earns 1 point; the speaker earns no points.' : 'The first correct guesser and speaker each earn 1 point per solved word.'} Timed rounds default to 60 seconds; Unlimited lets the speaker finish when ready. Words per card follows Settings. Online, the host chooses voice call or typed clues at match start. Typed play takes one word at a time: send clues, read guesses in arrival order, and award the first correct one. Everyone gets equal speaking turns; late arrivals watch until rematch.`,
        case: 'Everyone joins one crew. The speaker describes words while the crew guesses aloud; only the speaker sees live answers. Confirm correct words after each timed round. Each evidence threshold unlocks a fact, with spare progress carried forward. Inspect suspect profiles and discuss the clues. When all evidence is unlocked or the turn budget ends, agree on one suspect and confirm a final accusation (the host confirms online). Solve the case together.'
    };
    document.getElementById('modeHowToPlay').hidden = !rules[mode];
    document.getElementById('modeRulesTitle').textContent = Modes.MODES[mode].name;
    const finishRule = settings.winRule === 'first-to-target'
        ? 'The first team to reach the target wins after scoring and any effects; other teams do not get a reply turn.'
        : 'Reaching the target starts the final round: every team gets the same number of turns, then the highest score wins. Equal highest scores are a draw.';
    document.getElementById('modeRulesText').textContent = (rules[mode] || '') + (Modes.isStakes(settings) ? ' ' + finishRule : '');
    document.getElementById('standardWinRule').textContent = 'Every correct guess earns one point. ' + finishRule;
    document.getElementById('standardRulesGoal').hidden = party || Modes.isStakes(settings);
    document.getElementById('standardRulesTurns').hidden = party;
    document.getElementById('chaosRulesSection').hidden = party || Modes.isStakes(settings);
    document.getElementById('starterRulesNote').hidden = party;
    document.getElementById('onlineRulesText').textContent = party ? 'Join with a four-letter code. Everyone joins the same table or crew. Follow your private role screen; late Open Table arrivals join the next rematch.'
        : 'Join with a four-letter code. The game manages teams, speakers and turns. Follow your on-screen role: who can see the cards depends on the lobby size.';
}

function renderStakesUi(data = null) {
    const settings = data?.settings || { mode: activeMode }, panel = document.getElementById('stakesPanel');
    panel.hidden = !Modes.isStakes(settings) || (data ? !data.isGameStarted || data.phase === 'finished' : localMatchFinished);
    if (panel.hidden) return;
    const index = data?.turn?.teamIndex ?? currentTeam - 1, risky = data?.turn?.risky ?? localTurnRisky;
    const selecting = data ? data.phase === 'selecting' : !btnAnswers.hidden && !isRoundActive;
    const idle = data ? data.phase === 'idle' : !isRoundActive && !btnStartRound.hidden && !isResolvingChaosMove;
    let size = data?.turn?.words?.length;
    if (!size && data) {
        const key = JSON.stringify([data.matchId, settings]);
        if (onlineClient.stakesSizeKey !== key) { onlineClient.stakesSizeKey = key; onlineClient.stakesSize = Modes.eligibleCardSize(getOnlineWordObjects(settings, data.wordPack), { ...settings, numWords, difficulty }); }
        size = onlineClient.stakesSize;
    }
    size ||= idle ? Modes.eligibleCardSize(localWordObjects, { numWords, difficulty }) : localTurnCardSize;
    const target = Modes.riskTarget(size), availability = Modes.riskAvailability(settings, teams[index]?.points || 0, data?.stakes?.[index] || localStakes[index]);
    const mode = Modes.modeOf(settings);
    document.getElementById('stakesInstruction').textContent = idle ? `Risk target: ${target} of ${size}. ${mode === 'boost' ? 'Clue points +2 if met, −2 if missed.' : 'Double clue points if met; lose 3 with no clue points if missed.'}`
        : risky ? `Risk turn · Target ${target} of ${size}${selecting ? ' · Review your score below.' : ''}` : 'Normal turn · One point per correct answer.';
    const button = document.getElementById('riskRoundButton'); button.hidden = !idle || (data && !isSpeaker);
    button.disabled = !availability.allowed || Boolean(data && (onlineClient.busy || !onlineClient.connected));
    button.textContent = mode === 'boost' ? `Risk this turn · +2 / −2` : 'Risk this turn · double / −3';
    const detail = document.getElementById('stakesAvailability'); detail.hidden = !idle; detail.textContent = availability.reason;
}

function ensurePartySurface() {
    if (partySurface) return;
    partySurface = createPartySurface(document.getElementById('partyGame'), {
        send: action => partyCommand(action), exit: () => { void returnToSetup(); }, share: sharePartyResult, summary: partySummary,
        rejoin: () => { void onlineClient?.resume(true); },
        invite: async () => {
            const url = Experience.inviteLink(location.href, gameCode);
            if (navigator.share) { try { await navigator.share({ title: 'Join Half A Minute', url }); return 'Invitation shared.'; } catch (error) { if (error.name === 'AbortError') return ''; } }
            try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); return 'Invite link copied.'; } } catch { /* Selectable text fallback below. */ }
            return `Invite link: ${url}`;
        }
    });
}
function partyPeople(gameData) { return OnlineState.members(gameData); }
function renderPartyGame(data = localPartyGame) {
    if (!data || isReturningToSetup) return;
    data = partySnapshot(data);
    ensurePartySurface();
    const local = !isOnlineGame, now = local ? Date.now() : onlineClient.serverNow();
    if (local) for (const record of Object.values(data.presence)) for (const value of Object.values(record.connections)) value.lastSeen = now;
    let gateName = '', gateId = '';
    if (local) {
        const key = `${data.matchId}:${data.turn.id}`;
        if (localPartyTurnKey !== key) { localPartyTurnKey = key; localPartySeat = ''; localPartyPassed = false; }
        if (data.phase === 'selecting' || data.phase === 'accusing' || data.phase === 'finished') localPartySeat = data.phase === 'selecting' ? data.turn.speakerId : data.hostId;
        else {
            const desired = data.turn.speakerId;
            if (desired && localPartySeat !== desired) {
                gateId = desired; gateName = data.party.players.find(player => player.id === desired)?.name || 'the next player';
            }
        }
    }
    const actor = local ? partyPeople(data).find(player => player.playerId === (gateId || localPartySeat || data.hostId)) : onlineClient.actor;
    const view = OnlineState.view(data, actor, now), connectedIds = partyPeople(data).filter(player => local || OnlineState.isConnected(data, player, now)).map(player => player.playerId);
    game.hidden = true; menu.hidden = true; document.getElementById('partyGame').hidden = false;
    btnHistory.hidden = true; btnAI.hidden = true; btnRules.hidden = false; btnOnline.hidden = local;
    const connected = local || onlineClient.connected && !onlineClient.suspended;
    partySurface.render({ game: data, actor, view, now, local, code: gameCode, gateId, gateName, connectedIds, connected, busy: !local && (onlineClient.busy || onlineClient.registering),
        hints: !data.wordPack && !data.customWords && data.settings.trainingMode && view.speaker && view.showWords ? data.turn.words.map(word => ({ word, description: getTrainingDescription(word) })).filter(item => item.description) : [] });
    screenAwake?.setActive(connected && data.isGameStarted && data.phase !== 'finished');
    if (local && data.phase === 'describing' && data.turn.deadline && now >= data.turn.deadline) { void partyCommand({ type: 'expire-round' }); return; }
    const cue = `${isOnlineGame ? gameCode : 'local'}:${data.matchId || 1}:${data.turn?.id || 0}`;
    if (data.phase !== 'describing') {
        stopRoundSounds();
        if (partyLastPhase === `${cue}:describing` && data.phase === 'selecting') void playSound(endSound, () => false);
    }
    partyLastPhase = `${cue}:${data.phase}`;
    if (view.countdownRemainingMs && cue !== lastOnlineCue) { lastOnlineCue = cue; void playSound(countdownSound, () => false, 1, Math.max(0, (now - data.turn.countdownAt) / 1000)); }
    if (connected && data.phase === 'describing' && Number.isFinite(data.turn.deadline) && !view.countdownRemainingMs
        && view.remainingSeconds > 0 && view.remainingSeconds <= 5 && partyWarningCue !== cue) { partyWarningCue = cue; void playSound(warningSound, () => false); }
    syncTickSound(view.remainingSeconds, Number.isFinite(data.turn?.deadline) && data.phase === 'describing' && !view.countdownRemainingMs && connected);
    if (!partyTick) partyTick = setInterval(() => { const next = isOnlineGame ? onlineClient?.snapshot : localPartyGame; if (next && Modes.isParty(next.settings)) renderPartyGame(next); }, 200);
}
async function partyCommand(action) {
    if (action.type === 'local-ready') { localPartySeat = action.playerId; renderPartyGame(); return; }
    if (action.type === 'pass-device') { localPartyPassed = true; localPartySeat = ''; renderPartyGame(); return; }
    if (action.type === 'request-end') { getModalInstance('endMatchModal')?.show(); return; }
    const request = ['start-game', 'start-round', 'rematch'].includes(action.type) ? { ...action, seed: randomSeed() } : action;
    if (!isOnlineGame && Modes.modeOf(localPartyGame?.settings) === 'table' && ['start-game', 'rematch'].includes(action.type)) request.format = 'voice';
    if (isOnlineGame) return await sendOnlineCommand(request);
    if (!localPartyGame) return;
    const now = Date.now();
    for (const record of Object.values(localPartyGame.presence)) for (const value of Object.values(record.connections)) value.lastSeen = now;
    const identity = ['rematch', 'end-game', 'accuse', 'choose-suspect'].includes(action.type) ? localPartyGame.hostId : localPartySeat || localPartyGame.turn.speakerId;
    const actor = partyPeople(localPartyGame).find(player => player.playerId === identity);
    const next = OnlineState.act(localPartyGame, actor, { ...request, turnId: localPartyGame.turn?.id, matchId: localPartyGame.matchId }, now,
        { drawWords: drawOnlineWords, planChaos: planOnlineChaos });
    if (next) {
        localPartyGame = next;
        if (action.type === 'start-round') rememberUsedWords(next.turn.words);
        if (action.type === 'lock-guess') localPartySeat = '';
        renderPartyGame();
    }
}
function startLocalParty(settings) {
    const names = document.getElementById('localPlayerNames').value.split('\n').map(name => sanitizePlayerName(name)).filter(Boolean);
    const error = names.length < Modes.minimumPlayers(settings) || names.length > Modes.maximumPlayers(settings) ? `Enter ${Modes.minimumPlayers(settings)}–${Modes.maximumPlayers(settings)} player names, one per line.` : new Set(names.map(name => name.toLowerCase())).size !== names.length ? 'Give every player a different name.' : '';
    const namesError = document.getElementById('localNamesError'); namesError.hidden = !error; namesError.textContent = error;
    document.getElementById('localPlayerNames').setAttribute('aria-invalid', String(Boolean(error)));
    if (error) { document.getElementById('localPlayerNames').focus(); return; }
    const localEntries = isAiGame ? getAiWordObjects(settings.difficulty) : null;
    localWordObjects = localEntries ? localEntries.filter(entry => settings.difficulty === 'normal' || entry.difficulty === settings.difficulty) : filterRecentlyUsedWords(getOnlineWordObjects(settings));
    setWordDescriptionsFromObjects(localEntries ? [] : localWordObjects);
    clearInterval(countdownTimer); finishLocalRound = null; stopRoundSounds();
    isRoundActive = false; isChaosMode = false; isResolvingChaosMove = false;
    numWords = settings.numWords; numSeconds = settings.numSeconds; difficulty = settings.difficulty;
    let data = { protocolVersion: OnlineState.PROTOCOL_VERSION, settings, localEntries: localWordObjects, localPlayerOrder: names.map((_, index) => `local-${index}`), customWords: Boolean(localEntries), teams: [{ points: 0, players: [] }, { points: 0, players: [] }],
        phase: 'waiting', currentTeam: 1, hostId: '', hostEpoch: 0, dateCreated: Date.now(), matchId: 1 };
    names.forEach((name, index) => { data = OnlineState.join(data, { playerId: `local-${index}`, connectionId: `local-connection-${index}`, playerName: name }, Date.now()); });
    localPartyGame = data; activeMode = settings.mode; localPartySeat = data.hostId; lastOnlineCue = ''; partyLastPhase = '';
    document.getElementById('menuNotice').hidden = true; setLayoutMode('game');
    void partyCommand({ type: 'start-game' });
}
function renderPartyOnline(data) {
    activeMode = Modes.modeOf(data.settings); isGameStarted = Boolean(data.isGameStarted);
    isChaosMode = false; isRoundActive = data.phase === 'describing';
    const settings = sanitizeGameSettingsFromDb(data.settings, data.teams.length);
    numWords = settings.numWords; numSeconds = settings.numSeconds; difficulty = settings.difficulty;
    teams = data.teams.map(team => ({ ...team, players: (team.players || []).map(player => ({ ...player })) }));
    const view = OnlineState.view(data, onlineClient.actor, onlineClient.serverNow());
    isHost = view.host; isSpeaker = view.speaker;
    if (view.player) { playerName = view.player.playerName; saveOnlineSession({ code: gameCode, playerId: view.player.playerId, playerName }); }
    updateLobbyPresentation(data, view); modeSettingsPresentation(settings);
    const list = document.getElementById('lobbyPlayers'); list.innerHTML = '';
    for (const person of OnlineState.members(data)) {
        const row = document.createElement('p'); row.textContent = `${person.playerName}${person.playerId === data.hostId ? ' · Host' : ''}${OnlineState.isConnected(data, person, onlineClient.serverNow()) ? '' : ' · Reconnecting'}`; list.appendChild(row);
    }
    const hintsKey = JSON.stringify([data.matchId, settings.difficulty, settings.selectedTheme, settings.selectedCategories, Boolean(data.wordPack)]);
    if (onlineClient.partyHintsKey !== hintsKey) {
        onlineClient.partyHintsKey = hintsKey;
        if (!data.wordPack) setWordDescriptionsFromObjects(getOnlineWordObjects(settings)); else wordDescriptionLookup = new Map();
    }
    renderPartyGame(data);
}

function playCelebrationChime() {
    if (preferences.muted || !preferences.volume) return;
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const context = new AudioContext(), gain = context.createGain();
        gain.connect(context.destination);
        gain.gain.setValueAtTime(preferences.volume * 0.08, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.35);
        [660, 880].forEach((frequency, index) => {
            const tone = context.createOscillator(); tone.frequency.value = frequency; tone.connect(gain);
            tone.start(context.currentTime + index * 0.1); tone.stop(context.currentTime + 0.35);
        });
        setTimeout(() => { void context.close().catch(() => {}); }, 500);
    } catch { /* Feedback never blocks progression. */ }
}

function renderRoundHighlight(event, events, points, context, animate = true) {
    const node = document.getElementById('roundHighlight');
    const headline = Experience.roundHighlight(event, events);
    const lead = Experience.leadChange(event, points);
    const text = [headline, lead].filter(Boolean).join(' · ');
    if (experienceContext !== context) {
        experienceContext = context; experienceHydrated = false; celebratedTurns.clear();
    }
    const key = event ? `${context}:${event.id}` : '';
    const fresh = Boolean(text && !celebratedTurns.has(key));
    if (fresh) celebratedTurns.add(key);
    node.hidden = !text;
    if (node.textContent !== text) node.textContent = text;
    if (!text) node.classList.remove('celebrate');
    if (fresh) {
        node.classList.remove('celebrate');
        if (experienceHydrated && animate) {
            if (!reducedMotion()) { void node.offsetWidth; node.classList.add('celebrate'); }
            playCelebrationChime();
        }
    }
    experienceHydrated = true;
}

function renderTurnExperience(data = null, view = null) {
    renderStakesUi(data);
    const active = data ? onlineClient.connected && view.active && !onlineClient.suspended : !game.hidden;
    const idle = data ? data.phase === 'idle' && view.canStartRound : !isRoundActive && !isResolvingChaosMove && !btnStartRound.hidden;
    const role = document.getElementById('roleInstruction');
    role.classList.toggle('turn-handoff', Boolean(active && idle));
    role.style.borderColor = getTeamColor(Math.max(0, currentTeam - 1));
    btnStartRound.textContent = data ? 'Start your turn' : `Start Team ${currentTeam}'s turn`;
    const playing = data ? data.isGameStarted && !['finished', 'ended'].includes(data.phase) : active && document.getElementById('matchResults').hidden;
    screenAwake?.setActive(active && playing);
    document.getElementById('lobbyInvite').hidden = !data || !active || ['describing', 'selecting'].includes(data.phase);
    const events = data ? Object.values(data.auditEvents || {}) : localAudit;
    let event = data ? data.auditEvent : events.at(-1);
    if (data && ['resolving', 'chaos-choice'].includes(data.phase)) {
        event = { id: data.turn.id, teamIndex: data.turn.teamIndex, earned: (data.turn.selectedIndexes || []).length, wordCount: data.turn.words.length };
    }
    if (!active || (data ? !['idle', 'waiting', 'resolving', 'chaos-choice'].includes(data.phase)
        : isRoundActive || localMatchFinished || !btnAnswers.hidden)) event = null;
    renderRoundHighlight(event, events, teams.map(team => team.points), data ? `${gameCode}:${data.matchId || 1}` : `local:${localMatchId}`, active);
    renderReactions(data, view);
}

function renderReactions(data, view) {
    const section = document.getElementById('roundReactions');
    const active = data && onlineClient.connected && view.active && !onlineClient.suspended;
    const review = data && (['resolving', 'chaos-choice'].includes(data.phase) ? data.turn : data.roundReview);
    const allowed = active && review && ['idle', 'waiting', 'resolving', 'chaos-choice', 'finished'].includes(data.phase);
    section.hidden = !allowed;
    if (!allowed) { document.getElementById('reactionFeed').textContent = ''; return; }
    const reviewId = review.turnId ?? review.id;
    const context = `${gameCode}:${data.matchId}:${reviewId}:${onlineClient.actor.connectionId}`;
    const initial = reactionContext !== context;
    if (initial) { reactionContext = context; seenReactions.clear(); }
    const now = onlineClient.serverNow();
    const entries = Object.entries(data.reactions || {});
    const feed = [];
    for (const [playerId, reaction] of entries) {
        const key = `${playerId}:${reaction.at}`;
        if (initial) seenReactions.add(key); // Restoring a snapshot never replays reactions.
        const member = OnlineState.members(data).find(player => player.playerId === playerId);
        if (!seenReactions.has(key) && member && reaction.reviewId === reviewId && now >= reaction.at
            && now - reaction.at < Experience.REACTION_TTL_MS && Object.hasOwn(Experience.REACTIONS, reaction.reaction)) {
            feed.push(`${Experience.REACTIONS[reaction.reaction]} ${member.playerName}`);
        }
    }
    const node = document.getElementById('reactionFeed');
    const text = feed.slice(-4).join(' · '); if (node.textContent !== text) node.textContent = text;
    const recent = data.reactions?.[onlineClient.actor.playerId];
    document.querySelectorAll('[data-reaction]').forEach(button => {
        button.disabled = onlineClient.busy || onlineClient.registering || Boolean(recent && now - recent.at < 1800);
    });
}

function initializeExperience() {
    screenAwake = createScreenAwake(globalThis.navigator, document);
    document.getElementById('shareResultButton').addEventListener('click', () => { void shareResultCard(); });
    document.getElementById('shareLobbyButton').addEventListener('click', () => { void shareLobbyInvite(); });
    document.querySelectorAll('[data-reaction]').forEach(button => button.addEventListener('click', () => {
        const data = onlineClient?.snapshot;
        if (!data) return;
        const review = ['resolving', 'chaos-choice'].includes(data.phase) ? data.turn : data.roundReview;
        if (review) void sendOnlineCommand({ type: 'react', reviewId: review.turnId ?? review.id, reaction: button.dataset.reaction });
    }));
}

function initializeAiPacks() {
    document.getElementById('savePackButton').addEventListener('click', saveCurrentPack);
    document.getElementById('addAiTopic').addEventListener('click', addAiTopic);
    document.getElementById('undoAiPack').addEventListener('click', undoAiReplacement);
    document.getElementById('aiModal').addEventListener('show.bs.modal', renderSavedPacks);
    window.addEventListener('storage', event => { if (event.key === PackLibrary.SAVED_PACKS_KEY) renderSavedPacks(); });
    renderSavedPacks(); renderAiTopics();
}

function readAiTopics() {
    return AiPacks.normalizeTopics([...aiTopics, document.getElementById('topic').value], { allowEmpty: true });
}

function addAiTopic() {
    if (document.getElementById('btnGenerate').disabled) return;
    try {
        const topics = readAiTopics();
        if (!document.getElementById('topic').value.trim()) return;
        if (topics.length === aiTopics.length) { setAiFeedback('That topic is already in your mix.', true); return; }
        aiTopics = topics; document.getElementById('topic').value = '';
        setAiFeedback(''); renderAiTopics(); document.getElementById('topic').focus?.();
    } catch (error) { setAiFeedback(error.message === 'too-many-ai-topics' ? 'Use up to five topics. Remove one to add another.' : 'Use a topic of 240 characters or fewer.', true); }
}

function renderAiTopics() {
    const list = document.getElementById('aiTopics'); list.innerHTML = '';
    const busy = document.getElementById('btnGenerate').disabled;
    aiTopics.forEach((topic, index) => {
        const chip = document.createElement('li'), text = document.createElement('span'), remove = document.createElement('button');
        text.textContent = topic; remove.type = 'button'; remove.textContent = '×'; remove.disabled = busy;
        remove.setAttribute('aria-label', `Remove topic: ${topic}`);
        remove.addEventListener('click', () => {
            if (document.getElementById('btnGenerate').disabled) return;
            aiTopics.splice(index, 1); renderAiTopics(); document.getElementById('topic').focus?.();
        });
        chip.appendChild(text); chip.appendChild(remove); list.appendChild(chip);
    });
    list.hidden = !aiTopics.length;
    document.getElementById('topic').disabled = busy || aiTopics.length === AiPacks.TOPIC_LIMIT;
    document.getElementById('addAiTopic').disabled = busy || aiTopics.length === AiPacks.TOPIC_LIMIT;
    document.getElementById('aiTopicCount').textContent = aiTopics.length ? `${aiTopics.length} of 5 topics` : '';
}

function captureAiPack() {
    return { text: document.getElementById('aiWords').value, entries: aiGeneratedEntries.map(entry => ({ ...entry })),
        topics: [...aiTopics], input: document.getElementById('topic').value,
        strict: Boolean(document.getElementById('strictAiTopic').checked), difficulty: getSanitizedSettingsFromInputs().difficulty,
        name: document.getElementById('savedPackName').value, visible: Boolean(document.getElementById('showAIWords').checked) };
}

function rememberAiReplacement() {
    const previous = captureAiPack(); aiUndoPack = AiPacks.parseManualWords(previous.text).length ? previous : null;
}

function undoAiReplacement() {
    if (!aiUndoPack || document.getElementById('btnGenerate').disabled) return;
    const pack = aiUndoPack; aiUndoPack = null;
    aiGeneratedEntries = pack.entries; aiTopics = pack.topics;
    document.getElementById('aiWords').value = pack.text;
    document.getElementById('topic').value = pack.input;
    document.getElementById('strictAiTopic').checked = pack.strict;
    document.getElementById('difficulty').value = pack.difficulty;
    document.getElementById('savedPackName').value = pack.name;
    document.getElementById('showAIWords').checked = pack.visible;
    document.getElementById('showAIWords').setAttribute('aria-expanded', String(pack.visible));
    document.getElementById('aiWords').hidden = !pack.visible;
    packLibraryMessage(''); setAiFeedback('Previous pack restored.'); syncAiPack(); updateSetupSummary();
}

function packLibraryMessage(text) {
    const node = document.getElementById('packLibraryStatus'); node.textContent = text; node.hidden = !text;
}

function renderSavedPacks() {
    const list = document.getElementById('savedPacksList'); list.innerHTML = '';
    const packs = PackLibrary.readPacks({ getItem: key => localStorage.getItem(key) });
    document.getElementById('savedPackCount').textContent = `(${packs.length})`;
    if (!packs.length) { const empty = document.createElement('p'); empty.className = 'dialog-help'; empty.textContent = 'Save a favourite pack to find it here.'; list.appendChild(empty); }
    for (const pack of packs) {
        const row = document.createElement('div'); row.className = 'saved-pack';
        const label = document.createElement('span'); label.textContent = `${pack.name} · ${pack.entries.length} words`;
        const load = document.createElement('button'); load.type = 'button'; load.className = 'btn btn-outline-success'; load.textContent = 'Load';
        load.disabled = document.getElementById('btnGenerate').disabled;
        load.addEventListener('click', () => {
            if (document.getElementById('btnGenerate').disabled) return;
            rememberAiReplacement(); aiGeneratedEntries = pack.entries.map(entry => ({ ...entry }));
            document.getElementById('aiWords').value = pack.entries.map(entry => entry.word).join('\n');
            aiTopics = [...pack.topics]; document.getElementById('topic').value = '';
            document.getElementById('strictAiTopic').checked = pack.strict;
            document.getElementById('difficulty').value = pack.difficulty;
            document.getElementById('savedPackName').value = pack.name;
            document.getElementById('showAIWords').checked = false;
            document.getElementById('showAIWords').setAttribute('aria-expanded', 'false');
            document.getElementById('aiWords').hidden = true;
            setAiFeedback(''); syncAiPack(); updateSetupSummary(); packLibraryMessage(`Loaded ${pack.name}. Answers stay hidden.`);
        });
        const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'btn btn-link'; remove.textContent = 'Delete';
        remove.setAttribute('aria-label', `Delete ${pack.name}`);
        remove.addEventListener('click', () => {
            try { PackLibrary.deletePack(localStorage, pack.id); renderSavedPacks(); packLibraryMessage(`Deleted ${pack.name}.`); }
            catch { packLibraryMessage('Unable to delete this pack. Browser storage is unavailable.'); }
        });
        row.appendChild(label); row.appendChild(load); row.appendChild(remove); list.appendChild(row);
    }
}

function saveCurrentPack() {
    if (document.getElementById('btnGenerate').disabled) return;
    try {
        PackLibrary.savePack(localStorage, { id: crypto.randomUUID(), name: document.getElementById('savedPackName').value,
            topics: readAiTopics(), strict: Boolean(document.getElementById('strictAiTopic').checked),
            difficulty: getSanitizedSettingsFromInputs().difficulty, entries: getAiWordObjects() });
        renderSavedPacks(); packLibraryMessage('Pack saved on this browser.');
    } catch (error) { packLibraryMessage(['Name this pack first.', 'Your library is full. Delete a saved pack before adding another.'].includes(error.message) ? error.message : 'Unable to save. Use up to five topics and 1–150 valid answers, and allow browser storage.'); }
}

function initializeInvitation() {
    const code = Experience.inviteCode(globalThis.location?.href);
    if (!code) return false;
    txtGameCode.value = code;
    const saved = readOnlineSession(); if (saved?.playerName) txtPlayerName.value = saved.playerName;
    getModalInstance('onlineModal')?.show();
    return true;
}

async function shareLobbyInvite() {
    if (!isOnlineGame || !onlineClient?.connected) return;
    const status = document.getElementById('inviteStatus'), field = document.getElementById('inviteLinkField');
    try {
        const url = Experience.inviteLink(location.href, gameCode);
        field.value = url;
        if (navigator.share) { await navigator.share({ title: 'Join Half A Minute', text: `Join our lobby: ${gameCode}`, url }); status.textContent = 'Invitation shared.'; }
        else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); status.textContent = 'Invite link copied.'; }
        else { field.hidden = false; field.focus(); field.select(); status.textContent = 'Copy this invite link.'; }
    } catch (error) {
        if (error.name !== 'AbortError') { field.hidden = !field.value; field.focus?.(); field.select?.(); status.textContent = 'Copy the link below, or share the four-letter code.'; }
    }
}

async function shareResultCard() {
    if (resultShareBusy || document.getElementById('matchResults').hidden) return;
    resultShareBusy = true;
    const status = document.getElementById('shareResultStatus'); status.hidden = false; status.textContent = 'Preparing your result card…';
    try {
        const canvas = document.createElement('canvas'); canvas.width = 900; canvas.height = 460 + teams.length * 88;
        const context = canvas.getContext('2d');
        context.fillStyle = '#f3f5f8'; context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#ffffff'; context.fillRect(32, 32, 836, canvas.height - 64);
        context.textAlign = 'center'; context.fillStyle = '#172033'; context.font = 'bold 38px Arial'; context.fillText('Half A Minute', 450, 102);
        context.font = 'bold 46px Arial'; context.fillText(document.getElementById('resultsTitle').textContent, 450, 180);
        context.font = '24px Arial'; context.fillStyle = '#64748b'; context.fillText(document.getElementById('resultsContext').textContent, 450, 228);
        teams.map((team, index) => ({ ...team, index })).sort((a, b) => b.points - a.points || a.index - b.index).forEach((team, position) => {
            const y = 300 + position * 88;
            context.fillStyle = getTeamColor(team.index); context.beginPath(); context.arc(115, y - 10, 14, 0, Math.PI * 2); context.fill();
            context.fillStyle = '#172033'; context.textAlign = 'left'; context.font = 'bold 30px Arial'; context.fillText(`Team ${team.index + 1}`, 150, y);
            context.textAlign = 'right'; context.fillText(`${team.points} pts`, 790, y);
        });
        context.textAlign = 'center'; context.fillStyle = '#475569'; context.font = '23px Arial';
        context.fillText(document.getElementById('resultsHighlights').textContent, 450, canvas.height - 124, 780);
        context.font = '20px Arial'; context.fillText('Describe. Guess. Play again.', 450, canvas.height - 70);
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png')); if (!blob) throw new Error('image-unavailable');
        const file = new File([blob], 'half-a-minute-result.png', { type: 'image/png' });
        if (navigator.canShare?.({ files: [file] }) && navigator.share) {
            try { await navigator.share({ title: 'Half A Minute results', files: [file] }); status.textContent = 'Result card shared.'; return; }
            catch (error) { if (error.name === 'AbortError') { status.textContent = ''; return; } }
        }
        const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = file.name; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000); status.textContent = 'Result card downloaded.';
    } catch (error) { status.textContent = error.name === 'AbortError' ? '' : 'Unable to create the card. You can still download the match summary.'; }
    finally { resultShareBusy = false; status.hidden = !status.textContent; }
}

const RECENT_WORDS_STORAGE_KEY = "half_a_minute_recent_words_v1";
const MAX_RECENT_WORDS = 600;
const LOBBY_EXPIRY_MS = 12 * 60 * 60 * 1000;
let lastProcessedAuditEventId = 0;

const registeredModalHandlers = new Set();
const registeredModalFocusHandlers = new Set();

const CHAOS_POWERUP_TYPES = {
    plus1: {
        label: "+1",
        legendLabel: "+1 Boost",
        description: "Move forward 1 extra tile.",
        weight: 34,
        cssClass: "powerup-plus"
    },
    plus2: {
        label: "+2",
        legendLabel: "+2 Boost",
        description: "Rare boost: move forward 2 extra tiles.",
        weight: 7,
        cssClass: "powerup-plus-rare"
    },
    minus1: {
        label: "-1",
        legendLabel: "-1 Slip",
        description: "Move back 1 tile unless shielded.",
        weight: 28,
        cssClass: "powerup-minus"
    },
    minus2: {
        label: "-2",
        legendLabel: "-2 Slip",
        description: "Rare setback: move back 2 tiles unless shielded.",
        weight: 5,
        cssClass: "powerup-minus-rare"
    },
    bomb: {
        label: "💣",
        legendLabel: "💣 Bomb",
        description: "Lose up to 3 points unless shielded.",
        weight: 2,
        cssClass: "powerup-bomb"
    },
    shield: {
        label: "🛡️",
        legendLabel: "🛡️ Shield",
        description: "Store 1 shield to block your next negative effect.",
        weight: 14,
        cssClass: "powerup-shield"
    },
    steal1: {
        label: "🥷",
        legendLabel: "🥷 Steal 1",
        description: "Gain +1 and the leading opposing team loses 1.",
        weight: 10,
        cssClass: "powerup-steal"
    }
};

// DOM elements
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const btnSettings = document.getElementById("settings");
const btnAI = document.getElementById("ai");
const btnOnline = document.getElementById("online");
const btnRules = document.getElementById("rules");
const btnHistory = document.getElementById("history");
const txtWords = document.getElementById("txtWords");
const txtSeconds = document.getElementById("txtSeconds");
const categoriesSelect = document.getElementById("categoriesSelect");
const themesSelect = document.getElementById("themesSelect");
const chkChaos = document.getElementById("chkChaos");
const chkTraining = document.getElementById("chkTraining");
const btnStartRound = document.getElementById("startRoundButton");
const btnNextRound = document.getElementById("nextRoundButton");
const btnEndRound = document.getElementById("endRoundButton");
const btnEndGame = document.getElementById("endGameButton");
const btnAnswers = document.getElementById("scoreInput");
const timer = document.getElementById("timer");
const lblAnswers = document.getElementById("answers");
const currentWordsContainer = document.getElementById("currentWords");
const txtPlayerName = document.getElementById("playerName");
const txtGameCode = document.getElementById('joinLobbyCode');
const txtLobbyMenu = document.getElementById('lobbyMenu');
const txtLobbyPlayers = document.getElementById('lobbyPlayers');
const txtTeams = document.getElementById("numTeams");
const btnStartOnlineGame = document.getElementById("startOnlineGame");
const lblGameState = document.getElementById("gameState");
const chaosModeBanner = document.getElementById("chaosModeBanner");
const chaosLegend = document.getElementById("chaosLegend");

// Audio elements
const startSound = document.getElementById('startSound');
const countdownSound = document.getElementById('countdownSound');
const tickSound = document.getElementById('tickSound');
const warningSound = document.getElementById('warningSound');
const endSound = document.getElementById('endSound');
const endSoundAlt = document.getElementById('endSoundAlt');

function randomSeed() { return crypto.getRandomValues(new Uint32Array(1))[0]; }

function stopRoundSounds() {
    setRoundCountdown(0);
    [startSound, countdownSound, tickSound, warningSound].forEach(audio => { try { audio.pause(); audio.currentTime = 0; } catch { /* Optional. */ } });
    tickSound.loop = false;
}

function syncTickSound(remaining, active) {
    try {
        if (!active || remaining <= 5 || preferences.muted || preferences.volume === 0) {
            if (!tickSound.paused) tickSound.pause();
            return;
        }
        tickSound.loop = true;
        tickSound.muted = false;
        tickSound.volume = preferences.volume;
        if (tickSound.paused) tickSound.play()?.catch?.(() => {});
    } catch { /* Audio failure never blocks the timer. */ }
}

function exportMatchSummary() {
    const data = isOnlineGame ? onlineClient?.snapshot : null;
    const events = data ? Object.values(data.auditEvents || {}) : localAudit;
    const summary = { version: 1, matchId: data?.matchId || localMatchId, starterTeam: data?.starterTeam ?? localStarter,
        settings: { mode: activeMode, teams: teams.length, pointsToWin, winRule, numWords, numSeconds, difficulty, chaosMode: isChaosMode },
        scores: teams.map(team => team.points), turns: events.map(event => ({ team: event.teamIndex, earned: event.earned ?? event.correctAnswers?.length ?? 0,
            pointsBefore: event.pointsBefore, pointsAfter: event.pointsAfter, clueSeconds: event.clueSeconds,
            scoringSeconds: event.scoringSeconds, resolutionSeconds: event.resolutionSeconds, effect: event.chaosSummary || 'No effect', ...(event.stakes ? { stakes: event.stakes } : {}) })) };
    const url = URL.createObjectURL(new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = `half-a-minute-match-${summary.matchId}.json`;
    link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function reducedMotion() {
    return preferences.motion === 'reduced' || (preferences.motion === 'system'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

function initializePlayPreferences() {
    try {
        const saved = JSON.parse(localStorage.getItem('half_a_minute_preferences') || '{}');
        preferences = { muted: saved.muted === true, volume: Math.max(0, Math.min(1, Number.isFinite(saved.volume) ? saved.volume : 0.6)),
            motion: ['system', 'reduced', 'full'].includes(saved.motion) ? saved.motion : 'system' };
    } catch { /* Storage is optional. */ }
    const muted = document.getElementById('soundMuted'), volume = document.getElementById('soundVolume'), motion = document.getElementById('motionPreference');
    muted.checked = preferences.muted; volume.value = String(preferences.volume * 100); motion.value = preferences.motion;
    const apply = () => {
        document.body.classList.toggle('reduced-motion', reducedMotion());
        document.body.classList.toggle('full-motion', preferences.motion === 'full');
        [startSound, countdownSound, tickSound, warningSound, endSound, endSoundAlt].forEach(audio => {
            audio.muted = preferences.muted; audio.volume = preferences.volume;
            if (preferences.muted) audio.pause();
        });
    };
    [muted, volume, motion].forEach(input => input.addEventListener('input', () => {
        preferences = { muted: muted.checked, volume: Number(volume.value) / 100, motion: motion.value };
        try { localStorage.setItem('half_a_minute_preferences', JSON.stringify(preferences)); } catch { /* Optional. */ }
        apply();
    }));
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', apply);
    apply();
}

function initializeQuickSetup() {
    const mode = document.getElementById('quickMode'), preset = document.getElementById('quickPreset');
    mode.addEventListener('change', () => { chkChaos.checked = mode.value === 'chaos'; updateSetupSummary(); });
    chkChaos.addEventListener('change', () => { mode.value = chkChaos.checked ? 'chaos' : 'classic'; updateSetupSummary(); });
    ['tableCycles', 'tableTiming', 'tableSeconds', 'tableScoring', 'caseId', 'caseTurns'].forEach(id => document.getElementById(id).addEventListener('change', updateSetupSummary));
    document.getElementById('localPlayerNames').addEventListener('input', () => { document.getElementById('localNamesError').hidden = true; document.getElementById('localPlayerNames').setAttribute('aria-invalid', 'false'); });
    preset.addEventListener('change', () => {
        const values = Gameplay.PRESETS[preset.value];
        if (!values) return;
        document.getElementById('pointsToWin').value = String(values.pointsToWin);
        txtSeconds.value = String(values.numSeconds); txtWords.value = String(values.numWords);
        updateSetupSummary();
    });
    document.getElementById('settingsModal').addEventListener('input', updateSetupSummary);
    document.getElementById('settingsModal').addEventListener('change', updateSetupSummary);
    txtTeams.addEventListener('input', updateSetupSummary);
    updateSetupSummary();
}

function updateSetupSummary() {
    const settings = getSanitizedSettingsFromInputs();
    syncThemePicker();
    modeSettingsPresentation(settings);
    const pack = settings.selectedTheme !== 'None' ? settings.selectedTheme : settings.selectedCategories.join(', ') || 'All categories';
    const text = Modes.isParty(settings) ? `${Modes.MODES[settings.mode].name} · ${settings.mode === 'table' ? settings.tableCycles + ' speaking turns each · ' + (settings.tableTiming === 'unlimited' ? 'Unlimited' : settings.tableSeconds + 's') + ' · ' + settings.numWords + ' words' : settings.caseTurns + ' turns · ' + settings.numSeconds + 's · ' + settings.numWords + ' words'} · ${settings.difficulty} · ${pack}`
        : `${Modes.MODES[settings.mode].name} · ${settings.numTeams} teams · ${settings.pointsToWin} points · ${Gameplay.winRuleLabel(settings.winRule)} · ${settings.numSeconds}s · ${settings.numWords} words · ${settings.difficulty} · ${pack}${settings.trainingMode ? ' · Training hints' : ''}${settings.chaosMode && settings.chaosReroll ? ' · Team reroll' : ''}`;
    document.getElementById('setupSummary').textContent = text;
    document.getElementById('advancedSetupSummary').textContent = text;
    document.getElementById('quickMode').value = settings.mode;
    document.getElementById('quickPreset').disabled = Modes.isParty(settings);
    const preset = Object.entries(Gameplay.PRESETS).find(([, p]) => p.pointsToWin === settings.pointsToWin && p.numSeconds === settings.numSeconds && p.numWords === settings.numWords);
    const select = document.getElementById('quickPreset');
    if (!select.querySelector?.('option[value="custom"]')) {
        const option = document.createElement('option'); option.value = 'custom'; option.textContent = 'Custom'; select.appendChild(option);
    }
    select.value = preset?.[0] || 'custom';
}

function initializeCategoryPicker() {
    const list = document.getElementById('categoryChoices');
    const sync = () => list.querySelectorAll('input').forEach((input, index) => { input.checked = categoriesSelect.options[index].selected; });
    Array.from(categoriesSelect.options).forEach((option, index) => {
        const label = document.createElement('label'), input = document.createElement('input'), text = document.createElement('span');
        input.type = 'checkbox'; input.value = option.value; text.textContent = option.textContent;
        input.addEventListener('change', () => {
            categoriesSelect.options[index].selected = input.checked; themesSelect.value = 'None'; updateSetupSummary();
        });
        label.appendChild(input); label.appendChild(text); list.appendChild(label);
    });
    document.getElementById('categorySearch').addEventListener('input', event => {
        const search = event.target.value.trim().toLowerCase();
        list.querySelectorAll('label').forEach(label => { label.hidden = !label.textContent.toLowerCase().includes(search); });
    });
    themesSelect.addEventListener('change', () => chooseTheme(themesSelect.value));
    document.getElementById('selectThemeBtn').addEventListener('click', () => {
        Array.from(categoriesSelect.options).forEach(option => { option.selected = false; }); sync();
    });
}

function syncThemePicker() {
    document.getElementById('themeChoices').querySelectorAll('input').forEach(input => {
        input.checked = input.value === themesSelect.value;
    });
}

function chooseTheme(value) {
    themesSelect.value = value;
    Array.from(categoriesSelect.options).forEach(option => { option.selected = false; });
    document.getElementById('categoryChoices').querySelectorAll('input').forEach(input => { input.checked = false; });
    updateSetupSummary();
}

function initializeThemePicker() {
    const list = document.getElementById('themeChoices'), rows = [];
    Array.from(themesSelect.options).forEach(option => {
        const label = document.createElement('label'), input = document.createElement('input'), text = document.createElement('span');
        input.type = 'radio'; input.name = 'word-theme'; input.value = option.value;
        input.checked = option.value === themesSelect.value;
        text.textContent = option.value === 'None' ? 'All categories (no theme)' : option.textContent;
        input.addEventListener('input', () => {
            if (!input.checked) return;
            chooseTheme(input.value);
        });
        label.appendChild(input); label.appendChild(text); list.appendChild(label);
        rows.push({ label, text: text.textContent.toLowerCase() });
    });
    document.getElementById('themeSearch').addEventListener('input', event => {
        const search = event.target.value.trim().toLowerCase();
        rows.forEach(row => { row.label.hidden = !row.text.includes(search); });
        document.getElementById('themeEmpty').hidden = rows.some(row => !row.label.hidden);
    });
}

function updateSelectionSummary() {
    const count = getSelectedCorrectAnswers().length;
    const summary = document.getElementById('selectionSummary');
    const selecting = !btnAnswers.hidden && !isRoundActive && !isResolvingChaosMove;
    summary.hidden = !selecting;
    summary.textContent = `${count} of ${numWords} correct · +${count} earned`;
    if (Modes.isStakes({ mode: activeMode })) {
        const data = isOnlineGame ? onlineClient?.snapshot : null, index = data?.turn?.teamIndex ?? currentTeam - 1;
        const result = Modes.stakesScore({ mode: activeMode }, teams[index]?.points || 0, count, data?.turn?.words?.length || localTurnCardSize, data?.turn?.risky ?? localTurnRisky);
        summary.textContent = `${count} selected · ${result.message}`;
    }
    if (!btnNextRound.hidden && !btnNextRound.disabled) btnNextRound.textContent = `Confirm ${count} correct`;
}

function showRecap(text) {
    const node = document.getElementById('turnRecap');
    if (node.textContent !== text) node.textContent = text;
    node.hidden = !text;
}

function renderMatchResults(data = null, forced = false) {
    const finished = forced || (data ? data.phase === 'finished' : localMatchFinished);
    const card = document.getElementById('matchResults'); card.hidden = !finished;
    game.classList.toggle('match-finished', finished);
    if (!finished) return;
    screenAwake?.setActive(false);
    document.getElementById('roundHighlight').hidden = true;
    const active = !data || (onlineClient.connected && OnlineState.view(data, onlineClient.actor, onlineClient.serverNow()).active);
    const host = !data || data.hostId === onlineClient.actor.playerId;
    const signature = JSON.stringify([data?.matchId || localMatchId, data?.hostId, teams.map(team => team.points),
        data?.auditEvents || localAudit, data?.series || localSeries, active, host, onlineClient?.connected, onlineClient?.busy, onlineClient?.actor?.connectionId]);
    if (card.dataset.signature === signature) return;
    card.dataset.signature = signature;
    document.getElementById('currentTeamIndicator').hidden = true;
    document.getElementById('roleInstruction').classList.remove('turn-handoff');
    document.getElementById('roleInstruction').textContent = 'Match complete. Compare scores or play again.';
    const events = data ? Object.values(data.auditEvents || {}) : localAudit;
    const naturalFinish = data ? ['winner', 'draw'].includes(data.finishReason) : localMatchFinished && !forced;
    const winners = naturalFinish ? Gameplay.scoreLeaders(teams.map(team => team.points)) : [];
    if (!data && localSeries && naturalFinish) localSeries = Experience.recordSeries(localSeries, localMatchId, winners);
    const series = document.getElementById('seriesSummary');
    series.textContent = Experience.seriesLabel(data ? data.series : localSeries); series.hidden = !series.textContent;
    document.getElementById('resultsTitle').textContent = winners.length > 1 ? "It's a draw!"
        : winners.length === 1 ? `Team ${winners[0] + 1} wins!` : 'Match ended';
    document.getElementById('resultsContext').textContent = `${Modes.MODES[isChaosMode ? 'chaos' : activeMode].name} · Target ${pointsToWin} · ${Gameplay.winRuleLabel(winRule)}`;
    document.getElementById('finalRoundNotice').hidden = true;
    const scores = document.getElementById('resultsScores'); scores.innerHTML = '';
    teams.map((team, index) => ({ team, index })).sort((a, b) => b.team.points - a.team.points || a.index - b.index).forEach(({ team, index }) => {
        const earned = events.filter(event => event.teamIndex === index).reduce((sum, event) => sum + (event.earned ?? event.correctAnswers?.length ?? 0), 0);
        const row = document.createElement('li'); row.className = `result-score${winners.includes(index) ? ' is-winner' : ''}`;
        const identity = document.createElement('div');
        const name = document.createElement('span'); name.className = 'result-team';
        const token = document.createElement('span'); token.className = 'team-token'; token.style.backgroundColor = getTeamColor(index);
        token.textContent = String(index + 1); token.setAttribute('aria-hidden', 'true'); name.appendChild(token);
        const label = document.createElement('span'); label.textContent = `Team ${index + 1}`; name.appendChild(label); identity.appendChild(name);
        if ((isChaosMode || Modes.isStakes({ mode: activeMode })) && team.points !== earned) {
            const detail = document.createElement('small'); detail.className = 'result-breakdown';
            const chaos = team.points - earned;
            detail.textContent = `${earned} from clues · ${chaos >= 0 ? '+' : ''}${chaos} from ${isChaosMode ? 'Chaos' : 'stakes'}`; identity.appendChild(detail);
        }
        const points = document.createElement('strong'); points.className = 'result-points'; points.textContent = `${team.points} `;
        const unit = document.createElement('small'); unit.textContent = 'pts'; points.appendChild(unit);
        row.appendChild(identity); row.appendChild(points);
        scores.appendChild(row);
    });
    const best = [...events].sort((a, b) => (b.earned ?? b.correctAnswers?.length ?? 0) - (a.earned ?? a.correctAnswers?.length ?? 0))[0];
    const bestCount = best?.earned ?? best?.correctAnswers?.length ?? 0;
    const highlight = document.getElementById('resultsHighlights'); highlight.hidden = !bestCount;
    highlight.textContent = bestCount ? `Best round: Team ${best.teamIndex + 1} guessed ${bestCount} ${bestCount === 1 ? 'word' : 'words'}.` : '';
    btnStartRound.hidden = btnNextRound.hidden = btnEndRound.hidden = btnEndGame.hidden = true;
    btnAnswers.hidden = timer.hidden = true;
    clearTrainingHints(); isRoundActive = false; updateMobileGameFocus();
    const rematch = document.getElementById('rematchButton'); rematch.hidden = !host; rematch.disabled = !active || Boolean(onlineClient?.busy);
    document.getElementById('rematchStatus').textContent = host ? 'Same settings. A different team starts.' : 'Waiting for the host to play again.';
    document.getElementById('changeSettingsButton').textContent = data ? 'Leave lobby' : 'New game';
}

async function returnToSetup() {
    if (isReturningToSetup) return;
    isReturningToSetup = true;
    game.inert = document.getElementById('partyGame').inert = true;
    try {
        if (isOnlineGame) {
            try { await onlineClient.close(true); } catch { alert('Unable to leave yet. Check your connection and retry.'); return; }
            saveOnlineSession(null); onlineClient = null; isOnlineGame = false; gameCode = '';
        }
        clearInterval(partyTick); partyTick = null; localPartyGame = null; localPartySeat = ''; localPartyTurnKey = ''; partyLastPhase = ''; partyWarningCue = '';
        document.getElementById('partyGame').hidden = true; partySurface?.reset();
        document.getElementById('partyAnnouncement').textContent = '';
        clearInterval(countdownTimer); finishLocalRound = null; stopRoundSounds(); clearChaosPresentation();
        renderOnlineRoundReview(null);
        hideElement(game); showElement(menu); showElement(btnSettings); showElement(btnOnline); showElement(btnAI); showElement(btnRules); hideElement(btnHistory);
        showElement(txtLobbyMenu); hideElement(txtLobbyPlayers);
        isAiGame = false; localStarter = null; localDeck = {}; setLayoutMode('menu'); updateSetupSummary();
        updateLobbyPresentation();
        screenAwake?.setActive(false); localSeries = null;
        document.getElementById('roundHighlight').hidden = document.getElementById('roundReactions').hidden = document.getElementById('lobbyInvite').hidden = true;
        document.getElementById('roleInstruction').classList.remove('turn-handoff');
    } finally { isReturningToSetup = false; game.inert = document.getElementById('partyGame').inert = false; }
}

function chooseChaos(reroll) {
    if (isOnlineGame) { void sendOnlineCommand({ type: reroll ? 'reroll-chaos' : 'keep-chaos' }); return; }
    localChoice?.(reroll);
}

function offerLocalChaosChoice(type) {
    document.getElementById('chaosChoiceText').textContent = `${CHAOS_POWERUP_TYPES[type].legendLabel}. Keep it or use your team's only reroll. Auto-keep in 5 seconds.`;
    document.getElementById('chaosChoice').hidden = false;
    document.getElementById('keepChaosButton').disabled = document.getElementById('rerollChaosButton').disabled = false;
    return new Promise(resolve => {
        const timeout = setTimeout(() => localChoice?.(false), 5000);
        localChoice = reroll => {
            clearTimeout(timeout); localChoice = null; document.getElementById('chaosChoice').hidden = true; resolve(reroll);
        };
    });
}

// CDN module imports can finish after DOMContentLoaded has already fired.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenu, { once: true });
} else {
    initializeMenu();
}

function setLayoutMode(mode = "menu") {
    document.body.classList.remove("layout-menu", "layout-game");
    document.body.classList.add(mode === "game" ? "layout-game" : "layout-menu");
    updateMobileGameFocus();
}

function initializeMenu() {
    initializeExperience();
    initializeAiPacks();
    initializePlayPreferences();
    initializeQuickSetup();
    document.getElementById('riskRoundButton').addEventListener('click', () => { startRound({ risky: true }); });
    setLayoutMode("menu");
    refreshChaosModeUi();
    window.addEventListener("resize", updateMobileGameFocus);
    // Add categories to dropdown
    Object.keys(categories).forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoriesSelect.appendChild(option);
    });

    // Add themes to dropdown
    Object.keys(themes).forEach(theme => {
        const option = document.createElement("option");
        option.value = theme;
        option.textContent = theme;
        themesSelect.appendChild(option);
    });
    initializeCategoryPicker();
    initializeThemePicker();

    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
      input.addEventListener('keyup', (event) => enforceMinMax(event.target));
    });

    // Show categories dropdown
    document.getElementById("selectCategoriesBtn").addEventListener("click", () => {
        themesSelect.value = 'None'; updateSetupSummary();
        document.getElementById("categoriesSection").style.display = 'block';
        document.getElementById("themesSection").style.display = 'none';
        document.getElementById('selectCategoriesBtn').setAttribute('aria-expanded', 'true');
        document.getElementById('selectThemeBtn').setAttribute('aria-expanded', 'false');
    });

    // Show themes dropdown
    document.getElementById("selectThemeBtn").addEventListener("click", () => {
        Array.from(categoriesSelect.options).forEach(option => { option.selected = false; }); updateSetupSummary();
        document.getElementById("categoriesSection").style.display = 'none';
        document.getElementById("themesSection").style.display = 'block';
        document.getElementById('selectCategoriesBtn').setAttribute('aria-expanded', 'false');
        document.getElementById('selectThemeBtn').setAttribute('aria-expanded', 'true');
        document.getElementById('themesSection').scrollIntoView?.({ block: 'nearest' });
    });

    document.getElementById("showAIWords").addEventListener("change", function () {
        const show = Boolean(document.getElementById('showAIWords').checked);
        document.getElementById('aiWords').hidden = !show;
        document.getElementById('showAIWords').setAttribute('aria-expanded', String(show));
    });
    document.getElementById('aiWords').addEventListener('input', () => { syncAiPack(); document.getElementById('aiFeedback').hidden = true; });
    document.getElementById('topic').addEventListener('input', () => { document.getElementById('aiFeedback').hidden = true; });
    document.getElementById('strictAiTopic').addEventListener('change', () => { document.getElementById('aiFeedback').hidden = true; });
    document.getElementById('topic').addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.isComposing && !document.getElementById('btnGenerate').disabled) { event.preventDefault(); addAiTopic(); }
    });
    document.getElementById('aiModal').addEventListener('show.bs.modal', syncAiPack);
    document.getElementById('onlineModal').addEventListener('show.bs.modal', updateOnlinePackNotice);
    document.getElementById('onlineModal').addEventListener('hidden.bs.modal', () => {
        pendingOnlinePack = null; updateOnlinePackNotice();
    });
    document.getElementById('difficulty').addEventListener('change', syncAiPack);
    syncAiPack();

    txtGameCode.addEventListener("keyup", function (event) {
        event.preventDefault();
        txtGameCode.value = txtGameCode.value.toUpperCase();
    });

    txtPlayerName.addEventListener("keyup", function (event) {
        event.preventDefault();
        const value = txtPlayerName.value;
        if (value.length > 0) {
            // Convert the first character to uppercase and keep the rest unchanged
            txtPlayerName.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
    });

    document.getElementById("createLobbyButton").addEventListener("click", () => {
        if (validateOnlineEntry(false)) void createGameLobby(db);
    });

    document.getElementById("joinLobbyButton").addEventListener("click", () => {
        if (validateOnlineEntry(true)) void joinGameLobby();
    });
    [txtPlayerName, txtGameCode].forEach(input => input.addEventListener('input', () => {
        input.setAttribute('aria-invalid', 'false'); document.getElementById('onlineFormStatus').hidden = true;
    }));

    btnSettings.addEventListener('click', () => {
        const playing = !game.hidden || !document.getElementById('partyGame').hidden;
        document.getElementById('gameSetupSettings').hidden = playing;
        document.getElementById('settingsIntro').textContent = !playing ? 'Make the game feel right for your group.' : 'Adjust sound and motion without interrupting the match.';
    });
    registerModal(btnSettings, "settingsModal");
    registerModal(btnAI, "aiModal");
    registerModal(btnOnline, "onlineModal");
    registerModal(btnRules, "rulesModal");
    registerModal(btnEndGame, 'endMatchModal');
    btnOnline.addEventListener("click", () => {
        void triggerOnlineHealthScan();
    });

    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("startOnlineGame").addEventListener("click", startOnlineGame);
    document.getElementById("startRoundButton").addEventListener("click", startRound);
    document.getElementById("nextRoundButton").addEventListener("click", nextRound);
    document.getElementById('confirmEndGameButton').addEventListener('click', endGame);
    document.getElementById("endRoundButton").addEventListener("click", endRound);
    document.getElementById("btnGenerate").addEventListener("click", generate);
    document.getElementById("btnAiGame").addEventListener("click", startAIGame);
    document.getElementById('btnAiOnline').addEventListener('click', hostAIWordsOnline);
    document.getElementById('leaveOnlineGame').addEventListener('click', leaveLobbyWithTransaction);
    document.getElementById('rejoinOnlineGame').addEventListener('click', () => {
        void onlineClient?.resume(true).catch(error => console.error('Unable to rejoin:', error));
    });
    document.getElementById('keepChaosButton').addEventListener('click', () => chooseChaos(false));
    document.getElementById('rerollChaosButton').addEventListener('click', () => chooseChaos(true));
    document.getElementById('rematchButton').addEventListener('click', () => {
        if (isOnlineGame) void sendOnlineCommand({ type: 'rematch' });
        else void startGame({ rematch: true });
    });
    document.getElementById('changeSettingsButton').addEventListener('click', returnToSetup);
    document.getElementById('exportMatchButton').addEventListener('click', exportMatchSummary);
    if (!initializeInvitation()) void restoreOnlineSession();
}

function doesPlayerExist(teams, playerName) {
    const normalizedTarget = normalizeWord(playerName);
    return teams.some(team =>
        team.players && team.players.some(player => normalizeWord(player.playerName) === normalizedTarget)
    );
}

function normalizeWord(word) {
    return String(word || "").trim().toLowerCase();
}

function sanitizePlayerName(name) {
    return String(name || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 24);
}

function clampInt(value, fallback, min, max) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }

    return Math.min(max, Math.max(min, parsed));
}

function sanitizeSelectedTheme(themeValue) {
    if (typeof themeValue !== "string") {
        return "None";
    }

    if (themeValue === "None") {
        return "None";
    }

    return themes[themeValue] ? themeValue : "None";
}

function sanitizeSelectedCategories(categoryList) {
    if (!Array.isArray(categoryList)) {
        return [];
    }

    const validCategories = new Set(Object.keys(categories));
    const sanitized = [];
    const seen = new Set();

    categoryList.forEach(category => {
        if (typeof category !== "string") {
            return;
        }

        if (!validCategories.has(category) || seen.has(category)) {
            return;
        }

        seen.add(category);
        sanitized.push(category);
    });

    return sanitized;
}

function getSanitizedSettingsFromInputs() {
    const chosenDifficulty = document.getElementById('difficulty').value.toLowerCase();
    const selectedMode = document.getElementById('quickMode').value;
    return Modes.normalizeModeSettings({
        mode: ['boost', 'double', 'table', 'case'].includes(selectedMode) ? selectedMode : chkChaos?.checked ? 'chaos' : 'classic',
        tableCycles: document.getElementById('tableCycles').value,
        tableTiming: document.getElementById('tableTiming').value,
        tableScoring: document.getElementById('tableScoring').value,
        tableSeconds: document.getElementById('tableSeconds').value,
        caseTurns: document.getElementById('caseTurns').value,
        caseId: document.getElementById('caseId').value,
        difficulty: ['easy', 'normal', 'hard'].includes(chosenDifficulty) ? chosenDifficulty : 'normal',
        numTeams: clampInt(txtTeams.value, 2, 2, 4),
        pointsToWin: clampInt(document.getElementById("pointsToWin").value, 20, 10, 60),
        winRule: Gameplay.normalizeWinRule(document.getElementById('winRule').value),
        numWords: clampInt(txtWords.value, 5, 1, 15),
        numSeconds: clampInt(txtSeconds.value, 30, 5, 300),
        chaosMode: Boolean(chkChaos?.checked),
        chaosReroll: Boolean(document.getElementById('chkReroll')?.checked),
        trainingMode: Boolean(chkTraining?.checked),
        trackSeries: Boolean(document.getElementById('chkSeries')?.checked),
        selectedTheme: sanitizeSelectedTheme(themesSelect.value),
        selectedCategories: sanitizeSelectedCategories(Array.from(categoriesSelect.selectedOptions).map(option => option.value))
    });
}

function sanitizeGameSettingsFromDb(settings = {}, teamsLength = 2) {
    const selectedTheme = sanitizeSelectedTheme(settings.selectedTheme || "None");
    const selectedCategories = sanitizeSelectedCategories(settings.selectedCategories);
    const sanitized = {
        mode: Modes.modeOf(settings), tableCycles: settings.tableCycles, tableTiming: settings.tableTiming, tableScoring: settings.tableScoring, tableSeconds: settings.tableSeconds, caseTurns: settings.caseTurns, caseId: settings.caseId,
        difficulty: ["easy", "normal", "hard"].includes((settings.difficulty || "").toLowerCase())
            ? settings.difficulty.toLowerCase()
            : "normal",
        numTeams: clampInt(settings.numTeams, teamsLength || 2, 2, 4),
        pointsToWin: clampInt(settings.pointsToWin, 20, 10, 60),
        winRule: Gameplay.normalizeWinRule(settings.winRule),
        numWords: clampInt(settings.numWords, 5, 1, 15),
        numSeconds: clampInt(settings.numSeconds, 30, 5, 300),
        chaosMode: Boolean(settings.chaosMode),
        chaosReroll: Boolean(settings.chaosReroll),
        trainingMode: Boolean(settings.trainingMode),
        trackSeries: Boolean(settings.trackSeries),
        selectedTheme,
        selectedCategories
    };

    if (sanitized.selectedTheme !== "None" && sanitized.selectedCategories.length > 0) {
        sanitized.selectedCategories = [];
    }

    return Modes.normalizeModeSettings(sanitized);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createSeededRandom(seed) {
    return Gameplay.random(seed);
}

function createInitialTeamShields(teamCount = teams.length || numTeams || 2) {
    return Array.from({ length: Math.max(1, teamCount) }, () => 0);
}

function ensureLocalChaosState(teamCount = teams.length || numTeams || 2) {
    if (!Array.isArray(teamShields) || teamShields.length !== teamCount) {
        const next = createInitialTeamShields(teamCount);
        if (Array.isArray(teamShields)) {
            for (let i = 0; i < Math.min(teamShields.length, teamCount); i++) {
                next[i] = Number(teamShields[i]) > 0 ? 1 : 0;
            }
        }
        teamShields = next;
    } else {
        teamShields = teamShields.map(value => (Number(value) > 0 ? 1 : 0));
    }
}

function renderChaosLegend() {
    if (!chaosLegend) {
        return;
    }

    chaosLegend.innerHTML = "";
    const heading = document.createElement("div");
    heading.className = "chaos-legend-title";
    heading.textContent = "Chaos Powerups";
    chaosLegend.appendChild(heading);

    const list = document.createElement("div");
    list.className = "chaos-legend-list";
    Object.values(CHAOS_POWERUP_TYPES).forEach(powerupConfig => {
        const item = document.createElement("div");
        item.className = "chaos-legend-item";

        const badge = document.createElement("span");
        badge.className = `chaos-legend-badge ${powerupConfig.cssClass}`;
        badge.textContent = powerupConfig.label;

        const details = document.createElement("div");
        details.className = "chaos-legend-details";
        const label = document.createElement("div");
        label.className = "chaos-legend-label";
        label.textContent = powerupConfig.legendLabel || powerupConfig.label;
        const description = document.createElement("div");
        description.className = "chaos-legend-description";
        description.textContent = powerupConfig.description || "";
        details.appendChild(label);
        details.appendChild(description);

        item.appendChild(badge);
        item.appendChild(details);
        list.appendChild(item);
    });
    chaosLegend.appendChild(list);
}

function refreshChaosModeUi() {
    const chaosEnabledInGame = Boolean(isChaosMode) && !game.hidden;
    document.body.classList.toggle("chaos-active", chaosEnabledInGame);

    if (chaosModeBanner) {
        chaosModeBanner.hidden = !chaosEnabledInGame;
    }
    if (chaosLegend) {
        chaosLegend.hidden = !chaosEnabledInGame;
        if (chaosEnabledInGame) {
            renderChaosLegend();
        }
    }
    document.getElementById('chaosHelp').hidden = !chaosEnabledInGame;

    updateMobileGameFocus();
}

function setNextRoundBusyState(isBusy) {
    if (!btnNextRound) {
        return;
    }
    if (!btnNextRound.dataset.defaultLabel) {
        btnNextRound.dataset.defaultLabel = "Next Round";
    }

    btnNextRound.disabled = Boolean(isBusy);
    btnNextRound.textContent = isBusy
        ? "Resolving Chaos..."
        : (btnNextRound.dataset.defaultLabel || "Next Round");
}

function isScoreButtonSelected(button) {
    return Boolean(button?.classList?.contains("score-button-selected"));
}

function setScoreButtonSelected(button, isSelected) {
    if (!button) {
        return;
    }

    button.classList.toggle("score-button-selected", Boolean(isSelected));
    button.setAttribute('aria-pressed', String(Boolean(isSelected)));
    updateSelectionSummary();
}

function isNarrowViewport() {
    return window.matchMedia("(max-width: 768px)").matches;
}

function areWordsInFocusPhase() {
    if (isResolvingChaosMove || (isOnlineGame && ['resolving', 'chaos-choice'].includes(onlineGameState))) return false;
    const hasTrainingHintsVisible = Boolean(currentWordsContainer && !currentWordsContainer.hidden);
    const answersVisible = Boolean(btnAnswers && !btnAnswers.hidden);
    const hasVisibleWordButtons = Array.from(document.getElementsByClassName("scoreButton"))
        .some(button => !button.hidden);
    return hasTrainingHintsVisible || (answersVisible && hasVisibleWordButtons);
}

function updateMobileGameFocus() {
    if (!game) {
        return;
    }
    game.classList.toggle('clue-phase', isRoundActive);
    game.classList.toggle('word-phase', isPreparingRound || areWordsInFocusPhase());

    game.classList.remove("mobile-focus-words", "mobile-focus-board");
    if (game.hidden || !isNarrowViewport()) {
        return;
    }

    if (areWordsInFocusPhase()) {
        game.classList.add("mobile-focus-words");
    } else {
        game.classList.add("mobile-focus-board");
    }
}

function getBoardCellIndexForPoints(pointsValue, boardSize = pointsToWin) {
    const size = Math.max(1, Number(boardSize) || 1);
    const pointsInt = Number(pointsValue) || 0;
    const clamped = Math.max(0, Math.min(pointsInt, size - 1));
    return clamped;
}

function sanitizeChaosPowerupType(value) {
    if (!value || typeof value !== "string") {
        return null;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }

    return CHAOS_POWERUP_TYPES[trimmed] ? trimmed : null;
}

function sanitizeRoundPowerups(powerups = {}, boardSize = pointsToWin) {
    const sanitized = {};
    const lastTileIndex = Math.max(0, boardSize - 1);
    Object.entries(powerups || {}).forEach(([tile, powerupType]) => {
        const tileIndex = Number.parseInt(tile, 10);
        const type = sanitizeChaosPowerupType(powerupType);
        if (!Number.isInteger(tileIndex) || tileIndex <= 0 || tileIndex >= lastTileIndex || !type) {
            return;
        }
        sanitized[tileIndex] = type;
    });
    return sanitized;
}

function sanitizeChaosLandedPreview(landing = null, boardSize = pointsToWin, teamCount = teams.length || numTeams || 2) {
    if (!landing || typeof landing !== "object") {
        return null;
    }

    const tileIndex = Number.parseInt(landing.tileIndex, 10);
    const type = sanitizeChaosPowerupType(landing.type);
    const teamIndex = Number.parseInt(landing.teamIndex, 10);
    const maxTileIndex = Math.max(0, (Math.max(1, Number(boardSize) || 1)) - 1);
    const maxTeamCount = Math.max(1, Number(teamCount) || 1);

    if (!Number.isInteger(tileIndex) || tileIndex < 0 || tileIndex > maxTileIndex || !type) {
        return null;
    }
    if (!Number.isInteger(teamIndex) || teamIndex < 0 || teamIndex >= maxTeamCount) {
        return null;
    }

    return {
        tileIndex,
        type,
        teamIndex
    };
}

function pickWeightedChaosPowerup(rng = Math.random) {
    const entries = Object.entries(CHAOS_POWERUP_TYPES);
    const totalWeight = entries.reduce((sum, [, config]) => sum + config.weight, 0);
    let roll = (rng() * totalWeight);
    for (const [type, config] of entries) {
        roll -= config.weight;
        if (roll <= 0) {
            return type;
        }
    }
    return entries[0]?.[0] || "plus1";
}

function generateRoundPowerupsMap(boardSize = pointsToWin, rng = Math.random) {
    const size = Math.max(2, Number(boardSize) || 2);
    const map = {};
    const lastTileIndex = size - 1;

    for (let tile = 1; tile < lastTileIndex; tile++) {
        if (rng() < 0.60) {
            continue;
        }
        map[tile] = pickWeightedChaosPowerup(rng);
    }

    return map;
}

function normalizeTeamShields(shields = [], teamCount = teams.length || numTeams || 2) {
    const normalized = createInitialTeamShields(teamCount);
    for (let i = 0; i < Math.min(shields.length, teamCount); i++) {
        normalized[i] = Number(shields[i]) > 0 ? 1 : 0;
    }
    return normalized;
}

function getNormalizedChaosState(chaosState = {}, teamCount = teams.length || numTeams || 2, boardSize = pointsToWin) {
    return {
        roundId: Number(chaosState?.roundId) || 0,
        powerups: sanitizeRoundPowerups(chaosState?.powerups || {}, boardSize),
        reveal: Boolean(chaosState?.reveal),
        landed: sanitizeChaosLandedPreview(chaosState?.landed, boardSize, teamCount),
        teamShields: normalizeTeamShields(chaosState?.teamShields || [], teamCount),
        resolutionId: Number(chaosState?.resolutionId) || 0,
        pending: chaosState?.pending && typeof chaosState.pending === "object" ? chaosState.pending : null
    };
}

function getLeadingOpponentIndexes(teamsData = [], actorTeamIndex = 0) {
    let highest = Number.NEGATIVE_INFINITY;
    const leaders = [];

    teamsData.forEach((team, teamIndex) => {
        if (teamIndex === actorTeamIndex) {
            return;
        }

        const points = Number(team?.points) || 0;
        if (points > highest) {
            highest = points;
            leaders.length = 0;
            leaders.push(teamIndex);
        } else if (points === highest) {
            leaders.push(teamIndex);
        }
    });

    return leaders;
}

function applyChaosPowerupToState({
    teamsData = [],
    shields = [],
    actingTeamIndex = 0,
    powerupType = null,
    rng = Math.random
}) {
    const summary = {
        type: powerupType,
        blockedByShield: false,
        consumedShield: false,
        grantedShield: false,
        actorDelta: 0,
        victimTeamIndex: null,
        victimDelta: 0
    };

    const actor = teamsData[actingTeamIndex];
    if (!actor || !powerupType) {
        return summary;
    }

    const hasShield = Number(shields[actingTeamIndex]) > 0;
    const consumeShieldIfAvailable = () => {
        if (hasShield) {
            shields[actingTeamIndex] = 0;
            summary.blockedByShield = true;
            summary.consumedShield = true;
            return true;
        }
        return false;
    };

    const moveActor = (delta) => {
        if (!delta) {
            return;
        }
        const next = Math.max(0, (Number(actor.points) || 0) + delta);
        summary.actorDelta += (next - (Number(actor.points) || 0));
        actor.points = next;
    };

    switch (powerupType) {
        case "plus1":
            moveActor(1);
            break;
        case "plus2":
            moveActor(2);
            break;
        case "minus1":
            if (!consumeShieldIfAvailable()) {
                moveActor(-1);
            }
            break;
        case "minus2":
            if (!consumeShieldIfAvailable()) {
                moveActor(-2);
            }
            break;
        case "bomb":
            if (!consumeShieldIfAvailable()) {
                const currentPoints = Number(actor.points) || 0;
                moveActor(-Math.min(3, currentPoints));
            }
            break;
        case "shield":
            shields[actingTeamIndex] = 1;
            summary.grantedShield = true;
            summary.shieldAlreadyReady = hasShield;
            break;
        case "steal1": {
            moveActor(1);
            const leaders = getLeadingOpponentIndexes(teamsData, actingTeamIndex);
            if (leaders.length > 0) {
                const victimTeamIndex = leaders[Math.floor(rng() * leaders.length)];
                const victim = teamsData[victimTeamIndex];
                const before = Number(victim?.points) || 0;
                const blocked = before > 0 && Number(shields[victimTeamIndex]) > 0;
                if (blocked) shields[victimTeamIndex] = 0;
                summary.victimBlocked = blocked;
                const after = blocked ? before : Math.max(0, before - 1);
                victim.points = after;
                summary.victimTeamIndex = victimTeamIndex;
                summary.victimDelta = after - before;
            }
            break;
        }
        default:
            break;
    }

    return summary;
}

function formatChaosSummaryForAudit(summary = null) {
    if (!summary || !summary.type) {
        return "No powerup";
    }

    switch (summary.type) {
        case "plus1":
            return "+1 boost";
        case "plus2":
            return "+2 boost";
        case "minus1":
            return summary.blockedByShield ? "🛡️ blocked -1" : "-1 setback";
        case "minus2":
            return summary.blockedByShield ? "🛡️ blocked -2" : "-2 setback";
        case "bomb":
            return summary.blockedByShield ? "Shield blocked bomb" : `Bomb: ${summary.actorDelta} points`;
        case "shield":
            return summary.shieldAlreadyReady ? 'Shield already ready (max 1)' : 'Shield gained';
        case "steal1":
            if (Number.isInteger(summary.victimTeamIndex) && summary.victimTeamIndex >= 0) {
                return summary.victimBlocked ? `Steal +1; Team ${summary.victimTeamIndex + 1} blocked the loss with a shield`
                    : `Steal +1; Team ${summary.victimTeamIndex + 1} loses ${Math.abs(summary.victimDelta)}`;
            }
            return "🥷 steal 1";
        default:
            return "Powerup resolved";
    }
}

function dedupeWordObjects(wordObjects = []) {
    const seenWords = new Set();
    return wordObjects.filter(wordObj => {
        const normalized = normalizeWord(wordObj?.word);
        if (!normalized || seenWords.has(normalized)) {
            return false;
        }

        seenWords.add(normalized);
        return true;
    });
}

function getRecentWords() {
    try {
        const raw = localStorage.getItem(RECENT_WORDS_STORAGE_KEY);
        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(item => typeof item === "string" && item.length > 0);
    } catch (_) {
        return [];
    }
}

function saveRecentWords(words = []) {
    try {
        localStorage.setItem(RECENT_WORDS_STORAGE_KEY, JSON.stringify(words.slice(-MAX_RECENT_WORDS)));
    } catch (_) {
        // Ignore storage write failures.
    }
}

function rememberUsedWords(words = []) {
    const normalizedWords = words
        .map(normalizeWord)
        .filter(Boolean);

    if (normalizedWords.length === 0) {
        return;
    }

    const currentHistory = getRecentWords();
    const merged = currentHistory.concat(normalizedWords);
    const deduped = [];
    const seen = new Set();

    for (let i = merged.length - 1; i >= 0; i--) {
        const word = merged[i];
        if (!seen.has(word)) {
            seen.add(word);
            deduped.push(word);
        }
    }

    deduped.reverse();
    saveRecentWords(deduped);
}

function filterRecentlyUsedWords(wordObjects = []) {
    const recentWordSet = new Set(getRecentWords());
    if (recentWordSet.size === 0) {
        return wordObjects;
    }

    const freshWordObjects = wordObjects.filter(wordObj => !recentWordSet.has(normalizeWord(wordObj.word)));
    const minimumPoolToUseFilter = Math.max(80, numWords * 8);

    if (freshWordObjects.length >= minimumPoolToUseFilter) {
        return freshWordObjects;
    }

    return wordObjects;
}

async function leaveLobbyWithTransaction() {
    if (!onlineClient || isLeavingLobby) return;
    isLeavingLobby = true;
    try {
        await onlineClient.close(true);
        saveOnlineSession(null);
        location.reload();
    } catch (error) {
        console.error('Failed to leave lobby:', error);
        alert('Unable to leave yet. Check your connection and retry.');
    } finally { isLeavingLobby = false; }
}

function registerLobbyExitHandlers() {
    if (hasRegisteredLobbyExitHandlers) return;
    window.addEventListener('pagehide', () => onlineClient?.suspend());
    window.addEventListener('pageshow', event => {
        if (event.persisted) void onlineClient?.resume().catch(error => console.error('Unable to resume lobby:', error));
    });
    hasRegisteredLobbyExitHandlers = true;
}

async function triggerOnlineHealthScan() {
    await onlineClient?.health();
}

function buildGlobalWordDescriptionLookup() {
    if (globalWordDescriptionLookup) {
        return globalWordDescriptionLookup;
    }

    const map = new Map();
    Object.values(categories || {}).forEach(entries => {
        (entries || []).forEach(entry => {
            const key = normalizeWord(entry?.word);
            const description = String(entry?.description || "").trim();
            if (key && description && !map.has(key)) {
                map.set(key, description);
            }
        });
    });

    Object.values(themes || {}).forEach(entries => {
        (entries || []).forEach(entry => {
            const key = normalizeWord(entry?.word);
            const description = String(entry?.description || "").trim();
            if (key && description && !map.has(key)) {
                map.set(key, description);
            }
        });
    });

    globalWordDescriptionLookup = map;
    return globalWordDescriptionLookup;
}

function setWordDescriptionsFromObjects(wordObjects = []) {
    const lookup = new Map();
    wordObjects.forEach(entry => {
        const key = normalizeWord(entry?.word);
        const description = String(entry?.description || "").trim();
        if (key && description) {
            lookup.set(key, description);
        }
    });

    wordDescriptionLookup = lookup;
}

function getTrainingDescription(word) {
    const key = normalizeWord(word);
    if (!key) {
        return "";
    }

    return wordDescriptionLookup.get(key)
        || buildGlobalWordDescriptionLookup().get(key)
        || "";
}

function clearTrainingHints() {
    if (!currentWordsContainer) {
        return;
    }

    document.getElementById('trainingHintsDrawer').hidden = true;
    if (!trainingSignature && currentWordsContainer.hidden) return;
    trainingSignature = '';
    currentWordsContainer.innerHTML = "";
    currentWordsContainer.hidden = true;
    updateMobileGameFocus();
}

function renderTrainingHints(words = []) {
    if (!currentWordsContainer) {
        return;
    }

    if (!isTrainingMode || isAiGame || (isOnlineGame && onlineClient?.snapshot?.wordPack) || !Array.isArray(words) || words.length === 0) {
        clearTrainingHints();
        return;
    }

    if (isOnlineGame && !isSpeaker) {
        clearTrainingHints();
        return;
    }

    const hints = words.map(word => ({ word, description: getTrainingDescription(word) }))
        .filter(hint => hint.description);
    if (!hints.length) {
        clearTrainingHints();
        return;
    }
    const signature = JSON.stringify(hints);
    if (trainingSignature === signature && !currentWordsContainer.hidden) return;
    trainingSignature = signature;
    document.getElementById('trainingHintsDrawer').hidden = false;

    currentWordsContainer.innerHTML = "";

    const header = document.createElement("div");
    header.className = "training-header";
    header.textContent = "Training hints · Check that your clue does not include the answer or its derivatives.";
    currentWordsContainer.appendChild(header);

    hints.forEach(hint => {
        const card = document.createElement("div");
        card.className = "training-card";

        const wordLabel = document.createElement("div");
        wordLabel.className = "training-word";
        wordLabel.textContent = hint.word;

        const description = document.createElement("div");
        description.className = "training-description";
        description.textContent = hint.description;

        card.appendChild(wordLabel);
        card.appendChild(description);
        currentWordsContainer.appendChild(card);
    });

    currentWordsContainer.hidden = false;
    updateMobileGameFocus();
}

async function onLobbyJoined(actor = onlineIdentity(gameCode)) {
    await onlineClient?.close();
    isOnlineGame = true;
    onlineEndedHandled = false;
    isSpeaker = isHost = false;
    document.getElementById('inviteStatus').textContent = '';
    document.getElementById('inviteLinkField').value = '';
    document.getElementById('inviteLinkField').hidden = true;
    clearInterval(countdownTimer);
    stopRoundSounds(); hideTimerAndAnswers(); showRecap('');
    document.getElementById('partyGame').hidden = true;
    hideElement(menu);
    showElement(btnSettings);
    hideElement(btnAI);
    hideElement(btnRules);
    hideElement(txtLobbyMenu);
    showElement(txtLobbyPlayers);
    hideModalById('onlineModal');
    showElement(game);
    showElement(btnHistory);
    hideElement(btnStartRound);
    hideElement(btnNextRound);
    hideElement(btnEndGame);
    showElement(lblGameState);
    lblGameState.textContent = 'Status: Connecting to lobby...';
    setLayoutMode('game');
    displayGameCode(gameCode);
    registerModal(btnHistory, 'historyModal');
    onlineClient = new OnlineClient({
        sdk: { ref, get, onValue, runTransaction, onDisconnect, serverTimestamp, update }, db, code: gameCode, actor,
        rules: { drawWords: drawOnlineWords, planChaos: planOnlineChaos },
        onSnapshot: renderOnlineSnapshot, onStatus: renderOnlineControls,
        onError: error => console.error('Online connection error:', error)
    });
    registerLobbyExitHandlers();
    await onlineClient.connect();
    document.querySelectorAll('.scoreButton').forEach((button, index) => {
        button.onclick = () => { void sendOnlineCommand({ type: 'toggle-answer', index }); };
    });
    void playSound(startSound, () => false, 1.2);
}

function hideTimerAndAnswers() {
    hideElement(btnAnswers);

    const scoreButtons = document.getElementsByClassName("scoreButton");
    for (let index = 0; index < scoreButtons.length; index++) {
        const element = scoreButtons[index];
        element.hidden = true;
    }

    hideElement(btnNextRound);
    hideElement(timer);
    clearTrainingHints();
    updateMobileGameFocus();
}

async function createGameLobby() {
    if (onlineLobbyActionPending || isOnlineGame) return;
    onlineLobbyActionPending = true;
    try {
        playerName = sanitizePlayerName(txtPlayerName.value);
        txtPlayerName.value = playerName;
        if (!playerName) { alert('Enter a valid player name!'); return; }
        const settings = getSanitizedSettingsFromInputs();
        const wordPack = normalizeOnlinePack(pendingOnlinePack);
        if (wordPack && !wordPack.entries.some(entry => settings.difficulty === 'normal' || entry.difficulty === settings.difficulty)) {
            document.getElementById('onlineFormStatus').textContent = 'This pack has no words at the selected difficulty. Change difficulty in Settings or generate another pack.';
            document.getElementById('onlineFormStatus').hidden = false; return;
        }
        const pools = wordPack ? wordPack.entries.map(entry => entry.word)
            : loadWords(settings.selectedTheme, settings.selectedCategories, settings.difficulty);
        if (wordPack) { settings.selectedTheme = 'None'; settings.selectedCategories = []; settings.trainingMode = false; }
        // .info values are local SDK metadata and must be listened to, not read
        // through get(), which may fall back to a REST path the server rejects.
        const serverOffset = await new Promise((resolve, reject) => {
            onValue(ref(db, '.info/serverTimeOffset'), snapshot => resolve(Number(snapshot.val()) || 0), reject, { onlyOnce: true });
        });
        const initial = {
            protocolVersion: OnlineState.PROTOCOL_VERSION, dateCreated: serverTimestamp(), settings,
            ...(wordPack ? { wordPack } : {}),
            teams: Array.from({ length: settings.numTeams }, (_, id) => ({ id, points: 0, players: [] })),
            easyWords: wordPack ? wordPack.entries.filter(entry => entry.difficulty === 'easy').map(entry => entry.word) : easyWords,
            hardWords: wordPack ? wordPack.entries.filter(entry => entry.difficulty === 'hard').map(entry => entry.word) : hardWords,
            currentGameWords: pools, numPlayers: 0, currentTeam: 1, currentRound: 0,
            isGameStarted: false, roundActive: false, phase: 'waiting', gameState: 'waiting', hostId: '', hostName: '', hostEpoch: 0,
            chaos: { teamShields: createInitialTeamShields(settings.numTeams), resolutionId: 0 }
        };
        let created = false;
        for (let attempt = 0; attempt < 12; attempt++) {
            const code = generateGameCode();
            const gameRef = ref(db, `games/${code}`);
            await get(gameRef);
            const result = await runTransaction(gameRef, existing => {
                if (existing && existing.gameState !== 'ended'
                    && (!existing.dateCreated || Date.now() + serverOffset - existing.dateCreated <= LOBBY_EXPIRY_MS)) return;
                return initial;
            }, { applyLocally: false });
            if (!result.committed) continue;
            gameCode = code;
            created = true;
            break;
        }
        if (!created) throw new Error('Unable to reserve a lobby code. Please retry.');
        await onLobbyJoined(onlineIdentity(gameCode, true));
    } catch (error) { await handleOnlineJoinError(error); }
    finally { onlineLobbyActionPending = false; }
}

async function joinGameLobby() {
    if (onlineLobbyActionPending || isOnlineGame) return;
    const code = String(txtGameCode.value || '').trim().toUpperCase();
    txtGameCode.value = code;
    if (!/^[A-Z]{4}$/.test(code)) { alert('Enter a four-letter lobby code.'); return; }
    playerName = sanitizePlayerName(txtPlayerName.value);
    txtPlayerName.value = playerName;
    if (!playerName) { alert('Enter a valid player name!'); return; }
    onlineLobbyActionPending = true;
    gameCode = code;
    try { await onLobbyJoined(onlineIdentity(code)); }
    catch (error) { await handleOnlineJoinError(error); }
    finally { onlineLobbyActionPending = false; }
}

async function startOnlineGame() {
    await sendOnlineCommand({ type: 'start-game', seed: randomSeed() });
}

function detectPlayerChanges(teams, teamsData) {
    const oldPlayerNames = new Set();
    const newPlayerNames = new Set();
    const oldPlayersMap = new Map();
    const newPlayersMap = new Map();

    // Collect all players from the old teams
    teams.forEach((team, teamIndex) => {
        if (team.players) {
            team.players.forEach(player => {
                const playerName = player.playerName;
                oldPlayerNames.add(playerName);
                oldPlayersMap.set(playerName, { player, teamNumber: teamIndex + 1 });
            });
        }
    });

    // Collect all players from the new teams
    teamsData.forEach((team, teamIndex) => {
        if (team.players) {
            team.players.forEach(player => {
                const playerName = player.playerName;
                newPlayerNames.add(playerName);
                newPlayersMap.set(playerName, { player, teamNumber: teamIndex + 1 });
            });
        }
    });

    // Determine players who have joined
    const joinedPlayers = Array.from(newPlayersMap.entries())
        .filter(([playerName]) => !oldPlayerNames.has(playerName))
        .map(([playerName, { player, teamNumber }]) => ({ player, teamNumber }));

    // Determine players who have left
    const leftPlayers = Array.from(oldPlayersMap.entries())
        .filter(([playerName]) => !newPlayerNames.has(playerName))
        .map(([playerName, { player, teamNumber }]) => ({ player, teamNumber }));

    // Notify about players who have joined
    joinedPlayers.forEach(({ player, teamNumber }) => {
        if (playerName !== "" && player.playerName !== playerName) {
            showPlayerNotification(player, teamNumber, 5, true); // Pass the team number
        }
    });

    // Notify about players who have left
    leftPlayers.forEach(({ player, teamNumber }) => {
        if (playerName !== "" && player.playerName !== playerName) {
            showPlayerNotification(player, teamNumber, 5, false); // Pass the team number
        }
    });
}

function displayGameCode(gameCode) {
    const gameCodeLabel = document.getElementById("lblGameCode");
    gameCodeLabel.textContent = `Game Code: ${gameCode}`;
    gameCodeLabel.hidden = false;
}

// Function to show toast notification
function showPlayerNotification(player, teamNumber, autoHideDuration = null, isJoining = true) {
    const bgColorClass = isJoining ? 'bg-success' : 'bg-danger';
    const textColorClass = 'text-white';
    const headerText = isJoining ? 'Player Joined' : 'Player Left';
    const bodyText = `${player.playerName} has ${isJoining ? 'joined' : 'left'} team ${teamNumber}.`;

    showNotification(bgColorClass, textColorClass, headerText, bodyText, autoHideDuration);
}

// Update the UI based on new player data
function updatePlayerListUI(teamsData) {
    txtLobbyPlayers.innerHTML = '';

    teamsData.forEach((team, teamIndex) => {
        const teamHeader = document.createElement('h6');
        teamHeader.textContent = `Team ${teamIndex + 1}${(team.players || []).length ? ':' : ' · Waiting for players'}`;
        teamHeader.style.fontWeight = 'bold';
        txtLobbyPlayers.appendChild(teamHeader);

        const teamList = document.createElement('ul');
        teamList.style.textAlign = 'left';
        txtLobbyPlayers.appendChild(teamList);

        if (team.players) {
            team.players.forEach((player) => {
                const playerItem = document.createElement('li');
                const disconnected = isOnlineGame && onlineClient?.snapshot
                    && !OnlineState.isConnected(onlineClient.snapshot, player, onlineClient.serverNow());
                const host = isOnlineGame && onlineClient?.snapshot?.hostId === player.playerId;
                playerItem.textContent = `Player ${player.id + 1}: ${player.playerName} ${player.isSpeaker ? '(Speaker)' : ''}${host ? ' (Host)' : ''}${disconnected ? ' (Disconnected)' : ''}`;
                if (isOnlineGame ? player.playerId === onlineClient?.actor?.playerId : player.playerName === playerName)
                {
                    playerItem.style.fontWeight = 'bold';
                }
                teamList.appendChild(playerItem);
            });
        }
    });
}

function generate() {
    try { void run(readAiTopics()); }
    catch (error) { setAiFeedback(error.message === 'too-many-ai-topics' ? 'Use up to five topics.' : 'Use a topic of 240 characters or fewer.', true); }
}

function validateOnlineEntry(joining) {
    const status = document.getElementById('onlineFormStatus');
    txtPlayerName.value = sanitizePlayerName(txtPlayerName.value);
    txtGameCode.value = String(txtGameCode.value || '').trim().toUpperCase();
    txtPlayerName.setAttribute('aria-invalid', 'false'); txtGameCode.setAttribute('aria-invalid', 'false');
    const invalid = !txtPlayerName.value ? txtPlayerName : joining && !/^[A-Z]{4}$/.test(txtGameCode.value) ? txtGameCode : null;
    status.hidden = !invalid; status.classList.add('is-error');
    status.textContent = !invalid ? '' : invalid === txtPlayerName ? 'Enter your name to create or join a lobby.' : 'Enter the four-letter code from your host.';
    if (invalid) { invalid.setAttribute('aria-invalid', 'true'); invalid.focus?.(); }
    return !invalid;
}

function setAiFeedback(message, error = false) {
    const status = document.getElementById('aiFeedback');
    status.textContent = message; status.hidden = !message; status.classList.toggle('is-error', error);
    status.setAttribute('role', error ? 'alert' : 'status');
    status.setAttribute('aria-live', error ? 'assertive' : 'polite');
}

function getAiWordObjects(selectedDifficulty = getSanitizedSettingsFromInputs().difficulty) {
    return AiPacks.reconcileEditedPack(document.getElementById('aiWords').value, aiGeneratedEntries, selectedDifficulty);
}

function syncAiPack() {
    const selectedDifficulty = getSanitizedSettingsFromInputs().difficulty;
    const entries = getAiWordObjects(selectedDifficulty), count = entries.length;
    const eligible = entries.filter(entry => selectedDifficulty === 'normal' || entry.difficulty === selectedDifficulty);
    const easy = entries.filter(entry => entry.difficulty === 'easy').length;
    const detail = aiGeneratedEntries.length && count ? ` ${easy} easy · ${count - easy} hard.` : '';
    document.getElementById('aiPackStatus').textContent = count
        ? `${count} ${count === 1 ? 'word' : 'words'}${eligible.length ? ' ready to play' : ''}.${detail}${eligible.length ? '' : ' No answers at the selected difficulty. Change difficulty or generate a new pack.'}`
        : 'No words yet. Generate a pack or paste your own.';
    document.getElementById('btnAiGame').disabled = document.getElementById('btnGenerate').disabled || !eligible.length;
    document.getElementById('btnAiOnline').disabled = document.getElementById('btnAiGame').disabled;
    document.getElementById('savePackButton').disabled = document.getElementById('btnGenerate').disabled || !count;
    document.getElementById('btnGenerate').textContent = document.getElementById('btnGenerate').disabled ? 'Generating…' : count ? 'Replace words' : 'Generate words';
    document.getElementById('undoAiPack').hidden = !aiUndoPack;
    document.getElementById('undoAiPack').disabled = document.getElementById('btnGenerate').disabled;
    renderAiTopics();
}

function extractUniqueAiWordsFromText(rawText = '') {
    return AiPacks.parseManualWords(rawText);
}

function getFriendlyGeminiErrorMessage(error) {
    return AiErrors.describeGeminiError(error).message;
}

function refreshAiGenerationHistory() {
    aiGenerationHistory = AiPacks.sanitizeHistory([...aiGenerationHistory,
        ...AiPacks.readHistory({ getItem: key => localStorage.getItem(key) })]);
    return aiGenerationHistory;
}

async function run(topic) {
    if (document.getElementById('btnGenerate').disabled) return;
    const btnGenerate = document.getElementById("btnGenerate");
    const btnAiGame = document.getElementById("btnAiGame");
    const textArea = document.getElementById("aiWords");
    const topicInput = document.getElementById('topic');
    const strictToggle = document.getElementById('strictAiTopic');
    let cleanTopics;
    try { cleanTopics = AiPacks.normalizeTopics(topic); }
    catch (error) {
        setAiFeedback(error.message === 'too-many-ai-topics' ? 'Use up to five topics.' : 'Enter a topic first, using 240 characters or fewer for each.', true); syncAiPack(); return;
    }
    const previous = captureAiPack();
    btnGenerate.disabled = true; btnAiGame.disabled = true; textArea.disabled = true;
    document.getElementById('savePackButton').disabled = true;
    renderSavedPacks();
    document.getElementById('btnAiOnline').disabled = true;
    topicInput.disabled = true; strictToggle.disabled = true;
    btnGenerate.textContent = 'Generating…'; btnGenerate.setAttribute('aria-busy', 'true');
    setAiFeedback('Building your word pack…');
    document.getElementById('savedPackName').disabled = true;
    syncAiPack();

    try {
        const settings = getSanitizedSettingsFromInputs();
        const prompt = AiPacks.buildPackRequest(cleanTopics, { strict: Boolean(strictToggle.checked), difficulty: settings.difficulty,
            numWords: settings.numWords, history: refreshAiGenerationHistory() });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const pack = AiPacks.parseGeneratedPack(String(response?.text?.() || ''), {
            history: refreshAiGenerationHistory(), finishReason: response?.candidates?.[0]?.finishReason,
            difficulty: settings.difficulty
        });
        // Commit only a fully parsed, usable pack. A bad response never replaces edits.
        aiUndoPack = AiPacks.parseManualWords(previous.text).length ? previous : null;
        aiTopics = cleanTopics; topicInput.value = '';
        aiGeneratedEntries = shuffleArray(pack.entries);
        document.getElementById('savedPackName').value = cleanTopics.join(' + ').slice(0, 60);
        document.getElementById('packLibraryStatus').hidden = true;
        const text = aiGeneratedEntries.map(entry => entry.word).join('\n');
        textArea.value = text; textArea.textContent = text;
        currentGameWords = shuffleArray(pack.entries.map(entry => entry.word));
        aiGenerationHistory = AiPacks.rememberPack(aiGenerationHistory, pack.entries,
            { setItem: (key, value) => localStorage.setItem(key, value) });
        setAiFeedback(pack.smaller
            ? `${pack.entries.length} fresh ${pack.entries.length === 1 ? 'answer is' : 'answers are'} ready. Some topics have fewer than 150; broaden the topic for a larger pack.`
            : 'Your 150-word pack is ready. Review the words or jump straight in.');
    } catch (error) {
        const failure = AiErrors.describeGeminiError(error);
        console.error('AI generation failed:', { kind: failure.kind, status: failure.status });
        setAiFeedback(getFriendlyGeminiErrorMessage(error), true);
    } finally {
        btnGenerate.disabled = false;
        topicInput.disabled = false; strictToggle.disabled = false;
        textArea.disabled = false; btnGenerate.textContent = 'Generate words'; btnGenerate.setAttribute('aria-busy', 'false');
        document.getElementById('savedPackName').disabled = false;
        syncAiPack();
        renderSavedPacks();
    }
}

function updateOnlinePackNotice() {
    const notice = document.getElementById('onlinePackNotice'); notice.hidden = !pendingOnlinePack;
    notice.textContent = pendingOnlinePack ? `Your ${pendingOnlinePack.entries.length}-word pack will be shared with this lobby. Friends just need the lobby code.` : '';
    document.getElementById('joinLobbyChoice').hidden = Boolean(pendingOnlinePack);
    document.getElementById('onlineChoices').classList.toggle('pack-hosting', Boolean(pendingOnlinePack));
    document.getElementById('createLobbyButton').textContent = pendingOnlinePack ? 'Create lobby with this pack' : 'Create lobby';
}

function hostAIWordsOnline() {
    if (isOnlineGame || document.getElementById('btnGenerate').disabled) return;
    const settings = getSanitizedSettingsFromInputs();
    try {
        const pack = normalizeOnlinePack({ kind: 'custom', entries: getAiWordObjects(settings.difficulty) });
        if (!pack.entries.some(entry => settings.difficulty === 'normal' || entry.difficulty === settings.difficulty)) {
            setAiFeedback('This pack has no answers at the selected difficulty. Change difficulty in Settings or generate another pack.', true); return;
        }
        pendingOnlinePack = pack; updateOnlinePackNotice();
    } catch (error) {
        setAiFeedback(error.reason === 'count' ? 'Online packs support up to 150 answers. Shorten the list before hosting.'
            : error.reason === 'entry' ? 'Each online answer needs to be a plain word or phrase of 80 characters or fewer.'
            : 'Generate or paste words before hosting a game.', true); return;
    }
    const modal = document.getElementById('aiModal');
    if (modal.classList.contains('show')) {
        modal.addEventListener('hidden.bs.modal', () => getModalInstance('onlineModal')?.show(), { once: true });
        hideModalById('aiModal');
    } else getModalInstance('onlineModal')?.show();
}

function startAIGame() {
    // Read user added words on start
    let textArea = document.getElementById('aiWords');
    const uniqueAiWords = extractUniqueAiWordsFromText(textArea?.value || "");
    if (uniqueAiWords.length === 0) {
        setAiFeedback('Generate or paste words before starting a game.', true);
        return;
    }
    const selectedDifficulty = getSanitizedSettingsFromInputs().difficulty;
    if (!getAiWordObjects(selectedDifficulty).some(entry => selectedDifficulty === 'normal' || entry.difficulty === selectedDifficulty)) {
        setAiFeedback('This pack has no answers at the selected difficulty. Change difficulty in Settings or generate another pack.', true);
        syncAiPack(); return;
    }
    isAiGame = true;
    currentGameWords = shuffleArray(uniqueAiWords);
    wordDescriptionLookup = new Map();

    startGame();
    
    hideModalById("aiModal");
    btnAI.hidden = menu.hidden;
}

async function startGame({ rematch = false } = {}) {
    const modeSettings = getSanitizedSettingsFromInputs();
    activeMode = modeSettings.mode; localStakes = {}; localTurnRisky = false;
    if (isAiGame) {
        const selectedDifficulty = getSanitizedSettingsFromInputs().difficulty;
        if (!getAiWordObjects(selectedDifficulty).some(entry => selectedDifficulty === 'normal' || entry.difficulty === selectedDifficulty)) {
            setAiFeedback('This pack has no answers at the selected difficulty. Change difficulty in Settings or generate another pack.', true);
            syncAiPack(); getModalInstance('aiModal')?.show(); return;
        }
    }
    document.getElementById('menuNotice').hidden = true;
    if (Modes.isParty(modeSettings)) { startLocalParty(modeSettings); return; }
    // Play game start sound
    void playSound(startSound, () => false, 1.2);
    clearInterval(countdownTimer); finishLocalRound = null;
    localMatchId++;
    localAudit = [];
    localFinalTurnCount = null; localMatchFinished = false;
    document.getElementById('finalRoundNotice').hidden = true;
    localRerollsUsed = [];
    onlineBoardSignature = '';
    if (!rematch) localDeck = {};
    document.getElementById('matchResults').dataset.signature = '';
    document.getElementById('matchResults').hidden = true;
    game.classList.remove('match-finished');
    document.getElementById('currentTeamIndicator').hidden = false;
    showRecap('');
    hideElement(document.getElementById('chaosChoice'));
    hideElement(lblGameState);
    setLayoutMode("game");
    clearTrainingHints();
    renderOnlineRoundReview(null);

    // Read and sanitize game settings
    const sanitizedSettings = getSanitizedSettingsFromInputs();
    if (!rematch) localSeries = sanitizedSettings.trackSeries ? Experience.freshSeries(isAiGame ? 2 : sanitizedSettings.numTeams) : null;
    difficulty = sanitizedSettings.difficulty;
    const selectedCategories = [...sanitizedSettings.selectedCategories];
    const selectedTheme = sanitizedSettings.selectedTheme;
    activeSelectedTheme = selectedTheme;
    activeSelectedCategories = [...selectedCategories];

    numTeams = sanitizedSettings.numTeams;
    teams = Array.from({ length: numTeams }, () => ({ points: 0 }));

    pointsToWin = sanitizedSettings.pointsToWin;
    winRule = sanitizedSettings.winRule;
    numWords = sanitizedSettings.numWords;
    numSeconds = sanitizedSettings.numSeconds;
    isChaosMode = sanitizedSettings.chaosMode;
    isTrainingMode = sanitizedSettings.trainingMode;
    isRoundActive = false;
    isResolvingChaosMove = false;

    txtTeams.value = String(numTeams);
    document.getElementById("pointsToWin").value = String(pointsToWin);
    document.getElementById('winRule').value = winRule;
    txtWords.value = String(numWords);
    txtSeconds.value = String(numSeconds);
    if (chkChaos) {
        chkChaos.checked = isChaosMode;
    }
    if (chkTraining) {
        chkTraining.checked = isTrainingMode;
    }

    // Validate game settings
    if (selectedCategories.length > 0 && selectedTheme !== "None") {
        alert("Please select either categories or theme, not both.");
        return;
    }

    // Ai game
    if (isAiGame && !Modes.isStakes(modeSettings)) {
        // Only 2 teams allowed
        teams = Array.from({ length: 2 }, () => ({ points: 0 }));

        // Fixed points to win
        if (isMobileDevice()) {
            pointsToWin = 16;
        }
        else {
            pointsToWin = 15;
        }
    }
    else {
        // Load game data
        currentGameWords = loadWords(selectedTheme, selectedCategories, difficulty);
        localWordObjects = filterRecentlyUsedWords(getOnlineWordObjects(sanitizedSettings));
    }
    if (isAiGame) localWordObjects = getAiWordObjects(difficulty);

    roundPowerups = {};
    powerupRevealVisible = false;
    landedPowerupPreview = null;
    teamShields = createInitialTeamShields(teams.length);

    // Show/Hide UI elements
    hideElement(menu);
    showElement(btnSettings);
    hideElement(btnAI);
    hideElement(btnRules);
    showElement(game);
    showElement(btnHistory);
    hideElement(btnOnline);
    refreshChaosModeUi();

    registerModal(btnHistory, "historyModal");

    // Handle answer button click logic
    let count = 0;
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (count < numWords) {
            count++;
            button.onclick = () => {
                if (!isOnlineGame && !isRoundActive && !isResolvingChaosMove && !btnNextRound.hidden) {
                    if (isScoreButtonSelected(button)) {
                        selectedButtons--;
                        setScoreButtonSelected(button, false);
                    }
                    else {
                        selectedButtons++;
                        setScoreButtonSelected(button, true);
                    }
                    updateSelectionSummary();
                }
            };
        }
    });

    // Set starting team
    localStarter = Gameplay.startingTeam(randomSeed(), teams.length, rematch ? localStarter : null);
    currentTeam = localStarter + 1;
    currentRound = 0;

    createTeamAuditTables(teams.length, { forceReset: true });

    generateBoard();
    updateBoard();
    updateTeamScores();
    updateCurrentTeamIndicator();
    btnStartRound.hidden = false; btnEndGame.hidden = false;
    hideRoundInputUI();
    updateSelectionSummary();
    clearChaosPresentation();
    showRecap(rematch ? `Team ${currentTeam} starts this rematch.` : `Team ${currentTeam} was drawn to start.`);
    document.getElementById('shareResultStatus').hidden = true;
    renderTurnExperience();
}

function getEasyWords(selectedObjects) {
    return selectedObjects.filter(_ => _.difficulty == "easy");
}

function getHardWords(selectedObjects) {
    return selectedObjects.filter(_ => _.difficulty == "hard");
}

function loadWords(selectedTheme, selectedCategories, difficulty = "normal") {
    let selectedObjects;
    if (selectedTheme !== "None") {
        selectedObjects = themes[selectedTheme] ? [...themes[selectedTheme]] : [];
        if (difficulty !== "normal") {
            // Filter based on difficulty if not normal
            selectedObjects = (themes[selectedTheme] || []).filter(wordObj => wordObj.difficulty === difficulty);
        }
    }
    else {
        const categoriesToUse = selectedCategories.length === 0
            ? Object.keys(categories)
            : [...selectedCategories];

        selectedObjects = categoriesToUse.flatMap(category => categories[category] || []);

        if (difficulty !== "normal") {
            // Filter based on difficulty if not normal
            selectedObjects = categoriesToUse.flatMap(category => (categories[category] || []).filter(wordObj => wordObj.difficulty === difficulty));
        }
    }

    selectedObjects = dedupeWordObjects(selectedObjects);
    selectedObjects = filterRecentlyUsedWords(selectedObjects);
    setWordDescriptionsFromObjects(selectedObjects);

    // Shuffle selected objects
    selectedObjects = shuffleArray([...selectedObjects]);

    easyWords = getEasyWords(selectedObjects).map(obj => obj.word);
    hardWords = getHardWords(selectedObjects).map(obj => obj.word);

    // Map only the word field
    return selectedObjects.map(obj => obj.word);
}

function startRound(options = {}) {
    const risky = options.risky === true;
    if (isOnlineGame) { void startOnlineRound(risky); return; }
    if (isRoundActive || isResolvingChaosMove || localMatchFinished) return;
    if (risky && !Modes.riskAvailability({ mode: activeMode }, teams[currentTeam - 1].points, localStakes[currentTeam - 1]).allowed) return;
    localTurnRisky = risky; localTurnCardSize = Modes.eligibleCardSize(localWordObjects, { numWords, difficulty });
    clearChaosPresentation();
    showRecap('');
    stopRoundSounds();
    btnStartRound.hidden = true;
    btnEndGame.hidden = true;
    isRoundActive = true;
    renderTurnExperience();
    document.getElementById('roleInstruction').textContent = `Team ${currentTeam}: get ready to describe and guess.`;
    powerupRevealVisible = false;
    landedPowerupPreview = null;
    updateBoard();
    updateMobileGameFocus();
    hideElement(lblGameState);
    endRoundEarly = false;

    startCountdown(numSeconds, () => {
        lblAnswers.textContent = "Click the correct answers:"
        btnEndRound.hidden = true;
        btnNextRound.hidden = false;
        setNextRoundBusyState(false);
        clearTrainingHints();
        isRoundActive = false;
        renderStakesUi();
        updateMobileGameFocus();

        let count = 0;
        document.querySelectorAll(".scoreButton").forEach(button => {
            count++;
            if (count <= numWords) {
                setScoreButtonSelected(button, false);
                button.disabled = false;
            }
        });
    });
}

function getSelectedCorrectAnswers() {
    const correctAnswers = [];
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (isScoreButtonSelected(button)) {
            correctAnswers.push(button.textContent);
        }
    });
    return correctAnswers;
}

function hideRoundInputUI() {
    btnAnswers.hidden = true;
    const scoreButtons = document.getElementsByClassName("scoreButton");
    for (let index = 0; index < scoreButtons.length; index++) {
        scoreButtons[index].hidden = true;
    }
    btnNextRound.hidden = true;
    setNextRoundBusyState(false);
    timer.hidden = true;
    clearWords();
    clearTrainingHints();
    isRoundActive = false;
    updateMobileGameFocus();
}

function advanceRoundPointers() {
    currentTeam++;
    if (currentTeam > teams.length) {
        currentTeam = 1;
        currentRound++;
    }
}





async function runChaosResolutionLocally({ teamIndexForRound, selectedPoints, roundNumberForRound, animate = true }) {
    ensureLocalChaosState(teams.length);
    const basePoints = teams.map(team => team.points);
    basePoints[teamIndexForRound] += selectedPoints;
    const data = { settings: { pointsToWin }, teams: teams.map(team => ({ points: team.points })),
        chaos: { teamShields }, turn: { seed: randomSeed(), teamIndex: teamIndexForRound,
            selectedIndexes: Array.from({ length: selectedPoints }, (_, i) => i) } };
    let plan = planOnlineChaos(data, basePoints);
    if (document.getElementById('chkReroll').checked && plan.landing && !localRerollsUsed[teamIndexForRound]) {
        showChaosChoicePreview(plan);
        if (await offerLocalChaosChoice(plan.landing.type)) {
            localRerollsUsed[teamIndexForRound] = true;
            data.turn.seed = (data.turn.seed ^ 0x9E3779B9) >>> 0;
            plan = planOnlineChaos(data, basePoints);
        }
    }
    const startedAt = Date.now();
    const render = () => renderResolutionFrame(plan, Date.now() - startedAt);
    render();
    if (animate && !reducedMotion()) {
        const interval = setInterval(render, 50);
        try { await sleep(plan.durationMs); } finally { clearInterval(interval); }
    }
    renderResolutionFrame(plan, plan.durationMs);
    teams.forEach((team, index) => { team.points = plan.points[index]; });
    teamShields = plan.shields;
    powerupRevealVisible = false; landedPowerupPreview = null;
    updateBoard(); updateTeamScores();
    return { roundId: roundNumberForRound, resolutionSummary: plan.effect, plan };
}

async function nextRound() {
    if (isOnlineGame) { await sendOnlineCommand({ type: 'submit-round' }); return; }
    if (isResolvingChaosMove || isRoundActive || btnNextRound.hidden) return;
    const correctAnswers = getSelectedCorrectAnswers();
    const teamIndexForRound = getCurrentTeamIndex(currentTeam);
    const roundNumberForRound = Gameplay.completedTurns(localAudit, teams.length)[teamIndexForRound] + 1;
    const before = teams[teamIndexForRound].points;
    const pointsBeforeAll = teams.map(team => team.points);
    const wordCount = Array.from(document.querySelectorAll('.scoreButton')).filter(button => !button.hidden).length;
    const submittedAt = Date.now();
    let chaosSummary, chaosEffect, completedEvent;
    isResolvingChaosMove = true; setNextRoundBusyState(true);
    renderRoundHighlight({ id: localAudit.length + 1, teamIndex: teamIndexForRound, earned: correctAnswers.length, wordCount },
        localAudit, pointsBeforeAll, `local:${localMatchId}`);
    document.querySelectorAll('.scoreButton').forEach(button => { button.disabled = true; });
    btnEndGame.hidden = true;
    try {
        if (isChaosMode) {
            hideRoundInputUI();
            showRecap('');
            document.getElementById('roleInstruction').textContent = `Watch Team ${teamIndexForRound + 1} on the board.`;
            const result = await runChaosResolutionLocally({ teamIndexForRound, selectedPoints: correctAnswers.length, roundNumberForRound });
            chaosEffect = result.resolutionSummary;
            chaosSummary = formatChaosSummaryForAudit(result.resolutionSummary);
        } else teams[teamIndexForRound].points += correctAnswers.length;
        const stakeResult = Modes.isStakes({ mode: activeMode }) ? Modes.stakesScore({ mode: activeMode }, before, correctAnswers.length, wordCount, localTurnRisky) : null;
        if (stakeResult) { teams[teamIndexForRound].points = stakeResult.after; localStakes[teamIndexForRound] = Modes.nextRiskResource({ mode: activeMode }, localTurnRisky, localStakes[teamIndexForRound]); }
        const text = stakeResult ? `Team ${teamIndexForRound + 1}: ${stakeResult.message}` : Gameplay.recap({ teamIndex: teamIndexForRound, earned: correctAnswers.length, before,
            after: teams[teamIndexForRound].points, effect: chaosEffect });
        completedEvent = { id: localAudit.length + 1, teamIndex: teamIndexForRound, roundNumber: roundNumberForRound, correctAnswers, earned: correctAnswers.length, wordCount, pointsBeforeAll, recap: text,
            chaosSummary, effect: chaosEffect, pointsBefore: before, pointsAfter: teams[teamIndexForRound].points,
            clueSeconds: Math.max(0, (localSelectingAt - localTurnStartedAt) / 1000),
            scoringSeconds: Math.max(0, (submittedAt - localSelectingAt) / 1000),
            resolutionSeconds: Math.max(0, (Date.now() - submittedAt) / 1000) };
        if (stakeResult) completedEvent.stakes = stakeResult;
        localAudit.push(completedEvent);
        const progress = Gameplay.matchProgress(teams.map(team => team.points), pointsToWin, localAudit, localFinalTurnCount, winRule);
        localFinalTurnCount = progress.finalTurnCount; localMatchFinished = progress.finished;
        renderFinalRoundNotice(progress);
        showRecap(text);
        createTeamAuditColumns(teamIndexForRound, roundNumberForRound);
        createTeamAuditRows(teamIndexForRound, roundNumberForRound, correctAnswers, { chaosSummary, modeSummary: stakeResult?.message });
        advanceRoundPointers(); hideRoundInputUI();
        updateBoard(); updateCurrentTeamIndicator(); updateTeamScores();
        if (localMatchFinished) { renderMatchResults(); return; }
        btnStartRound.hidden = false; btnEndGame.hidden = false;
    } finally {
        clearChaosPresentation();
        if (completedEvent && isChaosMode && !game.classList.contains('match-finished')) showChaosOutcome(completedEvent);
        isResolvingChaosMove = false; setNextRoundBusyState(false); updateMobileGameFocus();
        renderFinalRoundNotice(Gameplay.matchProgress(teams.map(team => team.points), pointsToWin, localAudit, localFinalTurnCount, winRule));
        renderTurnExperience();
    }
}

async function endGame() {
    hideModalById('endMatchModal');
    if (localPartyGame) { await partyCommand({ type: 'end-game' }); return; }
    if (isOnlineGame) { await sendOnlineCommand({ type: 'end-game' }); return; }
    clearInterval(countdownTimer); finishLocalRound = null;
    stopRoundSounds();
    renderMatchResults(null, true);
}

function endRound() {
    if (isOnlineGame) { void sendOnlineCommand({ type: 'end-round' }); return; }
    if (!isRoundActive || isPreparingRound) return;
    endRoundEarly = true;
    finishLocalRound?.();
}

function displayCurrentWords() {
    lblAnswers.textContent = 'Describe these words in any order:';
    const objects = localWordObjects.length ? localWordObjects : currentGameWords.map(word => ({ word, difficulty: 'easy' }));
    const draw = Gameplay.drawWords(objects, localDeck, difficulty, numWords, randomSeed());
    localTurnCardSize = draw.words.length;
    localDeck = draw.deck;
    const buttons = document.getElementsByClassName('scoreButton');
    Array.from(buttons).forEach((button, index) => {
        button.hidden = index >= draw.words.length;
        button.textContent = draw.words[index] || '';
        button.disabled = true;
        setScoreButtonSelected(button, false);
    });
    btnAnswers.hidden = false;
    renderTrainingHints(draw.words);
    rememberUsedWords(draw.words);
    if (draw.recycled.length) showRecap('This pack has run through its ' + draw.recycled.join(' and ') + ' answers; that difficulty is reshuffled.');
    updateMobileGameFocus();
}

function clearWords() {
    document.querySelectorAll(".scoreButton").forEach(button => {
        setScoreButtonSelected(button, false);
        selectedButtons = 0;
    });
}

function updatePoints(points) {
    teams[getCurrentTeamIndex(currentTeam)].points += points;
    updateBoard();
    if (isOnlineGame && points == 0 && !isSpeaker) {
        hideElement(btnNextRound);
    }
    else {
        btnNextRound.hidden = false;
    }
}

function playSound(audioElement, endCondition, playbackRate = 1.0, offsetSeconds = 0) {
    if (!audioElement || preferences.muted || preferences.volume === 0 || endCondition?.()) return Promise.resolve();
    try {
        audioElement.volume = preferences.volume;
        audioElement.muted = false;
        audioElement.playbackRate = playbackRate;
        audioElement.currentTime = offsetSeconds;
        const attempt = audioElement.play();
        attempt?.catch?.(() => {});
    } catch { /* Audio is optional and never controls game timing. */ }
    return Promise.resolve();
}

function setRoundCountdown(remainingMs) {
    isPreparingRound = remainingMs > 0;
    document.getElementById('roundCountdown').hidden = !isPreparingRound;
    const label = isPreparingRound ? Gameplay.countdownLabel(remainingMs) : '';
    const value = document.getElementById('roundCountdownValue');
    if (value.textContent !== label) value.textContent = label;
    game.classList.toggle('countdown-phase', isPreparingRound);
}

function startCountdown(seconds, callback) {
    clearInterval(countdownTimer);
    const startsAt = Date.now() + Gameplay.ROUND_COUNTDOWN_MS;
    const deadline = startsAt + seconds * 1000;
    btnEndRound.hidden = true; btnAnswers.hidden = true; timer.hidden = true;
    document.querySelectorAll('.scoreButton').forEach(button => { button.hidden = true; button.textContent = ''; });
    clearTrainingHints();
    setRoundCountdown(Gameplay.ROUND_COUNTDOWN_MS); updateMobileGameFocus();
    void playSound(countdownSound, () => false);
    let finished = false, warned = false, cluesStarted = false;
    finishLocalRound = () => {
        if (finished || !cluesStarted) return;
        finished = true; clearInterval(countdownTimer); finishLocalRound = null;
        localSelectingAt = Date.now(); stopRoundSounds();
        timer.hidden = true;
        void playSound(endRoundEarly ? endSoundAlt : endSound, () => false);
        selectedButtons = 0; callback(); updateSelectionSummary();
        document.getElementById('roleInstruction').textContent = 'Select the words guessed correctly, then confirm the score.';
    };
    const render = () => {
        if (finished || !isRoundActive) return;
        const untilStart = startsAt - Date.now();
        if (untilStart > 0) { setRoundCountdown(untilStart); return; }
        if (!cluesStarted) {
            cluesStarted = true; setRoundCountdown(0);
            countdownSound.pause(); countdownSound.currentTime = 0;
            localTurnStartedAt = startsAt;
            document.getElementById('roleInstruction').textContent = `Team ${currentTeam}'s speaker: describe these words. Listeners: guess aloud.`;
            btnEndRound.hidden = false; displayCurrentWords(); timer.hidden = false;
            updateMobileGameFocus();
        }
        const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        syncTickSound(remaining, true);
        timer.textContent = String(remaining);
        if (remaining <= 5 && remaining > 0 && !warned) { warned = true; void playSound(warningSound, () => false, 1.2); }
        if (!remaining || endRoundEarly) finishLocalRound?.();
    };
    countdownTimer = setInterval(render, 50);
}

function generateBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    board.style.gridTemplateColumns = '';
    board.dataset.layout = pointsToWin > 30 ? 'expanded' : 'standard';
    for (let i = 0; i <= pointsToWin; i++) {
        const cell = document.createElement('div'); cell.className = 'board-cell';
        cell.dataset.position = String(i);
        board.appendChild(cell);
    }
}

function isMobileDevice() {
    const userAgent = navigator.userAgent;
    const mobileKeywords = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

    return mobileKeywords.some(keyword => userAgent.includes(keyword));
}

function updateBoard({ animateMoves = false } = {}) {
    const board = document.getElementById('gameBoard');
    const previous = new Map(Array.from(board.querySelectorAll('.team-token')).map(token => [token.dataset.team, token.getBoundingClientRect()]));
    const cells = Array.from(board.children);
    cells.forEach((cell, position) => {
        cell.innerHTML = '';
        cell.classList.remove('board-cell-powerup', 'board-cell-landed-powerup', 'board-cell-trail', 'board-cell-moving', 'board-cell-effect');
        if (chaosVisual) {
            const current = Math.min(teams[chaosVisual.actorIndex].points, pointsToWin);
            const from = chaosVisual.from;
            if (position >= Math.min(from, current) && position <= Math.max(from, current)) cell.classList.add('board-cell-trail');
            if (position === current) cell.classList.add('board-cell-moving');
            if (['landing', 'effect', 'complete', 'choice'].includes(chaosVisual.phase) && position === chaosVisual.landing?.tileIndex) {
                cell.classList.add('board-cell-landed-powerup');
                if (chaosVisual.phase === 'effect') cell.classList.add('board-cell-effect');
            }
        }
        const number = document.createElement('span'); number.className = 'cell-number';
        number.textContent = position === 0 ? 'Start' : position === pointsToWin ? 'Finish' : String(position);
        cell.appendChild(number);
        const occupying = teams.map((team, index) => ({ team, index })).filter(({ team }) => Math.min(team.points, pointsToWin) === position
            && (!isOnlineGame || (team.players || []).length > 0));
        cell.setAttribute('aria-label', `${position === pointsToWin ? 'Finish' : 'Position'} ${position}${occupying.length ? ', Team ' + occupying.map(t => t.index + 1).join(', ') : ''}`);
        const tokens = document.createElement('div'); tokens.className = 'board-tokens';
        occupying.forEach(({ index }) => {
            const token = document.createElement('span'); token.className = 'team-token';
            token.dataset.team = String(index);
            token.style.backgroundColor = getTeamColor(index); token.textContent = String(index + 1);
            if (isOnlineGame && !(teams[index].players || []).some(player => OnlineState.isConnected(onlineClient.snapshot, player, onlineClient.serverNow()))) {
                token.classList.add('team-token-disconnected'); token.setAttribute('aria-label', `Team ${index + 1}, reconnecting`);
            }
            tokens.appendChild(token);
        });
        cell.appendChild(tokens);
        for (const token of tokens.children) {
            const before = previous.get(token.dataset.team);
            if (!animateMoves || reducedMotion() || !before || typeof token.animate !== 'function') continue;
            const after = token.getBoundingClientRect(), x = before.left - after.left, y = before.top - after.top;
            if (Math.abs(x) + Math.abs(y) < 1) continue;
            token.animate([{ transform: `translate(${x}px, ${y}px) scale(1)` },
                { transform: `translate(${x * .45}px, ${y * .45 - 9}px) scale(1.12)`, offset: .55 },
                { transform: 'translate(0, 0) scale(1)' }], { duration: 280, easing: 'ease-out' });
        }
        const type = isChaosMode && powerupRevealVisible && position > 0 && position < pointsToWin - 1 ? sanitizeChaosPowerupType(roundPowerups[position]) : null;
        if (type) {
            const badge = document.createElement('span'); badge.className = `board-powerup ${CHAOS_POWERUP_TYPES[type].cssClass}`;
            if (chaosVisual?.phase === 'reveal') badge.classList.add('board-powerup-reveal');
            badge.textContent = CHAOS_POWERUP_TYPES[type].label;
            cell.appendChild(badge); cell.classList.add('board-cell-powerup');
            if (landedPowerupPreview?.tileIndex === position) cell.classList.add('board-cell-landed-powerup');
        }
    });
    updateTeamScores();
}

function updateTeamScores() {
    const container = document.getElementById('teamScores'); container.innerHTML = '';
    ensureLocalChaosState(teams.length || numTeams || 2);
    teams.forEach((team, index) => {
        const row = document.createElement('div'); row.className = 'team-score';
        row.textContent = `Team ${index + 1}: ${team.points}/${pointsToWin}`;
        if (isOnlineGame && !(team.players || []).length) {
            row.textContent = `Team ${index + 1}: waiting for players`; row.classList.add('is-empty');
        } else if (isOnlineGame && !(team.players || []).some(player => OnlineState.isConnected(onlineClient.snapshot, player, onlineClient.serverNow()))) {
            row.textContent += ' · Reconnecting'; row.classList.add('is-disconnected');
        }
        if (isChaosMode && Number(teamShields[index]) > 0) {
            const badge = document.createElement('span'); badge.className = 'shield-indicator';
            badge.textContent = 'Shield ready (max 1)'; row.appendChild(badge);
        }
        const rerollEnabled = isOnlineGame ? onlineClient?.snapshot?.settings?.chaosReroll : document.getElementById('chkReroll').checked;
        if (isChaosMode && rerollEnabled) {
            const used = isOnlineGame ? onlineClient.snapshot.chaos?.rerollsUsed?.[index] : localRerollsUsed[index];
            const badge = document.createElement('span'); badge.className = 'shield-indicator';
            badge.textContent = used ? 'Reroll used' : 'Reroll ready'; row.appendChild(badge);
        }
        row.style.color = getTeamColor(index); container.appendChild(row);
    });
    document.getElementById('progressSummary').textContent = teams.map((team, index) => `Team ${index + 1}: ${team.points}/${pointsToWin}`).join(' · ');
}

function getTeamColor(teamIndex) {
    return ['#174ea6', '#b91c1c', '#166534', '#92400e'][teamIndex] || '#222222';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateCurrentTeamIndicator() {
    if (!isOnlineGame && !isRoundActive && btnAnswers.hidden) document.getElementById('roleInstruction').textContent = `Team ${currentTeam}'s next speaker: start when everyone is ready.`;
    const currentTeamIndicator = document.getElementById("currentTeamIndicator");
    const speakerName = isOnlineGame ? getSpeakerName() : null;
    const indicatorText = isOnlineGame
        ? `Current Team: Team ${currentTeam}${speakerName ? ` (${speakerName})` : " (Waiting for player)"}`
        : `Current Team: Team ${currentTeam}`;

    if (!currentTeamIndicator) {
        const indicator = document.createElement("div");
        indicator.id = "currentTeamIndicator";
        indicator.textContent = indicatorText;
        indicator.style.color = getTeamColor(getCurrentTeamIndex(currentTeam));
        document.getElementById("game").prepend(indicator);
    } else {
        currentTeamIndicator.textContent = indicatorText;
        currentTeamIndicator.style.color = getTeamColor(getCurrentTeamIndex(currentTeam));
    }
}

function getSpeakerName() {
    const teamIndex = getCurrentTeamIndex(currentTeam);
    const team = teams[teamIndex];

    if (!team || !team.players) {
        return null;
    }

    const speaker = team.players.find(player => player.isSpeaker === true);
    return speaker ? speaker.playerName : null;
}

function createTeamAuditTables(numTeams, options = {}) {
    const { forceReset = false } = options;
    const tableContainer = document.getElementById('table-container');
    const existingTables = tableContainer.querySelectorAll('table[id^="table"]').length;
    if (!forceReset && existingTables === numTeams && existingTables > 0) {
        return;
    }

    tableContainer.innerHTML = '';
    for (let i = 0; i < numTeams; i++) {
        const table = document.createElement('table');
        table.id = `table${i}`;

        const header = table.createTHead();
        const headerRow = header.insertRow(0);
        const teamHeaderCell = document.createElement('th');
        teamHeaderCell.colSpan = 2;
        teamHeaderCell.innerText = `Team ${i + 1}`;
        headerRow.appendChild(teamHeaderCell);

        const columnHeaderRow = header.insertRow(1);
        const roundHeader = document.createElement('th');
        roundHeader.textContent = "Round";
        const answersHeader = document.createElement('th');
        answersHeader.textContent = "Answers";
        columnHeaderRow.appendChild(roundHeader);
        columnHeaderRow.appendChild(answersHeader);

        const tBody = table.createTBody();
        const emptyRow = tBody.insertRow(0);
        emptyRow.dataset.placeholder = "true";
        const emptyCell = emptyRow.insertCell(0);
        emptyCell.colSpan = 2;
        emptyCell.textContent = "No rounds recorded yet.";

        tableContainer.appendChild(table);
    }
}

function createTeamAuditColumns(tableIndex, roundNumber = currentRound + 1) {
    const table = document.getElementById(`table${tableIndex}`);
    if (table) {
        const existingRow = table.tBodies[0]?.querySelector(`tr[data-round="${roundNumber}"]`);
        if (existingRow) {
            return;
        }
    } else {
        console.error(`Table with index ${tableIndex} does not exist.`);
    }
}

function createTeamAuditRows(tableIndex, roundNumber = currentRound + 1, correctAnswers = [], options = {}) {
    const table = document.getElementById(`table${tableIndex}`);
    if (table) {
        const existingRow = table.tBodies[0].querySelector(`tr[data-round="${roundNumber}"]`);
        if (existingRow) {
            return;
        }

        const placeholderRow = table.tBodies[0].querySelector('tr[data-placeholder="true"]');
        if (placeholderRow) {
            placeholderRow.remove();
        }

        const row = table.tBodies[0].insertRow(-1);
        row.dataset.round = String(roundNumber);

        const roundCell = row.insertCell(0);
        roundCell.textContent = String(roundNumber);

        const answersCell = row.insertCell(1);
        const answersText = Array.isArray(correctAnswers) && correctAnswers.length > 0
            ? correctAnswers.join(", ")
            : "0";
        const chaosText = typeof options.chaosSummary === "string" && options.chaosSummary.trim().length > 0
            ? ` | Chaos: ${options.chaosSummary.trim()}`
            : "";
        answersCell.textContent = `${answersText}${chaosText}`;
        if (options.modeSummary) answersCell.textContent += ` | ${options.modeSummary}`;
    } else {
        console.error(`Table with index ${tableIndex} does not exist.`);
    }
}

// Helper methods
function toggleVisibility(element) {
    element.hidden = !element.hidden;
}

function hideElement(element) {
    element.hidden = true;
}

function showElement(element) {
    element.hidden = false;
}

function getCurrentTeamIndex(currentTeam) {
    return currentTeam - 1;
}

function enforceMinMax(el) {
    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
    }
}

function getModalInstance(modalId) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
        return null;
    }

    return bootstrap.Modal.getOrCreateInstance(modalElement);
}

function focusElementSafely(element) {
    if (!(element instanceof HTMLElement)) {
        return false;
    }

    try {
        element.focus({ preventScroll: true });
        return true;
    } catch (_) {
        try {
            element.focus();
            return true;
        } catch (_) {
            return false;
        }
    }
}

function getModalFocusReturnTarget(modalElement) {
    if (!(modalElement instanceof HTMLElement)) {
        return null;
    }

    const returnFocusId = String(modalElement.dataset.returnFocusId || "").trim();
    if (!returnFocusId) {
        return null;
    }

    const target = document.getElementById(returnFocusId);
    if (!(target instanceof HTMLElement)) {
        return null;
    }

    return target;
}

function registerModalFocusGuards(modalId) {
    if (!modalId || registeredModalFocusHandlers.has(modalId)) {
        return;
    }

    const modalElement = document.getElementById(modalId);
    if (!(modalElement instanceof HTMLElement)) {
        return;
    }

    registeredModalFocusHandlers.add(modalId);
    modalElement.addEventListener('keydown', event => cycleModalFocus(modalElement, event));

    modalElement.addEventListener("show.bs.modal", (event) => {
        modalElement.inert = false;
        const relatedTarget = event?.relatedTarget;
        if (relatedTarget instanceof HTMLElement && relatedTarget.id) {
            modalElement.dataset.returnFocusId = relatedTarget.id;
        }
    });

    modalElement.addEventListener("hide.bs.modal", () => {
        modalElement.inert = true;
        const active = document.activeElement;
        if (!(active instanceof HTMLElement) || !modalElement.contains(active)) {
            return;
        }

        const returnTarget = getModalFocusReturnTarget(modalElement);
        if (returnTarget && returnTarget !== active) {
            const moved = focusElementSafely(returnTarget);
            if (moved) {
                return;
            }
        }

        active.blur();
    });

    modalElement.addEventListener("hidden.bs.modal", () => {
        modalElement.inert = true;
        const active = document.activeElement;
        if (active instanceof HTMLElement && modalElement.contains(active)) {
            active.blur();
        }

        const returnTarget = getModalFocusReturnTarget(modalElement);
        if (returnTarget && returnTarget !== document.activeElement) {
            focusElementSafely(returnTarget);
        }
    });
}

function cycleModalFocus(modalElement, event) {
    if (event.key !== 'Tab' || !modalElement.classList.contains('show')) return;
    const controls = Array.from(modalElement.querySelectorAll('a[href], button, input, select, textarea, [tabindex]'))
        .filter(node => !node.disabled && node.tabIndex >= 0 && node.getClientRects().length && !node.closest('[inert]'));
    if (!controls.length) { event.preventDefault(); modalElement.focus(); return; }
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === modalElement)) {
        event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
    }
}

function hideModalById(modalId) {
    registerModalFocusGuards(modalId);
    const modalElement = document.getElementById(modalId);
    if (modalElement instanceof HTMLElement) {
        const active = document.activeElement;
        if (active instanceof HTMLElement && modalElement.contains(active)) {
            const returnTarget = getModalFocusReturnTarget(modalElement);
            if (returnTarget && returnTarget !== active) {
                const moved = focusElementSafely(returnTarget);
                if (!moved) {
                    active.blur();
                }
            }
            else {
                active.blur();
            }
        }
    }

    const modalInstance = getModalInstance(modalId);
    if (modalInstance) {
        if (modalElement.classList.contains('show')) {
            // Bootstrap ignores hide() during its opening transition. A fast
            // join must still close the lobby modal once that transition ends.
            const hideAfterShow = () => modalInstance.hide();
            modalElement.addEventListener('shown.bs.modal', hideAfterShow, { once: true });
            modalElement.addEventListener('hidden.bs.modal', () => {
                modalElement.removeEventListener('shown.bs.modal', hideAfterShow);
            }, { once: true });
        }
        modalInstance.hide();
    }
}

function registerModal(modalButton, modalId) {
    if (!modalButton) {
        return;
    }

    const registrationKey = `${modalButton.id}:${modalId}`;
    if (registeredModalHandlers.has(registrationKey)) {
        return;
    }

    registerModalFocusGuards(modalId);
    registeredModalHandlers.add(registrationKey);
    modalButton.addEventListener("click", () => {
        const modalElement = document.getElementById(modalId);
        if (modalElement instanceof HTMLElement && modalButton.id) {
            modalElement.dataset.returnFocusId = modalButton.id;
        }

        const modalInstance = getModalInstance(modalId);
        if (modalInstance) {
            modalInstance.show();
        }
    });
}

function generateGameCode(length = 4, alphanumeric = false) {
    const characters = alphanumeric ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let gameCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        gameCode += characters[randomIndex];
    }
    return gameCode;
}

function showNotification(bgColorClass, textColorClass, headerText, bodyText, autoHideDuration = null) {
    const toast = document.getElementById('playerToast');
    const toastHeader = toast.querySelector('.toast-header');
    const toastBody = toast.querySelector('.toast-body');

    // Apply the color classes
    toast.classList.remove(...toast.classList); // Remove all existing classes
    toast.classList.add("toast", bgColorClass, textColorClass);

    // Set the header and body text
    const headerStrong = toastHeader.querySelector('strong');
    headerStrong.textContent = headerText; // Update only the strong element in the header
    toastBody.textContent = bodyText;

    // Initialize and show the toast
    const options = {};
    if (autoHideDuration !== null) {
        options.delay = autoHideDuration * 1000; // Convert seconds to milliseconds
    }

    const bsToast = new bootstrap.Toast(toast, options);
    bsToast.show();
}

function readOnlineSession() {
    try { return JSON.parse(sessionStorage.getItem(ONLINE_SESSION_KEY) || 'null'); }
    catch (_) { return null; }
}

function saveOnlineSession(value) {
    try {
        if (value) sessionStorage.setItem(ONLINE_SESSION_KEY, JSON.stringify(value));
        else sessionStorage.removeItem(ONLINE_SESSION_KEY);
    } catch (_) { /* Play still works when browser storage is unavailable. */ }
}

function onlineIdentity(code, fresh = false) {
    const saved = fresh ? null : readOnlineSession();
    const name = sanitizePlayerName(txtPlayerName.value);
    return {
        playerId: saved?.code === code && normalizeWord(saved.playerName) === normalizeWord(name)
            ? saved.playerId : crypto.randomUUID(),
        connectionId: crypto.randomUUID(),
        playerName: name
    };
}

async function restoreOnlineSession() {
    const saved = readOnlineSession();
    if (!saved?.playerId || !/^[A-Z]{4}$/.test(saved.code || '') || !saved.playerName) return;
    txtPlayerName.value = saved.playerName;
    txtGameCode.value = saved.code;
    await joinGameLobby();
}

async function sendOnlineCommand(action) {
    try { return await onlineClient?.command(action); }
    catch (error) {
        console.error('Online action failed:', error);
        lblGameState.textContent = 'Unable to save that action. Check your connection and retry.';
        showElement(lblGameState);
        return false;
    }
}

function getOnlineWordObjects(settings, wordPack = null) {
    const shared = normalizeOnlinePack(wordPack);
    const selectedCategories = Array.isArray(settings.selectedCategories) ? settings.selectedCategories : [];
    const selectedTheme = settings.selectedTheme || 'None';
    const objects = shared ? shared.entries : selectedTheme !== 'None'
        ? (themes[selectedTheme] || [])
        : (selectedCategories.length ? selectedCategories : Object.keys(categories))
            .flatMap(category => categories[category] || []);
    return dedupeWordObjects(objects).filter(word => !settings.difficulty || settings.difficulty === 'normal' || word.difficulty === settings.difficulty);
}

function drawOnlineWords(gameData, seed) {
    const settings = sanitizeGameSettingsFromDb(gameData.settings, gameData.teams.length);
    const entries = !isOnlineGame && Array.isArray(gameData.localEntries) ? gameData.localEntries : getOnlineWordObjects(settings, gameData.wordPack);
    const draw = Gameplay.drawWords(entries, gameData.deck || {}, settings.difficulty, settings.numWords, seed);
    const aliases = draw.words.flatMap(word => { const entry = entries.find(item => Gameplay.answerKey(item.word) === Gameplay.answerKey(word)); return entry?.canonical ? [word, entry.canonical] : [word]; });
    return { words: draw.words, aliases, pools: { deck: draw.deck, deckRecycled: draw.recycled,
        easyWords: [], hardWords: [], currentGameWords: [] } };
}

function planOnlineChaos(gameData, basePoints) {
    const rng = createSeededRandom(gameData.turn.seed);
    const powerups = generateRoundPowerupsMap(gameData.settings.pointsToWin, rng);
    const actorIndex = gameData.turn.teamIndex;
    const temporaryTeams = basePoints.map(points => ({ points }));
    const shields = normalizeTeamShields(gameData.chaos?.teamShields || [], gameData.teams.length);
    const tileIndex = getBoardCellIndexForPoints(basePoints[actorIndex], gameData.settings.pointsToWin);
    const won = basePoints[actorIndex] >= gameData.settings.pointsToWin;
    const type = won ? null : powerups[tileIndex] || null;
    const effect = applyChaosPowerupToState({ teamsData: temporaryTeams, shields, actingTeamIndex: actorIndex, powerupType: type, rng });
    const moveCount = (gameData.turn.selectedIndexes || []).length;
    return {
        basePoints, points: temporaryTeams.map(team => team.points), shields, powerups, actorIndex,
        landing: type ? { teamIndex: actorIndex, tileIndex, type } : null,
        effect, summary: formatChaosSummaryForAudit(effect), moveCount,
        actorDelta: effect.actorDelta, victimTeamIndex: effect.victimTeamIndex, victimDelta: effect.victimDelta,
        durationMs: Gameplay.resolutionDuration(Boolean(type), won, moveCount)
    };
}

function renderOnlineClock() {
    const data = onlineClient?.snapshot;
    if (!data || !isOnlineGame) return;
    const now = onlineClient.serverNow(), view = OnlineState.view(data, onlineClient.actor, now);
    setRoundCountdown(onlineClient.connected && view.active ? view.countdownRemainingMs : 0);
    timer.hidden = !(onlineClient.connected && view.active && data.phase === 'describing' && !view.countdownRemainingMs);
    syncTickSound(view.remainingSeconds, !timer.hidden);
    if (view.countdownRemainingMs && onlineClient.connected && view.active) {
        const cue = `${data.matchId}:${data.turn.id}:countdown`;
        if (cue !== lastOnlineCue) {
            lastOnlineCue = cue;
            void playSound(countdownSound, () => false, 1, Math.max(0, (now - data.turn.countdownAt) / 1000));
        }
    } else { countdownSound.pause(); countdownSound.currentTime = 0; }
    if (!timer.hidden) {
        const text = String(view.remainingSeconds);
        if (timer.textContent !== text) timer.textContent = text;
        const cue = `${data.matchId}:${data.turn.id}:warning`;
        if (view.remainingSeconds <= 5 && cue !== lastOnlineCue) { lastOnlineCue = cue; void playSound(warningSound, () => false); }
    }
    if (data.phase !== 'resolving') return;
    renderResolutionFrame(data.turn.resolution, now - data.turn.resolution.startedAt);
}

function renderResolutionFrame(plan, elapsed) {
    const actorIndex = plan.actorIndex ?? plan.landing?.teamIndex ?? (currentTeam - 1);
    const reduced = reducedMotion();
    const timing = Gameplay.resolutionTiming(Boolean(plan.landing), plan.basePoints[actorIndex] >= pointsToWin, plan.moveCount);
    // Stored plans own their deadline, including plans made by an older client.
    const scale = plan.durationMs / timing.durationMs;
    const revealStart = timing.boardMs * scale;
    const moveStart = (timing.boardMs + timing.revealMs) * scale;
    const moveEnd = moveStart + timing.moveMs * scale;
    const effectStart = moveEnd + timing.landingMs * scale;
    const effectEnd = effectStart + timing.effectMs * scale;
    const baseRatio = reduced ? 1 : Math.min(1, Math.max(0, (elapsed - moveStart) / (timing.moveMs * scale)));
    const effectRatio = reduced || !plan.landing ? 1 : Math.min(1, Math.max(0, (elapsed - effectStart) / (timing.effectMs * scale)));
    const phase = reduced || elapsed >= effectEnd ? 'complete' : elapsed < revealStart ? 'board'
        : elapsed < moveStart ? 'reveal' : baseRatio < 1 ? 'moving'
        : elapsed < effectStart ? 'landing' : 'effect';
    const display = [...plan.basePoints];
    display[actorIndex] = plan.basePoints[actorIndex] - plan.moveCount + Math.floor(plan.moveCount * baseRatio)
        + Math.sign(plan.actorDelta) * Math.floor(Math.abs(plan.actorDelta) * effectRatio);
    if (Number.isInteger(plan.victimTeamIndex)) display[plan.victimTeamIndex] += Math.sign(plan.victimDelta) * Math.floor(Math.abs(plan.victimDelta) * effectRatio);
    showRecap('');
    const signature = JSON.stringify([display, phase, effectRatio === 1, plan.landing]);
    if (signature === onlineBoardSignature) return;
    onlineBoardSignature = signature;
    teams.forEach((team, index) => { team.points = display[index]; });
    if (effectRatio === 1) teamShields = [...plan.shields];
    chaosVisual = { actorIndex, phase, from: plan.basePoints[actorIndex] - plan.moveCount, landing: plan.landing };
    roundPowerups = plan.powerups; powerupRevealVisible = phase !== 'board';
    landedPowerupPreview = ['landing', 'effect', 'complete'].includes(phase) ? plan.landing : null;
    const effectName = CHAOS_POWERUP_TYPES[plan.landing?.type]?.legendLabel;
    const team = `Team ${actorIndex + 1}`;
    const outcome = Gameplay.effectMessage(plan.effect);
    const result = chaosOutcomePresentation({ teamIndex: actorIndex, earned: plan.moveCount,
        pointsBefore: plan.basePoints[actorIndex] - plan.moveCount, pointsAfter: plan.points[actorIndex], effect: plan.effect });
    const message = phase === 'board' ? 'Watch the board…' : phase === 'reveal' ? 'Power-ups revealed!'
        : phase === 'moving' ? (plan.moveCount ? `${team} moves ${plan.moveCount} ${plan.moveCount === 1 ? 'space' : 'spaces'}…` : `${team} stays on this space…`)
        : phase === 'landing' ? `${effectName}!` : phase === 'effect' ? Gameplay.effectMessage(plan.effect)
        : display[actorIndex] >= pointsToWin ? `${team} reached the finish!` : outcome || 'Safe landing!';
    setChaosPresentation(phase, message, ['effect', 'complete'].includes(phase) ? result.tone : 'neutral', {
        teamIndex: actorIndex, icon: ['board', 'reveal'].includes(phase) ? '✦' : phase === 'moving' ? '→' : result.icon,
        detail: ['board', 'reveal'].includes(phase) ? `${team} is about to move. Watch where they land.`
            : phase === 'moving' ? `From space ${plan.basePoints[actorIndex] - plan.moveCount} to space ${Math.min(plan.basePoints[actorIndex], pointsToWin)}.`
            : phase === 'landing' ? `${team} landed on space ${plan.basePoints[actorIndex]}. The effect is about to happen…` : result.detail,
        earned: plan.moveCount, total: phase === 'complete' ? plan.points[actorIndex] : null
    });
    updateBoard({ animateMoves: true });
}

function chaosOutcomePresentation(event) {
    const effect = event.effect || {}, team = `Team ${event.teamIndex + 1}`;
    const landed = (event.pointsBefore || 0) + event.earned, after = event.pointsAfter;
    const icon = effect.blockedByShield ? '🛡️' : ({ plus1: '↑', plus2: '↑', minus1: '↓', minus2: '↓', bomb: '💣', shield: '🛡️', steal1: '↔' })[effect.type] || '✓';
    let detail = after !== landed ? `${team} landed on space ${landed} and ${after < landed ? 'moved back' : 'advanced'} to space ${after}.`
        : event.earned ? `${team} landed on space ${Math.min(after, pointsToWin)}.` : `${team} stays on space ${after}.`;
    if (effect.blockedByShield) detail += ' The shield was used to block the penalty.';
    if (Number.isInteger(effect.victimTeamIndex)) detail += effect.victimBlocked
        ? ` Team ${effect.victimTeamIndex + 1}'s shield blocked the steal and was used up.`
        : effect.victimDelta < 0 ? ` Team ${effect.victimTeamIndex + 1} moved back one space.` : '';
    return { message: Gameplay.effectMessage(effect) || 'Safe landing!', detail, icon,
        tone: effect.blockedByShield || effect.victimBlocked ? 'protected' : effect.actorDelta < 0 ? 'negative' : 'positive' };
}

function showChaosOutcome(event) {
    const result = chaosOutcomePresentation({ ...event, earned: event.earned ?? event.correctAnswers?.length ?? 0 });
    showRecap('');
    setChaosPresentation('complete', result.message, result.tone, { ...result, teamIndex: event.teamIndex,
        earned: event.earned ?? event.correctAnswers?.length ?? 0, total: event.pointsAfter, persistent: true });
}

function setChaosPresentation(phase, message, tone = 'neutral', details = {}) {
    game.classList.toggle('resolving-board', !details.persistent);
    const panel = document.getElementById('chaosResolution'); panel.hidden = false; panel.dataset.tone = tone; panel.dataset.phase = phase;
    panel.setAttribute('aria-label', phase === 'complete' ? 'Chaos turn result' : 'Chaos turn progress');
    const step = ({ board: 'The board', reveal: 'Power-ups', moving: 'Move', landing: 'Landed', effect: 'Chaos!', complete: 'Turn result', choice: 'Choose your effect' })[phase];
    document.getElementById('chaosStep').textContent = `${Number.isInteger(details.teamIndex) ? 'Team ' + (details.teamIndex + 1) + ' · ' : ''}${step}`;
    const node = document.getElementById('chaosMessage');
    if (node.textContent !== message) node.textContent = message;
    document.getElementById('chaosIcon').textContent = details.icon || '?';
    document.getElementById('chaosDetail').textContent = details.detail || '';
    document.getElementById('chaosScoreline').hidden = details.total == null;
    document.getElementById('chaosEarned').textContent = `${details.earned || 0} correct ${details.earned === 1 ? 'answer' : 'answers'}`;
    document.getElementById('chaosTotal').textContent = `${details.total} ${details.total === 1 ? 'point' : 'points'}`;
}

function showChaosChoicePreview(plan) {
    const actorIndex = plan.actorIndex;
    chaosVisual = { actorIndex, phase: 'choice', from: plan.basePoints[actorIndex] - plan.moveCount, landing: plan.landing };
    roundPowerups = plan.powerups; powerupRevealVisible = true; landedPowerupPreview = plan.landing;
    setChaosPresentation('choice', `Team ${actorIndex + 1}'s landing: ${CHAOS_POWERUP_TYPES[plan.landing.type].legendLabel}`);
    updateBoard();
}

function clearChaosPresentation() {
    const hadVisual = Boolean(chaosVisual);
    chaosVisual = null; onlineBoardSignature = '';
    game.classList.remove('resolving-board');
    document.getElementById('chaosResolution').hidden = true;
    if (hadVisual) updateBoard();
}

function updateLobbyPresentation(data = null, view = null) {
    const joined = Boolean(data), label = joined ? 'Lobby' : 'Play online';
    document.getElementById('onlineLabel').textContent = label;
    btnOnline.title = label; btnOnline.setAttribute('aria-label', label);
    document.getElementById('onlineModalLabel').textContent = label;
    const summary = document.getElementById('lobbySummary'); summary.hidden = !joined;
    let text = '';
    if (joined) {
        const roster = view.roster;
        text = `${roster.connectedPlayers} ${roster.connectedPlayers === 1 ? 'player' : 'players'} connected · ${roster.connectedTeams} of ${data.teams.length} teams online`;
        if (Modes.isParty(data.settings)) text = `${Modes.MODES[Modes.modeOf(data.settings)].name} · ${roster.connectedPlayers} players connected`;
        if (roster.reconnectingPlayers) text += ` · ${roster.reconnectingPlayers} reconnecting`;
        if (!Modes.isParty(data.settings)) text += ` · ${Gameplay.winRuleLabel(data.settings.winRule)}`;
        if (data.wordPack) text += ` · Custom pack: ${data.wordPack.entries.length} ${data.wordPack.entries.length === 1 ? 'word' : 'words'}`;
    }
    if (summary.textContent !== text) summary.textContent = text;
    document.getElementById('onlineIntro').textContent = joined ? text : 'Bring your group together in one lobby.';
}

function renderFinalRoundNotice(progress) {
    const node = document.getElementById('finalRoundNotice');
    const data = isOnlineGame ? onlineClient?.snapshot : null;
    const pack = data?.wordPack?.entries || (!data ? localWordObjects : null);
    const available = pack ? pack.filter(entry => difficulty === 'normal' || entry.difficulty === difficulty).length : numWords;
    const context = Experience.finishContext(progress, teams.map(team => team.points), currentTeam - 1, isChaosMode || Modes.isStakes({ mode: activeMode }), Math.min(numWords, available));
    const text = [Gameplay.finalRoundMessage(progress), context].filter(Boolean).join(' ');
    node.hidden = !text;
    if (node.textContent !== text) node.textContent = text;
}

function renderOnlineRoundReview(review) {
    const section = document.getElementById('onlineRoundReview');
    const words = review?.words || [];
    section.hidden = !words.length;
    if (section.hidden) {
        if (section.dataset.signature) {
            document.getElementById('roundReviewTitle').textContent = '';
            document.getElementById('roundReviewSummary').textContent = '';
            document.getElementById('roundReviewAnswers').innerHTML = '';
        }
        section.dataset.signature = ''; return;
    }
    const signature = JSON.stringify([review.teamIndex, words, review.selectedIndexes]);
    if (section.dataset.signature === signature) return;
    section.dataset.signature = signature;
    const selected = new Set(review.selectedIndexes || []);
    document.getElementById('roundReviewTitle').textContent = `Team ${review.teamIndex + 1}'s answers`;
    document.getElementById('roundReviewSummary').textContent = `${selected.size} of ${words.length} marked correct · Confirmed`;
    const list = document.getElementById('roundReviewAnswers'); list.innerHTML = '';
    words.forEach((word, index) => {
        const row = document.createElement('li'); row.className = 'review-answer';
        row.classList.toggle('is-correct', selected.has(index));
        const mark = document.createElement('span'); mark.className = 'review-answer-mark';
        mark.textContent = selected.has(index) ? '✓' : '—'; mark.setAttribute('aria-hidden', 'true');
        const label = document.createElement('span'); label.textContent = word;
        const status = document.createElement('span'); status.className = 'visually-hidden';
        status.textContent = selected.has(index) ? 'Marked correct' : 'Not marked correct';
        row.appendChild(mark); row.appendChild(label); row.appendChild(status); list.appendChild(row);
    });
}

function renderOnlineControls() {
    if (isReturningToSetup) return;
    const data = onlineClient?.snapshot;
    if (!data || !isOnlineGame) return;
    if (Modes.isParty(data.settings)) { renderPartyOnline(data); return; }
    if (!['resolving', 'chaos-choice'].includes(data.phase)) {
        clearChaosPresentation();
        if (isChaosMode && data.auditEvent && ['idle', 'waiting'].includes(data.phase)) showChaosOutcome(data.auditEvent);
    }
    const view = OnlineState.view(data, onlineClient.actor, onlineClient.serverNow());
    updateLobbyPresentation(data, view);
    setRoundCountdown(onlineClient.connected && view.active ? view.countdownRemainingMs : 0);
    const active = view.active && onlineClient.connected && !onlineClient.suspended;
    renderFinalRoundNotice(Gameplay.matchProgress(data.teams.map(team => team.points), pointsToWin,
        Object.values(data.auditEvents || {}), data.finalTurnCount, data.settings.winRule));
    renderOnlineRoundReview(active && data.phase !== 'selecting' ? view.review : null);
    document.getElementById('currentTeamIndicator').hidden = data.phase === 'finished';
    isHost = active && view.host; isSpeaker = active && view.speaker;
    isRoundActive = data.phase === 'describing';
    endRoundEarly = Boolean(data.endRoundEarly);
    selectedButtons = (data.turn?.selectedIndexes || []).length;
    const busy = onlineClient.busy || onlineClient.registering;
    btnStartOnlineGame.hidden = !isHost || Boolean(data.isGameStarted);
    btnStartOnlineGame.disabled = busy || !view.canStartGame;
    btnStartRound.hidden = !(active && view.canStartRound); btnStartRound.disabled = busy;
    btnEndRound.hidden = !(active && view.canEndRound); btnEndRound.disabled = busy;
    btnNextRound.hidden = !(active && view.canSelect); btnNextRound.disabled = busy;
    btnEndGame.hidden = !isHost || ['ended', 'finished', 'resolving', 'chaos-choice'].includes(data.phase);
    btnEndGame.disabled = busy;
    document.getElementById('leaveOnlineGame').hidden = false;
    const rejoin = document.getElementById('rejoinOnlineGame');
    rejoin.hidden = Boolean((view.active && !onlineClient.error) || data.phase === 'ended' || onlineClient.registering);
    rejoin.disabled = busy;
    btnAnswers.hidden = !(active && view.showWords);
    const words = data.turn?.words || [], selected = new Set(data.turn?.selectedIndexes || []);
    document.querySelectorAll('.scoreButton').forEach((button, index) => {
        button.hidden = btnAnswers.hidden || index >= words.length;
        button.disabled = busy || !view.canSelect;
        button.textContent = view.showWords ? words[index] || '' : '';
        setScoreButtonSelected(button, selected.has(index));
    });
    const speaker = OnlineState.members(data).find(player => player.playerId === data.turn?.speakerId);
    const name = speaker?.playerName || 'The next speaker';
    const smallGame = view.smallGame;
    let role = '';
    if (data.phase === 'describing') role = isSpeaker ? 'You are speaking. Describe these words in any order.'
        : smallGame ? `${name} is speaking. Guess aloud; answers stay hidden.`
        : view.player?.teamIndex === data.turn?.teamIndex ? `${name} is speaking for your team. Guess aloud; answers stay hidden.`
        : `${name} is speaking for Team ${data.turn.teamIndex + 1}. Watch the clues and the timer.`;
    if (data.phase === 'selecting') role = isSpeaker ? 'Select the words guessed correctly, then confirm.' : `${name} is selecting the correct answers. Watch the selections below.`;
    if (data.phase === 'idle') {
        const opening = !Object.keys(data.auditEvents || {}).length;
        const starterTeam = data.starterTeam ?? data.turn.teamIndex;
        const starter = opening ? `Team ${starterTeam + 1} ${data.matchId > 1 ? 'starts this rematch' : 'was drawn to start'}. ` : '';
        role = starter + (isSpeaker ? `You're up next, ${name}. Start when everyone is ready.` : `${name} speaks next for Team ${data.turn.teamIndex + 1}.`);
    }
    if (data.phase === 'resolving') role = `Watch Team ${data.turn.teamIndex + 1} on the board.`;
    if (data.phase === 'ready') role = `${data.starterTeam === undefined ? 'The starting team is drawn on start.' : `Team ${data.starterTeam + 1} starts.`} ${isHost ? 'Start when everyone is ready.' : 'Waiting for the host to start.'}`;
    if (data.phase === 'waiting') role = 'Waiting for enough players to continue.';
    if (['ready', 'waiting', 'idle'].includes(data.phase) && !view.roster.eligible) role = 'Waiting for enough connected players, with someone on each team.';
    if (view.countdownRemainingMs) role = `Team ${data.turn.teamIndex + 1}: get ready to describe and guess.`;
    if (data.phase === 'finished') role = 'Match complete. Compare scores or play again.';
    document.getElementById('roleInstruction').textContent = role;
    lblAnswers.textContent = data.phase === 'selecting' ? 'Correct answers:' : isSpeaker ? 'Describe these words:' : `${name}'s words:`;
    if (active && isSpeaker && data.phase === 'describing' && !view.countdownRemainingMs) renderTrainingHints(words); else clearTrainingHints();
    let status = '';
    if (!onlineClient.connected || onlineClient.suspended) status = 'Connection lost. Reconnecting…';
    else if (!view.player) status = 'Your seat is no longer active. Rejoin the lobby to play.';
    else if (!view.active) status = 'Rejoin the lobby to restore your connection.';
    else if (speaker && !OnlineState.isConnected(data, speaker, onlineClient.serverNow()) && ['idle', 'describing', 'selecting'].includes(data.phase)) status = 'Waiting for the speaker to reconnect…';
    else if (data.phase === 'describing' && data.deckRecycled?.length) status = `This pack has exhausted its ${data.deckRecycled.join(' and ')} answers; that difficulty is reshuffled.`;
    lblGameState.hidden = !status; lblGameState.textContent = status;
    const choice = document.getElementById('chaosChoice'); choice.hidden = data.phase !== 'chaos-choice';
    if (!choice.hidden) {
        showChaosChoicePreview(data.turn.resolution);
        const remaining = Math.max(0, Math.ceil((data.turn.choiceDeadline - onlineClient.serverNow()) / 1000));
        const effect = data.turn.resolution.landing?.type;
        document.getElementById('chaosChoiceText').textContent = `${CHAOS_POWERUP_TYPES[effect]?.legendLabel || 'Chaos effect'}: ${data.turn.resolution.summary}. ${isSpeaker ? 'Keep or reroll once for your team.' : name + ' is choosing.'} Auto-keep in ${remaining}s.`;
        document.getElementById('keepChaosButton').disabled = document.getElementById('rerollChaosButton').disabled = !active || !isSpeaker || busy || !remaining;
    }
    updateSelectionSummary(); updateMobileGameFocus(); renderOnlineClock();
    renderMatchResults(data);
    renderTurnExperience(data, view);
}

function renderOnlineSnapshot(data) {
    if (isReturningToSetup) return;
    if (!data || data.phase === 'ended') {
        if (onlineEndedHandled) return;
        onlineEndedHandled = true;
        isSpeaker = isHost = isRoundActive = false;
        clearInterval(countdownTimer);
        saveOnlineSession(null);
        const previousClient = onlineClient;
        onlineClient = null; isOnlineGame = false;
        void previousClient?.close().catch(error => console.error('Failed to close connection:', error));
        void returnToSetup();
        const notice = document.getElementById('menuNotice');
        notice.textContent = 'The lobby has closed. Create or join a new game.'; notice.hidden = false;
        return;
    }
    if (Modes.isParty(data.settings)) { renderPartyOnline(data); return; }
    const settings = sanitizeGameSettingsFromDb(data.settings, data.teams.length);
    activeMode = settings.mode;
    numTeams = settings.numTeams;
    pointsToWin = settings.pointsToWin;
    winRule = settings.winRule;
    numWords = settings.numWords;
    numSeconds = settings.numSeconds;
    difficulty = settings.difficulty;
    isChaosMode = settings.chaosMode;
    isTrainingMode = settings.trainingMode;
    activeSelectedTheme = settings.selectedTheme;
    activeSelectedCategories = settings.selectedCategories;
    numPlayers = data.numPlayers;
    currentTeam = data.currentTeam;
    currentRound = data.currentRound;
    isGameStarted = Boolean(data.isGameStarted);
    onlineGameState = data.phase;
    if (onlineClient.rosterLoaded) detectPlayerChanges(teams, data.teams);
    onlineClient.rosterLoaded = true;
    teams = data.teams.map(team => ({ ...team, players: (team.players || []).map(player => ({ ...player })) }));
    const local = OnlineState.ownsSeat(data, onlineClient.actor);
    if (local) {
        playerName = local.playerName;
        saveOnlineSession({ code: gameCode, playerId: local.playerId, playerName });
    }
    const chaos = getNormalizedChaosState(data.chaos || {}, teams.length, pointsToWin);
    roundPowerups = chaos.powerups;
    powerupRevealVisible = chaos.reveal;
    landedPowerupPreview = chaos.landed;
    teamShields = chaos.teamShields;
    onlineBoardSignature = '';
    updatePlayerListUI(teams);
    document.getElementById('matchResults').hidden = data.phase !== 'finished';
    if (data.auditEvent && data.phase !== 'describing') showRecap(Gameplay.recap({ teamIndex: data.auditEvent.teamIndex,
        earned: data.auditEvent.earned ?? data.auditEvent.correctAnswers?.length ?? 0, effect: data.auditEvent.effect || data.auditEvent.chaosSummary }));
    if (data.auditEvent?.stakes && data.phase !== 'describing') showRecap(`Team ${data.auditEvent.teamIndex + 1}: ${data.auditEvent.stakes.message}`);
    else if (data.phase === 'describing' || !data.auditEvent) showRecap('');
    if (onlineClient.lastPhase === 'describing' && data.phase !== 'describing') {
        stopRoundSounds();
        if (data.phase === 'selecting') void playSound(endSound, () => false);
    }
    onlineClient.lastPhase = data.phase;
    const boardKey = `${data.matchId || 1}:${numTeams}:${pointsToWin}`;
    if (onlineClient.boardKey !== boardKey) {
        onlineClient.boardKey = boardKey;
        generateBoard();
        createTeamAuditTables(numTeams, { forceReset: true });
        lastProcessedAuditEventId = 0;
    }
    for (const event of Object.values(data.auditEvents || {}).sort((a, b) => a.id - b.id)) {
        if (event.id <= lastProcessedAuditEventId) continue;
        createTeamAuditRows(event.teamIndex, event.roundNumber, event.correctAnswers || [], { chaosSummary: event.chaosSummary, modeSummary: event.stakes?.message });
        lastProcessedAuditEventId = event.id;
    }
    if (data.phase !== 'resolving') updateBoard();
    updateTeamScores();
    updateCurrentTeamIndicator();
    refreshChaosModeUi();
    renderOnlineControls();
}

async function startOnlineRound(risky = false) {
    if (!onlineClient?.snapshot || !onlineClient.connected || onlineClient.busy || !OnlineState.view(onlineClient.snapshot, onlineClient.actor, onlineClient.serverNow()).canStartRound) return;
    await sendOnlineCommand({ type: 'start-round', seed: randomSeed(), risky });
}

async function handleOnlineJoinError(error) {
    console.error('Unable to join lobby:', error);
    const messages = {
        'duplicate-player-name': 'Player name is already in use in this lobby.',
        'incompatible-lobby': "This lobby uses a different online version. Reload every player's tab and create a new lobby.",
        'invalid-word-pack': 'This lobby has an invalid word pack. Ask the host to create a new lobby with a valid pack.',
        'invalid-game-mode': 'This lobby uses an unknown game mode. Reload and create a new lobby.',
        'lobby-full': 'This lobby is full. Open Table supports 8 players; Case Files supports 12. Wait for a seat to be released, or create another lobby.',
        'lobby-unavailable': 'This lobby is unavailable or has ended.'
    };
    if (messages[error.message]) saveOnlineSession(null);
    await onlineClient?.close().catch(() => {});
    onlineClient = null;
    isOnlineGame = false;
    showElement(menu);
    showElement(btnSettings);
    showElement(btnAI);
    showElement(btnRules);
    showElement(txtLobbyMenu);
    hideElement(txtLobbyPlayers);
    hideElement(game);
    document.getElementById('partyGame').hidden = true;
    clearInterval(partyTick); partyTick = null; screenAwake?.setActive(false);
    setLayoutMode('menu');
    updateSetupSummary();
    alert(messages[error.message] || 'Unable to connect to the lobby. Check your connection and try again.');
}
