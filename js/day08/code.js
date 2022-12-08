const fs = require("fs");
const path = require("path");

// Path valid if running from "js/day08"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

function p1(input) {
  let visible = 0;
  let lines = input.split("\n");
  let grid = lines.map((x) => [...x]);

  grid.map((x, row) =>
    x.map((t, col) => {
      let urdl = 0b1111;

      const checkSight = (deltaRow, deltaCol, direction) => {
        let r = row + deltaRow;
        let c = col + deltaCol;
        for (; grid[r]?.[c]; ) {
          if (grid[r][c] >= t) {
            urdl ^= direction;
            break;
          }
          r += deltaRow;
          c += deltaCol;
        }
      };

      checkSight(-1, 0, 8); // up 0b1000 == 8
      checkSight(0, 1, 4); // right 0b100 == 4
      checkSight(1, 0, 2); // down 0b10 == 2
      checkSight(0, -1, 1); // left 0b1 == 1

      urdl && visible++;

      return t;
    })
  );
  return visible;
}

console.log(
  `Test input is ${
    p1(testFileContent) === 21 ? "\x1b[42m" : "\x1b[41min"
  }correct\x1b[0m!`
);
console.log("Results is: ", p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  let max = 0;
  let lines = input.split("\n");
  let grid = lines.map((x) => [...x]);

  grid.map((x, row) =>
    x.map((t, col) => {
      const countVisibleTrees = (deltaRow, deltaCol) => {
        let r = row + deltaRow;
        let c = col + deltaCol;
        let visible = 0;
        for (; grid[r]?.[c]; ) {
          visible++;
          if (grid[r][c] >= t) {
            break;
          }
          r += deltaRow;
          c += deltaCol;
        }
        return visible;
      };

      max = Math.max(
        max, 
        countVisibleTrees(-1, 0) // up
        * countVisibleTrees(0, 1) // right
        * countVisibleTrees(1, 0) // down
        * countVisibleTrees(0, -1) // left
      );

      return t;
    })
  );
  return max;
}

console.log(
  `Test input is ${
    p2(testFileContent) === 8 ? "\x1b[42m" : "\x1b[41min"
  }correct\x1b[0m!`
);
console.log("Results is: ", p2(fileContent));
