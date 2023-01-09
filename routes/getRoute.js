var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const auth = require("../middleware/auth");

router.get('/userById', auth, function (req, res){
    userController.getUser(req,res)
    //returns json object of matching user
})

router.get('/schoolsBytutorID', auth, function (req, res){
    userController.getSchools(req,res)
    //returns array of all schools that match tutor_id
})

router.get('/schoolByID', auth, function (req, res){
    userController.getSchool(req,res)
    //returns json object of matching school
})

router.get('/studentsBytutorID', auth, function (req, res){
    userController.getStudents(req,res)
    //returns array of all students that match tutot_id
})

router.get('/studentByID', auth, function (req, res){
    userController.getStudent(req,res)
    //returns json object of matching student
})

router.get('/studentByName', auth, function (req, res){
    userController.getStudentByName(req,res)
    //returns json object of matching student
})

router.get('/studentsBySchoolName', auth, function (req, res){
    userController.getStudentsBySchool(req,res)
    //returns an array of students that match school name and tutor_id
})

router.get('/attendanceByStudent', auth, function (req, res){
    userController.getAttendanceST(req,res)
    //returns a json object of student attendances matched by student_id
})

router.get('/attendanceBySchool', auth, function (req, res){
    userController.getAttendanceSchT(req,res)
    //returns an array holding arrays of student attendances by tutor_id
})

router.get('/attendanceByTutor', auth, function (req, res){
    userController.getAttendanceTutor(req,res)
    //returns an array holding arrays of student attendances by tutor_id
})
module.exports = router;