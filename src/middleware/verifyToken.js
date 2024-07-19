// A middleware function
// To verify the JWT token and ensure that the user is authenticated 
// before accessing protected routes, such as the admin profile update route.

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' });
  }
}

module.exports = verifyToken;
