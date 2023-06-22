export type PositionType = { horizontal: number; vertical: number };

export class Position {
  private horizontal: number;
  private vertical: number;

  constructor({horizontal, vertical}: PositionType) {
    this.setHorizontal(horizontal);
    this.setVertical(vertical);
  }

  public getPosition(): PositionType {
    return {horizontal: this.horizontal, vertical: this.vertical};
  }

  public setPosition(position: PositionType): this {
    this.setHorizontal(position.horizontal).setVertical(position.vertical);
    return this;
  }

  public getHorizontal(): number {
    return this.horizontal;
  }

  public setHorizontal(horizontal: number): this {
    if (isNaN(horizontal)) {
      throw new Error("The horizontal position is not a number");
    }

    if (horizontal < 0) {
      throw new Error("The horizontal position cannot be negative");
    }

    this.horizontal = horizontal;
    return this;
  }

  public getVertical(): number {
    return this.vertical;
  }

  public setVertical(vertical: number): this {
    if (isNaN(vertical)) {
      throw new Error("The vertical position is not a number");
    }
    if (vertical < 0) {
      throw new Error("The vertical position cannot be negative");
    }

    this.vertical = vertical;
    return this;
  }
}
