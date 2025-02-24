import { useState, useEffect } from "react";
import { deleteClient, getClients } from "../utils/customers-utils";
import { useNotification } from "../hooks/notification-context";

const useClientConsultViewModel = ({ token, userId }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({ nombre: "", identificacion: "" });
  const { showNotification } = useNotification();

  const loadClients = async (searchCriteria) => {
    setLoading(true);
    getClients({ token, userId }, searchCriteria)
      .then(({ success, data, message, error }) => {
        if (success) {
          setClients(data);
          showNotification(message, "success");
        } else {
          console.error("Error fetching clients:", error);
          showNotification("Error al cargar los clientes", "error");
        }
      })
    setLoading(false)
  };

  const eliminarCliente = async (id) => {
    setLoading(true);
    if (!id) {
      showNotification("ID del cliente requerido para eliminar")
    } else {
      deleteClient({ token }, { idCliente: id })
        .then(({ success, error, message}) => {
          if (success) {
            setClients((prevClients) =>
              prevClients.filter((client) => client.id !== id)
            );
            // loadClients()
            showNotification("Cliente Eliminado satisfactoriamente")
          } else {
            console.error("Error deleting client:", error);
            showNotification("Error al eliminar el cliente", "error");
          }
          setLoading(false)
        })
    }
  };

  useEffect(() => {
    if (token && userId) {
      loadClients(search);
    }
  }, [token, userId, search]);

  return {
    clients,
    loading,
    search,
    setSearch,
    eliminarCliente,
  };
};

export default useClientConsultViewModel;
