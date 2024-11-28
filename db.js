const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isBlank(input) {
    return !input || input.trim() === '';
}

exports.rl = rl;
exports.isBlank = isBlank;