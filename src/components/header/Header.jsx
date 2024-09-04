import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Accountpage from '../../pages/account/Accountpage'
export const Header = () => {
  return (
    <div className='Container'>
     <div className='parent-container'>
        <div className='child-container'>
        <span className='text-2xl font-semibold'>FMP</span>
        <Link to='/form' className='nav-link'> Finance Application Form</Link>
        <span> 
        <Accountpage/>
        </span>
        </div>

     </div>
    </div>
  )
}
