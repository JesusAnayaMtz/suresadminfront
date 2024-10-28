import React, { useState, useEffect } from "react";
import {
  getAllCotizaciones,
  deleteCotizacion,
} from "../services/CotizacionService";
import CotizacionDetailsModal from "./CotizacionDetailsModal";
import CotizacionFormModal from "./CotizacionFormModal";
import SearchBar from "./SearchBar";
import { Button, Placeholder, Table } from "react-bootstrap";
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

  const exportCotizacionToPDF = (cotizacion) => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = "logosures.png";

    // Colores corporativos
    const colors = {
      primary: [0, 48, 135],
      secondary: [128, 128, 128],
      accent: [0, 103, 185],
    };

    // Función para dibujar el footer
    const drawFooter = (pageNumber) => {
      const pageHeight = doc.internal.pageSize.height;
      const footerStart = pageHeight - 29; // Altura desde donde comienza el footer

      // Rectángulo decorativo para el pie de página
      doc.setFillColor(245, 245, 245);
      doc.rect(9, footerStart, 190, 25, "F");

      // Datos de empresa con estilo
      doc.setFontSize(10);
      doc.setTextColor(...colors.primary);
      doc.setFont("helvetica", "bold");
      doc.text("Av. Popocatépetl 37, Fortín", 10, footerStart + 5);
      doc.text("de las Flores, Ver. 94470", 10, footerStart + 10);

      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "normal");
      doc.text("suresindustrial@gmail.com", 10, footerStart + 15);
      doc.text("Móvil: 2711574951", 10, footerStart + 20);

      // Slogan con estilo
      doc.setFontSize(12);
      doc.setTextColor(...colors.primary);
      doc.setFont("helvetica", "italic");
      doc.text(
        "La seguridad es garantía de tu bienestar",
        120,
        footerStart + 5
      );

      // Línea decorativa final
      doc.setDrawColor(...colors.primary);
      doc.setLineWidth(0.5);
      doc.line(10, footerStart + 23, 200, footerStart + 23);

      // Número de página
      doc.setFontSize(8);
      doc.text(`Página ${pageNumber}`, 185, footerStart + 22);
    };

    logo.onload = function () {
      let pageNumber = 0;

      // Función para dibujar el header
      const drawHeader = () => {
        // Fondo decorativo header
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 0, 220, 45, "F");

        // Línea decorativa
        doc.setDrawColor(...colors.primary);
        doc.setLineWidth(1);
        doc.line(0, 45, 210, 45);

        // Logo y header
        doc.addImage(logo, "PNG", 160, 5, 45, 15);

        // Título Cotización con diseño
        doc.setFillColor(...colors.primary);
        doc.rect(75, 4, 50, 8, "F");
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.text("COTIZACIÓN", 85, 10);

        // Datos de la cotización
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.setFont("helvetica", "normal");
        doc.text(`No.: ${cotizacion.id}`, 15, 20);
        doc.text(`Fecha: ${cotizacion.fechaCreacion}`, 15, 25);
        doc.text(`Cliente: ${cotizacion.cliente.nombre}`, 15, 30);
        doc.text(`Rfc: ${cotizacion.cliente.rfc}`, 15, 35);
        doc.text(
          `Agente: ${cotizacion.agente || "Ing. Roxana Luna Ramirez"}`,
          15,
          40
        );
      };

      // Dibujar header inicial
      drawHeader();

      // Texto introductorio
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");
      const introText =
        "Por medio de este conducto le saludo esperando que se encuentre muy bien, aprovecho " +
        "la ocasión para presentarle la siguiente cotización. Le reitero la mejor disposición de " +
        "colaborar eficazmente para encontrar soluciones viables a sus necesidades en materia de " +
        "seguridad, contando siempre con el profesionalismo de nuestro capital humano, la calidad " +
        "de nuestros servicios y el respaldo de nuestra experiencia.";

      doc.text(introText, 15, 50, { maxWidth: 180, align: "justify" });

      // Tabla de productos con manejo de múltiples páginas
      const tableColumns = [
        "Part.",
        "Descripción",
        "Unidad",
        "Cantidad",
        "P.U.",
        "Descuento",
        "Total",
      ];

      const tableRows = cotizacion.productos.map((prod, index) => [
        index + 1,
        prod.nombre,
        `${prod.unidadVenta.replace(/_/g, " ").toLowerCase()}`,
        prod.cantidad,
        `$${Number(prod.precio).toFixed(2)}`,
        `${prod.descuento}%`,
        `$${prod.importe.toFixed(2)}`,
      ]);

      // Configuración de la tabla con manejo de páginas
      doc.autoTable({
        startY: 70,
        head: [tableColumns],
        body: tableRows,
        theme: "grid",
        styles: {
          fontSize: 9,
          cellPadding: 4,
        },
        headStyles: {
          fillColor: [...colors.primary],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: "auto" },
          2: { cellWidth: 20 },
          3: { cellWidth: 25 },
          4: { cellWidth: 25 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 },
        },
        margin: { top: 70, bottom: 80 }, // Margen para el header y footer
        didDrawPage: function (data) {
          // Dibujar header en cada nueva página
          drawHeader();
          // Dibujar footer en cada página
          drawFooter(pageNumber);
          pageNumber++;
        },
      });

      // Totales después de la tabla
      const finalY = doc.lastAutoTable.finalY + 5;
      const spaceNeeded = 100; // Espacio aproximado necesario para totales y notas
      const pageHeight = doc.internal.pageSize.height;
      const footerHeight = 70;

      // Verificar si hay espacio suficiente en la página actual
      if (finalY + spaceNeeded > pageHeight - footerHeight) {
        doc.addPage();
        pageNumber++;
        drawHeader();
        drawFooter(pageNumber);
      }

      // Totales con diseño mejorado
      doc.setFillColor(245, 245, 245);
      const totalesY = doc.lastAutoTable.finalY + 5;
      doc.rect(132, totalesY, 65, 32, "F");
      doc.setFontSize(10);
      doc.setTextColor(...colors.primary);
      doc.setFont("helvetica", "bold");

      // Agregar totales
      const totales = [
        ["SubTotal:", `$${Number(cotizacion.subtotal).toFixed(2)}`],
        ["Descu. Adicional", `$${cotizacion.descuentoAdicional}`],
        ["SubTotal C/Descuento", `$${cotizacion.subtotalDescuento}`],
        ["IVA:", `$${cotizacion.iva.toFixed(2)}`],
        ["Total:", `$${cotizacion.total.toFixed(2)}`],
      ];

      let currentY = totalesY + 5;
      totales.forEach(([label, value]) => {
        doc.setTextColor(...colors.primary);
        doc.setFont("helvetica", "bold");
        doc.text(label, 135, currentY);
        doc.setTextColor(60, 60, 60);
        doc.setFont("helvetica", "normal");
        doc.text(value, 175, currentY);
        currentY += 6;
      });

      // Sección de notas
      const notasY = currentY + 10;
      doc.setFillColor(...colors.primary);
      doc.rect(10, notasY, 190, 6, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("Notas:", 15, notasY + 4);

      // Contenido de notas
      const notas = [
        "A. Cambio de precios sin previo aviso.",
        "B. Condiciones de pago: a convenir con el departamento de compras.",
        "C. Tiempo de entrega de 3 a 5 dias habiles.",
        "D. Se requiere orden de compra para autorizar la presente cotización.",
        "E. Vigencia de la presente cotización: 3 días naturales.",
        "F. Cuenta bancaria a nombre de Sures Ingeniería Asesoría Gestoría y Capacitación, S.A. de C.V.",
      ];

      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      let yPos = notasY + 10;
      notas.forEach((nota) => {
        doc.text(nota, 15, yPos);
        yPos += 6;
      });

      // Información bancaria
      doc.setFillColor(245, 245, 245);
      doc.rect(10, yPos, 190, 25, "F");
      yPos += 6;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...colors.primary);
      doc.text("Pago por transferencia", 15, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text("Inbursa", 15, yPos + 6);
      doc.text("Cuenta 50047898905", 15, yPos + 12);
      doc.text("Clabe int. 036855500478989058", 15, yPos + 18);

      // Despedida
      yPos += 30;
      doc.setFontSize(9);
      doc.text(
        "Sin más por el momento me despido de usted, esperando una respuesta favorable a la",
        45,
        yPos
      );
      doc.text(
        "presente cotización quedando a sus órdenes como su atento y seguro servidor.",
        50,
        yPos + 5
      );

      // Firma
      yPos += 15;
      doc.setDrawColor(...colors.primary);
      doc.setFont("helvetica", "bold");
      doc.text("Atentamente", 95, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(cotizacion.agente || "Roxana Luna Ramirez", 90, yPos + 5);

      // Dibujar el footer en la última página
      drawFooter(pageNumber);

      // Guardar PDF
      doc.save(`cotizacion_${cotizacion.cliente.nombre}_${cotizacion.id}.pdf`);
    };
  };

  return (
    <div>
      <h2 className="text-center">Listado de Cotizaciones</h2>
      <div>
        <div className="row">
          <div className="col-md-1 mb-2">
            <p className="mt-2 text-center fs-5">Buscar</p>
          </div>
          <div className="col-md-7">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
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
      <div>
        <Table size="sm" responsive striped bordered hover>
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
                <td>${cotizacion.subtotal}</td>
                <td>{cotizacion.descuentoAdicional}%</td>
                <td>${cotizacion.total}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleViewDetails(cotizacion)}
                    className="me-2"
                  >
                    <BsEye size={20} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-info"
                    onClick={() => handleEditCotizacion(cotizacion)}
                    className="me-2"
                  >
                    <BsPencil size={20} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDeleteCotizacion(cotizacion.id)}
                    className="me-2"
                  >
                    <BsTrash size={20} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={() => exportCotizacionToPDF(cotizacion)}
                  >
                    <BsFileEarmarkPdf size={20} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
