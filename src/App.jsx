import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Browser,Route, Router,Routes } from 'react-router-dom';
import { Register } from './pages/register/Register.jsx';
import { Login } from './pages/login/Login.jsx';
import { Home } from './pages/dashborad/Home.jsx';
import { ApplicationForm } from './pages/form/ApplicationForm.jsx';

import { ToastContainer, toast } from 'react-toastify'; 
import { Applications } from './pages/applications/Applications.jsx';
import { EditApplication } from './pages/applications/EditApplication.jsx';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/user/UserSlice.jsx';

function App() {
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   const userString = localStorage.getItem('userInfo')
  //   const user = userString? JSON.parse(userString) : null 
  //   if(user?._id){
  //     dispatch(setUser(user))
    
  //   }

  // },[])
  return (
    <div>
    <Browser>
    <Routes>

    
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Register/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/form' element={<ApplicationForm/>}/>
    <Route path='/my-application' element={<Applications/>}/>
    <Route path='/my-application/:_id' element={<EditApplication/>
  
  } />

    </Routes>
    </Browser> 
    <ToastContainer />


   </div>
  )
}

export default App
