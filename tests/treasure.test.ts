import { Treasure } from "../src/object/treasure.class";

describe("Treasure", () => {
  const treasure = new Treasure({
    position: { horizontal: 1, vertical: 1 },
    quantity: 1,
  });

  it("should have a position", () => {
    expect(treasure.getPosition()).toEqual({
      horizontal: 1,
      vertical: 1,
    });
  });

  it("should have a horizontal position", () => {
    expect(treasure.getPosition().getHorizontal()).toBe(1);
  });

  it("should have a vertical position", () => {
    expect(treasure.getPosition().getVertical()).toBe(1);
  });

  it("should have a quantity", () => {
    expect(treasure.getQuantity()).toBe(1);
  });

  it("should set a position", () => {
    treasure.setPosition({ horizontal: 3, vertical: 3 });
    expect(treasure.getPosition()).toEqual({
      horizontal: 3,
      vertical: 3,
    });
  });

  it("should set a horizontal position", () => {
    treasure.getPosition().setHorizontal(2);
    expect(treasure.getPosition().getHorizontal()).toBe(2);
  });

  it("should set a vertical position", () => {
    treasure.getPosition().setVertical(2);
    expect(treasure.getPosition().getVertical()).toBe(2);
  });

  it("should set a quantity", () => {
    treasure.setQuantity(2);
    expect(treasure.getQuantity()).toBe(2);
  });

  it("should throw an error if the horizontal position is not a number", () => {
    expect(() => {
      treasure.getPosition().setHorizontal(Number("a"));
    }).toThrow("The horizontal position is not a number");
  });

  it("should throw an error if the vertical position is not a number", () => {
    expect(() => {
      treasure.getPosition().setVertical(Number("a"));
    }).toThrow("The vertical position is not a number");
  });

  it("should throw an error if the horizontal position is negative", () => {
    expect(() => {
      treasure.getPosition().setHorizontal(-1);
    }).toThrow("The horizontal position cannot be negative");
  });

  it("should throw an error if the vertical position is negative", () => {
    expect(() => {
      treasure.getPosition().setVertical(-1);
    }).toThrow("The vertical position cannot be negative");
  });

  it("should throw an error if the quantity is not an integer", () => {
    expect(() => {
      treasure.setQuantity(Number("a"));
    }).toThrow("The quantity must be an integer");
  });

  it("should throw an error if the quantity is negative", () => {
    expect(() => {
      treasure.setQuantity(-1);
    }).toThrow("The quantity cannot be negative");
  });
});
