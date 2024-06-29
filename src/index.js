import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DailyProvider } from './context/DailyContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DailyProvider>
        <App />
      </DailyProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
