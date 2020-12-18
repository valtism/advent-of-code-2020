// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");

  const results = rows.map((row) => {
    const rowArray = row
      .split("")
      .filter((c) => c !== " ")
      .map((c) => (isNaN(Number(c)) ? c : Number(c)));

    const arr = [];
    let depth = 0;
    let curr = 0;
    let currOperation = "+";
    for (let i = 0; i < rowArray.length; i++) {
      const element = rowArray[i];
      switch (element) {
        case "(":
          arr.push({ num: curr, op: currOperation, depth: depth });
          curr = 0;
          currOperation = "+";
          depth++;
          break;
        case ")":
          const last = arr.pop();
          curr = eval(curr + last.op + last.num);
          depth--;
          break;
        case "+":
        case "*":
          currOperation = element;
          break;
        default:
          // Is a number
          curr = eval(curr + currOperation + element);
          break;
      }
    }
    return curr;
  });
  return results.reduce((acc, curr) => acc + curr);
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");

  const results = rows.map((row) => {
    const elements = row
      .split("")
      .filter((c) => c !== " ")
      .map((c) => (isNaN(Number(c)) ? c : Number(c)));

    const arr = [];
    let curr = 0;
    let currOperation = "+";
    let waiting = false;
    elements.forEach((element) => {
      switch (element) {
        case "(":
          arr.push({ num: curr, op: currOperation, waiting });
          curr = 0;
          currOperation = "+";
          waiting = false;
          break;
        case ")":
          let last;
          if (waiting) {
            last = arr.pop();
            curr = eval(curr + last.op + last.num);
            waiting = false;
          }
          last = arr.pop();
          curr = eval(curr + last.op + last.num);
          waiting = last.waiting;
          break;
        case "+":
          currOperation = element;
          break;
        case "*":
          if (waiting) {
            const last = arr.pop();
            curr = eval(curr + element + last.num);
            currOperation = element;
            waiting = false;
          }
          arr.push({ num: curr, op: element, waiting });
          curr = 0;
          currOperation = "+";
          waiting = true;
          break;
        default:
          // Is a number
          curr = eval(curr + currOperation + element);
          break;
      }
    });

    // Clean up any leftover matching to do after end of input
    let last;
    while (arr.length) {
      console.log("hi");
      last = arr.pop();
      curr = eval(curr + last.op + last.num);
      waiting = last.waiting;
    }
    return curr;
  });

  return results.reduce((acc, curr) => acc + curr);
}

module.exports = { part1, part2 };
