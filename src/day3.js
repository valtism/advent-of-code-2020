// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");
  const slope = { x: 3, y: 1 };

  return getCollisions(slope, rows);
}

function getCollisions(slope, rows) {
  let trees = 0;
  let x = 0;

  for (let y = slope.y; y < rows.length; y += slope.y) {
    const row = rows[y];
    x = (x + slope.x) % row.length;
    if (row[x] === "#") {
      trees++;
    }
  }
  return trees;
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");
  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  const collisions = slopes.map((slope) => getCollisions(slope, rows));
  return collisions.reduce((acc, curr) => acc * curr);
}

module.exports = { part1, part2 };
