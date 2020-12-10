const day10 = require("./day10");

const input1 = "16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4";
const input2 =
  "28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3";

test("1.1", () => {
  expect(day10.part1(input1)).toBe(35);
});

test("1.2", () => {
  expect(day10.part1(input2)).toBe(220);
});

test("2.1", () => {
  expect(day10.part2(input1)).toBe(8);
});

test("2.2", () => {
  expect(day10.part2(input2)).toBe(19208);
});
