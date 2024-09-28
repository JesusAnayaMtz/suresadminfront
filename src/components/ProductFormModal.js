import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ProductoService from '../services/ProductoService';

const ProductFormModal = ({show, handleClose, productoId, refreshProducts }) => {
    const [productData, setProductData] = useState({
        claveInterna: '',
        descripcion: '',
        codigoBarras: '',
        claveSat: '',
        tipoIva: '',
        costo: '',
        precio: '',
        categoria: '',
        unidadVenta: '',
        existencia: '',
        existenciaMinima: '',
      });

      const [imageFile, setImageFile] = useState(null);
      const [isEditMode, setIsEditMode] = useState(false);

      useEffect(() => {
        if (productoId) {
          setIsEditMode(true);
          fetchProductData(productoId);
        } else {
          setIsEditMode(false);
          setProductData({
            claveInterna: '',
            descripcion: '',
            codigoBarras: '',
            claveSat: '',
            tipoIva: '',
            costo: '',
            precio: '',
            categoria: '',
            unidadVenta: '',
            existencia: '',
            existenciaMinima: '',
          });
          setImageFile(null);
        }
      }, [productoId]);

      const fetchProductData = async (id) => {
        try {
          const response = await ProductoService.getProductoById(id);
          setProductData(response.data);
        } catch (error) {
          console.error('Error fetching product data', error);
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
      };

      const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (isEditMode) {
            await ProductoService.updateProduct(productoId, productData);
          } else {
            const createdProduct = await ProductoService.crearProducto(productData);
            await ProductoService.uploadProductoImagen(createdProduct.data.id, imageFile);
          }
          handleClose();
          refreshProducts();
        } catch (error) {
          console.error('Error saving product', error);
        }
      };



return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={productData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="codigoBarras">
            <Form.Label>Código de Barras</Form.Label>
            <Form.Control
              type="text"
              name="codigoBarras"
              value={productData.codigoBarras}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="descripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={productData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="costo">
            <Form.Label>Costo</Form.Label>
            <Form.Control
              type="number"
              name="costo"
              value={productData.costo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={productData.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="existencia">
            <Form.Label>Existencia</Form.Label>
            <Form.Control
              type="number"
              name="existencia"
              value={productData.existencia}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="existenciaMinima">
            <Form.Label>Existencia Mínima</Form.Label>
            <Form.Control
              type="number"
              name="existenciaMinima"
              value={productData.existenciaMinima}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="unidadVenta">
            <Form.Label>Unidad</Form.Label>
            <Form.Control
              type="text"
              name="unidadVenta"
              value={productData.unidadVenta}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="imagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!isEditMode} // Required solo al crear
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditMode ? 'Actualizar' : 'Crear'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductFormModal;