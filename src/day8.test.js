const day8 = require("./day8");

const input1 = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6";

test("1", () => {
  expect(day8.part1(input1)).toBe(5);
});

test("2", () => {
  expect(day8.part2(input1)).toBe(8);
});
