import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./pages/patient/ProfilePage"
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard"
import TeamPage from "./pages/team/TeamPage"
import Dummy from "./Pages/Dummy"

function App() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/ai" element={<Dummy />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/patient" element={<ProfilePage />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  )
}

export default App