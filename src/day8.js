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

  for (let i = 0; i < instructions.length; i++) {
    let ins = instructions[i];
    if (ins.instruction === "jmp") {
      ins.instruction = "nop";
      if (loop(instructions) !== -1) {
        return loop(instructions);
      } else {
        ins.instruction = "jmp";
      }
    }
  }

  return -1;
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
