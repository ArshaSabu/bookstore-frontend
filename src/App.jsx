import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './common/pages/LandingPage'
import Contact from './common/pages/Contact'
import Auth from './common/pages/Auth'
import Pnf from './common/pages/Pnf'
import PreLoader from './common/pages/PreLoader'
import AllBooks from './users/pages/AllBooks'
import Careers from './users/pages/Careers'
import Profile from './users/pages/Profile'
import ViewBook from './users/pages/ViewBook'
import AdminHome from './admin/pages/AdminHome'
import AdminCareers from './admin/pages/AdminCareers'
import AdminBooks from './admin/pages/AdminBooks'
import AdminSettings from './admin/pages/AdminSettings'
import { ToastContainer } from 'react-toastify'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentError from './users/pages/PaymentError'
import { userAuthContext } from './context/AuthContext'

function App() {
  const [loader, setLoader] = useState(true)
  const { role} = useContext(userAuthContext)

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 5000)
  }, [])

  return (
    <>
      <Routes>
        {/* common */}
        <Route path='/' element={loader ? <PreLoader /> : <LandingPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='*' element={<Pnf />} />

        {/* users */}
        {role == "user" &&
          <>
            <Route path='/all-books' element={<AllBooks />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/view-books/:id' element={<ViewBook />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/payment-error' element={<PaymentError />} />
          </>
        }

        {/* admin */}

        {role == "admin" &&
          <>
          <Route path='/admin-home' element={<AdminHome />} />
          <Route path='/admin-careers' element={<AdminCareers />} />
          <Route path='/admin-books' element={<AdminBooks />} />
          <Route path='/admin-settings' element={<AdminSettings />} />
          </>
        }
    </Routes >

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="light"
      />
    </>
  )
}

export default App
