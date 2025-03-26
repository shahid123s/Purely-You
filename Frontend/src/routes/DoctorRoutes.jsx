import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorDashboard from "../Pages/Doctor/DoctorDashboard";
import DoctorLogin from "../Pages/Doctor/DoctorLogin";
import DoctorSignup from "../Pages/Doctor/DoctorSignup";

export default function DoctorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DoctorDashboard />} />
      <Route path="login" element={<DoctorLogin />} />
      <Route path="signup" element={<DoctorSignup />} />
    </Routes>
  );
}
