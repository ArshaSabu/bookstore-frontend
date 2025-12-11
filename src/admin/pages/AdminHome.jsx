import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FaBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import Footer from '../../common/components/Footer'
import { getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allAPI';

function AdminHome() {
  const [bookCount, setBookCount] = useState("")
  const [userCount, setUserCount] = useState("")
  const [token, setToken] = useState("")

//book count
const getBookCount = async () => {
  try {
    const result = await getAllBooksAdminAPI();
    console.log(result);
    setBookCount(result.data.length);
  } catch(error) {
    console.log(error);
  }
};

//user count
const getUserCount = async () => {
  try {
    //reqHeader
    const reqHeader = { "Authorization": `Bearer ${token}` };
    const result = await getAllUsersAPI(reqHeader);
    console.log(result);
    setUserCount(result.data.length);             
  } catch(error) {
    console.log(error);
  }
};

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }
},[])

useEffect(()=>{
  if(token){
    getBookCount() // also works if there is no token
    getUserCount()
  }
}, [token])
    
  return (
    <>
      <AdminHeader/>

      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div>
          <AdminSidebar/>
        </div>
        <div className='p-4'>
          <div className='md:grid grid-cols-3 text-white'>
            <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-blue-700 rounded p-4'>
                <div className='flex justify-center items-center'><FaBook className='text-3xl'/></div>
                <div>
                  <h1>Total Number of Books : <span className='text-xl'>{bookCount}</span></h1>
                </div>
              </div>
              
            </div>
             <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-green-700 rounded p-4'>
                <div className='flex justify-center items-center'><FaUser className='text-3xl'/></div>
                <div>
                  <h1>Total Number of Users : <span className='text-xl'>{userCount}</span></h1>
                </div>
              </div>
            </div>
             <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-yellow-700 rounded p-4'>
                <div className='flex justify-center items-center'><FaUserGraduate className='text-3xl'/></div>
                <div>
                  <h1>Total Number of Applicants : <span className='text-xl'>85</span></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default AdminHome
