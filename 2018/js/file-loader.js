const fs = require('fs');
const path = require('path');

function openFile(filePath) {
    const inputPath = path.join(__dirname, filePath);
    const inputRaw = fs.readFileSync(inputPath, 'utf8');
    return inputRaw;
}
module.exports = {
    openFile
}
