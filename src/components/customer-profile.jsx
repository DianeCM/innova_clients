import React from 'react';
import { Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ClientImage = ({ base64Image }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: '50%', // Round the image perfectly
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Add box shadow
      }}
    >
      {base64Image ? (
        <img
          src={base64Image}
          alt="Client"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%', // Round the image perfectly
          }}
        />
      ) : (
        <AccountCircleIcon
          sx={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </Box>
  );
};

export default ClientImage;
