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

const getUser = async (req, res) => {
    console.log("userController getUser function")
    let user = await userData.findUser(req, res)
}

const getSchools = async (req, res) => {
    console.log("userController getSchools function")
    let schools = await schoolData.findSchools(req, res)
}

const getSchool = async (req, res) => {
    console.log("userController getSchool function")
    let school = await schoolData.findSchool(req, res)
}

const getStudents = async (req, res) => {
    console.log("userController getStudents function")
    let students = await studentData.findStudents(req, res)
}

const getStudent = async (req, res) => {
    console.log("userController getStudent function")
    let students = await studentData.findStudent(req, res)
}

const getStudentsBySchool = async (req, res) => {
    console.log("userController getStudentsBySchool function")
    let students = await studentData.findStudentsBySchool(req, res)
}

const getAttendanceST = async (req, res) => {
    console.log("userController getAttendanceST function")
    let students = await attendanceData.findAttendanceByST(req, res)
}

const getAttendanceSchT = async (req, res) => {
    console.log("userController getAttendanceSchT function")
    let students = await attendanceData.findAttendanceBySchT(req, res)
}

module.exports = {
    addSchool,
    addStudent,
    addAttendance,
    getUser,
    getSchools,
    getSchool,
    getStudents,
    getStudent,
    getStudentsBySchool,
    getAttendanceST,
    getAttendanceSchT
}