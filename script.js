import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

const API_KEY = "AIzaSyAZkNr8lIdg6MyTCD3urTdiEgzJoKOamsk";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Game state variables
let teams = [];
let currentGameWords = [];
let easyWords = [];
let hardWords = [];
let currentTeam = 0;
let totalPoints = 0;
let currentRound = 0;
let countdownTimer;
let pointsToWin;
let gameMode;
let numWords = 5;
let numSeconds = 30;
let endRoundEarly = false;
let selectedButtons = 0;
let aiGameWords = [];
let isAiGame = false;

// DOM elements
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const btnSettings = document.getElementById("settings");
const btnAI = document.getElementById("ai");
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

    // Toggle modal display
    btnSettings.addEventListener("click", () => {
        $('#settingsModal').modal('show');
    });

    // Close modal on outside click
    $('#settingsModal').on('click', function(event) {
        if ($(event.target).hasClass('modal')) {
            $(this).modal('hide');
        }
    });

    // Close modal on button click
    $(document).ready(function() {
        $('.modal-footer button[data-dismiss="modal"]').click(function() {
            $(this).closest('.modal').modal('hide');
        });
    });

    // Toggle AI modal display
    btnAI.addEventListener("click", () => {
        $('#aiModal').modal('show');
    });

    // Close AI modal on outside click
    $('#aiModal').on('click', function(event) {
        if ($(event.target).hasClass('modal')) {
            $(this).modal('hide');
        }
    });

    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("startRoundButton").addEventListener("click", startRound);
    document.getElementById("nextRoundButton").addEventListener("click", nextRound);
    document.getElementById("endGameButton").addEventListener("click", endGame);
    document.getElementById("endRoundButton").addEventListener("click", endRound);
    document.getElementById("btnGenerate").addEventListener("click", generate);
    document.getElementById("btnAiGame").addEventListener("click", startAIGame);
}

function generate() {
    run(document.getElementById("topic").value);
}

async function run(topic) {
    const prompt = `Generate a list of exactly 50 words only related to the topic "${topic}". 

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
    
    Only return the list of 50 words, each on a new line. Do not forget to include relevant people, places etc related to the topic and sub topics.`    

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    aiGameWords = text.split("\n");
    aiGameWords = shuffleArray(aiGameWords);

    document.getElementById("btnAiGame").disabled = false;

    let p = document.getElementById('aiWords');
    p.textContent = aiGameWords.join(', ');
}

function startAIGame() {
    isAiGame = true;
    startGame();
    $('#aiModal').modal('hide');
    btnAI.hidden = true;
}

