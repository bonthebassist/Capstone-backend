const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentFirstName: {
        type: String,
        required: true
    },
    studentLastName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    school_id: {
        type: String,
        required: true
    },
    tutor_id: {
        type: String,
        required:true
    },
    instrument: {
        type: String
    },
    yearLevel: {
        type: String
    },
    parentFirstName: {
        type: String,
    },
    parentLastName: {
        type: String,
    },
    parentEmail: {
        type: String,
    },
    lessonType: {
        type:String,
        required: true
    },
    lessonPrice: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("student", studentSchema);