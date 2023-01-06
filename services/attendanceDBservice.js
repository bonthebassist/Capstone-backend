const User = require("../models/user");
const Student = require("../models/student");
const StudentAttendance = require("../models/studentAttendance");
const School = require("../models/school");


async function postAttendance(req, res) {
    console.log("schoolDBservice postSchool function")
    try {
        // Get attendance input
        const { student_id, tutor_id, school_id, schoolDate, termLength, goalLessonCount, studentName } = req.body;

        // Validate attendance input
        if (!(student_id && tutor_id && school_id && schoolDate && termLength && goalLessonCount && studentName)) {
            res.status(400).send("School name is required");
        }

        // check if attendance document exists
        const oldDoc = await StudentAttendance.findOne({
            student_id: student_id,
            tutor_id: tutor_id,
            school_id: school_id,
            schoolDate: schoolDate,
        });

        if (oldDoc) {
            return res.status(409).send("Attendance document already exists for this school, student, and term");
        }

        //create attendance array objects
        let attendanceArray = []
        for (let i = 0; i < termLength; i++) {
            let weekNo = i + 1
            attendanceArray.push({ week: `${weekNo}`, record: "", notes: "" })
        }
        // Create attendance document in our database
        const attendanceDoc = await StudentAttendance.create({
            student_id: student_id,
            tutor_id: tutor_id,
            school_id: school_id,
            schoolDate: schoolDate,
            termLength: termLength,
            attendance: attendanceArray,
            lessonCount: 0,
            goalLessonCount: goalLessonCount,
            invoiced: false,
            studentName: studentName
        });

        // return new attendance document
        res.status(201).json(attendanceDoc);
    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findAttendanceByST(req, res) {
    console.log("attendanceDBservice findAttendanceByST function")
    try {
        const { student_id, tutor_id, schoolDate } = req.body

        if (!(student_id, tutor_id, schoolDate)) {
            res.status(400).send("student_id, tutor_id, schoolDate are required");
        }

        const attendance = await StudentAttendance.findOne({ student_id: student_id, tutor_id: tutor_id, schoolDate: schoolDate })

        res.status(200).json(attendance)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findAttendanceBySchT(req, res) {
    console.log("attendanceDBservice findAttendanceBySchT  function")
    try {
        const { tutor_id, school_id, schoolDate } = req.body

        if (!(tutor_id && school_id && schoolDate)) {
            res.status(400).send("tutor_id, school_id, schoolDate is required");
        }

        const attendance = await StudentAttendance.find({ school_id: school_id, tutor_id: tutor_id, schoolDate: schoolDate })

        res.status(200).json(attendance)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};


module.exports = {
    postAttendance,
    findAttendanceByST,
    findAttendanceBySchT
}

// "student_id": "63b7f7a635b24a30ea8fceff",
// "tutor_id": "63b7eaf696702fb7d08bea83",
// "school_id": "63b7f37d8f9770b0ab7f80c0",
// "schoolDate": "T12023",
// "termLength": "10",
// "goalLessonCount": "8",
// "invoiced": false,
// "studentName": "Marsha Brown"