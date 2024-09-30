import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/ProductoService"; // Importar servicios para crear y actualizar productos
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ProductFormModal = ({ show, onHide, product, onProductSaved }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    codigoBarras: '',
    precio: 0,
    existencia: 0,
    descripcion: '',
    categoria: ''
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        nombre: '',
        codigoBarras: '',
        precio: 0,
        existencia: 0,
        descripcion: '',
        categoria: ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      onProductSaved();
      onHide();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product ? "Editar Producto" : "Crear Producto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="nombre">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="codigoDeBarras">
              <Form.Label>Código de Barras</Form.Label>
              <Form.Control
                type="text"
                name="codigoDeBarras"
                value={formData.codigoDeBarras}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="existencia">
              <Form.Label>Existencia</Form.Label>
              <Form.Control
                type="number"
                name="existencia"
                value={formData.existencia}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            {product ? "Guardar Cambios" : "Crear Producto"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductFormModal;