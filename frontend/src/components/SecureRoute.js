// src/components/SecureRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SecureRoute = ({ element, roles, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect if user doesn't have required role
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default SecureRoute;
