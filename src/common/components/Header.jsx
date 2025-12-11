import React, { useContext, useEffect, useState } from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { userProfileUpdateContext } from '../../context/ContextShare';
import SERVERURL from '../../services/serverURL';
import { userAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';


function Header() {
    const [listStatus, setListStatus] = useState(false)
    const [dropdownStatus, setDropdownStatus] = useState(false)
    const[token,setToken] = useState("")
    const [userProfile, setUserProfile] = useState("")
    const [username, setUsername] = useState("")
    // console.log(token);
    // console.log(username);
    console.log(userProfile);

    const {setAuthorisedUser} = useContext(userAuthContext)

    const navigate = useNavigate()
    const logout = ()=>{
        sessionStorage.clear()
        toast.success("Logout Successfully")
        setAuthorisedUser(false)
        navigate("/")
    }
    
    const {userProfileUpdateStatus} = useContext(userProfileUpdateContext)

      useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setToken(sessionStorage.getItem("token"))
        }
        if(sessionStorage.getItem("existingUser")){
            const name = JSON.parse(sessionStorage.getItem("existingUser"))
            setUsername(name.username)
            const existingProfile = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserProfile(existingProfile.profile)
        }
      },[userProfileUpdateStatus])
      
    return (
        <>
            <div className="grid grid-cols-3 p-3">
                {/*logo */}
                <div className='flex items-center'>
                    <img width={"70px"} height={"70px"} src='https://classroomclipart.com/image/static7/preview2/school-book-text-books-various-color-and-sized-clip-art-59396.jpg' />
                    <h1 className='font-bold text-2xl ms-2 md:hidden'>BO0KSTORE</h1>
                </div>
                {/*title */}
                <div className='md:flex justify-center items-center hidden'>
                    <h1 className='text-3xl font-bold'>BOOKSTORE</h1>
                </div>
                {/*login */}
                <div className='md:flex justify-end items-center hidden'>
                    <FaInstagram className='me-3 text-2xl' />
                    <FaTwitter className='me-3 text-2xl' />
                    <FaFacebook className='me-3 text-2xl' />
                    {!token ?
                        <Link to={"/login"}><button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3 
                    hover:bg-black hover:text-white'><FaRegUser className='me-3' />Login</button></Link>
                        :
                        <div className='relative inline-block text-left'>
                            <button onClick={() => setDropdownStatus(!dropdownStatus)} className='w-full flex items-center bg-white px-3 py-2 shadow-xs hover:bg-gray-200' >
                                <img 
                                src={userProfile == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png'
                                    : userProfile.startsWith("https") ? userProfile
                                    : `${SERVERURL}/imguploads/${userProfile}`
                                } 
                                width={"50px"} height={"50px"} style={{ borderRadius: "50%" }} alt='' />
                                <p className='ms-2'>{username}</p>
                            </button>
                            {dropdownStatus &&
                                <div className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg'>
                                    <Link to={"/profile"}>  <button className='block px-4 py-2 text-sm text-gray-70 '>Profile</button></Link>
                                    <Link><button onClick={logout} className='block px-4 py-2 text-sm text-gray-70 '>Logout</button></Link>

                                </div>}
                        </div>
                    }
                </div>

            </div>
            <nav className=' w-full bg-gray-900 text-white p-3 '>
                <div className='flex justify-between items-center md:hidden'>
                    <button onClick={() => setListStatus(!listStatus)}><IoMdMenu className='text-2xl' /></button>
                    <Link to={"/login"}><button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3 
                    hover:bg-black hover:text-white'><FaRegUser className='me-3' />Login</button></Link>

                </div>
                <ul className={listStatus ? 'flex flex-col' : ' md:flex justify-center items-center hidden'}>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to={"/"} >Home</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to={"/all-books"} >Books</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to={"/careers"} >Careers</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to={"/contact"} >Contact</Link></li>
                </ul>

            </nav>
        </>
    )
}

export default Header