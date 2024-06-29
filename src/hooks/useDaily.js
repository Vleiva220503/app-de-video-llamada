import { useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { useDaily } from '../context/DailyContext';

export const useDaily = () => {
  const { roomUrl, setRoomUrl, participants, setParticipants } = useDaily();

  useEffect(() => {
    if (!roomUrl) return;

    const callFrame = DailyIframe.createFrame();
    callFrame.join({ url: roomUrl });

    callFrame.on('participant-joined', (event) => {
      setParticipants((prev) => [...prev, event.participant]);
    });

    callFrame.on('participant-left', (event) => {
      setParticipants((prev) => prev.filter((p) => p.session_id !== event.participant.session_id));
    });

    return () => callFrame.leave();
  }, [roomUrl, setParticipants]);

  return { roomUrl, setRoomUrl, participants };
};
