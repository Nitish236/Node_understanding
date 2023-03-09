const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnauthenticatedError } = require("../errors")

// Schemas
const Student = require("../model/student")
const Teacher = require("../model/teacher")
const Manager = require("../model/manager")


// Login function

const login = async (req, res) => {
      const { email, password, role } = req.body

      if(!email || !password || !role ){
          throw new BadRequestError('Email, password and role are required')
      }

      let user = undefined ;
      if(role==='Student'){
          user = await Student.findOne({ email, role })
      }
      else if(role==='Teacher'){
          user = await Teacher.findOne({ email, role })
      }
      else if(role==='Manager'){
          user = await Manager.findOne({ email, role })
      }
      
      //console.log(user) ;
      if(!user){
         throw new UnauthenticatedError(`Email or role is incorrect`)
      }
      
      let passMatch = undefined 
      if(role==='Student'){
        passMatch = await user.comparePassword(password)
      }
      else if(role==='Teacher'){
        passMatch = await user.comparePassword(password)
      }
      else if(role==='Manager'){
        passMatch = await user.comparePassword(password)
      }
      
      //console.log(passMatch)
      if(!passMatch){
         throw new UnauthenticatedError('Invalid credentials')
      }

      let token = undefined
      if(role==='Student'){
        token = user.createJWT() ;
      }else if(role==='Teacher'){
        token = user.createJWT() ;
      }else if(role==='Manager'){
        token = user.createJWT() ;
      }
      // console.log(token)

      res.status(StatusCodes.OK).json({ user: {name: user.name, role: user.role}, token })
}


module.exports = login


