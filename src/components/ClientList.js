import React, { useState, useEffect } from "react";
import { getAllClients, deleteClient, activateClient } from "../services/clienteService";
import ClientFormModal from "./ClientFormModal";
import ClientDetailsModal from "./ClientDetailsModal";
import SearchBar from "./SearchBar";
import { Button, Table} from "react-bootstrap";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getAllClients();
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      fetchClients(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error deleting client", error);
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateClient(id);
      fetchClients(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error activated client", error);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingClient(null);
    setShowModal(true);
  };

  const handleViewDetails = (client) => {
    setViewingClient(client);
    setShowDetailsModal(true);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.rfc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-center">Gestión de Clientes</h2>
      <div>
        <div className="row">
          <div className="col-md-1 mb-3">
            <p className="mt-2 text-center">Buscar</p>
          </div>
        <div className="col-md-7">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="col-md-4 text-end">
        <Button onClick={handleCreate} className="mb-3">
        Crear Cliente
      </Button>
        </div>
      </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre/Razon Social</th>
            <th>RFC</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>{client.nombre}</td>
              <td>{client.rfc}</td>
              <td>{client.email}</td>
              <td>{client.telefono}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewDetails(client)}
                >
                  Ver Detalles
                </Button>{" "}
                <Button variant="warning" onClick={() => handleEdit(client)}>
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(client.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <ClientFormModal
          show={showModal}
          onHide={() => setShowModal(false)}
          client={editingClient}
          onClientSaved={fetchClients}
        />
      )}

      {showDetailsModal && (
        <ClientDetailsModal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          client={viewingClient}
        />
      )}
    </div>
  );
};

export default ClientList;
