const day5 = require("./day5");

const input1 = "FBFBBFFRLR";

test("1", () => {
  expect(day5.part1(input1)).toBe(357);
});

test("2", () => {
  expect(day5.part2(input1)).toBe(-1);
});
