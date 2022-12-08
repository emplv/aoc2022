const fs = require("fs");
const path = require("path");

const { sum } = require("../utils");

// Path valid if running from "js/day04"

const testFileContent = fs.readFileSync(path.resolve('./test.txt'), 'utf-8');
const fileContent = fs.readFileSync(path.resolve('./input.txt'), 'utf-8');

function p1(input) {
    return sum(input.split('\n').map(line => {
        const [s1,e1,s2,e2] = line.match(/\d+/g).map(x => +x);
        return (s1 >= s2 && e1 <= e2) || (s2 >= s1 && e2 <= e1);
    }));
}

console.log(`Test input is ${p1(testFileContent) === 2 ? '' : 'in'}correct!`);
console.log('Results is: ', p1(fileContent));


// /**
//  * PART 2
//  */

function p2(input) {
    return sum(input.split('\n').map(line => {
        const [s1,e1,s2,e2] = line.match(/\d+/g).map(x => +x);
        return (s1 >= s2 && s1 <= e2) || (e1 >= s2 && e1 <= s2) || (s2 >= s1 && s2 <= e1) || (e2 >= s1 && e2 <= s1);
    }));
}

console.log(`Test input is ${p2(testFileContent) === 4 ? '' : 'in'}correct!`);
console.log('Results is: ', p2(fileContent));
 