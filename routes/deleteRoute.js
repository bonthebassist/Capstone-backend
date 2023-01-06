var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const auth = require("../middleware/auth");

//to delete user and all associated schools, students and attendance objects
router.delete('/user', auth, function (req, res){
    userController.removeUser(req,res)
})

//to delete school and all associated students and attendances
router.delete('/school', auth, function (req, res){
    userController.removeSchool(req,res)
})

//delete student entirely and all associated attendance objects
router.delete('/student', auth, function (req, res){
    userController.removeStudent(req,res)
})

//delete specific attendance object
router.delete('/attendance', auth, function (req, res){
    userController.removeAttendance(req,res)
})


module.exports = router;