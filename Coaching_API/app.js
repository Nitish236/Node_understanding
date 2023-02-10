const { json } = require("express");
const express = require("express");
const app = express();

const student = require("./routes/student");

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use("/api/v1/students", student);

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
})