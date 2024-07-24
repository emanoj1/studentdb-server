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

// Update and delete routes...

module.exports = router;


