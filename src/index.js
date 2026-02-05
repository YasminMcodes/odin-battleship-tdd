import { setGameMode, startGame, toggleDirection, nextTurn } from './gameController.js';

document.getElementById('vs-computer').addEventListener('click', () => {
    setGameMode('1p');
});

document.getElementById('vs-friend').addEventListener('click', () => {
    setGameMode('2p');
});

document.getElementById('btn-ready').addEventListener('click', () => {
    nextTurn();
});

document.getElementById('randomize').addEventListener('click', () => { });
document .getElementById('rotate-btn').addEventListener('click', toggleDirection);


