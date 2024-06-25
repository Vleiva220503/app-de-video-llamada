import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { joinCall } from '../utils/callManager';

const JoinCall = ({ setToken }) => {
  const [inputToken, setInputToken] = useState('');
  const [joinError, setJoinError] = useState('');

  const handleJoinCall = () => {
    const isValid = joinCall(inputToken);
    if (isValid) {
      setToken(inputToken);
      setJoinError('');
    } else {
      setJoinError('Token vacío o inválido. La llamada ha finalizado o el token no es válido.');
    }
  };

  return (
    <Box>
      <TextField
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
        label="Ingresa el token"
        variant="outlined"
        fullWidth
        margin="normal"
        error={joinError !== ''}
        helperText={joinError}
      />
      <Button onClick={handleJoinCall} variant="contained" color="secondary" fullWidth>
        Unirse a la Llamada
      </Button>
    </Box>
  );
};

export default JoinCall;
