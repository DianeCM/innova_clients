import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, useTheme } from '@mui/material';
import ResponsiveAppBar from '../components/nav-bar';
import Leftbar from '../components/side-bar';

const Layout = () => {
  const [isOpenLeftBar, setIsOpenLeftBar] = useState(false);
  const theme = useTheme();
  const leftBarRef = useRef(null);

  const toggleLeftBar = () => {
    setIsOpenLeftBar(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (leftBarRef.current && !leftBarRef.current.contains(event.target)) {
      setIsOpenLeftBar(false);
    }
  };

  useEffect(() => {
    if (isOpenLeftBar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenLeftBar]);

  return (
    <Grid container direction="column">
      <Grid item position="sticky" width="100%" zIndex={1001} top={0}>
        <ResponsiveAppBar openMenu={toggleLeftBar} />
      </Grid>

      <Grid item sx={{ marginTop: 0, width: '100%' }}>
        <Grid item
          ref={leftBarRef}
          md={3}
          display={{ xs: isOpenLeftBar ? 'flex' : 'none', sm: isOpenLeftBar ? 'flex' : 'none', md: 'flex' }}
          position={{ xs: "absolute", md: "fixed" }}
          top={{ xs: '10px', md: 0 }}
          sx={{
            height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)', md: 'calc(100vh - 64px)' }, // Adjust height based on breakpoints
            overflowY: 'auto',
            top: { xs: '56px', sm: '64px', md: '64px' }, // Adjust top based on breakpoints
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            bgcolor: theme.palette.background.default,
            zIndex: 1000,
            width: { xs: '80%', sm: '80%', md: '100%' } // Adjust width for xs and sm screens
          }}>
          <Leftbar toggleBar={toggleLeftBar} />
        </Grid>

        <Grid container>
          <Grid item xs={12} md={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
          </Grid>

          <Grid item xs={12} md={9}>
            <Outlet />
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
};

export default Layout;
