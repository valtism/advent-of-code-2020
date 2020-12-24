// Part 1
// ======

function part1(input) {
  const rows = input.split("\n");
  const positions = rows.map((row) => {
    const directions = row.match(/(e|se|sw|w|nw|ne)/g);
    const steps = directions.map((step) => {
      switch (step) {
        case "e":
          return { x: 1, y: -1, z: 0 };
        case "se":
          return { x: 0, y: -1, z: 1 };
        case "sw":
          return { x: -1, y: 0, z: 1 };
        case "w":
          return { x: -1, y: 1, z: 0 };
        case "nw":
          return { x: 0, y: 1, z: -1 };
        case "ne":
          return { x: 1, y: 0, z: -1 };
        default:
          throw "Incorrect parse";
      }
    });
    tilePosition = steps.reduce((pos, step) => addStep(pos, step));
    return tilePosition;
  });

  const blackTiles = new Set();
  positions.forEach((position) => {
    const posString = JSON.stringify(position);
    if (!blackTiles.has(posString)) {
      blackTiles.add(posString);
    } else {
      blackTiles.delete(posString);
    }
  });

  return blackTiles.size;
}

function addStep(coord, step) {
  return { x: coord.x + step.x, y: coord.y + step.y, z: coord.z + step.z };
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");
  const tiles = rows.map((row) => {
    const directions = row.match(/(e|se|sw|w|nw|ne)/g);
    const steps = directions.map(getStepFromDirection);
    tilePosition = steps.reduce((pos, step) => addStep(pos, step));
    return tilePosition;
  });

  const blackTiles = new Set();
  const whiteTiles = new Set();
  tiles.forEach((tile) => {
    const tileString = JSON.stringify(tile);
    if (!blackTiles.has(tileString)) {
      blackTiles.add(tileString);
    } else {
      blackTiles.delete(tileString);
    }
  });

  for (let i = 0; i < 100; i++) {
    const blackTilesPrev = new Set(blackTiles);
    blackTilesPrev.forEach((blackTileString) => {
      const adjacentTiles = getAdjacentTiles(JSON.parse(blackTileString));
      const whiteAdjacentTiles = adjacentTiles.filter(
        (whiteTile) => !blackTilesPrev.has(JSON.stringify(whiteTile))
      );
      if (![4, 5].includes(whiteAdjacentTiles.length)) {
        blackTiles.delete(blackTileString);
      }
      const whiteAdjTileStrings = whiteAdjacentTiles.map((tile) =>
        JSON.stringify(tile)
      );
      whiteAdjTileStrings.forEach((tileString) => whiteTiles.add(tileString));
    });

    const whiteTilesPrev = new Set(whiteTiles);
    whiteTilesPrev.forEach((whiteTileString) => {
      const adjacentTiles = getAdjacentTiles(JSON.parse(whiteTileString));
      const blackAdjacentTiles = adjacentTiles.filter((tile) =>
        blackTilesPrev.has(JSON.stringify(tile))
      );
      if (blackAdjacentTiles.length == 2) {
        blackTiles.add(whiteTileString);
      }
      if (blackAdjacentTiles.length === 0) {
        whiteTiles.delete(whiteTileString);
      }
    });
  }

  return blackTiles.size;
}

function getStepFromDirection(step) {
  switch (step) {
    case "e":
      return { x: 1, y: -1, z: 0 };
    case "se":
      return { x: 0, y: -1, z: 1 };
    case "sw":
      return { x: -1, y: 0, z: 1 };
    case "w":
      return { x: -1, y: 1, z: 0 };
    case "nw":
      return { x: 0, y: 1, z: -1 };
    case "ne":
      return { x: 1, y: 0, z: -1 };
    default:
      throw "Incorrect parse";
  }
}

function getAdjacentTiles(position) {
  return ["e", "se", "sw", "w", "nw", "ne"]
    .map(getStepFromDirection)
    .map((step) => addStep(position, step));
}

module.exports = { part1, part2 };
