import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useDaily } from '../context/DailyContext';

const ParticipantList = () => {
  const { participants } = useDaily();

  return (
    <List>
      {participants.map((participant) => (
        <ListItem key={participant.session_id}>
          <ListItemText primary={participant.user_name || 'Guest'} />
        </ListItem>
      ))}
    </List>
  );
};

export default ParticipantList;
