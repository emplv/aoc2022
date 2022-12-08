const fs = require("fs");
const path = require("path");

// Path valid if running from "js/day07"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

function createDir(path) {
  return { path, type: "dir", size: 0, children: [] };
}
function createFile(path, size) {
  return { path, type: "file", size };
}

function createFileSystem(input) {
  const fs = createDir("/");
  const cdStack = [fs];
  input
    .split("\n")
    .slice(1)
    .map((line) => {
      const currentDir = cdStack.at(-1);
      if (line[0] === "$") {
        // first handle commands
        const [, cmd, path] = line.split(" ");
        switch (cmd) {
          case "cd": {
            switch (path) {
              case "/": {
                cdStack = [fs];
                break;
              }
              case "..": {
                cdStack.pop();
                if (cdStack.length === 0) cdStack = [fs]; // prevent from going outside of system \_o_/
                break;
              }
              default: {
                const cdDir = currentDir.children.find(
                  (dir) => dir.path === path
                );
                if (cdDir) {
                  cdStack.push(cdDir);
                } else {
                  const dir = createDir(path);
                  currentDir.children.push(dir);
                  cdStack.push(dir);
                }
                break;
              }
            }
            break;
          }
          case "ls": {
            break;
          }
        }
      } else {
        const [size, filename] = line.split(" ");
        if (size === "dir") {
          if (!currentDir.children.some((dir) => dir.path === filename)) {
            currentDir.children.push(createDir(filename));
          }
        } else {
          currentDir.children.push(createFile(filename, +size));
          cdStack.map((dir) => (dir.size += +size));
        }
      }
    });
  return fs;
}

function p1(input) {
  const fs = createFileSystem(input);
  let sum = 0;
  function loopOverDirs(dir) {
    if (dir.type === "dir" && dir.size <= 100000) sum += dir.size;
    dir.children?.map(loopOverDirs);
  }
  loopOverDirs(fs);
  return sum;
}

console.log(
  `Test input is ${p1(testFileContent) === 95437 ? "" : "in"}correct!`
);
console.log("Results is: ", p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
  const totalSpace = 70000000;
  const needForUpdate = 30000000;
  const fs = createFileSystem(input);
  const freeSpace = totalSpace - fs.size;
  const needToFreeUp = needForUpdate - freeSpace;
  let candidates = [];
  function loopOverDirs(dir) {
    if (dir.type === "dir" && dir.size >= needToFreeUp)
      candidates.push(dir.size);
    dir.children?.map(loopOverDirs);
  }
  loopOverDirs(fs);
  return candidates.sort((a, b) => a - b)[0];
}

console.log(
  `Test input is ${p2(testFileContent) === 24933642 ? "" : "in"}correct!`
);
console.log("Results is: ", p2(fileContent));
