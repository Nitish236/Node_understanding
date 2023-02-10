const express = require("express");
const Router = express.Router();

const {
    getAllStudents,
    newStudent,
    getById,
    updateStudent,
    deleteStudent
} = require("../controllers/student");

Router.route("/")
      .get(getAllStudents)
      .post(newStudent)

Router.route("/:id")
      .get(getById)
      .put(updateStudent)
      .delete(deleteStudent)


module.exports = Router;

