import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <nav className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold"><Link to="/">MySeries</Link></h1>
          <div>
            <NavLink to="" className="px-4 py-2 rounded hover:bg-gray-700">
              MyMedia
            </NavLink>
            <NavLink
              to="inserimento"
              className="px-4 py-2 rounded hover:bg-gray-700"
            >
              Inserisci
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="bg-gray-800 flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </>
  );
};

export default NavBar;