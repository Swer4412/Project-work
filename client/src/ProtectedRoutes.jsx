import React, { useState } from 'react';
import Login from './pages/Login';
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [responseData, setResponseData] = useState()

  const onFormSubmit = (formData) => {
    const email = formData.email
    const password = formData.password
    console.log(email + password)
    
    //Call to api
    setResponseData(fetch("http://localhost:5000/login", {
      headers: {email:email, password:password, "Content-Type": "application/json"}
    })
    .then(res => res.json())
    )

    //Sistema, questo viene undefined
    console.log(responseData)

    const isAuth = responseData.msg === "Ok" ? true : false
    setIsLoggedIn(isAuth);
    return isAuth
  }

  return !isLoggedIn ? <Login onFormSubmit={onFormSubmit} /> : <Outlet />;
};

export default ProtectedRoutes;