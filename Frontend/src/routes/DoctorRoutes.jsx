import { useState, useEffect } from 'react';
import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorDashboard from "../Pages/Doctor/DoctorDashboard";
import DoctorLogin from "../Pages/Doctor/DoctorLogin";
import DoctorSignup from "../Pages/Doctor/DoctorSignup";
import VideoCall from "../Pages/Doctor/VideoCall";

export default function DoctorRoutes() {

  const [roomID, setRoomID] = useState(() => localStorage.getItem('roomID') || "");
  const [userID, setUserID] = useState(() => localStorage.getItem('doctorDetails')._id || "");
  const [userName, setUserName] = useState(() => localStorage.getItem('doctorDetials')?.name || "");

  useEffect(() => {
    // Update state when localStorage changes
    const handleStorageChange = () => {
      setRoomID(localStorage.getItem('roomID') || "");
      setUserID(localStorage.getItem('userID') || "");
      setUserName(localStorage.getItem('userName') || "");
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DoctorDashboard />} />
      <Route path="login" element={<DoctorLogin />} />
      <Route path="signup" element={<DoctorSignup />} />
      <Route path='/call' element={<VideoCall roomID={roomID} userID={userID} userName={userName} />} />
    </Routes>
  );
}
