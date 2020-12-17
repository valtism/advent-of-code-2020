const day13 = require("./day13");

const input1 = "939\n7,13,x,x,59,x,31,19";

test("1", () => {
  expect(day13.part1(input1)).toBe(295);
});

test("2", () => {
  expect(day13.part2(input1)).toBe(1068781);
});
