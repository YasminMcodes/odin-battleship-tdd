import Player from '../src/Player.js';
import renderBoards from '../src/dom.js';


let player;
let computer;
let currentPlayer;
let gamePhase = 'placement';
let shipsToPlace = [5, 4, 3, 3, 2];
let currentShipIndex = 0;
let placementDirection = 'horizontal'

export function startGame() {
    player = new Player('human');
    computer = new Player('computer');
    currentPlayer = player;
    gamePhase = 'placement';
    currentShipIndex = 0;

    computer.placeShips();
    renderBoards(player, computer);
}

export function toggleDirection() {
    placementDirection = placementDirection === 'horizontal' ? 'vertical' : 'horizontal';
    alert(`Direction: ${placementDirection}`)
}
export function playTurn([row, col], isEnemyBoard) {
    if (gamePhase === 'placement') {
        if (isEnemyBoard) return;

        const length = shipsToPlace[currentShipIndex];
        const placed = player.gameboard.placeShipAt(row, col, length,placementDirection);
        console.log('Trying to place ship at:', row, col, 'Length:', length, 'Placed:', placed);
        if (placed) {
            currentShipIndex += 1;
            if (currentShipIndex === shipsToPlace.length) {
                gamePhase = 'playing';
                alert('All ships placed! Game starts.');
            }
            renderBoards(player, computer);
            return;
        }
    }
    if (gamePhase !== 'playing') return;
    if (currentPlayer !== player) return;
    if (!isEnemyBoard) return;

    player.attack(computer.gameboard, [row, col]);
    if (computer.gameboard.allShipsSunk()) {
        alert('You win!');
        return;
    }

    computerTurn();
    renderBoards(player, computer);
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

