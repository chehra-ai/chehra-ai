import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;