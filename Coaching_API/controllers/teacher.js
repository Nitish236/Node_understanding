

// Send all teachers data
const getAllTeachers = async (req, res) => {
    
    res.setHeader("Content-Type", "text/json")
       .status(200).json({ msg: "All teachers" });
}

// Create New Teacher
const newTeacher = async (req, res) => {
    
    console.log("New Teacher created.")
    res.setHeader("Content-Type", "text/json")
       .status(201).json({ msg: "New teacher" })
}

// Get teacher by id
const getTeacherById = async (req, res) => {
    
    res.setHeader("Content-Type", "text/json")
       .status(200).json({ msg: "Teacher one" });
}

// Update Teacher
const updateTeacher = async (req, res) => {
    
    console.log("New teacher is created :- \n");
    res.setHeader("Content-Type", "text/json")
       .status(200).json({ msg: "Update teacher" });
}

// Delete Student
const deleteTeacher = async (req, res) => {
    
    console.log("Teacher data deleted :- id : ");
    res.setHeader("Content-Type", "text/plain")
       .status(200).json({ msg: "Teacher data deleted succesfully." });
}

module.exports = {
    getAllTeachers,
    newTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
}