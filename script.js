import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, onValue, ref, get, set, push, off, update, child, remove, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

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
const API_KEY = "AIzaSyAZkNr8lIdg6MyTCD3urTdiEgzJoKOamsk";
const genAI = new GoogleGenerativeAI(API_KEY);
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
let teamShields = [];
let isResolvingChaosMove = false;
let lastProcessedChaosResolutionId = 0;
let lastProcessedChaosPendingId = 0;

const RECENT_WORDS_STORAGE_KEY = "half_a_minute_recent_words_v1";
const MAX_RECENT_WORDS = 600;

const HEARTBEAT_INTERVAL_MS = 4000;
const HOST_STALE_THRESHOLD_MS = 10000;
const STALE_PLAYER_THRESHOLD_MS = 90000;
const STALE_CLEANUP_INTERVAL_MS = 3000;
const LOBBY_EXPIRY_MS = 12 * 60 * 60 * 1000;
const JOIN_TRANSACTION_MAX_RETRIES = 3;
const JOIN_RETRY_BASE_DELAY_MS = 220;
const CHAOS_MOVE_STEP_DELAY_MS = 420;
const CHAOS_PREMOVE_REVEAL_MS = 3000;
const CHAOS_CLEAR_PAUSE_MS = 450;
let heartbeatIntervalId = null;
let staleCleanupIntervalId = null;
let isHeartbeatWriteInFlight = false;
let lastProcessedAuditEventId = 0;

const registeredModalHandlers = new Set();

const CHAOS_POWERUP_TYPES = {
    plus1: { label: "+1", weight: 34, cssClass: "powerup-plus" },
    plus2: { label: "+2", weight: 7, cssClass: "powerup-plus-rare" },
    minus1: { label: "-1", weight: 28, cssClass: "powerup-minus" },
    minus2: { label: "-2", weight: 5, cssClass: "powerup-minus-rare" },
    bomb: { label: "BOMB", weight: 2, cssClass: "powerup-bomb" },
    shield: { label: "SHIELD", weight: 14, cssClass: "powerup-shield" },
    steal1: { label: "STEAL 1", weight: 10, cssClass: "powerup-steal" }
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

// Audio elements
const startSound = document.getElementById('startSound');
const countdownSound = document.getElementById('countdownSound');
const tickSound = document.getElementById('tickSound');
const warningSound = document.getElementById('warningSound');
const endSound = document.getElementById('endSound');
const endSoundAlt = document.getElementById('endSoundAlt');

// Load menu
document.addEventListener("DOMContentLoaded", () => {
    initializeMenu();
});

function setLayoutMode(mode = "menu") {
    document.body.classList.remove("layout-menu", "layout-game");
    document.body.classList.add(mode === "game" ? "layout-game" : "layout-menu");
}

function initializeMenu() {
    setLayoutMode("menu");
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
}

//// FIREBASE METHODS START ////
// Function to set data
function setData(path, data) {
    return set(ref(db, path), data)
        .then(() => console.log(`Data set at ${path}`))
        .catch((error) => console.error(`Error setting data: ${error}`));
}

// Function to update data
function updateData(path, data) {
    return update(ref(db, path), data)
        .then(() => {
            console.log(`Data updated at ${path}`)
        })
        .catch((error) => console.error(`Error updating data: ${error}`));
}

function updateDataSilent(path, data) {
    return update(ref(db, path), data)
        .catch((error) => console.error(`Error updating data: ${error}`));
}

function setDataSilent(path, data) {
    return set(ref(db, path), data)
        .catch((error) => console.error(`Error setting data: ${error}`));
}

// Function to add data using push
function pushData(path, data) {
    const newRef = push(ref(db, path));
    return set(newRef, data)
        .then(() => console.log(`Data pushed to ${path}`))
        .catch((error) => console.error(`Error pushing data: ${error}`));
}

// Function to remove data
function removeData(path) {
    return remove(ref(db, path))
        .then(() => {
            //console.log(`Data removed from ${path}`)
        })
        .catch((error) => console.error(`Error removing data: ${error}`));
}

// Function to read data once
async function readDataOnce(path) {
    try {
        const snapshot = await get(ref(db, path));
        return snapshot.val();
    } catch (error) {
        console.error(`Error reading data: ${error}`);
        throw error;
    }
}

// Function to listen for changes
function listenForChanges(path, callback) {
    const dataRef = ref(db, path);
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        //console.log(`Data changed at ${path}`, data);
        callback(data);
    });
}

// Function to stop listening for changes
function stopListening(path) {
    const dataRef = ref(db, path);
    off(dataRef);
    console.log(`Stopped listening to ${path}`);
}

function firebaseWrite(path, data) {
    return set(ref(db, path), data);
}

function firebaseRead(path, callback) {
    const dataRef = ref(db, path);
    onValue(dataRef, (snapshot) => {
        callback(snapshot.val());
    });
}

function firebaseDelete(path) {
    remove(ref(db, path));
}
//// FIREBASE METHODS END ////

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

