import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff, ContentCopy } from '@mui/icons-material';

const VideoCall = ({ token }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [location, setLocation] = useState('Obteniendo ubicación...');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
          .then(response => response.json())
          .then(data => {
            setLocation(`${data.address.city}, ${data.address.country}`);
          })
          .catch(error => {
            console.error('Error fetching location data', error);
          });
      }, error => {
        console.error('Error getting location', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      streamRef.current.getTracks().forEach(track => track.stop());
    };
  }, []);

  const toggleMic = () => {
    const audioTrack = streamRef.current.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMicOn(audioTrack.enabled);
  };

  const toggleCamera = () => {
    const videoTrack = streamRef.current.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOn(videoTrack.enabled);
  };

  const handleEndCall = () => {
    window.location.reload();
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token).then(() => {
      alert('Token copiado al portapapeles');
    });
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
              <IconButton onClick={copyToken} sx={{ ml: 1 }}>
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
            <video ref={videoRef} autoPlay playsInline width="320" height="240" style={{ border: '1px solid #ccc' }}></video>
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
