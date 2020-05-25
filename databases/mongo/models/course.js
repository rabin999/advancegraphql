const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String
    },
    courseLength: {
        type: String,
        required: true
    },
    courseNumber: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    modules: [String],
    teachers: [String],
    tag: [String],
    requirements: [String]
}, {
    timestamps: true
})

module.exports = mongoose.model('course', CourseSchema)