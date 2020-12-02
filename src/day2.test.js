const day2 = require("./day2");

const input1 = "1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc";

test("1", () => {
  expect(day2.part1(input1)).toBe(2);
});

test("2", () => {
  expect(day2.part2(input1)).toBe(1);
});
