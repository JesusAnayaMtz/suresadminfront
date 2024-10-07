import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { getAllClients } from "../services/clienteService";
import { getAllProductsActivos } from "../services/ProductoService";
import { createCotizacion, updateCotizacion } from "../services/CotizacionService";
import Swal from "sweetalert2";

const CotizacionFormModal = ({ show, onHide, onSave, initialData }) => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [descuentoAdicional, setDescuentoAdicional] = useState(0);

  useEffect(() => {
    fetchClientes();
    fetchProductos();
    if (initialData) {
      setSelectedCliente(initialData.cliente?.id || null);
      setSelectedProductos(initialData.productos.map(p => ({ ...p }))); // Clonar productos
      setDescuentoAdicional(initialData.descuentoAdicional || 0);
    }
  }, [initialData]);

  const fetchClientes = async () => {
    try {
      const response = await getAllClients();
      setClientes(response.data);
    } catch (error) {
      console.error("Error fetching clientes", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al cargar los clientes",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await getAllProductsActivos();
      setProductos(response.data);
    } catch (error) {
      console.error("Error fetching productos", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al cargar los productos",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleProductoChange = (index, field, value) => {
    const updatedProductos = [...selectedProductos];
    updatedProductos[index] = {
      ...updatedProductos[index],
      [field]: value,
    };

    // Si se cambia el producto a uno que ya existe, aumentar la cantidad
    const existingProductIndex = updatedProductos.findIndex((p) => p.productoId === value);
    if (existingProductIndex !== -1 && existingProductIndex !== index) {
      updatedProductos[existingProductIndex].cantidad += updatedProductos[index].cantidad; // Sumar cantidades
      updatedProductos.splice(index, 1); // Eliminar el producto actual
    }
    
    setSelectedProductos(updatedProductos);
  };

  const handleAddProducto = () => {
    setSelectedProductos([...selectedProductos, { productoId: "", cantidad: 1, descuento: 0 }]);
  };

  const handleRemoveProducto = (index) => {
    const updatedProductos = [...selectedProductos];
    updatedProductos.splice(index, 1);
    setSelectedProductos(updatedProductos);
  };

  const calcularTotales = () => {
    let subtotal = 0;
    selectedProductos.forEach((producto) => {
      const { cantidad, descuento } = producto;
      const precioProducto = productos.find(p => p.id === producto.productoId)?.precio || 0; // Asumiendo que tienes un campo precio
      const precioConDescuento = precioProducto * (1 - descuento / 100);
      subtotal += precioConDescuento * cantidad;
    });
    const total = subtotal - (subtotal * (descuentoAdicional / 100));
    return { subtotal, total };
  };

  const handleSave = async () => {
    const { subtotal, total } = calcularTotales();

    const payload = {
      cliente: {
        id: selectedCliente,
      },
      productos: selectedProductos.map((producto) => ({
        productoId: parseInt(producto.productoId),
        cantidad: parseInt(producto.cantidad),
        descuento: parseFloat(producto.descuento),
      })),
      descuentoAdicional: parseFloat(descuentoAdicional),
      subtotal,
      total,
    };

    try {
      if (initialData && initialData.id) {
        // Actualizar cotización existente
        await updateCotizacion(initialData.id, payload);
        Swal.fire({
          icon: "success",
          title: "Cotización actualizada",
          text: "La cotización ha sido actualizada con éxito",
          confirmButtonText: "Aceptar",
        });
      } else {
        // Crear una nueva cotización
        await createCotizacion(payload);
        Swal.fire({
          icon: "success",
          title: "Cotización creada",
          text: "La cotización ha sido creada con éxito",
          confirmButtonText: "Aceptar",
        });
      }
      onSave(); // Llama a la función onSave pasada como prop
      onHide(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "Hubo un error al guardar la cotización",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Editar Cotización" : "Crear Cotización"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="cliente" className="mb-3">
            <Form.Label column sm={3}>Cliente</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                value={selectedCliente || ""}
                onChange={(e) => setSelectedCliente(e.target.value)}
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <h5>Productos</h5>
          {selectedProductos.map((producto, index) => (
            <Row key={index} className="mb-3">
              <Form.Group as={Col} controlId={`producto-${index}`}>
                <Form.Label>Producto</Form.Label>
                <Form.Control
                  as="select"
                  value={producto.productoId || ""}
                  onChange={(e) => handleProductoChange(index, "productoId", e.target.value)}
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>{producto.descripcion}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId={`cantidad-${index}`}>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={producto.cantidad || ""}
                  onChange={(e) => handleProductoChange(index, "cantidad", e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`descuento-${index}`}>
                <Form.Label>Descuento (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={producto.descuento || ""}
                  onChange={(e) => handleProductoChange(index, "descuento", e.target.value)}
                />
              </Form.Group>
              <Col sm={2} className="d-flex align-items-end">
                <Button variant="danger" onClick={() => handleRemoveProducto(index)}>
                  Eliminar
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddProducto} className="mb-3">
            Agregar Producto
          </Button>
          <Form.Group as={Row} controlId="descuentoAdicional" className="mb-3">
            <Form.Label column sm={3}>Descuento Adicional (%)</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                value={descuentoAdicional || ""}
                onChange={(e) => setDescuentoAdicional(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CotizacionFormModal;
