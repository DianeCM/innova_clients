import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/app-context";
import useClientMantenanceViewModel from "../viewModels/customers-details-view-model";
import {
    Box, Button, Paper, Grid, TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    useMediaQuery,
    useTheme,
    Stack,
    Typography
} from "@mui/material";
import ImageUploader from "../components/image-uploader";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingScreen from "../components/spinner";

const ClientMaintenance = () => {
    const { state } = useGlobalContext();
    const location = useLocation();
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        client,
        interests,
        fieldsErrors,
        onSubmit,
        setClient,
        handleChange, 
        loading
    } = useClientMantenanceViewModel({
        token: state.token,
        userId: state.userId,
        clientId: location.state?.clientId,
        navigate
    })
    
    if (loading) return <LoadingScreen />;

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={'30px'}        >
            <Paper elevation={1} sx={{ padding: 2, margin: "1rem", width: '100%'}}>
                {isSmScreen && (
                    <Stack direction="row" spacing={1} sx={{ mb: 3, justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="outlined"
                            sx={{ backgroundColor: '#daf0f3', color: '#000' }}
                            startIcon={<SaveIcon />}
                            onClick={onSubmit}
                        >
                            Guardar
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ backgroundColor: '#daf0f3', color: '#000' }}
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                        >
                            Regresar
                        </Button>
                    </Stack>
                )}
                <Box display="flex" alignItems="center" justifyContent={isSmScreen ? 'center':"space-between"} mb={3}>
                    <Box display="flex" alignItems="center">
                        <ImageUploader
                            image={client.imagen}
                            setImage={(imagen) => setClient((prev) => ({ ...prev, imagen }))}
                        />
                        <Typography variant={'h6'} sx={{ ml: 2, fontWeight: "bold" }}>
                            Mantenimiento de Clientes
                        </Typography>
                    </Box>
                    {!isSmScreen && (
                        <Stack direction="row" spacing={1}>
                            <Button
                                type="submit"
                                variant="outlined"
                                sx={{ backgroundColor: '#daf0f3', color: '#000' }}
                                startIcon={<SaveIcon />}
                                onClick={onSubmit}
                            >
                                Guardar
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ backgroundColor: '#daf0f3', color: '#000' }}
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigate(-1)}
                            >
                                Regresar
                            </Button>
                        </Stack>
                    )}
                </Box>
                <Box>
                    <form>
                        <Grid container spacing={2}>
                            {[
                                { label: "Identificación", name: "identificacion", type: "text", error: fieldsErrors.identificacion },
                                { label: "Nombre", name: "nombre", type: "text", error: fieldsErrors.nombre },
                                { label: "Apellidos", name: "apellidos", type: "text", error: fieldsErrors.apellidos }
                            ].map(({ label, name, type, error }) => (
                                <FormField
                                    key={name}
                                    label={label}
                                    name={name}
                                    type={type}
                                    value={client[name]}
                                    onChange={handleChange}
                                    error={error}
                                />
                            ))}
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth error={!!fieldsErrors.sexo}>
                                    <InputLabel id="sexo-label">Género</InputLabel>
                                    <Select
                                        labelId="sexo-label"
                                        name="sexo"
                                        value={client.sexo}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="M">Masculino</MenuItem>
                                        <MenuItem value="F">Femenino</MenuItem>
                                    </Select>
                                    {fieldsErrors.sexo && <FormHelperText>{fieldsErrors.sexo}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            {[
                                { label: "Fecha de Nacimiento", name: "fNacimiento", type: "date", error: fieldsErrors.fNacimiento },
                                { label: "Fecha de Afiliación", name: "fAfiliacion", type: "date", error: fieldsErrors.fAfiliacion },
                            ].map(({ label, name, type, error }) => (
                                <FormField
                                    key={name}
                                    label={label}
                                    name={name}
                                    type={type}
                                    value={client[name]}
                                    onChange={handleChange}
                                    error={error}
                                />
                            ))}

                            {[
                                { label: "Teléfono Celular", name: "celular", type: "tel", error: fieldsErrors.celular },
                                { label: "Teléfono Otro", name: "otroTelefono", type: "tel", error: fieldsErrors.otroTelefono },
                            ].map(({ label, name, type, error }) => (
                                <FormField
                                    key={name}
                                    label={label}
                                    name={name}
                                    type={type}
                                    value={client[name]}
                                    onChange={handleChange}
                                    error={error}
                                />
                            ))}
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth error={!!fieldsErrors.interesFK}>
                                    <InputLabel id="interesFK-label">Intereses</InputLabel>
                                    <Select
                                        labelId="interesFK-label"
                                        name="interesFK"
                                        value={client.interesFK}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="">Seleccione...</MenuItem>
                                        {interests.map(({ id, descripcion }) => (
                                            <MenuItem key={id} value={id}>
                                                {descripcion}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {fieldsErrors.interesFK && <FormHelperText>{fieldsErrors.interesFK}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            {[
                                { label: "Dirección", name: "direccion", type: "text", multiline: true, rows: 2, error: fieldsErrors.direccion },
                                { label: "Reseña Personal", name: "resennaPersonal", type: "text", multiline: true, rows: 2, error: fieldsErrors.resennaPersonal },
                            ].map(({ label, name, type, multiline, rows, error }) => (
                                <FormField
                                    key={name}
                                    label={label}
                                    name={name}
                                    type={type}
                                    value={client[name]}
                                    onChange={handleChange}
                                    error={error}
                                    multiline={multiline}
                                    rows={rows}
                                    xs={12} 
                                    sm={12}
                                    md={12} 
                                />
                            ))}
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};

const FormField = ({ label, name, type, value, onChange, error, helperText, multiline, rows, ...props }) => (
    <Grid item xs={12} sm={6} md={4} key={name} {...props}>
        <TextField
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            fullWidth
            multiline={multiline}
            rows={rows}
            InputLabelProps={{ shrink: true }}
            required
            error={!!error}
            helperText={helperText || error}
        />
    </Grid>
);

export default ClientMaintenance;
