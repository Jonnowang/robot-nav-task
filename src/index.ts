type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST"
type Position = [number, number]

const GRIDSIZE = 5

// Component class for each tile on board, can set tile to have a wall
class Tile {
    is_wall: boolean;

    constructor(wall: boolean) {
        this.is_wall = wall;
    }
}

// Component class for robot, has intrinsic orientation and position
class Robot {
    facing: Direction;
    position: Position;

    constructor(direction: Direction, position: Position) {
        this.facing = direction;
        this.position = position;
    }
}

// Main toy robot board class that contains tiles and the robot
class Game {
    tiles: Tile[][]
    robot: Robot | null

    // Generate 5x5 Grid of possible tiles all initialised with no wall
    constructor() {
        this.tiles = []
        this.robot = null

        for(var i: number = 0; i < GRIDSIZE; i++) {
            this.tiles[i] = [];
            for(var j: number = 0; j < GRIDSIZE; j++) {
                this.tiles[i][j] = new Tile(false);
            }
        }
    }

    // Internal function to check if coordinates are valid given grid size
    private check_invalid(COL: number, ROW: number) {
        if (ROW < 1 || ROW > GRIDSIZE || COL < 1 || COL > GRIDSIZE) {
            return true
        }
    }

    PLACE_ROBOT(COL: number, ROW: number, FACING: Direction) {

        // If out of bounds or occupied by wall ignore command
        if (this.check_invalid(ROW,COL)) return false
        if (this.tiles[ROW-1][COL-1]["is_wall"]) return false

        // If this is the first placement of the robot create a new Robot class on the board
        if (this.robot === null) {
            this.robot = new Robot(FACING,[ROW,COL]);
        }
        else {
            this.robot.position = [ROW,COL];
        }
    }

    // Place a wall if not occupied and is a valid coordinate 
    PLACE_WALL(COL: number, ROW: number) {
        if (this.robot?.position[0] === ROW && this.robot?.position[1] === COL) return false
        if (this.check_invalid(ROW,COL)) return false
        this.tiles[ROW-1][COL-1]["is_wall"] = true
    }

    // Function to move the robot
    MOVE() {
        if (this.robot == null) return false

        let new_position = this.robot.position
        if (this.robot.facing == "NORTH") {
            new_position = [(new_position[0]%GRIDSIZE)+1,new_position[1]]
        }
        else if (this.robot.facing == "EAST") {
            new_position = [new_position[0],(new_position[1]%GRIDSIZE)+1]
        }
        else if (this.robot.facing == "SOUTH") {
            new_position = [new_position[0]-1 === 0 ? 5 : new_position[0]-1,new_position[1]]
        }
        else if (this.robot.facing == "WEST") {
            new_position = [new_position[0], new_position[1]-1 === 0 ? 5 : new_position[1]-1]
        }

        // If new position is wall ignore movement
        if (this.tiles[new_position[0]-1][new_position[1]-1]["is_wall"]) return false

        this.robot.position = new_position
    }

    // Turn left
    LEFT() {
        if (this.robot == null) return false

        if (this.robot.facing == "NORTH") {
            this.robot.facing = "WEST"
        }
        else if (this.robot.facing == "EAST") {
            this.robot.facing = "NORTH"
        }
        else if (this.robot.facing == "SOUTH") {
            this.robot.facing = "EAST"
        }
        else if (this.robot.facing == "WEST") {
            this.robot.facing = "SOUTH"
        }
    }

    // Turn right
    RIGHT() {
        if (this.robot == null) return false
        
        if (this.robot.facing == "NORTH") {
            this.robot.facing = "EAST"
        }
        else if (this.robot.facing == "EAST") {
            this.robot.facing = "SOUTH"
        }
        else if (this.robot.facing == "SOUTH") {
            this.robot.facing = "WEST"
        }
        else if (this.robot.facing == "WEST") {
            this.robot.facing = "NORTH"
        }
    }

    // Report robot position and orientation if robot has been placed
    REPORT() {
        this.robot != null ? console.log(`${this.robot.position[1]},${this.robot.position[0]},${this.robot.facing}`) : console.log("No Robot Placed!")
    }
}

let g = new Game()
g.PLACE_ROBOT(3,3,"NORTH")
g.PLACE_WALL(3,5)
g.MOVE()
g.MOVE()
g.RIGHT()
g.MOVE()
g.MOVE()
g.MOVE()
g.REPORT()