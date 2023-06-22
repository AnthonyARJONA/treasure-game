import {Position, PositionType} from "./position.class";

export class Mountain {
  private position: Position;

  constructor({position}: { position: PositionType }) {
    this.setPosition(position);
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: PositionType): this {
    this.position = new Position(position);
    return this;
  }
}
