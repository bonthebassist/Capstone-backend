var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

router.get('/userById', function (req, res){
    userController.getUser(req,res)
})

router.get('/schoolsBytutorID', function (req, res){
    userController.getSchools(req,res)
})

router.get('/schoolByID', function (req, res){
    userController.getSchool(req,res)
})

router.get('/studentsBytutorID', function (req, res){
    userController.getStudents(req,res)
})

router.get('/studentByID', function (req, res){
    userController.getStudent(req,res)
})

router.get('/studentsBySchoolID', function (req, res){
    userController.getStudentsBySchool(req,res)
})

router.get('/attendanceByStudent', function (req, res){
    userController.getAttendanceST(req,res)
})

router.get('/attendanceBySchool', function (req, res){
    userController.getAttendanceSchT(req,res)
})
module.exports = router;