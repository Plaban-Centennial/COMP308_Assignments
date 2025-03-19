// filepath: e:\College\Semester_6\COMP308_004_Emerging_Technologies\Assignments\Assignment_2\assignment\server\utils\tokenUtils.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const SECRET_KEY = process.env.SECRET_KEY; // Load secret key from .env

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