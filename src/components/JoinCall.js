import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { createToken } from '../api/dailyApi';
import { useDaily } from '../context/DailyContext';

const JoinCall = () => {
  const [roomName, setRoomName] = useState('');
  const { setRoomUrl, setToken, setShowButtons, setTokenActive } = useDaily();

  const handleJoin = async () => {
    const token = await createToken(roomName);
    setRoomUrl(`https://yourdomain.daily.co/${roomName}?t=${token}`);
    setToken(token);
    setShowButtons(false);
    setTokenActive(true);
  };

  return (
    <Box mb={2} width="100%">
      <TextField
        label="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="secondary" onClick={handleJoin} fullWidth>
        Join Call
      </Button>
    </Box>
  );
};

export default JoinCall;
