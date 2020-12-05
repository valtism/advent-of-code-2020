const day3 = require("./day3");

const input1 =
  "..##.........##.........##.........##.........##.........##.......\n#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..\n.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.\n..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#\n.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.\n..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....\n.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#\n.#........#.#........#.#........#.#........#.#........#.#........#\n#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...\n#...##....##...##....##...##....##...##....##...##....##...##....#\n.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#";

test("1", () => {
  expect(day3.part1(input1)).toBe(7);
});

test("2", () => {
  expect(day3.part2(input1)).toBe(336);
});