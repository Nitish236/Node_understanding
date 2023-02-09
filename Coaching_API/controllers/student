const students = require("../studentsData");

// Gets all students
function getAllStudents(req, res) {
    res.send(students);
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

    res.write("New student Created");
    res.end(JSON.stringify(createdStudent));
}

// Get the student by id
function getById(req, res){
    const studentID = req.params.id ;
    
    const student = students.find(({id}) => id===Number(studentID))
    
    if(!student){
        res.status(404).send("Student not found");
    }

    res.end(JSON.stringify(student));
}

// Update Student data
function updateStudent(req, res){
    const studentID = req.params.id ;

    const {year, subjects} = req.body;

    const student = students.find(({id}) => id===Number(studentID));

    if(!student){
        res.status(404).send("No such student exist");
    }
    student.year = year;
    student.subjects = subjects;

    console.log(student);
    res.status(201).end(JSON.stringify(student));
}

// Delete Student
function deleteStudent(req, res){
    const studentID = req.params.id ;
    
    const student = students.find(({id}) => id===Number(studentID));

    if(!student){
        res.status(404).send("No such student exist");
    }

    console.log(studentID);
    res.send("Deleted");
}

module.exports = {
    getAllStudents,
    newStudent,
    getById,
    updateStudent,
    deleteStudent,
}