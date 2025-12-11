import React, { useContext, useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { googleLoginAPI, loginAPI, registerAPI } from '../../services/allAPI';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { userAuthContext } from '../../context/AuthContext';

function Auth({ register }) {

  const navigate = useNavigate()
  const [viewPassword, setViewPassword] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  const {setAuthorisedUser} = useContext(userAuthContext)

  const HandleRegister = async () => {
    const { username, email, password } = userDetails //destructuring 
    if (!username || !email || !password) {
      alert("Fill the form completely")
    } else {
      // alert("Ready for API call")
      const result = await registerAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success(`Registered Successfully`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate("/login")
      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error(`Something Went Wrong`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  // Handle login
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("Fill the form completely")
    } else {
      const result = await loginAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token) // here token is already in string format so no need of json.stringif
        toast.success(`Login Successfully`)
        setAuthorisedUser(true)
        if (result.data.existingUser.role == "admin") {
          navigate("/admin-home")
        } else {
          navigate("/")
        }
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else if (result.status == 401) {
        toast.warning(result.response.data)
      } else {
        toast.error(`Something Went Wrong`)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  //Google login
  const handleGoogleLogin = async(credentialResponse)=>{
    console.log(credentialResponse.credential);
    const googleData = jwtDecode(credentialResponse.credential)
    console.log(googleData);
    try{
      const result = await googleLoginAPI({password:"googlepassword", email: googleData.email, username: googleData.name, profile: googleData.picture})
      console.log(result);
      if(result.status == 200){
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setAuthorisedUser(true)
        toast.success("Login Successfull")
        if(result.data.existingUser.role == "admin"){
          navigate("/admin-home")
        } else{
          navigate("/")
        }
      }else{
        toast.error("Something went wrong")
      }
    } catch(error){
      console.log(error);
      
    }
  }

  return (
    <>
      <div className='w-full min-h-screen flex flex-col justify-center items-center bg-[url(https://img.freepik.com/premium-photo/blue-gradient-studio-background-with-window-shadows-foliage_875825-78485.jpg)] bg-cover bg-center'>
        <div className='p-10'>
          <h1 className='text-3xl font-bold text-center'>BOOKSTORE</h1>

          {/* Form */}
          <div style={{ width: "400px" }} className='bg-blue-950 text-white p-5 flex flex-col my-5 justify-center items-center'>
            <div style={{ width: "100px", height: "100px", borderRadius: "50%" }} className='border mb-3 flex justify-center items-center'>
              <FaCircleUser className='text-6xl' />
            </div>

            <h1 className='text-2xl'>{register ? "Register" : "Login"}</h1>

            <form action="">
              {register && <div className='my-5'>
                <label htmlFor="">Username</label>
                <input value={userDetails?.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} placeholder='Username' type="text" className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
              </div>}
              <div className='my-5'>
                <label htmlFor="">Email</label>
                <input value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} placeholder='Email' type="email" className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
              </div>

              {/* used eyeicon for viewing password and not viewing password */}
              <div className='mt-5'>
                <label htmlFor="">Password</label>
                <div className='flex items-center'>
                  <input value={userDetails?.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} placeholder='Password' type={viewPassword ? "text" : "password"} className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
                  {viewPassword ? <FaEye onClick={() => setViewPassword(!viewPassword)} className='text-gray-500 cursor-pointer mt-2' style={{ marginLeft: "-30px" }} />
                    :
                    <FaEyeSlash onClick={() => setViewPassword(!viewPassword)} className='text-gray-500 cursor-pointer mt-2' style={{ marginLeft: "-30px" }} />}
                </div>
              </div>
              <div className='mt-2'>
                <p className='text-xs text-orange-400'>*Never share your password with others</p>
              </div>
              <div className='mt-4'>
                {register ? <button onClick={HandleRegister} type='button' className='bg-green-700 p-2 w-full rounded'>Register</button> :
                  <button onClick={handleLogin} type='button' className='bg-green-700 p-2 w-full rounded'>Login</button>}
              </div>
              {!register && <div className='mt-5'>
                {/* Google Authentication */}
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>}
              <div className='mt-3'>
                {register ? <p>Are you Already a user <Link className='text-blue-400' to={"/login"}>Login</Link></p> :
                  <p>Are you a new user? <Link className='text-blue-400' to={"/register"}>Register</Link></p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
