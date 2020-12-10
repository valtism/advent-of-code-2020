// Part 1
// ======

function part1(input) {
  const nums = input.split("\n").map(Number);
  nums.sort((a, b) => a - b);

  let jolts = 0;
  let diffs = { 1: 0, 2: 0, 3: 1 };
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const diff = num - jolts;
    diffs[diff]++;
    jolts = num;
  }

  return diffs[1] * diffs[3];
}

// Part 2
// ======

function part2(input) {
  const nums = [0, ...input.split("\n").map(Number)];
  nums.sort((a, b) => a - b);

  let combinations = { 0: 1 };
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    const combos =
      (combinations[num - 1] || 0) +
      (combinations[num - 2] || 0) +
      (combinations[num - 3] || 0);

    combinations[num] = combos;
  }

  const totalCombinations = lastInObject(combinations);
  return totalCombinations;
}

function lastInObject(obj) {
  return obj[Object.keys(obj)[Object.keys(obj).length - 1]];
}

module.exports = { part1, part2 };
