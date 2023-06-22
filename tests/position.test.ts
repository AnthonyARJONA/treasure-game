import { Position } from "../src/object/position.class";

describe("Position", () => {
  const position = new Position({ horizontal: 1, vertical: 1 });

  it("should have a position", () => {
    expect(position.getPosition()).toEqual({
      horizontal: 1,
      vertical: 1,
    });
  });

  it("should have a horizontal position", () => {
    expect(position.getHorizontal()).toBe(1);
  });

  it("should have a vertical position", () => {
    expect(position.getVertical()).toBe(1);
  });

  it("should set a position", () => {
    position.setPosition({ horizontal: 3, vertical: 3 });
    expect(position.getPosition()).toEqual({
      horizontal: 3,
      vertical: 3,
    });
  });

  it("should set a horizontal position", () => {
    position.setHorizontal(2);
    expect(position.getHorizontal()).toBe(2);
  });

  it("should set a vertical position", () => {
    position.setVertical(2);
    expect(position.getVertical()).toBe(2);
  });

  it("should throw an error if the horizontal position is not a number", () => {
    expect(() => {
      position.setHorizontal(Number("a"));
    }).toThrow("The horizontal position is not a number");
  });

  it("should throw an error if the vertical position is not a number", () => {
    expect(() => {
      position.setVertical(Number("a"));
    }).toThrow("The vertical position is not a number");
  });

  it("should throw an error if the horizontal position is negative", () => {
    expect(() => {
      position.setHorizontal(-1);
    }).toThrow("The horizontal position cannot be negative");
  });

  it("should throw an error if the vertical position is negative", () => {
    expect(() => {
      position.setVertical(-1);
    }).toThrow("The vertical position cannot be negative");
  });
});
