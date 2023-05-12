import React, { useState, createContext, useEffect } from 'react';
import Login from './pages/Login';
import { Outlet } from "react-router-dom";

export const TokenContext = createContext(null);

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromSessionStorage = sessionStorage.getItem('token');
    if (tokenFromSessionStorage) {
      setToken(tokenFromSessionStorage);
      setIsLoggedIn(true);
    }
  }, []);

  const onFormSubmit = async (formData) => {
    const email = formData.email;
    const password = formData.password;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.token) {
        sessionStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setToken(data.token);
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <TokenContext.Provider value={token}>
      {!isLoggedIn ? <Login onFormSubmit={onFormSubmit} /> : <Outlet />}
    </TokenContext.Provider>
  );
};

export default ProtectedRoutes;
