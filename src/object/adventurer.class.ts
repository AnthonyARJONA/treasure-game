import {Position, PositionType} from "./position.class";
import {Direction, Movement} from "../utils";

export class Adventurer {
  private name: string;
  private position: Position;
  private direction: Direction;
  private movements: Movement[];
  private treasures?: number = 0;
  private priority?: number;

  constructor({
    name,
    position,
    direction,
    movements,
    priority = 0,
  }: {
    name: string;
    position: PositionType;
    direction: Direction;
    movements: string;
    priority?: number;
  }) {
    this.setName(name);
    this.setPosition(position);
    this.setDirection(direction);
    this.setMovements(movements);
    this.setPriority(priority);
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): this {
    if (name.length === 0) {
      throw new Error("The name cannot be empty");
    }
    this.name = name;
    return this;
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: PositionType): this {
    this.position = new Position(position);
    return this;
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public setDirection(direction: Direction): this {
    if (Object.values(Direction).includes(direction) === false) {
      throw new Error("The direction is not valid");
    }

    this.direction = direction;
    return this;
  }

  public getMovements(): Movement[] {
    return this.movements;
  }

  public setMovements(movements: string): this {
    if (movements.length === 0) {
      throw new Error("The movements cannot be empty");
    }

    this.movements = Array.from(movements).map((movement) => {
      switch (movement) {
        case Movement.Left:
        case Movement.Right:
        case Movement.Forward:
          return movement;
        default:
          throw new Error(
            `Invalid movement: ${movement}. Only G, D, or A are allowed.`
          );
      }
    });

    return this;
  }

  public getTreasures(): number {
    return this.treasures;
  }

  public setTreasures(treasures: number): this {
    if (treasures < 0) {
      throw new Error("The quantity of treasures cannot be negative");
    }

    this.treasures = treasures;
    return this;
  }

  /**
   * Add treasures to the adventurer default 1
   * @param {number} quantity
   * @returns {this}
   */
  public addTreasures(quantity = 1): this {
    this.setTreasures(this.getTreasures() + quantity);
    return this;
  }

  public getPriority(): number {
    return this.priority;
  }

  public setPriority(priority: number): this {
    if (Number.isInteger(priority) === false) {
      throw new Error("The priority must be an integer");
    }

    if (priority < 0) {
      throw new Error("The priority cannot be negative");
    }

    this.priority = priority;
    return this;
  }

  public getForwardPosition(): Position {
    const nextPosition = new Position({
      horizontal: this.getPosition().getHorizontal(),
      vertical: this.getPosition().getVertical(),
    });

    switch (this.getDirection()) {
      case Direction.North:
        nextPosition.setVertical(nextPosition.getVertical() - 1);
        break;
      case Direction.East:
        nextPosition.setHorizontal(nextPosition.getHorizontal() + 1);
        break;
      case Direction.South:
        nextPosition.setVertical(nextPosition.getVertical() + 1);
        break;
      case Direction.West:
        nextPosition.setHorizontal(nextPosition.getHorizontal() - 1);
        break;
      default:
        throw new Error("The direction is not valid");
    }

    return nextPosition;
  }

  public moveForward(): this {
    this.setPosition({
      horizontal: this.getForwardPosition().getHorizontal(),
      vertical: this.getForwardPosition().getVertical(),
    });

    return this;
  }

  public turnLeft(): this {
    switch (this.getDirection()) {
      case Direction.North:
        this.setDirection(Direction.West);
        break;
      case Direction.West:
        this.setDirection(Direction.South);
        break;
      case Direction.South:
        this.setDirection(Direction.East);
        break;
      case Direction.East:
        this.setDirection(Direction.North);
        break;
      default:
        throw new Error("The direction is not valid");
    }

    return this;
  }

  public turnRight(): this {
    switch (this.getDirection()) {
      case Direction.North:
        this.setDirection(Direction.East);
        break;
      case Direction.East:
        this.setDirection(Direction.South);
        break;
      case Direction.South:
        this.setDirection(Direction.West);
        break;
      case Direction.West:
        this.setDirection(Direction.North);
        break;
      default:
        throw new Error("The direction is not valid");
    }

    return this;
  }

  /**
   * Return true if the adventurer passed in parameter has a higher priority than the adventurer instance (this)
   * @param adventurer {Adventurer} - The adventurer to compare
   * @returns {boolean}
   */
  public hasPriority(adventurer: Adventurer): boolean {
    return this.getPriority() > adventurer.getPriority();
  }
}
