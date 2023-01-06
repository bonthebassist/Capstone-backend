const User = require("../models/user");
const Student = require("../models/student");
const StudentAttendance = require("../models/studentAttendance");
const School = require("../models/school");

async function postSchool(req, res) {
    console.log("schoolDBservice postSchool function")
    try {
        // Get school input
        const { schoolName, schoolAdmin, usefulLinks, schoolColor, tutor_id } = req.body;

        // Validate user input
        if (!schoolName) {
            res.status(400).send("School name is required");
        }

        // check if school already exists
        const oldSchool = await School.findOne({ schoolName: schoolName, tutor_id: tutor_id });

        if (oldSchool) {
            return res.status(409).send("School Already Exists. Please update existing school");
        }

        // Create school in our database
        const school = await School.create({
            tutor_id: tutor_id,
            schoolName: schoolName,
            schoolAdmin: [schoolAdmin],
            usefulLinks: [usefulLinks],
            schoolColor: schoolColor,
            active: true
        });

        // return new user
        res.status(201).json(school);
    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findSchools(req, res) {
    console.log("schoolDBservice findSchools function")
    try {
        const { tutor_id } = req.body

        if (!tutor_id) {
            res.status(400).send("tutor_id is required");
        }

        const schools = await School.find({ tutor_id: tutor_id })

        res.status(200).json(schools)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findSchool(req, res) {
    console.log("schoolDBservice findSchool function")
    try {
        const { school_id } = req.body

        if (!school_id) {
            res.status(400).send("school_id is required");
        }

        const school = await School.findOne({ _id: school_id })

        res.status(200).json(school)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function deleteSchool (req, res){
    console.log("schoolDBservice deleteSchool function")
    try {
      //verify input
      const { tutor_id, school_id } = req.body;
  
      if (!(user_id && school_id)) {
        res.status(400).send("user_id is required");
      }
      //check for user
      const oldSchool = await School.findOne({ _id: school_id, tutor_id: tutor_id });
  
      if (!oldSchool) {
        return res.status(404).send("School not found");
      }
      
      //delete associated students
      const foundStudents = await Student.deleteMany({ tutor_id: tutor_id, school_id: school_id })
      console.log("Students:")
      console.log(foundStudents)
      
      //delete associated studentAttendance
      const foundAttendances = await StudentAttendance.deleteMany({ tutor_id: tutor_id, school_id: school_id })
      console.log("StudentAttendances:")
      console.log(foundAttendances)
      
      //delete school
      const deletedSchool = await School.findOneAndDelete({_id: school_id})
      console.log("deletedSchool:")
      console.log(deletedUser)
  
      res.status(200).send(
        `deletedSchool: ${deletedSchool.schoolName}, 
        students deleted: ${foundStudents.deletedCount},
        attendances deleted: ${foundAttendances.deletedCount}`
        )
  
    } catch (err) {
      console.log(err);
    }
    
  
};

async function schoolInactive (req, res){
    console.log("schoolDBservice schoolInactive function")
    try {
        //verify input
      const { school_id } = req.body;
  
      if (!(school_id)) {
        res.status(400).send("school_id is required");
      }
      //check for user
      const oldSchool = await School.findOne({ _id: school_id });
  
      if (!oldSchool) {
        return res.status(404).send("School not found");
      }

      //update School
      const updatedSchool = await School.updateOne({_id: school_id}, {active: false})
      console.log(oldSchool.schoolName)
      console.log(updatedSchool)

      const updateAssocStudents = await Student.updateMany({school_id: school_id}, {active:false})
      console.log("associated students")
      console.log(updateAssocStudents)

      res.status(200).send(
        `updatedSchool: ${updatedSchool.schoolName}, 
        students updated: ${updateAssocStudents.modifiedCount}`
      )

    } catch (err) {
        console.log(err);
    }
    
};

module.exports = {
    postSchool,
    findSchools,
    findSchool,
    deleteSchool,
    schoolInactive
}   