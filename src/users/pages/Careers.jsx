import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

function Careers() {
  return (
    <>
      <Header/>
      
      <div className='md:px-40 p-5'>
        <div className='text-center my-5'>
          <h1 className='text-3xl font-bold mb-5'>Careers</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum atque suscipit voluptatibus maxime illum, modi hic consectetur non assumenda temporibus earum, magnam placeat ut odit rem cupiditate quos. Possimus, harum. Eveniet, quod odio placeat libero eligendi cum eaque cumque magnam.</p>
        </div>
        <div className='my-10'>
          <h1 className='text-2xl font-bold'>Current Openings</h1>
          <div className='flex my-10 justify-center items-center'>
            <input type="text" className='p-2 border border-gray-200 text-black w-100 placeholder-gray-500' placeholder='Search by title'/>
            <button className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800'>Search</button>
          </div>
        </div>

        {/* Job listing */}
        <div className='border border-gray-200 p-5 shadow my-5'>
          <div className='flex mb-5'>
            <div className='w-full'>
              <h1>Frontend Developer</h1>
              <hr />
            </div>
            <button className='bg-blue-900 text-white p-3 ms-5 flex items-center'>Apply <FaArrowUpRightFromSquare className='ms-2'/></button>
          </div>
          <p className='flex'><FaLocationDot className='me-2 mt-1'/> Kochi</p>
          <p className='text-lg my-2'>Job Type: FULL TIME</p>
          <p className='text-lg my-2'>Salary : 20000-30000/month</p>
          <p className='text-lg my-2'>Job Type: FULL TIME</p>
          <p className='text-lg my-2'>Job Type: FULL TIME</p>
          <p className='text-lg my-2'>Job Type: FULL TIME</p>

        </div>

      </div>
      <Footer/>
    </>
  )
}

export default Careers
