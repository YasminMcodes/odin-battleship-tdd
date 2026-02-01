import { playTurn } from '../src/gameController.js';

export default function renderBoards(player, computer) {
    const playerBoard = document.getElementById('player-board');
    const computerBoard = document.getElementById('computer-board');

  
    playerBoard.innerHTML = '';
    computerBoard.innerHTML = '';

    renderBoard(playerBoard, player.gameboard, false);
    renderBoard(computerBoard, computer.gameboard, true);
}

function renderBoard(container, board, isEnemy) {
    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (isEnemy) {
                cell.addEventListener('click', () => {
                    playTurn([row, col]);
                });
            }

            container.appendChild(cell);
        }
    }
}