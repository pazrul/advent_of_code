function run() {
    const fileLoader = require('./file-loader.js');
    const inputRaw = fileLoader.openFile('../day_2_input.txt');
    const inputArr = cleanInput(inputRaw);

    const inputMatches = findMatches(inputArr);
    const inputChecksum = makeChecksum(inputMatches);
    console.log(`Answer to Part 1: ${inputChecksum}`);

    const secondHash = findSimilarHashes(inputArr);
    const overlapLetters = findSameChars(secondHash);
    console.log(`Answer to Part 2: ${overlapLetters.join('')}`);
}

function test() {
    const assert = require('assert');
    try {
        const testInput1 = 'abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab\n';
        const test1Arr = cleanInput(testInput1);
        const matchesResult = findMatches(test1Arr);
        const checksumResult = makeChecksum(matchesResult);
        assert.strictEqual(checksumResult, 12);


        const testInput2 = 'abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz';
        const test2Arr = cleanInput(testInput2);
        const testHash = findSimilarHashes(test2Arr);
        const overlapLetters = findSameChars(testHash);
        assert.strictEqual(overlapLetters.join(''), 'fgij');
        console.log('All Tests Passed');
    } catch (e) {
        console.log(e);
    }
}


function findMatches(inputArr) {
    let result = {
        hasTwo: [],
        hasThree: []
    };
    inputArr.forEach(val => {
        let charMap = {};
        val.split('').forEach(char => {
            charMap[char] = charMap[char] || 0;
            charMap[char] += 1;
        });
        Object.keys(charMap).forEach((letterKey) => {
            if (charMap[letterKey] === 2 && result.hasTwo.includes(val) === false) {
                result.hasTwo.push(val);
            } else if (charMap[letterKey] === 3 && result.hasThree.includes(val) === false) {
                result.hasThree.push(val);
            }
        });
    });

    return result;
}

function makeChecksum(resultObj) {
    return resultObj.hasTwo.length * resultObj.hasThree.length;
}



/* Part 2 */


function findSimilarHashes(hashArr) {
    let matchObj = { firstValue: -1, secondValue: -1 };
    for (let i = 0; i < hashArr.length; i++) {
        const mainHash = hashArr[i];
        for (let j = i; j < hashArr.length; j++) {
            if (compareStrings(mainHash, hashArr[j]) === mainHash.length - 1) {
                matchObj.firstValue = mainHash;
                matchObj.secondValue = hashArr[j];
                break;
            }
        }
        if (matchObj.firstValue !== -1) {
            break;
        }
    }
    return matchObj;
}

function compareStrings(first, second) {
    const firstChars = first.split('');
    const secondChars = second.split('');
    let matchingChars = 0;
    if (firstChars.length !== secondChars.length) {
        return -1;
    }
    firstChars.forEach((char, idx) => {
        if (secondChars[idx] === char) {
            matchingChars += 1;
        }
    });
    return matchingChars;
}

function findSameChars(matchObj) {
    let matchedLetters = [];
    matchObj.firstValue.split('').forEach((char, idx) => {
        if (char === matchObj.secondValue[idx]) {
            matchedLetters.push(char);
        }
    });
    return matchedLetters;
}


function cleanInput(text) {
    return text.split('\n').filter(i => i !== '');
}

module.exports = {
    run,
    test
}
