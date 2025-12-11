import React, { useContext } from 'react'
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function AdminHeader() {

  const {setAuthorisedUser} = useContext(userAuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.clear()
    toast.success("Logout Successfully")
    setAuthorisedUser(true)
    navigate("/login") // redirect to home page
  }
  return (
    <>
      <div className="px-5 py-3 flex items-center">
                {/*logo */}
                <div className='flex items-center'>
                    <img width={"70px"} height={"70px"} src='https://classroomclipart.com/image/static7/preview2/school-book-text-books-various-color-and-sized-clip-art-59396.jpg' />
                    <h1 className='font-bold text-2xl flex ms-4'>BO0KSTORE</h1>
                </div>
                
                {/*login */}
                <div className='ms-auto'>
                    <button onClick={handleLogout} className='flex justify-between items-center border border-black rounded px-4 py-3 ms-3 
                    hover:bg-black hover:text-white'><FaPowerOff className='me-3'/> Logout</button>

                </div>

            </div>
    </>
  )
}

export default AdminHeader
