const express = require("express");
const router = express.Router();

const {
    getTeacherById,
    updateTeacher
} = require("../controllers/teacher");


router
      .route("/:id")
      .get(getTeacherById)
      .patch(updateTeacher)


module.exports = router;

