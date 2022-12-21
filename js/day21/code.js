const fs = require("fs");
const path = require("path");
const { test, solve } = require("../utils");

// Path valid if running from "js/day21"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

const getValue = (monkeys, name) => {
  const op = monkeys.get(name);
  if (+op == op) return +op;
  return eval(op.replace(/[a-z]{4}/g, (v) => `(${getValue(monkeys, v)})`));
};

function p1(input) {
  const monkeys = new Map();
  input.split("\n").map((line) => {
    const [name, op] = line.split(": ");
    monkeys.set(name, +op == op ? +op : op); // try to parse to number if possible
  });

  return getValue(monkeys, "root");
}

test(p1(testFileContent), 152);
solve(p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  const monkeys = new Map();
  input.split("\n").map((line) => {
    let [name, op] = line.split(": ");
    if (name === "root") op = op.split(/ . /).join(" - "); // to make comparisson equal "0"
    if (name === "humn") return; // skip "human"
    monkeys.set(name, +op == op ? +op : op); // try to parse to number if possible
  });

  let currentHuman = 0;
  for (;;) {
    monkeys.set("humn", currentHuman);
    const possibleResult = getValue(monkeys, "root");
    if (possibleResult === 0) {
      return currentHuman;
    }
    currentHuman += Math.abs(Math.ceil(possibleResult / 10)) || 1;
    // fail safe
    if (Math.abs(currentHuman) >= Number.MAX_SAFE_INTEGER) return false;
  }
}

test(p2(testFileContent), 301);
solve(p2(fileContent));
