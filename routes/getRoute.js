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

router.get('/studentsBySchoolID', auth, function (req, res){
    userController.getStudentsBySchool(req,res)
})

router.get('/attendanceByStudent', auth, function (req, res){
    userController.getAttendanceST(req,res)
})

router.get('/attendanceBySchool', auth, function (req, res){
    userController.getAttendanceSchT(req,res)
})
module.exports = router;