const fs = require("fs");
const path = require("path");

// Path valid if running from "js/day09"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

function p1(input) {
  let lines = input.split("\n");
  
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
  let lines = input.split("\n");
  
}

console.log(
  `Test input is ${
    p2(testFileContent) === 8 ? "\x1b[42m" : "\x1b[41min"
  }correct\x1b[0m!`
);
console.log("Results is: ", p2(fileContent));
