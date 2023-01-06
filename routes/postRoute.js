var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController')
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


module.exports = router;