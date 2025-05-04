import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';

const PatientVideoCall = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  // Get patient details from localStorage

  const [patientDetails, setPatientDetails] = useState(() => {
    try {
      const patientId = localStorage.getItem('patientId');
      const patientName = localStorage.getItem('patientName');
      console.log(patientId, 'patientId');
      console.log(patientName, 'patientName');
      return patientId && patientName ? {
        _id: patientId,
        name: patientName,
        roomId: patientId // Using patientId as roomId
      } : null;
    } catch (error) {
      console.error('Error getting patient details:', error);
     
      return null;
    }
  });

  const params = useParams();


  useEffect(() => {
    if (!patientDetails) return;

    const appID = Number(import.meta.env.VITE_APPID);
    const serverSecret = import.meta.env.VITE_APP_SIGN;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      params.roomId, // Should match doctor's room ID
      patientDetails._id,
      patientDetails.name
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      onLeaveRoom: () => {
        navigate('/patient'); // Redirect to patient dashboard
      }
    });
  }, [patientDetails, navigate]);

  if (!patientDetails) {
    console.log('Patient details not found');
    return (
      <div className="text-red-500 p-4">
        Error loading patient details. Please login again.
        <button 
          onClick={() => navigate('/login')}
          className="ml-2 text-blue-500 hover:underline"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-screen bg-gray-900"
      style={{ minHeight: '100vh' }}
    />
  );
};

export default PatientVideoCall;