const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors/index")

// Teacher Model
const Teacher = require("../model/teacher")

// Send all teachers data
const getAllTeachers = async (req, res) => {
      const teachers = await Teacher.find()

      if(teachers.length==0){
          throw new NotFoundError('No teachers data found')
      }

      res.status(StatusCodes.OK).json({ teachers, count: teachers.length })
}

// Create New Teacher
const newTeacher = async (req, res) => {
      const teacher = await Teacher.create(req.body)

      res.status(StatusCodes.OK).json({ teacher, msg: 'New teacher created successfully' })
}

// Get teacher by id
const getTeacherById = async (req, res) => {
      const { params: { id: teacherId } } = req 

      const teacher = await Teacher.findOne({ _id: teacherId })

      if(!teacher){
         throw new NotFoundError('No such teacher exists')
      }

      res.status(StatusCodes.OK).json({ teacher, msg: 'Got the teacher details' })
}

// Update Teacher
const updateTeacher = async (req, res) => {
      const { body: { email, qualification, subjects}, params: { id: teacherId } } = req

      if(email==='' || subjects.length==0){
          throw new BadRequestError('Email, Degree, Experienece, Subjects cannot be empty')
      }
      
      const teacher = await Teacher.findByIdAndUpdate(
                          { _id: teacherId },
                          req.body,
                          { new: true, runValidators: true }
                      ) 

      if(!teacher){
          throw new NotFoundError('No such teacher exists')
      }

      res.status(StatusCodes.OK).json({ teacher, msg: 'Successfully updated' })
}

// Delete Student
const deleteTeacher = async (req, res) => {
      const { params: { id: teacherId } } = req

      const teacher = await Teacher.findByIdAndDelete(
                        { _id: teacherId }
                      )

      if(!teacher){
         throw new NotFoundError('No such teacher exists')
      }

      res.status(StatusCodes.OK).json({ msg: 'Teacher data successfully deleted' })
}

module.exports = {
    getAllTeachers,
    newTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
}