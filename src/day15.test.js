const day15 = require("./day15");

const input0 = "0,3,6";
const input1 = "1,3,2";
const input2 = "2,1,3";
const input3 = "1,2,3";
const input4 = "2,3,1";
const input5 = "3,2,1";
const input6 = "3,1,2";

test("1.0", () => {
  expect(day15.part1(input0)).toBe(436);
});
test("1.1", () => {
  expect(day15.part1(input1)).toBe(1);
});
test("1.2", () => {
  expect(day15.part1(input2)).toBe(10);
});
test("1.3", () => {
  expect(day15.part1(input3)).toBe(27);
});
test("1.4", () => {
  expect(day15.part1(input4)).toBe(78);
});
test("1.5", () => {
  expect(day15.part1(input5)).toBe(438);
});
test("1.6", () => {
  expect(day15.part1(input6)).toBe(1836);
});


// test("2.0", () => {
//   expect(day15.part2(input0)).toBe(175594);
// });
// test("2.1", () => {
//   expect(day15.part2(input1)).toBe(2578);
// });
// test("2.2", () => {
//   expect(day15.part2(input2)).toBe(3544142);
// });
// test("2.3", () => {
//   expect(day15.part2(input3)).toBe(261214);
// });
// test("2.4", () => {
//   expect(day15.part2(input4)).toBe(6895259);
// });
// test("2.5", () => {
//   expect(day15.part2(input5)).toBe(18);
// });
// test("2.6", () => {
//   expect(day15.part2(input6)).toBe(362);
// });