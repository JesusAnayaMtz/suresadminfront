import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const CotizacionDetailsModal = ({ show, onHide, cotizacion }) => {
  if (!cotizacion) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Cotización</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="fechaCreacion">
              <Form.Label>Fecha de Creación</Form.Label>
              <Form.Control
                type="text"
                value={cotizacion.fechaCreacion}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="fechaActualizacion">
              <Form.Label>Fecha de Actualización</Form.Label>
              <Form.Control
                type="text"
                value={cotizacion.fechaActualizacion}
                readOnly
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="cliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                value={cotizacion.cliente.nombre}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="rfc">
              <Form.Label>RFC</Form.Label>
              <Form.Control
                type="text"
                value={cotizacion.cliente.rfc}
                readOnly
              />
            </Form.Group>
          </Row>
          <h5>Productos</h5>
          {cotizacion.productos.map((producto, index) => (
            <Row className="mb-3" key={index}>
              <Form.Group as={Col} controlId={`producto-${index}`}>
                <Form.Label>Producto</Form.Label>
                <Form.Control type="text" value={producto.nombre} readOnly />
              </Form.Group>
              <Form.Group as={Col} controlId={`cantidad-${index}`}>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={producto.cantidad}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`precio-${index}`}>
                <Form.Label>Precio Unitario</Form.Label>
                <Form.Control type="number" value={producto.precio} readOnly />
              </Form.Group>
              <Form.Group as={Col} controlId={`descuento-${index}`}>
                <Form.Label>Descuento (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={producto.descuento}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`importe-${index}`}>
                <Form.Label>Importe</Form.Label>
                <Form.Control type="number" value={producto.importe} readOnly />
              </Form.Group>
            </Row>
          ))}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="subtotal">
              <Form.Label>Subtotal</Form.Label>
              <Form.Control
                type="number"
                value={cotizacion.subtotal}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="descuentoAdicional">
              <Form.Label>Descuento Adicional (%)</Form.Label>
              <Form.Control
                type="number"
                value={cotizacion.descuentoAdicional}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="total">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" value={cotizacion.total} readOnly />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CotizacionDetailsModal;
