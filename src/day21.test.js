const day21 = require("./day21");

const input1 =
  "mxmxvkd kfcds sqjhc nhms (contains dairy, fish)\ntrh fvjkl sbzzf mxmxvkd (contains dairy)\nsqjhc fvjkl (contains soy)\nsqjhc mxmxvkd sbzzf (contains fish)";

test("1", () => {
  expect(day21.part1(input1)).toBe(5);
});

test("2", () => {
  expect(day21.part2(input1)).toBe("mxmxvkd,sqjhc,fvjkl");
});