async function startGame() {
    // Play game start sound
    await playSound(startSound, () => false, 1.2);
    
    // Read game settings
    const difficulty = document.getElementById("difficulty").value.toLowerCase();
    const selectedCategories = Array.from(categoriesSelect.selectedOptions).map(option => option.value);
    const selectedTheme = themesSelect.value;

    const numTeams = parseInt(document.getElementById("numTeams").value);
    teams = Array.from({ length: numTeams }, () => ({ points: 0 }));

    pointsToWin = parseInt(document.getElementById("pointsToWin").value);
    numWords = parseInt(txtWords.value);
    numSeconds = parseInt(txtSeconds.value);

    // Validate game settings
    if (selectedCategories.length > 0 && selectedTheme !== "None") {
        alert("Please select either categories or theme, not both.");
        return;
    }

    // Load game data
    currentGameWords = loadWords(selectedTheme, selectedCategories, difficulty);

    debugger;
    // Ai game
    if (isAiGame) {
        teams = Array.from({ length: 2 }, () => ({ points: 0 }));

        if (isMobileDevice()) {
            pointsToWin = 16;
        }
        else {
            pointsToWin = 15;
        }

        currentGameWords = aiGameWords;
    }

    // Show/Hide UI elements
    menu.hidden = true;
    game.hidden = false;
    btnSettings.hidden = true;
    btnHistory.hidden = false;
    btnAI.hidden = true;

    // Toggle modal display
    btnHistory.addEventListener("click", () => {
        $('#historyModal').modal('show');
    });

    // Close modal on outside click
    $('#historyModal').on('click', function(event) {
        if ($(event.target).hasClass('modal')) {
            $(this).modal('hide');
        }
    });

    // Close modal on button click
    $(document).ready(function() {
        $('.modal-footer button[data-dismiss="modal"]').click(function() {
            $(this).closest('.modal').modal('hide');
        });
    });

    // Handle answer button click logic
    let count = 0;
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (count < numWords)
        {
            button.addEventListener("click", () => {
                count++;
                if (!btnNextRound.hidden === true)
                {
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
    createTeamAuditColumns(getCurrentTeamIndex(currentTeam));
    
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

    endRoundEarly = false;

    startCountdown(numSeconds, () => {
        btnEndRound.hidden = true;
        btnNextRound.hidden = false;

        let count = 0;
        document.querySelectorAll(".scoreButton").forEach(button => {
            count++;
            if (count <= numWords)
            {
                button.style.background = null;
                button.disabled = false;
            }
        });
    });
}

function nextRound() {
    let correctAnswers = [];
    document.querySelectorAll(".scoreButton").forEach(button => {
        if (button.style.background == "grey")
        {
            correctAnswers.push(button.textContent);
        }
    });

    updatePoints(selectedButtons);

    currentTeam++;
    if (currentTeam > teams.length)
    {
        currentTeam = 1;
        currentRound++;
    }
    createTeamAuditColumns(getCurrentTeamIndex(currentTeam));
    createTeamAuditRows(getCurrentTeamIndex(currentTeam), correctAnswers);

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
}

function endGame() {
    alert("Game over! Team scores:\n" + teams.map((team, index) => `Team ${index + 1}: ${team.points} points`).join("\n"));
    location.reload();
}

function endRound() {
    btnEndRound.hidden = true;
    btnNextRound.hidden = false;
    endRoundEarly = true;
}

function displayCurrentWords() {
    const scoreButtons = document.getElementsByClassName("scoreButton");
    for (let index = 0; index < scoreButtons.length; index++) {
        if (index < numWords) {
            const element = scoreButtons[index];
            element.hidden = false;
        }
    }

    btnAnswers.hidden = false;
    const wordButtons = document.getElementsByClassName("scoreButton");
    
    debugger;
    // We need to evenly mix easy and hard to make the game fair
    if (difficulty.value === "normal" && !isAiGame)
    {
        let numEasy = Math.ceil(numWords/2);
        let numHard = numWords - numEasy;

        if (easyWords.length < numEasy || hardWords.length < numHard) {
            alert("Words exhausted, selecting from other categories!");
            currentGameWords = loadWords('None', []);
        }

        let normalWords = [];
        normalWords = easyWords.slice(0, numEasy).concat(hardWords.slice(0, numHard));
        normalWords = shuffleArray(normalWords);

        for (let i = 0; i <= normalWords.length; i++) {
            wordButtons[i].textContent = normalWords[i];
        }

        easyWords = easyWords.slice(numEasy);
        hardWords = hardWords.slice(numHard);
    }
    else
    {
        if (currentGameWords.length < numWords) {
            alert("Words exhausted, selecting from other categories!");
            currentGameWords = loadWords('None', []);
        }

        currentGameWords.slice(0, numWords).forEach((word, index) => {
            wordButtons[index].textContent = word;
        });

        currentGameWords = currentGameWords.slice(numWords);
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
    if (teams[getCurrentTeamIndex(currentTeam)].points >= pointsToWin)
    {
        document.getElementById("nextRoundButton").textContent = "EndGame";
    }
    btnNextRound.hidden = false;
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
        if (remainingTime < 0)
        {
            timer.textContent = 0;
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
            selectedButtons = 0;
            callback();
        }

        if (endRoundEarly === true) {
            clearInterval(countdownTimer);
            // Play end sound when the timer ends
            await playSound(endSoundAlt, () => false, 1.0).then(() => {
                selectedButtons = 0;
                callback();
            });
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
        indicator.textContent = `Current Team: Team ${currentTeam}`;
        indicator.style.color = getTeamColor(getCurrentTeamIndex(currentTeam));
        document.getElementById("game").prepend(indicator);
    } else {
        currentTeamIndicator.textContent = `Current Team: Team ${currentTeam}`;
        currentTeamIndicator.style.color = getTeamColor(getCurrentTeamIndex(currentTeam));
    }
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
function hideElement(element) {

}

function getCurrentTeamIndex (currentTeam) {
    return currentTeam -1;
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