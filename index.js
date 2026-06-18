const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

const dburl = process.env.MONGO_URL;
const connectDB = async () =>{
    try{
        await mongoose.connect(dburl);
        console.log("connectDB successful")
    }
    catch (error) {
        console.log("error connecting to mongoDB:", error);
        process.exit(1);
    }
}

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

app.post('/Students', async (req, res) =>{
    const{fullName, email, phoneNumber, studentClass, gender, address, isAdmitted } = req.body;
    try {
        if (!fullName || !email || !phoneNumber || !studentClass || !gender || !address)
        { return res.status(400).json({ message: "All fiels are required"});
    }

    const newStudent = new Student ({
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
});


app.get("/students", async (req, res) =>{
    try{
        const students = await Student.find();
        return res.status(200).json({ students });
    }catch (error){
        console.error("error fetching students:", error);
        return res.status(500).json({ Message: "internal server error"});
    }
});


app.get("/students/:id", async (req, res) =>{
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "student not found" });
        }
        return res.status(200).json({ student })
    } catch (error){
        console.error( "error fetching student:", error);
        return res.status(500).json({message: "internal server error"})
    }
});


app.get("/find student-by-name", async (req, res) =>{
    const { name } = req.query;
    try {
        const student = await student.find({ fullname: {$reqex: name, $option: "i"}});
        if (!name) {
            return res.status(404).json({ message: "student name not found" });
        }
        return res.status(200).json({ students});
    }
    catch (error){
        console.error("error messsage:", error);
        res.status(500).json({message: "Internal server error"})
    }
});


app.put("/update-student/:id", async (req, res) => {
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
});


app.delete("/delete-student/:id", async (req, res) =>{
    const { id } = req.param
    try{
        const students = await Student.findByIdAndDelete(id);
        return res.status(200).json({message: "student deleted successful"})
    } catch (error){
        console.error("error deleting student:", error);
        return res.status(500).json({ message: "Internal sever error"})
    }
})

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
