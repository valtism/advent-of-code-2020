// Part 1
// ======

function part1(input) {
  const rows = input.split("\n\n");
  const sizes = rows.map((r) => {
    const responses = r.split("\n");

    const chars = responses.reduce(
      (acc, curr) => [...acc, ...curr.split("")],
      []
    );

    const groupSets = new Set(chars);
    return groupSets.size;
  });

  return sizes.reduce((acc, curr) => acc + curr);
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n\n");
  const every = rows.map((row) => {
    const responses = row.split("\n");
    const res = responses.map((resp) => resp.split(""));
    let count = 0;
    for (let i = 0; i < res[0].length; i++) {
      const response = res[0][i];
      if (res.every((r) => r.includes(response))) {
        count++;
      }
    }
    return count;
  });

  return every.reduce((acc, curr) => acc + curr);
}

module.exports = { part1, part2 };
