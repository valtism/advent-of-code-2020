// Part 1
// ======

const { pull } = require("lodash");

function part1(input) {
  const [categoryInput, yourInput, nearbyInput] = input.split("\n\n");
  const ranges = categoryInput
    .match(/\d+-\d+ or \d+-\d+/g)
    .map((s) => s.split(" or ").map((range) => range.split("-").map(Number)));
  const values = nearbyInput.match(/\d+/g).map(Number);
  const invalids = values.filter(
    (value) =>
      !ranges.some(
        ([first, second]) =>
          (first[0] <= value && first[1] >= value) ||
          (second[0] <= value && second[1] >= value)
      )
  );

  return invalids.reduce((sum, value) => sum + value);
}

// Part 2
// ======

function part2(input) {
  const [categoryInput, yourInput, nearbyInput] = input.split("\n\n");

  // Remove any invalid tickets
  const nearbyTickets = nearbyInput
    .split("\n")
    .slice(1)
    .map((ticketString) => ticketString.split(",").map(Number));

  const allRanges = categoryInput
    .match(/\d+-\d+ or \d+-\d+/g)
    .map((ranges) =>
      ranges.split(" or ").map((range) => range.split("-").map(Number))
    );

  const validNearbyTickets = nearbyTickets.filter((ticket) =>
    ticket.every((value) =>
      allRanges.some((ranges) => withinRanges(ranges, value))
    )
  );

  const categoryRanges = categoryInput.split("\n").reduce((obj, catetory) => {
    const [_, key, first, second] = catetory.match(
      /(.+): (\d+-\d+) or (\d+-\d+)/
    );
    return {
      ...obj,
      [key]: [first.split("-").map(Number), second.split("-").map(Number)],
    };
  }, {});

  const yourTicket = yourInput.split("\n")[1].split(",").map(Number);

  // Find which categories can work for each column
  const cartegoryKeys = Object.keys(categoryRanges);
  let columnCategoryMatches = [];
  for (let i = 0; i < yourTicket.length; i++) {
    const matches = cartegoryKeys.filter((key) => {
      const ranges = categoryRanges[key];
      return validNearbyTickets.every((validArr) =>
        withinRanges(ranges, validArr[i])
      );
    });
    columnCategoryMatches[i] = matches;
  }

  // Eliminate possibilities one by one until each row has one category
  const lockedCategories = new Set();
  while (columnCategoryMatches.some((arr) => arr.length > 1)) {
    for (let i = 0; i < columnCategoryMatches.length; i++) {
      const categoryMatches = columnCategoryMatches[i];
      if (categoryMatches.length === 1) {
        lockedCategories.add(categoryMatches[0]);
      } else {
        pull(categoryMatches, ...Array.from(lockedCategories));
      }
    }
  }

  const yourTicketWithNames = columnCategoryMatches.map((category, i) => ({
    name: category[0],
    value: yourTicket[i],
  }));
  const departureFields = yourTicketWithNames.filter((named) =>
    named.name.startsWith("departure")
  );
  return departureFields.reduce((acc, curr) => acc * curr.value, 1);
}

function withinRanges(ranges, value) {
  const [first, second] = ranges;
  return (
    (first[0] <= value && first[1] >= value) ||
    (second[0] <= value && second[1] >= value)
  );
}

module.exports = { part1, part2 };
