import React from 'react';
import { Button } from '@mui/material';
import { createCall } from '../utils/callManager';

const CreateCall = ({ setToken }) => {
  const handleCreateCall = () => {
    const token = createCall();
    setToken(token);
    alert(`Llamada creada con token: ${token}`);
  };

  return (
    <Button onClick={handleCreateCall} variant="contained" color="primary">
      Crear Llamada
    </Button>
  );
};

export default CreateCall;
