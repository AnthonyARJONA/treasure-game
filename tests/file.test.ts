import { getFile, parseFile } from "./../src/utils/file";
describe("File", () => {
  const dataset = `
    C - 3 - 4
    M - 1 - 0
    M - 2 - 1
    T - 0 - 3 - 2
    T - 1 - 3 - 3
    A - Lara - 1 - 1 - S - AADADAGGA
  `;

  const data = parseFile(dataset);

  it("should return the dataset", () => {
    expect(typeof getFile()).toBe("string");
  });

  it("should throw an error if the dataset is wrong", () => {
    expect(() => {
      getFile("wrong");
    }).toThrow("An error occurred while reading the file");
  });

  it("should have a map instance", () => {
    expect(data.map).toBeDefined();
  });

  it("should have a adventurers instance", () => {
    expect(data.adventurers).toBeDefined();
  });

  it("should map object have correct height and width", () => {
    expect(data.map.getHeight()).toBe(4);
    expect(data.map.getWidth()).toBe(3);
  });

  it("should map object have correct mountains", () => {
    expect(data.map.getMountains()).toBeDefined();
    expect(typeof data.map.getMountains()).toBe("object");
    expect(data.map.getMountains().length).toBe(2);
  });

  it("should map object have correct treasures", () => {
    expect(data.map.getTreasures()).toBeDefined();
    expect(typeof data.map.getTreasures()).toBe("object");
    expect(data.map.getTreasures().length).toBe(2);
  });

  it("should map object have correct tiles", () => {
    expect(data.map.getTiles()).toBeDefined();
    expect(typeof data.map.getTiles()).toBe("object");
  }); 
});
