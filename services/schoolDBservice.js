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

async function findSchools(req, res) {
    console.log("schoolDBservice findSchools function")
    try {
        const { tutor_id } = req.body

        if (!tutor_id) {
            res.status(400).send("tutor_id is required");
        }

        const schools = await School.find({ tutor_id: tutor_id })

        res.status(200).json(schools)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findSchool(req, res) {
    console.log("schoolDBservice findSchool function")
    try {
        const { school_id } = req.body

        if (!school_id) {
            res.status(400).send("school_id is required");
        }

        const school = await School.findOne({ _id: school_id })

        res.status(200).json(school)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

module.exports = {
    postSchool,
    findSchools,
    findSchool
}   