const fs = require("fs");
const path = require("path");
const { test, solve, sum } = require("../utils");

// Path valid if running from "js/day20"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

const mixItems = (file, key = 1, rounds = 1) => {
  // push in as "[item]" to avoid second mixing per item
  const descryptedFile = file.map((value) => [value * key]);
  let mixedFile = [...descryptedFile];
  const fileLength = mixedFile.length - 1;
  for (; rounds--; ) {
    descryptedFile.map((item) => {
      const idx = mixedFile.indexOf(item);
      mixedFile.splice(idx, 1);
      mixedFile.splice((idx + item[0]) % fileLength, 0, item);
    });
  }
  return mixedFile.flat();
};

const sumGroveItems = (file) => {
  const fileLength = file.length;
  const zeroIndex = file.indexOf(0);
  return sum(
    [1e3, 2e3, 3e3].map((idx) => file[(zeroIndex + idx) % fileLength])
  );
};

function p1(input) {
  const file = input.split("\n").map(Number);
  return sumGroveItems(mixItems(file));
}

test(p1(testFileContent), 3);
solve(p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  const file = input.split("\n").map(Number);
  return sumGroveItems(mixItems(file, 811589153, 10));
}

test(p2(testFileContent), 1623178306);
solve(p2(fileContent));
