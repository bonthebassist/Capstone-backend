const User = require("../models/user");
const Student = require("../models/student");
const StudentAttendance = require("../models/studentAttendance");
const School = require("../models/school");
const studentModel = require('../models/student.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

async function checkRegistration (req, res){
    console.log("userDBservice checkRegistration function")
    try {
        // Get user input
        const { firstName, lastName, email, password, instrument } = req.body;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
        res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
        return res.status(409).send("User Already Exists. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        instrument,
        token:"",
        messages:{
            invoiceReminder:"",
            invoiceSend:"",
            lateForLesson:"",
            absentFromLesson:""
        }
        });

        // Create token
        const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "6h",
        }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function loginUser(req, res){
    console.log("userDBservice loginUser function")
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
          console.log(user.firstName + " successfully logged in")
        } else {
            res.status(400).send("Invalid Credentials");
        }

      } catch (err) {
        console.log(err);
      }

};

async function findUser (req, res){ //this may need a response if no user is found
  console.log("userDBservice findUser function")
  try {
    const { user_id } = req.body;

    if (!user_id) {
      res.status(400).send("user_id is required");
    }

    const user = await User.findOne({ _id: user_id });

    res.status(200).json(user)
  } catch (err) {
    console.log(err);
  }

};

async function deleteUser (req, res){
  console.log("userDBservice deleteUser function")
  try {
    //verify input
    const { user_id } = req.body;

    if (!user_id) {
      res.status(400).send("user_id is required");
    }
    //check for user
    const oldUser = await User.findOne({ _id: user_id });

    if (!oldUser) {
      return res.status(404).send("User not found");
    }

    //delete associated schools
    const foundSchools = await School.deleteMany({ tutor_id: user_id })
    console.log("Schools:")
    console.log(foundSchools)
    
    //delete associated students
    const foundStudents = await Student.deleteMany({ tutor_id: user_id })
    console.log("Students:")
    console.log(foundStudents)
    
    //delete associated studentAttendance
    const foundAttendances = await StudentAttendance.deleteMany({ tutor_id: user_id })
    console.log("StudentAttendances:")
    console.log(foundAttendances)
    
    //delete user account
    const deletedUser = await User.findOneAndDelete({_id: user_id})
    console.log("deletedUser:")
    console.log(deletedUser)

    res.status(200).send(
      `deletedUser: ${deletedUser.email}, 
      schools deleted: ${foundSchools.deletedCount},
      students deleted: ${foundStudents.deletedCount},
      attendances deleted: ${foundAttendances.deletedCount}`
      )

  } catch (err) {
    console.log(err);
  }
  

};


module.exports = {
    checkRegistration,
    loginUser,
    findUser,
    deleteUser
}   