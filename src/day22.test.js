const day22 = require("./day22");

const input1 = "Player 1:\n9\n2\n6\n3\n1\n\nPlayer 2:\n5\n8\n4\n7\n10";

test("1", () => {
  expect(day22.part1(input1)).toBe(306);
});

test("2", () => {
  expect(day22.part2(input1)).toBe(291);
});
