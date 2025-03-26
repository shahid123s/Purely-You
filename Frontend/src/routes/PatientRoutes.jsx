import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PatientLogin from '../Pages/Patient/PatientLogin'
import PatientSignup from '../Pages/Patient/PatientSignup'
import PatientProfile from '../pages/patient/PatientProfile'

export default function PatientRoutes() {
  return (
    <Routes>
        <Route path="/" element={<PatientLogin />} />
        <Route path="signup" element={<PatientSignup />} />
        <Route path="profile" element={<PatientProfile />} />
        </Routes>
  )
}
