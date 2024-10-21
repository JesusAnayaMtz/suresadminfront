import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/ProductoService"; // Importar servicios para crear y actualizar productos
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const ProductFormModal = ({ show, onHide, product, onProductSaved }) => {
  const [formData, setFormData] = useState({
    claveInterna: "",
    descripcion: "",
    codigoBarras: "",
    claveSat: "",
    tipoIva: "",
    precio: 0,
    categoria: "",
    existencia: 0,
    existenciaMinima: 0,
    unidadVenta: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        claveInterna: "",
        descripcion: "",
        codigoBarras: "",
        claveSat: "",
        tipoIva: "",
        precio: 0,
        categoria: "",
        existencia: 0,
        existenciaMinima: 0,
        unidadVenta: "",
      });
      setImageFile(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (product) {
      await updateProduct(product.id, formData, imageFile);
      Swal.fire({
        icon: "success",
        title: "Producto Actualizado",
        text: "El producto se ha actualizado correctamente",
      });
    } else {
      await createProduct(formData, imageFile);
      Swal.fire({
        icon: "success",
        title: "Producto Creado",
        text: "El producto se ha creado correctamente",
      });
    }
    onProductSaved();
    onHide();
  } catch (error) {
    if(error.response && error.response.data) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message,
      confirmButtonText: "Aceptar",
    });
  } else {
    console.error("Error saving product", error);
  }
}
};


  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Editar Producto" : "Crear Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} sm={2} controlId="claveInterna">
              <Form.Label>Clave Interna</Form.Label>
              <Form.Control
                type="text"
                name="claveInterna"
                value={formData.claveInterna}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="descripcion">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="codigoBarras">
              <Form.Label>Código de Barras</Form.Label>
              <Form.Control
                type="text"
                name="codigoBarras"
                value={formData.codigoBarras}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} sm={2} controlId="claveSat">
              <Form.Label>Clave Sat</Form.Label>
              <Form.Control
                type="text"
                name="claveSat"
                value={formData.claveSat}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="tipoIva">
              <Form.Label>Tipo Iva</Form.Label>
              <Form.Select
                aria-label="Default select example"
                type="text"
                name="tipoIva"
                value={formData.tipoIva}
                onChange={handleChange}
                required
              >
                <option>Seleccione un opcion</option>
                <option value="GRAVADO">Gravado</option>
                <option value="EXENTO">exento</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="categoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                aria-label="Default select example"
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option>Seleccione una opcion</option>
                <option value="EXTINTORES">Extintores</option>
                <option value="SENALIZACION">Señalizacion</option>
                <option value="EQUIPO_DE_PROTECCION">
                  Equipo De Proteccion
                </option>
                <option value="INSUMOS">Insumos</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} sm={2} controlId="existencia">
              <Form.Label>Existencia</Form.Label>
              <Form.Control
                type="text"
                name="existencia"
                value={formData.existencia}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="existenciaMinima">
              <Form.Label>Existencia Minima</Form.Label>
              <Form.Control
                type="text"
                name="existenciaMinima"
                value={formData.existenciaMinima}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="unidadVenta">
              <Form.Label>Se Vende Por:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                type="text"
                name="unidadVenta"
                value={formData.unidadVenta}
                onChange={handleChange}
                required
              >
                <option>Seleccione una opcion</option>
                <option value="CAJA">Caja</option>
                <option value="PIEZA">Pieza</option>
                <option value="PAQUETE">Paquete</option>
                <option value="PAR">Par</option>
                <option value="NO_APLICA">No Aplica</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="imagen">
              <Form.Label>Imagen del Producto</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            {product ? "Guardar Cambios" : "Crear Producto"}
          </Button>
          <Button variant="danger mx-3" onClick={onHide}>
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductFormModal;