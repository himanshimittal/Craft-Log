import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if token exists in localStorage (or check any other auth logic)
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (the protected component)
  return children;
};

export default PrivateRoute;
