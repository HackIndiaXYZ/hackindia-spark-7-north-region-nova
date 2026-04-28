import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const user = JSON.parse(userStr);
    
    // If route requires specific roles and user role is not in allowed list
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to their appropriate dashboard instead of just blocking
      if (user.role === 'admin') return <Navigate to="/dashboard/hospital" replace />;
      if (user.role === 'patient') return <Navigate to="/dashboard/patient" replace />;
      if (user.role === 'super') return <Navigate to="/dashboard/admin" replace />;
      return <Navigate to="/" replace />;
    }
    
    return children;
  } catch (e) {
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
