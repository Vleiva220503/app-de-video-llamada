import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff, ContentCopy } from '@mui/icons-material';
import { createCall, endCall } from './callManager';

const VideoCall = ({ location }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [token, setToken] = useState('');
  const videoRef = React.useRef(null);
  const streamRef = React.useRef(null);

  useEffect(() => {
    const newToken = createCall();
    setToken(newToken);
    navigator.clipboard.writeText(newToken).then(() => {
      console.log('Token copiado al portapapeles:', newToken);
    });

    navigator.mediaDevices.getUserMedia({ video: { width: { min: 500, ideal: 1280 }, height: { min: 500, ideal: 720 } }, audio: true })
      .then(stream => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        videoRef.current.style.transform = 'rotateY(180deg)'; // Ajuste de orientación si es necesario
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });

    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMic = () => {
    const audioTrack = streamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    const videoTrack = streamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
    }
  };

  const handleEndCall = () => {
    endCall();
    window.location.reload();
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <CardHeader title="Videollamada Activa" />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h6">Token:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
              {token}
              <IconButton onClick={() => navigator.clipboard.writeText(token).then(() => alert('Token copiado al portapapeles'))} sx={{ ml: 1 }}>
                <ContentCopy />
              </IconButton>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Duración de la Llamada:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{callDuration} segundos</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Ubicación:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{location}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <video ref={videoRef} autoPlay playsInline width="100%" height="auto" style={{ border: '1px solid #ccc', transform: 'rotateY(180deg)' }}></video>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <IconButton onClick={toggleMic} color={isMicOn ? 'primary' : 'error'}>
              {isMicOn ? <Mic /> : <MicOff />}
            </IconButton>
            <IconButton onClick={toggleCamera} color={isCameraOn ? 'primary' : 'error'}>
              {isCameraOn ? <Videocam /> : <VideocamOff />}
            </IconButton>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button onClick={handleEndCall} variant="contained" color="error">
              Terminar Llamada
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VideoCall;
