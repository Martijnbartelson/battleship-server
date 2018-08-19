"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseGrid = [
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
];
const ships = [
    { name: 'v5', length: 5 },
    { name: 's4', length: 4 },
    { name: 'k3', length: 3 },
    { name: 'o3', length: 3 },
    { name: 'm2', length: 2 }
];
const randomNumber = () => Math.floor(Math.random() * 12);
const randomDirection = () => Math.random() > 0.5 ? 'down' : 'right';
const randomCoordinate = (ship) => {
    let coordinate = [randomNumber(), randomNumber()];
    while (coordinate[0] > (12 - ship.length) && coordinate[1] > (12 - ship.length)) {
        coordinate = [randomNumber(), randomNumber()];
    }
    return coordinate;
};
const checkCoordinate = (grid, coordinate, symbol) => grid[coordinate[0]][coordinate[1]] === symbol;
const checkCoordinates = (coordinate, length, direction, symbol, grid, boolean = true) => {
    if (length === 0 || boolean === false) {
        return boolean;
    }
    if (direction === 'down') {
        boolean = checkCoordinate(grid, coordinate, symbol);
        coordinate[0] += 1;
    }
    if (direction === 'right') {
        boolean = checkCoordinate(grid, coordinate, symbol);
        coordinate[1] += 1;
    }
    return checkCoordinates(coordinate, length -= 1, direction, symbol, grid, boolean);
};
const changeCoordinate = (grid, coordinate, symbol) => {
    grid[coordinate[0]][coordinate[1]] = symbol;
    return grid;
};
const changeCoordinates = (coordinate, length, direction, symbol, grid) => {
    if (length === 0) {
        return grid;
    }
    if (direction === 'down') {
        grid = changeCoordinate(grid, coordinate, symbol);
        coordinate[0] += 1;
    }
    if (direction === 'right') {
        grid = changeCoordinate(grid, coordinate, symbol);
        coordinate[1] += 1;
    }
    return changeCoordinates(coordinate, length -= 1, direction, symbol, grid);
};
const placeShipOnGrid = (grid, ship, shipIsPlaced = false) => {
    if (shipIsPlaced) {
        return grid;
    }
    let startCoordinate = randomCoordinate(ship);
    let direction = randomDirection();
    if (startCoordinate[0] > (12 - ship.length)) {
        direction = 'right';
    }
    if (startCoordinate[1] > (12 - ship.length)) {
        direction = 'down';
    }
    if (checkCoordinates([...startCoordinate], ship.length, direction, null, grid)) {
        grid = changeCoordinates(startCoordinate, ship.length, direction, ship.name, grid);
        shipIsPlaced = true;
    }
    return placeShipOnGrid(grid, ship, shipIsPlaced);
};
exports.getShipsGrid = () => {
    let grid = null;
    grid = JSON.parse(JSON.stringify(exports.baseGrid));
    ships.forEach(ship => {
        grid = placeShipOnGrid(grid, ship);
    });
    return grid;
};
exports.makeUserMove = (game, coordinate) => {
    if (!checkCoordinate(game.shipsGridComputer, coordinate, null)) {
        game.shotsGridUser = changeCoordinate(game.shotsGridUser, coordinate, 'xx');
        game.feedbackUser = 'Raak!';
        game.scoreUser += 1;
    }
    else {
        game.shotsGridUser = changeCoordinate(game.shotsGridUser, coordinate, 'oo');
        game.feedbackUser = 'Mis!';
    }
    game.turn += 1;
    return game;
};
exports.makeComputerMove = (game) => {
    let coordinate = [randomNumber(), randomNumber()];
    while (checkCoordinate(game.shipsGridUser, coordinate, 'xx') || checkCoordinate(game.shipsGridUser, coordinate, 'oo')) {
        coordinate = [randomNumber(), randomNumber()];
    }
    if (!checkCoordinate(game.shipsGridUser, coordinate, null)) {
        game.shipsGridUser = changeCoordinate(game.shipsGridUser, coordinate, 'xx');
        game.feedbackComputer = 'De computer schoot raak!';
        game.scoreComputer += 1;
    }
    else {
        game.shipsGridUser = changeCoordinate(game.shipsGridUser, coordinate, 'oo');
        game.feedbackComputer = 'De computer schoot mis!';
    }
    return game;
};
exports.checkFinished = (game) => {
    if (game.scoreUser === 17) {
        game.status = 'finished';
        game.winner = 'user';
    }
    if (game.scoreComputer === 17) {
        game.status = 'finished';
        game.winner = 'computer';
    }
    return game;
};
//# sourceMappingURL=game.js.map