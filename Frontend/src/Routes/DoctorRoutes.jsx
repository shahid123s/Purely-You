import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import PatientPortal from '../Pages/Doctor/PatientPortal'
import MedicalTeam from '../Pages/Doctor/MedicalTeam'
import DoctorDashboard from '../Pages/Doctor/DoctorDashboard'

export default function DoctorRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="patient-portal" element={<PatientPortal />} />
      <Route path="medical-team" element={<MedicalTeam />} />
      <Route path="doctor-dashboard" element={<DoctorDashboard />} />
    </Routes>
  )
}