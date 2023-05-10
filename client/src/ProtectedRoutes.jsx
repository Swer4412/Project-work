import React, { useState } from 'react';
import Login from './pages/Login';
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleFormSubmit = (formData) => {
    //Auth here
    console.log(formData)
    setIsLoggedIn(true);
  }

  return !isLoggedIn ? <Login onFormSubmit={handleFormSubmit} /> : <Outlet />;
};

export default ProtectedRoutes;