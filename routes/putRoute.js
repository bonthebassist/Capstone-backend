var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const auth = require("../middleware/auth");

router.put("/attendance", auth, async (req,res) => {
    await userController.addAttendance(req,res)
});

//Update student active property to false
router.put('/shadowStudent', auth, async function (req, res){
    await userController.shadowStudent(req,res)
});

//Update school active property to false
router.put('/shadowSchool', auth, async function (req, res){
    await userController.shadowSchool(req,res)
});

//update user
router.put('/userDetails', auth, async (req,res) => {
    await userController.editUserDetails(req,res)
})

router.put('/userMessages', auth, async (req,res) => {
    await userController.editUserMessages(req,res)
})

//update school
router.put('/schoolDetails', auth, async (req, res) => {
    await userController.editSchoolDetails(req,res)
})

router.put('/schoolAdminAdd', auth, async (req, res) => {
    await userController.addSchoolAdmin(req,res)
})

router.put('/schoolLinksAdd', auth, async (req, res) => {
    await userController.addSchoolLink(req,res)
})

router.put('/schoolAdminDelete', auth, async (req, res) => {
    await userController.deleteSchoolAdmin(req,res)
})

router.put('/schoolLinksDelete', auth, async (req, res) => {
    await userController.deleteSchoolLink(req,res)
})

//update student
router.put('/student', auth, async (req,res) => {
    await userController.editStudent(req,res)
})

//update attendance
router.put('/attendanceInput', auth, async (req,res) => {
    await userController.inputRecord(req,res)
})

router.put('/attendanceDetails', auth, async (req,res) => {
    await userController.editAttendanceDetails(req,res)
})

router.put('/attendanceInvoice', auth, async (req,res) => {
    await userController.editInvoiced(req,res)
})

module.exports = router;