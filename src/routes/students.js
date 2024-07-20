// Manage CRUD operations for students & define the necessary routes for handling student data

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    dateOfEnrollment: req.body.dateOfEnrollment,
    areaOfStudy: req.body.areaOfStudy
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting student with ID: ${req.params.id}`);
    const student = await Student.findById(req.params.id);
    if (!student) {
      console.log('Student not found');
      return res.status(404).send({ message: 'Student not found' });
    }
    await Student.deleteOne({ _id: req.params.id }); // Correct method
    res.send({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;

