const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Replace with a secure key from environment variables

// Generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Payload
    SECRET_KEY, // Secret key
    { expiresIn: '1d' } // Token expiration
  );
};

// Verify a JWT token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };