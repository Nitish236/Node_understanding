const { StatusCodes } = require("http-status-codes")
const { UnauthenticatedError } = require("../../../../Downloads/node-express-course-main/06-jobs-api/starter/errors")
const { BadRequestError, NotFoundError } = require("../errors")

// Schemas
const Student = require("../model/student")
const Teacher = require("../model/teacher")

const login = async (req, res) => {
      const { email, password, role } = req.body

      if(!email || !password || !role ){
          throw new BadRequestError('Email, password and role are required')
      }

      let user = null ;
      if(role==='Student'){
          user = await Student.findOne({ email })
      }
      else if(role==='Teacher'){
          user = await Teacher.findOne({ email })
      }
    //   else if(role==='Manager'){
    //     user = await student.findOne({ email })
    //   }
      
      // console.log(user) ;
      if(!user){
         throw new UnauthenticatedError(`Email or role is incorrect`)
      }
      
    //   let pass = null 
    //   if(role==='Student'){
    //     passMatch = await Student.comparePassword(password)
    //   }
    //   else if(role==='Teacher'){
    //     passMatch = await Teacher.comparePassword(password)
    //   }
    // //   else if(role==='Manager'){
    // //     user = await student.findOne({ email })
    // //   }
      
    //   if(!passMatch){
    //      throw new UnauthenticatedError('Invalid credentials')
    //   }

      let token = undefined
      if(role==='Student'){
        token = user.createJWT() ;
      }else if(role==='Teacher'){
        token = user.createJWT() ;
      }

      res.status(StatusCodes.OK).json({ user: {name: user.name, role: user.role}, token })
}


module.exports = login


