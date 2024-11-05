import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });
      console.log(response.data);
      // Handle successful login, e.g., save token and redirect to another page
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
        Login
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Button variant="contained" onClick={handleLogin} sx={{ marginTop: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;