const express = require("express");
const app = express();

const student = require("./routes/student");

app.use("/api/v1/", student);

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
})