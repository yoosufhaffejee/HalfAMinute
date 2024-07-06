let selectedWords = [];
let teams = [];
let currentTeam = 0;
let totalPoints = 0;
let currentRound = 0;
let countdownTimer;
let pointsToWin;
let gameMode;

document.addEventListener("DOMContentLoaded", () => {
    initializeMenu();
});

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

function startGame() {
    const difficulty = document.getElementById("difficulty").value.toLowerCase();
    const selectedCategories = Array.from(categoriesSelect.selectedOptions).map(option => option.value);
    const selectedTheme = themesSelect.value;
    const numTeams = parseInt(document.getElementById("numTeams").value);
    pointsToWin = parseInt(document.getElementById("pointsToWin").value);

    if (selectedCategories.length > 0 && selectedTheme !== "None") {
        alert("Please select either categories or theme, not both.");
        return;
    }

    if (selectedTheme !== "None") {
        selectedWords = themes[selectedTheme].map(wordObj => wordObj.word);
        if (difficulty === "normal") {
            selectedWords = themes[selectedTheme];
        } else {
            selectedWords = themes[selectedTheme].filter(wordObj => wordObj.difficulty === difficulty).map(wordObj => wordObj.word);
        }
    } else {
        if (selectedCategories.length === 0) {
            // Select all categories if none are selected
            selectedCategories.push(...Object.keys(categories));
        }

        if (difficulty === "normal") {
            selectedWords = selectedCategories.flatMap(category => categories[category]);
        } else {
            selectedWords = selectedCategories.flatMap(category => categories[category].filter(wordObj => wordObj.difficulty === difficulty));
        }
    }

    if (difficulty === "normal") {
        selectedWords = selectedWords.map(wordObj => wordObj.word);
    }

    selectedWords = shuffleArray(selectedWords);
    teams = Array.from({ length: numTeams }, () => ({ points: 0 }));

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    generateBoard();
    updateBoard();
    updateTeamScores();
    updateCurrentTeamIndicator();
}

function startRound() {
    displayCurrentWords();
    document.getElementById("startRoundButton").classList.add("hidden");
    startCountdown(30, () => {
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
    selectedWords.slice(0, 5).forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordDiv.textContent = word;
        wordsContainer.appendChild(wordDiv);
    });
    selectedWords = selectedWords.slice(5);
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

function startCountdown(seconds, callback) {
    const timerElement = document.getElementById("timer");
    let remainingTime = seconds;
    timerElement.textContent = remainingTime;

    countdownTimer = setInterval(() => {
        remainingTime--;
        timerElement.textContent = remainingTime;

        if (remainingTime <= 0) {
            clearInterval(countdownTimer);
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
