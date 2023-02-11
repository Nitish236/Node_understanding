const teachers = require("../teachersData");

// Send all teachers data
function getAllTeachers(req, res){
    if(teachers.length<1){
        res.setHeader("Content-Type", "text/plain")
        res.status(404)
           .send("No teachers data found");

        return ;
    }

    res.setHeader("Content-Type", "text/json")
       .status(200).send(teachers);
}

// Create New Teacher
function newTeacher(req, res){
    const { name, subject, years } = req.body;

    const teacher = {
        id : teachers.length+1,
        name : name,
        subject : subject,
        years : years,
        batches : ["B1"],
        salary : 35000
    }

    teachers.push(teacher);

    console.log("New Teacher created.")
    res.setHeader("Content-Type", "text/json")
       .status(201).send(JSON.stringify(teacher))
}

// Get teacher by id
function getById(req, res){
    const teacherID = req.params.id;

    const teacher = teachers.find(({id}) => id === Number(teacherID) );

    if(!teacher){
        res.setHeader("Content-Type", "text/plain")
        res.status(404)
           .send("No such teacher exist");

        return ;
    }

    res.setHeader("Content-Type", "text/json")
       .status(200).send(JSON.stringify(teacher));
}

// Update Teacher
function updateTeacher(req, res){
    const teacherID = req.params.id ;

    const {subject, years, batches, salary} = req.body;

    let teacher = teachers.find(({id}) => id===Number(teacherID));

    if(!teacher){
        res.setHeader("Content-Type", "text/plain")
        res.status(404)
           .send("No such teacher exist");

        return ;
    }

    teacher.subject = subject;
    teacher.years = years;
    teacher.batches = batches;
    teacher.salary = salary;

    console.log("New teacher is created :- \n",teacher);
    res.setHeader("Content-Type", "text/json")
       .status(200).send(JSON.stringify(teacher));
}

// Delete Student
function deleteTeacher(req, res){
    const teacherID = req.params.id ;

    const teacher = teachers.find(({id}) => id===Number(teacherID));

    if(!teacher){
        res.setHeader("Content-Type", "text/plain")
        res.status(404)
           .send("No such teacher exist");

        return ;
    }

    console.log("Teacher data deleted :- id : ",teacherID);
    res.setHeader("Content-Type", "text/plain")
       .status(200).send("Teacher data deleted succesfully.");
}

module.exports = {
    getAllTeachers,
    newTeacher,
    getById,
    updateTeacher,
    deleteTeacher,
}