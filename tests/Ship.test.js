import Ship from '../src/Ship.js'; 
test ("Ship had a length", () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
});

test("Ship starts with 0 hits", () => {
    const ship = new Ship(3);
    expect(ship.hits).toBe(0);
});

test("hit method increments hits by 1", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test("isSunk method returns true when hits equal length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test("isSunk method returns false when hits less than length", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
});