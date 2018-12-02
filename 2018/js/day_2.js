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
    console.log(`2: ${result.hasTwo}, 3: ${result.hasThree}`);

    return result;
}

function makeChecksum(resultObj) {
    return resultObj.hasTwo.length * resultObj.hasThree.length;
}

// console.log();

function cleanInput(text) {
    return text.split('\n').filter(i => i !== '');
} 
/*
abcdef contains no letters that appear exactly two or three times.
bababc contains two a and three b, so it counts for both.
abbcde contains two b, but no letter appears exactly three times.
abcccd contains three c, but no letter appears exactly two times.
aabcdd contains two a and two d, but it only counts once.
abcdee contains two e.
ababab
*/
