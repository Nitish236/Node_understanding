const express = require("express")
const router = express.Router()

const {
    getAllStudents,
    newStudent,
    updateStudent,
    deleteStudent,
    getStudentById
} = require("../controllers/student");

const {
    getAllTeachers,
    newTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teacher");


// Manage Student 
router
      .route("/student/")
      .get(getAllStudents)
      .post(newStudent)
      
router
      .route("/student/:id")
      .get(getStudentById)
      .patch(updateStudent)
      .delete(deleteStudent)     


// Manage Teacher
router
      .route("/teacher/")
      .get(getAllTeachers)
      .post(newTeacher)

router
      .route("/teacher/:id")
      .get(getTeacherById)
      .patch(updateTeacher)
      .delete(deleteTeacher)
      


module.exports = router