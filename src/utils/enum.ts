export enum Direction {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
}

export enum DirectionName {
  N = "North",
  S = "South",
  E = "East",
  W = "West",
}

export const directionMap: { [key: string]: Direction } = {
  N: Direction.North,
  S: Direction.South,
  E: Direction.East,
  O: Direction.West,
};

export enum ObjectType {
  Map = "C",
  Mountain = "M",
  Treasure = "T",
  Adventurer = "A",
}

export enum Movement {
  Left = "G",
  Right = "D",
  Forward = "A",
}
