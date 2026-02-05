import Player from '../src/Player.js';
import renderBoards from '../src/dom.js';
import { resetShipYardDOM } from '../src/dom.js';

let player;
let computer;
let currentPlayer;
let gamePhase = 'placement';
let shipsToPlace = [5, 4, 3, 2];
let currentShipIndex = 0;
let placementDirection = 'horizontal'
let isTwoPlayer = false;
let waitingForPass = false;
export function setGameMode(mode) {
    isTwoPlayer = (mode === '2p');
    document.getElementById('start-menu').classList.add('hidden');
    startGame();
}
export function startGame() {
    player = new Player('Player 1');
    if (isTwoPlayer) {
        computer = new Player('Player 2');
    } else {
        computer = new Player('Computer');
    }
    currentPlayer = player;
    gamePhase = 'placement';
    currentShipIndex = 0;

    if (!isTwoPlayer) {
        computer.gameboard.placeAllShipsRandomly();
    }

    renderBoards(player, computer, currentPlayer, isTwoPlayer);
}

export function toggleDirection() {
    placementDirection = placementDirection === 'horizontal' ? 'vertical' : 'horizontal';

    const ships = document.querySelectorAll('#ship-yard .ship:not(.placed');

    ships.forEach(ship => {
        ship.classList.toggle('vertical', placementDirection === 'vertical');
    });

}
export function playTurn([row, col], isEnemyBoard) {
    if (gamePhase !== 'playing' || waitingForPass) return;
    if (!isEnemyBoard) return;

    const opponent = (currentPlayer == player) ? computer : player;

    const currentPlayerName = (currentPlayer === player) ? "Player 1" : "Player 2";

    opponent.gameboard.receiveAttack([row, col]);
    if (opponent.gameboard.allShipsSunk()) {
        alert(`${currentPlayerName} Wins!`);
        startGame();
        return;
    }
    if (isTwoPlayer) {
        waitingForPass = true;
        renderBoards(player, computer, currentPlayer, isTwoPlayer, true);
    } else {
        computerTurn();
        renderBoards(player, computer, currentPlayer, isTwoPlayer);
    }
}
export function nextTurn() {
    if (gamePhase == 'playing') {
        currentPlayer = (currentPlayer === player) ? computer : player;
    }
    waitingForPass = false;
    renderBoards(player, computer, currentPlayer, isTwoPlayer, false);
}
function computerTurn() {
    let move;
    do {
        move = [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10)
        ];
    } while (
        computer.gameboard.missedAttacks.some(coord => coord[0] === move[0] && coord[1] === move[1])
    );

    computer.attack(player.gameboard, move);
    if (player.gameboard.allShipsSunk()) {
        alert('Computer wins!');
    }

}
function resetPlacementForPlayer2() {
    waitingForPass = true;
    currentShipIndex = 0;
    currentPlayer = computer;
    renderBoards(player, computer, currentPlayer, isTwoPlayer, true);
    resetShipYardDOM();
}

export function placeShipFromDrag(row, col, length) {
    if (gamePhase !== 'placement') return;

    const placed = currentPlayer.gameboard.placeShipAt(
        row,
        col,
        length,
        placementDirection
    );
    if (placed) {
        removeShipYard(length);
        currentShipIndex++;
        if (currentShipIndex === shipsToPlace.length) {
            if (isTwoPlayer && currentPlayer === player) {
                resetPlacementForPlayer2();
            } else {
                gamePhase = 'playing';
                currentPlayer = player;
                renderBoards(player, computer, currentPlayer, isTwoPlayer);
                console.log("Game Start")
            }
        } else {
            renderBoards(player, computer, currentPlayer, isTwoPlayer);
        }
    }
}

export function removeShipYard(length) {
    const ship = document.querySelector(`.ship[data-length="${length}"]`);
    if (!ship) return;

    ship.classList.add('placed');
    ship.setAttribute('draggable', 'false');
}




