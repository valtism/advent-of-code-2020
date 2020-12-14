const day14 = require("./day14");

const input1 =
  "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0";
const input2 =
  "mask = 000000000000000000000000000000X1001X\nmem[42] = 100\nmask = 00000000000000000000000000000000X0XX\nmem[26] = 1";

test("1", () => {
  expect(day14.part1(input1)).toBe(165);
});

test("2", () => {
  expect(day14.part2(input2)).toBe(208);
});
