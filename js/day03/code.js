const fs = require("fs");
const path = require("path");

const { sum } = require("../utils");

// Path valid if running from "js/day03"

const testFileContent = fs.readFileSync(path.resolve('./test.txt'), 'utf-8');
const fileContent = fs.readFileSync(path.resolve('./input.txt'), 'utf-8');

function p1(input) {
    return sum(input.split('\n').map(line => {
        const length = line.length;
        const first = line.slice(0, length/2);
        const second = line.slice(length/2);
        const uniqueItemsInFirst = new Set([...first]);
        const uniqueItemsInSecond = new Set([...second]);
        const commonItems = [...uniqueItemsInFirst].filter(item => uniqueItemsInSecond.has(item));
        return commonItems.map(x => parseInt(x, 36) - 9 + (x < {} ? 26 : 0));
    }).flat());
}

console.log(`Test input is ${p1(testFileContent) === 157 ? '' : 'in'}correct!`);
console.log('Results is: ', p1(fileContent));


// /**
//  * PART 2
//  */

function p2(input) {
    return sum(input.match(/.+\n.+\n.+(\n|$)/g).map(group => {
        const lines = group.trim().split('\n');
        const dict = new Set([...lines[0]+lines[1]+lines[2]]);
        const badge = 
            [...dict].find(x=>lines[0].includes(x) & lines[1].includes(x) & lines[2].includes(x)) || 
            [...dict].find(x=>lines[0].includes(x) + lines[1].includes(x) + lines[2].includes(x) >= 2);
        return parseInt(badge, 36) - 9 + (badge < {} ? 26 : 0);
    }).flat());
}

console.log(`Test input is ${p2(testFileContent) === 70 ? '' : 'in'}correct!`);
console.log('Results is: ', p2(fileContent));
