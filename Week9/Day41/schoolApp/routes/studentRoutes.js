const express = require("express");

const router = express.Router();

const {
    getStudents,
    addStudent,
    getStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

router.get("/", getStudents);

router.post("/", addStudent);

router.get("/:id", getStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

module.exports = router;