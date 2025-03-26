import { Route, Routes } from "react-router-dom"
import DoctorRoutes from "./Routes/DoctorRoutes"
import HomePage from "./Pages/HomePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
    </Routes>
  )
}

export default App