import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid } from '@mui/material';

const SearchBar = ({ setSearch }) => {
  const [info, setInfo] = useState({ nombre: "", identificacion: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxLengths = { nombre: 50, identificacion: 20 };

    if (value.length <= maxLengths[name]) {
      setInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearchClick = () => {
    setSearch({ nombre: info.nombre, identificacion: info.identificacion });
  };

  return (
    <Grid 
      container 
      spacing={1}  // Se redujo el espacio entre los elementos
      alignItems="center"
      sx={{ zIndex: 0, position: 'relative' }}
    >
      {/* Identificación */}
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          label="Identificación"
          name="identificacion"
          type="text"
          value={info.identificacion}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 20 }}
          color="primary"
        />
      </Grid>

      {/* Nombre */}
      <Grid item xs={12} sm={5} md={5}>
        <TextField
          label="Nombre"
          name="nombre"
          type="text"
          value={info.nombre}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 50 }}
        />
      </Grid>

      {/* Botón de Búsqueda */}
      <Grid 
        item 
        xs={12} sm={1} md={1} 
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Button
          variant="outlined"
          sx={{
            width: "40px",  // Tamaño fijo cuadrado
            height: "40px",
            minWidth: "unset", 
            borderRadius: "50%", // Circular
            backgroundColor: "#daf0f3",
            color: "#000",
            padding: 0, // Evitar relleno extra
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={handleSearchClick}
        >
          <SearchIcon fontSize="small" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
