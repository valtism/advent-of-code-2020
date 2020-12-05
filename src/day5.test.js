const day5 = require("./day5");

const input1 = "BFFFBBFRRR";

test("1", () => {
  expect(day5.part1(input1)).toBe(70);
});

test("2", () => {
  expect(day5.part2(input1)).toBe(-1);
});
