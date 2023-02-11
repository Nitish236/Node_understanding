const express = require("express");
const Router = express.Router();

const {
    getAllTeachers,
    newTeacher,
    getById,
    updateTeacher,
    deleteTeacher
} = require("../controllers/manager");

Router.route("/")
      .get(getAllTeachers)
      .post(newTeacher)

Router.route("/:id")
      .get(getById)
      .put(updateTeacher)
      .delete(deleteTeacher)


module.exports = Router;

