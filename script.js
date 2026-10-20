import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getDatabase, onValue, ref, get, update, runTransaction, onDisconnect, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js"
import * as OnlineState from './online/state.js?v=20261020.11';
import { OnlineClient } from './online/client.js?v=20261020.11';
import * as Gameplay from './gameplay/rules.js?v=20261020.11';
import * as AiErrors from './gameplay/ai-errors.js?v=20261020.14';
import { createAiWordClient } from './gameplay/ai-client.js?v=20261020.14';
import * as AiPacks from './gameplay/ai-packs.js?v=20261020.14';

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
let aiGenerationHistory = AiPacks.readHistory({ getItem: key => localStorage.getItem(key) });

// Game state variables
let teams = [];
let currentGameWords = [];
let easyWords = [];
let hardWords = [];
let currentTeam = 0;
let currentRound = 0;
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
        settings: { teams: teams.length, pointsToWin, numWords, numSeconds, difficulty, chaosMode: isChaosMode },
        scores: teams.map(team => team.points), turns: events.map(event => ({ team: event.teamIndex, earned: event.earned ?? event.correctAnswers?.length ?? 0,
            pointsBefore: event.pointsBefore, pointsAfter: event.pointsAfter, clueSeconds: event.clueSeconds,
            scoringSeconds: event.scoringSeconds, resolutionSeconds: event.resolutionSeconds, effect: event.chaosSummary || 'No effect' })) };
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
    const pack = settings.selectedTheme !== 'None' ? settings.selectedTheme : settings.selectedCategories.join(', ') || 'All categories';
    const text = `${settings.chaosMode ? 'Chaos' : 'Classic'} · ${settings.numTeams} teams · ${settings.pointsToWin} points · ${settings.numSeconds}s · ${settings.numWords} words · ${settings.difficulty} · ${pack}${settings.trainingMode ? ' · Training hints' : ''}${settings.chaosMode && settings.chaosReroll ? ' · Team reroll' : ''}`;
    document.getElementById('setupSummary').textContent = text;
    document.getElementById('advancedSetupSummary').textContent = text;
    document.getElementById('quickMode').value = settings.chaosMode ? 'chaos' : 'classic';
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
    if (!btnNextRound.hidden && !btnNextRound.disabled) btnNextRound.textContent = `Confirm ${count} correct`;
}

function showRecap(text) {
    const node = document.getElementById('turnRecap');
    if (node.textContent !== text) node.textContent = text;
    node.hidden = !text;
}

