import React from "react";
import { Modal, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { getProductImage } from "../services/ProductoService";

const ProductDetailsModal = ({ show, onHide, product }) => {
  if (!product) return null;

  const imageUrl = getProductImage(product.rutaImagen);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header
        closeButton
        className="p-3 bg-secondary bg-opacity-10 rounded"
      >
        <div>
          <Modal.Title className="h4 mb-1">Detalles del Producto</Modal.Title>
          <small className="text-muted">ID: {product.claveInterna}</small>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Row>
          {/* Columna de imagen */}
          <Col md={4} className="mb-4 mb-md-0">
            <Card className="border-0 shadow-sm">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "250px" }}
              >
                <img
                  src={imageUrl}
                  alt={product.descripcion}
                  className="img-fluid"
                  style={{
                    maxHeight: "200px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Card>
          </Col>

          {/* Columna de información */}
          <Col md={8}>
            {/* Encabezado del producto */}
            <div className="mb-4">
              <h3 className="h4 mb-3">{product.descripcion}</h3>
              <div className="mb-2">
                <Badge bg="secondary" className="me-2 text-capitalize">
                  {product.categoria.replace(/_/g, " ").toLowerCase()}
                </Badge>
                <Badge bg="info">{product.codigoBarras}</Badge>
              </div>
            </div>

            <hr className="my-4" />

            {/* Precio y existencias */}
            <Row className="mb-4 g-3">
              <Col sm={6}>
                <div className="p-3 bg-secondary bg-opacity-10 rounded">
                  <small className="text-muted d-block mb-1">Precio</small>
                  <h4 className="text-success mb-0">
                    {formatCurrency(product.precio)}
                  </h4>
                </div>
              </Col>
              <Col sm={6}>
                <div className="p-3 bg-secondary bg-opacity-10 rounded">
                  <small className="text-muted d-block mb-1">Existencias</small>
                  <h4 className="mb-0">
                    {product.existencia}
                    <small className="text-muted ms-2 text-capitalize">
                      {product.unidadVenta.replace(/_/g, " ").toLowerCase()}
                    </small>
                  </h4>
                </div>
              </Col>
            </Row>

            {/* Alerta de existencia mínima */}
            {product.existencia <= product.existenciaMinima && (
              <div
                className="alert alert-warning d-flex align-items-center mb-4"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>
                  Stock bajo - Existencia mínima: {product.existenciaMinima}
                </div>
              </div>
            )}

            {/* Información adicional */}
            <Card className="border-0 bg-secondary bg-opacity-10">
              <Card.Body>
                <Row className="g-3">
                  <Col sm={4}>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">
                        Clave SAT
                      </small>
                      <span>{product.claveSat}</span>
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">
                        Tipo IVA
                      </small>
                      <span className="text-capitalize">
                        {product.tipoIva.replace(/_/g, " ").toLowerCase()}
                      </span>
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">
                        Se Vende Por
                      </small>
                      <span className="text-capitalize">
                        {product.unidadVenta.replace(/_/g, " ").toLowerCase()}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button variant="outline-secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
