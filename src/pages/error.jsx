import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom color="error">
          Something went wrong!
        </Typography>
        <Typography variant="body1" paragraph>
          We encountered an error while processing your request. Please try again later.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}

export default Error;
