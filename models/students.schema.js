const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    studentClass: String,
    gender: String,
    address: String,
    isAdmitted: Boolean
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;