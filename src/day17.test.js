const day17 = require("./day17");

const input1 = ".#.\n..#\n###";

test("1", () => {
  expect(day17.part1(input1)).toBe(112);
});

test("2", () => {
  expect(day17.part2(input1)).toBe(848);
});
