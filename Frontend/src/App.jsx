import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import TeamPage from "./pages/team/TeamPage"
import AISearch from "./pages/AiSearch"
import PatientRoutes from "./routes/PatientRoutes"
import DoctorRoutes from "./Routes/DoctorRoutes"

function App() {
  return (
    <Routes>

      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="/patient/*" element={<PatientRoutes />} />
      <Route path="/team/*" element={<TeamPage />} />
      <Route path="/ai" element={<AISearch />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App