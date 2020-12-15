// Part 1
// ======

function part1(input) {
  return process(input, 2020);
}

// Part 2
// ======

function part2(input) {
  return process(input, 30000000);
}

function process(input, number) {
  const startingNums = input.split(",").map(Number);
  const map = new Map();
  startingNums.forEach((num, i) => {
    map.set(num, [i]);
  });
  let lastSpoken = startingNums[startingNums.length - 1];

  for (let i = startingNums.length; i < number; i++) {
    const spokenOn = map.get(lastSpoken) || [];
    lastSpoken = getDiff(spokenOn);
    if (map.has(lastSpoken)) {
      map.get(lastSpoken).push(i);
    } else {
      map.set(lastSpoken, [i]);
    }
  }

  return lastSpoken;
}

function getDiff(spokenOn) {
  if (spokenOn.length < 2) {
    return 0;
  }
  return spokenOn[spokenOn.length - 1] - spokenOn[spokenOn.length - 2];
}

module.exports = { part1, part2 };
