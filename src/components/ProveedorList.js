import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Button, Table} from "react-bootstrap";
import { activateProveedor, deleteProveedor, getAllProveedores } from "../services/proveedorService";
import ProveedorFormModal from "./ProveedorFormModal";
import ProveedorDetailsModal from "./ProveedorDetailsModal";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";


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
        await deleteProveedor(id);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El proveedor ha sido eliminado correctamente",
          confirmButtonText: "Aceptar",
        });
        fetchProveedores(); // Actualizar la lista después de eliminar
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al eliminar el producto",
        confirmButtonText: "Aceptar",
      });
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

  // Función para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(proveedores); // Convertir datos a hoja Excel
    const workbook = XLSX.utils.book_new(); // Crear un nuevo libro Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Proveedores"); // Agregar la hoja
    XLSX.writeFile(workbook, "proveedores.xlsx"); // Descargar el archivo como "clientes.xlsx"
  };

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
        <div className="col-md-12 text-end">
          <Button
            onClick={exportToExcel}
            variant="success"
            size="sm"
            className="mb-3 primary"
          >
            Exportar a Excel
          </Button>
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
                  variant="primary"
                  onClick={() => handleViewDetails(proveedor)}
                  className="me-2"
                >
                  <BsEye size={24} color="black"/>
                </Button>{" "}
                <Button variant="warning" 
                onClick={() => handleEdit(proveedor)}
                className="me-2">
                  <BsPencil size={24}/>
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(proveedor.id)}
                >
                  <BsTrash size={24} color="black" />
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
