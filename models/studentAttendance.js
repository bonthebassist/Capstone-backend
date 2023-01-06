const mongoose = require("mongoose");

const studentAttendanceSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true
    },
    tutor_id: {
        type: String,
        required: true
    },
    school_id: {
        type: String,
        required: true
    },
    studentName:{
        type: String,
        required: true
    },
    schoolDate: {
        type: String,
        required: true
    },
    termLength: {
        type: String,
        required: true
    },
    attendance: [],
    lessonCount: {
        type: String,
        required: true
    },
    goalLessonCount: {
        type: String,
        required: true
    },
    invoiced: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("studentAttendance", studentAttendanceSchema);