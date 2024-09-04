import { useState } from 'react'
import './App.css'
import { BrowserRouter as Browser,Route, Router,Routes } from 'react-router-dom';
import { Register } from './pages/register/Register.jsx';
import { Login } from './pages/login/Login.jsx';
import { Home } from './pages/dashborad/Home.jsx';
import { ApplicationForm } from './pages/form/ApplicationForm.jsx';

import { ToastContainer, toast } from 'react-toastify';
import { Applications } from './pages/applications/Applications.jsx';


function App() {
  return (
    <div>
    <Browser>
    <Routes>

    
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Register/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/form' element={<ApplicationForm/>}/>
    <Route path='/my-application' element={<Applications/>}/>
  
    </Routes>
    </Browser> 
    <ToastContainer />


   </div>
  )
}

export default App
