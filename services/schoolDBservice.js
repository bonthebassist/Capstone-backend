const User = require("../models/user");
const Student = require("../models/student");
const StudentAttendance = require("../models/studentAttendance");
const School = require("../models/school");
const studentModel = require('../models/student.js');

async function postSchool(req, res) {
    console.log("schoolDBservice postSchool function")
    try {
        // Get school input
        const { schoolName, schoolAdmin, usefulLinks, schoolColor, tutor_id } = req.body;

        // Validate user input
        if (!schoolName) {
            res.status(400).send("School name is required");
        }

        // check if school already exists
        const oldSchool = await School.findOne({ schoolName: schoolName, tutor_id: tutor_id });

        if (oldSchool) {
            return res.status(409).send("School Already Exists. Please update existing school");
        }

        // Create school in our database
        const school = await School.create({
            tutor_id: tutor_id,
            schoolName: schoolName,
            schoolAdmin: [schoolAdmin],
            usefulLinks: [usefulLinks],
            schoolColor: schoolColor
        });

        // return new user
        res.status(201).json(school);
    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};


module.exports = {
    postSchool
}   