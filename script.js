import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, onValue, ref, set, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"

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

let selectedWords = [];
let teams = [];
let currentTeam = 0;
let totalPoints = 0;
let currentRound = 0;
let countdownTimer;
let pointsToWin;
let gameMode;
let numWords = 5;
let numSeconds = 30;
let endRoundEarly = false;

document.addEventListener("DOMContentLoaded", () => {
    initializeMenu();
});

function firebaseWrite(path, data) {
    set(ref(db, path), data);
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

// Get audio elements
const startSound = document.getElementById('startSound');
const countdownSound = document.getElementById('countdownSound');
const tickSound = document.getElementById('tickSound');
const warningSound = document.getElementById('warningSound');
const endSound = document.getElementById('endSound');
const endSoundAlt = document.getElementById('endSoundAlt');

const categoriesSelect = document.getElementById("categoriesSelect");
const themesSelect = document.getElementById("themesSelect");

function initializeMenu() {
    Object.keys(categories).forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoriesSelect.appendChild(option);
    });

    Object.keys(themes).forEach(theme => {
        const option = document.createElement("option");
        option.value = theme;
        option.textContent = theme;
        themesSelect.appendChild(option);
    });

    document.getElementById("createLobbyButton").addEventListener("click", () => {
        createGameLobby(db);
    });

    document.getElementById("joinLobbyButton").addEventListener("click", () => {
        const lobbyCode = document.getElementById("joinLobbyCode").value;
        joinGameLobby(db, lobbyCode);
    });

    document.getElementById("selectCategoriesBtn").addEventListener("click", () => {
        document.getElementById("categoriesSection").style.display = 'block';
        document.getElementById("themesSection").style.display = 'none';
    });

    document.getElementById("selectThemeBtn").addEventListener("click", () => {
        document.getElementById("categoriesSection").style.display = 'none';
        document.getElementById("themesSection").style.display = 'block';
    });

    const btnAdvancedOptions = document.getElementById("toggleAdvancedOptions");

    btnAdvancedOptions.addEventListener("click", () => {
        const advancedOptions = document.getElementById("advancedOptions");

        if (btnAdvancedOptions.textContent === "Show Advanced Options") {
            btnAdvancedOptions.textContent = "Hide Advanced Options";
        }
        else {
            btnAdvancedOptions.textContent = "Show Advanced Options";
        }

        advancedOptions.classList.toggle("hidden");
    });

    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("startRoundButton").addEventListener("click", startRound);
    document.getElementById("nextRoundButton").addEventListener("click", nextRound);
    document.getElementById("endGameButton").addEventListener("click", endGame);
    document.getElementById("endRoundButton").addEventListener("click", endRound);

    let count = 0;
    document.querySelectorAll(".scoreButton").forEach(button => {
        count++;
        if (count <= numWords + 1)
        {
            button.addEventListener("click", () => {
                document.querySelectorAll(".scoreButton").forEach(button => {
                    button.disabled = true;
                });
                button.style.background = "grey";
                const points = parseInt(button.dataset.score);
                updatePoints(points);
            });
        }
    });
}

function createGameLobby() {
    const pointsToWin = parseInt(document.getElementById('pointsToWin').value);
    const difficulty = document.getElementById('difficulty').value;
    const categories = Array.from(document.getElementById('categoriesSelect').selectedOptions).map(option => option.value);
    const theme = document.getElementById('themesSelect').value;

    const gameCode = generateGameCode();
    const gameData = {
        pointsToWin,
        difficulty,
        categories,
        theme,
        teams: Array.from({ length: numTeams }, (_, i) => ({
            id: i + 1,
            points: 0,
            players: Array.from({ length: numPlayers }, (_, j) => ({ id: j + 1, isSpeaker: j === 0 }))
        })),
        currentTeam: 1,
        currentRound: 0,
        gameState: 'waiting' // possible states: waiting, inProgress, ended
    };

    firebaseWrite(`games/${gameCode}`, gameData);
    startGame(gameCode);
}

function generateGameCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function showJoinGameSection() {
    document.getElementById('gameCodeSection').classList.remove('hidden');
}

function joinGameLobby() {
    const gameCode = document.getElementById('gameCode').value;
    firebaseRead(`games/${gameCode}`, (gameData) => {
        if (gameData) {
            startGame(gameCode);
        } else {
            alert('Invalid game code. Please try again.');
        }
    });
}

async function startGame(gameCode) {
    // Hide lobby menu and show game menu
    document.getElementById("lobbyMenu").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
    
    await playSound(startSound, () => false, 1.2);

    const difficulty = document.getElementById("difficulty").value.toLowerCase();
    const selectedCategories = Array.from(categoriesSelect.selectedOptions).map(option => option.value);
    const selectedTheme = themesSelect.value;
    const numTeams = parseInt(document.getElementById("numTeams").value);
    pointsToWin = parseInt(document.getElementById("pointsToWin").value);
    numWords = parseInt(document.getElementById("numWords").value);
    numSeconds = parseInt(document.getElementById("numSeconds").value);

    if (selectedCategories.length > 0 && selectedTheme !== "None") {
        alert("Please select either categories or theme, not both.");
        return;
    }

    selectWords(selectedTheme, selectedCategories, difficulty);
    teams = Array.from({ length: numTeams }, () => ({ points: 0 }));

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    generateBoard();
    updateBoard();
    updateTeamScores();
    updateCurrentTeamIndicator();
}

function selectWords(selectedTheme, selectedCategories, difficulty = "normal") {
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

    // Map only the word field
    selectedWords = selectedObjects.map(obj => obj.word)

    // Shuffle selected words
    selectedWords = shuffleArray(selectedWords);

    return selectedWords;
}

let currentSpeaker = 0;

function startRound() {
    document.getElementById("startRoundButton").classList.add("hidden");
    document.getElementById("endGameButton").classList.add("hidden");

    endRoundEarly = false;

    // Determine the current speaker for this round
    const teamPlayers = teams[currentTeam].players;
    const speaker = teamPlayers[currentSpeaker];

    // Update UI to indicate current speaker
    document.getElementById("currentSpeaker").textContent = `Speaker: ${speaker.name}`;
    
    // Rotate to the next speaker for the next round
    currentSpeaker = (currentSpeaker + 1) % teamPlayers.length;

    startCountdown(numSeconds, () => {
        document.getElementById("scoreInput").classList.remove("hidden");
        const scoreButtons = document.getElementsByClassName("scoreButton");
        for (let index = 0; index < scoreButtons.length; index++) {
            if (index <= numWords) {
                const element = scoreButtons[index];
                element.hidden = false;
            }
        }
        document.getElementById("endRoundButton").classList.add("hidden");
        let count = 0;
        document.querySelectorAll(".scoreButton").forEach(button => {
            count++;
            if (count <= numWords + 1)
            {
                button.style.background = null;
                button.disabled = false;
            }
        });
    });
}

// Update Firebase to sync round information
function syncRoundWithFirebase(db, lobbyCode, roundData) {
    db.ref('lobbies/' + lobbyCode + '/currentRound').set(roundData);
}

// Add Firebase listeners to sync game state across players
function addFirebaseListeners(db, lobbyCode) {
    const roundRef = db.ref('lobbies/' + lobbyCode + '/currentRound');
    roundRef.on('value', snapshot => {
        if (snapshot.exists()) {
            const roundData = snapshot.val();
            // Update game state with roundData
            updateRound(roundData);
        }
    });
}

