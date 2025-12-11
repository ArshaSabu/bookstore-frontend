import React, { useContext, useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import { PiBook } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import { adminProfileUpdateContext } from "../../context/ContextShare";
import SERVERURL from '../../services/serverURL';

function AdminSidebar() {
  const [adminName, setAdminName] = useState("")
  const [existingProfile, setExistingProfile] = useState("")
  const {adminProfileUpdateStatus} = useContext(adminProfileUpdateContext)

  useEffect(()=>{
    // const existingUser = JSON.parse(sessionStorage.getItem("existingUser")); 
    // if (existingUser) { 
    //   setAdminName(existingUser.username); 
    //   setExistingProfile(existingUser.profile); 
    // }
    setAdminName(JSON.parse(sessionStorage.getItem("existingUser")).username)
    setExistingProfile(JSON.parse(sessionStorage.getItem("existingUser")).profile)
  },[adminProfileUpdateStatus])

  return (
    <>
      <div className='bg-gray-200 w-full md:min-h-screen flex items-center flex-col'>
        <div className='my-10'>
            <img src={existingProfile ?  `${SERVERURL}/imguploads/${existingProfile}`:  "https://cdni.iconscout.com/illustration/premium/thumb/female-user-image-illustration-svg-download-png-6515859.png"} style={{width:"170px", height:"170px", borderRadius:"50%"}} alt="" />                                      
        </div>
        <h1 className='text-2xl mb-10'>{adminName}</h1>
        <div className='mb-10'>
            <div className='mb-4 flex'>
                {/* <input type="radio" id='home' readOnly/> */}
                <Link to={"/admin-home"}><label htmlFor="" className='flex ms-3'><FaHome className='mt-1 me-1'/>Home</label></Link>            </div>
            <div className='mb-4 flex'>
                {/* <input type="radio" id='books'readOnly/> */}
                <Link to={"/admin-books"}><label htmlFor="" className='flex ms-3'><PiBook className='mt-1 me-1'/>Books</label></Link>            </div>
            <div className='mb-4 flex'>
                {/* <input type="radio" id='careers'readOnly/> */}
                <Link to={"/admin-careers"}><label htmlFor="" className='flex ms-3'><FaGraduationCap className='mt-1 me-1'/>Careers</label></Link>            </div>
            <div className='mb-4 flex'>
                {/* <input type="radio" id='settings' readOnly/> */}
                <Link to={"/admin-settings"}><label htmlFor="" className='flex ms-3'><IoMdSettings className='mt-1 me-1'/>Settings</label></Link>            </div>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
