const fs = require("fs");
const path = require("path");

const { sumLines, sum, max } = require('../utils');

// Path valid if running from "js/day01"

const testFileContent = fs.readFileSync(path.resolve('./test.txt'), 'utf-8');
const fileContent = fs.readFileSync(path.resolve('./input.txt'), 'utf-8');

function p1(input) {
    return max(input.split('\n\n').map(sumLines));
}

console.log(`Test input is ${p1(testFileContent) === 24000 ? '' : 'in'}correct!`);
console.log('Results is: ', p1(fileContent));


/**
 * PART 2
 */

 function p2(input) {
    return sum(max(input.split('\n\n').map(sumLines), 3));
}

console.log(`Test input is ${p2(testFileContent) === 45000 ? '' : 'in'}correct!`);
console.log('Results is: ', p2(fileContent));
 