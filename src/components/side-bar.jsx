import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material"

import { People, Home } from '@mui/icons-material';
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useGlobalContext } from "../context/app-context";

const links = [
  { label: 'Inicio', to: '/', icon: <Home /> },
  { label: 'Consulta Clientes', to: "/customers", icon: <People /> },
]

const Leftbar = ({ toggleBar }) => {
  const theme = useTheme()
  const { state } = useGlobalContext()

  return (
    <Box sx={{ height: '100vh', width: '100%', boxShadow: 3 }} display={'flex'} flexDirection={'column'}
      bgcolor={theme.palette.background.paper}>
      <Box padding={1}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        alignSelf={'center'}
      >
        <IconButton sx={{ color: theme.palette.primary.main }}>
          <AccountCircleIcon sx={{ width: '100%', height: '100%', maxWidth: '100px' }} />
        </IconButton>
        <Typography color={theme.palette.primary.main} variant="h5">{state.username}</Typography>
      </Box>
      <Divider></Divider>
      <Box bgcolor={theme.palette.background.paper} height={'100%'}>
        <Box width='100%' marginY={2}>
          <Typography align='center' color={theme.palette.text.secondary} variant="h6">Menú</Typography>
        </Box>
        <Divider></Divider>
        <Box>
          <List sx={{ height: '100%', width: '100%' }}>
            {links.map(({ label, to, icon }, index) => (
              <RouterLink
                to={to}
                key={label}
                onClick={toggleBar}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={label} sx={{ color: theme.palette.text.primary, margin: 0 }} />
                  </ListItemButton>
                </ListItem>
              </RouterLink>
            ))}
          </List>
        </Box>

      </Box>
    </Box>
  )
}

export default Leftbar