var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const auth = require("../middleware/auth");

router.put("/attendance", auth, async (req,res) => {
    await userController.addAttendance(req,res)
});

//Update student active property to false
router.put('/shadowStudent', auth, function (req, res){
    userController.shadowStudent(req,res)
});

//Update school active property to false
router.put('/shadowSchool', auth, function (req, res){
    userController.shadowSchool(req,res)
});

module.exports = router;