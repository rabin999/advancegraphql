const Book = require('./databases/mongo/models/book');
const Author = require('./databases/mongo/models/author');
const getMongooseSelectionFromSelectedFields = require("./databases/mongo/get-selection-from-selected-fields");

module.exports = {
    libraries: (parent, args) => {
        return [
            { branch: "science", books: [] },
            { branch: "math", books: [] },
        ]
    },
    books: (parent, args, context, info) => {
        console.log(args)
        const mongooseSelection = getMongooseSelectionFromSelectedFields(info);
        return Book.find({}).select(mongooseSelection).limit(50).lean().exec()
    },
    authors: (parent, args, context, info) => {
        const mongooseSelection = getMongooseSelectionFromSelectedFields(info);
        return Author.find({}).select(mongooseSelection).limit(50).lean().exec()
    },
    author: (parent, args, context, info) => {
        const mongooseSelection = getMongooseSelectionFromSelectedFields(info);
        return Author.findOne({}).select(mongooseSelection).limit(1).lean().exec()
    },
    book: (parent, args, context, info) => {
        const mongooseSelection = getMongooseSelectionFromSelectedFields(info);
        return Book.findOne({}).select(mongooseSelection).limit(1).lean().exec()
    }
}