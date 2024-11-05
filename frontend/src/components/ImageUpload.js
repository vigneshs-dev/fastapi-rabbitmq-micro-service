import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/text-display', { state: { text: response.data } });
    } catch (error) {
      setError(error.response.data.detail);
    } finally {
      setLoading(false);
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
        Upload Image
      </Typography>
      <input type="file" onChange={handleFileChange} />
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" onClick={handleUpload} sx={{ marginTop: 2 }}>
          Upload
        </Button>
      )}
    </Box>
  );
};

export default ImageUpload;