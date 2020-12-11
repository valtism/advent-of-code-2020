const day11 = require("./day11");

const input1 =
  "L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL";

test("1", () => {
  expect(day11.part1(input1)).toBe(37);
});

test("2", () => {
  expect(day11.part2(input1)).toBe(26);
});
