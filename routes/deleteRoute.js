var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

router.put('/all', function (req, res){
    studentController.getStudents(req,res)
})

router.get('/one/:id', function (req, res){
    studentController.getOneStudent(req, res)
})

router.post('/addStudent', function (req,res){
    studentController.addOneStudent(req,res)
})

router.delete('/delete/:name', function (req,res){
    studentController.delateOneStudent(req,res)
})

router.post('/update/:name/:newEmail', function (req,res){
    studentController.updateOneStudent(req,res)
})

module.exports = router;