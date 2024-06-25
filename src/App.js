import React, { useState } from 'react';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import CreateCall from './components/CreateCall';
import JoinCall from './components/JoinCall';
import VideoCall from './components/VideoCall';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        {!token ? (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Simulación de Videollamada
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CreateCall setToken={setToken} />
              </Grid>
              <Grid item xs={12}>
                <JoinCall setToken={setToken} />
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <VideoCall token={token} />
        )}
      </Box>
    </Container>
  );
};

export default App;
