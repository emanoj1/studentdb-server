// Define the schema for students

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateOfEnrollment: {
    type: Date,
    required: true,
  },
  areaOfStudy: {
    type: String,
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstitutionAdmin',
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);

