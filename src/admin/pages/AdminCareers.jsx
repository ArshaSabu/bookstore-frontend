import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { Link } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

function AdminCareers() {
  const[jobPostStatus, setJobPostStatus] = useState(true)
  const[applicantListStatus, setApplicantListStatus] = useState(false)
  return (
    <>
      <AdminHeader/>
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar/>
        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-center text-3xl font-bold'>Careers</h1>

          {/* Tabs */}
          <div className='flex justify-center items-center my-8 font-medium text-lg'>
            <p onClick={() => {setApplicantListStatus(false), setJobPostStatus(true)}} className={jobPostStatus ? "text-blue-500 p-4 border-gray-200 broder-t border-l border-r rounded cursor-pointer" : "p-4 border-b border-gray-200 cursor-pointer"}>Job Post</p>
            <p onClick={() => {setApplicantListStatus(true), setJobPostStatus(false)}} className={applicantListStatus ? "text-blue-500 p-4 border-gray-200 broder-t border-l border-r rounded cursor-pointer" : "p-4 border-b border-gray-200 cursor-pointer"}>View Applicant</p>
          </div>

          {jobPostStatus &&
          <div className=''>
            <div className='md:flex justify-center items-center my-8 w-full md:px-20 px-5'>
              <div className='md:flex w-full ms-2 md:ms-0'>
                <input type="text" className='border border-gray-200 placeholder-gray-200 p-2 md:w-1/4 w-3/4' placeholder='Search By Title'/>
                <button className='bg-green-800 mt-5 md:mt-0 text-white p-2 rounded hover:bg-white hover:border hover:border-green-700 hover:text-green-800'>Search</button>
              </div>
              <div>
                <button className='bg-blue-800 mt-5 md:mt-0 w-full text-white p-2 rounded md:ms-3 hover:bg-white hover:border hover:border-blue-700 hover:text-blue-800'>Add Job +</button>
              </div>
            </div>
            <div className='border border-gray-200 p-5 shadow my-5'>
                  <div className='flex mb-5'>
                    <div className='w-full'>
                      <h1>FrontEnd Developer</h1>
                      <hr />
                    </div>
                    <button className='bg-red-900 text-white p-3 ms-5 flex items-center'>Delete<MdDeleteForever  className='ms-2'/></button>
              
                  </div>
                  <p className='flex'>
                    <FaLocationDot className='me-2 mt-1'/>Kochi
                  </p>
                  <p className='flex'>salary:20000-30000/month</p>
                  <p className='text-lg my-2'>Job Type:Full Time</p>
                  <p className='text-lg my-2'>Qualification:BSC.CS</p>
                  <p className='text-lg my-2'>Experience:1-2 yr</p>
                  <p className='text-lg my-2 text-justify'>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aut nisi quidem atque nostrum ex dicta, corporis 
                    vero doloribus possimus dolore, a obcaecati vitae, inventore id reprehenderit cum harum quo.</p>
              
                 </div>
                 <p className='text-red-800 font-bold text-xl'>No of Openings</p>
          </div>}

            {applicantListStatus &&
            <div className='p-10'>
              <table className='w-full my-3 shadow'>
                <thead>
                  <tr>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>SL No</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Job Title</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Name</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>QUalification</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>E-mail</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Phone</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Cover Letter</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border border-gray-500 p-3 text-center'>1</td>
                    <td className='border border-gray-500 p-3 text-center'>Software Tester</td>
                    <td className='border border-gray-500 p-3 text-center'>Arsha S</td>
                    <td className='border border-gray-500 p-3 text-center'>BTech</td>
                    <td className='border border-gray-500 p-3 text-center'>arsha@gmail.com</td>
                    <td className='border border-gray-500 p-3 text-center'>9812093487</td>
                    <td className='border border-gray-500 p-3 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo placeat veniam distinctio ad debitis. Eius odio, ut error molestiae rem asperiores non magni alias numquam aliquid quas minima nesciunt a?</td>
                    <td className='border border-gray-500 p-3 text-center'><Link className='text-blue-500 underline'>Resume</Link></td>
                  </tr>
                </tbody>
              </table>
              <p className='text-red-800 font-bold text-xl'>No Applications are Available...</p>
            </div>}
        </div>
      </div>
    </>
  )
}

export default AdminCareers
