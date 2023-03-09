require("dotenv").config()

const mongoose = require("mongoose")
const generatePass = require("generate-password")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../mailService/email")

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
     address: {
        type: String,
        required: [true, "Address is required"]
     }
}, { timestamps: true } )


studentSchema.pre('save', function(){
      this.password  = generatePass.generate({
                  length: 8,
                  numbers: true                      
            })
})

studentSchema.pre('save', async function() {
   const pass = this.password

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
   
   const user = {
      email: this.email ,
      context: {
          userName: this.name ,
          userEmail: this.email ,
          userPassword: pass ,
          role: this.role,
      }
   }
   sendEmail(user)
})

studentSchema.methods.createJWT = function () {
   return jwt.sign({ userId: this._id, name: this.name, role: this.role }, 
                   process.env.JWT_SECRET,
                   { expiresIn: process.env.JWT_EXPIRE }
                  )
}

studentSchema.methods.comparePassword = async function(pass) {
   const isMatch = await bcrypt.compare(pass, this.password)

   return isMatch
}

module.exports = mongoose.model("Student", studentSchema)