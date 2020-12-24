const day23 = require("./day23");

const input1 = "389125467";

test("1", () => {
  expect(day23.part1(input1)).toBe("67384529");
});

test("2", () => {
  expect(day23.part2(input1)).toBe(149245887792);
});
