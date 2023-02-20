//const students = require("../studentsData");

// Gets all students
async function getAllStudents(req, res) {

    if(students){
        res.setHeader("Content-Type", "text/plain")
        res.status(404)
           .send("No students data found");

        return ;
    }
    
    res.setHeader("Content-Type", "text/json")
       .status(200).send(students);
}


// Create new student
function newStudent(req, res){
    console.log(req.body);
    const {name, year, subjects} = req.body;

    const createdStudent = {
        id : students.length+1,
        name : name,
        year : year,
        subjects : subjects,
        batch : "B1"
    }

    students.push(createdStudent);
    
    console.log("New Student created.")
    res.setHeader("Content-Type", "text/json")
       .status(201).send(JSON.stringify(createdStudent))
}

// Get the student by id
function getById(req, res){
    const studentID = req.params.id ;
    
    const student = students.find(({id}) => id===Number(studentID))
    
    if(!student){
        res.setHeader("Content-Type", "text/plain")
        res.status(404)
           .send("No such student data found");

        return ;
    }

    res.setHeader("Content-Type", "text/json")
       .status(200).send(JSON.stringify(student));
}

// Update Student data
function updateStudent(req, res){
    const studentID = req.params.id ;

    const {year, subjects} = req.body;

    const student = students.find(({id}) => id===Number(studentID));

    if(!student){
        res.setHeader("Content-Type", "text/plain")
        res.status(404)
           .send("No such student exist");

        return ;
    }
    student.year = year;
    student.subjects = subjects;

    console.log("Information successfully updated \n",student);
    res.setHeader("Content-Type", "text/json")
       .status(201).send(JSON.stringify(student));
}

// Delete Student
function deleteStudent(req, res){
    const studentID = req.params.id ;
    
    const student = students.find(({id}) => id===Number(studentID));

    if(!student){
        res.setHeader("Content-Type", "text/plain")
        res.status(404)
           .send("No such student exist");

        return ;
    }

    console.log("Student Data deleted :- id : ",studentID);
    res.setHeader("Content-Type", "text/plain")
    res.status(200)
       .send("Student data deleted");
}

module.exports = {
    getAllStudents,
    newStudent,
    getById,
    updateStudent,
    deleteStudent,
}