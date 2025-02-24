import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#162c36', 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#317589', 
      contrastText: '#ffffff',
    },
    background: {
      default: '#162c36',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
    success: {
      main: '#4caf50', // Green
    },
    error: {
      main: '#f44336', // Red
    },
    warning: {
      main: '#ffeb3b', // Yellow
    },
    info: {
      main: '#2196f3', // Light Blue
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            color: '#212121',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;