// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");

  const set = new Set();
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const cube = row[x];
      if (cube === "#") {
        set.add(getStringPostion(x, y, 0));
      }
    }
  }

  for (let cycle = 0; cycle < 6; cycle++) {
    const limits = getLimits(set);
    const previousCycleSet = new Set(set);
    for (let x = limits.min.x - 1; x <= limits.max.x + 1; x++) {
      for (let y = limits.min.y - 1; y <= limits.max.y + 1; y++) {
        for (let z = limits.min.z - 1; z <= limits.max.z + 1; z++) {
          const position = getStringPostion(x, y, z);
          const positions = getSurroundingPositions(position);
          const adjacentActive = positions.filter((pos) =>
            previousCycleSet.has(pos)
          );
          if (previousCycleSet.has(position)) {
            // Is active
            if (adjacentActive.length < 2 || adjacentActive.length > 3) {
              set.delete(position);
            }
          } else {
            // Is inactive
            if (adjacentActive.length === 3) {
              set.add(position);
            }
          }
        }
      }
    }
  }

  return set.size;
}

function getLimits(set) {
  let min = { x: 0, y: 0, z: 0 };
  let max = { x: 0, y: 0, z: 0 };
  for (const position of set.keys()) {
    const [x, y, z] = position.split(",").map(Number);
    if (x < min.x) {
      min.x = x;
    }
    if (y < min.y) {
      min.y = y;
    }
    if (z < min.z) {
      min.z = z;
    }
    if (x > max.x) {
      max.x = x;
    }
    if (y > max.y) {
      max.y = y;
    }
    if (z > max.z) {
      max.z = z;
    }
  }
  return { min, max };
}

function getSurroundingPositions(position) {
  const [x0, y0, z0] = position.split(",").map(Number);
  let surroundingPositions = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) {
          continue;
        }
        surroundingPositions.push(getStringPostion(x0 + x, y0 + y, z0 + z));
      }
    }
  }
  return surroundingPositions;
}

function getStringPostion(x, y, z) {
  return "" + x + "," + y + "," + z;
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");

  const set = new Set();
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const cube = row[x];
      if (cube === "#") {
        set.add(getStringPostion2(x, y, 0, 0));
      }
    }
  }

  for (let cycle = 0; cycle < 6; cycle++) {
    console.log(cycle + 1);
    const limits = getLimits2(set);
    const previousCycleSet = new Set(set);
    for (let x = limits.min.x - 1; x <= limits.max.x + 1; x++) {
      for (let y = limits.min.y - 1; y <= limits.max.y + 1; y++) {
        for (let z = limits.min.z - 1; z <= limits.max.z + 1; z++) {
          for (let w = limits.min.w - 1; w <= limits.max.w + 1; w++) {
            const position = getStringPostion2(x, y, z, w);
            const positions = getSurroundingPositions2(position);
            const adjacentActive = positions.filter((pos) =>
              previousCycleSet.has(pos)
            );

            if (previousCycleSet.has(position)) {
              // Is active
              if (adjacentActive.length < 2 || adjacentActive.length > 3) {
                set.delete(position);
              }
            } else {
              // Is inactive
              if (adjacentActive.length === 3) {
                set.add(position);
              }
            }
          }
        }
      }
    }
  }

  return set.size;
}

function getLimits2(set) {
  let min = { x: 0, y: 0, z: 0, w: 0 };
  let max = { x: 0, y: 0, z: 0, w: 0 };
  for (const position of set.keys()) {
    const [x, y, z, w] = position.split(",").map(Number);
    if (x < min.x) {
      min.x = x;
    }
    if (y < min.y) {
      min.y = y;
    }
    if (z < min.z) {
      min.z = z;
    }
    if (w < min.w) {
      min.w = w;
    }
    if (x > max.x) {
      max.x = x;
    }
    if (y > max.y) {
      max.y = y;
    }
    if (z > max.z) {
      max.z = z;
    }
    if (w > max.w) {
      max.w = w;
    }
  }
  return { min, max };
}

function getSurroundingPositions2(position) {
  const [x0, y0, z0, w0] = position.split(",").map(Number);
  let surroundingPositions = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        for (let w = -1; w <= 1; w++) {
          if (x === 0 && y === 0 && z === 0 && w === 0) {
            continue;
          }
          surroundingPositions.push(
            getStringPostion2(x0 + x, y0 + y, z0 + z, w0 + w)
          );
        }
      }
    }
  }
  return surroundingPositions;
}

function getStringPostion2(x, y, z, w) {
  return "" + x + "," + y + "," + z + "," + w;
}

module.exports = { part1, part2 };
