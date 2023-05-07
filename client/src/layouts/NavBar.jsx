import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
        <header>
            <nav>
                <h1>MySeries</h1>
                <NavLink to="/">MyMedia</NavLink>
                <NavLink to="inserimento">Inserisci</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
        </>
    );
};

export default NavBar;