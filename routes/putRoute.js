var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

router.put("/attendance", auth, async (req,res) => {
    await userController.addAttendance(req,res)
})

//THIS IS MORE OF A PUT to delete student from actively being at a school but remain a past student?
router.put('/shadowStudent', function (req, res){
    userController.shadowStudent(req,res)
})
module.exports = router;