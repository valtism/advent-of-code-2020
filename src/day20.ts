// Part 1
// ======

type Tile = readonly string[][];

type TileOrientations = {
  oritentations: {
    tile: Tile;
    edges: Edges;
  }[];
  edgeOritentationMap: OritentationMap;
};

type ImageTile = { id: string; tile: Tile; edges: Edges };

type EachEdge<T> = {
  top: T;
  right: T;
  bottom: T;
  left: T;
};

type Edges = EachEdge<string>;

type OritentationMap = EachEdge<Record<string, number>>;

type AdjacentTiles = {
  left: ImageTile | null;
  top: ImageTile | null;
};

function part1(input: string) {
  const tileMap = new Map<string, TileOrientations>();
  const edgeToTileIds = new Map<string, string[]>();
  input.split("\n\n").forEach((tile) => {
    const [id, ...rows] = tile.split("\n");
    const tileId = id.match(/\d+/)![0];
    const tileRows = rows.map((row) => row.split(""));
    const tileOritentations = enumerateOrientations(tileRows);

    tileMap.set(tileId, tileOritentations);

    const allEdges = tileOritentations.oritentations[0].edges;
    for (const direction in allEdges) {
      const edge = allEdges[direction];
      const tileIds =
        edgeToTileIds.get(edge) || edgeToTileIds.get(reverse(edge));
      if (tileIds) {
        tileIds.push(tileId);
      } else {
        edgeToTileIds.set(edge, [tileId]);
      }
    }
  });

  const idsWithIsolatedEdges = Array.from(edgeToTileIds.values())
    .filter((ids) => ids.length === 1)
    .map((ids) => ids[0])
    .reduce((acc, curr) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    }, {});

  const cornerTileIds = Array.from(Object.entries(idsWithIsolatedEdges))
    .filter(([id, isolatedEdgeCount]) => isolatedEdgeCount === 2)
    .map(([id, isolatedEdgeCount]) => id);

  const imageSize = Math.sqrt(tileMap.size);

  function recurse(x: number, y: number, image: Record<string, ImageTile>) {
    const coords = coordString(x, y);

    const idsInImage = Object.values(image).map(({ id }) => id);

    if (idsInImage.length === imageSize ** 2) {
      // Full image found
      return image;
    }

    // Get adjacent edges
    const adjacentTiles: AdjacentTiles = {
      left: image[coordString(x - 1, y)] || null,
      top: image[coordString(x, y - 1)] || null,
    };
    const edgeToLeft = adjacentTiles.left?.edges.right;
    const edgeToTop = adjacentTiles.top?.edges.bottom;

    if (edgeToLeft && edgeToTop) {
      const leftEdgeKey = edgeToTileIds.has(edgeToLeft)
        ? edgeToLeft
        : reverse(edgeToLeft);
      const leftTileIds = edgeToTileIds
        .get(leftEdgeKey)
        ?.filter((tileId) => !idsInImage.includes(tileId));

      const topEdgeKey = edgeToTileIds.has(edgeToTop)
        ? edgeToTop
        : reverse(edgeToTop);
      const topTileIds = edgeToTileIds
        .get(topEdgeKey)
        ?.filter((ids) => !idsInImage.includes(ids));

      const tileIdsThatFitBoth = leftTileIds?.filter((tileId) =>
        topTileIds?.includes(tileId)
      );

      if (!tileIdsThatFitBoth) throw new Error("Can't find matching tile");

      for (const tileId of tileIdsThatFitBoth) {
        const tile = tileMap.get(tileId);
        if (!tile) throw new Error("Missing Tile");
        const topOrientationIndex =
          tile.edgeOritentationMap.top[reverse(edgeToTop)];
        const leftOrientationIndex =
          tile.edgeOritentationMap.left[reverse(edgeToLeft)];
        const oritentationIndex =
          topOrientationIndex === leftOrientationIndex
            ? topOrientationIndex
            : null;
        if (oritentationIndex === null) {
          throw new Error("Index mismatch");
        }

        const newImage = {
          ...image,
          [coords]: { id: tileId, ...tile.oritentations[oritentationIndex] },
        };
        if (x === imageSize - 1) {
          return recurse(0, y + 1, newImage);
        } else {
          return recurse(x + 1, y, newImage);
        }
      }
    }

    if (edgeToLeft) {
      const leftEdgeKey = edgeToTileIds.has(edgeToLeft)
        ? edgeToLeft
        : reverse(edgeToLeft);
      const leftTileIds = edgeToTileIds
        .get(leftEdgeKey)
        ?.filter((tileId) => !idsInImage.includes(tileId));

      if (!leftTileIds) throw new Error("No left edge tiles");

      for (const tileId of leftTileIds) {
        const tile = tileMap.get(tileId);
        if (!tile) throw new Error("no tile");
        const orientationIndex =
          tile.edgeOritentationMap.left[reverse(edgeToLeft)];
        const newImage = {
          ...image,
          [coords]: { id: tileId, ...tile.oritentations[orientationIndex] },
        };
        if (x === imageSize - 1) {
          return recurse(0, y + 1, newImage);
        } else {
          return recurse(x + 1, y, newImage);
        }
      }
    }

    if (edgeToTop) {
      const topEdgeKey = edgeToTileIds.has(edgeToTop)
        ? edgeToTop
        : reverse(edgeToTop);
      const topTileIds = edgeToTileIds
        .get(topEdgeKey)
        ?.filter((tileId) => !idsInImage.includes(tileId));

      if (!topTileIds) throw new Error("no top edge tiles");

      for (const tileId of topTileIds) {
        const tile = tileMap.get(tileId);
        if (!tile) throw new Error("no tile");
        const orientationIndex =
          tile.edgeOritentationMap.top[reverse(edgeToTop)];
        const newImage = {
          ...image,
          [coords]: { id: tileId, ...tile.oritentations[orientationIndex] },
        };
        if (x === imageSize - 1) {
          return recurse(0, y + 1, newImage);
        } else {
          return recurse(x + 1, y, newImage);
        }
      }
    }
  }

  let imageObject: Record<string, ImageTile> | undefined;
  let i = 0;
  while (!imageObject) {
    if (i > 7) break;

    const image = {
      [coordString(0, 0)]: {
        id: cornerTileIds[0],
        ...tileMap.get(cornerTileIds[0])!.oritentations[i],
      },
    };
    imageObject = recurse(1, 0, image);
    i++;
  }

  if (!imageObject) throw new Error("No configruation found");

  let trimmedTiles: string[][][][] = Array(imageSize)
    .fill(null)
    .map((_) => Array(imageSize).fill(null));
  for (let y = 0; y < imageSize; y++) {
    for (let x = 0; x < imageSize; x++) {
      const imageTile = imageObject[coordString(x, y)].tile;
      trimmedTiles[y][x] = trim(imageTile);
    }
  }

  const imageArray = trimmedTiles.flatMap((tileRow) =>
    tileRow.reduce((acc, tile, tileIndex) => {
      if (tileIndex === 0) {
        acc = tile;
      } else {
        tile.forEach((row, i) => {
          acc[i] = acc[i].concat(row);
        });
      }
      return acc;
    }, [] as string[][])
  );

  const orients = enumerateOrientations(imageArray);

  let tileStringOrientations = orients.oritentations
    .map((e) => e.tile)
    .map(tileToString);

  const seaMonsterRegexLines = [
    /(?=(..................\#.))/g,
    /(?=(\#....\#\#....\#\#....\#\#\#))/g,
    /(?=(.\#..\#..\#..\#..\#..\#...))/g,
  ];

  const matches = tileStringOrientations.map((tile) => {
    return seaMonsterRegexLines.map((regex) => {
      const matches = tile.matchAll(regex);
      let indicies: number[] = [];
      for (const { index } of matches) {
        if (!index) continue;
        indicies.push(index);
      }
      return indicies;
    });
  });

  const rowLength = orients.oritentations[0].tile.length + 1;

  const seaMonsters = matches
    .map((match) => {
      return match[0].filter(
        (index) =>
          match[1].includes(index + rowLength) &&
          match[2].includes(index + rowLength + rowLength)
      );
    })
    .filter((indexes) => indexes.length > 0)[0];

  const seaMonsterSize = 15;

  const hashCount = tileStringOrientations[0]
    .split("")
    .filter((c) => c === "#").length;

  return hashCount - seaMonsters.length * seaMonsterSize;
}

function tileToString(tile: Tile) {
  return tile.reduce(
    (string, row) => string.concat(row.join("")).concat("\n"),
    ""
  );
}

function trim(tile: Tile) {
  let trimmed: string[][] = [];
  for (let y = 1; y < tile.length - 1; y++) {
    const row = tile[y];
    trimmed[y - 1] = [];
    for (let x = 1; x < row.length - 1; x++) {
      const element = row[x];
      trimmed[y - 1][x - 1] = element;
    }
  }
  return trimmed;
}

function coordString(x: number, y: number) {
  return `${x},${y}`;
}

function reverse(string: string) {
  return string.split("").reverse().join("");
}

function getEdges(tile: Tile): Edges {
  // Edges are always left-right when on top
  return {
    top: tile[0].join(""),
    right: tile.map((row) => row[row.length - 1]).join(""),
    bottom: tile[tile.length - 1].toReversed().join(""),
    left: tile
      .map((row) => row[0])
      .toReversed()
      .join(""),
  };
}

function enumerateOrientations(tile: Tile) {
  const oritentations: { tile: Tile; edges: Edges }[] = [];
  const edgeOritentationMap: OritentationMap = {
    top: {},
    right: {},
    bottom: {},
    left: {},
  };
  for (let i = 0; i < 4; i++) {
    const rotatedTile = rotateTimes(tile, i);
    const edges = getEdges(rotatedTile);
    for (const direction in edgeOritentationMap) {
      edgeOritentationMap[direction][edges[direction]] = i;
    }
    oritentations.push({ tile: rotatedTile, edges });
  }
  const flippedTile = flip(tile);
  for (let i = 0; i < 4; i++) {
    const rotatedTile = rotateTimes(flippedTile, i);
    const edges = getEdges(rotatedTile);
    for (const direction in edgeOritentationMap) {
      edgeOritentationMap[direction][edges[direction]] = i + 4;
    }
    oritentations.push({ tile: rotatedTile, edges });
  }

  return { oritentations, edgeOritentationMap };
}

function swapItems(array: unknown[], a: number, b: number) {
  array[a] = array.splice(b, 1, array[a])[0];
  return array;
}

function transpose(tile: Tile) {
  return tile[0].map((_, i) => tile.map((row) => row[i]));
}

function rotate(tile: Tile) {
  return transpose(tile).map((row) => row.reverse());
}

function rotateTimes(tile: Tile, times: number) {
  let rotatedTile = tile;
  for (let i = 0; i < times; i++) {
    rotatedTile = rotate(rotatedTile);
  }
  return rotatedTile;
}

function flip(tile: readonly string[][]) {
  return tile.map((row) => [...row].reverse());
}

// Part 2
// ======

function part2(input) {
  const rows = input.split("\n");

  return 0;
}
module.exports = { part1, part2 };
