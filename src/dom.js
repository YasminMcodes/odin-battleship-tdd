import { playTurn, toggleDirection, placeShipFromDrag } from '../src/gameController.js';

let draggedShipLength = null;

// dom.js

// Using a single listener on the document is better than looping 
// because it works even if you reset the shipyard for Player 2.
document.addEventListener('dragstart', (e) => {
    // Check if what we are dragging is actually a ship
    if (e.target.classList.contains('ship')) {
        draggedShipLength = Number(e.target.dataset.length);
        
        // Optional: add a class to style the ship while it's being dragged
        e.target.classList.add('dragging');
        
        console.log('Dragging ship length:', draggedShipLength);
    }
});

// Clean up the class when dragging stops
document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('ship')) {
        e.target.classList.remove('dragging');
    }
});

// Rotate button
const rotateBtn = document.getElementById('rotate-btn');
if (rotateBtn) {
    rotateBtn.addEventListener('click', toggleDirection);
}

export default function renderBoards(player1, player2, currentPlayer, isTwoPlayer, showOverlay = false) {
    const playerBoardUI = document.getElementById('player-board');
    const computerBoardUI = document.getElementById('computer-board');
    const overlay = document.getElementById('pass-overlay');

    const playerTitle = document.getElementById('player-title');
    const enemyTitle = document.getElementById('enemy-title');

    if (showOverlay) {
        overlay.classList.remove('hidden');
        return;
    } else {
        overlay.classList.add('hidden');
    }
    playerBoardUI.innerHTML = '';
    computerBoardUI.innerHTML = '';

    if (currentPlayer === player1) {
        playerTitle.textContent = " Player 1 Board";
        enemyTitle.textContent = (!isTwoPlayer) ? "Computer Board" : "Player 2 Board";

        renderBoard(playerBoardUI, player1.gameboard, false);
        renderBoard(computerBoardUI, player2.gameboard, true);
    } else {
        playerTitle.textContent = "Your Board (P2)";
        enemyTitle.textContent = "Player 1 Board";

        renderBoard(playerBoardUI, player2.gameboard, false);
        renderBoard(computerBoardUI, player1.gameboard, true);
    }

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

            if (!isEnemy && shipEntry) cell.classList.add('ship-cell');
            if (board.hitAttacks.some(c => c[0] === row && c[1] === col)) cell.classList.add('hit-cell');
            if (board.missedAttacks.some(c => c[0] === row && c[1] === col)) cell.classList.add('miss-cell');

            // 🎯 DROP TARGET (PLAYER BOARD ONLY)
            if (!isEnemy) {
                cell.addEventListener('dragover', e => e.preventDefault());
                cell.addEventListener('drop', (e) => {
                    e.preventDefault();
                    if (!draggedShipLength) return;
                    placeShipFromDrag(row, col, draggedShipLength);
                });
            }


            // 🎯 ATTACKS
            if (isEnemy) {
                cell.addEventListener('click', () => playTurn([row, col], true));
            }

            container.appendChild(cell);
        }
    }
}

export function resetShipYardDOM() {
    const ships = document.querySelectorAll('.ship');
    ships.forEach(ship => {
        ship.classList.remove('placed');
        ship.setAttribute('draggable', 'true');
    });
    draggedShipLength = null;
}