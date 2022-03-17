import Game from './game'

let game = new Game

test("Check board size is correct", () => {
    expect(game.tiles.length).toBe(5);
})

test("Check board is empty on initialization", () => {
    expect(game.robot).toBe(null);
})

test("Check robot is not placed if invalid coordinates are given", () => {
    game = new Game
    game.PLACE_ROBOT(6,6,"WEST");
    expect(game.robot).toBe(null);
})

test("Check robot is placed correctly given instructions", () => {
    game = new Game
    game.PLACE_ROBOT(3,4,"NORTH");
    expect(game.robot?.position).toStrictEqual([4,3]);
    expect(game.robot?.facing).toBe("NORTH");
})

test("Check robot is moved correctly if already initialized", () => {
    game = new Game
    game.PLACE_ROBOT(3,4,"NORTH");
    game.PLACE_ROBOT(2,1,"SOUTH");
    expect(game.robot?.position).toStrictEqual([1,2]);
    expect(game.robot?.facing).toBe("SOUTH");
})

test("Check robot can not be initialized on a wall", () => {
    game = new Game
    game.PLACE_WALL(2,3);
    game.PLACE_ROBOT(2,3,"SOUTH");
    expect(game.robot).toBe(null);
})

test("Check wall is placed correctly", () => {
    game = new Game
    game.PLACE_WALL(2,3);
    expect(game.tiles[2][1].is_wall).toBe(true)
})

test("Check wall is kept if place wall is invoked twice", () => {
    game = new Game
    game.PLACE_WALL(2,3);
    game.PLACE_WALL(2,3);
    expect(game.tiles[2][1].is_wall).toBe(true)
})

test("Check wall is not placed if robot occupies space", () => {
    game = new Game
    game.PLACE_ROBOT(2,3,"SOUTH");
    game.PLACE_WALL(2,3);
    expect(game.tiles[2][1].is_wall).toBe(false)
})

test("Check report generates correct statement with no robot", () => {
    game = new Game
    const consoleSpy = jest.spyOn(console, 'log');
    game.REPORT()
    expect(consoleSpy).toHaveBeenCalledWith("No Robot Placed!")
})

test("Check report generates correct statement", () => {
    game = new Game
    game.PLACE_ROBOT(2,3,"SOUTH");
    const consoleSpy = jest.spyOn(console, 'log');
    game.REPORT()
    expect(consoleSpy).toHaveBeenCalledWith("2,3,SOUTH")
})

test("Check robot left turn", () => {
    game = new Game
    game.PLACE_ROBOT(2,3,"SOUTH");
    game.LEFT()
    expect(game.robot?.facing).toBe("EAST")
    game.LEFT()
    expect(game.robot?.facing).toBe("NORTH")
    game.LEFT()
    expect(game.robot?.facing).toBe("WEST")
})

test("Check robot right turn", () => {
    game = new Game
    game.PLACE_ROBOT(2,3,"SOUTH");
    game.RIGHT()
    expect(game.robot?.facing).toBe("WEST")
    game.RIGHT()
    expect(game.robot?.facing).toBe("NORTH")
    game.RIGHT()
    expect(game.robot?.facing).toBe("EAST")
})

test("Check robot move command", () => {
    game = new Game
    game.PLACE_ROBOT(2,3,"SOUTH");
    game.MOVE()
    expect(game.robot?.position).toStrictEqual([2,2]);
})

test("Check robot move command with wall", () => {
    game = new Game
    game.PLACE_ROBOT(2,3,"SOUTH");
    game.PLACE_WALL(2,2);
    game.MOVE()
    expect(game.robot?.position).toStrictEqual([3,2]);
})

test("Check robot move warp behaviour", () => {
    game = new Game
    game.PLACE_ROBOT(2,1,"SOUTH");
    game.MOVE()
    expect(game.robot?.position).toStrictEqual([5,2]);
})

test("Given Test Case 1", () => {
    game = new Game
    game.PLACE_ROBOT(3,3,"NORTH");
    game.PLACE_WALL(3,5);
    game.MOVE();
    game.MOVE();
    game.RIGHT();
    game.MOVE();
    game.MOVE();
    game.MOVE();
    const consoleSpy = jest.spyOn(console, 'log');
    game.REPORT()
    expect(consoleSpy).toHaveBeenCalledWith("1,4,EAST")
})

test("Given Test Case 2", () => {
    game = new Game
    game.PLACE_ROBOT(2,2,"WEST");
    game.PLACE_WALL(1,1);
    game.PLACE_WALL(2,2);
    game.PLACE_WALL(1,3);
    game.LEFT();
    game.LEFT();
    game.MOVE();
    const consoleSpy = jest.spyOn(console, 'log');
    game.REPORT()
    expect(consoleSpy).toHaveBeenCalledWith("3,2,EAST")
})