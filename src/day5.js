// Part 1
// ======

function part1(input) {
  inputs = input.split("\n").map((i) => {
    const row = i.slice(0, 7);
    const col = i.slice(7);

    const rowBin = row.replace(/F/g, "0").replace(/B/g, "1");
    const rowNum = parseInt(rowBin, 2);

    const colBin = col.replace(/L/g, "0").replace(/R/g, "1");
    const colNum = parseInt(colBin, 2);

    const seatId = rowNum * 8 + colNum;
    return { row: rowNum, col: colNum, id: seatId };
  });

  return inputs.reduce((acc, curr) => (curr.id > acc ? curr.id : acc), 0);
}

// Part 2
// ======

function part2(input) {
  inputs = input.split("\n").map((i) => {
    const row = i.slice(0, 7);
    const col = i.slice(7);

    const rowBin = row.replace(/F/g, "0").replace(/B/g, "1");
    const rowNum = parseInt(rowBin, 2);

    const colBin = col.replace(/L/g, "0").replace(/R/g, "1");
    const colNum = parseInt(colBin, 2);

    const seatId = rowNum * 8 + colNum;
    return { row: rowNum, col: colNum, id: seatId };
  });

  const ids = inputs.map((i) => i.id);
  const nums = [...Array(1000).keys()];
  const missing = nums.filter((n) => !ids.includes(n));

  for (let i = 1; i < missing.length; i++) {
    const id = missing[i];
    if (missing[i - 1] !== id - 1 && missing[i + 1] !== id + 1) return id;
  }

  return -1;
}

module.exports = { part1, part2 };
