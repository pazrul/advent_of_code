function run() {
    const fileLoader = require('./file-loader.js');
    inputRaw = fileLoader.openFile('../day_1_input.txt');
    const inputArray = cleanInput(inputRaw);

    console.log(`Answer to Part 1: ${sum(inputArray)}`);
    console.log(`Answer to Part 2: ${findSecondInstance(inputArray)}`);
}

function test() {
    const assert = require('assert');
    const part1Test1 = '+1\n+1\n+1\n';
    const part1Test2 = '+1\n+1\n-2\n';
    const part1Test3 = '-1\n-2\n-3\n';

    const part2Test1 = '+1\n-1';
    const part2Test2 = '+3\n+3\n+4\n-2\n-4';
    const part2Test3 = '-6\n+3\n +8\n +5\n-6';
    const part2Test4 = '+7\n +7\n -2\n -7\n-4';
    try {
        assert.strictEqual(sum(cleanInput(part1Test1)), 3);
        assert.strictEqual(sum(cleanInput(part1Test2)), 0);
        assert.strictEqual(sum(cleanInput(part1Test3)), -6);

        assert.strictEqual(findSecondInstance(cleanInput(part2Test1)), 0);
        assert.strictEqual(findSecondInstance(cleanInput(part2Test2)), 10);
        assert.strictEqual(findSecondInstance(cleanInput(part2Test3)), 5);
        assert.strictEqual(findSecondInstance(cleanInput(part2Test4)), 14);

        console.log('All Tests Passed');
    } catch (e) {
        console.log(e, 'Test Failed');
    }
}



function sum(arr) {
    const reducer = (collector, current) => collector + current;
    return arr.reduce(reducer, 0);
}

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

function cleanInput(text) {
    const baseTen = 10;
    return text.replace(/\+/g, '').split('\n').map(i => parseInt(i.trim(), baseTen)).filter(i => isNaN(i) === false);
}

module.exports = {
    run,
    test
}
