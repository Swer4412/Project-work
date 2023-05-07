import './App.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom"
import NavBar from "./layouts/NavBar"
import Elenco from './pages/Elenco'
import Inserimento from './pages/Inserimento'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar/>}>
      <Route index element={<Elenco/>}/>
      <Route path="inserimento" element={<Inserimento/>}/>
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
