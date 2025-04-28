import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login.pages'
import Register from './pages/register.pages'
import "./App.css"
function App() {


  return (
    <>
     
      <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />}/>
        <Route path='/register' element={<Register />} />

      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
