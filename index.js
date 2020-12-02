require("dotenv").config();
const aocLoader = require("aoc-loader");
const { performance } = require("perf_hooks");

const TEST_DAY = process.argv[2] || 2;

if (!TEST_DAY) {
  throw new Error(
    "Please supply a day to test using the format `npm start {day}`"
  );
}

const day = require("./src/day" + TEST_DAY);

aocLoader(2020, TEST_DAY, process.env.AOC_SESSION).then((data) => {
  const t0 = performance.now();
  const res1 = day.part1(data);
  const t1 = performance.now();
  console.log(`Part 1: ${res1} in ${(t1 - t0).toFixed(2)}ms\n`);
  const t2 = performance.now();
  const res2 = day.part2(data);
  const t3 = performance.now();
  console.log(`Part 2: ${res2} in ${(t3 - t2).toFixed(2)}ms\n`);
});
