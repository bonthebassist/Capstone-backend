const Student = require("../models/student");
const StudentAttendance = require("../models/studentAttendance");
const School = require("../models/school");

async function postSchool(req, res) {
    console.log("schoolDBservice postSchool function")
    try {
        // Get user input
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

        // Create school in database
        const school = await School.create({
            tutor_id: tutor_id,
            schoolName: schoolName,
            schoolAdmin: [schoolAdmin],
            usefulLinks: [usefulLinks],
            schoolColor: schoolColor,
            active: true
        });

        // return new school
        res.status(201).json(school);

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findSchools(req, res) {
    console.log("schoolDBservice findSchools function")
    try {
        // Get user input
        const tutor_id = req.query.tutor

        //validate input
        if (!tutor_id) {
            res.status(400).send("tutor_id is required");
        }
        
        //search for schools that match
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
        // get user input
        const { school_id } = req.body

        //validate user input
        if (!school_id) {
            res.status(400).send("school_id is required");
        }

        //search for matching school object and send
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
      const school_id  = req.query.school;
  
      if (!(school_id)) {
        res.status(400).send("user_id is required");
      }
      //check for school
      const oldSchool = await School.findOne({ _id: school_id });
  
      if (!oldSchool) {
        return res.status(404).send("School not found");
      }
      
      //delete associated students
      const foundStudents = await Student.deleteMany({ school_id: school_id })
      console.log("Students:")
      console.log(foundStudents)
      
      //delete associated studentAttendance
      const foundAttendances = await StudentAttendance.deleteMany({ school_id: school_id })
      console.log("StudentAttendances:")
      console.log(foundAttendances)
      
      //delete school
      const deletedSchool = await School.findOneAndDelete({_id: school_id})
      console.log("deletedSchool:")
      console.log(deletedSchool)
  
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
      //check for School
      const oldSchool = await School.findOne({ _id: school_id });
  
      if (!oldSchool) {
        return res.status(404).send("School not found");
      }

      //update School
      const updatedSchool = await School.updateOne({_id: school_id}, {active: false})
      console.log(oldSchool.schoolName)
      console.log(updatedSchool)

      //update associated students
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

async function updateSchoolDetails (req, res){
    console.log("schoolDBservice updateSchoolDetails function")
    try {
        //verify input
      const { school_id, schoolName, schoolColor } = req.body;
  
      if (!(school_id)) {
        res.status(400).send("school_id is required");
      }
      //check for School
      const oldSchool = await School.findOne({ _id: school_id });
  
      if (!oldSchool) {
        return res.status(404).send("School not found");
      }

      //update School
      const updatedSchool = await School.updateOne(
        {_id: school_id},
        { schoolName: schoolName, schoolColor: schoolColor})
      console.log(oldSchool.schoolName)
      console.log(updatedSchool)


      res.status(200).send(updatedSchool)

    } catch (err) {
        console.log(err);
    }
    
};

async function updateAddAdmin (req, res){
    console.log("schoolDBservice updateSchoolAddAdmin function")
    try {
        //verify input
      const { school_id, contactName, contactEmail } = req.body; //administrator will be an object {contactName:"",contactEmail:""}
  
      if (!(school_id && contactName && contactEmail)) {
        res.status(400).send("All inputs are required");
      }
      //check for School
      const oldSchool = await School.findOne({ _id: school_id });
  
      if (!oldSchool) {
        return res.status(404).send("School not found");
      }

      //update School
      const updatedSchool = await School.updateOne(
        {_id: school_id},
        { $push : {"schoolAdmin": {contactName: contactName, contactEmail: contactEmail}}})
      console.log(oldSchool.schoolName)
      console.log(updatedSchool)

      res.status(200).send(updatedSchool)

    } catch (err) {
        console.log(err);
    }
    
};

async function updateLinksAdd (req, res){
  console.log("schoolDBservice updateLinksAdd function")
  try {
      //verify input
    const { school_id, linkTitle, linkURL } = req.body; //link will be an object {linkTitle:"",linkURL:""}

    if (!(school_id && linkTitle && linkURL)) {
      res.status(400).send("school_id and link are required");
    }
    //check for user
    const oldSchool = await School.findOne({ _id: school_id });

    if (!oldSchool) {
      return res.status(404).send("School not found");
    }

    //update School
    const updatedSchool = await School.updateOne(
      {_id: school_id},
      { $push : {"usefulLinks": {linkTitle: linkTitle, linkURL: linkURL}}})
    console.log(oldSchool.schoolName)
    console.log(updatedSchool)

    res.status(200).send(updatedSchool)

  } catch (err) {
      console.log(err);
  }
  
};

// async function updateDeleteAdmin (req, res){
//     console.log("schoolDBservice updateSchoolDeleteAdmin function")
//     try {
//         //verify input
//       const { school_id, administratorEmail } = req.body; 
  
//       if (!(school_id)) {
//         res.status(400).send("school_id is required");
//       }
//       //check for user
//       const oldSchool = await School.findOne({ _id: school_id });
  
//       if (!oldSchool) {
//         return res.status(404).send("School not found");
//       }

//       //update School
//       const updatedSchool = await School.updateOne(
//         {_id: school_id, "schoolAdmin.contactEmail": administratorEmail},
//         { $pull : {"schoolAdmin.$": administratorEmail}})
//       console.log(oldSchool.schoolName)
//       console.log(updatedSchool)

//       res.status(200).send(updatedSchool)

//     } catch (err) {
//         console.log(err);
//     }
    
// };

// async function updateLinksDelete (req, res){
//     console.log("schoolDBservice updateLinksDelete function")
//     try {
//         //verify input
//       const { school_id, linkTitle } = req.body; 
  
//       if (!(school_id, linkTitle)) {
//         res.status(400).send("school_id is required");
//       }
//       //check for user
//       const oldSchool = await School.findOne({ _id: school_id });
  
//       if (!oldSchool) {
//         return res.status(404).send("School not found");
//       }

//       //update School
//       const updatedSchool = await School.updateOne(
//         {_id: school_id, "usefulLinks.linkTitle": linkTitle},
//         { $pull : {"usefulLinks.$": linkTitle}})
//       console.log(oldSchool.schoolName)
//       console.log(updatedSchool)

//       res.status(200).send(updatedSchool)

//     } catch (err) {
//         console.log(err);
//     }
    
// };

module.exports = {
    postSchool,
    findSchools,
    findSchool,
    deleteSchool,
    schoolInactive,
    updateSchoolDetails,
    updateAddAdmin,
    updateLinksAdd
}   