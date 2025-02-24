import { useGlobalContext } from '../context/app-context';
import { TextField, Button, Grid, Typography, Box, FormControlLabel, Checkbox, FormControl, Card, CardContent } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import useLoginViewModel from '../viewModels/login-view-model';
import LoadingScreen from '../components/spinner';

function Login() {
  const { state, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const {
    userInfo,
    handleChange,
    onSubmit,
    errors,
    loading
  } = useLoginViewModel({ state, dispatch, navigate })

  if (loading) return <LoadingScreen />

  return (
    <Grid container sx={{ 
      height: '100vh', 
      backgroundColor: '#f0f2f5', 
      backgroundImage: 'url(/endless-constellation.svg)', 
      backgroundRepeat: 'repeat' 
    }}>
      <Grid item xs={12} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        '@media (max-width: 600px)': {
          padding: 2
        }
      }}>
        <Card sx={{ 
          maxWidth: 400, 
          width: '100%', 
          padding: 3, 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
          marginRight: '30px', 
          '@media (max-width: 600px)': { padding: 2, marginRight: 0 }
        }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#162c36' }}>
              Iniciar Sesión
            </Typography>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="username"
                    label="Nombre de Usuario *"
                    variant="outlined"
                    value={userInfo.username}
                    error={!!errors.username}
                    onChange={handleChange}
                    helperText={errors.username}
                    sx={{ color: '#162c36' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Contraseña *"
                    type="password"
                    variant="outlined"
                    value={userInfo.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{ color: '#162c36' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormControlLabel
                      control={<Checkbox checked={userInfo.remember} />}
                      label="Recuérdame"
                      name="remember"
                      onChange={handleChange}
                      sx={{ color: '#162c36' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#317589', color: '#fff' }}
                    fullWidth
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#162c36' }}>
                ¿Aún no tienes una cuenta?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: '#317589', fontWeight: 'bold' }}>
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;