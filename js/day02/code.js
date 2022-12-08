const fs = require("fs");
const path = require("path");

const { sum } = require('../utils');

// Path valid if running from "js/day02"

const testFileContent = fs.readFileSync(path.resolve('./test.txt'), 'utf-8');
const fileContent = fs.readFileSync(path.resolve('./input.txt'), 'utf-8');

function p1(input) {
    return sum(input.split('\n').map((inp) => {
        return {
            'A X': 4, 'A Y': 8, 'A Z': 3,
            'B X': 4, 'B Y': 8, 'B Z': 3,
            'C X': 4, 'C Y': 8, 'C Z': 3,
        }[inp];
    }));
}

console.log(`Test input is ${p1(testFileContent) === 15 ? '' : 'in'}correct!`);
console.log('Results is: ', p1(fileContent));


// /**
//  * PART 2
//  */

 function p2(input) {
    return sum(input.split('\n').map((inp) => {
        return {
            'A X': 3, 'A Y': 4, 'A Z': 8,
            'B X': 1, 'B Y': 5, 'B Z': 9,
            'C X': 2, 'C Y': 6, 'C Z': 7,
        }[inp];
    }));
}

console.log(`Test input is ${p2(testFileContent) === 12 ? '' : 'in'}correct!`);
console.log('Results is: ', p2(fileContent));
