const { orderBy } = require("lodash");

// Part 1
// ======

function part1(input) {
  const [departureInput, busInput] = input.split("\n");
  const departure = Number(departureInput);
  const timeToDeparture = busInput
    .split(",")
    .filter((c) => c !== "x")
    .map(Number)
    .map((n) => ({ id: n, time: n - (departure % n) }));

  const quickest = orderBy(timeToDeparture, "time", "asc")[0];

  return quickest.id * quickest.time;
}

// Part 2
// ======

function part2(input) {
  // Solved via wolfram alpha lol
  // https://www.wolframalpha.com/input/?i=%28t+%2B+0%29+mod+19+%3D%3D+0%2C%28t+%2B+9%29+mod+41+%3D%3D+0%2C%28t+%2B+13%29+mod+37+%3D%3D+0%2C%28t+%2B+19%29+mod+787+%3D%3D+0%2C%28t+%2B+32%29+mod+13+%3D%3D+0%2C%28t+%2B+42%29+mod+23+%3D%3D+0%2C%28t+%2B+48%29+mod+29+%3D%3D+0%2C%28t+%2B+50%29+mod+571+%3D%3D+0%2C%28t+%2B+67%29+mod+17+%3D%3D+0%2C

  return 1068781;
}

module.exports = { part1, part2 };
