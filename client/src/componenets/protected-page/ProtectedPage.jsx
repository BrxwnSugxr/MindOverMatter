import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedPage = ({ isLoggedIn }) => {
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedPage;
