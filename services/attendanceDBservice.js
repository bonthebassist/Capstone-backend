const StudentAttendance = require("../models/studentAttendance");


async function postAttendance(req, res) {
    console.log("schoolDBservice postSchool function")
    try {
        // Get attendance input
        const { student_id, tutor_id, school_id, schoolDate, termLength, goalLessonCount, studentName } = req.body;

        // Validate attendance input
        if (!(student_id && tutor_id && school_id && schoolDate && termLength && goalLessonCount && studentName)) {
            res.status(400).send("School name is required");
        }

        // check if attendance document exists
        const oldDoc = await StudentAttendance.findOne({
            student_id: student_id,
            tutor_id: tutor_id,
            school_id: school_id,
            schoolDate: schoolDate,
        });

        if (oldDoc) {
            return res.status(409).send("Attendance document already exists for this school, student, and term");
        }

        //create attendance array objects
        let attendanceArray = []
        for (let i = 0; i < termLength; i++) {
            let weekNo = i + 1
            attendanceArray.push({ week: `${weekNo}`, record: "", notes: "" })
        }
        // Create attendance document in our database
        const attendanceDoc = await StudentAttendance.create({
            student_id: student_id,
            tutor_id: tutor_id,
            school_id: school_id,
            schoolDate: schoolDate,
            termLength: termLength,
            attendance: attendanceArray,
            lessonCount: 0,
            goalLessonCount: goalLessonCount,
            invoiced: false,
            studentName: studentName
        });

        // return new attendance document
        res.status(201).json(attendanceDoc);
    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findAttendanceByST(req, res) {
    console.log("attendanceDBservice findAttendanceByST function")
    try {
        const { student_id, tutor_id, schoolDate } = req.body

        if (!(student_id, tutor_id, schoolDate)) {
            res.status(400).send("student_id, tutor_id, schoolDate are required");
        }

        const attendance = await StudentAttendance.findOne({ student_id: student_id, tutor_id: tutor_id, schoolDate: schoolDate })

        res.status(200).json(attendance)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function findAttendanceBySchT(req, res) {
    console.log("attendanceDBservice findAttendanceBySchT  function")
    try {
        const { tutor_id, school_id, schoolDate } = req.body

        if (!(tutor_id && school_id && schoolDate)) {
            res.status(400).send("tutor_id, school_id, schoolDate is required");
        }

        const attendance = await StudentAttendance.find({ school_id: school_id, tutor_id: tutor_id, schoolDate: schoolDate })

        res.status(200).json(attendance)

    } catch (err) {
        console.log("in the catch")
        console.log(err);
    }
};

async function deleteAttendance (req, res){
    console.log("attendanceDBservice deleteAttendance function")
    try {
      //verify input
      const { attendance_id } = req.body;
  
      if (!(attendance_id)) {
        res.status(400).send("tutor_id and student_id is required");
      }
      //check for user
      const oldAttendance = await StudentAttendance.findOne({ _id: attendance_id });
  
      if (!oldAttendance) {
        return res.status(404).send("Attendance document not found");
      }
      
      //delete school
      const deletedAttendanceDoc = await StudentAttendance.findOneAndDelete({_id: attendance_id})
      console.log("deletedAttendanceDoc:")
      console.log(deletedAttendanceDoc)
  
      res.status(200).send(
        `deletedAttendanceDoc: ${deletedAttendanceDoc.studentName}, ${deletedAttendanceDoc.schoolDate}`
        )
  
    } catch (err) {
      console.log(err);
    }
    
  
};

async function updateAttendanceDetails (req, res) {
    console.log("attendanceDBservice updateAttendanceDetails function")
    try {
      //verify input
      const { attendance_id, student_id, school_id, studentName, schoolDate, termLength, goalLessonCount } = req.body;
  
      if (!(attendance_id && student_id && school_id && studentName && schoolDate && termLength && goalLessonCount)) {
        res.status(400).send("All inputs are required");
      }
      //check for user
      const oldAttendance = await StudentAttendance.findOne({ _id: attendance_id });
  
      if (!oldAttendance) {
        return res.status(404).send("Attendance document not found");
      }
      
      //delete school
      const updatedAttendanceDoc = await StudentAttendance.updateOne({_id: attendance_id},
        {
            student_id: student_id,
            school_id: school_id,
            studentName: studentName,
            schoolDate: schoolDate,
            termLength: termLength,
            goalLessonCount: goalLessonCount 
        })
      console.log("updatedAttendanceDoc:")
      console.log(updatedAttendanceDoc)
  
      res.status(200).send(updatedAttendanceDoc)
  
    } catch (err) {
      console.log(err);
    }

};

async function updateAttendanceInvoiced (req, res) {
    console.log("attendanceDBservice updateAttendanceInvoiced function")
    try {
      //verify input
      const { attendance_id, invoiced } = req.body;
  
      if (!(attendance_id && invoiced)) {
        res.status(400).send("attendance_id & invoiced are required");
      }
      //check for user
      const oldAttendance = await StudentAttendance.findOne({ _id: attendance_id });
  
      if (!oldAttendance) {
        return res.status(404).send("Attendance document not found");
      }
      
      //delete school
      const updatedAttendanceDoc = await StudentAttendance.updateOne(
        {_id: attendance_id},
        { invoiced: invoiced })
      console.log("updatedAttendanceDoc:")
      console.log(updatedAttendanceDoc)
  
      res.status(200).send(updatedAttendanceDoc)
  
    } catch (err) {
      console.log(err);
    }

};

async function updateAttendanceRecord (req, res) {
    console.log("attendanceDBservice updateAttendanceRecord function")
    try {
      //verify input
      const { attendance_id, week, record, notes } = req.body;
  
      if (!(attendance_id && week && record)) {
        res.status(400).send("attendance_id, week & record are required");
      }
      //check for user
      const oldAttendance = await StudentAttendance.findOne({ _id: attendance_id });
  
      if (!oldAttendance) {
        return res.status(404).send("Attendance document not found");
      }
      
      //update attendance document
      const updatedAttendanceDoc = await StudentAttendance.updateOne(
        {_id: attendance_id, "attendance.week": week},
        { "attendance.$" : {week: week, record: record, notes: notes} })
      console.log("updatedAttendanceDoc:")
      console.log(updatedAttendanceDoc)
      

      //update lesson count
      const attendanceObj = await StudentAttendance.findOne({_id: attendance_id})

      const studentAttendance = attendanceObj.attendance
      const newArray = studentAttendance.filter(function (el) {
      return (
        el.record === ("P"||"A"||"L")
        )})

      let attendanceCount = newArray.length
      console.log(attendanceCount)
      //dbcall for updating lessonCount
      const updatedAttCount = await StudentAttendance.updateOne({_id: attendance_id}, {lessonCount: attendanceCount})
      console.log("Updated lesson Count: ")
      console.log(updatedAttCount)
    
    
    res.status(200).send("update successful")
  
    } catch (err) {
      console.log(err);
    }

};

module.exports = {
    postAttendance,
    findAttendanceByST,
    findAttendanceBySchT,
    deleteAttendance,
    updateAttendanceDetails,
    updateAttendanceInvoiced,
    updateAttendanceRecord
}

// "student_id": "63b7f7a635b24a30ea8fceff",
// "tutor_id": "63b7eaf696702fb7d08bea83",
// "school_id": "63b7f37d8f9770b0ab7f80c0",
// "schoolDate": "T12023",
// "termLength": "10",
// "goalLessonCount": "8",
// "invoiced": false,
// "studentName": "Marsha Brown"