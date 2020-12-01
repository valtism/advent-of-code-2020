// Part 1
// ======

function part1(input) {
  const nums = input.split("\n").map(Number);
  const subs = nums.map((i) => 2020 - i);
  for (let i = 0; i < subs.length; i++) {
    const s = subs[i];
    if (nums.includes(s)) {
      return s * nums[i];
    }
  }

  return -1;
}

// Part 2
// ======

function part2(input) {
  const nums = input.split("\n").map(Number);
  for (let i = 0; i < nums.length; i++) {
    const ei = nums[i];
    for (let j = 1; j < nums.length; j++) {
      const ej = nums[j];
      for (let k = 2; k < nums.length; k++) {
        const ek = nums[k];
        if (ei + ej + ek === 2020) {
          return ei * ej * ek;
        }
      }
    }
  }

  return -1;
}

module.exports = { part1, part2 };
