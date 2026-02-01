import Player from '../src/Player.js';
import renderBoards from '../src/dom.js';
import Ship from '../src/Ship.js';

let player;
let computer;
let currentPlayer;

function setupBoards() {

    player.gameboard.placeShip(new Ship(1), [0, 0]);
    computer.gameboard.placeShip(new Ship(1), [1, 1]);
}

export function startGame() {
    player = new Player('human');
    computer = new Player('computer');
    currentPlayer = player;

    setupBoards();
    renderBoards(player, computer);
}

export function playTurn(coordinates) {
    if (currentPlayer !== player) return;

    player.attack(computer.gameboard, coordinates);
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

