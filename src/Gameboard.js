import Ship from './Ship.js';

export default class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
        this.hitAttacks = [];
    }
    placeShip(ship, coordinates) {
        this.ships.push({ ship, coordinates });
    }
    isValidPlacement(coordinates) {
        return !this.ships.some(existing =>
            existing.coordinates.some(coord =>
                coordinates.some(
                    newCoord => newCoord[0] === coord[0] && newCoord[1] === coord[1]
                )
            )
        );
    }

    generateCoordinates(length, direction, row, col) {
        const coordinates = [];
        for (let i = 0; i < length; i++) {
            if (direction === 'horizontal') {
                coordinates.push([row, col + i]);
            } else {
                coordinates.push([row + i, col]);
            }
        }
        return coordinates;
    }

    placeShipRandomly(length) {
        let placed = false;
        while (!placed) {
            const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            const coordinates = this.generateCoordinates(length, direction, row, col);

            if (direction === 'horizontal' && col + length > 10) continue;
            if (direction === 'vertical' && row + length > 10) continue;

            if (this.isValidPlacement(coordinates)) {
                const ship = new Ship(length);
                this.placeShip(ship, coordinates);
                placed = true;
            }
        }
    }

    placeAllShipsRandomly() {
        const shipLengths = [5, 4, 3, 2];
        for (let length of shipLengths) {
            this.placeShipRandomly(length);
        }
    }
    placeShipAt(row, col, length, direction = 'horizontal') {
        const coordinates = this.generateCoordinates(length, direction, row, col);
        if ((direction === 'horizontal' && col + length > 10) ||
            (direction === 'vertical' && row + length > 10)) {
            return false;
        }
        if (!this.isValidPlacement(coordinates)) {
            return false;
        }
        this.placeShip(new Ship(length), coordinates);
        return true;
    }

    receiveAttack([attackRow, attackCol]) {
        for (let placedShip of this.ships) {
            if (placedShip.coordinates.some(coord => coord[0] === attackRow && coord[1] === attackCol)) {
                const ship = placedShip.ship;
                ship.hit();
                this.hitAttacks.push([attackRow, attackCol]);
                return 'hit';
            }
        }
        this.missedAttacks.push([attackRow, attackCol]);
        return 'miss';
    }
    allShipsSunk() {
        if (this.ships.length === 0) return false;
        return this.ships.every(placedShip => placedShip.ship.isSunk());
    }
}