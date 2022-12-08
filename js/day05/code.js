const fs = require("fs");
const path = require("path");

// Path valid if running from "js/day05"

const testFileContent = fs.readFileSync(path.resolve('./test.txt'), 'utf-8');
const fileContent = fs.readFileSync(path.resolve('./input.txt'), 'utf-8');

function p1(input) {
    const [initialStack, instructions] = input.split('\n\n');
    const stack = [];
    initialStack.split('\n').map(line => {
        [...line].map((y,i) => {
            const index = (i/4|0)+1;
            stack[index] ||= [];
            /\w/.test(y) && stack[index].unshift(y);
        });
    });
    instructions.split('\n').map(x=>{
        let [a,f,t]=x.match(/\d+/g);
        for(;a--;) {
            const p = stack[f].pop();
            if (p) stack[t].push(p);
        }
    })
    return stack.map(c=>c.at(-1)).join('');
}

console.log(`Test input is ${p1(testFileContent) === 'CMZ' ? '' : 'in'}correct!`);
console.log('Results is: ', p1(fileContent));


// /**
//  * PART 2
//  */

function p2(input) {
    const [initialStack, instructions] = input.split('\n\n');
    const stack = [];
    initialStack.split('\n').map(line => {
        [...line].map((y,i) => {
            const index = (i/4|0)+1;
            stack[index] ||= [];
            /\w/.test(y) && stack[index].unshift(y);
        });
    });
    instructions.split('\n').map(x=>{
        let [a,f,t]=x.match(/\d+/g);
        stack[t].push(...stack[f].splice(-a));
    });
    return stack.map(c=>c.at(-1)).join('');
}

console.log(`Test input is ${p2(testFileContent) === 'MCD' ? '' : 'in'}correct!`);
console.log('Results is: ', p2(fileContent));
