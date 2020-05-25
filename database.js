const database = require('./connection-manager')("mongo");
console.log(`Configuring database -> [${__filename}]`);

module.exports = database