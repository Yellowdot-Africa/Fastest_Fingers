import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Update the import path according to your project structure

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth(); // Assuming useAuth returns an object with the token
  const location = useLocation();

  if (!token) {
    // Redirect to login page, preserving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>; // Using fragment here to avoid any unnecessary div/span wrapping around children
};

export default PrivateRoute;
