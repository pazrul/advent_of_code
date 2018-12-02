const fileLoader = require('./file-loader.js');
const inputRaw = fileLoader.openFile('../day_2_input.txt');
const inputArr = cleanInput(inputRaw);

const inputMatches = findMatches(inputArr);
const inputChecksum = makeChecksum(inputMatches);
console.log(inputChecksum);


// const testInput = 'abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab\n';
// const testArr = cleanInput(testInput);
// const matchesResult = findMatches(testArr);
// const checksumResult = makeChecksum(matchesResult);
// console.log(`${checksumResult} is equal to 12`);

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

/*
test Values
const testInput = 'abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz';
const testArr = cleanInput(testInput);
const testHash = findSimilarHashes(testArr);
const overlapLetters = findSameChars(testHash);
console.log(overlapLetters);
*/

/* Part 2 */
const secondHash = findSimilarHashes(inputArr);
const overlapLetters = findSameChars(secondHash);
console.log(overlapLetters.join(''));

function findSimilarHashes(hashArr) {
    let matchObj = { firstValue: -1, secondValue: -1 };
    for (let i = 0; i < hashArr.length; i++) {
        console.log(i);
        const mainHash = hashArr[i];
        for (let j = i; j < hashArr.length; j++) {
            if (compareStrings(mainHash, hashArr[j]) === mainHash.length - 1) {
                console.log('we got one!', mainHash, hashArr[j]);
                matchObj.firstValue = mainHash;
                matchObj.secondValue = hashArr[j];
                break;
            } else {
                console.log(mainHash, hashArr[j]);
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
    console.log(matchObj)
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
