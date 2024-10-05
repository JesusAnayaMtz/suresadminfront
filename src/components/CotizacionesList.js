import React, { useState, useEffect } from "react";
import { getAllCotizaciones } from "../services/CotizacionService";
import SearchBar from "./SearchBar";
import { Button, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { BsEye } from "react-icons/bs";
import CotizacionDetailsModal from "./CotizacionDetailsModal";

const CotizacionesList = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [viewingCotizacion, setViewingCotizacion] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchCotizaciones();
  }, []);

  const fetchCotizaciones = async () => {
    try {
      const response = await getAllCotizaciones();
        console.log(response.data);
      setCotizaciones(response.data);
    } catch (error) {
      console.error("Error fetching cotizaciones", error);
    }
  };

  const handleViewDetails = (cotizacion) => {
    setViewingCotizacion(cotizacion);
    setShowDetailsModal(true);
  };

const filteredCotizaciones = cotizaciones.filter((cotizacion) => {
  const cliente = cotizacion.cliente || {};
  return (
    (cliente.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.rfc?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterDate === "" || cotizacion.fechaCreacion.includes(filterDate))
  );
});

  // Función para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(cotizaciones); // Convertir datos a hoja Excel
    const workbook = XLSX.utils.book_new(); // Crear un nuevo libro Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones"); // Agregar la hoja
    XLSX.writeFile(workbook, "cotizaciones.xlsx"); // Descargar el archivo como "cotizaciones.xlsx"
  };

  return (
    <div>
      <h2 className="text-center">Gestión de Cotizaciones</h2>
      <div>
        <div className="row">
          <div className="col-md-1 mb-3">
            <p className="mt-2 text-center">Buscar</p>
          </div>
          <div className="col-md-5">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div className="col-md-3 text-end">
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
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>RFC</th>
            <th>Fecha de Creación</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCotizaciones.map((cotizacion) => (
            <tr key={cotizacion.id}>
              <td>{cotizacion.clienteId.nombre}</td>
              
              <td>{cotizacion.fechaCreacion}</td>
              <td>{cotizacion.subtotal.toFixed(2)}</td>
              <td>{cotizacion.total.toFixed(2)}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(cotizacion)}
                  className="me-2"
                >
                  <BsEye size={24} color="black" />
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
    </div>
  );
};

export default CotizacionesList;
