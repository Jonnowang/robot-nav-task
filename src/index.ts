import Game from './game'

console.log("Welcome to the toy robot simulator!")

// Print command information
function helpInfo() {
    console.log("\nValid commands are:\n\nPLACE_ROBOT - Places a robot if none exist\nPLACE_WALL - Places an impassable wall\nREPORT - Print current location and facing of robot\nMOVE - Move robot forward one space\nLEFT/RIGHT - Turn the robot 90 degrees left or right\nHELP - Print these instructions again\nEXIT - Quit the program")
}

function checkInvalidDir(s: string) {
    if (s == "NORTH" || s == "WEST" || s == "EAST" || s == "SOUTH") {
        return false
    }
    return true
}

// Function to place robot and check inputs are valid
function placeRobot(g: Game) {
    let success = false
    let row: number = input("(Enter between 1-5) Row: ")
    if (isNaN(row)) placeRobot(g)
    let col: number = input("(Enter between 1-5) Column: ")
    if (isNaN(col)) placeRobot(g)
    let facing: Direction = input("(NORTH, EAST, SOUTH or WEST) Facing: ")
    if (checkInvalidDir(facing)) placeRobot(g)
    success = g.PLACE_ROBOT(row,col,facing)
    if (!success) {
        console.log("Please use valid inputs!")
        placeRobot(g)
    }
}

// Function to place a wall
function placeWall(g: Game) {
    let success_wall = false
    let row: number = input("(Enter between 1-5) Row: ")
    if (isNaN(row)) placeWall(g)
    let col: number = input("(Enter between 1-5) Column: ")
    if (isNaN(col)) placeWall(g)
    success_wall = g.PLACE_WALL(row,col)
    if (!success_wall) {
        console.log("Please use valid inputs!")
        placeWall(g)
    }
}

helpInfo()

const input: NodeRequire = require('prompt-sync')();
let command = ""
let g = new Game()

// Execute commands based on user input
setInterval(() => {
    command = input("Robot Input> ");
    switch(command) {
        case 'EXIT':
            console.log('Hope you enjoyed the game!');
            process.exit();
        case 'HELP':
            helpInfo();
            break;
        case 'MOVE':
            g.MOVE();
            break;
        case 'RIGHT':
            g.RIGHT();
            break;
        case 'LEFT':
            g.LEFT();
            break;
        case 'REPORT':
            g.REPORT();
            break;
        case 'PLACE_ROBOT':
            placeRobot(g);
            break;
        case 'PLACE_WALL':
            placeWall(g);
            break;
        default:
            console.log("Please enter a valid command.");
        break;
    }
}, 0)