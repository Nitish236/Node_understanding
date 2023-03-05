const express = require("express");
const router = express.Router();

const {
    getStudentById,
    updateStudent
} = require("../controllers/student");



router
      .route("/:id")
      .get(getStudentById)
      .patch(updateStudent)


module.exports = router;

