const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors/index")

// Student model
const Student = require("../model/student")

// Gets all students
const getAllStudents = async (req, res) => {
      const students = await Student.find()
      
      if(!students){
         throw new NotFoundError('No students data found') 
      }

      res.status(StatusCodes.OK).json({ students, count: students.length })
}


// Create new student
const newStudent = async (req, res) => {
    const student = await Student.create(req.body)

    console.log("New Student created -- ")
    res.status(StatusCodes.OK).json({ student })
}

// Get the student by id
const getStudentById = async (req, res) => {
    const { params: {id: studentID} } = req 

    const student = await Student.findOne({_id: studentID})

    if(!student){
        throw new NotFoundError('No such student exists')
    }

    res.status(200).json({ student });
}

// Update Student data
const updateStudent = async (req, res) => {
    const { body: {email, classYr, subjects, contact }, params: {id: studentID} } = req 
    
    if(email==="" || classYr===""){
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

    res.status(200).json({ student });
}

// Delete Student
const deleteStudent = async (req, res) => {
    const { params: {id: studentID} } = req 

    const student = await Student.findByIdAndDelete({_id: studentID})

    if(!student){
        throw new NotFoundError('No such student exists')
    }

    res.status(200).json({ msg: "Student data deleted" });
}

module.exports = {
    getAllStudents,
    newStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
}