function isRetryableJoinError(error) {
    const code = String(error?.code || "").toLowerCase();
    const message = String(error?.message || "").toLowerCase();
    return code.includes("aborted") || message.includes("aborted") || message.includes("retry");
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

function buildChaosPendingPayload({
    resolutionId,
    teamIndexForRound,
    roundNumberForRound,
    correctAnswers,
    selectedPoints
}) {
    return {
        id: Number(resolutionId),
        submittedBy: playerName,
        teamIndex: teamIndexForRound,
        roundNumber: roundNumberForRound,
        points: clampInt(selectedPoints, 0, 0, numWords),
        correctAnswers: Array.isArray(correctAnswers) ? [...correctAnswers] : [],
        easyWords: Array.isArray(easyWords) ? [...easyWords] : [],
        hardWords: Array.isArray(hardWords) ? [...hardWords] : [],
        currentGameWords: Array.isArray(currentGameWords) ? [...currentGameWords] : []
    };
}

async function syncChaosVisualState(roundNumberForRound = currentRound + 1) {
    if (!isOnlineGame || !isHost || !gameCode) {
        return;
    }

    await updateDataSilent(`games/${gameCode}/chaos`, {
        roundId: Number(roundNumberForRound) || 0,
        powerups: { ...roundPowerups },
        reveal: Boolean(powerupRevealVisible),
        teamShields: [...teamShields]
    });
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

function toPresenceKey(name) {
    return String(name || "")
        .trim()
        .toLowerCase()
        .replace(/[.#$/\[\]]/g, "_");
}

function getBalancedTeamIndex(teamsData, configuredTeamCount, totalPlayers) {
    const candidateIndexes = Array.from({ length: configuredTeamCount }, (_, index) => index);
    let minPlayers = Number.MAX_SAFE_INTEGER;
    let leastFilledTeamIndexes = [];

    for (const teamIndex of candidateIndexes) {
        const team = teamsData[teamIndex];
        const teamSize = team?.players?.length || 0;
        if (teamSize < minPlayers) {
            minPlayers = teamSize;
            leastFilledTeamIndexes = [teamIndex];
        } else if (teamSize === minPlayers) {
            leastFilledTeamIndexes.push(teamIndex);
        }
    }

    if (leastFilledTeamIndexes.length === 0) {
        return totalPlayers % configuredTeamCount;
    }

    return leastFilledTeamIndexes[totalPlayers % leastFilledTeamIndexes.length];
}

function countPlayersInTeams(teamsData = []) {
    return teamsData.reduce((total, team) => total + (team.players ? team.players.length : 0), 0);
}

function ensureTeamsShape(teamsData = []) {
    teamsData.forEach((team, index) => {
        if (!Array.isArray(team.players)) {
            team.players = [];
        }

        if (team.id === undefined || team.id === null) {
            team.id = index;
        }
    });
}

function reindexPlayers(teamsData = []) {
    teamsData.forEach(team => {
        if (!Array.isArray(team.players)) {
            team.players = [];
        }

        team.players.forEach((player, index) => {
            player.id = index;
        });
    });
}

function getFirstAvailablePlayerName(teamsData = []) {
    for (const team of teamsData) {
        if (team.players && team.players.length > 0) {
            return team.players[0].playerName;
        }
    }

    return "";
}

function assignFallbackSpeaker(teamsData = [], preferredTeamIndex = 0) {
    teamsData.forEach(team => {
        if (team.players) {
            team.players.forEach(player => {
                player.isSpeaker = false;
            });
        }
    });

    if (teamsData.length === 0) {
        return;
    }

    const teamCount = teamsData.length;
    for (let offset = 0; offset < teamCount; offset++) {
        const index = (preferredTeamIndex + offset) % teamCount;
        const team = teamsData[index];
        if (team.players && team.players.length > 0) {
            team.players[0].isSpeaker = true;
            return;
        }
    }
}

function isTeamsValidForTeamCount(teamCount, playerCount) {
    if (teamCount == 2 && playerCount == 2) {
        return true;
    }
    else if (teamCount == 3 && playerCount == 3) {
        return true;
    }
    else if (playerCount >= teamCount * 2) {
        return true;
    }
    else {
        return false;
    }
}

function getConfiguredTeamCount(gameData) {
    const teamsCount = Array.isArray(gameData?.teams) ? gameData.teams.length : 0;
    const configured = Number(gameData?.settings?.numTeams) || teamsCount;
    return Math.max(1, Math.min(configured, teamsCount || configured));
}

async function joinPlayerToLobby(playerNameToJoin) {
    const gameRef = ref(db, `games/${gameCode}`);
    const safePlayerName = sanitizePlayerName(playerNameToJoin);
    if (!safePlayerName) {
        return { success: false, reason: "invalid-player-name" };
    }

    for (let attempt = 1; attempt <= JOIN_TRANSACTION_MAX_RETRIES; attempt++) {
        let duplicatePlayerName = false;
        let lobbyUnavailable = false;
        const now = Date.now();

        try {
            // Preflight read helps avoid false "unavailable" on freshly-created lobbies.
            const preflightData = await readDataOnce(`games/${gameCode}`);
            if (!preflightData || preflightData.gameState === "ended") {
                if (attempt < JOIN_TRANSACTION_MAX_RETRIES) {
                    const delay = JOIN_RETRY_BASE_DELAY_MS * attempt;
                    console.info(`[join] preflight missing/ended for ${safePlayerName} (attempt ${attempt}/${JOIN_TRANSACTION_MAX_RETRIES}); retrying in ${delay}ms`);
                    await sleep(delay);
                    continue;
                }

                return { success: false, reason: "lobby-unavailable" };
            }

            const result = await runTransaction(gameRef, (gameData) => {
                let workingGameData = gameData;
                if (!workingGameData && preflightData && preflightData.gameState !== "ended") {
                    // If SDK gives an initial empty snapshot, use confirmed preflight state as a base.
                    workingGameData = JSON.parse(JSON.stringify(preflightData));
                }

                if (!workingGameData) {
                    lobbyUnavailable = true;
                    return;
                }

                if (workingGameData.gameState === "ended") {
                    lobbyUnavailable = true;
                    return;
                }

                if (!Array.isArray(workingGameData.teams) || workingGameData.teams.length === 0) {
                    lobbyUnavailable = true;
                    return;
                }

                ensureTeamsShape(workingGameData.teams);
                const configuredTeamCount = getConfiguredTeamCount(workingGameData);

                if (doesPlayerExist(workingGameData.teams, safePlayerName)) {
                    duplicatePlayerName = true;
                    return;
                }

                const totalPlayers = countPlayersInTeams(workingGameData.teams);
                const teamIndex = getBalancedTeamIndex(workingGameData.teams, configuredTeamCount, totalPlayers);
                const targetTeam = workingGameData.teams[teamIndex];
                const playerToAdd = {
                    id: targetTeam.players.length,
                    playerName: safePlayerName,
                    isSpeaker: totalPlayers === 0
                };

                targetTeam.players.push(playerToAdd);
                workingGameData.numPlayers = totalPlayers + 1;
                workingGameData.presence = workingGameData.presence || {};
                workingGameData.presence[toPresenceKey(safePlayerName)] = {
                    playerName: safePlayerName,
                    lastSeen: now
                };

                if (!workingGameData.hostName) {
                    workingGameData.hostName = safePlayerName;
                }

                const canStart = isTeamsValidForTeamCount(configuredTeamCount, workingGameData.numPlayers);
                workingGameData.gameState = canStart ? (workingGameData.isGameStarted ? "resumed" : "ready") : "waiting";

                if (canStart && workingGameData.isGameStarted) {
                    const hasSpeaker = workingGameData.teams.some(team =>
                        Array.isArray(team.players) && team.players.some(player => player.isSpeaker)
                    );

                    if (!hasSpeaker) {
                        const preferredTeamIndex = Math.max(0, (workingGameData.currentTeam || 1) - 1);
                        assignFallbackSpeaker(workingGameData.teams, preferredTeamIndex);
                    }
                }

                return workingGameData;
            }, { applyLocally: false });

            if (!result.committed) {
                if (duplicatePlayerName) {
                    return { success: false, reason: "duplicate-player-name" };
                }

                if (lobbyUnavailable) {
                    return { success: false, reason: "lobby-unavailable" };
                }

                if (attempt < JOIN_TRANSACTION_MAX_RETRIES) {
                    const delay = JOIN_RETRY_BASE_DELAY_MS * attempt;
                    console.info(`[join] transient abort for ${safePlayerName} (attempt ${attempt}/${JOIN_TRANSACTION_MAX_RETRIES}); retrying in ${delay}ms`);
                    await sleep(delay);
                    continue;
                }

                return { success: false, reason: "transaction-aborted" };
            }

            const updatedGame = result.snapshot.val();
            teams = updatedGame?.teams || [];
            numPlayers = updatedGame?.numPlayers ?? countPlayersInTeams(teams);
            numTeams = updatedGame?.settings?.numTeams ?? numTeams;
            isGameStarted = Boolean(updatedGame?.isGameStarted);

            return { success: true };
        } catch (error) {
            if (attempt < JOIN_TRANSACTION_MAX_RETRIES && isRetryableJoinError(error)) {
                const delay = JOIN_RETRY_BASE_DELAY_MS * attempt;
                console.info(`[join] retryable transaction error for ${safePlayerName} (attempt ${attempt}/${JOIN_TRANSACTION_MAX_RETRIES}): ${error?.message || error}`);
                await sleep(delay);
                continue;
            }

            console.error("Failed to join lobby:", error);
            return { success: false, reason: "join-error", error };
        }
    }

    return { success: false, reason: "transaction-aborted" };
}

async function leaveLobbyWithTransaction() {
    if (!isOnlineGame || !gameCode || !playerName || isLeavingLobby) {
        return;
    }

    isLeavingLobby = true;
    const gameRef = ref(db, `games/${gameCode}`);

    try {
        await runTransaction(gameRef, (gameData) => {
            if (!gameData || !Array.isArray(gameData.teams)) {
                return gameData;
            }

            ensureTeamsShape(gameData.teams);

            let removedPlayer = null;
            let removedTeamIndex = -1;

            for (let teamIndex = 0; teamIndex < gameData.teams.length; teamIndex++) {
                const team = gameData.teams[teamIndex];
                const playerIndex = team.players.findIndex(player => player.playerName === playerName);
                if (playerIndex !== -1) {
                    removedPlayer = team.players[playerIndex];
                    removedTeamIndex = teamIndex;
                    team.players.splice(playerIndex, 1);
                    break;
                }
            }

            if (!removedPlayer) {
                return gameData;
            }

            if (gameData.presence) {
                delete gameData.presence[toPresenceKey(playerName)];
            }

            reindexPlayers(gameData.teams);
            gameData.numPlayers = countPlayersInTeams(gameData.teams);

            if (gameData.numPlayers <= 0) {
                return null;
            }

            if (gameData.hostName === playerName) {
                gameData.hostName = getFirstAvailablePlayerName(gameData.teams);
            }
            if (!gameData.hostName) {
                gameData.hostName = getFirstAvailablePlayerName(gameData.teams);
            }

            const configuredTeamCount = getConfiguredTeamCount(gameData);
            const canContinue = isTeamsValidForTeamCount(configuredTeamCount, gameData.numPlayers);

            if (!canContinue) {
                clearAllSpeakers(gameData.teams);
                gameData.roundActive = false;
                gameData.words = [];
                if (gameData.isGameStarted) {
                    gameData.endRoundEarly = true;
                    gameData.remainingTime = 0;
                }

                gameData.gameState = "waiting";
                return gameData;
            }

            const hasSpeaker = gameData.teams.some(team =>
                team.players && team.players.some(player => player.isSpeaker)
            );

            if (!hasSpeaker) {
                const preferredTeamIndex = removedPlayer.isSpeaker
                    ? Math.max(0, (gameData.currentTeam || 1) - 1)
                    : Math.max(0, removedTeamIndex);
                assignFallbackSpeaker(gameData.teams, preferredTeamIndex);
            }

            if (removedPlayer.isSpeaker && gameData.isGameStarted) {
                gameData.endRoundEarly = true;
                gameData.remainingTime = 0;
                gameData.roundActive = false;
            }

            gameData.gameState = canContinue ? (gameData.isGameStarted ? "resumed" : "ready") : "waiting";

            return gameData;
        }, { applyLocally: false });
    } catch (error) {
        console.error("Failed to leave lobby:", error);
    } finally {
        isLeavingLobby = false;
    }
}

function registerLobbyExitHandlers() {
    if (hasRegisteredLobbyExitHandlers) {
        return;
    }

    const handleLobbyExit = () => {
        stopLobbyHeartbeat();
        stopStalePlayerCleanupLoop();
        void leaveLobbyWithTransaction();
    };

    window.addEventListener("beforeunload", handleLobbyExit);
    window.addEventListener("pagehide", handleLobbyExit);
    hasRegisteredLobbyExitHandlers = true;
}

function stopLobbyHeartbeat() {
    if (heartbeatIntervalId) {
        clearInterval(heartbeatIntervalId);
        heartbeatIntervalId = null;
    }
}

function startLobbyHeartbeat() {
    if (heartbeatIntervalId || !isOnlineGame || !gameCode || !playerName) {
        return;
    }

    const writeHeartbeat = async () => {
        if (isHeartbeatWriteInFlight || !isOnlineGame || !gameCode || !playerName) {
            return;
        }

        isHeartbeatWriteInFlight = true;
        try {
            await updateDataSilent(`games/${gameCode}/presence/${toPresenceKey(playerName)}`, {
                playerName,
                lastSeen: Date.now()
            });
        } catch (error) {
            console.error("Failed heartbeat update:", error);
        } finally {
            isHeartbeatWriteInFlight = false;
        }
    };

    void writeHeartbeat();
    heartbeatIntervalId = setInterval(() => {
        void writeHeartbeat();
    }, HEARTBEAT_INTERVAL_MS);

    startStalePlayerCleanupLoop();
}

async function triggerOnlineHealthScan() {
    if (!isOnlineGame || !gameCode) {
        return;
    }

    await pruneStalePlayers();
}

function clearAllSpeakers(teamsData = []) {
    teamsData.forEach(team => {
        if (Array.isArray(team.players)) {
            team.players.forEach(player => {
                player.isSpeaker = false;
            });
        }
    });
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
}

function stopStalePlayerCleanupLoop() {
    if (staleCleanupIntervalId) {
        clearInterval(staleCleanupIntervalId);
        staleCleanupIntervalId = null;
    }
}

async function pruneStalePlayers() {
    if (!isOnlineGame || !gameCode || !playerName) {
        return;
    }

    const gameRef = ref(db, `games/${gameCode}`);
    const now = Date.now();

    try {
        await runTransaction(gameRef, (gameData) => {
            if (!gameData || !Array.isArray(gameData.teams)) {
                return gameData;
            }

            ensureTeamsShape(gameData.teams);
            gameData.presence = gameData.presence || {};

            const callerIsCurrentHost = normalizeWord(gameData.hostName) === normalizeWord(playerName);
            const hostPresence = getPresenceForPlayer(gameData, gameData.hostName);
            const hostLastSeen = hostPresence?.lastSeen || 0;
            const hostIsStale = !gameData.hostName || !hostPresence || (now - hostLastSeen) > HOST_STALE_THRESHOLD_MS;

            // If host is healthy, only host should perform stale cleanup writes.
            if (!callerIsCurrentHost && !hostIsStale) {
                return gameData;
            }

            const stalePresenceKeys = Object.keys(gameData.presence).filter(presenceKey => {
                const presence = gameData.presence[presenceKey];
                const lastSeen = presence?.lastSeen || 0;
                return (now - lastSeen) > STALE_PLAYER_THRESHOLD_MS;
            });

            const stalePlayers = new Set(
                stalePresenceKeys
                    .map(presenceKey => gameData.presence[presenceKey]?.playerName)
                    .filter(Boolean)
            );

            // If the host went stale (or host entry disappeared), force host recalculation.
            if (hostIsStale && gameData.hostName) {
                stalePlayers.add(gameData.hostName);
            }

            if (stalePresenceKeys.length === 0 && stalePlayers.size === 0 && !hostIsStale) {
                return gameData;
            }

            console.info(`[presence] pruning ${stalePlayers.size} stale player(s) from lobby ${gameCode}`);

            let speakerWasRemoved = false;
            gameData.teams.forEach(team => {
                if (!Array.isArray(team.players)) {
                    team.players = [];
                }

                team.players = team.players.filter(player => {
                    const shouldKeep = !stalePlayers.has(player.playerName);
                    if (!shouldKeep && player.isSpeaker) {
                        speakerWasRemoved = true;
                    }
                    return shouldKeep;
                });
            });

            stalePresenceKeys.forEach(presenceKey => {
                delete gameData.presence[presenceKey];
            });
            if (gameData.hostName && stalePlayers.has(gameData.hostName)) {
                delete gameData.presence[toPresenceKey(gameData.hostName)];
            }

            reindexPlayers(gameData.teams);
            gameData.numPlayers = countPlayersInTeams(gameData.teams);

            if (gameData.numPlayers <= 0) {
                return null;
            }

            if (gameData.hostName && stalePlayers.has(gameData.hostName)) {
                gameData.hostName = getFirstAvailablePlayerName(gameData.teams);
            }
            if (!gameData.hostName) {
                gameData.hostName = getFirstAvailablePlayerName(gameData.teams);
            }

            const configuredTeamCount = getConfiguredTeamCount(gameData);
            const canContinue = isTeamsValidForTeamCount(configuredTeamCount, gameData.numPlayers);

            if (!canContinue) {
                clearAllSpeakers(gameData.teams);
                gameData.roundActive = false;
                gameData.words = [];
                if (gameData.isGameStarted) {
                    gameData.endRoundEarly = true;
                    gameData.remainingTime = 0;
                }

                gameData.gameState = "waiting";
                return gameData;
            }

            const hasSpeaker = gameData.teams.some(team =>
                team.players && team.players.some(player => player.isSpeaker)
            );

            if (!hasSpeaker) {
                assignFallbackSpeaker(gameData.teams, Math.max(0, (gameData.currentTeam || 1) - 1));
            }

            if ((speakerWasRemoved || !hasSpeaker) && gameData.isGameStarted) {
                gameData.endRoundEarly = true;
                gameData.remainingTime = 0;
                gameData.roundActive = false;
            }

            gameData.gameState = canContinue ? (gameData.isGameStarted ? "resumed" : "ready") : "waiting";

            return gameData;
        }, { applyLocally: false });
    } catch (error) {
        console.error("Failed stale-player cleanup:", error);
    }
}

function startStalePlayerCleanupLoop() {
    if (staleCleanupIntervalId || !isOnlineGame || !gameCode) {
        return;
    }

    void pruneStalePlayers();
    staleCleanupIntervalId = setInterval(() => {
        void pruneStalePlayers();
    }, STALE_CLEANUP_INTERVAL_MS);
}

async function onLobbyJoined() {
    // Play game start sound
    await playSound(startSound, () => false, 1.2);
    setLayoutMode("game");

    isOnlineGame = true;

    hideElement(txtLobbyMenu);
    showElement(txtLobbyPlayers);
    hideModalById("onlineModal");

    // Show/Hide UI elements
    hideElement(menu);
    hideElement(btnSettings);
    hideElement(btnAI);
    hideElement(btnRules);
    showElement(game);
    showElement(btnHistory);
    hideElement(btnStartRound);
    hideElement(btnNextRound);

    if (isHost) {
        showElement(btnStartOnlineGame);
        btnStartOnlineGame.disabled = true;
    }
    else {
        hideElement(btnEndGame);
    }

    registerModal(btnHistory, "historyModal");

    displayGameCode(gameCode);
    showElement(lblGameState);

    playerName = sanitizePlayerName(txtPlayerName.value);
    txtPlayerName.value = playerName;

    if (!playerName) {
        alert("Enter a valid player name!");
        location.reload();
        return;
    }

    const joinResult = await joinPlayerToLobby(playerName);
    if (!joinResult.success) {
        console.warn(`[join] failed for ${playerName} in lobby ${gameCode}:`, joinResult.reason, joinResult.error || "");
        if (joinResult.reason === "duplicate-player-name") {
            alert("Player name is already in use in this lobby.");
        } else if (joinResult.reason === "lobby-unavailable") {
            alert("Lobby is unavailable, expired, or already ended.");
        } else if (joinResult.reason === "invalid-player-name") {
            alert("Please use a valid player name.");
        } else if (joinResult.reason === "transaction-aborted") {
            alert("Join failed because of a temporary sync issue. Please try again.");
        } else {
            alert("Unable to join lobby right now. Please try again.");
        }

        location.reload();
        return;
    }

    lastProcessedAuditEventId = 0;
    lastProcessedChaosPendingId = 0;

    registerLobbyExitHandlers();
    startLobbyHeartbeat();
    createTeamAuditTables(numTeams, { forceReset: true });

    // Handle answer button click logic
    let count = 0;
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (count < numWords) {
            count++;
            button.addEventListener("click", async () => {
                if (!btnNextRound.hidden) {
                    if (button.style.background == "grey") {
                        selectedButtons--;
                        button.style.background = null;
                        await updateData(`games/${gameCode}`, { clickedButton: button.textContent });
                    }
                    else {
                        selectedButtons++;
                        button.style.background = "grey";
                        await updateData(`games/${gameCode}`, { clickedButton: `!${button.textContent}` });
                    }
                }
            });
        }
    });

    await readDataOnce(`games/${gameCode}/currentTeam`).then(currentTeamNumber => {
        if (currentTeamNumber) {
            currentTeam = currentTeamNumber;
        }
        else {
            // Set starting team
            currentTeam = 1;
            setCurrentTeam();
        }
    });

    // Add gameState listener to know when to start/update game
    listenForChanges(`games/${gameCode}/gameState`, async (state) => {
        onlineGameState = state || "waiting";
        if (state == "started") {
            isGameStarted = true;
            hideElement(lblGameState);
            if (isHost) {
                hideElement(btnStartOnlineGame);
                showElement(btnStartRound);
            }

            createTeamAuditTables(numTeams);
            generateBoard();
            updateBoard();
            updateTeamScores();
            updateCurrentTeamIndicator();
        }
        else if (state === "waiting") {
            if (isHost) {
                btnStartOnlineGame.disabled = true;
            }

            hideElement(btnStartRound);
            showElement(lblGameState);
            lblGameState.textContent = "Status: Waiting for players!";
        }
        else if (state === "ready") {
            if (isHost) {
                btnStartOnlineGame.disabled = false;
            }
            hideElement(btnStartRound);
            lblGameState.textContent = "Status: Waiting for host to start game!";
        }
        else if (state === "resumed") {
            if (isSpeaker) {
                showElement(btnStartRound);
            }
            hideElement(lblGameState);

            createTeamAuditTables(numTeams);
            generateBoard();
            updateBoard();
            updateTeamScores();
            updateCurrentTeamIndicator();

            // For 2 or 3 player games, we do not show words to other players
            if ((numTeams == 2 && numPlayers == 2) || (numTeams == 3 && numPlayers == 3)) {
                if (!isSpeaker) {
                    btnAnswers.hidden = true;
                }
            }
            // Show the words to players in other teams
            else if (getPlayerTeamIndex() != getCurrentTeamIndex(currentTeam)) {
                btnAnswers.hidden = false;
            }
        }
        else if (state === "ended") {
            stopLobbyHeartbeat();
            stopStalePlayerCleanupLoop();
            alert("Game over! Team scores:\n" + teams.map((team, index) => `Team ${index + 1}: ${team.points} points`).join("\n"));
            location.reload();
        }
    });

    listenForChanges(`games/${gameCode}/settings`, (settingsFromDb) => {
        const sanitizedSettings = sanitizeGameSettingsFromDb(settingsFromDb || {}, numTeams);
        isChaosMode = Boolean(sanitizedSettings.chaosMode);
        if (!isChaosMode) {
            roundPowerups = {};
            powerupRevealVisible = false;
            teamShields = createInitialTeamShields(teams.length || numTeams || 2);
            updateBoard();
        }
        if (chkChaos) {
            chkChaos.checked = isChaosMode;
        }
    });

    listenForChanges(`games/${gameCode}/roundActive`, (roundActive) => {
        isRoundActive = Boolean(roundActive);
        if (!isRoundActive && !isSpeaker) {
            hideTimerAndAnswers();
            clearWords();
        }
    });

    // Teams are updated when a player joins or leaves
    listenForChanges(`games/${gameCode}/teams`, (teamData) => {
        if (!teamData) {
            stopLobbyHeartbeat();
            stopStalePlayerCleanupLoop();
            alert("Lobby has been closed.");
            location.reload();
            return;
        }

        // Detect changes and notify
        detectPlayerChanges(teams, teamData);
        teams = Array.isArray(teamData) ? teamData : [];
        ensureTeamsShape(teams);
        numTeams = teams.length || numTeams;

        // Set numPlayers to the total number of players
        numPlayers = countPlayersInTeams(teams);

        // Update the player list UI
        updatePlayerListUI(teams);
        if (isGameStarted) {
            if (isTeamsValid(numPlayers)) {
                updateUI();
            }
            hideTimerAndAnswers();
        }
    });

    listenForChanges(`games/${gameCode}/currentTeam`, (currentTeam) => {
        if (isGameStarted) {
            updateRound(currentTeam, 'currentTeam');
        }
    });

    listenForChanges(`games/${gameCode}/currentRound`, (currentRound) => {
        if (isGameStarted) {
            updateRound(currentRound, 'currentRound');
        }
    });

    listenForChanges(`games/${gameCode}/numPlayers`, (np) => {
        numPlayers = np;
    });

    listenForChanges(`games/${gameCode}/easyWords`, (easyWords) => {
        updateWords(easyWords, 'easyWords');
    });

    listenForChanges(`games/${gameCode}/hardWords`, (hardWords) => {
        updateWords(hardWords, 'hardWords');
    });

    listenForChanges(`games/${gameCode}/currentGameWords`, (currentGameWords) => {
        updateWords(currentGameWords, 'currentGameWords');
    });

    listenForChanges(`games/${gameCode}/words`, (words) => {
        if (words && isGameStarted && (isRoundActive || isSpeaker)) {
            lblAnswers.textContent = "The 'Speaker' is describing the following words:";

            const scoreButtons = document.getElementsByClassName("scoreButton");
            for (let index = 0; index < scoreButtons.length; index++) {
                if (index < numWords) {
                    const element = scoreButtons[index];
                    element.hidden = false;
                }
            }

            const wordButtons = document.getElementsByClassName("scoreButton");

            words.forEach((word, index) => {
                wordButtons[index].textContent = word;
            });
            renderTrainingHints(words);

            // For 2 or 3 player games, we do not show words to other players
            if ((numTeams == 2 && numPlayers == 2) || (numTeams == 3 && numPlayers == 3)) {
                if (!isSpeaker) {
                    btnAnswers.hidden = true;
                }
            }
            // Show the words to players in other teams
            else if (getPlayerTeamIndex() != getCurrentTeamIndex(currentTeam)) {
                btnAnswers.hidden = false;
            }
        }
        else if (!isSpeaker) {
            hideTimerAndAnswers();
        }
    });

    listenForChanges(`games/${gameCode}/remainingTime`, (seconds) => {
        if (seconds !== null && seconds !== undefined && isGameStarted && isRoundActive) {
            // Show timer to all players
            if (!isSpeaker) {
                showElement(timer);
                let remainingTime = seconds;
                timer.textContent = remainingTime;

                if (remainingTime <= 0) {
                    lblAnswers.textContent = "The 'Speaker' is selecting the correct answers:";
                    btnAnswers.hidden = false;
                    clearWords();
                }
            }
        }
    });

    listenForChanges(`games/${gameCode}/endRoundEarly`, (endRoundEarly) => {
        if (endRoundEarly && isGameStarted) {
            // Hide stuff
            if (!isSpeaker) {
                lblAnswers.textContent = "The 'Speaker' has ended the round early and is now selecting the correct answers:";
                btnAnswers.hidden = false;
                clearWords();
            }
        }
    });

    listenForChanges(`games/${gameCode}/auditEvent`, (auditEvent) => {
        if (!isGameStarted || !auditEvent || typeof auditEvent !== "object") {
            return;
        }

        const eventId = Number(auditEvent.id);
        if (!Number.isFinite(eventId) || eventId <= lastProcessedAuditEventId) {
            return;
        }

        const teamIndex = Number(auditEvent.teamIndex);
        const roundNumber = Number(auditEvent.roundNumber);
        if (!Number.isInteger(teamIndex) || teamIndex < 0 || teamIndex >= numTeams) {
            return;
        }

        if (!Number.isInteger(roundNumber) || roundNumber < 1) {
            return;
        }

        lastProcessedAuditEventId = eventId;
        createTeamAuditColumns(teamIndex, roundNumber);
        createTeamAuditRows(teamIndex, roundNumber, auditEvent.correctAnswers);
    });

    listenForChanges(`games/${gameCode}/chaos`, (chaosState) => {
        const normalized = getNormalizedChaosState(chaosState || {}, teams.length || numTeams, pointsToWin);
        roundPowerups = normalized.powerups;
        powerupRevealVisible = normalized.reveal;
        teamShields = normalized.teamShields;
        lastProcessedChaosResolutionId = Math.max(lastProcessedChaosResolutionId, normalized.resolutionId);

        if (!isGameStarted) {
            return;
        }

        updateBoard();
        updateTeamScores();
    });

    listenForChanges(`games/${gameCode}/chaos/pending`, (pendingState) => {
        if (!isHost || !isOnlineGame || !isChaosMode || !isGameStarted || !pendingState || typeof pendingState !== "object") {
            return;
        }

        const pendingId = Number(pendingState.id);
        if (!Number.isFinite(pendingId) || pendingId <= 0 || pendingId <= lastProcessedChaosPendingId) {
            return;
        }

        lastProcessedChaosPendingId = pendingId;
        void resolveOnlineChaosPending(pendingState);
    });

    listenForChanges(`games/${gameCode}/hostName`, (hostName) => {
        isHost = hostName === playerName;
        if (isHost) {
            showElement(btnEndGame);
            const canShowStartButton = !isGameStarted && (onlineGameState === "waiting" || onlineGameState === "ready");
            if (canShowStartButton) {
                showElement(btnStartOnlineGame);
                btnStartOnlineGame.disabled = onlineGameState !== "ready" || !isTeamsValid(numPlayers);
            } else {
                hideElement(btnStartOnlineGame);
            }
        }
        else {
            hideElement(btnEndGame);
            hideElement(btnStartOnlineGame);
        }

        // Keep cleanup loop active for host failover detection, even on non-host clients.
        startStalePlayerCleanupLoop();
    });

    listenForChanges(`games/${gameCode}/clickedButton`, (clickedButton) => {
        if (clickedButton && isGameStarted && !isSpeaker) {
            const buttons = document.querySelectorAll('button.scoreButton');
            // Loop through the buttons to find the one with the specified text
            for (const button of buttons) {
                let startsWithExclamation = clickedButton.startsWith("!");
                if ((startsWithExclamation && clickedButton.slice(1) === button.textContent.trim()) || clickedButton === button.textContent.trim()) {
                    if (button.style.background == "grey") {
                        button.style.background = null;
                    }
                    else {
                        button.style.background = "grey";
                    }
                }
            }
        }
    });
}

function isTeamsValid (numPlayers) {
    return isTeamsValidForTeamCount(numTeams, numPlayers);
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
}

async function createGameLobby() {
    // Host specific settings
    isHost = true;
    isSpeaker = true;
    playerName = sanitizePlayerName(txtPlayerName.value);
    txtPlayerName.value = playerName;
    if (!playerName) {
        alert("Enter a valid player name!");
        return;
    }

    const sanitizedSettings = getSanitizedSettingsFromInputs();
    difficulty = sanitizedSettings.difficulty;
    numTeams = sanitizedSettings.numTeams;
    pointsToWin = sanitizedSettings.pointsToWin;
    numWords = sanitizedSettings.numWords;
    numSeconds = sanitizedSettings.numSeconds;
    isChaosMode = sanitizedSettings.chaosMode;
    isTrainingMode = sanitizedSettings.trainingMode;
    const selectedCategories = [...sanitizedSettings.selectedCategories];
    const selectedTheme = sanitizedSettings.selectedTheme;
    activeSelectedTheme = selectedTheme;
    activeSelectedCategories = [...selectedCategories];

    const gameSettings = {
        numTeams,
        difficulty,
        pointsToWin,
        numWords,
        numSeconds,
        chaosMode: isChaosMode,
        trainingMode: isTrainingMode,
        selectedTheme,
        selectedCategories: [...selectedCategories]
    };

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

    // Load game data
    currentGameWords = loadWords(selectedTheme, selectedCategories, difficulty);
    currentTeam = 1;
    currentRound = 0;
    isRoundActive = false;
    roundPowerups = {};
    powerupRevealVisible = false;
    teamShields = createInitialTeamShields(numTeams);
    lastProcessedChaosResolutionId = 0;
    lastProcessedChaosPendingId = 0;

    // Gamedata
    const gameData = {
        dateCreated: Date.now(),
        settings: gameSettings,
        teams: Array.from({ length: gameSettings.numTeams }, (_, i) => ({
            id: i,
            points: 0
        })),
        easyWords,
        hardWords,
        currentGameWords,
        numPlayers: 0,
        currentTeam,
        currentRound,
        roundActive: false,
        remainingTime: null,
        hostName: playerName,
        gameState: 'waiting',
        chaos: {
            roundId: 0,
            powerups: {},
            reveal: false,
            teamShields: [...teamShields],
            resolutionId: 0,
            pending: null
        },
        auditEvent: {
            id: 0,
            teamIndex: 0,
            roundNumber: 0,
            correctAnswers: []
        }
    };

    let gameCodeExists = true;
    // Find a code that is not taken
    while (gameCodeExists) {
        // Generate random game code
        gameCode = generateGameCode();
        await readDataOnce(`games/${gameCode}`).then(data => {
            if (!data) {
                gameCodeExists = false;
            }
            else if (!data.dateCreated || (Date.now() - data.dateCreated) > LOBBY_EXPIRY_MS || data.gameState === "ended") {
                // Overwrite old game lobbies
                gameCodeExists = false;
            }
        });
    }

    // Write gameData to db
    try {
        await firebaseWrite(`games/${gameCode}`, gameData);
        await readDataOnce(`games/${gameCode}`);
        // Execute logic when a player joins the lobby (host)
        await onLobbyJoined();
    } catch (error) {
        console.error("Failed to create lobby:", error);
        alert("Unable to create lobby right now. Please try again.");
    }
}

function getPresenceForPlayer(gameData, name) {
    if (!gameData || !gameData.presence || !name) {
        return null;
    }

    const directMatch = gameData.presence[toPresenceKey(name)];
    if (directMatch) {
        return directMatch;
    }

    return Object.values(gameData.presence).find(entry => normalizeWord(entry?.playerName) === normalizeWord(name)) || null;
}

async function joinGameLobby() {
    const joinCode = String(txtGameCode.value || "").trim().toUpperCase();
    txtGameCode.value = joinCode;

    try {
        const gameData = await readDataOnce(`games/${joinCode}`);
        if (gameData) {
            if (gameData.gameState !== "ended") {
                const settings = sanitizeGameSettingsFromDb(gameData.settings || {}, gameData.teams?.length || 2);
                gameCode = joinCode;
                numTeams = settings.numTeams;
                difficulty = settings.difficulty;
                pointsToWin = settings.pointsToWin;
                numWords = settings.numWords;
                numSeconds = settings.numSeconds;
                isChaosMode = settings.chaosMode;
                isTrainingMode = settings.trainingMode;
                numPlayers = gameData.numPlayers ?? countPlayersInTeams(gameData.teams || []);
                isRoundActive = Boolean(gameData.roundActive);
                activeSelectedTheme = settings.selectedTheme;
                activeSelectedCategories = [...settings.selectedCategories];
                const normalizedChaos = getNormalizedChaosState(gameData.chaos || {}, numTeams, pointsToWin);
                roundPowerups = normalizedChaos.powerups;
                powerupRevealVisible = normalizedChaos.reveal;
                teamShields = normalizedChaos.teamShields;
                lastProcessedChaosResolutionId = normalizedChaos.resolutionId;
                lastProcessedChaosPendingId = 0;
                if (chkChaos) {
                    chkChaos.checked = isChaosMode;
                }
                if (chkTraining) {
                    chkTraining.checked = isTrainingMode;
                }
                await onLobbyJoined();
            } else {
                alert("This lobby has already ended.");
            }
        } else {
            alert('Invalid game code. Please try again.');
        }
    } catch (error) {
        console.error("Failed to join lobby:", error);
        alert("Unable to join lobby right now. Please try again.");
    }
}

async function startOnlineGame() {
    if (!isHost) {
        return;
    }

    const gameRef = ref(db, `games/${gameCode}`);
    let notEnoughPlayers = false;

    try {
        const result = await runTransaction(gameRef, (gameData) => {
            if (!gameData || !Array.isArray(gameData.teams)) {
                return gameData;
            }

            const configuredTeamCount = getConfiguredTeamCount(gameData);
            const playerCount = countPlayersInTeams(gameData.teams);

            if (!isTeamsValidForTeamCount(configuredTeamCount, playerCount)) {
                notEnoughPlayers = true;
                return;
            }

            gameData.gameState = "started";
            gameData.isGameStarted = true;
            gameData.roundActive = false;
            const teamCount = gameData.teams.length;
            const settings = sanitizeGameSettingsFromDb(gameData.settings || {}, teamCount);
            const normalizedChaos = getNormalizedChaosState(gameData.chaos || {}, teamCount, settings.pointsToWin);
            gameData.chaos = {
                ...normalizedChaos,
                reveal: false,
                pending: null
            };
            return gameData;
        }, { applyLocally: false });

        if (!result.committed || notEnoughPlayers) {
            alert("Wait for more players!");
        }
    } catch (error) {
        console.error("Failed to start online game:", error);
        alert("Unable to start the game right now. Please try again.");
    }
}

function setCurrentTeam() {
    const gameRef = ref(db, `games/${gameCode}`);

    update(gameRef, {
        currentTeam: currentTeam
    });
}

function updateWords(words, type) {
    if (type === 'easyWords') {
        easyWords = words;
    } else if (type === 'hardWords') {
        hardWords = words;
    } else if (type === 'currentGameWords') {
        currentGameWords = words;
    }
}

function updateRound(value, type) {
    if (type === 'currentTeam') {
        currentTeam = value;
    } else if (type === 'currentRound') {
        currentRound = value;
    }

    updateCurrentTeamIndicator();
}

function updateUI() {
    updatePoints(0);
    
    teams.forEach(team => {
        team?.players?.forEach(player => {
            // Find my player by name
            if (playerName === player.playerName) {
                if (player.isSpeaker) {
                    isSpeaker = true;
                    hideElement(btnNextRound);
                    showElement(btnStartRound);
                }
                else {
                    isSpeaker = false;
                    hideElement(btnNextRound);
                    hideElement(btnStartRound);
                }
            }
        });
    });

    if (!isHost) {
        hideElement(btnEndGame);
    } else {
        showElement(btnEndGame);
    }

    let count = 0;
    document.querySelectorAll(".scoreButton").forEach(button => {
        count++;
        if (count <= numWords) {
            button.style.background = null;
        }
    });
}

// Function to determine player changes and notify others
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

function rotateSpeakerForRound(teamsData = [], roundNumber = currentRound) {
    const mutableTeams = Array.isArray(teamsData) ? teamsData : [];
    if (mutableTeams.length === 0) {
        return mutableTeams;
    }

    // Find the current speaker and their team
    let currentTeamIndex = -1;
    let currentSpeakerIndex = -1;

    // Identify the current speaker
    for (let i = 0; i < mutableTeams.length; i++) {
        const team = mutableTeams[i];
        const speakerIndex = (team.players || []).findIndex(player => player.isSpeaker);
        if (speakerIndex !== -1) {
            currentTeamIndex = i;
            currentSpeakerIndex = speakerIndex;
            break;
        }
    }

    // Set the current speaker's isSpeaker to false
    if (currentTeamIndex !== -1 && currentSpeakerIndex !== -1) {
        mutableTeams[currentTeamIndex].players[currentSpeakerIndex].isSpeaker = false;
    }

    // Calculate the next team index, cycling through teams
    let nextTeamIndex = (currentTeamIndex + 1) % mutableTeams.length;

    // Calculate the next speaker index within the next team
    let nextSpeakerIndex = currentSpeakerIndex;

    // If we've cycled back to the initial team, move to the next speaker within that team
    if (nextTeamIndex === 0 && currentTeamIndex === mutableTeams.length - 1) {
        nextSpeakerIndex = (currentSpeakerIndex + 1) % mutableTeams[nextTeamIndex].players.length;
        // Only 1 player in current team
        if (mutableTeams[currentTeamIndex].players.length === 1 && roundNumber % 2 != 0) {
            nextSpeakerIndex = 0;
        }
    }

    if (mutableTeams[nextTeamIndex].players[nextSpeakerIndex]) {
        // Set the next speaker's isSpeaker to true
        mutableTeams[nextTeamIndex].players[nextSpeakerIndex].isSpeaker = true;
    }
    else {
        // If the player does not exist, they probably left the game, so we move to the first player in the team
        mutableTeams[nextTeamIndex].players[0].isSpeaker = true;
    }

    return mutableTeams;
}

function setSpeaker(teamsData) {
    return rotateSpeakerForRound(teamsData, currentRound);
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
                playerItem.textContent = `Player ${player.id + 1}: ${player.playerName} ${player.isSpeaker ? '(Speaker)' : ''}`;
                if (player.playerName === playerName)
                {
                    playerItem.style.fontWeight = 'bold';
                }
                teamList.appendChild(playerItem);
            });
        }
    });
}

