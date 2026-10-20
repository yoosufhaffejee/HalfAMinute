import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, onValue, ref, get, update, runTransaction, onDisconnect, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"
import * as OnlineState from './online/state.js?v=3';
import { OnlineClient } from './online/client.js?v=3';
import * as Gameplay from './gameplay/rules.js?v=3';

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

// Initialize Google AI
const GEMINI = "AIzaSyBdCn9zygj_C7_fAHWDUidARavos_8OaRw";
const genAI = new GoogleGenerativeAI(GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
let onlineGameState = "waiting";
let roundPowerups = {};
let powerupRevealVisible = false;
let landedPowerupPreview = null;
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
    [countdownSound, tickSound, warningSound].forEach(audio => { try { audio.pause(); audio.currentTime = 0; } catch { /* Optional. */ } });
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
    themesSelect.addEventListener('change', () => { Array.from(categoriesSelect.options).forEach(option => { option.selected = false; }); sync(); updateSetupSummary(); });
    document.getElementById('selectThemeBtn').addEventListener('click', () => {
        Array.from(categoriesSelect.options).forEach(option => { option.selected = false; }); sync();
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
    const scores = document.getElementById('resultsScores'); scores.innerHTML = '';
    teams.forEach((team, index) => {
        const earned = events.filter(event => event.teamIndex === index).reduce((sum, event) => sum + (event.earned ?? event.correctAnswers?.length ?? 0), 0);
        const row = document.createElement('p');
        row.textContent = `Team ${index + 1}: ${team.points} points · ${earned} earned${isChaosMode ? ` · ${team.points - earned >= 0 ? '+' : ''}${team.points - earned} Chaos` : ''}`;
        scores.appendChild(row);
    });
    const best = [...events].sort((a, b) => (b.earned ?? b.correctAnswers?.length ?? 0) - (a.earned ?? a.correctAnswers?.length ?? 0))[0];
    document.getElementById('resultsHighlights').textContent = best ? `Best clue round: Team ${best.teamIndex + 1}, ${best.earned ?? best.correctAnswers.length} correct.` : 'Ready for another round together?';
    btnStartRound.hidden = btnNextRound.hidden = btnEndRound.hidden = btnEndGame.hidden = true;
    btnAnswers.hidden = timer.hidden = true;
    clearTrainingHints(); isRoundActive = false; updateMobileGameFocus();
    const rematch = document.getElementById('rematchButton'); rematch.hidden = !host; rematch.disabled = !active || Boolean(onlineClient?.busy);
    document.getElementById('rematchStatus').textContent = host ? 'Rematch keeps the settings and rotates the starting team.' : 'Waiting for the host to choose a rematch. You can also leave.';
    document.getElementById('changeSettingsButton').textContent = data ? 'Leave for new game settings' : 'Change settings';
}

async function returnToSetup() {
    if (isOnlineGame) {
        try { await onlineClient.close(true); } catch { alert('Unable to leave yet. Check your connection and retry.'); return; }
        saveOnlineSession(null); onlineClient = null; isOnlineGame = false; gameCode = '';
    }
    clearInterval(countdownTimer); finishLocalRound = null; stopRoundSounds();
    hideElement(game); showElement(menu); showElement(btnSettings); showElement(btnOnline); showElement(btnAI); showElement(btnRules); hideElement(btnHistory);
    showElement(txtLobbyMenu); hideElement(txtLobbyPlayers);
    isAiGame = false; localStarter = null; localDeck = {}; setLayoutMode('menu'); updateSetupSummary();
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

    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
      input.addEventListener('keyup', (event) => enforceMinMax(event.target));
    });

    // Show categories dropdown
    document.getElementById("selectCategoriesBtn").addEventListener("click", () => {
        themesSelect.value = 'None'; updateSetupSummary();
        document.getElementById("categoriesSection").style.display = 'block';
        document.getElementById("themesSection").style.display = 'none';
    });

    // Show themes dropdown
    document.getElementById("selectThemeBtn").addEventListener("click", () => {
        Array.from(categoriesSelect.options).forEach(option => { option.selected = false; }); updateSetupSummary();
        document.getElementById("categoriesSection").style.display = 'none';
        document.getElementById("themesSection").style.display = 'block';
    });

    document.getElementById("showAIWords").addEventListener("click", function () {
        const p = document.getElementById('aiWords');
        if (p.hidden) {
            p.hidden = false;
        }
        else {
            p.hidden = true;
        }
    });

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
        if (txtPlayerName.value) {
            void createGameLobby(db);
        }
        else {
            window.alert("Enter player name!");
        }
    });

    document.getElementById("joinLobbyButton").addEventListener("click", () => {
        if (txtPlayerName.value) {
            if (txtGameCode.value) {
                joinGameLobby();
            }
            else {
                window.alert("Enter lobby code!");
            }
        }
        else {
            window.alert("Enter player name!");
        }
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
    return {
        difficulty: document.getElementById("difficulty").value.toLowerCase(),
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
        badge.className = `chaos-legend-badge board-powerup ${powerupConfig.cssClass}`;
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
    game.classList.toggle('word-phase', areWordsInFocusPhase());
    document.getElementById('matchOptions').hidden = btnEndGame.hidden;

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
    hideElement(btnSettings);
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
        teamHeader.textContent = `Team ${teamIndex + 1}:`;
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

function extractUniqueAiWordsFromText(rawText = "") {
    const lines = String(rawText)
        .split("\n")
        .map(line => line.replace(/^\s*(?:[-*\u2022]\s*|\d+[.)-]\s*)/, "").trim())
        .filter(Boolean);

    const uniqueWords = [];
    const seenWords = new Set();
    lines.forEach(word => {
        const normalized = normalizeWord(word);
        if (!normalized || seenWords.has(normalized)) {
            return;
        }
        seenWords.add(normalized);
        uniqueWords.push(word);
    });
    return uniqueWords;
}

function getFriendlyGeminiErrorMessage(error) {
    const rawMessage = String(error?.message || "").toLowerCase();
    const rawCode = String(error?.code || "").toLowerCase();

    if (rawCode.includes("429") || rawMessage.includes("429") || rawMessage.includes("quota") || rawMessage.includes("rate")) {
        return "The AI service is currently rate-limited. Please wait a few seconds and try again.";
    }
    if (rawCode.includes("403") || rawMessage.includes("permission") || rawMessage.includes("api key")) {
        return "AI access is currently unavailable due to credentials or permission limits. Please check your Gemini API key/project setup.";
    }
    if (rawCode.includes("503") || rawCode.includes("500") || rawMessage.includes("unavailable") || rawMessage.includes("deadline")) {
        return "The AI service is temporarily unavailable. Please try again shortly.";
    }
    if (rawMessage.includes("safety") || rawMessage.includes("blocked")) {
        return "The request was blocked by safety filters. Try a clearer, game-safe topic.";
    }
    if (rawMessage.includes("network") || rawMessage.includes("fetch")) {
        return "Network issue while contacting Gemini. Check your connection and try again.";
    }
    return "Could not generate words right now. Please try again.";
}

async function run(topic) {
    const btnGenerate = document.getElementById("btnGenerate");
    const btnAiGame = document.getElementById("btnAiGame");
    const textArea = document.getElementById("aiWords");
    btnGenerate.disabled = true;
    btnAiGame.disabled = true;

    const cleanTopic = String(topic || "").trim();
    const strictTopic = cleanTopic.startsWith('!') ? cleanTopic.slice(1).trim() : cleanTopic;
    if (!cleanTopic) {
        showNotification("bg-warning", "text-dark", "Missing Topic", "Enter a topic first, then generate words.", 5);
        btnGenerate.disabled = false;
        btnAiGame.disabled = extractUniqueAiWordsFromText(textArea?.value || "").length === 0;
        return;
    }
    if (cleanTopic.startsWith("!") && !strictTopic) {
        showNotification("bg-warning", "text-dark", "Missing Focus", "After '!' enter a focused topic, then generate words.", 5);
        btnGenerate.disabled = false;
        btnAiGame.disabled = extractUniqueAiWordsFromText(textArea?.value || "").length === 0;
        return;
    }

    try {
        let prompt = "";
        if (cleanTopic.startsWith('!')) {
            prompt = `You are generating words for a 30 Seconds-style clue game.
Create exactly 60 unique, high-quality entries focused ONLY on "${strictTopic}".

Goal quality rules:
- Prioritize clueable, specific terms that are fun under time pressure.
- Include a balanced spread of EASY and HARD terms (roughly 65/35).
- Include people, places, events, objects, organizations, and terminology only when they are naturally central to "${strictTopic}".
- Avoid vague umbrella words, filler terms, generic category labels, and repetitive stem variants.
- Avoid near-duplicates, singular/plural duplicates, alternate spellings of the same entity, and trivial rewordings.
- Avoid predictable sequence lists unless the sequence itself is core to "${strictTopic}".
- Most entries should be 1-4 words.

Strict-scope rule:
- Do NOT drift into broad neighboring themes.
- Keep every entry tightly anchored to "${strictTopic}".

Output format rules:
1. Output only the 60 entries, one per line.
2. No numbering, bullets, headings, explanations, or extra text.
3. English only unless explicitly requested otherwise.`
        }
        else {
            prompt = `You are generating words for a 30 Seconds-style clue game.
Create exactly 50 unique, high-quality entries related to "${cleanTopic}".

Goal quality rules:
- Prioritize terms that are concrete, clueable, and fun to describe quickly.
- Include a deliberate EASY/HARD blend (roughly 70/30).
- Cover relevant sub-areas of "${cleanTopic}" such as notable people, places, events, objects, and key terminology.
- Prefer culturally relevant, recognizable references with a few deeper challenge picks.
- Avoid generic umbrella words, near-duplicates, singular/plural duplicates, and repetitive stem patterns.
- Avoid low-value filler and overly abstract entries.
- Most entries should be 1-4 words.

Output format rules:
1. Output only the 50 entries, one per line.
2. No numbering, bullets, headings, explanations, or extra text.
3. No duplicates.
4. English only unless explicitly requested otherwise.`
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = String(response?.text?.() || "").trim();
        if (!text) {
            throw new Error("empty-response");
        }

        if (textArea) {
            textArea.textContent = text;
            textArea.value = text;
        }

        const uniqueGeneratedWords = extractUniqueAiWordsFromText(text);
        if (uniqueGeneratedWords.length === 0) {
            throw new Error("no-words-generated");
        }

        currentGameWords = shuffleArray([...uniqueGeneratedWords]);
        showNotification("bg-success", "text-white", "Words Ready", `Generated ${uniqueGeneratedWords.length} unique words.`, 4);
    } catch (error) {
        console.error("Gemini generation failed:", error);
        showNotification("bg-danger", "text-white", "AI Generation Failed", getFriendlyGeminiErrorMessage(error), 8);
    } finally {
        btnGenerate.disabled = false;
        const availableWords = extractUniqueAiWordsFromText(textArea?.value || "");
        btnAiGame.disabled = availableWords.length === 0;
    }
}

function startAIGame() {
    isAiGame = true;

    // Read user added words on start
    let textArea = document.getElementById('aiWords');
    const uniqueAiWords = extractUniqueAiWordsFromText(textArea?.value || "");
    if (uniqueAiWords.length === 0) {
        showNotification("bg-warning", "text-dark", "No Words Available", "Generate or paste words before starting AI mode.", 5);
        return;
    }
    currentGameWords = shuffleArray(uniqueAiWords);
    wordDescriptionLookup = new Map();

    startGame();
    
    hideModalById("aiModal");
    btnAI.hidden = true;
}

async function startGame({ rematch = false } = {}) {
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
    if (isAiGame) localWordObjects = extractUniqueAiWordsFromText(document.getElementById('aiWords')?.value || '')
        .map(word => ({ word, difficulty: 'easy' }));

    roundPowerups = {};
    powerupRevealVisible = false;
    landedPowerupPreview = null;
    teamShields = createInitialTeamShields(teams.length);

    // Show/Hide UI elements
    hideElement(menu);
    hideElement(btnSettings);
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
    showRecap('');
    stopRoundSounds();
    localTurnStartedAt = Date.now();
    btnStartRound.hidden = true;
    btnEndGame.hidden = true;
    isRoundActive = true;
    document.getElementById('roleInstruction').textContent = `Team ${currentTeam}'s speaker: describe these words. Listeners: guess aloud.`;
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
    let chaosSummary;
    isResolvingChaosMove = true; setNextRoundBusyState(true);
    document.querySelectorAll('.scoreButton').forEach(button => { button.disabled = true; });
    btnEndGame.hidden = true;
    try {
        if (isChaosMode) {
            const result = await runChaosResolutionLocally({ teamIndexForRound, selectedPoints: correctAnswers.length, roundNumberForRound });
            chaosSummary = formatChaosSummaryForAudit(result.resolutionSummary);
        } else teams[teamIndexForRound].points += correctAnswers.length;
        const text = Gameplay.recap({ teamIndex: teamIndexForRound, earned: correctAnswers.length, before,
            after: teams[teamIndexForRound].points, effect: chaosSummary || 'No effect' });
        localAudit.push({ teamIndex: teamIndexForRound, roundNumber: roundNumberForRound, correctAnswers, earned: correctAnswers.length, recap: text,
            chaosSummary, pointsBefore: before, pointsAfter: teams[teamIndexForRound].points,
            clueSeconds: Math.max(0, (localSelectingAt - localTurnStartedAt) / 1000),
            scoringSeconds: Math.max(0, (submittedAt - localSelectingAt) / 1000),
            resolutionSeconds: Math.max(0, (Date.now() - submittedAt) / 1000) });
        showRecap(text);
        createTeamAuditColumns(teamIndexForRound, roundNumberForRound);
        createTeamAuditRows(teamIndexForRound, roundNumberForRound, correctAnswers, { chaosSummary });
        advanceRoundPointers(); hideRoundInputUI();
        updateBoard(); updateCurrentTeamIndicator(); updateTeamScores();
        if (teams.some(team => team.points >= pointsToWin)) { renderMatchResults(); return; }
        btnStartRound.hidden = false; btnEndGame.hidden = false;
    } finally { isResolvingChaosMove = false; setNextRoundBusyState(false); updateMobileGameFocus(); }
}

async function endGame() {
    hideModalById('endMatchModal');
    if (isOnlineGame) { await sendOnlineCommand({ type: 'end-game' }); return; }
    clearInterval(countdownTimer); finishLocalRound = null;
    renderMatchResults(null, true);
}

function endRound() {
    if (isOnlineGame) { void sendOnlineCommand({ type: 'end-round' }); return; }
    if (!isRoundActive) return;
    endRoundEarly = true;
    finishLocalRound?.();
}

function displayCurrentWords() {
    lblAnswers.textContent = 'Describe these words in any order:';
    const objects = localWordObjects.length ? localWordObjects : currentGameWords.map(word => ({ word, difficulty: 'easy' }));
    const draw = Gameplay.drawWords(objects, localDeck, isAiGame ? 'easy' : difficulty, numWords, randomSeed());
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

function playSound(audioElement, endCondition, playbackRate = 1.0) {
    if (!audioElement || preferences.muted || preferences.volume === 0 || endCondition?.()) return Promise.resolve();
    try {
        audioElement.volume = preferences.volume;
        audioElement.muted = false;
        audioElement.playbackRate = playbackRate;
        audioElement.currentTime = 0;
        const attempt = audioElement.play();
        attempt?.catch?.(() => {});
    } catch { /* Audio is optional and never controls game timing. */ }
    return Promise.resolve();
}

function startCountdown(seconds, callback) {
    clearInterval(countdownTimer);
    void playSound(countdownSound, () => false, 1.1);
    btnEndRound.hidden = false;
    displayCurrentWords();
    timer.hidden = false;
    const deadline = Date.now() + seconds * 1000;
    timer.textContent = String(seconds);
    let finished = false, warned = false;
    finishLocalRound = () => {
        if (finished) return;
        finished = true; clearInterval(countdownTimer); finishLocalRound = null;
        localSelectingAt = Date.now(); stopRoundSounds();
        timer.hidden = true;
        void playSound(endRoundEarly ? endSoundAlt : endSound, () => false);
        selectedButtons = 0; callback(); updateSelectionSummary();
        document.getElementById('roleInstruction').textContent = 'Select the words guessed correctly, then confirm the score.';
    };
    countdownTimer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        timer.textContent = String(remaining);
        if (remaining <= 5 && remaining > 0 && !warned) { warned = true; void playSound(warningSound, () => false, 1.2); }
        if (!remaining || endRoundEarly) finishLocalRound?.();
    }, 100);
}

function generateBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    board.style.gridTemplateColumns = '';
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

function updateBoard() {
    const cells = Array.from(document.getElementById('gameBoard').children);
    cells.forEach((cell, position) => {
        cell.innerHTML = '';
        cell.classList.remove('board-cell-powerup', 'board-cell-landed-powerup');
        const number = document.createElement('span'); number.className = 'cell-number';
        number.textContent = position === 0 ? 'Start' : position === pointsToWin ? 'Finish' : String(position);
        cell.appendChild(number);
        const occupying = teams.map((team, index) => ({ team, index })).filter(({ team }) => Math.min(team.points, pointsToWin) === position);
        cell.setAttribute('aria-label', `${position === pointsToWin ? 'Finish' : 'Position'} ${position}${occupying.length ? ', Team ' + occupying.map(t => t.index + 1).join(', ') : ''}`);
        const tokens = document.createElement('div'); tokens.className = 'board-tokens';
        occupying.forEach(({ index }) => {
            const token = document.createElement('span'); token.className = 'team-token';
            token.style.backgroundColor = getTeamColor(index); token.textContent = String(index + 1);
            tokens.appendChild(token);
        });
        cell.appendChild(tokens);
        const type = isChaosMode && powerupRevealVisible && position > 0 && position < pointsToWin - 1 ? sanitizeChaosPowerupType(roundPowerups[position]) : null;
        if (type) {
            const badge = document.createElement('span'); badge.className = `board-powerup ${CHAOS_POWERUP_TYPES[type].cssClass}`;
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
        durationMs: Gameplay.resolutionDuration(Boolean(type), won)
    };
}

function renderOnlineClock() {
    const data = onlineClient?.snapshot;
    if (!data || !isOnlineGame) return;
    const now = onlineClient.serverNow(), view = OnlineState.view(data, onlineClient.actor, now);
    timer.hidden = !(onlineClient.connected && view.active && data.phase === 'describing');
    if (!timer.hidden) {
        const text = String(view.remainingSeconds);
        if (timer.textContent !== text) timer.textContent = text;
        const cue = `${data.matchId}:${data.turn.id}:${view.remainingSeconds <= 5 ? 'warning' : 'start'}`;
        if (cue !== lastOnlineCue) { lastOnlineCue = cue; void playSound(view.remainingSeconds <= 5 ? warningSound : countdownSound, () => false); }
    }
    if (data.phase !== 'resolving') return;
    renderResolutionFrame(data.turn.resolution, now - data.turn.resolution.startedAt);
}

function renderResolutionFrame(plan, elapsed) {
    const actorIndex = plan.actorIndex ?? plan.landing?.teamIndex ?? (currentTeam - 1);
    const duration = plan.durationMs;
    const baseRatio = reducedMotion() ? 1 : Math.min(1, Math.max(0, elapsed / (duration * 0.35)));
    const effectRatio = reducedMotion() ? 1 : Math.min(1, Math.max(0, (elapsed - duration * 0.6) / (duration * 0.3)));
    const display = [...plan.basePoints];
    display[actorIndex] = plan.basePoints[actorIndex] - plan.moveCount + Math.floor(plan.moveCount * baseRatio)
        + Math.sign(plan.actorDelta) * Math.floor(Math.abs(plan.actorDelta) * effectRatio);
    if (Number.isInteger(plan.victimTeamIndex)) display[plan.victimTeamIndex] += Math.sign(plan.victimDelta) * Math.floor(Math.abs(plan.victimDelta) * effectRatio);
    const signature = JSON.stringify([display, effectRatio === 1, plan.landing]);
    if (signature === onlineBoardSignature) return;
    onlineBoardSignature = signature;
    teams.forEach((team, index) => { team.points = display[index]; });
    if (effectRatio === 1) teamShields = [...plan.shields];
    roundPowerups = plan.powerups; powerupRevealVisible = true; landedPowerupPreview = plan.landing;
    updateBoard();
    showRecap(`+${plan.moveCount} earned · ${plan.summary}`);
}

function renderOnlineControls() {
    const data = onlineClient?.snapshot;
    if (!data || !isOnlineGame) return;
    const view = OnlineState.view(data, onlineClient.actor, onlineClient.serverNow());
    const active = view.active && onlineClient.connected && !onlineClient.suspended;
    document.getElementById('currentTeamIndicator').hidden = data.phase === 'finished';
    isHost = active && view.host; isSpeaker = active && view.speaker;
    isRoundActive = data.phase === 'describing';
    endRoundEarly = Boolean(data.endRoundEarly);
    selectedButtons = (data.turn?.selectedIndexes || []).length;
    const busy = onlineClient.busy || onlineClient.registering;
    btnStartOnlineGame.hidden = !isHost || Boolean(data.isGameStarted);
    btnStartOnlineGame.disabled = busy || data.phase !== 'ready';
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
        button.textContent = words[index] || '';
        setScoreButtonSelected(button, selected.has(index));
    });
    const speaker = OnlineState.members(data).find(player => player.playerId === data.turn?.speakerId);
    const name = speaker?.playerName || 'The next speaker';
    const smallGame = (data.teams.length === 2 && data.numPlayers === 2) || (data.teams.length === 3 && data.numPlayers === 3);
    let role = '';
    if (data.phase === 'describing') role = isSpeaker ? 'You are speaking. Describe these words in any order.'
        : smallGame ? `${name} is speaking. Guess aloud; answers stay hidden.`
        : view.player?.teamIndex === data.turn?.teamIndex ? `${name} is speaking for your team. Guess aloud; answers stay hidden.`
        : `${name} is speaking for Team ${data.turn.teamIndex + 1}. Watch the clues and the timer.`;
    if (data.phase === 'selecting') role = isSpeaker ? 'Select the words guessed correctly, then confirm.' : `${name} is confirming the correct answers.`;
    if (data.phase === 'idle') role = isSpeaker ? 'You are the next speaker. Start when everyone is ready.' : `${name} speaks next for Team ${data.turn.teamIndex + 1}.`;
    if (data.phase === 'ready') role = `${data.starterTeam === undefined ? 'The starting team is drawn on start.' : `Team ${data.starterTeam + 1} starts.`} ${isHost ? 'Start when everyone is ready.' : 'Waiting for the host to start.'}`;
    if (data.phase === 'waiting') role = 'Waiting for enough players to continue.';
    if (data.phase === 'finished') role = 'Match complete. Compare scores or play again.';
    document.getElementById('roleInstruction').textContent = role;
    lblAnswers.textContent = data.phase === 'selecting' ? 'Correct answers:' : isSpeaker ? 'Describe these words:' : `${name}'s words:`;
    if (active && isSpeaker && data.phase === 'describing') renderTrainingHints(words); else clearTrainingHints();
    let status = '';
    if (!onlineClient.connected || onlineClient.suspended) status = 'Connection lost. Reconnecting…';
    else if (!view.player) status = 'Your seat is no longer active. Rejoin the lobby to play.';
    else if (!view.active) status = 'Rejoin the lobby to restore your connection.';
    else if (speaker && !OnlineState.isConnected(data, speaker, onlineClient.serverNow()) && ['idle', 'describing', 'selecting'].includes(data.phase)) status = 'Waiting for the speaker to reconnect…';
    else if (data.phase === 'resolving') status = 'Resolving Chaos…';
    else if (data.phase === 'describing' && data.deckRecycled?.length) status = `This pack has exhausted its ${data.deckRecycled.join(' and ')} answers; that difficulty is reshuffled.`;
    lblGameState.hidden = !status; lblGameState.textContent = status;
    const choice = document.getElementById('chaosChoice'); choice.hidden = data.phase !== 'chaos-choice';
    if (!choice.hidden) {
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
    if (data.auditEvent?.recap && data.phase !== 'describing') showRecap(data.auditEvent.recap);
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
    updateBoard();
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
