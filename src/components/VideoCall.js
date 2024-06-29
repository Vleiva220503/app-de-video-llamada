import React, { useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { useDaily } from '../context/DailyContext';

const VideoCall = () => {
  const { roomUrl, setTokenActive } = useDaily();
  const callFrameRef = useRef();

  useEffect(() => {
    if (!roomUrl || !callFrameRef.current) return;

    const callFrame = DailyIframe.createFrame(callFrameRef.current, { showLeaveButton: true });
    callFrame.join({ url: roomUrl });

    callFrame.on('left-meeting', () => {
      setTokenActive(false);
    });

    // Ocultar "Powered by Daily"
    callFrame.on('loaded', () => {
      const dailyBadge = callFrameRef.current.querySelector('.powered-by-daily');
      if (dailyBadge) dailyBadge.style.display = 'none';
    });

    return () => callFrame.destroy();
  }, [roomUrl, setTokenActive]);

  return (
    <div
      ref={callFrameRef}
      style={{
        width: '100%',
        height: '75vh',
        overflow: 'hidden',
        maxWidth: '100%',
        marginBottom: '20px',
      }}
    ></div>
  );
};

export default VideoCall;
