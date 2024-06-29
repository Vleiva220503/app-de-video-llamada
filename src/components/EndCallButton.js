import React from 'react';
import { Button } from '@mui/material';
import { CallEnd as CallEndIcon } from '@mui/icons-material';
import { useDaily } from '../context/DailyContext';

const EndCallButton = () => {
  const { setTokenActive, setRoomUrl, setToken, setShowButtons } = useDaily();

  const handleEndCall = () => {
    setTokenActive(false);
    setRoomUrl('');
    setToken('');
    setShowButtons(true);  // Mostrar los botones de nuevo
  };

  return (
    <Button 
      variant="contained" 
      color="secondary" 
      startIcon={<CallEndIcon />} 
      onClick={handleEndCall}
    >
      Finalizar Llamada
    </Button>
  );
};

export default EndCallButton;
