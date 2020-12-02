// Part 1
// ======

function part1(input) {
  const lines = input.split("\n");
  const rules = lines.map((rule) => rule.split(" "));

  return rules.filter(isValid).length;
}

function isValid(rule) {
  const [min, max] = rule[0].split("-");
  const letter = rule[1][0];
  const password = rule[2];

  const count = password.split(letter).length - 1;
  return count >= min && count <= max;
}

// Part 2
// ======

function part2(input) {
  const lines = input.split("\n");
  const rules = lines.map((rule) => rule.split(" "));

  return rules.filter(isValid2).length;
}

function isValid2(rule) {
  const [i1, i2] = rule[0].split("-");
  const letter = rule[1][0];
  const password = rule[2];

  const inPos1 = password[i1 - 1] === letter;
  const inPos2 = password[i2 - 1] === letter;

  return inPos1 !== inPos2;
}

module.exports = { part1, part2 };
