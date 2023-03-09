require("dotenv").config()

const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const generatePass = require("generate-password")
const jwt = require("jsonwebtoken");
const sendEmail = require("../mailService/email");

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [5, "Name should be greater than 4 characters"],
        maxLength: [50, "Name should be less than 50 characters"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    role: {
        type: String,
        default: "Manager",
    },
    age: {
        type: Number,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    password: {
        type: String,
    }

}, {timestamps: true} )


managerSchema.pre('save', async function(){
    this.password 
         = generatePass.generate({
                 length: 8,
                 numbers: true,                      
           })
 })
 
managerSchema.pre('save', async function() {
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
 
managerSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name, role: this.role }, 
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRE }
                   )
 }
 
managerSchema.methods.comparePassword = async function(pass) {
    const isMatch = await bcrypt.compare(pass, this.password)
 
    return isMatch
 }

module.exports = mongoose.model("Manager", managerSchema)
