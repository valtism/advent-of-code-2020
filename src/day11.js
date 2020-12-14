// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");

  let map = genMap(rows);

  let hashString = "";
  while (hash(map) !== hashString) {
    hashString = hash(map);
    map = iterate(map);
  }

  return resOccupied(map);
}

function genMap(rows) {
  let map = {};

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const seat = row[x];
      map[`${x},${y}`] = seat;
    }
  }

  return map;
}

function hash(map) {
  return Object.values(map).join("");
}

function iterate(map) {
  const arr = Object.entries(map);
  const newMap = {};
  for (let i = 0; i < arr.length; i++) {
    const [pos, seat] = arr[i];
    switch (seat) {
      case ".":
        newMap[pos] = ".";
        break;
      case "L":
        newMap[pos] = occupiedCount(map, pos) === 0 ? "#" : "L";
        break;
      case "#":
        newMap[pos] = occupiedCount(map, pos) >= 4 ? "L" : "#";
        break;
      default:
        console.log("You have a bug!");
        break;
    }
  }
  return newMap;
}

function occupiedCount(map, pos) {
  const [posX, posY] = pos.split(",").map(Number);
  let count = 0;

  for (let x = posX - 1; x <= posX + 1; x++) {
    for (let y = posY - 1; y <= posY + 1; y++) {
      if (x === posX && y === posY) {
        continue;
      }
      if (map[`${x},${y}`] === "#") {
        count++;
      }
    }
  }
  return count;
}

function resOccupied(map) {
  return Object.values(map).filter((seat) => seat === "#").length;
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");

  let map = genMap(rows);

  let hashString = "";
  while (hash(map) !== hashString) {
    hashString = hash(map);
    map = iteratePart2(map);
  }

  return resOccupied(map);
}

function iteratePart2(map) {
  const arr = Object.entries(map);
  const newMap = {};
  for (let i = 0; i < arr.length; i++) {
    const [pos, seat] = arr[i];
    switch (seat) {
      case ".":
        newMap[pos] = ".";
        break;
      case "L":
        newMap[pos] = occupiedCountPart2(map, pos) === 0 ? "#" : "L";
        break;
      case "#":
        newMap[pos] = occupiedCountPart2(map, pos) >= 5 ? "L" : "#";
        break;
      default:
        console.log("You have a bug!");
        break;
    }
  }
  return newMap;
}

function occupiedCountPart2(map, pos) {
  const [posX, posY] = pos.split(",").map(Number);
  let count = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      let tempX = posX + x;
      let tempY = posY + y;
      let area = map[`${tempX},${tempY}`];

      if ((tempX === posX && tempY === posY) || area === "L") {
        continue;
      }

      if (area === "#") {
        count++;
        continue;
      }

      while (area === ".") {
        tempX += x;
        tempY += y;
        area = map[`${tempX},${tempY}`];
        if (area === "#") {
          count++;
          continue;
        }
      }
    }
  }
  return count;
}

module.exports = { part1, part2 };
