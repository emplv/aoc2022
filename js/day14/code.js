const fs = require("fs");
const path = require("path");
const { test, solve, min, max } = require("../utils");

// Path valid if running from "js/day14"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

const buildCave = (input, p2 = false) => {
  const lines = input.split("\n");
  const xPositions = lines.flatMap((line) => line.match(/\d+(?=,)/g));
  const yPositions = lines.flatMap((line) => line.match(/(?<=,)\d+/g));
  const minY = 0;
  const maxY = max(yPositions) + (p2 ? 2 : 0);
  const minX = min(xPositions) - (p2 ? maxY + 1 : 0);
  const maxX = max(xPositions) + (p2 ? maxY + 1 : 0);

  const cave = [...Array(maxY + 1 - minY)].map((_) =>
    Array(maxX + 1 - minX).fill(".")
  );
  cave[0][500 - minX] = "+";
  lines.map((line) => {
    const corners = line.split(" -> ");
    corners.map((corner, c) => {
      let [x, y] = corner.split(",");
      const nextCorner = corners[c + 1];
      cave[y - minY][x - minX] = "#";
      if (nextCorner) {
        const [nX, nY] = nextCorner.split(",");
        const [dX, dY] = [
          x == nX ? 0 : Math.sign(nX - x),
          y == nY ? 0 : Math.sign(nY - y),
        ];
        for (; x != nX || y != nY; ) {
          cave[y - minY][x - minX] = "#";
          x = +x + dX;
          y = +y + dY;
        }
      }
    });
  });
  cave[maxY].map((_, x) => (cave[maxY][x] = "#"));
  return cave;
};

const sandFall = (cave, y, x) => {
  // check down
  if (cave[y + 1]?.[x] == ".") return sandFall(cave, y + 1, x);
  // check left-down
  if (cave[y + 1]?.[x - 1] == ".") return sandFall(cave, y + 1, x - 1);
  // check right-down
  if (cave[y + 1]?.[x + 1] == ".") return sandFall(cave, y + 1, x + 1);
  // check for abyss
  if (
    [cave[y], cave[y + 1], cave[y + 1]?.[x - 1], cave[y + 1]?.[x + 1]].some(
      (pos) => pos === undefined
    )
  )
    return 0;
  // rest
  cave[y][x] = "o";
  return [cave, y, x];
};

function p1(input) {
  let sandUnits = 0;
  const cave = buildCave(input);
  const sandY = 0;
  const sandX = cave[0].findIndex((x) => x === "+");

  for (;;) {
    const sandRested = sandFall(cave, sandY, sandX);
    if (sandRested) {
      sandUnits += 1;
    } else {
      break;
    }
  }

  //console.log(cave.map((x) => x.join("")).join("\n"));
  return sandUnits;
}

test(p1(testFileContent), 24);
solve(p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  let sandUnits = 0;
  const cave = buildCave(input, true);
  const sandY = 0;
  const sandX = cave[0].findIndex((x) => x === "+");

  for (;;) {
    const sandRested = sandFall(cave, sandY, sandX);
    if (sandRested) {
      sandUnits += 1;
      const [, y, x] = sandRested;
      if (y == sandY && x == sandX) {
        break;
      }
    } else {
      break;
    }
  }

  // console.log(cave.map((x) => x.join("")).join("\n"));
  return sandUnits;
}

test(p2(testFileContent), 93);
solve(p2(fileContent));
