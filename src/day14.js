// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");

  const mem = [];
  let zeroMask = 0;
  let oneMask = 1;
  rows.forEach((row) => {
    if (/mask = /.test(row)) {
      const mask = row.slice(7);
      oneMask = BigInt("0b" + mask.replace(/X/g, "0"));
      zeroMask = BigInt("0b" + mask.replace(/X/g, "1"));
      return;
    }
    const address = Number(/\[(\d+)\]/.exec(row)[1]);
    let num = BigInt(/\d+$/.exec(row)[0]);
    num = num | oneMask;
    num = num & zeroMask;
    mem[address] = num;
  });

  return Number(mem.reduce((sum, num) => sum + num));
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");

  const mem = [];
  let mask = "";
  rows.forEach((row) => {
    if (/mask = /.test(row)) {
      mask = row.slice(7);
      return;
    }

    const xIndexs = getAllIndexes(mask.split(""), "X");
    const permutations = 2 ** xIndexs.length;

    const address = BigInt(/\[(\d+)\]/.exec(row)[1]);
    const maskedAddress = (address | BigInt("0b" + mask.replace(/X/g, "0")))
      .toString(2)
      .padStart(36, "0");
    const maskedAddressArr = maskedAddress.split("");

    const nums = [...Array(permutations).keys()].map((num) =>
      num.toString(2).padStart(xIndexs.length, "0")
    );

    const addresses = nums.map((num) => {
      let idx = 0;
      const addressString = maskedAddressArr
        .map((c, i) => {
          if (!xIndexs.includes(i)) {
            return c;
          }

          idx++;
          return num[idx - 1];
        })
        .join("");
      return Number("0b" + addressString);
    });

    const num = Number(/\d+$/.exec(row)[0]);
    addresses.forEach((address) => (mem[address] = num));
  });

  return Number(Object.values(mem).reduce((sum, num) => sum + num));
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

module.exports = { part1, part2 };
