import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage

  if (!user || user.role !== requiredRole) {
    // Redirect to login if not authenticated or not an admin
    return <Navigate to="/login" />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;