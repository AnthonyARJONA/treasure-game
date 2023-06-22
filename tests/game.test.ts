import { Game } from "./../src/object/game.class";
import { Adventurer } from "../src/object/adventurer.class";
import { Mountain } from "../src/object/mountain.class";
import { Treasure } from "../src/object/treasure.class";
import { Direction } from "../src/utils";
import { Map } from "../src/object/map.class";

describe("Game", () => {
  const game = new Game({
    map: new Map({
      width: 3,
      height: 4,
      mountains: [
        new Mountain({
          position: {
            horizontal: 1,
            vertical: 0,
          },
        }),
      ],
      treasures: [
        new Treasure({
          position: {
            horizontal: 0,
            vertical: 3,
          },
          quantity: 2,
        }),
      ],
    }),
    adventurers: [
      new Adventurer({
        name: "Lara",
        position: {
          horizontal: 1,
          vertical: 1,
        },
        direction: Direction.North,
        movements: "AADADAGGA",
      }),
    ],
  });

  it("should have a map instance", () => {
    expect(game.getMap()).toBeDefined();
  });

  it("should have an adventurers array", () => {
    expect(game.getAdventurers()).toBeDefined();
  });

  it("should have a currentStep", () => {
    expect(game.getCurrentStep()).toBe(0);
  });

  it("should have a step", () => {
    expect(game.getSteps()).toBe(9);
  });
});
