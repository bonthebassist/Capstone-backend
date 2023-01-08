var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const auth = require("../middleware/auth");

router.get('/userById', auth, function (req, res){
    userController.getUser(req,res)
})

router.get('/schoolsBytutorID', auth, function (req, res){
    userController.getSchools(req,res)
})

router.get('/schoolByID', auth, function (req, res){
    userController.getSchool(req,res)
})

router.get('/studentsBytutorID', auth, function (req, res){
    userController.getStudents(req,res)
})

router.get('/studentByID', auth, function (req, res){
    userController.getStudent(req,res)
})

router.get('/studentByName', auth, function (req, res){
    userController.getStudentByName(req,res)
})

router.get('/studentsBySchoolName', auth, function (req, res){
    userController.getStudentsBySchool(req,res)
})

router.get('/attendanceByStudent', auth, function (req, res){
    console.log('/attendanceByStudent')
    userController.getAttendanceST(req,res)
})

router.get('/attendanceBySchool', auth, function (req, res){
    userController.getAttendanceSchT(req,res)
})

router.get('/attendanceByTutor', auth, function (req, res){
    userController.getAttendanceTutor(req,res)
    //returns an array holding arrays of student attendances by school
})
module.exports = router;