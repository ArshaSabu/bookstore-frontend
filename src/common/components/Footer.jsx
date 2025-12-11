import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className='md:grid grid-cols-3 md:gap-9 bg-gray-900 text-white p-10'>
        <div>
            <h3 className='text-bold'>About Us</h3>
            <p className='text-justify mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum officia illo ex itaque adipisci. Perferendis impedit voluptatem, voluptates, aperiam laudantium doloremque aut adipisci nulla explicabo nostrum quae labore reiciendis quis!</p>
        </div>
        <div>
            <h3 className='font-bold'>NEWSLETTER</h3>
            <p className='my-5'>Stay Updated with out latest Trends</p>
            <div className='flex'>
                <input type="text" placeholder='Email Id' className='p-2 bg-white placeholder-gray-500'/>
                <button className='bg-yellow-400 p-3'><FaArrowRight /></button>
            </div>
        </div>
        <div>
            <h3 className='font-bold'>Follow Us</h3>
            <p className='my-5'>Let us be Social</p>
            <div className='flex'>
                <FaInstagramSquare className='me-3 text-2xl'/>
                <FaTwitter className='me-3 text-2xl'/>
                <FaFacebookSquare className='me-3 text-2xl'/>
                <FaLinkedin className='text-2xl'/>
            </div>
        </div>
      </div>
      <div className='bg-black p-3 text-center text-white'>
        <p>Copyright © 2023 All rights reserved | This website is made with &#10084; by Arsha S | LUMINAR TECHNOLAB</p>
      </div>
    </>
  )
}

export default Footer
