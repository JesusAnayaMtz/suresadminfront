import React, { useState, useEffect } from "react";
import { createCotizacion, updateCotizacion } from "../services/CotizacionService";
import { getAllClients } from "../services/clienteService";
import {getAllProductsActivos} from "../services/ProductoService"
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const CotizacionFormModal = ({ show, onHide, cotizacion, onCotizacionSaved }) => {
  const [formData, setFormData] = useState({
    clienteId: '',
    productos: [],
    descuento: 0,
    descuentoAdicional: 0,
    fechaCreacion: '',
    fechaActualizacion: '',
  });

  const [clients, setClients] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (cotizacion) {
      setFormData(cotizacion);
    } else {
      setFormData({
        clienteId: '',
        productos: [],
        descuento: 0,
        descuentoAdicional: 0,
        fechaCreacion: '',
        fechaActualizacion: '',
      });
    }

    // Fetch clients and products (replace these with your actual data-fetching logic)
    fetchClientes();
    fetchProductos();
  }, [cotizacion]);

  const fetchClientes = async () => {
    try {
      const response = await getAllClients();
      setClients(response.data); // Asegúrate de que response.data sea un array
    } catch (error) {
      console.error("Error fetching clients", error);
      setClients([]); // Asignar un array vacío si hay un error
    }
  };

  const fetchProductos = async () => {
    try {
          const response = await getAllProductsActivos();
          setProductos(response.data);
    } catch (error) {
      console.log("Error fetching productos", error);
      setProductos([]);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      const productToAdd = productos.find(p => p.id === selectedProduct);
      setFormData({
        ...formData,
        productos: [...formData.productos, { ...productToAdd, cantidad }]
      });
      setSelectedProduct(null);
      setCantidad(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cotizacion) {
        await updateCotizacion(cotizacion.id, formData);
        Swal.fire({
          icon: "success",
          title: "Cotización Actualizada",
          text: "La cotización se ha actualizado correctamente",
        });
      } else {
        await createCotizacion(formData);
        Swal.fire({
          icon: "success",
          title: "Cotización Creada",
          text: "La cotización se ha creado correctamente",
        });
      }
      onCotizacionSaved();
      onHide();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al guardar la cotización",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{cotizacion ? "Editar Cotización" : "Crear Cotización"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="clienteId" className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="clienteId"
              value={formData.clienteId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un cliente</option>
              {clients.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Row className="align-items-end mb-3">
            <Form.Group as={Col} controlId="producto" className="mb-3">
              <Form.Label>Producto</Form.Label>
              <Form.Select
                name="producto"
                value={selectedProduct || ''}
                onChange={handleProductChange}
              >
                <option value="">Seleccione un producto</option>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="cantidad" className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                min="1"
              />
            </Form.Group>

            <Col xs="auto">
              <Button variant="primary" onClick={handleAddProduct}>
                Añadir Producto
              </Button>
            </Col>
          </Row>

          <h5>Productos Seleccionados</h5>
          {formData.productos.map((producto, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
              <span>{producto.nombre} (Cantidad: {producto.cantidad})</span>
            </div>
          ))}

          <Row className="mb-3">
            <Form.Group as={Col} controlId="descuento" className="mt-3">
              <Form.Label>Descuento (%)</Form.Label>
              <Form.Control
                type="number"
                name="descuento"
                value={formData.descuento}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="descuentoAdicional" className="mt-3">
              <Form.Label>Descuento Adicional (%)</Form.Label>
              <Form.Control
                type="number"
                name="descuentoAdicional"
                value={formData.descuentoAdicional}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" className="mt-3">
            {cotizacion ? "Guardar Cambios" : "Crear Cotización"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CotizacionFormModal;
