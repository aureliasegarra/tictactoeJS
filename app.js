// Game configuration
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn

// Select Elements
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // Marked
    cellMarked(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Switch turns
        switchTurns();
        setBoardHoverClass();
    }
}

function cellMarked(cell, currentClass) {
    cell.classList.add(currentClass);
};

function switchTurns() {
    circleTurn = !circleTurn;
};

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
};

// Check for win
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
};

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
};

// Check for draw and Game Over
function endGame(draw) {
    if (draw) {

    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins 🥳`;
    }
    winningMessageElement.classList.add('show');
};