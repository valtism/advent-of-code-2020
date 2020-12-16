const day16 = require("./day16");

const input1 =
  "class: 1-3 or 5-7\nrow: 6-11 or 33-44\nseat: 13-40 or 45-50\n\nyour ticket:\n7,1,14\n\nnearby tickets:\n7,3,47\n40,4,50\n55,2,20\n38,6,12";
const input2 =
  "class: 0-1 or 4-19\nrow: 0-5 or 8-19\nseat: 0-13 or 16-19\n\nyour ticket:\n11,12,13\n\nnearby tickets:\n3,9,18\n15,1,5\n5,14,9";

test("1", () => {
  expect(day16.part1(input1)).toBe(71);
});

test("2", () => {
  expect(day16.part2(input2)).toBe(1);
});
