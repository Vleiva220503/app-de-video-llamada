import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { createRoom, createToken } from '../api/dailyApi';
import { useDaily } from '../context/DailyContext';

const CallButton = () => {
  const { setRoomUrl, setToken, setShowButtons, setTokenActive } = useDaily();

  const handleClick = async () => {
    try {
      const url = await createRoom();
      if (url) {
        const roomName = url.split('/').pop();
        const token = await createToken(roomName);
        setRoomUrl(url);
        setToken(token);
        setShowButtons(false);
        setTokenActive(true);
      } else {
        console.error('Error al crear la sala');
      }
    } catch (error) {
      console.error('Error en la creación de la llamada:', error);
    }
  };

  return (
    <Box mb={2} width="100%">
      <Button variant="contained" color="primary" onClick={handleClick} fullWidth>
        Crear Llamada
      </Button>
    </Box>
  );
};

export default CallButton;
