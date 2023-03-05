const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const generatePass = require("generate-password")

const studentSchema = new Schema({
     name: {
        type: String,
        required: [true, "Provide Student's name"],
        minLength: 4,
        maxLength: [50, "Length of the name can be max 25 characters"]
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
     classYr: {
        type: String,
        required: [true, "Class is required"]
     },
     subjects: {
        type: Array,
     },
     contact: {
        parent: {type: Number, required: true},
        student: {type: Number, required: true, }
     },
})

studentSchema.pre('save', async function(){
     this.password 
          = generatePass.generate({
                  length: 8,
                  numbers: true,
                  symbols: true,                      
            })
})

studentSchema.pre('save', async function(){
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
   
})

module.exports = model("Student", studentSchema)