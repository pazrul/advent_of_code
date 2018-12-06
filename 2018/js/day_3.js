function test() {
    const assert = require('assert');

    const input = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];
    const formatted_input = input.map(item => convertToOle(item));
    const grid = buildOverlapGrid(formatted_input);
    const firstTotal = Object.values(grid).filter(val => val >= 2).length;
    assert.strictEqual(firstTotal, 4);

    const nonOverlappingId = findNonOverlap(grid, formatted_input);
    assert.strictEqual(nonOverlappingId, '3');
}

function run(inputRaw) {
    const input = cleanInput(inputRaw);

    const formatted_input = input.map(item => convertToOle(item));
    const grid = buildOverlapGrid(formatted_input);

    const nonOverlappingId = findNonOverlap(grid, formatted_input);

    console.log(`Answer 1: ${Object.values(grid).filter(val => val >= 2).length}`);
    console.log(`Anser 2: ${nonOverlappingId}`);
};


function convertToOle(ole_str) {
    const matches = new RegExp(/#(?<id>\d+) @ (?<offsetX>\d+),(?<offsetY>\d+): (?<width>\d+)x(?<height>\d+)/).exec(ole_str);
    return {
        id: matches.groups.id,
        offsetX: parseInt(matches.groups.offsetX, 10),
        offsetY: parseInt(matches.groups.offsetY, 10),
        width: parseInt(matches.groups.width, 10),
        height: parseInt(matches.groups.height, 10),
    }
}

function buildOverlapGrid(ole_list) {
    let grid = {};

    ole_list.forEach((ole) => {
        const width = ole.width;
        const height = ole.height;

        for (let i = 0; i < width; i++) {
            const left = ole.offsetX + i;

            for (let j = 0; j < height; j++) {
                const top = ole.offsetY + j;
                try {
                    const key = `${left},${top}`;
                    grid[key] = (grid[key] !== undefined) ? grid[key] + 1 : 1;
                } catch (e) {
                    console.log(`error! left: ${left} top: ${top}`);
                }
            }
        }
    });

    return grid;
}

function findNonOverlap(grid, inputData) {
    for (var itemIdx = 0; itemIdx < inputData.length; itemIdx++) {
        const item = inputData[itemIdx];
        let patches = new Set();
        for (let i = 0; i < item.width; i++) {
                let left = item.offsetX + i;

                for (let j = 0; j < item.height; j++) {
                    let top = item.offsetY + j;
                    const key = `${left},${top}`;
                    patches.add(grid[key]); 
                }
        }

        if (patches.size === 1 && patches.has(1)) {
              return item.id;
        }
    }
    return 'Not found!';
}

function cleanInput(text) {
    return text.split('\n').filter(i => i !== '');
}


module.exports = {
    run,
    test
}
