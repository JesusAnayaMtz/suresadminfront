import React from "react";
import { Modal, Button, Form, Row, Col, Card, Badge } from "react-bootstrap";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const CotizacionDetailsModal = ({ show, onHide, cotizacion }) => {
  if (!cotizacion) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" className="cotizacion-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="fas fa-file-invoice me-2"></i>
          Detalles de la Cotización
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Card className="mb-4 shadow-sm">
          <Card.Header className="bg-white">
            <h6 className="mb-0">Información General</h6>
          </Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}>
                <div className="info-group">
                  <small className="text-muted">Fecha de Creación</small>
                  <p className="mb-0 fw-bold">
                    {format(new Date(cotizacion.fechaCreacion), "PPP", {
                      locale: es,
                    })}
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-group">
                  <small className="text-muted">Última Actualización</small>
                  <p className="mb-0 fw-bold">
                    {cotizacion.fechaActualizacion
                      ? format(new Date(cotizacion.fechaActualizacion), "PPP", {
                          locale: es,
                        })
                      : "Sin actualización"}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="info-group">
                  <small className="text-muted">Cliente</small>
                  <p className="mb-0 fw-bold">{cotizacion.cliente.nombre}</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-group">
                  <small className="text-muted">RFC</small>
                  <p className="mb-0 fw-bold">{cotizacion.cliente.rfc}</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Productos</h6>
            <Badge bg="primary" pill>
              {cotizacion.productos.length} productos
            </Badge>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Precio Unit.</th>
                    <th className="text-center">Descuento</th>
                    <th className="text-end">Importe</th>
                  </tr>
                </thead>
                <tbody>
                  {cotizacion.productos.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.nombre}</td>
                      <td className="text-center">{producto.cantidad}</td>
                      <td className="text-end">
                        {formatCurrency(producto.precio)}
                      </td>
                      <td className="text-center">
                        {producto.descuento > 0 && (
                          <Badge bg="success">{producto.descuento}%</Badge>
                        )}
                      </td>
                      <td className="text-end">
                        {formatCurrency(producto.importe)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        <Card className="shadow-sm">
          <Card.Header className="bg-white">
            <h6 className="mb-0">Resumen</h6>
          </Card.Header>
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <div className="d-flex justify-content-end">
                  <div className="summary-items">
                    <div className="summary-item">
                      <small className="text-muted">Subtotal</small>
                      <h6 className="mb-0">
                        {formatCurrency(cotizacion.subtotal)}
                      </h6>
                    </div>
                    {cotizacion.descuentoAdicional > 0 && (
                      <>
                        <div className="summary-item">
                          <small className="text-muted">
                            Descuento Adicional
                          </small>
                          <h6 className="mb-0 text-success">
                            -{cotizacion.descuentoAdicional}%
                          </h6>
                        </div>
                        <div className="summary-item">
                          <small className="text-muted">
                            Subtotal con Descuento
                          </small>
                          <h6 className="mb-0">
                            {formatCurrency(cotizacion.subtotalDescuento)}
                          </h6>
                        </div>
                      </>
                    )}
                    <div className="summary-item">
                      <small className="text-muted">IVA</small>
                      <h6 className="mb-0">{formatCurrency(cotizacion.iva)}</h6>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} className="text-end">
                <div className="total-amount">
                  <small className="text-muted">Total</small>
                  <h3 className="mb-0 text-primary">
                    {formatCurrency(cotizacion.total)}
                  </h3>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>

      <style jsx>{`
        .cotizacion-modal .modal-body {
          padding: 1.5rem;
        }

        .info-group {
          padding: 0.5rem 0;
        }

        .summary-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: right;
        }

        .summary-item h6 {
          margin-top: 0.25rem;
        }

        .total-amount {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 0.5rem;
        }

        .table th {
          font-weight: 500;
        }

        .modal-header {
          border-bottom: 0;
        }

        .modal-footer {
          border-top: 0;
          background: #f8f9fa;
        }
      `}</style>
    </Modal>
  );
};

export default CotizacionDetailsModal;
