// Part 1
// ======

function part1(input) {
  const playerInputs = input.split("\n\n");
  const [player1Deck, player2Deck] = playerInputs.map((input) =>
    input.split("\n").slice(1).map(Number)
  );

  while (player1Deck.length > 0 && player2Deck.length > 0) {
    const draw1 = player1Deck.shift();
    const draw2 = player2Deck.shift();
    if (draw1 > draw2) {
      player1Deck.push(...[draw1, draw2]);
    } else {
      player2Deck.push(...[draw2, draw1]);
    }
  }

  const winningDeck = player1Deck.length > 0 ? player1Deck : player2Deck;

  return winningDeck.reduce(
    (sum, curr, i) => sum + curr * (winningDeck.length - i),
    0
  );
}

// Part 2
// ======

function part2(input) {
  const playerInputs = input.split("\n\n");
  const [player1Deck, player2Deck] = playerInputs.map((input) =>
    input.split("\n").slice(1).map(Number)
  );

  function recurse(deck1, deck2) {
    const seen = new Set();
    while (deck1.length && deck2.length) {
      // Check for seen hands
      const handString = deck1 + deck2;
      if (seen.has(handString)) {
        return [[1], []];
      } else {
        seen.add(handString);
      }

      // Draw from top of decks
      const draw1 = deck1.shift();
      const draw2 = deck2.shift();

      if (draw1 > deck1.length || draw2 > deck2.length) {
        // Normal resolution
        if (draw1 > draw2) {
          deck1.push(...[draw1, draw2]);
        } else {
          deck2.push(...[draw2, draw1]);
        }
      } else {
        // Recursion time
        const [res1, res2] = recurse(
          deck1.slice(0, draw1),
          deck2.slice(0, draw2)
        );
        if (res1.length) {
          deck1.push(...[draw1, draw2]);
        } else {
          deck2.push(...[draw2, draw1]);
        }
      }
    }
    return [deck1, deck2];
  }

  const [res1, res2] = recurse(player1Deck, player2Deck);

  const winningDeck = res1.length ? res1 : res2;

  return winningDeck.reduce(
    (acc, curr, i) => acc + curr * (winningDeck.length - i),
    0
  );
}

module.exports = { part1, part2 };
