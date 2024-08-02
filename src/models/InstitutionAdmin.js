// Define the schema for institution admins.

const mongoose = require('mongoose');

const institutionAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  instituteName: {
    type: String,
    required: true
  },
  instituteRegistrationNumber: {
    type: String,
    required: true,
  },
  securityAnswer1: {
    type: String,
    required: true,
  },
  securityAnswer2: {
    type: String,
    required: true,
  },
  securityAnswer3: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('InstitutionAdmin', institutionAdminSchema);

