const fs = require("fs");
const path = require("path");
const { test, solve, min } = require("../utils");

// Path valid if running from "js/day12"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

const levels = "SabcdefghijklmnopqrstuvwxyzE";
const shortestPath = (input, start, end) => {
  const queue = [];
  const lines = input.split("\n");
  const map = lines.flatMap((line) => [...line]);
  map.map((current, index) => {
    if (current === start) {
      queue.push([index, 0]);
    }
  });
  const row = lines[0].length;
  const visited = new Set(queue.map(([current]) => current));
  while (queue.length) {
    const [current, steps] = queue.shift();
    if (map[current] === end) return steps;
    const currentLevel = levels.indexOf(map[current]);
    [current - row, current + 1, current + row, current - 1]
      .filter(
        (next) =>
          map[next] &&
          levels.indexOf(map[next]) <= currentLevel + 1 &&
          !visited.has(next)
      )
      .map((next) => {
        visited.add(next);
        queue.push([next, steps + 1]);
      });
  }
  return 0;
};

function p1(input) {
  return shortestPath(input, "S", "E");
}

test(p1(testFileContent), 31);
solve(p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  return shortestPath(input, "a", "E");
}

test(p2(testFileContent), 29);
solve(p2(fileContent));