function generate() {
    run(document.getElementById("topic").value);
}

async function run(topic) {
    document.getElementById("btnAiGame").disabled = true;

    const cleanTopic = topic.trim();
    const strictTopic = cleanTopic.startsWith('!') ? cleanTopic.slice(1).trim() : cleanTopic;

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
    const text = response.text();
    console.log(text);

    let textArea = document.getElementById('aiWords');
    if (textArea) {
        textArea.textContent = '';
        textArea.textContent = text;
        textArea.value = '';
        textArea.value = text;
    }

    const generatedWords = textArea.textContent
        .split("\n")
        .map(line => line.replace(/^\s*(?:[-*\u2022]\s*|\d+[.)-]\s*)/, "").trim())
        .filter(Boolean);

    const uniqueGeneratedWords = [];
    const seenGeneratedWords = new Set();
    generatedWords.forEach(word => {
        const normalized = normalizeWord(word);
        if (!seenGeneratedWords.has(normalized)) {
            seenGeneratedWords.add(normalized);
            uniqueGeneratedWords.push(word);
        }
    });

    // Shuffle cleaned array
    currentGameWords = shuffleArray(uniqueGeneratedWords);
    document.getElementById("btnAiGame").disabled = false;
}

function startAIGame() {
    isAiGame = true;

    // Read user added words on start
    let textArea = document.getElementById('aiWords');
    const aiWords = textArea.value
        .split("\n")
        .map(word => word.trim())
        .filter(Boolean);
    const uniqueAiWords = [];
    const seenAiWords = new Set();
    aiWords.forEach(word => {
        const normalized = normalizeWord(word);
        if (!seenAiWords.has(normalized)) {
            seenAiWords.add(normalized);
            uniqueAiWords.push(word);
        }
    });
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
    teamShields = createInitialTeamShields(teams.length);
    lastProcessedChaosResolutionId = 0;
    lastProcessedChaosPendingId = 0;

    // Show/Hide UI elements
    hideElement(menu);
    hideElement(btnSettings);
    hideElement(btnAI);
    hideElement(btnRules);
    showElement(game);
    showElement(btnHistory);
    hideElement(btnOnline);

    registerModal(btnHistory, "historyModal");

    // Handle answer button click logic
    let count = 0;
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (count < numWords) {
            count++;
            button.addEventListener("click", () => {
                if (!btnNextRound.hidden) {
                    if (button.style.background == "grey") {
                        selectedButtons--;
                        button.style.background = null;
                    }
                    else {
                        selectedButtons++;
                        button.style.background = "grey";
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
    btnStartRound.hidden = true;
    btnEndGame.hidden = true;
    isRoundActive = true;
    powerupRevealVisible = false;
    updateBoard();
    hideElement(lblGameState);

    if (isOnlineGame) {
        updateData(`games/${gameCode}`, {
            endRoundEarly: false,
            roundActive: true,
            remainingTime: numSeconds
        });
    }
    endRoundEarly = false;

    startCountdown(numSeconds, () => {
        lblAnswers.textContent = "Click the correct answers:"
        btnEndRound.hidden = true;
        btnNextRound.hidden = false;
        clearTrainingHints();
        isRoundActive = false;

        if (isOnlineGame && isSpeaker) {
            updateData(`games/${gameCode}`, { roundActive: false });
        }

        let count = 0;
        document.querySelectorAll(".scoreButton").forEach(button => {
            count++;
            if (count <= numWords) {
                button.style.background = null;
                button.disabled = false;
            }
        });
    });
}

function getSelectedCorrectAnswers() {
    const correctAnswers = [];
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (button.style.background === "grey") {
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
    timer.hidden = true;
    clearWords();
    clearTrainingHints();
    isRoundActive = false;
}

function advanceRoundPointers() {
    currentTeam++;
    if (currentTeam > teams.length) {
        currentTeam = 1;
        currentRound++;
    }
}

async function animateTeamMovement(teamIndex, delta, animate = true, syncToOnline = false) {
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
        if (syncToOnline && isOnlineGame && isHost) {
            await setDataSilent(`games/${gameCode}/teams`, teams);
        }
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

async function resolveChaosPowerupLocally(
    teamIndex,
    powerupType,
    rng = Math.random,
    animate = true,
    syncToOnline = false,
    roundNumberForRound = currentRound + 1
) {
    if (!powerupType) {
        if (animate) {
            await sleep(CHAOS_CLEAR_PAUSE_MS);
        }
        powerupRevealVisible = false;
        updateBoard();
        updateTeamScores();
        if (syncToOnline) {
            await syncChaosVisualState(roundNumberForRound);
        }

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

    // Keep indicators visible while applying the landed powerup.
    updateTeamScores();

    if (summary.actorDelta !== 0) {
        await animateTeamMovement(teamIndex, summary.actorDelta, animate, syncToOnline);
    } else {
        updateBoard();
    }

    if (Number.isInteger(summary.victimTeamIndex) && summary.victimDelta !== 0) {
        await animateTeamMovement(summary.victimTeamIndex, summary.victimDelta, animate, syncToOnline);
    }

    if (animate) {
        await sleep(CHAOS_CLEAR_PAUSE_MS);
    }

    // Clear the map after powerup resolution is complete.
    powerupRevealVisible = false;
    updateBoard();
    if (syncToOnline) {
        await syncChaosVisualState(roundNumberForRound);
    }

    updateTeamScores();
    return summary;
}

async function runChaosResolutionLocally({
    teamIndexForRound,
    selectedPoints,
    roundNumberForRound,
    powerupsForRound = null,
    rng = Math.random,
    animate = true,
    syncToOnline = false
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
    if (syncToOnline) {
        await syncChaosVisualState(roundNumberForRound);
    }
    if (animate) {
        await sleep(CHAOS_PREMOVE_REVEAL_MS);
    }

    await animateTeamMovement(teamIndexForRound, safeSelectedPoints, animate, syncToOnline);

    const landedPowerup = getChaosLandingPowerup(teamIndexForRound);
    const summary = await resolveChaosPowerupLocally(
        teamIndexForRound,
        landedPowerup,
        rng,
        animate,
        syncToOnline,
        roundNumberForRound
    );

    return {
        roundId: roundNumberForRound,
        powerups: { ...roundPowerups },
        reveal: powerupRevealVisible,
        resolutionSummary: summary
    };
}

async function resolveOnlineChaosPending(pendingState) {
    if (!isHost || !isOnlineGame || !isChaosMode || isResolvingChaosMove) {
        return;
    }

    const pendingId = Number(pendingState?.id);
    if (!Number.isFinite(pendingId) || pendingId <= 0 || pendingId <= lastProcessedChaosResolutionId) {
        return;
    }

    isResolvingChaosMove = true;
    try {
        const gameData = await readDataOnce(`games/${gameCode}`);
        if (!gameData || !Array.isArray(gameData.teams)) {
            return;
        }

        const teamCount = gameData.teams.length;
        const settings = sanitizeGameSettingsFromDb(gameData.settings || {}, teamCount);
        if (!settings.chaosMode) {
            return;
        }

        const normalizedChaos = getNormalizedChaosState(gameData.chaos || {}, teamCount, settings.pointsToWin);
        if (pendingId <= normalizedChaos.resolutionId) {
            return;
        }

        teams = Array.isArray(gameData.teams) ? gameData.teams : [];
        ensureTeamsShape(teams);
        numTeams = teams.length || numTeams;
        pointsToWin = settings.pointsToWin;
        numWords = settings.numWords;
        easyWords = Array.isArray(pendingState.easyWords) ? [...pendingState.easyWords] : (Array.isArray(gameData.easyWords) ? [...gameData.easyWords] : []);
        hardWords = Array.isArray(pendingState.hardWords) ? [...pendingState.hardWords] : (Array.isArray(gameData.hardWords) ? [...gameData.hardWords] : []);
        currentGameWords = Array.isArray(pendingState.currentGameWords) ? [...pendingState.currentGameWords] : (Array.isArray(gameData.currentGameWords) ? [...gameData.currentGameWords] : []);
        teamShields = normalizeTeamShields(normalizedChaos.teamShields, teams.length);
        currentTeam = Number(gameData.currentTeam) || 1;
        currentRound = Number(gameData.currentRound) || 0;

        const actingTeamIndex = Number.isInteger(Number(pendingState.teamIndex))
            ? Math.max(0, Math.min(teams.length - 1, Number(pendingState.teamIndex)))
            : getCurrentTeamIndex(currentTeam);
        const roundNumberForRound = Number.isInteger(Number(pendingState.roundNumber)) && Number(pendingState.roundNumber) > 0
            ? Number(pendingState.roundNumber)
            : currentRound + 1;
        const selectedPoints = clampInt(pendingState.points, 0, 0, settings.numWords);
        const correctAnswers = Array.isArray(pendingState.correctAnswers) ? [...pendingState.correctAnswers] : [];

        const expectedTeamIndex = getCurrentTeamIndex(currentTeam);
        const expectedRoundNumber = currentRound + 1;
        if (actingTeamIndex !== expectedTeamIndex || roundNumberForRound !== expectedRoundNumber) {
            console.warn(`[chaos] Ignoring stale pending resolution ${pendingId} for ${roundNumberForRound}-${actingTeamIndex + 1}; expected ${expectedRoundNumber}-${expectedTeamIndex + 1}`);
            await updateData(`games/${gameCode}/chaos`, {
                pending: null
            });
            return;
        }

        const seededRng = createSeededRandom(pendingId);
        const chaosResolution = await runChaosResolutionLocally({
            teamIndexForRound: actingTeamIndex,
            selectedPoints,
            roundNumberForRound,
            powerupsForRound: generateRoundPowerupsMap(settings.pointsToWin, seededRng),
            rng: seededRng,
            animate: true,
            syncToOnline: true
        });

        const auditEvent = {
            id: pendingId,
            teamIndex: actingTeamIndex,
            roundNumber: roundNumberForRound,
            correctAnswers: [...correctAnswers]
        };

        advanceRoundPointers();
        teams = setSpeaker(teams);
        const hasWinner = teams.some(team => (Number(team?.points) || 0) >= pointsToWin);
        const nextGameState = hasWinner ? "ended" : "resumed";

        await updateData(`games/${gameCode}`, {
            teams: teams,
            easyWords: easyWords,
            hardWords: hardWords,
            currentGameWords: currentGameWords,
            numPlayers: countPlayersInTeams(teams),
            currentTeam: currentTeam,
            currentRound: currentRound,
            words: [],
            remainingTime: null,
            roundActive: false,
            endRoundEarly: false,
            gameState: nextGameState,
            correctAnswers: [...correctAnswers],
            auditEvent,
            chaos: {
                roundId: chaosResolution.roundId,
                powerups: { ...chaosResolution.powerups },
                reveal: false,
                teamShields: [...teamShields],
                resolutionId: pendingId,
                pending: null
            }
        });

        hideRoundInputUI();
        updateCurrentTeamIndicator();
        updateTeamScores();

        if (hasWinner) {
            endGame();
        }

        lastProcessedChaosResolutionId = pendingId;
    } catch (error) {
        console.error("Failed to resolve chaos round:", error);
    } finally {
        isResolvingChaosMove = false;
    }
}

async function nextRound() {
    if (isResolvingChaosMove) {
        return;
    }

    const correctAnswers = getSelectedCorrectAnswers();

    const teamIndexForRound = getCurrentTeamIndex(currentTeam);
    const roundNumberForRound = currentRound + 1;

    if (isChaosMode) {
        const resolutionId = Date.now() + Math.floor(Math.random() * 1000);
        const selectedPointsForRound = selectedButtons;
        if (isOnlineGame && !isHost) {
            hideRoundInputUI();
            await updateData(`games/${gameCode}/chaos`, {
                pending: buildChaosPendingPayload({
                    resolutionId,
                    teamIndexForRound,
                    roundNumberForRound,
                    correctAnswers,
                    selectedPoints: selectedPointsForRound
                })
            });
            lblGameState.textContent = "Status: Host is resolving chaos turn...";
            showElement(lblGameState);
            return;
        }

        isResolvingChaosMove = true;
        try {
            const seededRng = createSeededRandom(resolutionId);
            const chaosResolution = await runChaosResolutionLocally({
                teamIndexForRound,
                selectedPoints: selectedPointsForRound,
                roundNumberForRound,
                powerupsForRound: generateRoundPowerupsMap(pointsToWin, seededRng),
                rng: seededRng,
                animate: true,
                syncToOnline: isOnlineGame && isHost
            });

            const auditEvent = {
                id: resolutionId,
                teamIndex: teamIndexForRound,
                roundNumber: roundNumberForRound,
                correctAnswers: [...correctAnswers]
            };

            if (!isOnlineGame) {
                createTeamAuditColumns(teamIndexForRound, roundNumberForRound);
                createTeamAuditRows(teamIndexForRound, roundNumberForRound, correctAnswers);
            }

            advanceRoundPointers();
            hideRoundInputUI();

            const hasWinner = teams.some(team => (Number(team?.points) || 0) >= pointsToWin);
            if (hasWinner) {
                if (isOnlineGame) {
                    await updateData(`games/${gameCode}`, {
                        teams: teams,
                        easyWords: easyWords,
                        hardWords: hardWords,
                        currentGameWords: currentGameWords,
                        numPlayers: numPlayers,
                        currentTeam: currentTeam,
                        currentRound: currentRound,
                        words: [],
                        remainingTime: null,
                        roundActive: false,
                        endRoundEarly: false,
                        gameState: "ended",
                        correctAnswers: [...correctAnswers],
                        auditEvent,
                        chaos: {
                            roundId: chaosResolution.roundId,
                            powerups: { ...chaosResolution.powerups },
                            reveal: false,
                            teamShields: [...teamShields],
                            resolutionId,
                            pending: null
                        }
                    });
                }

                updateCurrentTeamIndicator();
                endGame();
                return;
            }

            btnStartRound.hidden = false;
            btnEndGame.hidden = false;
            updateCurrentTeamIndicator();
            updateTeamScores();

            if (isOnlineGame) {
                teams = setSpeaker(teams);
                await updateData(`games/${gameCode}`, {
                    teams: teams,
                    easyWords: easyWords,
                    hardWords: hardWords,
                    currentGameWords: currentGameWords,
                    numPlayers: numPlayers,
                    currentTeam: currentTeam,
                    currentRound: currentRound,
                    words: [],
                    remainingTime: null,
                    roundActive: false,
                    endRoundEarly: false,
                    gameState: 'resumed',
                    correctAnswers: [...correctAnswers],
                    auditEvent,
                    chaos: {
                        roundId: chaosResolution.roundId,
                        powerups: { ...chaosResolution.powerups },
                        reveal: false,
                        teamShields: [...teamShields],
                        resolutionId,
                        pending: null
                    }
                });
            }

            lastProcessedChaosResolutionId = resolutionId;
            hideElement(lblGameState);
        } finally {
            isResolvingChaosMove = false;
        }
        return;
    }

    updatePoints(selectedButtons);

    if (isOnlineGame) {
        const auditEvent = {
            id: Date.now(),
            teamIndex: teamIndexForRound,
            roundNumber: roundNumberForRound,
            correctAnswers: [...correctAnswers]
        };

        updateData(`games/${gameCode}`, {
            correctAnswers: correctAnswers,
            auditEvent
        });
    } else {
        createTeamAuditColumns(teamIndexForRound, roundNumberForRound);
        createTeamAuditRows(teamIndexForRound, roundNumberForRound, correctAnswers);
    }

    advanceRoundPointers();
    hideRoundInputUI();

    if (teams.some(team => team.points >= pointsToWin)) {
        endGame();
    } else {
        btnStartRound.hidden = false;
        btnEndGame.hidden = false;
    }

    updateCurrentTeamIndicator();

    if (isOnlineGame) {
        // Add logic for setting the current speaker
        teams = setSpeaker(teams);
        updateData(`games/${gameCode}`, {
            teams: teams,
            easyWords: easyWords,
            hardWords: hardWords,
            currentGameWords: currentGameWords,
            numPlayers: numPlayers,
            currentTeam: currentTeam,
            currentRound: currentRound,
            words: [],
            remainingTime: null,
            roundActive: false,
            endRoundEarly: false,
            gameState: 'resumed'
        });
    }
}

function endGame() {
    alert("Game over! Team scores:\n" + teams.map((team, index) => `Team ${index + 1}: ${team.points} points`).join("\n"));
    stopLobbyHeartbeat();
    stopStalePlayerCleanupLoop();
    clearTrainingHints();

    if (isOnlineGame)
    {
        updateData(`games/${gameCode}`, { gameState: "ended" });
        firebaseDelete(`games/${gameCode}`);
    }

    location.reload();
}

function endRound() {
    btnEndRound.hidden = true;
    btnNextRound.hidden = false;
    endRoundEarly = true;
    clearTrainingHints();
    isRoundActive = false;

    if (isOnlineGame) {
        updateData(`games/${gameCode}`, {
            endRoundEarly: true,
            roundActive: false
        });
    }
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

        if (isOnlineGame) {
            updateData(`games/${gameCode}`, {words: normalWords});
        }

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
                const aiWordPool = document.getElementById("aiWords")?.value
                    .split("\n")
                    .map(word => word.trim())
                    .filter(Boolean) || [];

                const dedupedAiWords = Array.from(new Set(aiWordPool.map(word => normalizeWord(word))))
                    .map(word => aiWordPool.find(original => normalizeWord(original) === word));

                currentGameWords = shuffleArray(dedupedAiWords.filter(Boolean));
            }
            else {
                currentGameWords = loadWords(activeSelectedTheme, [...activeSelectedCategories], difficulty);
            }
        }

        let words = currentGameWords.slice(0, numWords);
        currentGameWords = currentGameWords.slice(numWords);

        if (isOnlineGame) {
            updateData(`games/${gameCode}`, {words: words});
        }

        words.forEach((word, index) => {
            wordButtons[index].textContent = word;
        });
        renderTrainingHints(words);

        rememberUsedWords(words);
    }
}

function clearWords() {
    document.querySelectorAll(".scoreButton").forEach(button => {
        button.style.background = null;
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
        audioElement.playbackRate = playbackRate;
        audioElement.currentTime = 0;
        audioElement.play();

        const checkInterval = setInterval(() => {
            if (endCondition()) {
                audioElement.pause();
                audioElement.currentTime = 0;
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);

        audioElement.onended = () => {
            clearInterval(checkInterval);
            resolve();
        };
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

        if (isOnlineGame && isSpeaker) {
            updateData(`games/${gameCode}`, {remainingTime: remainingTime});
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
    });

    // Track team positions on the board
    let cellTeams = new Array(boardCells.length).fill(null).map(() => []);

    teams.forEach((team, index) => {
        const position = Math.min(team.points, boardCells.length - 1);
        cellTeams[position].push(index);
    });

    // Update board cells with team colors
    cellTeams.forEach((teamIndexes, cellIndex) => {
        if (teamIndexes.length === 0) return;

        const cell = boardCells[cellIndex];

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

        const powerupType = sanitizeChaosPowerupType(roundPowerups[cellIndex]);
        if (isChaosMode && powerupRevealVisible && powerupType) {
            const powerupConfig = CHAOS_POWERUP_TYPES[powerupType];
            const badge = document.createElement("div");
            badge.className = `board-powerup ${powerupConfig.cssClass}`;
            badge.textContent = powerupConfig.label;
            cell.classList.add("board-cell-powerup");
            cell.appendChild(badge);
        }
    });

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

function getPlayerTeamIndex() {
    for (const team of teams) {
        // Check if the team has a 'players' array
        if (team.players) {
            // Find the player in the current team's players array by name
            const player = team.players.find(player => player.playerName === playerName);
            if (player) {
                return team.id; // Return the team id
            }
        }
    }
    return null; // Return null if no speaker is found
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

function createTeamAuditRows(tableIndex, roundNumber = currentRound + 1, correctAnswers = []) {
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
        answersCell.textContent = Array.isArray(correctAnswers) && correctAnswers.length > 0
            ? correctAnswers.join(", ")
            : "0";
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

function hideModalById(modalId) {
    const modalInstance = getModalInstance(modalId);
    if (modalInstance) {
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

    registeredModalHandlers.add(registrationKey);
    modalButton.addEventListener("click", () => {
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
