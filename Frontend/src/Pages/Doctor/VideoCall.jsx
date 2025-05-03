
import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCall = ({ roomID, userID, userName }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const appID = Number(import.meta.env.VITE_APPID); 
    const serverSecret =( import.meta.env.VITE_APP_SIGN);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: 'Copy Link',
          url: `${window.location.origin}/video/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  }, [roomID, userID, userName]);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default VideoCall;