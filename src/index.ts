type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST"
type Position = [number, number]

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

        for(var i: number = 0; i < 5; i++) {
            this.tiles[i] = [];
            for(var j: number = 0; j < 5; j++) {
                this.tiles[i][j] = new Tile(false);
            }
        }
    }

    private check_invalid(ROW: number, COL: number) {
        if (ROW < 1 || ROW > 5 || COL < 1 || COL > 5) {
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

    REPORT() {
        this.robot != null ? console.log(`${this.robot.position},${this.robot.facing}`) : console.log("No Robot Placed!")
    }
}

let board = new Board()
// board.PLACE_ROBOT(2,3,"EAST")
board.REPORT()
board.PLACE_WALL(2,2)
console.log(board.tiles)