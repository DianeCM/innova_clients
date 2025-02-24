import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteConfirmationModal = ({ onDelete, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          ¿Estás seguro de que deseas eliminar a este cliente?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cancelar
        </Button>
        <Button onClick={onDelete} variant="outlined" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ClientTable = ({ clients, onEdit, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [clientId, setClientId] = useState(null);

  const handleOpenModal = (clientId) => {
    setClientId(clientId)
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteModal = () => {
    console.log("Elemento eliminado");
    onDelete(clientId)
    handleCloseModal();
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <DeleteConfirmationModal onDelete={handleDeleteModal} open={openModal} onClose={handleCloseModal}></DeleteConfirmationModal>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {[
              { label: 'IDENTIFICACIÓN', width: '35%' },
              { label: 'NOMBRE COMPLETO', width: '45%' },
              { label: 'ACCIONES', width: '20%', align: 'center' }
            ].map(({ label, width, align = 'left' }) => (
              <TableCell key={label} sx={{ width, backgroundColor: '#daf0f3', color: 'common.black' }} align={align}>{label}</TableCell> 
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <TableRow key={client.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                <TableCell>{client.identificacion}</TableCell>
                <TableCell>{`${client.nombre} ${client.apellidos}`}</TableCell>
                <TableCell>
                  <Stack direction={'row'} alignContent={'center'} justifyContent={'center'}>
                    <IconButton aria-label="edit"
                      variant="text"
                      color="primary"
                      onClick={() => onEdit(client.id)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete"
                      variant="text"
                      color="error"
                      onClick={() => handleOpenModal(client.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>

                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No se encontraron clientes
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientTable;
