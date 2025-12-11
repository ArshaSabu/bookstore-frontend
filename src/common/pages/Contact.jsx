import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { CiLocationOn, CiMail } from 'react-icons/ci'
import { FaPhone } from 'react-icons/fa'

function Contact() {
  return (
    <>
    <Header/>
     <div>
             <div>
               <h1 className='text-3xl text-center mt-5 font-bold'>Contacts</h1>
               <p className='text-lg text-justify px-35 py-5 text-center  font-medium '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam veniam soluta hic accusamus vero placeat corporis error neque. Sed quae repellat harum alias, id reiciendis nam assumenda, possimus maiores nisi explicabo amet quos in! Repellendus impedit rem a nam aperiam, perferendis molestias? Porro unde ut quos deleniti ex ab laborum?</p>
             </div>
             <div className="md:grid grid-cols-3 mx-50 gap-20 my-8">
               <div className='flex' ><CiLocationOn className='text-5xl p-1 rounded-full bg-gray-300 text-black' /> <p className='text-lg font-bold mx-1'>asadhbook stall,managattukavala</p></div>
               <div className='flex' >< FaPhone  className='text-5xl p-2 rounded-full bg-gray-300 text-black' /> <p className='text-lg font-bold m-2'>1234567890</p></div>
               <div className='flex' >< CiMail className='text-5xl p-2 rounded-full bg-gray-300 text-black' /> <p className='text-lg font-bold m-2'>bookstore@gmail.com</p></div>
             </div>
             <div className='md:grid grid-cols-2 mx-20 gap-10 m-10'>
               <div>
                 <div className='bg-gray-300 p-10'>
                   <h1 className='text-center text-lg font-semibold p-2'>send me message</h1>
                   <input type="text" placeholder='Name' className='bg-white w-full p-2 m-2'  />
                   <input type="text" placeholder='Email' className='bg-white w-full p-2 m-2'  />
                   <input type="text" placeholder='Message' className='bg-white w-full p-2 py-10 m-2'  />
                   <button className='w-full bg-gray-800 text-white text-lg p-1 ms-2 my-3  text-center font-semibold'>send</button>
                 </div>
               </div>
               <div className="w-full h-[420px] ">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0524557799613!2d76.32120827506725!3d10.031733872825091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d14f0656d21%3A0x21c80bf8a97681ef!2sMangattukavala!5e0!3m2!1sen!2sin!4v1703091027494!5m2!1sen!2sin"
                   width="100%"
                   height="100%"
                   style={{ border: 0 }}
                   allowFullScreen=""
                   loading="lazy"
                   referrerPolicy="no-referrer-when-downgrade"
                 ></iframe>
               </div>
             </div>
           </div>
    <Footer/>
    </>
  )
}

export default Contact
