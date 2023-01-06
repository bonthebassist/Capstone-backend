const userData = require('../services/dbservice.js') 

const register = async (req, res) => {
    console.log("authController register function")  
    let registration = await userData.checkRegistration(req, res)
    return registration
}

const login = async (req, res) => {  
    console.log("authController login function") 
    let login = await userData.loginUser(req, res)
    return login
}

module.exports = {
    register,
    login
}