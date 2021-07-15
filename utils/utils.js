// console.log('utils.js');

const name = 'hthis';

const add = function (a, b) {
    return a + b
}
module.exports.add = add;

const logMessage = function (message) {
    console.log(message);
}

module.exports.log = logMessage;
