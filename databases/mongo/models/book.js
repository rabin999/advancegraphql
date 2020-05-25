const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: mongoose.SchemaTypes.String,
    genre: mongoose.SchemaTypes.String,
    authorId: mongoose.SchemaTypes.String,
});

module.exports = mongoose.model('Book', bookSchema)