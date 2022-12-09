const fs = require("fs");
const path = require("path");
const { test, solve } = require("../utils");

// Path valid if running from "js/day09"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const test2FileContent = fs.readFileSync(path.resolve("./test2.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

function getResult(input, ropeSize = 2) {
  const positions = new Set();
  let rope = [...Array(ropeSize)].map((_) => [0, 0]);
  input.split("\n").map((instruction) => {
    const [direction, count] = instruction.split(" ");
    for (let i = 0; i < count; i++) {
      // move rope
      rope.map((pos, i, rope) => {
        const [y, x] = pos;
        if (i === 0) {
          // move head
          pos = [
            y + Number(direction === "U") - Number(direction === "D"),
            x + Number(direction === "R") - Number(direction === "L"),
          ];
        } else {
          // move rest
          const [pY, pX] = rope[i - 1];
          if (Math.abs(pY - y) > 1 || Math.abs(pX - x) > 1) {
            pos = [y + Math.sign(pY - y), x + Math.sign(pX - x)];
          }
          // log tail position
          if (i === rope.length - 1) {
            positions.add(`${pos[0]} ${pos[1]}`);
          }
        }
        return (rope[i] = pos);
      });
    }
  });
  return positions.size;
}

function p1(input) {
  return getResult(input, 2);
}

test(p1(testFileContent), 13);
solve(p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  return getResult(input, 10);
}

test(p2(test2FileContent), 36);
solve(p2(fileContent));
