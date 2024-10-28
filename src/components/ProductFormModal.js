import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../services/ProductoService";
import { Modal, Button, Form, Row, Col, Spinner, Card } from "react-bootstrap";
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
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
      if (product.imagen) {
        setImagePreview(product.imagen);
      }
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
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
    setImagePreview(null);
    setErrors({});
    setTouched({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "claveInterna":
        if (!value) error = "La clave interna es requerida";
        break;
      case "descripcion":
        if (!value) error = "La descripción es requerida";
        break;
      case "precio":
        if (!value || parseFloat(value) <= 0)
          error = "El precio debe ser mayor a 0";
        break;
      // Añade más validaciones según necesites
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        await updateProduct(product.id, formData, imageFile);
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Producto actualizado correctamente",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } else {
        await createProduct(formData, imageFile);
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Producto creado correctamente",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
      onProductSaved();
      onHide();
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error al guardar el producto",
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          {product ? (
            <i className="fas fa-edit me-2"></i>
          ) : (
            <i className="fas fa-plus-circle me-2"></i>
          )}
          {product ? "Editar Producto" : "Crear Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Form onSubmit={handleSubmit} noValidate>
          <div className="p-3">
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h6 className="mb-0">Información Básica</h6>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={4} controlId="claveInterna">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-key me-2"></i>Clave Interna
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="claveInterna"
                      value={formData.claveInterna}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.claveInterna && errors.claveInterna}
                      className="shadow-sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.claveInterna}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm={8} controlId="descripcion">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-file-alt me-2"></i>Descripción
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.descripcion && errors.descripcion}
                      className="shadow-sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.descripcion}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={4} controlId="codigoBarras">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-barcode me-2"></i>Código de Barras
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="codigoBarras"
                      value={formData.codigoBarras}
                      onChange={handleChange}
                      className="shadow-sm"
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm={4} controlId="claveSat">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-key me-2"></i>Clave Sat
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="claveSat"
                      value={formData.claveSat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.claveSat && errors.claveSat}
                      className="shadow-sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.claveSat}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h6 className="mb-0">Detalles de Venta</h6>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={3} controlId="precio">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-dollar-sign me-2"></i>Precio
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.precio && errors.precio}
                      className="shadow-sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.precio}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm={3} controlId="tipoIva">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-percentage me-2"></i>Tipo IVA
                    </Form.Label>
                    <Form.Select
                      name="tipoIva"
                      value={formData.tipoIva}
                      onChange={handleChange}
                      className="shadow-sm"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="GRAVADO">Gravado</option>
                      <option value="EXENTO">Exento</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} sm={3} controlId="categoria">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-tags me-2"></i>Categoría
                    </Form.Label>
                    <Form.Select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="shadow-sm"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="EXTINTORES">Extintores</option>
                      <option value="SENALIZACION">Señalización</option>
                      <option value="EQUIPO_DE_PROTECCION">
                        Equipo de Protección
                      </option>
                      <option value="INSUMOS">Insumos</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} sm={3} controlId="unidadVenta">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-box me-2"></i>Unidad de Venta
                    </Form.Label>
                    <Form.Select
                      name="unidadVenta"
                      value={formData.unidadVenta}
                      onChange={handleChange}
                      className="shadow-sm"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="CAJA">Caja</option>
                      <option value="PIEZA">Pieza</option>
                      <option value="PAQUETE">Paquete</option>
                      <option value="PAR">Par</option>
                      <option value="NO_APLICA">No Aplica</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h6 className="mb-0">Inventario e Imagen</h6>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={3} controlId="existencia">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-boxes me-2"></i>Existencia
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="existencia"
                      value={formData.existencia}
                      onChange={handleChange}
                      className="shadow-sm"
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm={3} controlId="existenciaMinima">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      Existencia Mínima
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="existenciaMinima"
                      value={formData.existenciaMinima}
                      onChange={handleChange}
                      className="shadow-sm"
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm={6} controlId="imagen">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-image me-2"></i>Imagen del Producto
                    </Form.Label>
                    <div className="d-flex align-items-center gap-3">
                      {imagePreview && (
                        <div className="position-relative">
                          <img
                            src={imagePreview}
                            alt="Vista previa"
                            className="rounded"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 rounded-circle"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </div>
                      )}
                      <div className="flex-grow-1">
                        <Form.Control
                          type="file"
                          onChange={handleImageChange}
                          accept="image/*"
                          className="shadow-sm"
                        />
                      </div>
                    </div>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
          </div>

          <div className="d-flex justify-content-end gap-2 p-3 bg-white border-top">
            <Button
              variant="secondary"
              onClick={onHide}
              disabled={loading}
              className="px-4"
            >
              <i className="fas fa-times me-2"></i>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="px-4"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Guardando...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i>
                  {product ? "Guardar Cambios" : "Crear Producto"}
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductFormModal;
