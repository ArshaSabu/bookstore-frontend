import React from 'react'
import Footer from '../../common/components/Footer'
import Header from '../../common/components/Header'
import { Link } from 'react-router-dom'

export default function PaymentError() {
  return (
    <>
      <Header/>
      <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
        <div>
            <h1 className='text-6xl text-red-700'>Sorry! Your Payment is Unsuccesfull</h1>
            <p className='mt-5 mb-10'>We apologize for the inconvience caused and appreciate your visit to Bookstore.</p>
            <Link className='px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600' to={"/all-books"}>Explore More Books...</Link>
        </div>
        <div>
            <img src="https://cdn.dribbble.com/userupload/22223082/file/original-a9d418cd241698b277044219b7471004.gif" className='w-3/4 ms-30' alt="" />
        </div>
      </div>
      <Footer/>
    </>
  )
}
