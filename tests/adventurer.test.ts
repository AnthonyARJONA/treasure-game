import { Direction } from "../src/utils/enum";
import { Adventurer } from "../src/object/adventurer.class";

describe("Adventurer", () => {
  const adventurer = new Adventurer({
    name: "Lara",
    position: { horizontal: 1, vertical: 1 },
    direction: Direction.South,
    movements: "AADADAGGA",
  });

  it("should have a name", () => {
    expect(adventurer.getName()).toBe("Lara");
  });

  it("should have a position", () => {
    expect(adventurer.getPosition()).toEqual({
      horizontal: 1,
      vertical: 1,
    });
  });

  it("should have a direction", () => {
    expect(adventurer.getDirection()).toBe(Direction.South);
  });

  it("should have movements", () => {
    expect(adventurer.getMovements()).toStrictEqual([
      "A",
      "A",
      "D",
      "A",
      "D",
      "A",
      "G",
      "G",
      "A",
    ]);
  });

  it("should have a treasure", () => {
    expect(adventurer.getTreasures()).toBe(0);
  });

  it("should have a priority", () => {
    expect(adventurer.getPriority()).toBe(0);
  });

  it("should set a name", () => {
    adventurer.setName("araL");
    expect(adventurer.getName()).toBe("araL");
  });

  it("should set a position", () => {
    adventurer.setPosition({ horizontal: 2, vertical: 2 });
    expect(adventurer.getPosition()).toEqual({
      horizontal: 2,
      vertical: 2,
    });
  });

  it("should set a direction", () => {
    adventurer.setDirection(Direction.North);
    expect(adventurer.getDirection()).toBe(Direction.North);
  });

  it("should set movements", () => {
    adventurer.setMovements("GAD");
    expect(adventurer.getMovements()).toStrictEqual(["G", "A", "D"]);
  });

  it("should set a treasure", () => {
    adventurer.setTreasures(1);
    expect(adventurer.getTreasures()).toBe(1);
  });

  it("should add a treasure", () => {
    adventurer.addTreasures();
    expect(adventurer.getTreasures()).toBe(2);
    expect(adventurer.addTreasures()).toBe(adventurer);
  });

  it("should set a priority", () => {
    adventurer.setPriority(1);
    expect(adventurer.getPriority()).toBe(1);
  });

  it("should throw an error if the name is empty", () => {
    expect(() => adventurer.setName("")).toThrow("The name cannot be empty");
  });

  it("should throw an error if the horizontal position is not valid", () => {
    expect(() =>
      adventurer.setPosition({ horizontal: -1, vertical: 0 })
    ).toThrow("The horizontal position cannot be negative");
  });

  it("should throw an error if the vertical position is not valid", () => {
    expect(() =>
      adventurer.setPosition({ horizontal: 0, vertical: -1 })
    ).toThrow("The vertical position cannot be negative");
  });

  it("should throw an error if the direction is not valid", () => {
    // @ts-ignore
    expect(() => adventurer.setDirection("")).toThrow(
      "The direction is not valid"
    );
  });

  it("should throw an error if the movements are empty", () => {
    expect(() => adventurer.setMovements("")).toThrow(
      "The movements cannot be empty"
    );
  });

  it("should throw an error if the movements are not valid", () => {
    expect(() => adventurer.setMovements("GADZ")).toThrow(
      "Invalid movement: Z. Only G, D, or A are allowed."
    );
  });

  it("should throw an error if the treasure quantity is negative", () => {
    expect(() => adventurer.setTreasures(-1)).toThrow(
      "The quantity of treasures cannot be negative"
    );
  });

  it("should throw an error if priority is negative", () => {
    expect(() => adventurer.setPriority(-1)).toThrow(
      "The priority cannot be negative"
    );
  })

  it("should throw an error if priority is empty", () => {
    // @ts-ignore
    expect(() => adventurer.setPriority("")).toThrow(
      "The priority must be an integer"
    );
  });

  it("should throw an error if priority is a float", () => {
    expect(() => adventurer.setPriority(1.5)).toThrow(
      "The priority must be an integer"
    );
  });

  // getForwardPosition
  it("should return the forward position", () => {
    const position = adventurer.getPosition();

    expect(adventurer.getForwardPosition()).toEqual({
      horizontal: position.getHorizontal(),
      vertical: position.getVertical() - 1,
    });

    adventurer.setDirection(Direction.East);
    expect(adventurer.getForwardPosition()).toEqual({
      horizontal: position.getHorizontal() + 1,
      vertical: position.getVertical(),
    });

    adventurer.setDirection(Direction.South);
    expect(adventurer.getForwardPosition()).toEqual({
      horizontal: position.getHorizontal(),
      vertical: position.getVertical() + 1,
    });

    adventurer.setDirection(Direction.West);
    expect(adventurer.getForwardPosition()).toEqual({
      horizontal: position.getHorizontal() - 1,
      vertical: position.getVertical(),
    });
  });

  it("should return the move forward", () => {
    adventurer.setDirection(Direction.North);
    adventurer.moveForward();

    expect(adventurer.getPosition()).toEqual({
      horizontal: 2,
      vertical: 1,
    });

    adventurer.setDirection(Direction.East);
    adventurer.moveForward();

    expect(adventurer.getPosition()).toEqual({
      horizontal: 3,
      vertical: 1,
    });

    adventurer.setDirection(Direction.South);
    adventurer.moveForward();

    expect(adventurer.getPosition()).toEqual({
      horizontal: 3,
      vertical: 2,
    });

    adventurer.setDirection(Direction.West);
    adventurer.moveForward();

    expect(adventurer.getPosition()).toEqual({
      horizontal: 2,
      vertical: 2,
    });
  });

  it("should return the turn left", () => {
    const position = adventurer.getPosition();
    adventurer.setDirection(Direction.North);

    adventurer.turnLeft();

    expect(adventurer.getDirection()).toBe(Direction.West);
    expect(adventurer.getPosition()).toEqual(position);

    adventurer.turnLeft();

    expect(adventurer.getDirection()).toBe(Direction.South);
    expect(adventurer.getPosition()).toEqual(position);

    adventurer.turnLeft();

    expect(adventurer.getDirection()).toBe(Direction.East);
    expect(adventurer.getPosition()).toEqual(position);

    adventurer.turnLeft();

    expect(adventurer.getDirection()).toBe(Direction.North);
    expect(adventurer.getPosition()).toEqual(position);
  });

  it("should return the turn right", () => {
    const position = adventurer.getPosition();
    adventurer.setDirection(Direction.North);

    adventurer.turnRight();

    expect(adventurer.getDirection()).toBe(Direction.East);
    expect(adventurer.getPosition()).toEqual(position);

    adventurer.turnRight();

    expect(adventurer.getDirection()).toBe(Direction.South);
    expect(adventurer.getPosition()).toEqual(position);

    adventurer.turnRight();

    expect(adventurer.getDirection()).toBe(Direction.West);
    expect(adventurer.getPosition()).toEqual(position);

    adventurer.turnRight();

    expect(adventurer.getDirection()).toBe(Direction.North);
    expect(adventurer.getPosition()).toEqual(position);
  });
});
