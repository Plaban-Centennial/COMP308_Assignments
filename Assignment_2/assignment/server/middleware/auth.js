const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt
const User = require('../models/User'); // Import the User model
const { AuthenticationError } = require('apollo-server-express');

// Middleware to verify the token
const authMiddleware = (req) => {
  const token = req.cookies.token; // Get the token from cookies
  if (!token) {
    throw new AuthenticationError('Authentication required');
  }

  try {
    const user = jwt.verify(token, 'your_jwt_secret'); // Verify the token
    return user; // Return the user payload (id, role)
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token');
  }
};

// Login resolver for Apollo GraphQL
const loginHandler = async (_, { username, password }, { res }) => {
  try {
    // Find the user in MongoDB by username
    const user = await User.findOne({ username });
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send token in cookies
    res.cookie('token', token, { httpOnly: true });

    return { message: 'Login successful', token };
  } catch (error) {
    throw new AuthenticationError(error.message || 'An error occurred during login');
  }
};

module.exports = { authMiddleware, loginHandler };