// Part 1
// ======

function part1(input) {
  const [ruleInput, messageInput] = input.split("\n\n");
  const rules = ruleInput.split("\n");
  const messages = messageInput.split("\n");

  const ruleMap = new Map(rules.map((row) => row.split(": ")));

  // Construct regex with DFS tree traversal replacing numbers with characters
  function dfsRegex(key) {
    const rule = ruleMap.get(key);
    return `(${rule.replace(/\d+/g, (match) => dfsRegex(match))})`;
  }
  // Strip out all spaces and quotes, and add anchors for string start and end
  const regex = `^${dfsRegex("0").replace(/ /g, "").replace(/"/g, "")}$`;

  const matches = messages.filter((message) => message.match(regex));
  return matches.length;
}

// Part 2
// ======

function part2(input) {
  const [ruleInput, messageInput] = input.split("\n\n");
  const rules = ruleInput.split("\n");
  const messages = messageInput.split("\n");

  const ruleMap = new Map(rules.map((row) => row.split(": ")));
  // Edit rules 8 and 11 for part 2
  ruleMap.set("8", "42 | 42 8");
  ruleMap.set("11", "42 31 | 42 11 31");

  // Limit loops in regex generation
  let depth8 = 0;
  let depth11 = 0;
  const limit = 6;
  // Construct regex with DFS tree traversal replacing numbers with characters
  function dfsRegex(key) {
    if (key === "8") {
      depth8++;
      if (depth8 > limit) {
        return "42";
      }
    }
    if (key === "11") {
      depth11++;
      if (depth11 > limit) {
        return "42 31";
      }
    }

    const rule = ruleMap.get(key);
    return `(${rule.replace(/\d+/g, (match) => dfsRegex(match))})`;
  }
  // Strip out all spaces and quotes, and add anchors for string start and end
  const regex = `^${dfsRegex("0").replace(/ /g, "").replace(/"/g, "")}$`;

  const matches = messages.filter((message) => message.match(regex));
  return matches.length;
}

module.exports = { part1, part2 };
