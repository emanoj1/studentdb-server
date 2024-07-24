// Manage CRUD operations for students & define the necessary routes for handling student data
// Filter students based on the logged-in institution admin 

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const verify = require('../middleware/verifyToken');

// Get all students for the logged-in admin
router.get('/', verify, async (req, res) => {
  try {
    const students = await Student.find({ adminId: req.user._id });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new student
router.post('/add-student', verify, async (req, res) => {
  const student = new Student({
    name: req.body.name,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    dateOfEnrollment: req.body.dateOfEnrollment,
    areaOfStudy: req.body.areaOfStudy,
    adminId: req.user._id, // Associate the student with the logged-in admin
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a student
router.put('/:id', verify, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update student fields
    student.name = req.body.name || student.name;
    student.dateOfBirth = req.body.dateOfBirth || student.dateOfBirth;
    student.gender = req.body.gender || student.gender;
    student.phone = req.body.phone || student.phone;
    student.email = req.body.email || student.email;
    student.address = req.body.address || student.address;
    student.dateOfEnrollment = req.body.dateOfEnrollment || student.dateOfEnrollment;
    student.areaOfStudy = req.body.areaOfStudy || student.areaOfStudy;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student
router.delete('/:id', verify, async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log(`Attempting to delete student with ID: ${studentId}`);

    const student = await Student.findById(studentId);
    if (!student) {
      console.error(`Student with ID ${studentId} not found`);
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.deleteOne({ _id: studentId });
    console.log(`Student with ID ${studentId} deleted successfully`);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
