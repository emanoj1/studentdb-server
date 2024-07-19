// Handle user registration and login

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verifyToken');
const InstitutionAdmin = require('../models/InstitutionAdmin');

// Register
router.post('/register', async (req, res) => {
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const admin = new InstitutionAdmin({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    instituteName: req.body.instituteName,
    instituteRegistrationNumber: req.body.instituteRegistrationNumber
  });

  try {
    const savedAdmin = await admin.save();
    res.send({ admin: admin._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  // Check if the email exists
  const admin = await InstitutionAdmin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send({ message: 'Email is not found' });

  // Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send({ message: 'Invalid password' });

  // Create and assign a token
  const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).send({ token });
});

// Update admin profile
router.put('/profile', verify, async (req, res) => {
  const { name, email, instituteName, instituteRegistrationNumber, password } = req.body;

  try {
    // Find the admin by ID from the token
    const admin = await InstitutionAdmin.findById(req.user._id);
    if (!admin) return res.status(404).send({ message: 'Admin not found' });

    // Update fields
    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.instituteName = instituteName || admin.instituteName;
    admin.instituteRegistrationNumber = instituteRegistrationNumber || admin.instituteRegistrationNumber;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();
    res.send(admin);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;

