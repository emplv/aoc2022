const fs = require("fs");
const path = require("path");

// Path valid if running from "js/day06"

const testFileContent = fs.readFileSync(path.resolve("./test.txt"), "utf-8");
const fileContent = fs.readFileSync(path.resolve("./input.txt"), "utf-8");

function p1(input) {
    // for(i in input)if(!/(.).*\1/.test(input.substr(i,4)))return+i+4;
    for(i in input)if(!/(.).*\1/.test(input.substr(i,4)))return+i+4;
}

p1=input=>[...input].findIndex((_,i)=>!/(.).*(\1)/.test(input.substr(i,4)))+4
p1=input=>{for(i in input)if(!/(.).*\1/.test(input.substr(i,4)))return+i+4}
p1=input=>[...input].find(_=>!/(.).*(\1)/.test(input.slice(++i-4,i)),i=3)|i

console.log(`Test input is ${p1(testFileContent) === 10 ? "" : "in"}correct!`);
console.log("Results is: ", p1(fileContent));

// /**
//  * PART 2
//  */

function p2(input) {
    for(i in input)if (new Set([...input.substr(i,14)]).size===14) {p=+i;break};
    return p+14;
}

console.log(`Test input is ${p2(testFileContent) === 29 ? "" : "in"}correct!`);
console.log("Results is: ", p2(fileContent));
