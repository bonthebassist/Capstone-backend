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
//WORKS
router.put('/userDetails', auth, async (req,res) => {
    await userController.editUserDetails(req,res)
})
//WORKS
router.put('/userMessages', auth, async (req,res) => {
    await userController.editUserMessages(req,res)
})

//update school WORKS
router.put('/schoolDetails', auth, async (req, res) => {
    await userController.editSchoolDetails(req,res)
})
//WORKS
router.put('/schoolAdminAdd', auth, async (req, res) => {
    await userController.addSchoolAdmin(req,res)
})
//WORKS
router.put('/schoolLinksAdd', auth, async (req, res) => {
    await userController.addSchoolLink(req,res)
})
// //WONT WORK AT THIS POINT
// router.put('/schoolAdminDelete', auth, async (req, res) => {
//     await userController.deleteSchoolAdmin(req,res)
// })
// //WONT WORK AT THIS POINT
// router.put('/schoolLinksDelete', auth, async (req, res) => {
//     await userController.deleteSchoolLink(req,res)
// })

//update student
//WORKS
router.put('/student', auth, async (req,res) => {
    await userController.editStudentDetails(req,res)
})

//update attendance
//WORKS!!! needs to update lessonCount though
router.put('/attendanceInput', auth, async (req,res) => {
    await userController.inputRecord(req,res)
})
//WORKS
router.put('/attendanceDetails', auth, async (req,res) => {
    await userController.editAttendanceDetails(req,res)
})
//WORKS
router.put('/attendanceInvoice', auth, async (req,res) => {
    await userController.editInvoiced(req,res)
})

module.exports = router;