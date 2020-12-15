const day12 = require("./day12");

const input1 = "F10\nN3\nF7\nR90\nF11";

test("1", () => {
  expect(day12.part1(input1)).toBe(25);
});

test("2", () => {
  expect(day12.part2(input1)).toBe(286);
});
