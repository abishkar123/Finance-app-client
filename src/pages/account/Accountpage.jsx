import React, { useEffect, useState } from 'react'
import './Account.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import { logoutAction } from '../../redux/user/UserAction'
import { setUser } from '../../redux/user/UserSlice';

export default function Accountpage() {
    const [show, setShow] = useState(false);
    

    useEffect(()=>{
       const userString = localStorage.getItem('userInfo')
       const user = userString? JSON.parse(userString) : null 
          if(user?._id){
           dispatch(setUser(user))
          
          }
      
        },[])

    const {user} = useSelector((state)=>state.user)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
           
    const navigate = useNavigate()

    const handlelogout = (e)=>{
        e.preventDefault();
        try {
        
            dispatch(logoutAction());
            navigate('/');
            toast.success('Successfully logged out!');
        } catch (error) {
          toast.error('Logout Failed!');
        }
        }
    
   

  return (
    <div>
        {!show &&(
            <button onClick={handleShow}>
                
                <svg xmlns="http://www.w3.org/2000/svg" 
                 height="28px" viewBox="0 -960 960 960" width="28px" 
                 fill="#5985E1"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
            </button>
        )}

        {show &&(
            <div className='account-pannel'>
                <button className='d-flex justify-left mt-4' onClick={handleClose}>
                <svg  xmlns="http://www.w3.org/2000/svg" 
                height="24px" viewBox="0 -960 960 960" width="24px" 
                fill="#5f6368">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
                <p className=' d-flex justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" 
                height="28px" viewBox="0 -960 960 960" width="28px" fill="#0000F5"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                
                </p>
                <span className='mt-0'>{user.email}</span>
                <Link className='nav-link mt-3' to="/my-application">Applications</Link>
                <button className='mt-3' onClick={handlelogout}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                <title>Logout</title>
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                </svg>

                </button>
                 
            </div>
        )}



    </div>
  )
}
