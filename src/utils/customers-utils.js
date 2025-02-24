import axiosInstance from "./axiosInstance";

const getAuthHeaders = (token) => ({ Authorization: `Bearer ${token}` });

const createResponse = ({ success = true, data = null, error = null, message = '' }) => {
  return {
    success, data, error, message
  };
};

export const getInterests = async (token) => {
  try {
    const response = await axiosInstance.get("api/Intereses/Listado", {
      headers: getAuthHeaders(token),
    });
    return createResponse({
      success: true,
      data: response.data,
      message: 'Intereses extraídos satisfactoriamente',
    });
  } catch (error) {
    console.error("Error fetching interests:", error);
    return createResponse({
      success: false,
      error: 'Error al cargar los intereses',
    });
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const getClients = async ({ token, userId }, { identificacion = '', nombre = '' }) => {
  try {
    const response = await axiosInstance.post(
      "api/Cliente/Listado",
      { identificacion, nombre, usuarioId: userId },
      { headers: getAuthHeaders(token) }
    );
    return createResponse({
      success: true,
      data: response.data,
      message: 'Clientes listados satisfactoriamente',
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return createResponse({
      success: false,
      error: 'Error al listar los clientes',
    });
  }
};

export const createClient = async ({ token, userId }, clientData) => {
  try {
    const response = await axiosInstance.post(
      "api/Cliente/Crear",
      { ...clientData, usuarioId: userId },
      { headers: getAuthHeaders(token) }
    );
    return createResponse({
      success: true,
      data: response.data,
      message: 'Cliente creado satisfactoriamente',
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return createResponse({
      success: false,
      error: 'Error al crear el cliente',
    });
  }
};

export const updateClient = async ({ token, userId }, clientData) => {
  try {
    const response = await axiosInstance.post(
      "api/Cliente/Actualizar",
      { ...clientData, usuarioId: userId },
      { headers: getAuthHeaders(token) }
    );
    return createResponse({
      success: true,
      data: response.data,
      message: 'Cliente actualizado satisfactoriamente',
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return createResponse({
      success: false,
      error: 'Error al actualizar el cliente',
    });
  }
};

export const getClient = async ({ token }, { idCliente }) => {
  if (!idCliente) {
    return createResponse({
      success: false,
      error: 'Se requiere el ID del cliente',
    });
  }
  try {
    const response = await axiosInstance.get(
      `api/Cliente/Obtener/${idCliente}`,
      { headers: getAuthHeaders(token) }
    );
    return createResponse({
      success: true,
      data: response.data,
      message: 'Cliente obtenido satisfactoriamente',
    });
  } catch (error) {
    console.error("Error fetching client:", error);
    return createResponse({
      success: false,
      error: 'Error al obtener el cliente',
    });
  }
};

export const deleteClient = async ({ token }, { idCliente }) => {
  if (!idCliente) {
    return createResponse({
      success: false,
      error: 'Se requiere el ID del cliente',
    });
  }
  try {
    const response = await axiosInstance.delete(
      `api/Cliente/Eliminar/${idCliente}`,
      { headers: getAuthHeaders(token) }
    );
    return createResponse({
      success: true,
      data: response.data,
      message: 'Cliente eliminado satisfactoriamente',
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return createResponse({
      success: false,
      error: 'Error al eliminar el cliente',
    });
  }
};
