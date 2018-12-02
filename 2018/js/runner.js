const targetArg = process.argv[2];
const isTest = Boolean(process.env.IS_TEST);
const dayModule = getModule(targetArg)

if (isTest) {
    dayModule.test();
} else {
    dayModule.run();
}

function getModule(fileName) {
    fileName = fileName.endsWith('.js') ? `./${fileName}` : `./${fileName}.js`;
    return require(fileName);
}
