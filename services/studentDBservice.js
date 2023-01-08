const Student = require("../models/student");
const StudentAttendance = require("../models/studentAttendance");


async function postStudent(req, res) {
    console.log("schoolDBservice postSchool function")
    try {
        // Get student input
        const {
            studentFirstName,
            studentLastName,
            studentEmail,
            school_id,
            tutor_id,
            instrument,
            yearLevel,
            parentFirstName,
            parentLastName,
            parentEmail,
            lessonType,
            lessonPrice
        } = req.body;

        // Validate user input
        if (!(studentFirstName && studentLastName && studentEmail && school_id && tutor_id && instrument && lessonType && lessonPrice)) {
            res.status(400).send("Required fields are undefined");
        }

        // check if student already exists
        const oldStudent = await Student.findOne({
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            tutor_id: tutor_id,
            school_id: school_id
        });

        if (oldStudent) {
            return res.status(409).send("Student Already Exists. Please update existing student");
        }

        // Create student in our database
        const student = await Student.create({
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            studentEmail: studentEmail,
            school_id: school_id,
            tutor_id: tutor_id,
            instrument: instrument,
            yearLevel: yearLevel,
            parentFirstName: parentFirstName,
            parentLastName: parentLastName,
            parentEmail: parentEmail,
            lessonType: lessonType,
            lessonPrice: lessonPrice,
            active: true
        });

        // return new student
        res.status(201).json(student);
    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findStudents(req, res) {
    console.log("studentDBservice findStudents function")
    try {
        const tutor_id = req.query.tutor

        if (!tutor_id) {
            res.status(400).send("tutor_id is required");
        }

        const students = await Student.find({ tutor_id: tutor_id })

        res.status(200).json(students)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findStudent(req, res) {
    console.log("studentDBservice findStudent function")
    try {
        const { student_id } = req.body

        if (!student_id) {
            res.status(400).send("school_id is required");
        }

        const student = await Student.findOne({ _id: student_id })

        res.status(200).json(student)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findStudentByName(req, res) {
    console.log("studentDBservice findStudentByName function")
    try {
        const tutor_id = req.query.tutor
        const firstName = req.query.firstName
        const lastName = req.query.lastName

        if (!(tutor_id && firstName && lastName)) {
            res.status(400).send("tutor_id is required");
        }

        const students = await Student.findOne({ tutor_id: tutor_id, studentFirstName: firstName, studentLirstName: lastName })

        res.status(200).json(students)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findStudentsBySchool(req, res) {
  console.log("studentDBservice findStudents function")
  try {
      const { tutor_id, school_id } = req.body

      if (!(tutor_id && school_id)) {
          res.status(400).send("tutor_id is required");
      }

      const students = await Student.find({ tutor_id: tutor_id, school_id: school_id })

      res.status(200).json(students)

  } catch (err) {
      console.log("in the catch")
      console.log(err);
  }
};

async function deleteStudent (req, res){
    console.log("studentDBservice deleteStudent function")
    try {
      //verify input
      const { tutor_id, student_id } = req.body;
  
      if (!(tutor_id && student_id)) {
        res.status(400).send("tutor_id and student_id is required");
      }
      //check for user
      const oldStudent = await Student.findOne({ _id: student_id, tutor_id: tutor_id });
  
      if (!oldStudent) {
        return res.status(404).send("Student not found");
      }
      
      //delete associated studentAttendance
      const foundAttendances = await StudentAttendance.deleteMany({ tutor_id: tutor_id, student_id: student_id })
      console.log("StudentAttendances:")
      console.log(foundAttendances)
      
      //delete school
      const deletedStudent = await Student.findOneAndDelete({_id: student_id})
      console.log("deletedStudent:")
      console.log(deletedStudent)
  
      res.status(200).send(
        `deletedStudent: ${deletedStudent.studentFirstName} ${deletedStudent.studentLastName}, 
        attendances deleted: ${foundAttendances.deletedCount}`
        )
  
    } catch (err) {
      console.log(err);
    }
    
  
};

async function studentInactive (req, res){
    console.log("studentDBservice studentInactive function")
    try {
        //verify input
      const { student_id } = req.body;
  
      if (!(student_id)) {
        res.status(400).send("student_id is required");
      }
      //check for user
      const oldStudent = await Student.findOne({ _id: student_id });
  
      if (!oldStudent) {
        return res.status(404).send("Student not found");
      }

      //updateStudent
      const updatedStudent = await Student.updateOne({_id: student_id}, {active: false})
      console.log(oldStudent.studentFirstName +" "+ oldStudent.studentLastName)
      console.log(updatedStudent)

      res.status(200).send(updatedStudent)

    } catch (err) {
        console.log(err);
    }

};

async function updateStudentDetails (req, res) {
    console.log("studentDBservice updateStudentDetails function")
    try {
      const { 
        student_id, 
        studentEmail, 
        studentFirstName, 
        studentLastName, 
        school_id, 
        instrument, 
        yearLevel, 
        parentEmail, 
        parentFirstName, 
        parentLastName, 
        lessonPrice, 
        lessonType 
        } = req.body;
  
      if (!(student_id && 
        studentEmail && 
        studentFirstName && 
        studentLastName && 
        school_id && 
        instrument && 
        yearLevel && 
        parentEmail && 
        parentFirstName && 
        parentLastName && 
        lessonPrice && 
        lessonType)) {
        res.status(400).send("All inputs are required");
      }
  
      //check for Student
      const oldStudent = await Student.findOne({ _id: student_id });
  
      if (!oldStudent) {
        return res.status(404).send("Student not found");
      }
  
      //update details
      const student = await Student.updateOne({ _id: student_id },{
        studentFirstName: studentFirstName,
        studentLastName: studentLastName,
        studentEmail: studentEmail.toLowerCase(),
        school_id: school_id,
        instrument: instrument,
        yearLevel: yearLevel,
        parentFirstName: parentFirstName,
        parentLastName: parentLastName,
        parentEmail: parentEmail.toLowerCase(),
        lessonType: lessonType,
        lessonPrice: lessonPrice
      });
  
      res.status(200).json(student)
    } catch (err) {
      console.log(err);
    }
};

module.exports = {
    postStudent,
    findStudents,
    findStudent,
    findStudentsBySchool,
    findStudentByName,
    deleteStudent,
    studentInactive,
    updateStudentDetails
}

// "studentFirstName": "Marsha",
//     "studentLastName": "Brown",
// "studentEmail": "marsha@schools.edu.au",
//     "school_id": "63b7f37d8f9770b0ab7f80c0",
// "tutor_id": "63b7eaf696702fb7d08bea83",
//     "instrument": "bass",
// "yearLevel": "9",
//     "parentFirstName": "Mark",
// "parentLastName": "Brown",
//     "parentEmail": "mark.brown@email.com",
// "lessonType": "Individual 30 minutes",
//     "lessonPrice": "32"