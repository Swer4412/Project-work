import React, { useState } from 'react';
import Login from './pages/Login';
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onFormSubmit = (formData) => {
    const email = formData.email
    const password = formData.password
    //Guarda file authenticate,js, passo email e password e ritorno qualcosa
    const isAuth = true
    setIsLoggedIn(isAuth);
    return isAuth
  }

  return !isLoggedIn ? <Login onFormSubmit={onFormSubmit} /> : <Outlet />;
};

export default ProtectedRoutes;