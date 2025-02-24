import axiosInstance from "./axiosInstance";

const SERVER_ERROR_MESSAGE = "Ha ocurrido un problema al conectar con el servidor";
const LOGIN_ERROR_MESSAGE = "Ha ocurrido un error al loguearse";
const REGISTER_ERROR_MESSAGE = "Ha ocurrido un error al registrarse";

export const createRegisterResponse = ({ message = '', error = null }) => ({
  error,
  message,
  isValid: () => !error,
});

export const createLoginResponse = ({ token = null, username = '', expiration = '', userid = '', error = null, message = '' }) => ({
  token,
  username,
  expiration,
  userid,
  error,
  message,
  isValid: () => !error,
});

export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await axiosInstance.post('/api/Authenticate/register', { username, email, password });

    if (response.data?.status === 'Success') {
      console.info("Registro exitoso:", response.data?.message);
      return createRegisterResponse({ message: 'Se ha registrado correctamente' })
    } else {
      console.error("Error en el registro:", { status: response.status, message: response.statusText });
      return createRegisterResponse({ error: REGISTER_ERROR_MESSAGE })
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || SERVER_ERROR_MESSAGE;
    console.error("Error al conectar con el servidor:", err);
    return createRegisterResponse({ error: errorMessage })
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const response = await axiosInstance.post('/api/Authenticate/login', { username, password });

    if (response.status === 200) {
      // console.info("Login exitoso:", response.data);
      return createLoginResponse({ ...response.data, message: 'Se ha logueado correctamente' });
    } else {
      console.error("Error en el login:", { status: response.status, message: response.statusText });
      return createLoginResponse({ error: LOGIN_ERROR_MESSAGE });
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || LOGIN_ERROR_MESSAGE;
    console.error("Error al conectar con el servidor:", err);
    return createLoginResponse({ error: errorMessage });
  }
};
