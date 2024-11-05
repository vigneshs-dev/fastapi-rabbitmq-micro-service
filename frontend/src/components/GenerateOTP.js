import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const GenerateOTP = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateOTP = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/generate_otp`, {
        email,
      });
      setMessage(response.data);
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Generate OTP
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {message && (
        <Typography color="success" gutterBottom>
          {message}
        </Typography>
      )}
      <Button variant="contained" onClick={handleGenerateOTP} sx={{ marginTop: 2 }}>
        Generate OTP
      </Button>
    </Box>
  );
};

export default GenerateOTP;