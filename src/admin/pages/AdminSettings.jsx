import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../common/components/Footer'
import { toast } from 'react-toastify'
import { updateAdminProfileAPI } from '../../services/allAPI'
import SERVERURL from '../../services/serverURL'
import { adminProfileUpdateContext } from "../../context/ContextShare";

function AdminSettings() {

  const [token, setToken] = useState("")
  const [adminDetails, setAdminDetails] = useState({
    username : "",
    password : "",
    confirmPassword : "",
    profile: ""
  })

  const [existingProfile, setExistingProfile] = useState("")
  console.log(adminDetails);
  console.log(existingProfile);
  
  const [preview, setPreview] = useState("")
  const {setAdminProfileUpdateStatus} = useContext(adminProfileUpdateContext)

  const handleReset = ()=>{
    let user = JSON.parse(sessionStorage.getItem("existingUser"))
    setAdminDetails({...adminDetails, username: user.username, password: user.password, confirmPassword: user.password})
    setExistingProfile(user.profile)
    setPreview("")
  }

  const handleFile = (e)=>{
    setAdminDetails({...adminDetails, profile: e.target.files[0]})
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async() => {
    const {username, password, confirmPassword} = adminDetails
    if(!username || !password || !confirmPassword){
      toast.info(`Fill the Details completely`)
    } else{
      if(password != confirmPassword){
        toast.warning(`password must match`)
      } else{
        const reqHeader = {"Authorization": `Bearer ${token}`}

        if(preview){
          const reqBody = new FormData()
          for(let key in adminDetails){
            reqBody.append(key, adminDetails[key])
          }
          const result = await updateAdminProfileAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status == 200){
            toast.success(`Profile Updated successfully`)
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setAdminProfileUpdateStatus(result)
          } else {
            toast.error(`Something Went Wrong`)
          }
        } else{
          const result = await updateAdminProfileAPI({username, password, profile: existingProfile}, reqHeader)
          console.log(result);
          if(result.status == 200){
            toast.success(`Profile Updated successfully`)
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setAdminProfileUpdateStatus(result)
          } else {
            toast.error(`Something Went Wrong`)
          }
        }
      }
    } 
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
      let user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({...adminDetails, username: user.username, password: user.password, confirmPassword: user.password})
      setExistingProfile(user.profile)
    }
  },[])

  return (
    <>
      <AdminHeader/>
      <div className='md:grid grid-cols-[1fr_5fr]'>
        <div>
          <AdminSidebar/>
        </div>
        <div className='p-4'>
          <h1 className='text-3xl text-center font-semibold my-10'>Settings</h1>
          <div className='md:grid grid-cols-2 mt-10'>
            <div className='md:px-10 px-5'>
              <p className='text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id veniam sapiente aut! Debitis maxime cumque numquam quasi aliquid odio eaque repellat rerum fugit perspiciatis deleniti non magnam tempore earum, quas error ex facilis, necessitatibus esse aut eum veniam. Velit, labore omnis! Molestiae impedit praesentium odit, nisi debitis dolor est mollitia perferendis commodi quo quibusdam pariatur magni natus eligendi, asperiores similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolor dolore est nostrum omnis quod voluptates accusamus consequatur minus voluptate quo reprehenderit rerum cupiditate fugiat ipsam saepe, fugit deserunt corporis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, numquam vitae ut ab tempore ipsam inventore aspernatur debitis modi accusamus?</p>
              <p className='text-justify mt-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est quas, atque magni similique natus accusamus aut illo aliquid earum, eligendi perferendis at alias provident harum placeat nihil debitis rerum tempore ea nesciunt mollitia veritatis laudantium dolorem. Aperiam inventore nemo officiis? Ullam repudiandae eaque fugiat adipisci commodi, magnam porro dignissimos illum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia enim ex, magni nihil adipisci quasi vero quaerat aperiam. Adipisci, sequi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, rem.</p>
            </div>
            <div className='md:px-10 px-5'>
              <form className='bg-blue-200 md:p-10 p-5 rounded my-10 md:my-0' action="">
                <div className='flex justify-center items-center my-10'>
                  <label htmlFor="editUserProfile">
                    <input onChange={(e)=> handleFile(e)} type="file" id='editUserProfile'style={{display:"none"}}/>
                    {existingProfile== "" ?
                      <img src={preview? preview : "https://cdni.iconscout.com/illustration/premium/thumb/female-user-image-illustration-svg-download-png-6515859.png"} style={{width:"170px", height:"170px", borderRadius:"50%"}}  alt="profileimg" />
                      :
                      <img src={preview? preview : `${SERVERURL}/imguploads/${existingProfile}`} style={{width:"170px", height:"170px", borderRadius:"50%"}}  alt="profileimg" />    
                    }
                  </label>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Username</label>
                  <input value={adminDetails?.username} onChange={(e)=> setAdminDetails({...adminDetails, username: e.target.value})} type="text" placeholder='Username' className='bg-white rounded w-full p-2'/>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Password</label>
                  <input value={adminDetails?.password} onChange={(e)=> setAdminDetails({...adminDetails, password: e.target.value})} type="text" placeholder='Password' className='bg-white rounded w-full p-2'/>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Confirm Password</label>
                  <input value={adminDetails?.confirmPassword} onChange={(e)=> setAdminDetails({...adminDetails, confirmPassword: e.target.value})} type="text" placeholder='Confirm Password' className='bg-white rounded w-full p-2'/>
                </div>
                <div className='flex justify-between mt-10'>
                  <button type='button' onClick={handleReset} className='bg-amber-600 text-white rounded p-4 w-1/2 hover:border hover:border-amber-600 hover:text-amber-600 hover:bg-white'>Reset</button>
                  <button type='button' onClick={handleSubmit} className='bg-green-600 text-white rounded p-4 w-1/2 hover:border hover:border-green-600 hover:text-green-600 hover:bg-white ms-3'>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default AdminSettings
