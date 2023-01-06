const userData = require('../services/userDBservice.js')
const schoolData = require('../services/schoolDBservice.js')
const studentData = require('../services/studentDBservice.js') 
const attendanceData = require('../services/attendanceDBservice.js') 

const addSchool = async (req, res) => {
    console.log("userController addSchool function")
    let update = await schoolData.postSchool(req, res)
}

const addStudent = async (req, res) => {
    console.log("userController addSchool function")
    let update = await studentData.postStudent(req, res)
}

const addAttendance = async (req, res) => {
    console.log("userController addSchool function")
    let update = await attendanceData.postAttendance(req, res)
}

module.exports = {
    addSchool,
    addStudent,
    addAttendance
}