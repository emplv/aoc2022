const fs = require("fs");
const path = require("path");

// Path valid if running from "js/day09"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const test2FileContent = fs.readFileSync(path.resolve("./test2.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

function p1(input) {
  const positions = new Set(["0-0"]);
  const HT = [
    [0, 0],
    [0, 0],
  ];
  input.split("\n").map((instruction) => {
    const [direction, count] = instruction.split(" ");
    for (let i = 0; i < count; i++) {
      let [ly, lx] = HT[0];
      let [[hy, hx], [ty, tx]] = HT;
      HT[0] = [
        (hy = hy + Number(direction === "U") - Number(direction === "D")),
        (hx = hx + Number(direction === "R") - Number(direction === "L")),
      ];
      if (Math.abs(hy - ty) > 1 || Math.abs(hx - tx) > 1) {
        HT[1] = [ly, lx];
        positions.add(`${ly}-${lx}`);
      }
    }
  });
  return positions.size;
}

console.log(
  `Test input is ${
    p1(testFileContent) === 13 ? "\x1b[42m" : "\x1b[41min"
  }correct\x1b[0m!`
);
console.log("Results is: ", p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  const positions = new Set();
  let rope = [...Array(10)].map((_) => [0, 0]);
  input.split("\n").map((instruction) => {
    const [direction, count] = instruction.split(" ");
    for (let i = 0; i < +count; i++) {
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
          // log tails positions
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

console.log(
  `Test input is ${
    p2(test2FileContent) === 36 ? "\x1b[42m" : "\x1b[41min"
  }correct\x1b[0m!`
);
console.log("Results is: ", p2(fileContent));


// Extra refactor
function gerResult(input, ropeSize) {
  const positions = new Set();
  let rope = [...Array(ropeSize)].map((_) => [0, 0]);
  input.split("\n").map((instruction) => {
    const [direction, count] = instruction.split(" ");
    for (let i = 0; i < +count; i++) {
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
          // log tails positions
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
console.log(
  `Test input is ${
    gerResult(testFileContent, 2) === 13 ? "\x1b[42m" : "\x1b[41min"
  }correct\x1b[0m!`
);
console.log("Results is: ", gerResult(fileContent, 2));
console.log(
  `Test input is ${
    gerResult(test2FileContent, 10) === 36 ? "\x1b[42m" : "\x1b[41min"
  }correct\x1b[0m!`
);
console.log("Results is: ", gerResult(fileContent, 10));