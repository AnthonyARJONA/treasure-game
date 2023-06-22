import * as fs from "fs";
import * as path from "path";
import {ObjectType, directionMap} from "./enum";
import {Adventurer} from "../object/adventurer.class";
import {Treasure} from "../object/treasure.class";
import {Mountain} from "../object/mountain.class";
import {Map} from "../object/map.class";

const extractNumbers = (params: string[]): number[] => {
  return params.filter((param) => !isNaN(Number(param))).map(Number);
};

const validateNumber = (value: unknown): number => {
  if (value === undefined || value === null || value === "") {
    throw new Error("The value cannot be empty");
  }

  if (isNaN(Number(value))) {
    throw new Error(`Invalid number: ${value}`);
  }

  return Number(value);
};

/**
 * Get file content from the file passed as parameter or from the default file (dataset.txt)
 * @param file
 * @returns string
 */
export const getFile = (file = "dataset.txt"): string => {
  try {
    return fs.readFileSync(path.join(__dirname, "..", file), "utf-8");
  } catch (error) {
    throw new Error("An error occurred while reading the file");
  }
};

/**
 * Parse the given string data and return a Map and an array of Adventurers
 * @param file
 * @returns { map: Map, adventurers: Adventurer[] }
 */
export const parseFile = (
  data: string
): { map: Map; adventurers: Adventurer[] } => {
  const lines = data.split("\n");
  let adventurerCount = 0;

  const map = {
    width: null,
    height: null,
    mountains: [],
    treasures: [],
  };
  const adventurers = [];

  for (const line of lines) {
    if (line.trim() === "" || line.trim().startsWith("#")) {
      continue;
    }

    const [type, ...params] = line.trim().split(" ");

    switch (type) {
      case ObjectType.Map:
        const [width, height] = extractNumbers(params);
        map["width"] = validateNumber(width);
        map["height"] = validateNumber(height);
        break;
      case ObjectType.Mountain:
        const [mountainHorizontalCoord, mountainVerticalCoord] =
          extractNumbers(params);
        map["mountains"].push(
          new Mountain({
            position: {
              horizontal: validateNumber(mountainHorizontalCoord),
              vertical: validateNumber(mountainVerticalCoord),
            },
          })
        );
        break;
      case ObjectType.Treasure:
        const [treasureHorizontalCoord, treasureVerticalCoord, quantity] =
          extractNumbers(params);
        map["treasures"].push(
          new Treasure({
            position: {
              horizontal: validateNumber(treasureHorizontalCoord),
              vertical: validateNumber(treasureVerticalCoord),
            },
            quantity: validateNumber(quantity),
          })
        );
        break;
      case ObjectType.Adventurer:
        const [
          adventurerName,
          adventurerHorizontalCoord,
          adventurerVerticalCoord,
          adventurerDirection,
          ...adventurerMovements
        ] = params.filter((param) => param !== "-");

        adventurers.push(
          new Adventurer({
            name: adventurerName,
            position: {
              horizontal: validateNumber(adventurerHorizontalCoord),
              vertical: validateNumber(adventurerVerticalCoord),
            },
            direction: directionMap[adventurerDirection],
            movements: adventurerMovements.join(""),
            priority: adventurerCount++,
          })
        );
        break;
    }
  }

  return {
    map: new Map({
      width: map["width"],
      height: map["height"],
      mountains: map["mountains"],
      treasures: map["treasures"],
    }),
    adventurers,
  };
};
