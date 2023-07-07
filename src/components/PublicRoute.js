import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user.data)
  return user ? <Navigate to="/dashboard" /> : children
};

export default PublicRoute;