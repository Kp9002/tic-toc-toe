const board = document.getElementById("board");
let cells = [];
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;

function updateScore() {
    document.getElementById("scoreX").textContent = scoreX;
    document.getElementById("scoreO").textContent = scoreO;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            setTimeout(() => {
                alert(`${gameState[a]} Wins!`);
                if (gameState[a] === "X") scoreX++;
                else scoreO++;
                updateScore();
                resetGame();
            }, 100);
            return true;
        }
    }
    if (!gameState.includes("")) {
        setTimeout(() => {
            alert("It's a Draw!");
            resetGame();
        }, 100);
        return true;
    }
    return false;
}

function makeMove(index) {
    if (!gameState[index]) {
        gameState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach(cell => cell.textContent = "");
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

createBoard();