function nextRound() {
    document.getElementById("scoreInput").classList.add("hidden");
    const scoreButtons = document.getElementsByClassName("scoreButton");
    for (let index = 0; index < scoreButtons.length; index++) {
        const element = scoreButtons[index];
        element.hidden = true;
    }
    document.getElementById("nextRoundButton").classList.add("hidden");
    document.getElementById("timer").classList.add("hidden");
    clearWords();

    currentTeam = (currentTeam + 1) % teams.length;
    currentRound++;
    if (teams.some(team => team.points >= pointsToWin)) {
        endGame();
    } else {
        document.getElementById("startRoundButton").classList.remove("hidden");
        document.getElementById("endGameButton").classList.remove("hidden");
    }
    updateCurrentTeamIndicator();
}

function endGame() {
    alert("Game over! Team scores:\n" + teams.map((team, index) => `Team ${index + 1}: ${team.points} points`).join("\n"));
    location.reload();
}

function endRound() {
    document.getElementById("endRoundButton").classList.add("hidden");
    endRoundEarly = true;
}

function displayCurrentWords() {
    const wordsContainer = document.getElementById("currentWords");
    wordsContainer.innerHTML = "";
    
    selectedWords.slice(0, numWords).forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.textContent = word;
        wordsContainer.appendChild(wordDiv);
    });

    if (selectedWords.length <= numWords) {
        alert("Words exhausted, selecting from other categories!");
        selectedWords = selectWords('None', []);
    }
    
    selectedWords = selectedWords.slice(numSeconds);
}

function clearWords() {
    const wordsContainer = document.getElementById("currentWords");
    wordsContainer.innerHTML = "";
}

function updatePoints(points) {
    teams[currentTeam].points += points;
    updateBoard();
    updateTeamScores();
    if (teams[currentTeam].points >= pointsToWin)
    {
        document.getElementById("nextRoundButton").textContent = "EndGame";
    }
    document.getElementById("nextRoundButton").classList.remove("hidden");
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
    // Wait for the countdown sound to finish playing for its duration
    await playSound(countdownSound, () => false, 1.1);
    document.getElementById("endRoundButton").classList.remove("hidden");
    displayCurrentWords();
    
    const timerElement = document.getElementById("timer");
    timerElement.classList.remove("hidden");
    let remainingTime = seconds;
    timerElement.textContent = remainingTime;

    const warningTime = 5;
    let tickPlaying = false;
    let warningPlaying = false;
    
    countdownTimer = setInterval(() => {
        // Play the tick sound every second if not already playing
        if (remainingTime > warningTime && !tickPlaying) {
            tickPlaying = true;
            playSound(tickSound, () => remainingTime <= warningTime || endRoundEarly, 1.0).then(() => tickPlaying = false);
        }

        remainingTime--;
        timerElement.textContent = remainingTime;
        if (remainingTime < 0)
        {
            timerElement.textContent = 0;
        }

        // Play the warning sound 5 seconds before the end if not already playing
        if (remainingTime <= warningTime && remainingTime > 0 && !warningPlaying) {
            warningPlaying = true;
            playSound(warningSound, () => remainingTime < 0 || endRoundEarly, 1.2).then(() => warningPlaying = false);
        }

        if (remainingTime < 0 ) {
            remainingTime == 0;
            clearInterval(countdownTimer);
            // Play end sound when the timer ends
            playSound(endSound, () => false, 1.0);
            callback();
        }

        if (endRoundEarly === true) {
            clearInterval(countdownTimer);
            // Play end sound when the timer ends
            playSound(endSoundAlt, () => false, 1.0);
            callback();
        }
    }, 1000);
}

function generateBoard() {
    const boardSize = pointsToWin;

    let columns = 5;
    if (isMobileDevice()) 
    {
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
        indicator.textContent = `Current Team: Team ${currentTeam + 1}`;
        indicator.style.color = getTeamColor(currentTeam);
        document.getElementById("game").prepend(indicator);
    } else {
        currentTeamIndicator.textContent = `Current Team: Team ${currentTeam + 1}`;
        currentTeamIndicator.style.color = getTeamColor(currentTeam);
    }
}
