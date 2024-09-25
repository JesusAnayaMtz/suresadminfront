import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Button, Table} from "react-bootstrap";
import { activateProveedor, deleteProveedor, getAllProveedores } from "../services/proveedorService";
import ProveedorFormModal from "./ProveedorFormModal";
import ProveedorDetailsModal from "./ProveedorDetailsModal";


const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [viewingProveedor, setViewingProveedor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await getAllProveedores();
      setProveedores(response.data);
    } catch (error) {
      console.error("Error fetching proveedores", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProveedor(id);
      fetchProveedores(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error deleting proveedor", error);
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateProveedor(id);
      fetchProveedores(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error activated proveedor", error);
    }
  };

  const handleEdit = (proveedor) => {
    setEditingProveedor(proveedor);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingProveedor(null);
    setShowModal(true);
  };

  const handleViewDetails = (proveedor) => {
    setViewingProveedor(proveedor);
    setShowDetailsModal(true);
  };

  const filteredProveedores = proveedores.filter(
    (proveedor) =>
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.rfc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-center">Gestión de Proveedores</h2>
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
        Crear Proveedor
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
          {filteredProveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.rfc}</td>
              <td>{proveedor.email}</td>
              <td>{proveedor.telefono}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewDetails(proveedor)}
                >
                  Ver Detalles
                </Button>{" "}
                <Button variant="warning" onClick={() => handleEdit(proveedor)}>
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(proveedor.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <ProveedorFormModal
          show={showModal}
          onHide={() => setShowModal(false)}
          proveedor={editingProveedor}
          onProveedorSaved={fetchProveedores}
        />
      )}

      {showDetailsModal && (
        <ProveedorDetailsModal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          proveedor={viewingProveedor}
        />
      )}
    </div>
  );
};

export default ProveedorList;
