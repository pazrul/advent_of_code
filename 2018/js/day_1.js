const fs = require('fs');
const path = require('path');
const inputPath = path.join(__dirname, '../day_1_input.txt');
const inputRaw = fs.readFileSync(inputPath, 'utf8');

const inputArray = cleanInput(inputRaw);


function sum(arr) {
    const reducer = (collector, current) => collector + current;
    return arr.reduce(reducer, 0);
}

console.log(`Answer to Part 1: ${sum(inputArray)}`);

function findSecondInstance(arr) {
    let total = 0;
    let previousValues = [ total ];
    let found = false;
    let secondInstance;

    while (found === false) {
        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
            if (previousValues.includes(total)) {
                found = true;
                secondInstance = total;
                break;
            }
            previousValues.push(total);
        }
    }
    return secondInstance;
}
const test1 = '+1\n-1';
const test2 = '+3\n+3\n+4\n-2\n-4';
const test3 = '-6\n+3\n +8\n +5\n-6';
const test4 = '+7\n +7\n -2\n -7\n-4';
try {
    if (findSecondInstance(cleanInput(test1)) !== 0) {
        throw new Error('test1');
    }
    if (findSecondInstance(cleanInput(test2)) !== 10) {
        throw new Error('test1');
    }
    if (findSecondInstance(cleanInput(test3)) !== 5) {
        throw new Error('test1');
    }
    if (findSecondInstance(cleanInput(test4)) !== 14) {
        throw new Error('test1');
    }
} catch (e) {
    console.log(e);
}

console.log(`Answer to Part 2: ${findSecondInstance(inputArray)}`);


function cleanInput(text) {
    const baseTen = 10;
    return text.replace(/\+/g, '').split('\n').map(i => parseInt(i.trim(), baseTen)).filter(i => isNaN(i) === false);
}
