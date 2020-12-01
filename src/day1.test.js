const day1 = require("./day1");

const input1 = `1721\n979\n366\n299\n675\n1456`;

test("1", () => {
  expect(day1.part1(input1)).toBe(514579);
});

test("2", () => {
  expect(day1.part2(input1)).toBe(241861950);
});
