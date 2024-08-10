const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

// Before all tests, connect to the test database
beforeAll(async () => {
  const url = process.env.MONGO_URI_TEST; // Using the test database
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// After all tests, disconnect from the test database
afterAll(async () => {
    await mongoose.disconnect();
  });

describe('Auth Routes - Login', () => {
  it('should login an existing user', async () => {
    // Assumption: a user already registered with the below credentials in the test database
    // Use seedTestDB.js to seed test data into the database
    const res = await request(app)
      .post('/api/user/login')
      .send({
        email: 'test@example.com',
        password: 'TesTpAssWoRd123!',
      });

    // Check that the response has a status of 200 (OK)
    expect(res.statusCode).toBe(200);
    // Check that the response contains a token
    expect(res.body).toHaveProperty('token');
  });
});
