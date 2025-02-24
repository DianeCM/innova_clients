import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useGlobalContext } from '../context/app-context';
import { useTheme } from '@emotion/react';
import { useNotification } from '../hooks/notification-context';
import { useNavigate } from 'react-router-dom';

function ResponsiveAppBar({ openMenu }) {
  const { dispatch } = useGlobalContext();
  const { showNotification } = useNotification()
  const navigate = useNavigate();
  const theme = useTheme()

  const handleOpenNavMenu = (e) => {
    openMenu();
  };

  const handleLogout = () => {
    dispatch({ type: "SET_TOKEN", payload: null });
    dispatch({ type: "SET_USERID", payload: null });
    dispatch({ type: "SET_ISLOGGED", payload: false });
    showNotification("Sesión cerrada con éxito")
    navigate('/')
  };

  return (
    <AppBar position="static" sx={{ 
      backgroundImage: 'url(/endless-constellation.svg)', // Updated background image
      backgroundRepeat: 'repeat' // Make the image repeat
    }}>
      <Toolbar sx={{ borderBottom: '1px solid #ffffff', borderColor: 'black', bgcolor: theme.palette.background.default }}>
        <Box width={'100%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems="center">
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, mr: '5px' }}>
              <IconButton onClick={handleOpenNavMenu} color={theme.palette.primary.dark} aria-label="open menu">
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>

            <Button>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#ffffff'
                }}
              >
                INNOVACLIENTS
              </Typography>
            </Button>

          </Box>

          <Stack direction={'row'} alignItems="center">
            <Button  sx={{ backgroundColor: '#2d6071', color: '#ffffff', borderRadius: '10px'  }} endIcon={<LogoutIcon fontSize='small' />} variant="contained" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
