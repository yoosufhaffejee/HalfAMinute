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

document.addEventListener("DOMContentLoaded", () => {
    initializeMenu();
});

// Get audio elements
const startSound = document.getElementById('startSound');
const countdownSound = document.getElementById('countdownSound');
const tickSound = document.getElementById('tickSound');
const warningSound = document.getElementById('warningSound');
const endSound = document.getElementById('endSound');

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

    document.getElementById("selectCategoriesBtn").addEventListener("click", () => {
        document.getElementById("categoriesSection").style.display = 'block';
        document.getElementById("themesSection").style.display = 'none';
    });

    document.getElementById("selectThemeBtn").addEventListener("click", () => {
        document.getElementById("categoriesSection").style.display = 'none';
        document.getElementById("themesSection").style.display = 'block';
    });

    document.getElementById("toggleAdvancedOptions").addEventListener("click", () => {
        const advancedOptions = document.getElementById("advancedOptions");
        advancedOptions.classList.toggle("hidden");
    });

    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("startRoundButton").addEventListener("click", startRound);
    document.getElementById("nextRoundButton").addEventListener("click", nextRound);
    document.getElementById("endGameButton").addEventListener("click", endGame);

    document.querySelectorAll(".scoreButton").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".scoreButton").forEach(button => {
                button.disabled = true;
            });
            button.style.background = "grey";
            const points = parseInt(button.dataset.score);
            updatePoints(points);
        });
    });
}

async function startGame() {
    await playSound(startSound, () => false, 1.2);

    const difficulty = document.getElementById("difficulty").value.toLowerCase();
    const selectedCategories = Array.from(categoriesSelect.selectedOptions).map(option => option.value);
    const selectedTheme = themesSelect.value;
    const numTeams = parseInt(document.getElementById("numTeams").value);
    pointsToWin = parseInt(document.getElementById("pointsToWin").value);

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

function startRound() {
    document.getElementById("startRoundButton").classList.add("hidden");
    startCountdown(numSeconds, () => {
        document.getElementById("scoreInput").classList.remove("hidden");
        document.querySelectorAll(".scoreButton").forEach(button => {
            button.style.background = null;
            button.disabled = false;
        });
    });
}

function nextRound() {
    document.getElementById("scoreInput").classList.add("hidden");
    document.getElementById("nextRoundButton").classList.add("hidden");
    clearWords();

    currentTeam = (currentTeam + 1) % teams.length;
    currentRound++;
    if (teams.some(team => team.points >= pointsToWin)) {
        endGame();
    } else {
        document.getElementById("startRoundButton").classList.remove("hidden");
    }
    updateCurrentTeamIndicator();
}

function endGame() {
    alert("Game over! Team scores:\n" + teams.map((team, index) => `Team ${index + 1}: ${team.points} points`).join("\n"));
    location.reload();
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
    await playSound(countdownSound, () => false, 1.0);
    displayCurrentWords();
    
    const timerElement = document.getElementById("timer");
    let remainingTime = seconds;
    timerElement.textContent = remainingTime;

    const warningTime = 5;
    let tickPlaying = false;
    let warningPlaying = false;
    
    countdownTimer = setInterval(() => {
        // Play the tick sound every second if not already playing
        if (remainingTime > warningTime && !tickPlaying) {
            tickPlaying = true;
            playSound(tickSound, () => remainingTime <= warningTime, 1.0).then(() => tickPlaying = false);
        }

        remainingTime--;
        timerElement.textContent = remainingTime;

        // Play the warning sound 5 seconds before the end if not already playing
        if (remainingTime <= warningTime && remainingTime > 0 && !warningPlaying) {
            warningPlaying = true;
            playSound(warningSound, () => remainingTime < 0, 1.1).then(() => warningPlaying = false);
        }

        if (remainingTime <= 0) {
            clearInterval(countdownTimer);
            // Play end sound when the timer ends
            playSound(endSound, () => false, 1.0);
            callback();
        }
    }, 1000);
}

function generateBoard() {
    const boardSize = pointsToWin;
    const columns = 5;
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


function updateBoard() {
    const gameBoard = document.getElementById("gameBoard");
    const boardCells = gameBoard.children;

    Array.from(boardCells).forEach(cell => {
        cell.style.backgroundColor = "";
    });

    teams.forEach((team, index) => {
        const position = Math.min(team.points, boardCells.length - 1);
        boardCells[position].style.backgroundColor = getTeamColor(index);
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
