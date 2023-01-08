const userData = require('../services/userDBservice.js')
const schoolData = require('../services/schoolDBservice.js')
const studentData = require('../services/studentDBservice.js') 
const attendanceData = require('../services/attendanceDBservice.js') 

//post requests
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

//Get requests
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

const getStudentByName = async (req, res) => {
    console.log("userCOntroller getStudentByName function")
    let student = await studentData.findStudentByName(req, res)
}

const getAttendanceST = async (req, res) => {
    console.log("userController getAttendanceST function")
    let students = await attendanceData.findAttendanceByST(req, res)
}

const getAttendanceSchT = async (req, res) => {
    console.log("userController getAttendanceSchT function")
    let students = await attendanceData.findAttendanceBySchT(req, res)
}

const getAttendanceTutor = async (req, res) => {
    let attendances = await attendanceData.findAttendanceByTutor(req, res)

    let newArray = attendances.map((school)=>school._id)
    console.log(newArray)
    let bigArray = []
    for (let i=0; i<attendances; i++){
        console.log(attendances[i].school_id)
        for (let j=0; j<newArray; j++){
            let newArray2 = []
            if (attendances[i].school_id === newArray[j]){
                newArray2.push(attendances[i])
            }
            bigArray.push(newArray2)
        }
    }
    res.status(200).json(attendances)
}

//Deletions
const removeUser = async (req, res) => {
    console.log("userController removeUser function")
    let deletion = await userData.deleteUser(req, res)
}

const removeSchool = async (req, res) => {
    console.log("userController removeSchool function")
    let deletion = await schoolData.deleteSchool(req, res)
}

const removeStudent = async (req, res) => {
    console.log("userController removeStudent function")
    let deletion = await studentData.deleteStudent(req, res)
}

const removeAttendance = async (req, res) => {
    console.log("userController removeAttendance function")
    let deletion = await attendanceData.deleteAttendance(req, res)
}

//updates
const shadowStudent = async (req, res) => {
    console.log("userController shadowStudent function")
    let update = await studentData.studentInactive(req, res)
}

const shadowSchool = async (req, res) => {
    console.log("userController shadowSchool function")
    let update = await schoolData.schoolInactive(req, res)
}

const editUserDetails = async (req, res) => {
    console.log("userController editUserDetails function")
    let update = await userData.updateUserDetails(req, res)
}

const editUserMessages = async (req, res) => {
    console.log("userController editUserMessages function")
    let update = await userData.updateUserMessages(req, res)
}

const editStudentDetails = async (req, res) => {
    console.log("userController editStudentDetails function")
    let update = await studentData.updateStudentDetails(req, res)
}

const editAttendanceDetails = async (req, res) => {
    console.log("userController editAttendanceDetails function")
    let update = await attendanceData.updateAttendanceDetails(req,res)
}

const editInvoiced = async (req, res) => {
    console.log("userController editAttendanceInvoiced function")
    let update = await attendanceData.updateAttendanceInvoiced(req,res)
}

const inputRecord = async (req, res) => {
    console.log("userController inputRecord function")
    let update = await attendanceData.updateAttendanceRecord(req,res)
}

const editSchoolDetails = async (req, res) => {
    console.log("userController editSchoolDetails function")
    let update = await schoolData.updateSchoolDetails(req,res)

}

const addSchoolAdmin = async (req, res) => {
    console.log("userController addSchoolAdmin function")
    let update = await schoolData.updateAddAdmin(req,res)
}

const addSchoolLink = async (req, res) => {
    console.log("userController addSchoolLink function")
    let update = await schoolData.updateLinksAdd(req,res)
}

const deleteSchoolAdmin = async (req, res) => {
    console.log("userController deleteSchoolAdmin function")
    let update = await schoolData.updateDeleteAdmin(req,res)
}

const deleteSchoolLink = async (req, res) => {
    console.log("userController deleteSchoolLink function")
    let update = await schoolData.updateLinksDelete(req,res)
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
    getStudentByName,
    getAttendanceST,
    getAttendanceSchT,
    getAttendanceTutor,
    removeUser,
    removeSchool,
    removeStudent,
    removeAttendance,
    shadowStudent,
    shadowSchool,
    editUserDetails,
    editUserMessages,
    editStudentDetails,
    editAttendanceDetails,
    editInvoiced,
    inputRecord,
    editSchoolDetails,
    addSchoolAdmin,
    addSchoolLink,
    deleteSchoolAdmin,
    deleteSchoolLink
}