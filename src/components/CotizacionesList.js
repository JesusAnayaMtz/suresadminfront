import React, { useState, useEffect } from "react";
import {
  getAllCotizaciones,
  deleteCotizacion,
} from "../services/CotizacionService";
import CotizacionDetailsModal from "./CotizacionDetailsModal";
import CotizacionFormModal from "./CotizacionFormModal";
import SearchBar from "./SearchBar";
import { Button, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";

const CotizacionesList = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [viewingCotizacion, setViewingCotizacion] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCotizacion, setEditingCotizacion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCotizaciones();
  }, []);

  const fetchCotizaciones = async () => {
    try {
      const response = await getAllCotizaciones();
      setCotizaciones(response.data);
    } catch (error) {
      console.error("Error fetching cotizaciones", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al cargar las cotizaciones",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleViewDetails = (cotizacion) => {
    setViewingCotizacion(cotizacion);
    setShowDetailsModal(true);
  };

  const handleEditCotizacion = (cotizacion) => {
    setEditingCotizacion(cotizacion);
    setShowFormModal(true);
  };

  const handleDeleteCotizacion = async (cotizacionId) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await deleteCotizacion(cotizacionId);
        Swal.fire("Eliminado", "La cotización ha sido eliminada", "success");
        fetchCotizaciones();
      }
    } catch (error) {
      console.error("Error deleting cotización", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al eliminar la cotización",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const filteredCotizaciones = cotizaciones.filter(
    (cotizacion) =>
      cotizacion.cliente.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      cotizacion.fechaCreacion.includes(searchTerm)
  );

  // Función para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(cotizaciones);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones");
    XLSX.writeFile(workbook, "cotizaciones.xlsx");
  };

  return (
    <div>
      <h2 className="text-center">Listado de Cotizaciones</h2>
      <div>
        <div className="row">
          <div className="col-md-1 mb-3">
            <p className="mt-2 text-center">Buscar</p>
          </div>
          <div className="col-md-7">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-md-4 text-end">
            <Button
              onClick={() => setShowFormModal(true)}
              variant="primary"
              size="sm"
              className="me-2 mb-3"
            >
              Crear Cotización
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha de Creación</th>
            <th>Subtotal</th>
            <th>Descuento Adicional</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCotizaciones.map((cotizacion) => (
            <tr key={cotizacion.id}>
              <td>{cotizacion.cliente.nombre}</td>
              <td>{cotizacion.fechaCreacion}</td>
              <td>{cotizacion.subtotal}</td>
              <td>{cotizacion.descuentoAdicional}%</td>
              <td>{cotizacion.total}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(cotizacion)}
                  className="me-2"
                >
                  <BsEye size={24} color="black" />
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleEditCotizacion(cotizacion)}
                  className="me-2"
                >
                  <BsPencil size={24} color="black" />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCotizacion(cotizacion.id)}
                >
                  <BsTrash size={24} color="black" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showDetailsModal && (
        <CotizacionDetailsModal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          cotizacion={viewingCotizacion}
        />
      )}

      {showFormModal && (
        <CotizacionFormModal
          show={showFormModal}
          onHide={() => {
            setShowFormModal(false);
            setEditingCotizacion(null);
          }}
          cotizacion={editingCotizacion}
          onSave={fetchCotizaciones}
        />
      )}
    </div>
  );
};

export default CotizacionesList;
