const { json } = require("express");
const express = require("express");
const app = express();

const connectToDatabase = require("./database/connection");
const { default: mongoose } = require("mongoose");

const student = require("./routes/student");
const manager = require("./routes/manager");

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use("/api/v1/students", student);
app.use("/api/v1/manage", manager);


async function startServer() {
    try {
        await connectToDatabase()
        console.log("Connected to Database -- ");
        
        app.listen(3000, ()=>{
            console.log("Server listening on port 3000");
        })
    } catch (error) {
        console.log("Error -- ", error)
    } finally {
        await mongoose.disconnect()
    }
}

startServer()