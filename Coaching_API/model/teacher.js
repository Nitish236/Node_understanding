const { Schema, model } = require("mongoose");


const studentSchema = new Schema({
     name: {
        type: String,
        required: [true, "Provide Student's name"],
        maxLength: [25, "Length of the name can be max 25 characters"]
     },
     gmail: {
        type: String,
        required: [true, "Gmail Id is required"]
     },
     class: {
        type: Number,
        required: [true, "Class is required"]
     },
     subjects: [String],
     contact: {
        parent: {type: Number, required: true},
        student: {type: Number, required: true, },
        required: true,
     },
})

module.exports = model("Student", studentSchema)