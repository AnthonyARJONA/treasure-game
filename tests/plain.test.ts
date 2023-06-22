import { Plain } from "../src/object/plain.class";

describe("Plain", () => {
  const plain = new Plain({ position: { horizontal: 1, vertical: 1 } });

  it("should have a position", () => {
    expect(plain.getPosition()).toEqual({
      horizontal: 1,
      vertical: 1,
    });
  });

  it("should have a horizontal position", () => {
    expect(plain.getPosition().getHorizontal()).toBe(1);
  });

  it("should have a vertical position", () => {
    expect(plain.getPosition().getVertical()).toBe(1);
  });

  it("should set a position", () => {
    plain.setPosition({ horizontal: 3, vertical: 3 });
    expect(plain.getPosition()).toEqual({
      horizontal: 3,
      vertical: 3,
    });
  });

  it("should set a horizontal position", () => {
    plain.getPosition().setHorizontal(2);
    expect(plain.getPosition().getHorizontal()).toBe(2);
  });

  it("should set a vertical position", () => {
    plain.getPosition().setVertical(2);
    expect(plain.getPosition().getVertical()).toBe(2);
  });

  it("should throw an error if the horizontal position is not a number", () => {
    expect(() => {
      plain.getPosition().setHorizontal(Number("a"));
    }).toThrow("The horizontal position is not a number");
  });

  it("should throw an error if the vertical position is not a number", () => {
    expect(() => {
      plain.getPosition().setVertical(Number("a"));
    }).toThrow("The vertical position is not a number");
  });

  it("should throw an error if the horizontal position is negative", () => {
    expect(() => {
      plain.getPosition().setHorizontal(-1);
    }).toThrow("The horizontal position cannot be negative");
  });

  it("should throw an error if the vertical position is negative", () => {
    expect(() => {
      plain.getPosition().setVertical(-1);
    }).toThrow("The vertical position cannot be negative");
  });
});
