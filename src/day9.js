// Part 1
// ======

function part1(input, preamble = 25) {
  const nums = input.split("\n").map(Number);

  for (let i = preamble; i < nums.length; i++) {
    let target = nums[i];
    if (!hasSumInPreamble(nums, i, preamble, target)) {
      return target;
    }
  }

  return -1;
}

function hasSumInPreamble(nums, i, preamble, target) {
  for (let j = i - preamble; j < i; j++) {
    for (let k = j + 1; k < i; k++) {
      if (nums[j] + nums[k] === target) {
        return true;
      }
    }
  }
  return false;
}

// Part 2
// ======

function part2(input, preamble = 25) {
  const invalidNumber = part1(input, preamble);
  const nums = input.split("\n").map(Number);
  const chain = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    chain.push(num);
    while (chainSum(chain) > invalidNumber) {
      chain.shift();
    }
    if (chain.length >= 2 && chainSum(chain) === invalidNumber) {
      chain.sort();
      return chain[0] + chain[chain.length - 1];
    }
  }

  return -1;
}

function chainSum(chain) {
  return chain.length ? chain.reduce((acc, curr) => acc + curr) : 0;
}

module.exports = { part1, part2 };
