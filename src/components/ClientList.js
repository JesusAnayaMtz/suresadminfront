import React, { useState, useEffect } from "react";
import { getAllClients, deleteClient, activateClient } from "../services/clienteService";
import ClientFormModal from "./ClientFormModal";
import ClientDetailsModal from "./ClientDetailsModal";
import SearchBar from "./SearchBar";
import { Button, Table} from "react-bootstrap";
import * as XLSX from 'xlsx';
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";

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
      const sortedClients = response.data.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      setClients(sortedClients);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estas Seguro?",
        text: "No podras revertir esta accion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "Cancelar",
      });
      if(result.isConfirmed){
        await deleteClient(id);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El cliente ha sido eliminado correctamente",
          confirmButtonText: "Aceptar",
        });
        fetchClients(); // Actualizar la lista después de eliminar
      }     
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al eliminar el cliente",
        confirmButtonText: "Aceptar",
      });
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

  const filteredClients = clients
    .filter(
      (client) =>
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.rfc.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Función para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(clients); // Convertir datos a hoja Excel
    const workbook = XLSX.utils.book_new(); // Crear un nuevo libro Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes"); // Agregar la hoja
    XLSX.writeFile(workbook, "clientes.xlsx"); // Descargar el archivo como "clientes.xlsx"
  };

  return (
    <div>
      <h2 className="text-center">Gestión de Clientes</h2>
      <div>
        <div className="row">
          <div className="col-md-1 mb-2">
            <p className="mt-2 text-center fs-5">Buscar</p>
          </div>
          <div className="col-md-7">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-md-4 text-end">
            <Button 
            onClick={handleCreate} 
            variant="primary"
            size="sm"
            className="me-2 mb-3"
            >
              Crear Cliente
            </Button>
          <Button
            onClick={exportToExcel}
            variant="success"
            size="sm"
            className="mb-3"
          >
            Exportar a Excel
          </Button>
          </div>
        </div>
      </div>
      <Table size="sm" responsive striped bordered hover>
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
                  size="sm"
                  variant="outline-primary"
                  onClick={() => handleViewDetails(client)}
                  className="me-2"
                >
                  <BsEye size={20} />
                </Button>{" "}
                <Button
                  size="sm"
                  variant="outline-info"
                  onClick={() => handleEdit(client)}
                  className="me-2"
                >
                  <BsPencil size={20} />
                </Button>{" "}
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(client.id)}
                >
                  <BsTrash size={20}/>
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
