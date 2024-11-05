import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const VerifyOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleVerifyOTP = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/verify_otp`, {
        email,
        otp,
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
        Verify OTP
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="OTP"
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
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
      <Button variant="contained" onClick={handleVerifyOTP} sx={{ marginTop: 2 }}>
        Verify OTP
      </Button>
    </Box>
  );
};

export default VerifyOTP;