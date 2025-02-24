import { Typography, Container, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Center vertically */}
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}> {/* Make text bold */}
          Bienvenido
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
