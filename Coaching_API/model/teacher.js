require("dotenv").config()

const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const generatePass = require("generate-password")
const jwt = require("jsonwebtoken")

const teacherSchema = new Schema({
     name: {
        type: String,
        required: [true, "Provide Student's name"],
        minLength: 5,
        maxLength: [50, "Length of the name can be max 50 characters"]
     },
     email: {
        type: String,
        required: [true, "Email is required"],
        match: [
           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
           , 'Please provide a valid Email',
        ],
        unique: true
     },
     role: {
       type: String,
       default: "Teacher",
     },
     age: {
        type: Number
     },
     password: {
        type: String
     },
     contactDetails: {
         address: { type: String, required: true },
         contactNo: { type: Number, required: true }
     },
     qualification: {
         degree: { type: String, required: true },
         experience: {type: Number, required: true },
     },
     subjects: {
         type: Array
     }
}, { timestamps: true } )

teacherSchema.pre('save', async function(){
   this.password 
        = generatePass.generate({
                length: 8,
                numbers: true,
                symbols: true,                      
          })
})

teacherSchema.pre('save', async function(){
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

teacherSchema.methods.createJWT = function () {
   return jwt.sign({ userId: this._id, name: this.name }, 
                   process.env.JWT_SECRET,
                   { expiresIn: process.env.JWT_EXPIRE }
                  )
}

teacherSchema.methods.comparePassword = async function(pass) {
   const isMatch = bcrypt.compare(pass, this.password)

   return isMatch
}

module.exports = model("Teacher", teacherSchema)