const categories = {
    "Geography": [
        { word: "Mountain", difficulty: "easy" },
        { word: "River", difficulty: "easy" },
        { word: "Ocean", difficulty: "easy" },
        { word: "Desert", difficulty: "easy" },
        { word: "Valley", difficulty: "easy" },
        { word: "Island", difficulty: "easy" },
        { word: "Volcano", difficulty: "easy" },
        { word: "Peninsula", difficulty: "easy" },
        { word: "Plateau", difficulty: "easy" },
        { word: "Glacier", difficulty: "easy" },
        { word: "Equator", difficulty: "hard" },
        { word: "Prime Meridian", difficulty: "hard" },
        { word: "International Date Line", difficulty: "hard" },
        { word: "Tropic of Cancer", difficulty: "hard" },
        { word: "Tropic of Capricorn", difficulty: "hard" },
        { word: "Isthmus", difficulty: "hard" },
        { word: "Archipelago", difficulty: "hard" },
        { word: "Delta", difficulty: "hard" },
        { word: "Estuary", difficulty: "hard" },
        { word: "Atoll", difficulty: "hard" }
    ],
    // Add other categories here
};

const themes = {
    "Wedding Fever": [
        { word: "Bride", difficulty: "easy" },
        { word: "Groom", difficulty: "easy" },
        { word: "Wedding Cake", difficulty: "easy" },
        { word: "Bouquet", difficulty: "easy" },
        { word: "Honeymoon", difficulty: "easy" },
        { word: "Vows", difficulty: "easy" },
        { word: "Best Man", difficulty: "easy" },
        { word: "Maid of Honor", difficulty: "easy" },
        { word: "Wedding Ring", difficulty: "easy" },
        { word: "Reception", difficulty: "easy" },
        { word: "First Dance", difficulty: "hard" },
        { word: "Wedding Bells", difficulty: "hard" },
        { word: "Unity Candle", difficulty: "hard" },
        { word: "Wedding Planner", difficulty: "hard" },
        { word: "Flower Girl", difficulty: "hard" },
        { word: "Ring Bearer", difficulty: "hard" },
        { word: "Tuxedo", difficulty: "hard" },
        { word: "Wedding March", difficulty: "hard" },
        { word: "Bridal Shower", difficulty: "hard" },
        { word: "Bachelor Party", difficulty: "hard" }
    ],
    // Add other themes here
};

let selectedWords = [];
let currentRound = 0;
let totalPoints = 0;
let currentTeam = 0;
let teams = [];
let gameBoard = [];
let pointsToWin = 20;

document.addEventListener("DOMContentLoaded", () => {
    const categoriesSelect = document.getElementById("categories");
    const themesSelect = document.getElementById("themes");

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

    document.getElementById("startGame").addEventListener("click", startGame);
    document.getElementById("quickStart").addEventListener("click", quickStart);
    document.getElementById("endRound").addEventListener("click", endRound);
});

function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    const selectedCategories = Array.from(document.getElementById("categories").selectedOptions).map(option => option.value);
    const selectedTheme = document.getElementById("themes").value;
    const numTeams = parseInt(document.getElementById("teams").value);
    pointsToWin = parseInt(document.getElementById("pointsToWin").value);

    if (selectedTheme) {
        selectedWords = themes[selectedTheme].filter(word => word.difficulty === difficulty);
    } else {
        selectedWords = selectedCategories.flatMap(category => categories[category].filter(word => word.difficulty === difficulty));
    }

    shuffleArray(selectedWords);
    setupGame(numTeams);
}

function quickStart() {
    const selectedCategories = Object.keys(categories);
    const numTeams = 2;
    pointsToWin = 20;

    selectedWords = selectedCategories.flatMap(category => categories[category].filter(word => word.difficulty === "normal"));
    shuffleArray(selectedWords);
    setupGame(numTeams);
}

function setupGame(numTeams) {
    teams = Array.from({ length: numTeams }, () => 0);
    currentTeam = 0;
    totalPoints = 0;
    currentRound = 0;

    generateBoard();
    updateCurrentWords();
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
}

function generateBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${pointsToWin}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${Math.ceil(pointsToWin / 5)}, 1fr)`;

    gameBoard = Array.from({ length: pointsToWin }, () => getRandomBoardCell());

    gameBoard.forEach((cell, index) => {
        const div = document.createElement("div");
        div.textContent = cell;
        div.classList.add("board-cell");
        board.appendChild(div);
    });
}

function getRandomBoardCell() {
    const powerups = [
        "+1", "-1", "?", "??", "!!!"
    ];

    const randomIndex = Math.floor(Math.random() * powerups.length);
    return powerups[randomIndex];
}

function updateCurrentWords() {
    const currentWordsDiv = document.getElementById("currentWords");
    currentWordsDiv.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        if (selectedWords.length > 0) {
            const wordObj = selectedWords.pop();
            const wordDiv = document.createElement("div");
            wordDiv.textContent = wordObj.word;
            wordDiv.classList.add("word");
            currentWordsDiv.appendChild(wordDiv);
        }
    }
}

function endRound() {
    const pointsScored = parseInt(document.getElementById("pointsScored").value);
    teams[currentTeam] += pointsScored;
    totalPoints += pointsScored;

    moveTeamOnBoard(pointsScored);
    currentTeam = (currentTeam + 1) % teams.length;
    updateCurrentWords();

    if (teams.some(teamScore => teamScore >= pointsToWin)) {
        alert("Game Over!");
        resetGame();
    }
}

function moveTeamOnBoard(points) {
    // Logic for moving the team on the board
    // Add the appropriate number of points and check the cell effects
}

function resetGame() {
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("game").classList.add("hidden");
    selectedWords = [];
    teams = [];
    totalPoints = 0;
    currentTeam = 0;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
