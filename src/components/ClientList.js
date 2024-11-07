import React, { useState, useEffect } from "react";
import { getAllClients, deleteClient, activateClient } from "../services/clienteService";
import ClientFormModal from "./ClientFormModal";
import ClientDetailsModal from "./ClientDetailsModal";
import SearchBar from "./SearchBar";
import { Button, Form, Pagination, Table} from "react-bootstrap";
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

  //Estados para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pageSizeOptions = [10, 15, 20, 25, 30];

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
      if (result.isConfirmed) {
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

  //Calcular Paginas totales
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  //Obtener Clientes de la pagina actual
  const getCurrentPageClients = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredClients.slice(startIndex, endIndex);
  };

  //MAnejadores de paginacion
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); //resetea a la primera pagina cuando se cambia el numero de items
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(clients); // Convertir datos a hoja Excel
    const workbook = XLSX.utils.book_new(); // Crear un nuevo libro Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes"); // Agregar la hoja
    XLSX.writeFile(workbook, "clientes.xlsx"); // Descargar el archivo como "clientes.xlsx"
  };

  // Componente de paginación
  const renderPagination = () => {
    return (
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">
          <span className="me-2">Mostrar</span>
          <Form.Select
            size="md"
            style={{ width: "auto" }}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Form.Select>
          <span className="ms-2">registros</span>
        </div>
        <Pagination size="md">
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {/* Mostrar páginas */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((pageNum) => {
              // Mostrar siempre primera y última página, y 3 páginas alrededor de la página actual
              return (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              );
            })
            .map((pageNum, index, array) => {
              // Agregar elipsis si hay saltos en la numeración
              if (index > 0 && pageNum - array[index - 1] > 1) {
                return [
                  <Pagination.Ellipsis key={`ellipsis-${pageNum}`} disabled />,
                  <Pagination.Item
                    key={pageNum}
                    active={pageNum === currentPage}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Pagination.Item>,
                ];
              }
              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === currentPage}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              );
            })}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    );
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
      <div>
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
            {getCurrentPageClients().map((client) => (
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
                    <BsTrash size={20} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {renderPagination()}
      </div>

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
