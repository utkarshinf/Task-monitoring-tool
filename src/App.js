import React from 'react'
import './style/style.css'
import Login from './Components/auth/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResetPassword from './Components/auth/ResetPassword'
import VerifyOtp from './Components/auth/VerifyOtp'
import Dashboard from './Pages/Dashboard'
import ChangePassword from './Components/auth/ChangePassword'
import SOPMaster from './Pages/SOPMaster'

const App = () => {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={ <Login/>}/>
    <Route path="/admin-dashboard" element={ <Dashboard/>}/>
    <Route path="/reset-password" element={ <ResetPassword/>}/>
    <Route path="/verify-otp" element={ <VerifyOtp/>}/>
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path="/sop-master" element={<SOPMaster />} />
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
