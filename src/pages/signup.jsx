import { TextField, Button, Grid, Typography, Box, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useRegisterViewModel from '../viewModels/signup-view-model';
import LoadingScreen from '../components/spinner';

function Register() {
  const navigate = useNavigate();

  const {
    onSubmit,
    formData,
    errors,
    handleChange,
    loading
  } = useRegisterViewModel({ navigate })

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
        <Card sx={{ maxWidth: 400, width: '100%', padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)', '@media (max-width: 600px)': { padding: 2 } }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Registrarse
            </Typography>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre de Usuario *"
                    variant="outlined"
                    name="username"
                    value={formData.username}
                    error={!!errors.username}
                    onChange={handleChange}
                    helperText={errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico *"
                    type="email"
                    variant="outlined"
                    name="email"
                    value={formData.email}
                    error={!!errors.email}
                    onChange={handleChange}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contraseña *"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={formData.password}
                    error={!!errors.password}
                    onChange={handleChange}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#317589', color: '#fff' }}
                    fullWidth
                  >
                    Registrarse
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#317589', fontWeight: 'bold' }}>
                  Inicia sesión
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Register;
