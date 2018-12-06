const uppercaseAOrd = 65;
const uppercaseZOrd = 90;
const lowerCaseConversion = 32;

function test() {
    const assert = require('assert');
    const input = 'dabAcCaCBAcCcaDA';
    let partOneSolution = removeDupes(input.split(''));

    let minLength = Infinity;
    let partTwoSolution = '';
    for (let i = uppercaseAOrd; i <= uppercaseZOrd; i++) {
        const firstReduction = removeSinglePair(input, i);
        const finalReduction = removeDupes(firstReduction.split(''));
        if (finalReduction.length < minLength) {
            minLength = finalReduction.length;
            partTwoSolution = finalReduction;
        }
    }
    assert.strictEqual(partOneSolution, 'dabCBAcaDA');
    assert.strictEqual(partTwoSolution, 'daDA');
}

function run(inputRaw) {
    const input = cleanInput(inputRaw);

    let partOneSolution = removeDupes(input.split(''));

    let minLength = Infinity;
    let partTwoSolution = '';
    for (let i = uppercaseAOrd; i <= uppercaseZOrd; i++) {
        const firstReduction = removeSinglePair(input, i);
        const finalReduction = removeDupes(firstReduction.split(''));
        if (finalReduction.length < minLength) {
            minLength = finalReduction.length;
            partTwoSolution = finalReduction;
        }
    }
    console.log(`Part 1: ${partOneSolution.length}`, '10888');
    console.log(`Part 2: ${partTwoSolution.length}`, 6952);

}

function removeSinglePair(charStr, upperOrd) {
    const upper = String.fromCharCode(upperOrd);
    const lower = String.fromCharCode(upperOrd + lowerCaseConversion);
    const regStr = `${upper}|${lower}|${lower}|${upper}`;
    const re = new RegExp(regStr, 'g');
    return charStr.replace(re, '');
}
function removeDupes(charArr) {
    const accumulator = (acc, char) => {
        return Math.abs(acc.substring(acc.length - 1).charCodeAt() - char.charCodeAt()) === lowerCaseConversion ? acc.slice(0, acc.length - 1) : acc + char;
    }
    return charArr.reduce(accumulator, '');
}

function cleanInput(text) {
    return text.trim();
}
module.exports = {
    run,
    test
};
