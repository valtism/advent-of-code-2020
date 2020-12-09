const day9 = require("./day9");

const input1 = "35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576";

test("1", () => {
  expect(day9.part1(input1, 5)).toBe(127);
});

test("2", () => {
  expect(day9.part2(input1, 5)).toBe(62);
});
