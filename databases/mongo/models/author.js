const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: mongoose.SchemaTypes.String,
    age: mongoose.SchemaTypes.Number,
});

module.exports = mongoose.model('Author', authorSchema);