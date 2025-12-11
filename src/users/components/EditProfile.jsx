import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import SERVERURL from '../../services/serverURL';
import { toast } from 'react-toastify';
import { userProfileUpdateContext } from '../../context/ContextShare';
import { updateUserProfileAPI } from '../../services/allAPI';

function EditProfile() {
    const [offCanvas, setOffCanvas] = useState(false)
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        bio: "",
        role: "",
        profile: ""
    })
    const [token, setToken] = useState("")
    const [existingProfile, setExistingProfile] = useState("")
    const [preview, setPreview] = useState()
    const {setUserProfileUpdateStatus} = useContext(userProfileUpdateContext)

    console.log(userDetails);
    console.log(existingProfile);
    console.log(token);
    
    const handleImgUpload = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setPreview(url)
    }

    const handleReset = () => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserDetails({ username: user.username, password: user.password, confirmPassword: user.password, bio: user.bio, role: user.role })
        setExistingProfile(user.profile)
        setPreview("")

    };

    const handleUpdate = async () => {
        const { username, password, confirmPassword, bio, role, profile } = userDetails
        if (!username || !password || !confirmPassword || !bio) {
            toast.info(`Fill the form completely`)
        } else {
            if(password != confirmPassword){
                toast.warning(`Invalid Credentials`)
            } else{
                //reqHeader
                const reqHeader = {"Authorization" : `Bearer ${token}`}
                const reqBody = new FormData()
                if(preview){
                    for(let key in userDetails){
                        reqBody.append(key, userDetails[key])
                    }
                    console.log(`Inside Preview`);
                    
                    const result = await updateUserProfileAPI(reqBody, reqHeader)
                    console.log(result);
                    if(result.status == 200){
                        toast.success(`Profile updated successfully`)
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUserProfileUpdateStatus(result)
                        setOffCanvas(false)
                    } else{
                        toast.error(`Something Went Wrong`)
                    }
                } else{
                    console.log(`Not inside preview`);
                    const result = await updateUserProfileAPI({username, password, bio, role, profile: existingProfile}, reqHeader)
                    console.log(result);
                    if(result.status == 200){
                        toast.success(`Profile updated successfully`)
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUserProfileUpdateStatus(result)
                        setOffCanvas(false)
                    } else{
                        toast.error(`Something Went Wrong`)
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({ username: user.username, password: user.password, confirmPassword: user.password, bio: user.bio, role: user.role })
            setExistingProfile(user.profile)
        }
    }, [])
    return (
        <>
            <button onClick={() => setOffCanvas(true)} className='flex px-4 py-2 font-bold border border-blue-200 text-blue-600 rounded'>
                <FaRegEdit className='mt-1 me-2' />Edit
            </button>

            {offCanvas &&
                <div>
                    <div onClick={() => setOffCanvas(false)} className='fixed inset-0 bg-gray-500/75 w-full h-full'></div>
                    <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
                        <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                            <h1>Edit User Profile</h1>
                            <button onClick={() => setOffCanvas(false)}>X</button>
                        </div>
                        <div className='flex justify-center items-center flex-col my-5'>
                            <label htmlFor="profilePic">
                                <input onChange={(e) => handleImgUpload(e)} type="file" style={{ display: "none" }} id='profilePic' />
                                {existingProfile == "" ?
                                    <img src={preview ? preview : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"} alt="" style={{ height: "150px", width: "150px", borderRadius: "50%" }} />
                                    :
                                    <img src={`${SERVERURL}/imguploads/${existingProfile}`} alt="" style={{ height: "150px", width: "150px", borderRadius: "50%" }} />
                                }
                            </label>
                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
                        </div>
                        <div className='mt-5 mb-3 w-full px-5'>
                            <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='Password' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
                        </div>
                        <div className='mt-5 mb-3 w-full px-5'>
                            <input value={userDetails.confirmPassword} onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })} type="text" placeholder='Confirm password' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
                        </div>
                        <div className='mt-5 mb-3 w-full px-5'>
                            <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} type="text" placeholder='Bio' className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded' />
                        </div>
                        <div className='flex justify-end w-full px-5'>
                            <button onClick={handleReset} className='bg-amber-600 text-white rounded border py-3 px-4 hover:text-amber-600 hover:border:amber-600 hover:bg-white'>Reset</button>
                            <button onClick={handleUpdate} className='bg-green-600 text-white rounded border py-3 px-4 hover:text-green-600 hover:border:green-600 hover:bg-white ms-3'>Update</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default EditProfile
