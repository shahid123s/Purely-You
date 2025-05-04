import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import PatientLogin from '../Pages/Patient/PatientLogin'
import PatientSignup from '../pages/patient/PatientSignup'
import PatientProfile from '../Pages/patient/PatientProfile'
import PatientVideoCall from '../Pages/patient/PatientVideoCall'
import PatientChatPage from '../Pages/patient/PatientChatPage'


export default function PatientRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PatientLogin />} />
      <Route path="/signup" element={<PatientSignup />} />
      <Route path="/profile" element={<PatientProfile />} />
      <Route path='/call/:roomId' element={<PatientVideoCall />} />
      <Route path="/chat/:doctorId" element={<PatientChatPage />} />
      <Route path="/" element={<Navigate to="/patient/profile" replace />} />
      

    </Routes>
  )
}