import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, onValue, ref, get, set, push, off, update, child, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmT5EcRhLm28kSwU8dw8ft-X7WwgNmp0U",
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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

// Game settings variables
let isAiGame = false;
let numTeams = 2;
let pointsToWin = 20;
let numWords = 5;
let numSeconds = 30;
let difficulty = 'normal';

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
const btnStartRound = document.getElementById("startRoundButton");
const btnNextRound = document.getElementById("nextRoundButton");
const btnEndRound = document.getElementById("endRoundButton");
const btnEndGame = document.getElementById("endGameButton");
const btnAnswers = document.getElementById("scoreInput");
const timer = document.getElementById("timer");
const lblAnswers = document.getElementById("answers");
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

function initializeMenu() {
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
                joinGameLobby(db, txtGameCode.value);
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

    // Close modal on button click
    $(document).ready(function () {
        $('.modal-footer button[data-dismiss="modal"]').click(function () {
            $(this).closest('.modal').modal('hide');
        });
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
function readDataOnce(path) {
    const dataRef = ref(db, path);
    return new Promise((resolve, reject) => {
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            console.log(`Data read from ${path}`, data);
            resolve(data);
        }, (error) => {
            console.error(`Error reading data: ${error}`);
            reject(error);
        }, {
            onlyOnce: true
        });
    });
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
    return teams.some(team =>
        team.players && team.players.some(player => player.playerName === playerName)
    );
}

async function onLobbyJoined() {
    // Play game start sound
    await playSound(startSound, () => false, 1.2);

    isOnlineGame = true;

    hideElement(txtLobbyMenu);
    showElement(txtLobbyPlayers);
    $('#onlineModal').modal('hide');

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

    numPlayers++;
    await setNumPlayers();

    // Read the current teams, and add the new player
    readDataOnce(`games/${gameCode}/teams`).then(async teams => {
        if (teams) {
            playerName = txtPlayerName.value;
            if (!doesPlayerExist(teams, playerName))
            {
                await addPlayerToTeam(playerName, teams);
            }
            else {
                alert("Player name is already in use!");
                numPlayers--;
                await setNumPlayers();
                location.reload();
                return;
            }
        }
    });

    // Handle answer button click logic
    let count = 0;
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (count < numWords) {
            count++;
            button.addEventListener("click", async () => {
                if (!btnNextRound.hidden === true) {
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

    // Set starting team
    currentTeam = 1;
    setCurrentTeam();

    if (isTeamsValid(numPlayers)) {
        updateData(`games/${gameCode}`, { gameState: "ready" });
    }
    else {
        updateData(`games/${gameCode}`, { gameState: "waiting" });
    }

    // Add gameState listener to know when to start/update game
    listenForChanges(`games/${gameCode}/gameState`, async (state) => {
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
            lblGameState.textContent = "Status: Waiting for players!";
        }
        else if (state === "ready") {
            if (isHost || isSpeaker) {
                btnStartOnlineGame.disabled = false;
            }
            hideElement(btnStartRound);
            lblGameState.textContent = "Status: Waiting for host to start game!";
        }
        else if (state === "resumed") {
            if (isSpeaker) {
                showElement(btnStartRound);
            }
            lblGameState.hidden = true; 
        }
        else if (state === "ended") {
            alert("Game over! Team scores:\n" + teams.map((team, index) => `Team ${index + 1}: ${team.points} points`).join("\n"));
            location.reload();
        }
    });

    // Teams are updated when a player joins or leaves
    listenForChanges(`games/${gameCode}/teams`, (teamData) => {
        // Detect changes and notify
        detectPlayerChanges(teams, teamData);
        teams = teamData;

        // Set numPlayers to the total number of players
        const numPlayers = teams.reduce((total, team) => total + (team.players ? team.players.length : 0), 0);
        if (isTeamsValid(numPlayers)) {
            if (isGameStarted) {
                updateData(`games/${gameCode}`, { gameState: "resumed" });
            }
            else {
                updateData(`games/${gameCode}`, { gameState: "ready" });
            }
        }
        else {
            updateData(`games/${gameCode}`, { gameState: "waiting" });
        }

        // Update the player list UI
        updatePlayerListUI(teams);
        if (isGameStarted) {
            updateUI();
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
        if (words && isGameStarted) {
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
    });

    listenForChanges(`games/${gameCode}/remainingTime`, (seconds) => {
        if (seconds && isGameStarted) {
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

    listenForChanges(`games/${gameCode}/correctAnswers`, (correctAnswers) => {
        if (isGameStarted) {
            createTeamAuditColumns(getCurrentTeamIndex(currentTeam));
            createTeamAuditRows(getCurrentTeamIndex(currentTeam), correctAnswers);
        }
    });

    listenForChanges(`games/${gameCode}/newHost`, (newHost) => {
        if (newHost) {
            if (isSpeaker) {
                isHost = true;
            }
        }
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
    if (numTeams == 2 && numPlayers == 2) {
        return true;
    }
    else if (numTeams == 3 && numPlayers == 3) {
        return true;
    }
    else if (numPlayers >= numTeams * 2) {
        return true;
    }
    else {
        return false;
    }
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
}

async function createGameLobby() {
    // Host specific settings
    isHost = true;
    isSpeaker = true;

    // Define game settings
    difficulty = document.getElementById("difficulty").value.toLowerCase();
    numTeams = parseInt(txtTeams.value);
    pointsToWin = parseInt(document.getElementById("pointsToWin").value);
    numWords = parseInt(txtWords.value);
    numSeconds = parseInt(txtSeconds.value);

    const gameSettings = {
        numTeams,
        difficulty,
        pointsToWin,
        numWords,
        numSeconds,
    };

    const selectedCategories = Array.from(categoriesSelect.selectedOptions).map(option => option.value);
    const selectedTheme = themesSelect.value;

    // Validate game settings
    if (selectedCategories.length > 0 && selectedTheme !== "None") {
        alert("Please select either categories or theme, not both.");
        return;
    }

    // Load game data
    currentGameWords = loadWords(selectedTheme, selectedCategories, difficulty);

    // Gamedata
    const gameData = {
        dateCreated: new Date(),
        settings: gameSettings,
        teams: Array.from({ length: gameSettings.numTeams }, (_, i) => ({
            id: i,
            points: 0
        })),
        easyWords,
        hardWords,
        currentGameWords,
        numPlayers,
        currentTeam,
        currentRound,
        gameState: 'waiting'
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
            else if (data.dateCreated < new Date()) {
                // Overwrite old game lobbies
                gameCodeExists = false;
            }
        });
    }

    // Write gameData to db
    firebaseWrite(`games/${gameCode}`, gameData)
        .then(async () => {
            // Execute logic when a player joins the lobby (host)
            await onLobbyJoined();
        });
}

function joinGameLobby() {
    readDataOnce(`games/${txtGameCode.value}`).then(async gameData => {
        if (gameData) {
            if (gameData.gameState === "waiting") {
                gameCode = txtGameCode.value;
                difficulty = gameData.settings.difficulty;
                pointsToWin = gameData.settings.pointsToWin;
                numWords = gameData.settings.numWords;
                numSeconds = gameData.settings.numSeconds;
                numPlayers = gameData.numPlayers;
                await onLobbyJoined(gameCode);
            }
            else if (gameData.gameState === "started") {
                // Logic to restrict joining games in progress
                //alert("Cannot join, game in progress!")
            }

        } else {
            alert('Invalid game code. Please try again.');
        }
    });
}

async function startOnlineGame() {

    if (numPlayers < numTeams.length * 2) {
        alert("Wait for more players!")
    }

    if (isHost) {
        updateData(`games/${gameCode}`, { gameState: "started" });
    }
}

function setCurrentTeam() {
    const gameRef = ref(db, `games/${gameCode}`);

    update(gameRef, {
        currentTeam: currentTeam
    });
}

function setNumPlayers() {
    readDataOnce(`games/${gameCode}/teams`).then(teams => {
        if (!teams) {
            endGame();
        }
        else
        {
            const gameRef = ref(db, `games/${gameCode}`);

            update(gameRef, {
                numPlayers: numPlayers
            });
        }
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

async function setSpeaker(teams) {
    // Find the current speaker and their team
    let currentTeamIndex = -1;
    let currentSpeakerIndex = -1;

    // Identify the current speaker
    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const speakerIndex = team.players.findIndex(player => player.isSpeaker);
        if (speakerIndex !== -1) {
            currentTeamIndex = i;
            currentSpeakerIndex = speakerIndex;
            break;
        }
    }

    // Set the current speaker's isSpeaker to false
    if (currentTeamIndex !== -1 && currentSpeakerIndex !== -1) {
        teams[currentTeamIndex].players[currentSpeakerIndex].isSpeaker = false;
    }

    // Calculate the next team index, cycling through teams
    let nextTeamIndex = (currentTeamIndex + 1) % teams.length;

    // Calculate the next speaker index within the next team
    let nextSpeakerIndex = currentSpeakerIndex;

    // If we've cycled back to the initial team, move to the next speaker within that team
    if (nextTeamIndex === 0 && currentTeamIndex === teams.length - 1) {
        nextSpeakerIndex = (currentSpeakerIndex + 1) % teams[nextTeamIndex].players.length;
    }

    // Set the next speaker's isSpeaker to true
    teams[nextTeamIndex].players[nextSpeakerIndex].isSpeaker = true;

    // Write updated speaker info to Firebase
    firebaseWrite(`games/${gameCode}/teams`, teams);
}

function displayGameCode(gameCode) {
    const gameCodeLabel = document.getElementById("lblGameCode");
    gameCodeLabel.textContent = `Game Code: ${gameCode}`;
    gameCodeLabel.hidden = false;
}

// Function to add a player to the appropriate team
async function addPlayerToTeam(playerName, teams) {
    // Determine the number of teams
    const numTeams = teams.length;

    // Initialize teams.players array if it doesn't exist
    teams.forEach(team => {
        if (!team.players) {
            team.players = [];
        }
    });

    // Determine the current team index based on the number of players
    const totalPlayers = teams.reduce((total, team) => total + team.players.length, 0);
    const teamIndex = totalPlayers % numTeams;

    // Add the player to the determined team
    const playerToAdd = { id: teams[teamIndex].players.length, playerName: playerName, isSpeaker: isSpeaker };
    teams[teamIndex].players.push(playerToAdd);

    // Update the game state in Firebase
    await firebaseWrite(`games/${gameCode}/teams`, teams);

    // We will now start to monitor the new player
    listenForChanges(`games/${gameCode}/teams/${teamIndex}/players/${teams[teamIndex].players.length - 1}`, (player) => {
        // Remove the player status when disconnected
        window.addEventListener('beforeunload', async () => {
            numPlayers--;

            // If host leaves, end game since nobody able to start it
            if (!isGameStarted && (player.isSpeaker || isHost)) {
                endGame();
            }

            if (isHost) {
                updateData(`games/${gameCode}`, { newHost: true });
            }

            // If game is in progress and a speaker player leaves, we need to progress game state
            if (isGameStarted && player.isSpeaker) {
                if (!btnEndRound.hidden) {
                    endRound();
                }

                if (!btnNextRound.hidden) {
                    nextRound();
                }

                if (countdownSoundPlaying) {
                    endRound();
                    nextRound();
                }
            }

            if (numPlayers <= 0) {
                removeData(`games/${gameCode}`);
            }
            else {
                await setNumPlayers();
            }

            removeData(`games/${gameCode}/teams/${teamIndex}/players/${teams[teamIndex].players.length - 1}`);
        });
    });
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

    let prompt = "";
    if (topic.startsWith('!')) {
        prompt = `Generate a list of 50 or more words only related to the topic "${topic}". 

        * **Possibly Include:**
            * NB People (e.g., historical figures, artists, scientists, players, actors) - add multiple
            * Places (e.g., countries, landmarks, geographical features)
            * Events (e.g., historical events, cultural celebrations)
            * Concepts (e.g., theories, movements, styles)
            * Objects (e.g., tools, materials, symbols)
            * Terminology (e.g., jargon, technical terms)
            * Lesser-known aspects (to add depth)
        
        * **Vary difficulty:** Include a mix of well-known words and some lesser-known terms.
        
        * **Focus on context:** DO NOT expand on sub topics and categories. Strictly focus on the topic, even if you are unable to include the above (people, places etc).
        
        Only return the list of words, each on a new line. Do not forget to be strict with the topic. Do not output any other languages besides english unless otherwise specified.`
    }
    else {
        prompt = `Generate a list of exactly 50 words only related to the topic "${topic}". 

        * **Include:**
            * NB People (e.g., historical figures, artists, scientists, players, actors) - add multiple
            * Places (e.g., countries, landmarks, geographical features)
            * Events (e.g., historical events, cultural celebrations)
            * Concepts (e.g., theories, movements, styles)
            * Objects (e.g., tools, materials, symbols)
            * Terminology (e.g., jargon, technical terms)
            * Lesser-known aspects (to add depth)
        
        * **Vary difficulty:** Include a mix of well-known words and some lesser-known terms.
        
        * **Focus on context:** Consider subcategories and related fields within the topic and include relevant words.
        
        Only return the list of 50 words, each on a new line. Do not forget to include relevant people, places etc related to the topic and sub topics. Do not output any other languages besides english unless otherwise specified.`
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

    // Shuffle cleaned array
    currentGameWords = shuffleArray(textArea.textContent.split("\n").filter(item => item !== ''));
    document.getElementById("btnAiGame").disabled = false;
}

function startAIGame() {
    isAiGame = true;

    // Read user added words on start
    let textArea = document.getElementById('aiWords');
    currentGameWords = shuffleArray(textArea.value.split("\n").filter(item => item !== ''));

    startGame();
    
    $('#aiModal').modal('hide');
    btnAI.hidden = true;
}

async function startGame() {
    // Play game start sound
    await playSound(startSound, () => false, 1.2);

    // Read game settings
    difficulty = document.getElementById("difficulty").value.toLowerCase();
    const selectedCategories = Array.from(categoriesSelect.selectedOptions).map(option => option.value);
    const selectedTheme = themesSelect.value;

    numTeams = parseInt(txtTeams.value);
    teams = Array.from({ length: numTeams }, () => ({ points: 0 }));

    pointsToWin = parseInt(document.getElementById("pointsToWin").value);
    numWords = parseInt(txtWords.value);
    numSeconds = parseInt(txtSeconds.value);

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
            button.addEventListener("click", () => {
                count++;
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

    createTeamAuditTables(teams.length);

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
        selectedObjects = themes[selectedTheme];
        if (difficulty !== "normal") {
            // Filter based on difficulty if not normal
            selectedObjects = themes[selectedTheme].filter(wordObj => wordObj.difficulty === difficulty);
        }
    }
    else {
        if (selectedCategories.length === 0) {
            // Select all categories if none are selected
            selectedCategories.push(...Object.keys(categories));
        }

        selectedObjects = selectedCategories.flatMap(category => categories[category]);

        if (difficulty !== "normal") {
            // Filter based on difficulty if not normal
            selectedObjects = selectedCategories.flatMap(category => categories[category].filter(wordObj => wordObj.difficulty === difficulty));
        }
    }

    // Shuffle selected objects
    selectedObjects = shuffleArray(selectedObjects);

    easyWords = getEasyWords(selectedObjects).map(obj => obj.word);
    hardWords = getHardWords(selectedObjects).map(obj => obj.word);

    // Map only the word field
    return selectedObjects.map(obj => obj.word);
}

function startRound() {
    btnStartRound.hidden = true;
    btnEndGame.hidden = true;

    if (isOnlineGame) {
        updateData(`games/${gameCode}`, { endRoundEarly: false });
    }
    endRoundEarly = false;

    startCountdown(numSeconds, () => {
        lblAnswers.textContent = "Click the correct answers:"
        btnEndRound.hidden = true;
        btnNextRound.hidden = false;

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

async function nextRound() {
    let correctAnswers = [];
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (button.style.background == "grey") {
            correctAnswers.push(button.textContent);
        }
    });

    updatePoints(selectedButtons);

    if (isOnlineGame) {
        updateData(`games/${gameCode}`, { correctAnswers: correctAnswers })
    }
    else {
        createTeamAuditColumns(getCurrentTeamIndex(currentTeam));
        createTeamAuditRows(getCurrentTeamIndex(currentTeam), correctAnswers);
    }

    currentTeam++;
    if (currentTeam > teams.length) {
        currentTeam = 1;
        currentRound++;
    }

    btnAnswers.hidden = true;
    const scoreButtons = document.getElementsByClassName("scoreButton");
    for (let index = 0; index < scoreButtons.length; index++) {
        const element = scoreButtons[index];
        element.hidden = true;
    }
    btnNextRound.hidden = true;
    timer.hidden = true;
    clearWords();

    if (teams.some(team => team.points >= pointsToWin)) {
        endGame();
    } else {
        btnStartRound.hidden = false;
        btnEndGame.hidden = false;
    }

    updateCurrentTeamIndicator();

    if (isOnlineGame) {
        // Add logic for setting the current speaker
        await setSpeaker(teams);
    }

    updateData(`games/${gameCode}`, {
        teams: teams,
        easyWords: easyWords,
        hardWords: hardWords,
        currentGameWords: currentGameWords,
        numPlayers: numPlayers,
        currentTeam: currentTeam,
        currentRound: currentRound,
        gameState: 'active'
    });
}

function endGame() {
    alert("Game over! Team scores:\n" + teams.map((team, index) => `Team ${index + 1}: ${team.points} points`).join("\n"));

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

    if (isOnlineGame) {
        updateData(`games/${gameCode}`, { endRoundEarly: true });
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
            alert("Words exhausted, selecting from other categories!");
            currentGameWords = loadWords('None', []);
        }

        let normalWords = [];
        normalWords = easyWords.slice(0, numEasy).concat(hardWords.slice(0, numHard));
        normalWords = shuffleArray(normalWords);

        if (isOnlineGame) {
            updateData(`games/${gameCode}`, {words: normalWords});
        }

        for (let i = 0; i <= normalWords.length; i++) {
            wordButtons[i].textContent = normalWords[i];
        }

        easyWords = easyWords.slice(numEasy);
        hardWords = hardWords.slice(numHard);
    }
    else {
        if (currentGameWords.length < numWords) {
            alert("Words exhausted, selecting from other categories!");
            currentGameWords = loadWords('None', []);
        }

        let words = currentGameWords.slice(0, numWords);
        currentGameWords = currentGameWords.slice(numWords);

        if (isOnlineGame) {
            updateData(`games/${gameCode}`, {words: words});
        }

        words.forEach((word, index) => {
            wordButtons[index].textContent = word;
        });
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
    updateTeamScores();
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
            remainingTime == 0;
            clearInterval(countdownTimer);
            // Play end sound when the timer ends
            playSound(endSound, () => false, 1.0);
            selectedButtons = 0;
            callback();
        }

        if (endRoundEarly === true) {
            clearInterval(countdownTimer);
            // Play end sound when the timer ends
            playSound(endSoundAlt, () => false, 1.0).then(() => {
                selectedButtons = 0;
                callback();
            });
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
        cell.innerHTML = '';  // Clear inner HTML to remove previous segments
        cell.style.backgroundColor = ''; // Clear background color
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

            teamIndexes.forEach((teamIndex, index) => {
                const segment = document.createElement('div');
                segment.style.width = `${segmentWidth}%`;
                segment.style.height = '100%';
                segment.style.float = 'left';
                segment.style.backgroundColor = getTeamColor(teamIndex);
                segment.style.borderRadius = '4px';  // Match the parent cell's border radius
                cell.appendChild(segment);
            });
        }
    });

    updateTeamScores();
}

function updateTeamScores() {
    const teamScoresContainer = document.getElementById("teamScores");
    teamScoresContainer.innerHTML = "";
    teams.forEach((team, index) => {
        const teamScoreDiv = document.createElement("div");
        teamScoreDiv.className = "team-score";
        teamScoreDiv.textContent = `Team ${index + 1}: ${team.points} points`;
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
    if (!currentTeamIndicator) {
        const indicator = document.createElement("div");
        indicator.id = "currentTeamIndicator";
        indicator.textContent = `Current Team: Team ${currentTeam}`;
        if (isOnlineGame) {
            indicator.textContent = `Current Team: Team ${currentTeam} (${getSpeakerName()})`;
        }
        indicator.style.color = getTeamColor(getCurrentTeamIndex(currentTeam));
        document.getElementById("game").prepend(indicator);
    } else {
        currentTeamIndicator.textContent = `Current Team: Team ${currentTeam}`;
        if (isOnlineGame) {
            currentTeamIndicator.textContent = `Current Team: Team ${currentTeam} (${getSpeakerName()})`;
        }
        currentTeamIndicator.style.color = getTeamColor(getCurrentTeamIndex(currentTeam));
    }
}

function getSpeakerName() {
    for (const team of teams) {
        // Check if the team has a 'players' array
        if (team.players) {
            // Find the player in the current team's players array with isSpeaker set to true
            const speaker = team.players.find(player => player.isSpeaker === true);
            if (speaker) {
                return speaker.playerName; // Return the playerName of the speaker
            }
        }
    }
    return null; // Return null if no speaker is found
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

function createTeamAuditTables(numTeams) {
    for (let i = 0; i < numTeams; i++) {
        const tableContainer = document.getElementById('table-container');
        const table = document.createElement('table');
        table.id = `table${i}`;
        const header = table.createTHead();
        const headerRow = header.insertRow(0);

        const th = document.createElement('th');
        th.innerText = `Team ${i + 1}`;
        headerRow.appendChild(th);

        const tBody = table.createTBody();
        tBody.insertRow(0);
        tableContainer.appendChild(table);
    }
}

function createTeamAuditColumns(tableIndex) {
    const table = document.getElementById(`table${tableIndex}`);
    if (table) {
        const columnRow = table.children[1];
        const th = document.createElement('th');
        th.innerText = `Round ${currentRound + 1}`;
        columnRow.appendChild(th);
    } else {
        console.error(`Table with index ${tableIndex} does not exist.`);
    }
}

function createTeamAuditRows(tableIndex, correctAnswers) {
    const table = document.getElementById(`table${tableIndex}`);
    if (table) {
        const tbody = table.tBodies[0];
        for (let i = 0; i < correctAnswers.length; i++) {
            const row = tbody.insertRow();
            for (let j = 0; j < table.tHead.rows[0].cells.length; j++) {
                const cell = row.insertCell();
                const textNode = document.createTextNode(correctAnswers[i] || '');
                cell.appendChild(textNode);
            }
        }
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

function registerModal(modalButton, modalId) {
    // Toggle modal display
    modalButton.addEventListener("click", () => {
        $(`#${modalId}`).modal('show');
    });

    // Close modal on outside click
    $(`#${modalId}`).on('click', function (event) {
        if ($(event.target).hasClass('modal')) {
            $(this).modal('hide');
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