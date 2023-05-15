import './App.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom"
import NavBar from "./layouts/NavBar"
import Elenco from './pages/Elenco'
import Inserimento from './pages/Inserimento'
import NotFound from './pages/NotFound'
import ProtectedRoutes from './ProtectedRoutes';
import Modifica from './pages/Modifica'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ProtectedRoutes/>}>
      <Route path="account" element={<NavBar/>}>
        <Route index element={<Elenco/>}/>
        <Route path="inserimento" element={<Inserimento/>}/>
        <Route path="modifica" element={<Modifica/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
