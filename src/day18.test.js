const day18 = require("./day18");

const input0 = "1 + (2 * 3) + (4 * (5 + 6))";
const input1 = "2 * 3 + (4 * 5)";
const input2 = "5 + (8 * 3 + 9 + 3 * 4 * 3)";
const input3 = "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))";
const input4 = "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2";

test("1.0", () => {
  expect(day18.part1(input0)).toBe(51);
});
test("1.1", () => {
  expect(day18.part1(input1)).toBe(26);
});
test("1.2", () => {
  expect(day18.part1(input2)).toBe(437);
});
test("1.3", () => {
  expect(day18.part1(input3)).toBe(12240);
});
test("1.4", () => {
  expect(day18.part1(input4)).toBe(13632);
});

test("2.0", () => {
  expect(day18.part2(input0)).toBe(51);
});
test("2.1", () => {
  expect(day18.part2(input1)).toBe(46);
});
test("2.2", () => {
  expect(day18.part2(input2)).toBe(1445);
});
test("2.3", () => {
  expect(day18.part2(input3)).toBe(669060);
});
test("2.4", () => {
  expect(day18.part2(input4)).toBe(23340);
});
