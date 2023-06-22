import {Adventurer} from "./adventurer.class";
import {Mountain} from "./mountain.class";
import {Plain} from "./plain.class";
import {Treasure} from "./treasure.class";

export type TileType = Plain | Mountain | Treasure | Adventurer;

export class Map {
  private width: number;
  private height: number;
  private treasures: Treasure[];
  private mountains: Mountain[];
  private plains: Plain[];
  private tiles: TileType[][];

  constructor({
    width,
    height,
    treasures = [],
    mountains = [],
  }: {
    width: number;
    height: number;
    treasures?: Treasure[];
    mountains?: Mountain[];
  }) {
    this.setWidth(width);
    this.setHeight(height);
    this.setTreasures(treasures);
    this.setMountains(mountains);

    this.initialize();
  }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): this {
    if (Number.isInteger(width) === false) {
      throw new Error("The width must be an integer");
    }

    if (width < 0) {
      throw new Error("The width cannot be negative");
    }

    this.width = width;
    return this;
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(height: number): this {
    if (Number.isInteger(height) === false) {
      throw new Error("The height must be an integer");
    }

    if (height < 0) {
      throw new Error("The height cannot be negative");
    }

    this.height = height;
    return this;
  }

  public getTreasures(): Treasure[] {
    return this.treasures;
  }

  public setTreasures(treasures: Treasure[]): this {
    if (Array.isArray(treasures) === false) {
      throw new Error("The treasures must be an array");
    }

    treasures.forEach((treasure) => {
      if (treasure instanceof Treasure === false) {
        throw new Error("The treasure must be an instance of Tresure");
      }

      if (treasure.getPosition().getHorizontal() > this.getWidth()) {
        throw new Error(
          "The treasure horizontal position cannot be greater than the map width"
        );
      }

      if (treasure.getPosition().getVertical() > this.getHeight()) {
        throw new Error(
          "The treasure vertical position cannot be greater than the map height"
        );
      }
    });

    this.treasures = treasures;
    return this;
  }

  public getMountains(): Mountain[] {
    return this.mountains;
  }

  public setMountains(mountains: Mountain[]): this {
    if (Array.isArray(mountains) === false) {
      throw new Error("The mountains must be an array");
    }

    mountains.forEach((mountain) => {
      if (mountain instanceof Mountain === false) {
        throw new Error("The mountain must be an instance of Mountain");
      }

      if (
        mountain.getPosition().getHorizontal() > this.getWidth() &&
        mountain.getPosition().getHorizontal() < 0
      ) {
        throw new Error(
          "The mountain horizontal position cannot be greater than the map width"
        );
      }

      if (
        mountain.getPosition().getVertical() > this.getHeight() &&
        mountain.getPosition().getVertical() < 0
      ) {
        throw new Error(
          "The mountain vertical position cannot be greater than the map height"
        );
      }
    });

    this.mountains = mountains;
    return this;
  }

  public getTiles(): TileType[][] {
    return this.tiles;
  }

  private addTreasuresToTiles(): this {
    this.treasures.forEach((treasure) => {
      const {horizontal, vertical} = treasure.getPosition().getPosition();
      this.tiles[vertical][horizontal] = treasure;
    });

    return this;
  }

  private addMountainsToTiles(): this {
    this.mountains.forEach((mountain) => {
      const {horizontal, vertical} = mountain.getPosition().getPosition();
      this.tiles[vertical][horizontal] = mountain;
    });

    return this;
  }

  private initialize(): this {
    this.tiles = Array.from({length: this.height}, (_, verticalIndex) =>
      Array.from(
        {length: this.width},
        (_, horizontalIndex) =>
          new Plain({
            position: {
              horizontal: horizontalIndex,
              vertical: verticalIndex,
            },
          })
      )
    );

    this.addTreasuresToTiles();
    this.addMountainsToTiles();

    return this;
  }
}
