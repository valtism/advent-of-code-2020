const day6 = require("./day6");

const input1 = "abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb";

test("1", () => {
  expect(day6.part1(input1)).toBe(11);
});

test("2", () => {
  expect(day6.part2(input1)).toBe(6);
});
