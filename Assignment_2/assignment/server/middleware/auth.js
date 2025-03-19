const { verifyToken } = require('../utils/tokenUtils');

const authMiddleware = (req) => {
  const token = req.cookies.token; // Get the token from cookies
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const user = verifyToken(token); // Verify the token
    return user; // Return the user payload (id, role)
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = authMiddleware;