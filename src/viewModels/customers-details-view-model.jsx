import { useEffect, useState } from "react";
import { createClient, formatDate, getClient, getInterests, updateClient } from "../utils/customers-utils";
import { useNotification } from "../hooks/notification-context";

const initialClientState = {
  identificacion: "",
  nombre: "",
  apellidos: "",
  celular: "",
  otroTelefono: "",
  direccion: "",
  fNacimiento: "",
  fAfiliacion: "",
  sexo: "",
  resennaPersonal: "",
  imagen: "",
  interesFK: "",
};

const mapClientData = (data) => ({
  identificacion: data?.identificacion || "",
  nombre: data?.nombre || "",
  apellidos: data?.apellidos || "",
  celular: data?.telefonoCelular || "",
  otroTelefono: data?.otroTelefono || "",
  direccion: data?.direccion || "",
  fNacimiento: formatDate(data?.fNacimiento),
  fAfiliacion: formatDate(data?.fAfiliacion),
  sexo: data?.sexo?.toUpperCase() || "",
  resennaPersonal: data?.resenaPersonal || "",
  imagen: data?.imagen || "",
  interesFK: data?.interesesId || "",
});

const labelFor = (field) => {
  const labels = {
    nombre: "El nombre",
    apellidos: "Los apellidos",
    identificacion: "La identificación",
    celular: "El teléfono celular",
    otroTelefono: "El teléfono adicional",
    direccion: "La dirección",
    sexo: "Sexo",
    resennaPersonal: "La reseña personal",
    fNacimiento: "La fecha de nacimiento",
    fAfiliacion: "La fecha de afiliación",
    interesFK: "El interés",
  };
  return labels[field] || field;
};

const useClientMantenanceViewModel = ({ token, userId, clientId = null, navigate }) => {
  const [interests, setInterests] = useState([]);
  const [client, setClient] = useState(initialClientState);
  const [fieldsErrors, setFieldsErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const validateForm = () => {
    const newErrors = {};
    const validations = [
      { field: "nombre", maxLength: 50 },
      { field: "apellidos", maxLength: 100 },
      { field: "identificacion", maxLength: 20 },
      { field: "celular", maxLength: 20 },
      { field: "otroTelefono", maxLength: 20 },
      { field: "direccion", maxLength: 200 },
      { field: "sexo", validValues: ["M", "F"] },
      { field: "resennaPersonal", maxLength: 200 },
      { field: "fNacimiento" },
      { field: "fAfiliacion" },
      { field: "interesFK" },
    ];

    validations.forEach(({ field, maxLength, validValues }) => {
      if (!client[field]) {
        newErrors[field] = `${labelFor(field)} es requerido(a)`;
      } else if (maxLength && client[field]?.length > maxLength) {
        newErrors[field] = `${labelFor(field)} no puede superar los ${maxLength} caracteres`;
      } else if (validValues && !validValues.includes(client[field])) {
        newErrors[field] = `${labelFor(field)} debe ser 'M' o 'F'`;
      }
    });

    setFieldsErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchInterests = async () => {
      const { success, data, error } = await getInterests(token);
      if (success) {
        setInterests(data);
        console.info("Intereses cargados correctamente:", data);
      } else {
        console.error("Error al cargar los intereses:", error);
        showNotification("Error al cargar los intereses", 'error')
      }
    };

    if (token) {
      fetchInterests();
    }
  }, [token]);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId) {setLoading(false) ; return};
      const { success, data, error } = await getClient({ token, userId }, { idCliente: clientId });
      if (success) {
        setClient(mapClientData(data));
        showNotification("Cliente cargado correctamente", "success");
      } else {
        console.error("Error fetching client:", error);
        showNotification("Error al cargar los datos del cliente", "error");
      }
      setLoading(false)
    };

    if (token && userId && interests.length > 0) {
      setLoading(true)
      fetchClientData();
    }
  }, [token, userId, clientId, interests]);

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const apiCall = clientId
          ? updateClient({ token, userId }, { ...client, id: clientId })
          : createClient({ token, userId }, client);
        const { success, error } = await apiCall;

        if (success) {
          showNotification(
            clientId
              ? "Cliente actualizado correctamente"
              : "Cliente creado correctamente",
            "success"
          );
          navigate("/customers");
        } else {
          throw new Error(error);
        }
      } catch (err) {
        console.error(err);
        showNotification(
          clientId
            ? "Error al actualizar cliente"
            : "Error al crear cliente",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  return {
    client,
    interests,
    fieldsErrors,
    loading,
    onSubmit: handleSubmit,
    setClient,
    handleChange,
  };
};

export default useClientMantenanceViewModel;
