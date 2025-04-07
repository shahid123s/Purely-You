// src/App.js
import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import PatientRoutes from "./routes/PatientRoutes"
import DoctorRoutes from "./routes/DoctorRoutes"
import AdminRoutes from "./routes/AdminRoutes"

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="/patient/*" element={<PatientRoutes />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App