import { playTurn, toggleDirection } from '../src/gameController.js';

const rotateBtn = document.getElementById('rotate-btn');
if (rotateBtn) {
    rotateBtn.addEventListener('click', toggleDirection);
}


export default function renderBoards(player, computer) {
    const playerBoard = document.getElementById('player-board');
    const computerBoard = document.getElementById('computer-board');



    playerBoard.innerHTML = '';
    computerBoard.innerHTML = '';

    renderBoard(playerBoard, player.gameboard, false);
    renderBoard(computerBoard, computer.gameboard, true);
}

function renderBoard(container, board, isEnemy) {
    container.innerHTML = '';
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            const shipEntry = board.ships.find(entry =>
                entry.coordinates.some(coord => coord[0] === row && coord[1] === col)
            );

            if (!isEnemy && shipEntry) {
                cell.classList.add('ship-cell');
            }
            if (board.hitAttacks.some(coord => coord[0] === row && coord[1] === col)) {
                cell.classList.add('hit-cell');
            }

            if (board.missedAttacks.some(coord => coord[0] === row && coord[1] === col)) {
                cell.classList.add('miss-cell');
            }


            if (isEnemy) {
                cell.addEventListener('click', () => {
                    playTurn([row, col], true);
                });
            } else {
                cell.addEventListener('click', () => {
                    playTurn([row, col], false);
                });
            }

            container.appendChild(cell);
        }
    }
}