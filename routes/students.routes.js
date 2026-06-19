const express = require("express");
const { addStudents, getAllStudents, getStudentsById, findStudentsByName, updateStudent, deleteStudent, } = require("../controllers/students.controller");
const router = express.Router();


router.post('/add-student', addStudents);
router.get('/get-all-students', getAllStudents);
router.get('/get-student-by-id/:id', getStudentsById);
router.get('/find-students-by-name', findStudentsByName);
router.put('/update-student/:id', updateStudent);
router.delete('/delete-student/:id', deleteStudent)


module.exports = router;