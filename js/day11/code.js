const fs = require("fs");
const path = require("path");
const { test, solve, max, chunk } = require("../utils");

// Path valid if running from "js/day11"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

class Monkey {
  constructor(definingLines) {
    this.inspectedItemCount = 0;
    this.name = definingLines[0].slice(0, -1);
    this.items = definingLines[1].match(/\d+/g).map((x) => BigInt(x));
    this.opIncrease = definingLines[2].match(/new = (.+)/)[1];
    this.testConditon = BigInt(definingLines[3].match(/\d+/));
    this.targetOnTrue = +definingLines[4].match(/\d+/);
    this.targetOnFalse = +definingLines[5].match(/\d+/);

    let [v1, op, v2] = this.opIncrease.split(" ");
    if (v1 === v2) {
      if (op === "*") {
        this.increaseWorryLevel = (old) => old * old;
      } else {
        this.increaseWorryLevel = (old) => old + old;
      }
    } else {
      const v = BigInt(v2);
      if (op === "*") {
        this.increaseWorryLevel = (old) => old * v;
      } else {
        this.increaseWorryLevel = (old) => old + v;
      }
    }
  }

  inspectItems(monkeyList, postInspectDivide = 3n, groupMod) {
    const itemsToInspect = [...this.items];
    this.items = [];
    itemsToInspect.map((old) => {
      this.inspectedItemCount += 1;
      const inspectionLevel = this.increaseWorryLevel(
        groupMod ? old % groupMod : old
      );
      const postInspectionLevel = inspectionLevel / postInspectDivide;
      if (postInspectionLevel % this.testConditon == 0) {
        monkeyList[this.targetOnTrue].catchItem(postInspectionLevel);
      } else {
        monkeyList[this.targetOnFalse].catchItem(postInspectionLevel);
      }
    });
  }

  catchItem(item) {
    this.items.push(item);
  }
}

function p1(input) {
  const monkeys = chunk(input.split("\n"), 7).map((lines) => new Monkey(lines));
  for (let round = 0; round < 20; round++) {
    for (let monkey of monkeys) monkey.inspectItems(monkeys);
  }
  return eval(
    max(
      monkeys.map((monkey) => monkey.inspectedItemCount),
      2
    ).join("*")
  );
}

test(p1(testFileContent), 10605);
solve(p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  const monkeys = chunk(input.split("\n"), 7).map((lines) => new Monkey(lines));
  let groupMod = monkeys.reduce((v, c) => v * c.testConditon, 1n);
  for (let round = 0; round < 10000; round++) {
    for (let monkey of monkeys) monkey.inspectItems(monkeys, 1n, groupMod);
  }
  return eval(
    max(
      monkeys.map((monkey) => monkey.inspectedItemCount),
      2
    ).join("*")
  );
}

test(p2(testFileContent), 2713310158);
solve(p2(fileContent));