function renderMatchResults(data = null, forced = false) {
    const finished = forced || (data ? data.phase === 'finished' : teams.some(team => team.points >= pointsToWin));
    const card = document.getElementById('matchResults'); card.hidden = !finished;
    game.classList.toggle('match-finished', finished);
    if (!finished) return;
    const active = !data || (onlineClient.connected && OnlineState.view(data, onlineClient.actor, onlineClient.serverNow()).active);
    const host = !data || data.hostId === onlineClient.actor.playerId;
    const signature = JSON.stringify([data?.matchId || localMatchId, data?.hostId, teams.map(team => team.points),
        data?.auditEvents || localAudit, active, host, onlineClient?.connected, onlineClient?.busy, onlineClient?.actor?.connectionId]);
    if (card.dataset.signature === signature) return;
    card.dataset.signature = signature;
    document.getElementById('currentTeamIndicator').hidden = true;
    document.getElementById('roleInstruction').textContent = 'Match complete. Compare scores or play again.';
    const events = data ? Object.values(data.auditEvents || {}) : localAudit;
    const winner = teams.findIndex(team => team.points >= pointsToWin);
    document.getElementById('resultsTitle').textContent = winner >= 0 ? `Team ${winner + 1} wins!` : 'Match ended';
    document.getElementById('resultsContext').textContent = `${isChaosMode ? 'Chaos' : 'Classic'} · First to ${pointsToWin}`;
    const scores = document.getElementById('resultsScores'); scores.innerHTML = '';
    teams.map((team, index) => ({ team, index })).sort((a, b) => b.team.points - a.team.points || a.index - b.index).forEach(({ team, index }) => {
        const earned = events.filter(event => event.teamIndex === index).reduce((sum, event) => sum + (event.earned ?? event.correctAnswers?.length ?? 0), 0);
        const row = document.createElement('li'); row.className = `result-score${index === winner ? ' is-winner' : ''}`;
        const identity = document.createElement('div');
        const name = document.createElement('span'); name.className = 'result-team';
        const token = document.createElement('span'); token.className = 'team-token'; token.style.backgroundColor = getTeamColor(index);
        token.textContent = String(index + 1); token.setAttribute('aria-hidden', 'true'); name.appendChild(token);
        const label = document.createElement('span'); label.textContent = `Team ${index + 1}`; name.appendChild(label); identity.appendChild(name);
        if (isChaosMode && team.points !== earned) {
            const detail = document.createElement('small'); detail.className = 'result-breakdown';
            const chaos = team.points - earned;
            detail.textContent = `${earned} from clues · ${chaos >= 0 ? '+' : ''}${chaos} from Chaos`; identity.appendChild(detail);
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
    if (isOnlineGame) {
        try { await onlineClient.close(true); } catch { alert('Unable to leave yet. Check your connection and retry.'); return; }
        saveOnlineSession(null); onlineClient = null; isOnlineGame = false; gameCode = '';
    }
    clearInterval(countdownTimer); finishLocalRound = null; stopRoundSounds(); clearChaosPresentation();
    hideElement(game); showElement(menu); showElement(btnSettings); showElement(btnOnline); showElement(btnAI); showElement(btnRules); hideElement(btnHistory);
    showElement(txtLobbyMenu); hideElement(txtLobbyPlayers);
    isAiGame = false; localStarter = null; localDeck = {}; setLayoutMode('menu'); updateSetupSummary();
    updateLobbyPresentation();
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
    initializePlayPreferences();
    initializeQuickSetup();
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
    document.getElementById('topic').addEventListener('keydown', event => {
        if (event.key === 'Enter' && !document.getElementById('btnGenerate').disabled) { event.preventDefault(); generate(); }
    });
    document.getElementById('aiModal').addEventListener('show.bs.modal', syncAiPack);
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
        document.getElementById('gameSetupSettings').hidden = !game.hidden;
        document.getElementById('settingsIntro').textContent = game.hidden ? 'Make the game feel right for your group.' : 'Adjust sound and motion without interrupting the match.';
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
    void restoreOnlineSession();
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
    return {
        difficulty: ['easy', 'normal', 'hard'].includes(chosenDifficulty) ? chosenDifficulty : 'normal',
        numTeams: clampInt(txtTeams.value, 2, 2, 4),
        pointsToWin: clampInt(document.getElementById("pointsToWin").value, 20, 10, 60),
        numWords: clampInt(txtWords.value, 5, 1, 15),
        numSeconds: clampInt(txtSeconds.value, 30, 5, 300),
        chaosMode: Boolean(chkChaos?.checked),
        chaosReroll: Boolean(document.getElementById('chkReroll')?.checked),
        trainingMode: Boolean(chkTraining?.checked),
        selectedTheme: sanitizeSelectedTheme(themesSelect.value),
        selectedCategories: sanitizeSelectedCategories(Array.from(categoriesSelect.selectedOptions).map(option => option.value))
    };
}

function sanitizeGameSettingsFromDb(settings = {}, teamsLength = 2) {
    const selectedTheme = sanitizeSelectedTheme(settings.selectedTheme || "None");
    const selectedCategories = sanitizeSelectedCategories(settings.selectedCategories);
    const sanitized = {
        difficulty: ["easy", "normal", "hard"].includes((settings.difficulty || "").toLowerCase())
            ? settings.difficulty.toLowerCase()
            : "normal",
        numTeams: clampInt(settings.numTeams, teamsLength || 2, 2, 4),
        pointsToWin: clampInt(settings.pointsToWin, 20, 10, 60),
        numWords: clampInt(settings.numWords, 5, 1, 15),
        numSeconds: clampInt(settings.numSeconds, 30, 5, 300),
        chaosMode: Boolean(settings.chaosMode),
        chaosReroll: Boolean(settings.chaosReroll),
        trainingMode: Boolean(settings.trainingMode),
        selectedTheme,
        selectedCategories
    };

    if (sanitized.selectedTheme !== "None" && sanitized.selectedCategories.length > 0) {
        sanitized.selectedCategories = [];
    }

    return sanitized;
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
        || "Start broad, then narrow down with role, place, time period, and a distinctive trait.";
}

function clearTrainingHints() {
    if (!currentWordsContainer) {
        return;
    }

    if (!trainingSignature && currentWordsContainer.hidden) return;
    trainingSignature = '';
    document.getElementById('trainingHintsDrawer').hidden = true;
    currentWordsContainer.innerHTML = "";
    currentWordsContainer.hidden = true;
    updateMobileGameFocus();
}

function renderTrainingHints(words = []) {
    if (!currentWordsContainer) {
        return;
    }

    if (!isTrainingMode || !Array.isArray(words) || words.length === 0) {
        clearTrainingHints();
        return;
    }

    if (isOnlineGame && !isSpeaker) {
        clearTrainingHints();
        return;
    }

    const signature = JSON.stringify(words);
    if (trainingSignature === signature && !currentWordsContainer.hidden) return;
    trainingSignature = signature;
    document.getElementById('trainingHintsDrawer').hidden = false;

    currentWordsContainer.innerHTML = "";

    const header = document.createElement("div");
    header.className = "training-header";
    header.textContent = "Training hints · Check that your clue does not include the answer or its derivatives.";
    currentWordsContainer.appendChild(header);

    words.forEach(word => {
        const card = document.createElement("div");
        card.className = "training-card";

        const wordLabel = document.createElement("div");
        wordLabel.className = "training-word";
        wordLabel.textContent = word;

        const description = document.createElement("div");
        description.className = "training-description";
        description.textContent = getTrainingDescription(word);

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
    clearInterval(countdownTimer);
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
        const pools = loadWords(settings.selectedTheme, settings.selectedCategories, settings.difficulty);
        // .info values are local SDK metadata and must be listened to, not read
        // through get(), which may fall back to a REST path the server rejects.
        const serverOffset = await new Promise((resolve, reject) => {
            onValue(ref(db, '.info/serverTimeOffset'), snapshot => resolve(Number(snapshot.val()) || 0), reject, { onlyOnce: true });
        });
        const initial = {
            protocolVersion: OnlineState.PROTOCOL_VERSION, dateCreated: serverTimestamp(), settings,
            teams: Array.from({ length: settings.numTeams }, (_, id) => ({ id, points: 0, players: [] })),
            easyWords, hardWords, currentGameWords: pools, numPlayers: 0, currentTeam: 1, currentRound: 0,
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
    void run(document.getElementById("topic").value);
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
    const btnGenerate = document.getElementById("btnGenerate");
    const btnAiGame = document.getElementById("btnAiGame");
    const textArea = document.getElementById("aiWords");
    const cleanTopic = String(topic || "").trim();
    const strictTopic = cleanTopic.startsWith('!') ? cleanTopic.slice(1).trim() : cleanTopic;
    if (!cleanTopic) {
        setAiFeedback('Enter a topic first, then generate words.', true);
        syncAiPack();
        return;
    }
    if (cleanTopic.startsWith("!") && !strictTopic) {
        setAiFeedback("After '!' add a focused topic, such as !Football players.", true);
        syncAiPack();
        return;
    }
    if (strictTopic.length > 240) {
        setAiFeedback('Keep the topic to 240 characters or fewer.', true); return;
    }
    btnGenerate.disabled = true; btnAiGame.disabled = true; textArea.disabled = true;
    btnGenerate.textContent = 'Generating…'; btnGenerate.setAttribute('aria-busy', 'true');
    setAiFeedback('Building your word pack…');

    try {
        const settings = getSanitizedSettingsFromInputs();
        const prompt = AiPacks.buildPackRequest(cleanTopic, { difficulty: settings.difficulty,
            numWords: settings.numWords, history: refreshAiGenerationHistory() });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const pack = AiPacks.parseGeneratedPack(String(response?.text?.() || ''), {
            history: refreshAiGenerationHistory(), finishReason: response?.candidates?.[0]?.finishReason,
            difficulty: settings.difficulty
        });
        // Commit only a fully parsed, usable pack. A bad response never replaces edits.
        aiGeneratedEntries = pack.entries;
        const text = pack.entries.map(entry => entry.word).join('\n');
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
        textArea.disabled = false; btnGenerate.textContent = 'Generate words'; btnGenerate.setAttribute('aria-busy', 'false');
        syncAiPack();
    }
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
    btnAI.hidden = true;
}

async function startGame({ rematch = false } = {}) {
    if (isAiGame) {
        const selectedDifficulty = getSanitizedSettingsFromInputs().difficulty;
        if (!getAiWordObjects(selectedDifficulty).some(entry => selectedDifficulty === 'normal' || entry.difficulty === selectedDifficulty)) {
            setAiFeedback('This pack has no answers at the selected difficulty. Change difficulty in Settings or generate another pack.', true);
            syncAiPack(); getModalInstance('aiModal')?.show(); return;
        }
    }
    document.getElementById('menuNotice').hidden = true;
    // Play game start sound
    void playSound(startSound, () => false, 1.2);
    clearInterval(countdownTimer); finishLocalRound = null;
    localMatchId++;
    localAudit = [];
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

    // Read and sanitize game settings
    const sanitizedSettings = getSanitizedSettingsFromInputs();
    difficulty = sanitizedSettings.difficulty;
    const selectedCategories = [...sanitizedSettings.selectedCategories];
    const selectedTheme = sanitizedSettings.selectedTheme;
    activeSelectedTheme = selectedTheme;
    activeSelectedCategories = [...selectedCategories];

    numTeams = sanitizedSettings.numTeams;
    teams = Array.from({ length: numTeams }, () => ({ points: 0 }));

    pointsToWin = sanitizedSettings.pointsToWin;
    numWords = sanitizedSettings.numWords;
    numSeconds = sanitizedSettings.numSeconds;
    isChaosMode = sanitizedSettings.chaosMode;
    isTrainingMode = sanitizedSettings.trainingMode;
    isRoundActive = false;
    isResolvingChaosMove = false;

    txtTeams.value = String(numTeams);
    document.getElementById("pointsToWin").value = String(pointsToWin);
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
    if (isAiGame) {
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

function startRound() {
    if (isOnlineGame) { void startOnlineRound(); return; }
    if (isRoundActive || isResolvingChaosMove || teams.some(team => team.points >= pointsToWin)) return;
    clearChaosPresentation();
    showRecap('');
    stopRoundSounds();
    btnStartRound.hidden = true;
    btnEndGame.hidden = true;
    isRoundActive = true;
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
    const teamIndexForRound = getCurrentTeamIndex(currentTeam), roundNumberForRound = currentRound + 1;
    const before = teams[teamIndexForRound].points;
    const submittedAt = Date.now();
    let chaosSummary, chaosEffect, completedEvent;
    isResolvingChaosMove = true; setNextRoundBusyState(true);
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
        const text = Gameplay.recap({ teamIndex: teamIndexForRound, earned: correctAnswers.length, before,
            after: teams[teamIndexForRound].points, effect: chaosEffect });
        completedEvent = { teamIndex: teamIndexForRound, roundNumber: roundNumberForRound, correctAnswers, earned: correctAnswers.length, recap: text,
            chaosSummary, effect: chaosEffect, pointsBefore: before, pointsAfter: teams[teamIndexForRound].points,
            clueSeconds: Math.max(0, (localSelectingAt - localTurnStartedAt) / 1000),
            scoringSeconds: Math.max(0, (submittedAt - localSelectingAt) / 1000),
            resolutionSeconds: Math.max(0, (Date.now() - submittedAt) / 1000) };
        localAudit.push(completedEvent);
        showRecap(text);
        createTeamAuditColumns(teamIndexForRound, roundNumberForRound);
        createTeamAuditRows(teamIndexForRound, roundNumberForRound, correctAnswers, { chaosSummary });
        advanceRoundPointers(); hideRoundInputUI();
        updateBoard(); updateCurrentTeamIndicator(); updateTeamScores();
        if (teams.some(team => team.points >= pointsToWin)) { renderMatchResults(); return; }
        btnStartRound.hidden = false; btnEndGame.hidden = false;
    } finally {
        clearChaosPresentation();
        if (completedEvent && isChaosMode && !game.classList.contains('match-finished')) showChaosOutcome(completedEvent);
        isResolvingChaosMove = false; setNextRoundBusyState(false); updateMobileGameFocus();
    }
}

async function endGame() {
    hideModalById('endMatchModal');
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
    if (teams[getCurrentTeamIndex(currentTeam)].points >= pointsToWin) {
        document.getElementById("nextRoundButton").textContent = "EndGame";
    }

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
            if (chaosVisual.phase !== 'moving' && position === chaosVisual.landing?.tileIndex) {
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
            badge.textContent = CHAOS_POWERUP_TYPES[type].label;
            cell.appendChild(badge); cell.classList.add('board-cell-powerup');
            if (chaosVisual?.phase !== 'moving' && landedPowerupPreview?.tileIndex === position) cell.classList.add('board-cell-landed-powerup');
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

function getOnlineWordObjects(settings) {
    const objects = settings.selectedTheme !== 'None'
        ? (themes[settings.selectedTheme] || [])
        : (settings.selectedCategories.length ? settings.selectedCategories : Object.keys(categories))
            .flatMap(category => categories[category] || []);
    return dedupeWordObjects(objects).filter(word => settings.difficulty === 'normal' || word.difficulty === settings.difficulty);
}

function drawOnlineWords(gameData, seed) {
    const settings = sanitizeGameSettingsFromDb(gameData.settings, gameData.teams.length);
    const draw = Gameplay.drawWords(getOnlineWordObjects(settings), gameData.deck || {}, settings.difficulty, settings.numWords, seed);
    return { words: draw.words, pools: { deck: draw.deck, deckRecycled: draw.recycled,
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
    const moveEnd = timing.moveMs * scale;
    const effectStart = (timing.moveMs + timing.landingMs) * scale;
    const effectEnd = (timing.moveMs + timing.landingMs + timing.effectMs) * scale;
    const baseRatio = reduced ? 1 : Math.min(1, Math.max(0, elapsed / moveEnd));
    const effectRatio = reduced || !plan.landing ? 1 : Math.min(1, Math.max(0, (elapsed - effectStart) / (timing.effectMs * scale)));
    const phase = reduced || elapsed >= effectEnd ? 'complete' : baseRatio < 1 ? 'moving'
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
    roundPowerups = plan.powerups; powerupRevealVisible = phase !== 'moving'; landedPowerupPreview = phase === 'moving' ? null : plan.landing;
    const effectName = CHAOS_POWERUP_TYPES[plan.landing?.type]?.legendLabel;
    const team = `Team ${actorIndex + 1}`;
    const outcome = Gameplay.effectMessage(plan.effect);
    const result = chaosOutcomePresentation({ teamIndex: actorIndex, earned: plan.moveCount,
        pointsBefore: plan.basePoints[actorIndex] - plan.moveCount, pointsAfter: plan.points[actorIndex], effect: plan.effect });
    const message = phase === 'moving' ? (plan.moveCount ? `${team} moves ${plan.moveCount} ${plan.moveCount === 1 ? 'space' : 'spaces'}…` : `${team} stays on this space…`)
        : phase === 'landing' ? `${effectName}!` : phase === 'effect' ? Gameplay.effectMessage(plan.effect)
        : display[actorIndex] >= pointsToWin ? `${team} reached the finish!` : outcome || 'Safe landing!';
    setChaosPresentation(phase, message, ['effect', 'complete'].includes(phase) ? result.tone : 'neutral', {
        teamIndex: actorIndex, icon: phase === 'moving' ? '→' : result.icon,
        detail: phase === 'moving' ? `From space ${plan.basePoints[actorIndex] - plan.moveCount} to space ${Math.min(plan.basePoints[actorIndex], pointsToWin)}.`
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
    const step = ({ moving: 'Move', landing: 'Landed', effect: 'Chaos!', complete: 'Turn result', choice: 'Choose your effect' })[phase];
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
        if (roster.reconnectingPlayers) text += ` · ${roster.reconnectingPlayers} reconnecting`;
    }
    if (summary.textContent !== text) summary.textContent = text;
    document.getElementById('onlineIntro').textContent = joined ? text : 'Bring your group together in one lobby.';
}

function renderOnlineControls() {
    const data = onlineClient?.snapshot;
    if (!data || !isOnlineGame) return;
    if (!['resolving', 'chaos-choice'].includes(data.phase)) {
        clearChaosPresentation();
        if (isChaosMode && data.auditEvent && ['idle', 'waiting'].includes(data.phase)) showChaosOutcome(data.auditEvent);
    }
    const view = OnlineState.view(data, onlineClient.actor, onlineClient.serverNow());
    updateLobbyPresentation(data, view);
    setRoundCountdown(onlineClient.connected && view.active ? view.countdownRemainingMs : 0);
    const active = view.active && onlineClient.connected && !onlineClient.suspended;
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
    if (data.phase === 'selecting') role = isSpeaker ? 'Select the words guessed correctly, then confirm.' : `${name} is confirming the correct answers.`;
    if (data.phase === 'idle') {
        const opening = !Object.keys(data.auditEvents || {}).length;
        const starterTeam = data.starterTeam ?? data.turn.teamIndex;
        const starter = opening ? `Team ${starterTeam + 1} ${data.matchId > 1 ? 'starts this rematch' : 'was drawn to start'}. ` : '';
        role = starter + (isSpeaker ? 'You are the next speaker. Start when everyone is ready.' : `${name} speaks next for Team ${data.turn.teamIndex + 1}.`);
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
}

function renderOnlineSnapshot(data) {
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
    const settings = sanitizeGameSettingsFromDb(data.settings, data.teams.length);
    numTeams = settings.numTeams;
    pointsToWin = settings.pointsToWin;
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
        createTeamAuditRows(event.teamIndex, event.roundNumber, event.correctAnswers || [], { chaosSummary: event.chaosSummary });
        lastProcessedAuditEventId = event.id;
    }
    if (data.phase !== 'resolving') updateBoard();
    updateTeamScores();
    updateCurrentTeamIndicator();
    refreshChaosModeUi();
    renderOnlineControls();
}

async function startOnlineRound() {
    if (!onlineClient?.snapshot || !onlineClient.connected || onlineClient.busy || !OnlineState.view(onlineClient.snapshot, onlineClient.actor, onlineClient.serverNow()).canStartRound) return;
    await sendOnlineCommand({ type: 'start-round', seed: randomSeed() });
}

async function handleOnlineJoinError(error) {
    console.error('Unable to join lobby:', error);
    const messages = {
        'duplicate-player-name': 'Player name is already in use in this lobby.',
        'incompatible-lobby': 'This lobby uses an older online version. Ask the host to create a new lobby.',
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
    setLayoutMode('menu');
    alert(messages[error.message] || 'Unable to connect to the lobby. Check your connection and try again.');
}
