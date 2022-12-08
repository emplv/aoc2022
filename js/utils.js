const sum = arr => arr.reduce((sum, item) => sum + +item, 0);
const sumLines = string => eval(string.replace(/\n/g,'+'));
const sort = (arr, asc = false) => [...arr].sort((a,b)=> asc ? a-b : b-a);
const max = (arr, count = 1) => count === 1 ? Math.max(...arr) : sort(arr).slice(0, count);
const min = (arr, count = 1) => count === 1 ? Math.min(...arr) : sort(arr, true).slice(0, count);
const chunk = (arr, chunkSize = 1) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

module.exports ={
    sum,
    sumLines,
    max,
    min,
    sort,
    chunk,
};