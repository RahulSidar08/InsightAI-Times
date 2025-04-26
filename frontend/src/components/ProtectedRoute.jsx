import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userdata = useSelector((state) => state.user.userdata);

  if (!userdata) {
    return <Navigate to="/login" replace />; 
  }

  return children;
};

export default ProtectedRoute;
