type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST"
type Position = [number, number]

const GRIDSIZE = 5

// Component class for each tile on board, can set tile to have a wall
class Tile {
    is_wall: boolean;

    constructor(wall: boolean) {
        this.is_wall = wall;
    }

    set_as_wall() {
        this.is_wall = !this.is_wall
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
class Board {
    tiles: Tile[][]
    robot: Robot | null

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

    private check_invalid(ROW: number, COL: number) {
        if (ROW < 1 || ROW > GRIDSIZE || COL < 1 || COL > GRIDSIZE) {
            return true
        }
    }

    PLACE_ROBOT(ROW: number, COL: number, FACING: Direction) {

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

    PLACE_WALL(ROW: number, COL: number) {
        if (this.robot?.position[0] === ROW && this.robot?.position[1] === ROW) return false
        this.tiles[ROW-1][COL-1]["is_wall"] = true
    }

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

        console.log(new_position)
        if (this.tiles[new_position[0]-1][new_position[1]-1]["is_wall"]) return false

        this.robot.position = new_position
    }

    REPORT() {
        this.robot != null ? console.log(`${this.robot.position},${this.robot.facing}`) : console.log("No Robot Placed!")
    }
}

let board = new Board()
board.PLACE_ROBOT(2,3,"WEST")
board.PLACE_WALL(2,4)
board.REPORT()
board.MOVE()
board.REPORT()
board.MOVE()
board.REPORT()
board.MOVE()
board.REPORT()
board.MOVE()
board.REPORT()
board.MOVE()
board.REPORT()
console.log(board.tiles)
console.log(0%5)