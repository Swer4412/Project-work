import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from './Login';

const useAuth = () => {
    //Implementa autenticazione
    const user = {loggedIn: false};
    return user && user.loggedIn; //Serve per quando fai l'autenticazione vera
}


const ProtectedRoutes = () => {

    const isAuth = useAuth()

    return isAuth ? <Outlet/> : <Login/>;
};

export default ProtectedRoutes;