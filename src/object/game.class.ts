import {DirectionName, Movement} from "../utils";
import {Adventurer} from "./adventurer.class";
import {Map} from "./map.class";
import {Mountain} from "./mountain.class";
import {Plain} from "./plain.class";
import {Position} from "./position.class";
import {Treasure} from "./treasure.class";

export class Game {
  private steps: number;
  private currentStep = 0;

  private map: Map;
  private adventurers: Adventurer[];

  constructor({map, adventurers}: { map: Map; adventurers: Adventurer[] }) {
    this.setMap(map);
    this.setAdventurers(adventurers);

    /**
     * The number of steps is the number of movements of the adventurer with the most movements
     */
    this.steps = Math.max(
      ...this.getAdventurers().map((adventurer) => {
        return adventurer.getMovements().length;
      })
    );
  }

  private setMap(map: Map): this {
    if (!(map instanceof Map)) {
      throw new Error("The map must be an instance of Map");
    }

    this.map = map;
    return this;
  }

  public getMap(): Map {
    return this.map;
  }

  private setAdventurers(adventurers: Adventurer[]): this {
    if (Array.isArray(adventurers) === false) {
      throw new Error("The adventurers must be an array");
    }

    adventurers.forEach((adventurer) => {
      if (adventurer instanceof Adventurer === false) {
        throw new Error("The adventurer must be an instance of Adventurer");
      }

      const {horizontal, vertical} = adventurer.getPosition().getPosition();

      if (
        this.getMap().getTiles()[vertical][horizontal] instanceof Plain ===
        false
      ) {
        throw new Error(
          "The adventurer cannot be placed on a mountain, a treasure or another adventurer"
        );
      }
    });

    this.adventurers = adventurers;
    return this;
  }

  public getAdventurers(): Adventurer[] {
    return this.adventurers;
  }

  public getSteps(): number {
    return this.steps;
  }

  public getCurrentStep(): number {
    return this.currentStep;
  }

  private isPositionFree({position}: { position: Position }): boolean {
    const {horizontal, vertical} = position.getPosition();

    if (
      this.getMap().getHeight() < vertical &&
      vertical < 0 &&
      this.getMap().getWidth() < horizontal &&
      horizontal < 0 &&
      this.getMap().getTiles()[vertical][horizontal] instanceof Mountain
    ) {
      return false;
    }

    return true;
  }

  private isPositionFreeOfAdventurers({position}: { position: Position }) {
    return this.getAdventurers().every((adventurer) => {
      if (
        adventurer.getPosition().getHorizontal() === position.getHorizontal() &&
        adventurer.getPosition().getVertical() === position.getVertical()
      ) {
        return false;
      }

      return true;
    });
  }

  private isAdventurerPositionInMap({
    adventurer,
  }: {
    adventurer: Adventurer;
  }) {
    const {horizontal, vertical} = adventurer.getPosition().getPosition();

    if (
      this.getMap().getHeight() < vertical &&
      vertical < 0 &&
      this.getMap().getWidth() < horizontal &&
      horizontal < 0
    ) {
      return false;
    }

    return true;
  }

  public play(): this {
    while (this.currentStep < this.steps) {
      this.getAdventurers().forEach((adventurer) => {
        const movement = adventurer.getMovements()[this.currentStep];

        switch (movement) {
          case Movement.Forward:
            this.handleForwardMovement(adventurer);
            break;
          case Movement.Left:
            adventurer.turnLeft();
            break;
          case Movement.Right:
            adventurer.turnRight();
            break;
          case undefined:
            break;
          default:
            throw new Error("The movement is not valid");
        }

        const currentTileName = this.getCurrentTileName(adventurer);

        console.log(
          `${adventurer.getName()} is now at position ${adventurer
            .getPosition()
            .getHorizontal()},${adventurer
            .getPosition()
            .getVertical()} facing ${
            DirectionName[adventurer.getDirection()]
          }, actually on ${currentTileName}`
        );
      });

      this.currentStep++;

      if (this.currentStep === this.steps) {
        this.printSummaryMessage();
      }
    }

    return this;
  }

  private handleForwardMovement(adventurer: Adventurer): void {
    const nextPosition = adventurer.getForwardPosition();

    if (this.isAdventurerPositionInMap({adventurer}) === false) {
      console.log(
        `${adventurer.getName()} cannot move forward because the position is not in the map`
      );
      return;
    } else if (
      this.isPositionFree({position: nextPosition}) &&
      this.isPositionFreeOfAdventurers({position: nextPosition})
    ) {
      adventurer.moveForward();

      const currentTile =
        this.getMap().getTiles()[adventurer.getPosition().getVertical()][
          adventurer.getPosition().getHorizontal()
        ];
      if (currentTile instanceof Treasure) {
        const treasure = currentTile as Treasure;

        if (treasure.getQuantity() > 0) {
          treasure.setQuantity(treasure.getQuantity() - 1);
          adventurer.setTreasures(adventurer.getTreasures() + 1);

          if (treasure.getQuantity() === 0) {
            this.getMap().getTiles()[adventurer.getPosition().getVertical()][
              adventurer.getPosition().getHorizontal()
            ] = new Plain({
              position: {
                horizontal: adventurer.getPosition().getHorizontal(),
                vertical: adventurer.getPosition().getVertical(),
              },
            });
          }

          console.log(
            `${adventurer.getName()} found a treasure, he now has ${adventurer.getTreasures()}`
          );
        }
      }
      return;
    } else {
      console.log(
        `${adventurer.getName()} cannot move forward because the position is not free`
      );
      return;
    }
  }

  private getCurrentTileName(adventurer: Adventurer): string {
    const currentTile =
      this.getMap().getTiles()[adventurer.getPosition().getVertical()][
        adventurer.getPosition().getHorizontal()
      ];
    return currentTile.constructor.name;
  }

  private printSummaryMessage(): void {
    console.log("\n===============================");

    console.log(
      "C - " + this.getMap().getWidth() + " - " + this.getMap().getHeight()
    );

    this.getMap()
      .getMountains()
      .forEach((mountain) => {
        console.log(
          "M" +
            " - " +
            mountain.getPosition().getHorizontal() +
            " - " +
            mountain.getPosition().getVertical()
        );
      });

    this.getMap()
      .getTreasures()
      .forEach((treasure) => {
        if (treasure.getQuantity() > 0) {
          console.log(
            "T" +
              " - " +
              treasure.getPosition().getHorizontal() +
              " - " +
              treasure.getPosition().getVertical() +
              " - " +
              treasure.getQuantity()
          );
        }
      });

    this.getAdventurers().forEach((adventurer) => {
      console.log(
        "A" +
          " - " +
          adventurer.getName() +
          " - " +
          adventurer.getPosition().getHorizontal() +
          " - " +
          adventurer.getPosition().getVertical() +
          " - " +
          adventurer.getDirection() +
          " - " +
          adventurer.getTreasures()
      );
    });

    console.log("===============================");
  }
}
