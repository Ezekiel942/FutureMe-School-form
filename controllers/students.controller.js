const Student = require("../models/students.schema");

const addStudents = async (req, res) =>{
    const{fullName, email, phoneNumber, studentClass, gender, address, isAdmitted } = req.body;
    try {
        if (!fullName || !email || !phoneNumber || !studentClass || !gender || !address)
        { return res.status(400).json({ message: "All fiels are required"});
    }

    const newStudent = new Student({
        fullName,
        email,
        phoneNumber,
        studentClass,
        gender,
        address,
        isAdmitted
    });
    await newStudent.save();
    res.status(201).json({ message: "student added successfully", student: newStudent});
 }
  catch (error) {
   console.error("Error adding student:", error);
    return res.status(500).json({ message: "internal server error"});
  }
};


const getAllStudents = async (req, res) =>{
    try{
        const students = await Student.find();
        return res.status(200).json({ students });
    }catch (error){
        console.error("error fetching students:", error);
        return res.status(500).json({ Message: "internal server error"});
    }
};


const getStudentsById = async (req, res) =>{
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!students.length) {
            return res.status(404).json({ message: "student not found" });
        }
        return res.status(200).json({ student })
    } catch (error){
        console.error( "error fetching student:", error);
        return res.status(500).json({message: "internal server error"})
    }
};


const findStudentsByName = async (req, res) =>{
    const { name } = req.query;
    try {
        const students = await Student.find({ fullName: {$regex: name, $options: "i"}});
        if (!name) {
            return res.status(404).json({ message: "student name not found" });
        }
        return res.status(200).json({ student });
    }
    catch (error){
        console.error("error messsage:", error);
        res.status(500).json({message: "Internal server error"})
    }
};


const updateStudent = async (req, res) => {
    const { id } = req.params;

    const {
        fullName,
        email,
        phoneNumber,
        studentClass,
        address,
        isAdmitted
    } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            {
                fullName,
                email,
                phoneNumber,
                studentClass,
                address,
                isAdmitted
            },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent
        });

    } catch (error) {
        console.error("Error updating student:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const deleteStudent = async (req, res) =>{
    const { id } = req.params
    try{
        const students = await Student.findByIdAndDelete(id);
        return res.status(200).json({message: "student deleted successful"})
    } catch (error){
        console.error("error deleting student:", error);
        return res.status(500).json({ message: "Internal sever error"})
    }
};

module.exports = {
    addStudents, 
    getAllStudents, 
    getStudentsById, 
    findStudentsByName,
    updateStudent, 
    deleteStudent
};

