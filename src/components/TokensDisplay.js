import React from 'react';
import { TextField, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { useDaily } from '../context/DailyContext';

const TokenDisplay = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { token } = useDaily();
  const [copied, setCopied] = React.useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginTop: '8px', width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Tokens de llamada
      </Typography>
      <TextField
        value={token}
        variant="outlined"
        fullWidth
        multiline
        rows={isMobile ? 1 : 1}  // Mostrar 1 línea en móvil, 4 líneas en escritorio
        InputProps={{
          readOnly: true,
          style: { border: 'none' },  // Eliminar cualquier borde del TextField
          endAdornment: (
            <IconButton
              onClick={handleCopyToken}
              style={{ padding: 0 }} 
              disableRipple  
              disableFocusRipple  
              disableTouchRipple  
            >
              <ContentCopyIcon />
            </IconButton>
          ),
        }}
        InputLabelProps={{ shrink: false }}  // Evitar que el label se encoja
      />
      {copied && (
        <Typography variant="caption" sx={{ marginTop: 1, color: 'green' }}>
          ¡Copiado!
        </Typography>
      )}
    </div>
  );
};

export default TokenDisplay;
