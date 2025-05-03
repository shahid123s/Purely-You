import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import PatientLogin from '../Pages/Patient/PatientLogin'
import PatientSignup from '../pages/patient/PatientSignup'
import PatientProfile from '../Pages/patient/PatientProfile'


export default function PatientRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PatientLogin />} />
      <Route path="/signup" element={<PatientSignup />} />
      <Route path="/profile" element={<PatientProfile />} />
      <Route path="/" element={<Navigate to="/patient/profile" replace />} />

    </Routes>
  )
}