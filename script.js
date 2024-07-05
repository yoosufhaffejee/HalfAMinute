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

const categoriesSelect = document.getElementById("categories");
const themesSelect = document.getElementById("themes");

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

    categoriesSelect.style.display = 'none';
    themesSelect.style.display = 'none';

    document.getElementById("selectCategoriesBtn").addEventListener("click", () => {
        categoriesSelect.style.display = 'block';
        themesSelect.style.display = 'none';
        themesSelect.value = "";
    });

    document.getElementById("selectThemeBtn").addEventListener("click", () => {
        categoriesSelect.style.display = 'none';
        themesSelect.style.display = 'block';

        Array.from(categoriesSelect.options).forEach(option => {
            option.selected = false;
        });
    });

    document.getElementById("startGameBtn").addEventListener("click", startGame);
    document.getElementById("quickStartBtn").addEventListener("click", quickStart);
    document.getElementById("startRoundBtn").addEventListener("click", startRound);
    document.getElementById("nextRoundBtn").addEventListener("click", nextRound);
    document.getElementById("endGameBtn").addEventListener("click", endGame);

    document.querySelectorAll(".pointsBtn").forEach(button => {
        button.addEventListener("click", () => {
            const points = parseInt(button.dataset.points);
            updatePoints(points);
        });
    });
}

function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    const selectedCategories = Array.from(categoriesSelect.selectedOptions).map(option => option.value);
    const selectedTheme = themesSelect.value;
    const numTeams = parseInt(document.getElementById("numTeams").value);
    pointsToWin = parseInt(document.getElementById("pointsToWin").value);

    if (selectedCategories.length > 0 && selectedTheme !== "") {
        alert("Please select either categories or theme, not both.");
        return;
    }

    debugger;
    if (selectedTheme) {
        selectedWords = themes[selectedTheme].filter(word => word.difficulty === difficulty);
    } else {
        selectedWords = selectedCategories.flatMap(category => categories[category].filter(word => word.difficulty === calculateDifficulty(difficulty))).map(_ => _.word);
    }

    selectedWords = shuffleArray(selectedWords);
    teams = Array.from({ length: numTeams }, () => ({ points: 0 }));

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    generateBoard();
    updateBoard();
    //updateTeamScores();
}

function calculateDifficulty(difficulty) {
    if (difficulty === "normal") {
        const randomValue = Math.random();
        if (randomValue <= 0.5) {
            return "easy";
        } else {
            return "hard";
        }
    }

    return difficulty;
}

function quickStart() {
    document.getElementById("difficulty").value = "normal";
    Array.from(categoriesSelect.options).forEach(option => option.selected = true);
    themesSelect.value = "";
    startGame();
}

function startRound() {
    displayCurrentWords();
    document.getElementById("startRoundBtn").classList.add("hidden");
    startCountdown(30, () => {
        document.getElementById("pointsScoredContainer").classList.remove("hidden");
    });
}

function nextRound() {
    document.getElementById("pointsScoredContainer").classList.add("hidden");
    document.getElementById("nextRoundBtn").classList.add("hidden");

    currentTeam = (currentTeam + 1) % teams.length;
    currentRound++;
    if (teams.some(team => team.points >= pointsToWin)) {
        endGame();
    } else {
        document.getElementById("startRoundBtn").classList.remove("hidden");
    }
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

function startCountdown(duration, callback) {
    let timeRemaining = duration;
    const timer = document.getElementById("timer");
    timer.textContent = timeRemaining;

    countdownTimer = setInterval(() => {
        timeRemaining--;
        timer.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(countdownTimer);
            callback();
        }
    }, 1000);
}

function updatePoints(points) {
    teams[currentTeam].points += points;
    document.getElementById("nextRoundBtn").classList.remove("hidden");

    document.querySelectorAll(".pointsBtn").forEach(button => {
        button.disabled = true;
    });

    updateBoard();
}

function generateBoard() {
    const boardSize = pointsToWin;
    const board = document.getElementById("board");
    board.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(boardSize))}, 1fr)`;
    board.innerHTML = "";

    for (let i = 0; i < boardSize; i++) {
        const cell = document.createElement("div");
        cell.className = "board-cell";
        const randomValue = Math.random();
        if (randomValue < 0.2) {
            cell.textContent = "+1";
        } else if (randomValue < 0.4) {
            cell.textContent = "-1";
        } else if (randomValue < 0.6) {
            cell.textContent = "???";
        } else {
            cell.textContent = "!!!";
        }
        board.appendChild(cell);
    }
}

function updateBoard() {
    // Implement board update logic here if needed
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
