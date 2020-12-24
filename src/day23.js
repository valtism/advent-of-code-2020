const { pullAt } = require("lodash");

// Part 1
// ======

function part1(input) {
  let cupArr = input.split("").map(Number);

  const cups = cupArr.reduce(
    (list, curr, i, arr) => ({ ...list, [curr]: arr[(i + 1) % arr.length] }),
    {}
  );

  let cup = cupArr[0];
  for (let i = 0; i < 100; i++) {
    const pickStart = cups[cup];
    const pickEnd = cups[cups[cups[cup]]];

    const destination = getDestination(
      cup,
      [pickStart, cups[pickStart], cups[cups[pickStart]]],
      cupArr.length
    );

    cups[cup] = cups[pickEnd];
    const destEnd = cups[destination];
    cups[destination] = pickStart;
    cups[pickEnd] = destEnd;

    cup = cups[cup];
  }

  return listToString(cups);
}

function getDestination(target, excluded, listSize) {
  let d = target - 1;
  while (1) {
    if (d <= 0) {
      d = listSize;
    }
    if (excluded.includes(d)) {
      d--;
      continue;
    }
    return d;
  }
}

function listToString(list) {
  let string = "";
  let value = list[1];
  for (let i = 0; i < 8; i++) {
    string += value;
    value = list[value];
  }
  return string;
}

// Part 2
// ======

function part2(input) {
  let cupArr = input.split("").map(Number);

  const cups = cupArr.reduce(
    (list, curr, i, arr) => ({ ...list, [curr]: arr[(i + 1) % arr.length] }),
    {}
  );
  for (let i = cupArr.length + 1; i <= 1000000; i++) {
    cups[i] = i + 1;
  }
  cups[cupArr[cupArr.length - 1]] = cupArr.length + 1;
  cups[1000000] = cupArr[0];

  let cup = cupArr[0];
  for (let i = 0; i < 10000000; i++) {
    const pickStart = cups[cup];
    const pickEnd = cups[cups[cups[cup]]];

    const destination = getDestination(
      cup,
      [pickStart, cups[pickStart], cups[cups[pickStart]]],
      1000000
    );

    cups[cup] = cups[pickEnd];
    const destEnd = cups[destination];
    cups[destination] = pickStart;
    cups[pickEnd] = destEnd;

    cup = cups[cup];
  }

  return cups[1] * cups[cups[1]];
}

module.exports = { part1, part2 };
