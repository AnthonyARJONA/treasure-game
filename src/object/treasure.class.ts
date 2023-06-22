import {Position, PositionType} from "./position.class";

export class Treasure {
  private position: Position;
  private quantity?: number;

  constructor({
    position,
    quantity = 1,
  }: {
    position: PositionType;
    quantity: number;
  }) {
    this.setPosition(position);
    this.setQuantity(quantity);
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): this {
    if (Number.isInteger(quantity) === false) {
      throw new Error("The quantity must be an integer");
    }

    if (quantity < 0) {
      throw new Error("The quantity cannot be negative");
    }

    this.quantity = quantity;
    return this;
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: PositionType): this {
    this.position = new Position(position);
    return this;
  }
}
