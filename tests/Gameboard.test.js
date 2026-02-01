import Gameboard from '../src/Gameboard.js';
import Ship from '../src/Ship.js';

test("Creates a gameboard",() =>{
    const gameboard = new Gameboard();
    expect(gameboard).toBeInstanceOf(Gameboard);
});

test("Gameboard can place a ship at specified coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0,0]);
    expect(gameboard.ships.length).toBe(1);
});

test( "receiveAttack hits a ship if coordinates match", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0,0]);
    gameboard.receiveAttack([0,0]);
    expect(ship.hits).toBe(1);
});

test("receiveAttack doesn't hit a ship if coordinates don't match", ()=> {
    const gameboard = new Gameboard();
    gameboard.receiveAttack([1,1]);

    expect(gameboard.missedAttacks).toContainEqual([1,1]);
});

test("report all ships sunk correctly", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(1);
    const ship2 = new Ship(2);
    gameboard.placeShip(ship1, [0,0]);
    gameboard.placeShip(ship2, [1,1]);

    ship1.hit();
    ship2.hit();
    ship2.hit();
    expect(gameboard.allShipsSunk()).toBe(true);
});