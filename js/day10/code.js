const fs = require("fs");
const path = require("path");
const { test, solve, sum } = require("../utils");

// Path valid if running from "js/day10"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

function p1(input) {
  let X = 1;
  let cycles = [X];
  let c = 1;

  input.split("\n").map((instruction) => {
    const [instr, value] = instruction.split(" ");
    switch (instr) {
      case "noop": {
        c += 1;
        cycles[c] = X;
        break;
      }
      case "addx": {
        c += 1;
        cycles[c] = X;
        c += 1;
        cycles[c] = X += +value;
        break;
      }
    }
  });

  return sum([20, 60, 100, 140, 180, 220].map((i) => cycles[i] * i));
}

test(p1(testFileContent), 13140);
solve(p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  let X = 1;
  let cycles = [X];
  let c = 1;
  let str = "";

  input.split("\n").map((instruction) => {
    const [instr, value] = instruction.split(" ");
    switch (instr) {
      case "noop": {
        str += [X, X + 1, X + 2].includes(c % 40) ? "#" : ".";
        c += 1;
        cycles[c] = X;
        break;
      }
      case "addx": {
        str += [X, X + 1, X + 2].includes(c % 40) ? "#" : ".";
        c += 1;
        cycles[c] = X;
        str += [X, X + 1, X + 2].includes(c % 40) ? "#" : ".";
        c += 1;
        cycles[c] = X += +value;
        break;
      }
    }
  });

  return str.match(/.{40}/g).join("\n");
}

test(
  p2(testFileContent),
  `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`
);
console.log(1);
solve("\n" + p2(testFileContent));
solve("\n" + p2(fileContent));
