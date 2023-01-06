const User = require("../models/user");
const Student = require("../models/student");
const StudentAttendance = require("../models/studentAttendance");
const School = require("../models/school");
const studentModel = require('../models/student.js');

async function postStudent(req, res) {
    console.log("schoolDBservice postSchool function")
    try {
        // Get student input
        const {
            studentFirstName,
            studentLastName,
            studentEmail,
            school_id,
            tutor_id,
            instrument,
            yearLevel,
            parentFirstName,
            parentLastName,
            parentEmail,
            lessonType,
            lessonPrice
        } = req.body;

        // Validate user input
        if (!(studentFirstName && studentLastName && studentEmail && school_id && tutor_id && instrument && lessonType && lessonPrice)) {
            res.status(400).send("Required fields are undefined");
        }

        // check if student already exists
        const oldStudent = await Student.findOne({
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            tutor_id: tutor_id,
            school_id: school_id
        });

        if (oldStudent) {
            return res.status(409).send("Student Already Exists. Please update existing student");
        }

        // Create student in our database
        const student = await Student.create({
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            studentEmail: studentEmail,
            school_id: school_id,
            tutor_id: tutor_id,
            instrument: instrument,
            yearLevel: yearLevel,
            parentFirstName: parentFirstName,
            parentLastName: parentLastName,
            parentEmail: parentEmail,
            lessonType: lessonType,
            lessonPrice: lessonPrice
        });

        // return new student
        res.status(201).json(student);
    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};


module.exports = {
    postStudent
}

// "studentFirstName": "Marsha",
//     "studentLastName": "Brown",
// "studentEmail": "marsha@schools.edu.au",
//     "school_id": "63b7f37d8f9770b0ab7f80c0",
// "tutor_id": "63b7eaf696702fb7d08bea83",
//     "instrument": "bass",
// "yearLevel": "9",
//     "parentFirstName": "Mark",
// "parentLastName": "Brown",
//     "parentEmail": "mark.brown@email.com",
// "lessonType": "Individual 30 minutes",
//     "lessonPrice": "32"