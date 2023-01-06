const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const auth = require("../middleware/auth");

router.post('/register', async function (req, res){
    console.log("register route")
    await authController.register(req,res)
})

router.post('/login', async function (req, res){
    console.log("register route")
    await authController.login(req,res)
})

router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

router.post("/school", auth, async (req,res) => {
    await userController.addSchool(req,res)
})

router.post("/student", auth, async (req,res) => {
    await userController.addStudent(req,res)
})

router.post("/attendance", auth, async (req,res) => {
    await userController.addAttendance(req,res)
})

module.exports = router;