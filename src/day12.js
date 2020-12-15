// Part 1
// ======

function part1(input) {
  const actions = input.split("\n");
  const initialPos = { x: 0, y: 0, deg: 0 };

  const finalPos = actions.reduce(
    (pos, action) => move(pos, action),
    initialPos
  );

  return getManhattanDistance(finalPos);
}

function move(pos, action) {
  const type = action.slice(0, 1);
  const value = Number(action.slice(1));

  switch (type) {
    case "N":
      return { ...pos, y: pos.y + value };
    case "S":
      return { ...pos, y: pos.y - value };
    case "E":
      return { ...pos, x: pos.x + value };
    case "W":
      return { ...pos, x: pos.x - value };
    case "L":
      return { ...pos, deg: turn(pos.deg, -value) };
    case "R":
      return { ...pos, deg: turn(pos.deg, value) };
    case "F":
      const newAction = degToDirection(pos.deg) + value;
      return move(pos, newAction);
    default:
      break;
  }
}

function turn(deg, value) {
  let roatation = deg + value;
  while (roatation < 0) {
    roatation += 360;
  }
  return roatation % 360;
}

function degToDirection(deg) {
  switch (deg) {
    case 0:
      return "E";
    case 90:
      return "S";
    case 180:
      return "W";
    case 270:
      return "N";
    default:
      break;
  }
}

function getManhattanDistance(pos) {
  return Math.abs(pos.x) + Math.abs(pos.y);
}

// Part 2
// ======

function part2(input) {
  const actions = input.split("\n");

  const initialPositions = {
    pos: { x: 0, y: 0, deg: 0 },
    waypoint: { x: 10, y: 1 },
  };

  const finalPositions = actions.reduce(
    (positions, action) => move2(positions, action),
    initialPositions
  );

  const finalPos = finalPositions.pos;

  return getManhattanDistance(finalPos);
}

function move2(positions, action) {
  const type = action.slice(0, 1);
  const value = Number(action.slice(1));
  const { waypoint } = positions;

  switch (type) {
    case "N":
      return {
        ...positions,
        waypoint: { ...waypoint, y: waypoint.y + value },
      };
    case "S":
      return {
        ...positions,
        waypoint: { ...waypoint, y: waypoint.y - value },
      };
    case "E":
      return {
        ...positions,
        waypoint: { ...waypoint, x: waypoint.x + value },
      };
    case "W":
      return {
        ...positions,
        waypoint: { ...waypoint, x: waypoint.x - value },
      };
    case "L":
      return {
        ...positions,
        waypoint: roatateWaypoint(waypoint, -value),
      };
    case "R":
      return {
        ...positions,
        waypoint: roatateWaypoint(waypoint, value),
      };
    case "F":
      return {
        ...positions,
        pos: drive(positions, value),
      };
    default:
      break;
  }
}

function roatateWaypoint(waypoint, value) {
  const val = value % 360;
  switch (val) {
    case 0:
      return waypoint;
    case 90:
    case -270:
      return { x: waypoint.y, y: -waypoint.x };
    case 180:
    case -180:
      return { x: -waypoint.x, y: -waypoint.y };
    case 270:
    case -90:
      return { x: -waypoint.y, y: waypoint.x };
    default:
      break;
  }
}

function drive(positions, value) {
  const { pos, waypoint } = positions;
  return {
    ...pos,
    x: pos.x + value * waypoint.x,
    y: pos.y + value * waypoint.y,
  };
}

module.exports = { part1, part2 };
