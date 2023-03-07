require("dotenv").config()

const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const generatePass = require("generate-password")
const jwt = require("jsonwebtoken");
const sendEmail = require("../mailService/email");

const studentSchema = new mongoose.Schema({
     name: {
        type: String,
        required: [true, "Provide Student's name"],
        minLength: 5,
        maxLength: [50, "Length of the name can be max 50 characters"]
     },
     email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please provide a valid Email',
        ],
        unique: true,
     },
     password: {
        type: String,
        minLength: 8,
     },
     role: {
        type: String,
        default: "Student",
     },
     classYr: {
        type: String,
        required: [true, "Class is required"]
     },
     subjects: {
        type: Array,
     },
     contact: {
        parent: {type: Number, required: true },
        student: {type: Number, required: true, }
     },
}, { timestamps: true } )

studentSchema.pre('save', async function(){
      this.password 
          = generatePass.generate({
                  length: 8,
                  numbers: true,
                  symbols: true,                      
            })

      // const user = {
      //          email: this.email ,
      //          context: {
      //              userName: this.name ,
      //              userEmail: this.email ,
      //              userPassword: this.password ,
      //          }
      // }
      // sendEmail(user) 
})

studentSchema.pre('save', async function(){
   const salt = await bcrypt.genSalt(10)
   this.password = bcrypt.hash(this.password, salt)
})

studentSchema.methods.createJWT = function () {
   return jwt.sign({ userId: this._id, name: this.name }, 
                   process.env.JWT_SECRET,
                   { expiresIn: process.env.JWT_EXPIRE }
                  )
}

studentSchema.methods.comparePassword = async function(pass) {
   const isMatch = bcrypt.compare(pass, this.password)

   return isMatch
}

module.exports = mongoose.model("Student", studentSchema)