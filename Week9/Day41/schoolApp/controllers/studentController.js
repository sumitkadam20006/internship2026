const Student = require("../models/Student");

// Get All Students
exports.getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

// Add Student
exports.addStudent = async (req, res) => {
    const student = new Student(req.body);

    await student.save();

    res.json({
        message: "Student Added Successfully",
        student
    });
};

// Get Student By ID
exports.getStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);

    res.json(student);
};

// Update Student
exports.updateStudent = async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(student);
};

// Delete Student
exports.deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
        message: "Student Deleted Successfully"
    });
};