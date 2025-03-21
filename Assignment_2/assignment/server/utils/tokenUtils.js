const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    return jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual secret
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { verifyToken };