import React from 'react'
import { Header } from '../../components/header/Header'
import { CustomTable } from '../../components/custom-table/CustomTable'

export const Applications = () => {
  return (
    <div className='font-nunito w-full h-full'>
        <div>
            <Header/>
        </div>
        <p className='text-xl font-semibold d-flex justify-center mt-3'>My-Applications</p>
        <div>
            <CustomTable/>

        </div>
    
        
        
    </div>
  )
}
