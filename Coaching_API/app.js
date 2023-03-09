require('express-async-errors');

const express = require("express");
const app = express();

const connectToDatabase = require("./database/connection");

// Routers
const auth = require("./routes/auth");
const student = require("./routes/student");
const teacher = require("./routes/teacher");
const manager = require("./routes/manager");

// authenticate
const { authenticateUser, authorizePermissions } = require("./middleware/authentication")

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.urlencoded({extended:false}))
app.use(express.json());

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/students", authenticateUser, student);
app.use("/api/v1/teachers", authenticateUser, teacher);
app.use("/api/v1/manage",  authenticateUser, authorizePermissions("Manager"), manager);


// For creating managers 

// const Manager = require("./model/manager")
// app.use("/api/v1/m", async (req,res)=>{
//     const m = await Manager.create(req.body)

//     res.status(200).json({ m, msg: 'New manager created successfully' })
// })


// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function startServer() {
    try {
        await connectToDatabase()
        console.log("Connected to Database -- ");
        
        app.listen(3000, ()=>{
            console.log("Server listening on port 3000");
        })
    } catch (error) {
        console.log("Error -- ", error)
    }
}

startServer()