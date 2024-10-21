import React from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { getProductImage } from "../services/ProductoService";


const ProductDetailsModal = ({ show, onHide, product }) => {
  if (!product) return null;

  const imageUrl = getProductImage(product.rutaImagen); // Ajustar el nombre de propiedad según el objeto del producto

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} sm={2} controlId="claveInterna">
              <Form.Label>Clave Interna</Form.Label>
              <Form.Control type="text" value={product.claveInterna} readOnly />
            </Form.Group>
            <Form.Group as={Col} controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" value={product.descripcion} readOnly />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="codigoBarras">
              <Form.Label>Código de Barras</Form.Label>
              <Form.Control type="text" value={product.codigoBarras} readOnly />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} sm={2} controlId="claveSat">
              <Form.Label>Clave Sat</Form.Label>
              <Form.Control type="text" value={product.claveSat} readOnly />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="tipoIva">
              <Form.Label>Tipo Iva</Form.Label>
              <Form.Control
                type="text"
                style={{ textTransform: "capitalize" }}
                value={product.tipoIva.replace(/_/g, " ").toLowerCase()}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" value={product.precio} readOnly />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                style={{ textTransform: "capitalize" }}
                value={product.categoria.replace(/_/g, " ").toLowerCase()}
                readOnly
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} sm={2} controlId="existencia">
              <Form.Label>Existencia</Form.Label>
              <Form.Control type="number" value={product.existencia} readOnly />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="existenciaMinima">
              <Form.Label>Existencia Mínima</Form.Label>
              <Form.Control
                type="number"
                value={product.existenciaMinima}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="unidadVenta">
              <Form.Label>Se vende por</Form.Label>
              <Form.Control
                type="text"
                style={{ textTransform: "capitalize" }}
                value={product.unidadVenta.replace(/_/g, " ").toLowerCase()}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="rutaImagen">
              <Image
                alt="rutaImagen"
                src={imageUrl}
                style={{ maxWidth: "50%", maxHeight: "100px" }}
              />
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

export default ProductDetailsModal;
