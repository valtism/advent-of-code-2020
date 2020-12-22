const { pull, sortBy } = require("lodash");

// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");
  const allergenPossibilities = rows.reduce((obj, row) => {
    const [_, produceInput, allergenInput] = row.match(
      /(.+) \(contains (.+)\)/
    );
    const produce = produceInput.split(" ");
    const allergens = allergenInput.split(", ");
    allergens.forEach((allergen) => {
      obj[allergen] = obj[allergen]
        ? obj[allergen].filter((p) => produce.includes(p))
        : produce;
    });
    return obj;
  }, {});

  const allProduce = rows.reduce((arr, row) => {
    const [_, produceInput] = row.match(/(.+) \(contains (.+)\)/);
    const produce = produceInput.split(" ");

    return arr.concat(produce);
  }, []);
  const dangerousProduce = Object.values(allergenPossibilities).flat();
  const safeProduce = allProduce.filter((p) => !dangerousProduce.includes(p));

  return safeProduce.length;
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");
  const allergenPossibilities = rows.reduce((obj, row) => {
    const [_, produceInput, allergenInput] = row.match(
      /(.+) \(contains (.+)\)/
    );
    const produce = produceInput.split(" ");
    const allergens = allergenInput.split(", ");
    allergens.forEach((allergen) => {
      obj[allergen] = obj[allergen]
        ? obj[allergen].filter((p) => produce.includes(p))
        : produce;
    });
    return obj;
  }, {});

  const cannonicalList = [];

  while (Object.values(allergenPossibilities).some((p) => p.length > 0)) {
    for (const key in allergenPossibilities) {
      const allergens = allergenPossibilities[key];
      if (allergens.length === 1) {
        cannonicalList.push({ allergen: key, name: allergens[0] });
        for (const key in allergenPossibilities) {
          const allergens = allergenPossibilities[key];
          allergenPossibilities[key] = allergens.filter(
            (a) => !cannonicalList.map((c) => c.name).includes(a)
          );
        }
      }
    }
  }

  const sorted = sortBy(cannonicalList, "allergen");

  return sorted.map((c) => c.name).join(",");
}

module.exports = { part1, part2 };
