import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import ProtectedRoutes from './pages/ProtectedRoutes';
import Inserimento from './pages/Inserimento';
import Elenco from './pages/elenco';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route element={<ProtectedRoutes/>}>
        <Route path='/elenco' element={<Elenco/>}/>
        <Route path='/' element={<Inserimento/>}>
      </Route>
    </Routes>
  );
};

export default App;