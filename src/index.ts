import Game from './game'

console.log("Welcome to the toy robot simulator!")

function helpInfo() {
    console.log("\nValid commands are:\n\nPLACE_ROBOT - Places a robot if none exist\nPLACE_WALL - Places an impassable wall\nREPORT - Print current location and facing of robot\nMOVE - Move robot forward one space\nLEFT/RIGHT - Turn the robot 90 degrees left or right\nHELP - Print these instructions again\nEXIT - Quit the program")
}

function checkInvalidDir(s: string) {
    if (s == "NORTH" || s == "WEST" || s == "EAST" || s == "SOUTH") {
        return false
    }
    return true
}

helpInfo()

const input: NodeRequire = require('prompt-sync')();
let command = ""
let g = new Game()

while (command != "EXIT") {
    command = input("Robot Input> ");
    switch(command) {
        case 'EXIT':
            console.log('Hope you enjoyed the game!');
            break;
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
            let success = false
            while (!success) {
                let row: number = input("(Enter between 1-5) Row: ")
                if (isNaN(row)) continue
                let col: number = input("(Enter between 1-5) Column: ")
                if (isNaN(col)) continue
                let facing: Direction = input("(NORTH, EAST, SOUTH or WEST) Facing: ")
                if (checkInvalidDir(facing)) continue
                success = g.PLACE_ROBOT(col,row,facing)
                if (!success) {
                    console.log("Please use valid inputs!")
                }
            }
            break;
        case 'PLACE_WALL':
            let success_wall = false
            while (!success_wall) {
                let row: number = input("(Enter between 1-5) Row: ")
                if (isNaN(row)) continue
                let col: number = input("(Enter between 1-5) Column: ")
                if (isNaN(col)) continue
                success_wall = g.PLACE_WALL(col,row)
                if (!success_wall) {
                    console.log("Please use valid inputs!")
                }
            }
            break;
        default:
            console.log("Please enter a valid command.");
        break;
    }
}