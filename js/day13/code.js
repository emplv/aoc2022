const fs = require("fs");
const path = require("path");
const { test, solve, chunk, sum } = require("../utils");

// Path valid if running from "js/day13"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

const compare = (l, r) => {
  if ([l, r].every((v) => +v === v)) return l - r;
  [l, r] = [l, r].map((v) => (+v === v ? [v] : v));
  return (
    l.reduce((acc, v, i) => acc || compare(v, r[i] ?? v), 0) ||
    l.length - r.length
  );
};

function p1(input) {
  const lines = input.split("\n");
  const pairs = chunk(lines, 3);
  return sum(
    pairs.map(([left, right], index) => {
      if (compare(eval(left), eval(right)) < 0) return index + 1;
      return 0;
    })
  );
}

test(p1(testFileContent), 13);
solve(p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  let lines = [
    "[[2]]",
    "[[6]]",
    ...input.replace(/\n\n/g, "\n").split("\n"),
  ].map((line) => eval(line));
  lines = lines
    .sort((l, r) => compare(l, r))
    .map((line) => JSON.stringify(line));
  return (
    -~lines.findIndex((line) => line === "[[2]]") *
    -~lines.findIndex((line) => line === "[[6]]")
  );
}

test(p2(testFileContent), 140);
solve(p2(fileContent));
