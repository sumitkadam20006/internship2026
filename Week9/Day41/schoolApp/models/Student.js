const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    enrolled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Student", studentSchema);