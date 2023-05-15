import React, { useState, createContext, useEffect } from 'react';
import Login from './pages/Login';
import { Outlet } from "react-router-dom";

export const TokenContext = createContext(null);

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  //Check se il token è gia stato assegnato
  useEffect(() => { //Viene eseguito subito
    const tokenFromSessionStorage = sessionStorage.getItem('token');
    if (tokenFromSessionStorage) {
      setToken(tokenFromSessionStorage);
      setIsLoggedIn(true);
    }
  }, []);

  const onFormSubmit = async (formData) => {
    //Prendo i dati passati dal form di login    
    const email = formData.email;
    const password = formData.password;

    //Mando la richiesta di login all api
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

      //Se l'api mi ha risposto con un token nel body
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
