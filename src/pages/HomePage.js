import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import CallButton from '../components/CallButton';
import JoinCall from '../components/JoinCall';
import VideoCall from '../components/VideoCall';
import ParticipantList from '../components/ParticipantList';
import EndCallButton from '../components/EndCallButton';
import TokenDisplay from '../components/TokensDisplay';
import { useDaily } from '../context/DailyContext';

const HomePage = () => {
  const { showButtons, tokenActive } = useDaily();

  return (
    <Container>
      <Box mt={3} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom align="center">
          Simulación de llamada
        </Typography>
        {showButtons && (
          <Grid container spacing={3} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
              <CallButton />
            </Grid>
            <Grid item xs={12} md={6}>
              <JoinCall />
            </Grid>
          </Grid>
        )}
        {tokenActive && <TokenDisplay />}
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12}>
            <VideoCall />
          </Grid>
          <Grid item xs={12} md={8}>
            <ParticipantList />
          </Grid>
          {tokenActive && (
            <Grid item xs={12}>
              <EndCallButton />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
