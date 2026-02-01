import Player from '../src/Player.js';
import Gameboard from '../src/Gameboard.js';

test("Creates a player", () => {
    const player = new Player('Alice');
    expect(player).toBeDefined();
});

test("Player has a gameboard", () => {
    const player = new Player('Bob');
    expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test("Player can attack enemy gameboard", () =>{
    const player = new Player('Charlie');
    const enemy = new Player('Dave');

    enemy.gameboard.placeShip({ hit: jest.fn(), isSunk: ()=> false}, [0,0]);
    player.attack(enemy.gameboard, [0,0]);

    expect(enemy.gameboard.ships[0].ship.hit).toHaveBeenCalled();
});

test("can create a computer player", () => {
    const computer = new Player('computer');
    expect(computer.type).toBe('computer');
});