// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");
  const instructions = rows.map((r) => {
    const [instruction, num] = r.split(" ");
    return { instruction, n: Number(num) };
  });

  const seenInstructions = new Set();
  let acc = 0;
  let ptr = 0;
  while (true) {
    if (seenInstructions.has(ptr)) {
      return acc;
    }
    seenInstructions.add(ptr);

    switch (instructions[ptr].instruction) {
      case "nop":
        ptr++;
        break;
      case "acc":
        acc += instructions[ptr].n;
        ptr++;
        break;
      case "jmp":
        ptr += instructions[ptr].n;
        break;
      default:
        break;
    }
  }
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");
  const instructions = rows.map((r) => {
    const [instruction, num] = r.split(" ");
    return { instruction, n: Number(num) };
  });

  const clone = (obj) => JSON.parse(JSON.stringify(obj));

  const mapped = instructions.map((ins, i, arr) => {
    if (ins.instruction === "jmp") {
      const newArr = clone(arr);
      newArr[i].instruction = "nop";
      return newArr;
    } else {
      return arr;
    }
  });

  const res = mapped.find((map) => loop(map) !== -1);
  return loop(res)
}

function loop(instructions) {
  const seenInstructions = new Set();
  let acc = 0;
  let ptr = 0;

  while (true) {
    if (seenInstructions.has(ptr)) {
      return -1;
    }
    seenInstructions.add(ptr);

    switch (instructions[ptr]?.instruction) {
      case "nop":
        ptr++;
        break;
      case "acc":
        acc += instructions[ptr].n;
        ptr++;
        break;
      case "jmp":
        ptr += instructions[ptr].n;
        break;
      default:
        return acc;
    }
  }
}

module.exports = { part1, part2 };
