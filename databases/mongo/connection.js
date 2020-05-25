const config    = require("../../config")
const mongoose  = require('mongoose');

module.exports = function (opts = {}) {
    return mongoose.connect(config.db.connectionURL, {
        ...opts,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

mongoose.connection.once('open', () => {
    console.log('connected to database')
});