import { Mountain } from "../src/object/mountain.class";

describe("moutain", () => {
  const moutain = new Mountain({ position: { horizontal: 1, vertical: 1 } });

  it("should have a position", () => {
    expect(moutain.getPosition()).toEqual({
      horizontal: 1,
      vertical: 1,
    });
  });

  it("should have a horizontal position", () => {
    expect(moutain.getPosition().getHorizontal()).toBe(1);
  });

  it("should have a vertical position", () => {
    expect(moutain.getPosition().getVertical()).toBe(1);
  });

  it("should set a position", () => {
    moutain.setPosition({ horizontal: 3, vertical: 3 });
    expect(moutain.getPosition()).toEqual({
      horizontal: 3,
      vertical: 3,
    });
  });

  it("should set a horizontal position", () => {
    moutain.getPosition().setHorizontal(2);
    expect(moutain.getPosition().getHorizontal()).toBe(2);
  });

  it("should set a vertical position", () => {
    moutain.getPosition().setVertical(2);
    expect(moutain.getPosition().getVertical()).toBe(2);
  });

  it("should throw an error if the horizontal position is not a number", () => {
    expect(() => {
      moutain.getPosition().setHorizontal(Number("a"));
    }).toThrow("The horizontal position is not a number");
  });

  it("should throw an error if the vertical position is not a number", () => {
    expect(() => {
      moutain.getPosition().setVertical(Number("a"));
    }).toThrow("The vertical position is not a number");
  });

  it("should throw an error if the horizontal position is negative", () => {
    expect(() => {
      moutain.getPosition().setHorizontal(-1);
    }).toThrow("The horizontal position cannot be negative");
  });

  it("should throw an error if the vertical position is negative", () => {
    expect(() => {
      moutain.getPosition().setVertical(-1);
    }).toThrow("The vertical position cannot be negative");
  });
});
