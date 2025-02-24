import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import SearchBar from '../components/search-bar';
import ClientTable from '../components/customers-table';
import LoadingScreen from '../components/spinner';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useClientConsultViewModel from '../viewModels/customers-list-view-model';
import { useGlobalContext } from '../context/app-context';

const ClientConsult = () => {
  const { state } = useGlobalContext()
  const navigate = useNavigate();

  const { loading, setSearch, clients, eliminarCliente } = useClientConsultViewModel({ token: state.token, userId: state.userId })

  if (loading) {
    return <LoadingScreen />;
  }

  const editarCliente = (id) => {
    navigate('/customers/management', { state: { clientId: id } });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
        <Header navigate={navigate} />
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Centered SearchBar horizontally */}
          <SearchBar setSearch={setSearch} />
        </Box>
        <Box mt={4}> 
          <ClientTable
            clients={clients}
            onEdit={editarCliente}
            onDelete={eliminarCliente}
          />
        </Box>
      </Paper>
    </Box>
  );
};

const Header = ({ navigate }) => {
  const theme = useTheme()
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: 'flex', flexDirection: isSmScreen ? 'column' : 'row', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
      {isSmScreen && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button startIcon={<PersonAddIcon />} variant="outlined" sx={{ backgroundColor: '#daf0f3', color: '#000' }} onClick={() => navigate('/customers/management')}>
            Agregar
          </Button>
          <Button startIcon={<ArrowBackIcon />} variant="outlined" sx={{ backgroundColor: '#daf0f3', color: '#000' }} onClick={() => navigate('/')}>
            Regresar
          </Button>
        </Stack>
      )}
      <Typography variant={'h5'}>Consulta de Clientes</Typography>
      {!isSmScreen && (
        <Stack direction="row" spacing={1}>
          <Button startIcon={<PersonAddIcon />} variant="outlined" sx={{ backgroundColor: '#daf0f3', color: '#000' }} onClick={() => navigate('/customers/management')}>
            Agregar
          </Button>
          <Button startIcon={<ArrowBackIcon />} variant="outlined" sx={{ backgroundColor: '#daf0f3', color: '#000' }} onClick={() => navigate('/')}>
            Regresar
          </Button>
        </Stack>
      )}
    </Box>
  )
};

export default ClientConsult;
