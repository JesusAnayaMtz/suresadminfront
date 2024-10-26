import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { getAllClients } from "../services/clienteService";
import { getAllProductsActivos } from "../services/ProductoService";
import {
  createCotizacion,
  updateCotizacion,
} from "../services/CotizacionService";
import Swal from "sweetalert2";

const CotizacionFormModal = ({ show, onHide, onSave, initialData }) => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [descuentoAdicional, setDescuentoAdicional] = useState(0);
  const [isModified, setIsModified] = useState(false);

  const fetchClientes = async () => {
    try {
      const response = await getAllClients();
      setClientes(
        response.data.map((client) => ({
          value: client.id,
          label: client.nombre,
        }))
      );
    } catch (error) {
      console.error("Error fetching clientes", error);
      Swal.fire("Error", "Hubo un error al cargar los clientes", "error");
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await getAllProductsActivos();
      setProductos(
        response.data.map((product) => ({
          value: product.id,
          label: `${product.claveInterna} - ${product.descripcion}`,
        }))
      );
    } catch (error) {
      console.error("Error fetching productos", error);
      Swal.fire("Error", "Hubo un error al cargar los productos", "error");
    }
  };

  useEffect(() => {
    fetchClientes();
    fetchProductos();
    if (initialData) {
      setSelectedCliente(initialData.cliente?.id || null);
      setSelectedProductos(
        initialData.productos
          ? initialData.productos.map((p) => ({ ...p }))
          : []
      );
      setDescuentoAdicional(initialData.descuentoAdicional || 0);
    }
  }, [initialData]);

  const checkIfModified = useCallback(() => {
    if (!initialData) return true;
    const productosChanged = selectedProductos.some(
      (p, index) =>
        p.productoId !== initialData.productos?.[index]?.productoId ||
        p.cantidad !== initialData.productos?.[index]?.cantidad ||
        p.descuento !== initialData.productos?.[index]?.descuento
    );
    return (
      selectedCliente !== initialData.cliente?.id ||
      productosChanged ||
      descuentoAdicional !== initialData.descuentoAdicional
    );
  }, [initialData, selectedCliente, selectedProductos, descuentoAdicional]);

  useEffect(() => {
    setIsModified(checkIfModified());
  }, [checkIfModified]);

  const handleProductoChange = (index, field, value) => {
    const updatedProductos = [...selectedProductos];
    updatedProductos[index] = { ...updatedProductos[index], [field]: value };

    const existingProductIndex = updatedProductos.findIndex(
      (p) => p.productoId === value
    );
    if (existingProductIndex !== -1 && existingProductIndex !== index) {
      updatedProductos[existingProductIndex].cantidad +=
        updatedProductos[index].cantidad;
      updatedProductos.splice(index, 1);
    }

    setSelectedProductos(updatedProductos);
  };

  const handleAddProducto = () => {
    setSelectedProductos([
      ...selectedProductos,
      { productoId: "", cantidad: 1, descuento: 0 },
    ]);
  };

  const handleRemoveProducto = (index) => {
    const updatedProductos = [...selectedProductos];
    updatedProductos.splice(index, 1);
    setSelectedProductos(updatedProductos);
  };

  const handleClienteChange = (selectedOption) => {
    setSelectedCliente(selectedOption ? selectedOption.value : null);
  };

  const calcularTotales = () => {
    let subtotal = 0;
    selectedProductos.forEach((producto) => {
      const { cantidad, descuento } = producto;
      const precioProducto =
        productos.find((p) => p.value === producto.productoId)?.precio || 0;
      const precioConDescuento = precioProducto * (1 - descuento / 100);
      subtotal += precioConDescuento * cantidad;
    });
    const total = subtotal - subtotal * (descuentoAdicional / 100);
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
        await updateCotizacion(initialData.id, payload);
        Swal.fire({
          icon: "success",
          title: "Cotización actualizada",
          text: "La cotización ha sido actualizada con éxito",
          confirmButtonText: "Aceptar",
        });
      } else {
        await createCotizacion(payload);
        Swal.fire({
          icon: "success",
          title: "Cotización creada",
          text: "La cotización ha sido creada con éxito",
          confirmButtonText: "Aceptar",
        });
      }
      onSave();
      onHide();
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
        <Modal.Title>
          {initialData ? "Editar Cotización" : "Crear Cotización"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Cliente Selector */}
          <Form.Group as={Row} controlId="cliente" className="mb-3">
            <Form.Label column sm={3}>
              Cliente
            </Form.Label>
            <Col sm={9}>
              <Select
                options={clientes}
                value={clientes.find((c) => c.value === selectedCliente)}
                onChange={handleClienteChange}
                placeholder="Buscar cliente..."
                isClearable
              />
            </Col>
          </Form.Group>

          {/* Productos */}
          <h5>Productos</h5>
          {selectedProductos.map((producto, index) => (
            <Row key={index} className="mb-3 border p-2 rounded">
              <Form.Group as={Col} controlId={`producto-${index}`}>
                <Form.Label>Producto</Form.Label>
                <Select
                  options={productos}
                  value={productos.find((p) => p.value === producto.productoId)}
                  onChange={(e) =>
                    handleProductoChange(
                      index,
                      "productoId",
                      e ? e.value : null
                    )
                  }
                  placeholder="Buscar producto..."
                  isClearable
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`cantidad-${index}`}>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={producto.cantidad || ""}
                  onChange={(e) =>
                    handleProductoChange(index, "cantidad", e.target.value)
                  }
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`descuento-${index}`}>
                <Form.Label>Descuento (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={producto.descuento || ""}
                  onChange={(e) =>
                    handleProductoChange(index, "descuento", e.target.value)
                  }
                />
              </Form.Group>
              <Col sm={2} className="d-flex align-items-center">
                <Button
                  variant="danger"
                  onClick={() => handleRemoveProducto(index)}
                >
                  Eliminar
                </Button>
              </Col>
            </Row>
          ))}
          <Button
            variant="secondary"
            onClick={handleAddProducto}
            className="mb-3"
          >
            Agregar Producto
          </Button>

          {/* Descuento Adicional */}
          <Form.Group as={Row} controlId="descuentoAdicional" className="mb-3">
            <Form.Label column sm={3}>
              Descuento Adicional (%)
            </Form.Label>
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
        <Button variant="danger" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!isModified}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CotizacionFormModal;
