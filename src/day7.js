// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");
  const rules = rows.reduce((obj, r) => {
    const [root, contains] = r.split(" contain ");
    const rootColor = root.slice(0, -5);
    const instructions = [...contains.matchAll(/(\d) (\w+ \w+)/g)];
    const containColors = instructions.map(([_, num, color]) => color);
    containColors.forEach((c) => {
      obj[c] = obj[c] ? obj[c].concat(rootColor) : [rootColor];
    });
    return obj;
  }, {});

  const set = new Set();
  recurse("shiny gold");

  function recurse(color) {
    const parentColors = rules[color];
    parentColors?.forEach((c) => {
      set.add(c);
      recurse(c);
    });
  }

  return set.size;
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");
  const rules = rows.reduce((obj, r) => {
    const [root, contains] = r.split(" contain ");
    const rootColor = root.slice(0, -5);
    const instructions = [...contains.matchAll(/(\d) (\w+ \w+)/g)];
    const containColors = instructions.map(([_, num, color]) => ({
      n: Number(num),
      color,
    }));
    return { ...obj, [rootColor]: containColors };
  }, {});

  return recurse("shiny gold") - 1;

  function recurse(color) {
    const rule = rules[color];
    if (!rule.length) {
      return 1;
    }

    const count = rule.reduce((acc, curr) => {
      return acc + curr.n * recurse(curr.color);
    }, 0);

    return count + 1;
  }
}

module.exports = { part1, part2 };
