import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const TextDisplay = () => {
  const { state } = useLocation();
  const { text } = state;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Extracted Text
      </Typography>
      <Typography variant="body1" align="center">
        {text}
      </Typography>
    </Box>
  );
};

export default TextDisplay;