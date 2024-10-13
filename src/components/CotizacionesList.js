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
import { BsEye, BsPencil, BsTrash, BsFileEarmarkPdf } from "react-icons/bs";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  // Función para exportar a PDF
  const exportCotizacionToPDF = (cotizacion) => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = 'logo3.jpg'; 
    
    logo.onload = function() {
      doc.addImage(logo, 'JPEG', 14, 18, 30, 30);
      doc.setFontSize(14);
      doc.text(`Cotización: ${cotizacion.id}`, 47, 22);
      doc.setFontSize(12);
      doc.text(`Cliente: ${cotizacion.cliente.nombre}`, 47, 30);
      doc.text(`Direccion: ${cotizacion.cliente.direccion}`, 47, 36);
      doc.text(`${cotizacion.cliente.colonia}, ${cotizacion.cliente.ciudad}, ${(cotizacion.cliente.estado)} `, 47, 42)
      doc.text(`RFC: ${cotizacion.cliente.rfc}`, 47, 48);
      doc.text(`Fecha: ${cotizacion.fechaCreacion}`, 150, 22);
  
      const productos = cotizacion.productos.map((prod) => [
        prod.nombre,
        prod.cantidad,
        `$${prod.precio}`,
        `${prod.descuento}%`,
        `$${prod.importe}`,
      ]);
  
      doc.autoTable({
        head: [["Producto", "Cantidad", "Precio", "Descuento", "Importe"]],
        body: productos,
        startY: 60,
      });

      doc.text(`Subtotal: $${cotizacion.subtotal}`, 160, doc.lastAutoTable.finalY + 10);
      doc.text(`Descuento Extra: ${cotizacion.descuentoAdicional}%`, 154, doc.lastAutoTable.finalY + 16);
      doc.text(`Total: $${cotizacion.total}`, 162, doc.lastAutoTable.finalY + 22);

      doc.text("Notas:", 14, 180);
      doc.text("A. Cambio de precios sin previo aviso.", 14, 186);
      doc.text("B. Condiciones de pago: a convenir con el departamento de comprar.", 14, 192);
      doc.text("C. Tiempo de entrega: de 1 a 3 dias habiles dependiendo la existencia.", 14, 198);
      doc.text("D. Se requiere orden de compra para autorizar la presente cotizacion.", 14, 204);
      doc.text("E. Vigencia de la presente cotizacion: 3 dias naturales.", 14, 210);
  
      // Guardar PDF después de agregar la imagen
      doc.save(`cotizacion_${cotizacion.cliente.nombre}_${cotizacion.id}.pdf`);
    };
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
                  className="me-2"
                >
                  <BsTrash size={24} color="black" />
                </Button>
                <Button
                  variant="info"
                  onClick={() => exportCotizacionToPDF(cotizacion)}
                >
                  <BsFileEarmarkPdf size={24} color="black" />
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
          initialData={editingCotizacion}
          onSave={fetchCotizaciones}
        />
      )}
    </div>
  );
};

export default CotizacionesList;
