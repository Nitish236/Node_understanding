const mongoose = require("mongoose")
require("dotenv").config({path: "./config/.env"})

const DB_URI = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.CLUSTER+"mongodb.net/?retryWrites=true&w=majority"

const connectToDatabase = () => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(DB_URI)
}

module.exports = connectToDatabase ;