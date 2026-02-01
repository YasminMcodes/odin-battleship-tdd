export default class Gameboard {
    constructor() { 
        this.ships = [];
        this.missedAttacks = [];  
    }
    placeShip(ship, coordinates) {
        this.ships.push({ ship, coordinates });
    }
    receiveAttack(coordinates) {
        for (let placedShip of this.ships) {
            const[x,y] = placedShip.coordinates;
            const[attackX, attackY] = coordinates;
            if (x === attackX && y === attackY) {
                placedShip.ship.hit();
                return;
            }
        }
        this.missedAttacks.push(coordinates);
    }
    allShipsSunk() {
        return this.ships.every(placedShip => placedShip.ship.isSunk());
    }
}