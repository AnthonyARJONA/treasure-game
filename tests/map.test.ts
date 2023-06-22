import { Game } from "./../src/object/game.class";
import { Adventurer } from "../src/object/adventurer.class";
import { Mountain } from "../src/object/mountain.class";
import { Treasure } from "../src/object/treasure.class";
import { Direction } from "../src/utils";
import { Map } from "../src/object/map.class";
import { Plain } from "../src/object/plain.class";

describe("Map", () => {
  const map = new Map({
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
  });

  it("should have a width", () => {
    expect(map.getWidth()).toBe(3);
  });
  
  it("should have a height", () => {
    expect(map.getHeight()).toBe(4);
  });

  it("should have mountains", () => {
    expect(map.getMountains()).toStrictEqual([
      new Mountain({
        position: {
          horizontal: 1,
          vertical: 0,
        },
      }),
    ]);
  });

  it("should have treasures", () => {
    expect(map.getTreasures()).toStrictEqual([
      new Treasure({
        position: {
          horizontal: 0,
          vertical: 3,
        },
        quantity: 2,
      }),
    ]);
  })

  it("should set a width", () => {
    map.setWidth(5);
    expect(map.getWidth()).toBe(5);
  });

  it("should set a height", () => {
    map.setHeight(6);
    expect(map.getHeight()).toBe(6);
  });

  it("should set mountains", () => {
    map.setMountains([
      new Mountain({
        position: {
          horizontal: 0,
          vertical: 1,
        },
      }),
    ]);
    expect(map.getMountains()).toStrictEqual([
      new Mountain({
        position: {
          horizontal: 0,
          vertical: 1,
        },
      }),
    ]);
  });

  it("should set treasures", () => {
    map.setTreasures([
      new Treasure({
        position: {
          horizontal: 1,
          vertical: 1,
        },
        quantity: 3,
      }),
    ]);
    expect(map.getTreasures()).toStrictEqual([
      new Treasure({
        position: {
          horizontal: 1,
          vertical: 1,
        },
        quantity: 3,
      }),
    ]);
  });

  it("should get a tile", () => {
    expect(map.getTiles()[0][0] instanceof Plain).toBe(true);
    expect(map.getTiles()[0][1] instanceof Mountain).toBe(true);
  });
});
