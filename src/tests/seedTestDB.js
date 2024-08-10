// Seed the Database Programmatically
// to insert test data into your MongoDB test database
// Helps in the testing of authLogin.test.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const InstitutionAdmin = require('../models/InstitutionAdmin');

console.log('MONGO_URI_TEST:', process.env.MONGO_URI_TEST);

async function seed() {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash('TesTpAssWoRd123!', 10);

    const testUser = new InstitutionAdmin({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        instituteName: 'Test Institute',
        instituteRegistrationNumber: '123456789',
        securityAnswer1: 'TestCar',
        securityAnswer2: 'TestConcert',
        securityAnswer3: '12345'
    });

    await testUser.save();
    console.log('Test user seeded successfully');
    mongoose.disconnect();
}

seed();


