const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors/index")

const bcrypt = require("bcrypt");
const sendEmail = require("../mailService/email");

// Student model
const Student = require("../model/student")

// Gets all students
const getAllStudents = async (req, res) => {
      const students = await Student.find()
      
      if(students.length==0){
         throw new NotFoundError('No students data found') 
      }

      res.status(StatusCodes.OK).json({ students, count: students.length })
}


// Create new student
const newStudent = async (req, res) => {
    const student = await Student.create(req.body)

    res.status(StatusCodes.OK).json({ student, msg: 'New student created successfully' })
}

// Get the student by id
const getStudentById = async (req, res) => {
    const { params: {id: studentID} } = req 

    const student = await Student.findOne({_id: studentID})

    if(!student){
        throw new NotFoundError('No such student exists')
    }

    res.status(200).json({ student, msg: 'Got the student details' });
}

// Update Student data
const updateStudent = async (req, res) => {
    const { body: {email, classYr, subjects, contact }, params: {id: studentID} } = req 
    
    if(email==="" || classYr==="" || subjects.length==0){
       throw new BadRequestError('Email, Class, Subjects, Contact should not be empty') 
    }

    const student = await Student.findByIdAndUpdate(
                    { _id: studentID },
                    req.body,
                    { new: true, runValidators: true }
                )

    if(!student){
        throw new NotFoundError('No such student exists')
    }

    res.status(200).json({ student, msg: 'Successfully Updated' });
}

// Delete Student
const deleteStudent = async (req, res) => {
    const { params: {id: studentID} } = req 

    const student = await Student.findByIdAndDelete({_id: studentID})

    if(!student){
        throw new NotFoundError('No such student exists')
    }

    res.status(200).json({ msg: "Student data deleted successfully" });
}

module.exports = {
    getAllStudents,
    newStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
}