import React, { useState } from 'react';
import Login from './pages/Login';
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onFormSubmit = async (formData) => {
    const email = formData.email
    const password = formData.password
    console.log(email + password)
    
    //Call to api
    const response = await fetch("http://localhost:5000/login", {
      headers: {email:email, password:password}
    })

    const isAuth = response.status === 200 ? true : false
    setIsLoggedIn(isAuth);
    return isAuth
  }

  return !isLoggedIn ? <Login onFormSubmit={onFormSubmit} /> : <Outlet />;
};

export default ProtectedRoutes;