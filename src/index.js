//This file sets up the Express server, connects to MongoDB, and initializes routes.


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const institutionRoutes = require('./routes/institutions');

// Route middlewares
app.use('/api/user', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/institutions', institutionRoutes);

// Only connect to MongoDB and start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;