import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./pages/patient/ProfilePage"
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard"
import TeamPage from "./pages/team/TeamPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/patient" element={<ProfilePage />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  )
}

export default App