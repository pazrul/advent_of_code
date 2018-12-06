const targetArg = process.argv[2];
const isTest = Boolean(process.env.IS_TEST);
const dayModule = getModule(targetArg)

if (isTest) {
    try {
        dayModule.test();
        console.log('All Tests Passed');
    } catch (e) {
        console.log(e);
    }
} else {
    const fileLoader = require('./file-loader.js');
    const inputRaw = fileLoader.openFile(`../${targetArg}_input.txt`);
    console.time(targetArg);
    dayModule.run(inputRaw);
    console.timeEnd(targetArg);
}


function getModule(fileName) {
    fileName = fileName.endsWith('.js') ? `./${fileName}` : `./${fileName}.js`;
    return require(fileName);
}
