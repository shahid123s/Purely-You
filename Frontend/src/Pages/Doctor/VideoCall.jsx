import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation, useNavigate } from 'react-router-dom';

const VideoCall = () => {
  const containerRef = useRef(null);
  
  // Get user details from localStorage
  const [userDetails, setUserDetails] = useState(() => {
    try {
      const storedDetails = localStorage.getItem('doctorDetails');
      return storedDetails ? JSON.parse(storedDetails) : null;
    } catch (error) {
      console.error('Error parsing user details:', error);
      return null;
    }
  });

  const navigate = useNavigate()
  const location = useLocation();
  
  const [roomId, setRoomId] = useState(location.state?.roomId)


  useEffect(() => {
    if (!userDetails) return;

    const appID = Number(import.meta.env.VITE_APPID);
    const serverSecret = import.meta.env.VITE_APP_SIGN;


    
    console.log(userDetails.roomId, 'roomId')
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
     roomId,
      userDetails._id, // Use the ID from stored details
      `Dr.${userDetails.name}` // Use the name from stored details
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [{
        name: 'Copy Link',
        url: `${window.location.origin}/video/${roomId}`,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      onLeaveRoom: () => {
        navigate('/doctor')
      }
    });
  }, [userDetails]);

  if (!userDetails) {
    return <div>Error loading user details. Please check your login status.</div>;
  }

  return (
  <>
  <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>;
  </>)
};

export default VideoCall;