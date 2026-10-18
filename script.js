import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, onValue, ref, get, update, runTransaction, onDisconnect, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"
import * as OnlineState from './online/state.js';
import { OnlineClient } from './online/client.js';

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

const RECENT_WORDS_STORAGE_KEY = "half_a_minute_recent_words_v1";
const MAX_RECENT_WORDS = 600;
const LOBBY_EXPIRY_MS = 12 * 60 * 60 * 1000;
const CHAOS_MOVE_STEP_DELAY_MS = 420;
const CHAOS_PREMOVE_REVEAL_MS = 3000;
const CHAOS_LANDED_PREVIEW_DELAY_MS = 2000;
const CHAOS_CLEAR_PAUSE_MS = 450;
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
        description: "Reset to start unless shielded.",
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

    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
      input.addEventListener('keyup', (event) => enforceMinMax(event.target));
    });

    // Show categories dropdown
    document.getElementById("selectCategoriesBtn").addEventListener("click", () => {
        document.getElementById("categoriesSection").style.display = 'block';
        document.getElementById("themesSection").style.display = 'none';
    });

    // Show themes dropdown
    document.getElementById("selectThemeBtn").addEventListener("click", () => {
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
            let confirmation = window.confirm(`Are you sure you want to create a lobby with ${txtTeams.value} teams?`);
            if (confirmation) {
                createGameLobby(db);
            }
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
    btnOnline.addEventListener("click", () => {
        void triggerOnlineHealthScan();
    });

    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("startOnlineGame").addEventListener("click", startOnlineGame);
    document.getElementById("startRoundButton").addEventListener("click", startRound);
    document.getElementById("nextRoundButton").addEventListener("click", nextRound);
    document.getElementById("endGameButton").addEventListener("click", endGame);
    document.getElementById("endRoundButton").addEventListener("click", endRound);
    document.getElementById("btnGenerate").addEventListener("click", generate);
    document.getElementById("btnAiGame").addEventListener("click", startAIGame);
    document.getElementById('leaveOnlineGame').addEventListener('click', leaveLobbyWithTransaction);
    document.getElementById('rejoinOnlineGame').addEventListener('click', () => {
        void onlineClient?.resume(true).catch(error => console.error('Unable to rejoin:', error));
    });
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
    let t = (Number(seed) || 0) >>> 0;
    return () => {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
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
    button.style.background = isSelected ? "grey" : "";
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
                moveActor(-currentPoints);
            }
            break;
        case "shield":
            shields[actingTeamIndex] = 1;
            summary.grantedShield = true;
            break;
        case "steal1": {
            moveActor(1);
            const leaders = getLeadingOpponentIndexes(teamsData, actingTeamIndex);
            if (leaders.length > 0) {
                const victimTeamIndex = leaders[Math.floor(rng() * leaders.length)];
                const victim = teamsData[victimTeamIndex];
                const before = Number(victim?.points) || 0;
                const after = Math.max(0, before - 1);
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
            return summary.blockedByShield ? "🛡️ blocked 💣 bomb" : "💣 bomb reset";
        case "shield":
            return "🛡️ shield gained";
        case "steal1":
            if (Number.isInteger(summary.victimTeamIndex) && summary.victimTeamIndex >= 0) {
                return `🥷 steal 1 from Team ${summary.victimTeamIndex + 1}`;
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

    currentWordsContainer.innerHTML = "";

    const header = document.createElement("div");
    header.className = "training-header";
    header.textContent = "Training Mode: Easy clue ideas";
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
    await sendOnlineCommand({ type: 'start-game' });
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

async function startGame() {
    // Play game start sound
    await playSound(startSound, () => false, 1.2);
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
    }

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
            button.addEventListener("click", () => {
                if (!btnNextRound.hidden) {
                    if (isScoreButtonSelected(button)) {
                        selectedButtons--;
                        setScoreButtonSelected(button, false);
                    }
                    else {
                        selectedButtons++;
                        setScoreButtonSelected(button, true);
                    }
                }
            });
        }
    });

    // Set starting team
    currentTeam = 1;

    createTeamAuditTables(teams.length, { forceReset: true });

    generateBoard();
    updateBoard();
    updateTeamScores();
    updateCurrentTeamIndicator();
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
    btnStartRound.hidden = true;
    btnEndGame.hidden = true;
    isRoundActive = true;
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

async function animateTeamMovement(teamIndex, delta, animate = true) {
    if (!Number.isInteger(teamIndex) || teamIndex < 0 || teamIndex >= teams.length || delta === 0) {
        return;
    }

    const direction = delta > 0 ? 1 : -1;
    const totalSteps = Math.abs(delta);
    for (let step = 0; step < totalSteps; step++) {
        const team = teams[teamIndex];
        const currentPoints = Number(team?.points) || 0;
        const nextPoints = Math.max(0, currentPoints + direction);
        team.points = nextPoints;
        updateBoard();
        if (animate) {
            await sleep(CHAOS_MOVE_STEP_DELAY_MS);
        }
    }
}

function getChaosLandingPowerup(teamIndex) {
    if (!isChaosMode || !teams[teamIndex]) {
        return null;
    }

    const teamPoints = Number(teams[teamIndex].points) || 0;
    if (teamPoints >= pointsToWin) {
        return null;
    }

    const tileIndex = getBoardCellIndexForPoints(teamPoints, pointsToWin);
    return sanitizeChaosPowerupType(roundPowerups[tileIndex]);
}

function getChaosLandingPreview(teamIndex, powerupType) {
    const type = sanitizeChaosPowerupType(powerupType);
    if (!type || !teams[teamIndex]) {
        return null;
    }

    return sanitizeChaosLandedPreview({
        tileIndex: getBoardCellIndexForPoints(teams[teamIndex].points, pointsToWin),
        type,
        teamIndex
    }, pointsToWin, teams.length);
}

async function resolveChaosPowerupLocally(
    teamIndex,
    powerupType,
    rng = Math.random,
    animate = true,
    roundNumberForRound = currentRound + 1
) {
    if (!powerupType) {
        landedPowerupPreview = null;
        if (animate) {
            await sleep(CHAOS_CLEAR_PAUSE_MS);
        }
        powerupRevealVisible = false;
        updateBoard();
        updateTeamScores();

        return {
            type: null
        };
    }

    const tempTeams = teams.map(team => ({ points: Number(team?.points) || 0 }));
    const tempShields = normalizeTeamShields(teamShields, teams.length);
    const summary = applyChaosPowerupToState({
        teamsData: tempTeams,
        shields: tempShields,
        actingTeamIndex: teamIndex,
        powerupType,
        rng
    });

    teamShields = tempShields;

    landedPowerupPreview = getChaosLandingPreview(teamIndex, powerupType);
    updateTeamScores();
    updateBoard();
    const powerupLabel = CHAOS_POWERUP_TYPES[powerupType]?.label || powerupType;
    lblGameState.textContent = `Chaos: Team ${teamIndex + 1} landed on ${powerupLabel}. Applying...`;
    showElement(lblGameState);
    if (animate) {
        await sleep(CHAOS_LANDED_PREVIEW_DELAY_MS);
    }

    // Keep indicators visible while applying the landed powerup.
    landedPowerupPreview = null;
    updateBoard();
    updateTeamScores();

    if (summary.actorDelta !== 0) {
        await animateTeamMovement(teamIndex, summary.actorDelta, animate);
    } else {
        updateBoard();
    }

    if (Number.isInteger(summary.victimTeamIndex) && summary.victimDelta !== 0) {
        await animateTeamMovement(summary.victimTeamIndex, summary.victimDelta, animate);
    }

    if (animate) {
        await sleep(CHAOS_CLEAR_PAUSE_MS);
    }

    // Clear the map after powerup resolution is complete.
    powerupRevealVisible = false;
    landedPowerupPreview = null;
    updateBoard();

    updateTeamScores();
    hideElement(lblGameState);
    return summary;
}

async function runChaosResolutionLocally({
    teamIndexForRound,
    selectedPoints,
    roundNumberForRound,
    powerupsForRound = null,
    rng = Math.random,
    animate = true
}) {
    ensureLocalChaosState(teams.length);
    const safeSelectedPoints = clampInt(selectedPoints, 0, 0, numWords);
    roundPowerups = sanitizeRoundPowerups(
        powerupsForRound || generateRoundPowerupsMap(pointsToWin, rng),
        pointsToWin
    );

    // Reveal full round map first, then begin movement.
    powerupRevealVisible = true;
    updateBoard();
    updateTeamScores();
    if (animate) {
        await sleep(CHAOS_PREMOVE_REVEAL_MS);
    }

    await animateTeamMovement(teamIndexForRound, safeSelectedPoints, animate);

    const landedPowerup = getChaosLandingPowerup(teamIndexForRound);
    const summary = await resolveChaosPowerupLocally(
        teamIndexForRound,
        landedPowerup,
        rng,
        animate,
        roundNumberForRound
    );

    return {
        roundId: roundNumberForRound,
        powerups: { ...roundPowerups },
        reveal: powerupRevealVisible,
        resolutionSummary: summary
    };
}

async function nextRound() {
    if (isOnlineGame) { await sendOnlineCommand({ type: 'submit-round' }); return; }
    if (isResolvingChaosMove) return;
    const correctAnswers = getSelectedCorrectAnswers();
    const teamIndexForRound = getCurrentTeamIndex(currentTeam);
    const roundNumberForRound = currentRound + 1;
    let chaosSummary;
    if (isChaosMode) {
        isResolvingChaosMove = true;
        setNextRoundBusyState(true);
        try {
            const result = await runChaosResolutionLocally({ teamIndexForRound, selectedPoints: correctAnswers.length, roundNumberForRound });
            chaosSummary = formatChaosSummaryForAudit(result.resolutionSummary);
        } finally {
            isResolvingChaosMove = false;
            setNextRoundBusyState(false);
        }
    } else updatePoints(correctAnswers.length);
    createTeamAuditColumns(teamIndexForRound, roundNumberForRound);
    createTeamAuditRows(teamIndexForRound, roundNumberForRound, correctAnswers, { chaosSummary });
    advanceRoundPointers();
    hideRoundInputUI();
    if (teams.some(team => team.points >= pointsToWin)) { await endGame(); return; }
    btnStartRound.hidden = false;
    btnEndGame.hidden = false;
    updateCurrentTeamIndicator();
    updateTeamScores();
}

async function endGame() {
    if (isOnlineGame) { await sendOnlineCommand({ type: 'end-game' }); return; }
    alert('Game over! Team scores:\n' + teams.map((team, index) => `Team ${index + 1}: ${team.points} points`).join('\n'));
    clearInterval(countdownTimer);
    clearTrainingHints();
    location.reload();
}

function endRound() {
    if (isOnlineGame) { void sendOnlineCommand({ type: 'end-round' }); return; }
    btnEndRound.hidden = true;
    btnNextRound.hidden = false;
    setNextRoundBusyState(false);
    endRoundEarly = true;
    clearTrainingHints();
    isRoundActive = false;
    updateMobileGameFocus();
}

function displayCurrentWords() {
    lblAnswers.textContent = "Describe the below words:"

    const scoreButtons = document.getElementsByClassName("scoreButton");
    for (let index = 0; index < scoreButtons.length; index++) {
        if (index < numWords) {
            const element = scoreButtons[index];
            element.hidden = false;
        }
    }

    btnAnswers.hidden = false;
    updateMobileGameFocus();
    const wordButtons = document.getElementsByClassName("scoreButton");

    // We need to evenly mix easy and hard to make the game fair
    if (difficulty === "normal" && !isAiGame) {
        let numEasy = Math.ceil(numWords / 2);
        let numHard = numWords - numEasy;

        if (easyWords.length < numEasy || hardWords.length < numHard) {
            alert("Word pool exhausted, reloading the selected pool.");
            currentGameWords = loadWords(activeSelectedTheme, [...activeSelectedCategories], difficulty);
            numEasy = Math.ceil(numWords / 2);
            numHard = numWords - numEasy;
        }

        let normalWords = [];
        normalWords = easyWords.slice(0, numEasy).concat(hardWords.slice(0, numHard));
        normalWords = shuffleArray(normalWords);

        for (let i = 0; i < normalWords.length; i++) {
            wordButtons[i].textContent = normalWords[i];
        }
        renderTrainingHints(normalWords);

        rememberUsedWords(normalWords);

        easyWords = easyWords.slice(numEasy);
        hardWords = hardWords.slice(numHard);
    }
    else {
        if (currentGameWords.length < numWords) {
            if (isAiGame) {
                const dedupedAiWords = extractUniqueAiWordsFromText(document.getElementById("aiWords")?.value || "");
                currentGameWords = shuffleArray(dedupedAiWords);
            }
            else {
                currentGameWords = loadWords(activeSelectedTheme, [...activeSelectedCategories], difficulty);
            }
        }

        let words = currentGameWords.slice(0, numWords);
        currentGameWords = currentGameWords.slice(numWords);

        words.forEach((word, index) => {
            wordButtons[index].textContent = word;
        });
        renderTrainingHints(words);

        rememberUsedWords(words);
    }

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
    return new Promise((resolve) => {
        if (!audioElement) {
            resolve();
            return;
        }

        let settled = false;
        let checkInterval = null;
        let failsafeTimeout = null;

        const cleanupAndResolve = () => {
            if (settled) {
                return;
            }
            settled = true;

            if (checkInterval) {
                clearInterval(checkInterval);
            }
            if (failsafeTimeout) {
                clearTimeout(failsafeTimeout);
            }

            audioElement.onended = null;
            audioElement.onerror = null;
            resolve();
        };

        try {
            audioElement.playbackRate = playbackRate;
            audioElement.currentTime = 0;
        } catch (_) {
            cleanupAndResolve();
            return;
        }

        const durationMs = Number.isFinite(audioElement.duration) && audioElement.duration > 0
            ? Math.ceil((audioElement.duration / Math.max(0.1, playbackRate)) * 1000)
            : 0;
        const fallbackMs = Math.max(1200, Math.min(6000, durationMs > 0 ? durationMs + 800 : 3200));

        failsafeTimeout = setTimeout(() => {
            cleanupAndResolve();
        }, fallbackMs);

        checkInterval = setInterval(() => {
            let shouldEnd = false;
            try {
                shouldEnd = Boolean(endCondition && endCondition());
            } catch (_) {
                shouldEnd = true;
            }

            if (shouldEnd) {
                try {
                    audioElement.pause();
                    audioElement.currentTime = 0;
                } catch (_) {
                    // Ignore pause/reset failures and continue resolving.
                }
                cleanupAndResolve();
            }
        }, 100);

        audioElement.onended = () => {
            cleanupAndResolve();
        };
        audioElement.onerror = () => {
            cleanupAndResolve();
        };

        try {
            const playAttempt = audioElement.play();
            if (playAttempt && typeof playAttempt.then === "function") {
                playAttempt.catch(() => {
                    cleanupAndResolve();
                });
            }
        } catch (_) {
            cleanupAndResolve();
        }
    });
}

async function startCountdown(seconds, callback) {
    countdownSoundPlaying = true;
    // Wait for the countdown sound to finish playing for its duration
    await playSound(countdownSound, () => false, 1.1);
    countdownSoundPlaying = false;

    btnEndRound.hidden = false;
    displayCurrentWords();

    timer.hidden = false;
    let remainingTime = seconds;
    timer.textContent = remainingTime;

    const warningTime = 5;
    let tickPlaying = false;
    let warningPlaying = false;
    let roundFinished = false;

    const finishRound = (audioToPlay) => {
        if (roundFinished) {
            return;
        }

        roundFinished = true;
        clearInterval(countdownTimer);
        playSound(audioToPlay, () => false, 1.0).then(() => {
            selectedButtons = 0;
            callback();
        });
    };

    countdownTimer = setInterval(async () => {
        // Play the tick sound every second if not already playing
        if (remainingTime > warningTime && !tickPlaying) {
            tickPlaying = true;
            playSound(tickSound, () => remainingTime <= warningTime || endRoundEarly, 1.0).then(() => tickPlaying = false);
        }

        remainingTime--;
        timer.textContent = remainingTime;
        if (remainingTime < 0) {
            timer.textContent = 0;
        }

        // Play the warning sound 5 seconds before the end if not already playing
        if (remainingTime <= warningTime && remainingTime > 0 && !warningPlaying) {
            warningPlaying = true;
            playSound(warningSound, () => remainingTime < 0 || endRoundEarly, 1.2).then(() => warningPlaying = false);
        }

        if (remainingTime < 0) {
            remainingTime = 0;
            finishRound(endSound);
        }

        if (endRoundEarly === true) {
            finishRound(endSoundAlt);
        }
    }, 1000);
}

function generateBoard() {
    const boardSize = pointsToWin;

    let columns = 5;
    if (isMobileDevice()) {
        columns = 4;
    }
    const rows = Math.ceil(boardSize / columns);
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gameBoard.innerHTML = "";

    for (let i = 0; i < boardSize; i++) {
        const cell = document.createElement("div");
        cell.className = "board-cell";
        gameBoard.appendChild(cell);
    }
}

function isMobileDevice() {
    const userAgent = navigator.userAgent;
    const mobileKeywords = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

    return mobileKeywords.some(keyword => userAgent.includes(keyword));
}

function updateBoard() {
    const gameBoard = document.getElementById("gameBoard");
    const boardCells = gameBoard.children;

    // Clear previous state
    Array.from(boardCells).forEach(cell => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "";
        cell.classList.remove("board-cell-powerup");
        cell.classList.remove("board-cell-landed-powerup");
    });

    // Track team positions on the board
    let cellTeams = new Array(boardCells.length).fill(null).map(() => []);

    teams.forEach((team, index) => {
        const position = Math.min(team.points, boardCells.length - 1);
        cellTeams[position].push(index);
    });

    // Update board cells with team colors.
    cellTeams.forEach((teamIndexes, cellIndex) => {
        const cell = boardCells[cellIndex];
        if (teamIndexes.length === 0) {
            return;
        }

        // If there's only one team, just set the background color
        if (teamIndexes.length === 1) {
            cell.style.backgroundColor = getTeamColor(teamIndexes[0]);
        } else {
            const segmentWidth = 100 / teamIndexes.length;
            const segmentsContainer = document.createElement("div");
            segmentsContainer.className = "board-cell-segments";

            teamIndexes.forEach((teamIndex, index) => {
                const segment = document.createElement("div");
                segment.className = "board-team-segment";
                segment.style.width = `${segmentWidth}%`;
                segment.style.height = "100%";
                segment.style.float = "left";
                segment.style.backgroundColor = getTeamColor(teamIndex);
                segment.style.borderRadius = "4px";
                segmentsContainer.appendChild(segment);
            });

            cell.appendChild(segmentsContainer);
        }
    });

    // Reveal powerups across the full board map.
    if (isChaosMode && powerupRevealVisible) {
        Array.from(boardCells).forEach((cell, cellIndex) => {
            const powerupType = sanitizeChaosPowerupType(roundPowerups[cellIndex]);
            if (!powerupType) {
                return;
            }
            const powerupConfig = CHAOS_POWERUP_TYPES[powerupType];
            const badge = document.createElement("div");
            badge.className = `board-powerup ${powerupConfig.cssClass}`;
            badge.textContent = powerupConfig.label;
            const isLandedCell = landedPowerupPreview
                && landedPowerupPreview.tileIndex === cellIndex
                && landedPowerupPreview.type === powerupType;
            if (isLandedCell) {
                badge.classList.add("board-powerup-landed");
                cell.classList.add("board-cell-landed-powerup");
            }
            cell.classList.add("board-cell-powerup");
            cell.appendChild(badge);
        });
    }

    updateTeamScores();
}

function updateTeamScores() {
    const teamScoresContainer = document.getElementById("teamScores");
    teamScoresContainer.innerHTML = "";
    ensureLocalChaosState(teams.length || numTeams || 2);
    teams.forEach((team, index) => {
        const teamScoreDiv = document.createElement("div");
        teamScoreDiv.className = "team-score";
        teamScoreDiv.textContent = `Team ${index + 1}: ${team.points} points`;
        if (isChaosMode && Number(teamShields[index]) > 0) {
            const shieldBadge = document.createElement("span");
            shieldBadge.className = "shield-indicator";
            shieldBadge.textContent = "Shield: Ready";
            teamScoreDiv.appendChild(shieldBadge);
        }
        teamScoreDiv.style.color = getTeamColor(index);
        teamScoresContainer.appendChild(teamScoreDiv);
    });
}

function getTeamColor(teamIndex) {
    switch (teamIndex) {
        case 0:
            return "blue";
        case 1:
            return "red";
        case 2:
            return "green";
        case 3:
            return "orange";
        default:
            return "black";
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateCurrentTeamIndicator() {
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
    const rng = createSeededRandom(seed);
    const shuffle = values => {
        const result = [...values];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    };
    let easy = [...(gameData.easyWords || [])];
    let hard = [...(gameData.hardWords || [])];
    let all = [...(gameData.currentGameWords || [])];
    if (settings.difficulty === 'normal') {
        const numEasy = Math.ceil(settings.numWords / 2), numHard = settings.numWords - numEasy;
        if (easy.length < numEasy || hard.length < numHard) {
            const full = getOnlineWordObjects(settings);
            easy = shuffle(full.filter(word => word.difficulty === 'easy').map(word => word.word));
            hard = shuffle(full.filter(word => word.difficulty === 'hard').map(word => word.word));
        }
        const chosen = [...easy.slice(0, numEasy), ...hard.slice(0, numHard)];
        const remaining = [...easy, ...hard].filter(word => !chosen.includes(word));
        chosen.push(...remaining.slice(0, Math.max(0, settings.numWords - chosen.length)));
        const selected = new Set(chosen);
        return { words: shuffle(chosen), pools: {
            easyWords: easy.filter(word => !selected.has(word)), hardWords: hard.filter(word => !selected.has(word))
        } };
    }
    if (all.length < settings.numWords) all = shuffle(getOnlineWordObjects(settings).map(word => word.word));
    return { words: all.slice(0, settings.numWords), pools: { currentGameWords: all.slice(settings.numWords) } };
}

function planOnlineChaos(gameData, basePoints) {
    const rng = createSeededRandom(gameData.turn.seed);
    const powerups = generateRoundPowerupsMap(gameData.settings.pointsToWin, rng);
    const actorIndex = gameData.turn.teamIndex;
    const temporaryTeams = basePoints.map(points => ({ points }));
    const shields = normalizeTeamShields(gameData.chaos?.teamShields || [], gameData.teams.length);
    const tileIndex = getBoardCellIndexForPoints(basePoints[actorIndex], gameData.settings.pointsToWin);
    const type = basePoints[actorIndex] >= gameData.settings.pointsToWin ? null : powerups[tileIndex] || null;
    const summary = applyChaosPowerupToState({ teamsData: temporaryTeams, shields, actingTeamIndex: actorIndex, powerupType: type, rng });
    const moveCount = (gameData.turn.selectedIndexes || []).length;
    return {
        basePoints, points: temporaryTeams.map(team => team.points), shields, powerups,
        landing: type ? { teamIndex: actorIndex, tileIndex, type } : null,
        summary: formatChaosSummaryForAudit(summary), moveCount,
        actorDelta: summary.actorDelta, victimTeamIndex: summary.victimTeamIndex, victimDelta: summary.victimDelta,
        durationMs: CHAOS_PREMOVE_REVEAL_MS + moveCount * CHAOS_MOVE_STEP_DELAY_MS
            + (type ? CHAOS_LANDED_PREVIEW_DELAY_MS : 0)
            + (Math.abs(summary.actorDelta) + Math.abs(summary.victimDelta)) * CHAOS_MOVE_STEP_DELAY_MS
            + CHAOS_CLEAR_PAUSE_MS
    };
}

function renderOnlineClock() {
    const data = onlineClient?.snapshot;
    if (!data || !isOnlineGame) return;
    const now = onlineClient.serverNow();
    const view = OnlineState.view(data, onlineClient.actor, now);
    timer.hidden = !(onlineClient.connected && view.active && data.phase === 'describing');
    timer.textContent = String(view.remainingSeconds);
    if (data.phase !== 'resolving') return;
    const plan = data.turn.resolution;
    const actorIndex = data.turn.teamIndex;
    const elapsed = Math.max(0, now - plan.startedAt);
    const baseFinishedAt = CHAOS_PREMOVE_REVEAL_MS + plan.moveCount * CHAOS_MOVE_STEP_DELAY_MS;
    const effectStartsAt = baseFinishedAt + (plan.landing ? CHAOS_LANDED_PREVIEW_DELAY_MS : 0);
    const display = data.teams.map(team => Number(team.points) || 0);
    const steps = Math.max(0, Math.floor((elapsed - CHAOS_PREMOVE_REVEAL_MS) / CHAOS_MOVE_STEP_DELAY_MS) + 1);
    display[actorIndex] += Math.min(plan.moveCount, steps);
    const actorSteps = Math.max(0, Math.floor((elapsed - effectStartsAt) / CHAOS_MOVE_STEP_DELAY_MS) + 1);
    display[actorIndex] += Math.sign(plan.actorDelta) * Math.min(Math.abs(plan.actorDelta), actorSteps);
    if (Number.isInteger(plan.victimTeamIndex)) {
        const victimSteps = Math.max(0, Math.floor((elapsed - effectStartsAt - Math.abs(plan.actorDelta) * CHAOS_MOVE_STEP_DELAY_MS) / CHAOS_MOVE_STEP_DELAY_MS) + 1);
        display[plan.victimTeamIndex] += Math.sign(plan.victimDelta) * Math.min(Math.abs(plan.victimDelta), victimSteps);
    }
    landedPowerupPreview = elapsed >= baseFinishedAt && elapsed < effectStartsAt ? plan.landing : null;
    powerupRevealVisible = true;
    roundPowerups = plan.powerups;
    teamShields = elapsed >= effectStartsAt ? plan.shields : normalizeTeamShields(data.chaos?.teamShields || [], data.teams.length);
    const signature = JSON.stringify([display, landedPowerupPreview, teamShields]);
    if (signature !== onlineBoardSignature) {
        onlineBoardSignature = signature;
        teams.forEach((team, index) => { team.points = Math.max(0, display[index]); });
        updateBoard();
        updateTeamScores();
    }
}

function renderOnlineControls() {
    const data = onlineClient?.snapshot;
    if (!data || !isOnlineGame) return;
    const view = OnlineState.view(data, onlineClient.actor, onlineClient.serverNow());
    const active = view.active && onlineClient.connected && !onlineClient.suspended;
    isHost = active && view.host;
    isSpeaker = active && view.speaker;
    isRoundActive = data.phase === 'describing';
    endRoundEarly = Boolean(data.endRoundEarly);
    selectedButtons = (data.turn?.selectedIndexes || []).length;
    const busy = onlineClient.busy || onlineClient.registering;
    btnStartOnlineGame.hidden = !isHost || Boolean(data.isGameStarted);
    btnStartOnlineGame.disabled = busy || data.phase !== 'ready';
    btnStartRound.hidden = !(active && view.canStartRound);
    btnStartRound.disabled = busy;
    btnEndRound.hidden = !(active && view.canEndRound);
    btnEndRound.disabled = busy;
    btnNextRound.hidden = !(active && view.canSelect);
    btnNextRound.disabled = busy;
    btnNextRound.textContent = 'Next Round';
    btnEndGame.hidden = !isHost || data.phase === 'ended';
    btnEndGame.disabled = busy;
    document.getElementById('leaveOnlineGame').hidden = false;
    const rejoin = document.getElementById('rejoinOnlineGame');
    rejoin.hidden = Boolean((view.active && !onlineClient.error) || data.phase === 'ended' || onlineClient.registering);
    rejoin.disabled = busy;
    btnAnswers.hidden = !(active && view.showWords);
    const words = data.turn?.words || [];
    const selected = new Set(data.turn?.selectedIndexes || []);
    document.querySelectorAll('.scoreButton').forEach((button, index) => {
        button.hidden = btnAnswers.hidden || index >= words.length;
        button.disabled = busy || !view.canSelect;
        button.textContent = words[index] || '';
        setScoreButtonSelected(button, selected.has(index));
    });
    lblAnswers.textContent = data.phase === 'selecting'
        ? (isSpeaker ? 'Click the correct answers:' : "The 'Speaker' is selecting the correct answers:")
        : (isSpeaker ? 'Describe the below words:' : "The 'Speaker' is describing the following words:");
    if (active && isSpeaker && data.phase === 'describing') renderTrainingHints(words);
    else clearTrainingHints();
    let status = '';
    if (!onlineClient.connected || onlineClient.suspended) status = 'Status: Connection lost. Reconnecting...';
    else if (!view.player) status = 'Status: Your seat is no longer active. Rejoin the lobby to play.';
    else if (!view.active) status = 'Status: Rejoin the lobby to restore your connection.';
    else if (data.phase === 'waiting') status = 'Status: Waiting for players!';
    else if (data.phase === 'ready') status = 'Status: Waiting for host to start game!';
    else if (data.phase === 'resolving') status = 'Status: Resolving chaos turn...';
    else {
        const speaker = OnlineState.members(data).find(player => player.playerId === data.turn?.speakerId);
        if (speaker && !OnlineState.isConnected(data, speaker, onlineClient.serverNow())) status = 'Status: Waiting for the speaker to reconnect...';
    }
    lblGameState.hidden = !status;
    lblGameState.textContent = status;
    updateMobileGameFocus();
    renderOnlineClock();
}

function renderOnlineSnapshot(data) {
    if (!data || data.phase === 'ended') {
        if (onlineEndedHandled) return;
        onlineEndedHandled = true;
        isSpeaker = isHost = isRoundActive = false;
        clearInterval(countdownTimer);
        saveOnlineSession(null);
        void onlineClient?.close().catch(error => console.error('Failed to close connection:', error));
        alert(data ? 'Game over! Team scores:\n' + data.teams.map((team, index) => `Team ${index + 1}: ${team.points || 0} points`).join('\n') : 'Lobby has been closed.');
        location.reload();
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
    const boardKey = `${numTeams}:${pointsToWin}`;
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
    const turnId = onlineClient.snapshot.turn.id;
    onlineClient.busy = true;
    renderOnlineControls();
    try { await playSound(countdownSound, () => !onlineClient.connected || onlineClient.snapshot?.turn?.id !== turnId, 1.1); }
    finally { onlineClient.busy = false; }
    await sendOnlineCommand({ type: 'start-round', turnId, seed: crypto.getRandomValues(new Uint32Array(1))[0] });
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
