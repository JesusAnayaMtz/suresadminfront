import React, { useState, useEffect } from "react";
import { createProveedor, updateProveedor } from "../services/proveedorService";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import Swal from "sweetalert2";

const ProveedorFormModal = ({ show, onHide, proveedor, onProveedorSaved }) => {
  const [formData, setFormData] = useState({
    tipoPersona: "",
    nombre: "",
    rfc: "",
    regimenFiscal: "",
    codigoPostal: "",
    email: "",
    emailAlterno: "",
    telefono: "",
    telefonoAlterno: "",
    direccion: "",
    colonia: "",
    ciudad: "",
    estado: "",
  });

  useEffect(() => {
    if (proveedor) {
      setFormData(proveedor);
    } else {
      setFormData({
        tipoPersona: "",
        nombre: "",
        rfc: "",
        regimenFiscal: "",
        codigoPostal: "",
        email: "",
        emailAlterno: "",
        telefono: "",
        telefonoAlterno: "",
        direccion: "",
        colonia: "",
        ciudad: "",
        estado: "",
      });
    }
  }, [proveedor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (proveedor) {
        await updateProveedor(proveedor.id, formData);
        Swal.fire({
          icon: "success",
          title: "Proveedor Actualizado",
          text: "El proveedor se actualizó correctamente",
        });
      } else {
        await createProveedor(formData);
        Swal.fire({
          icon: "success",
          title: "Proveedor Creado",
          text: "El proveedor se ha creado correctamente",
        });
      }
      onProveedorSaved();
      onHide();
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ya existe un proveedor con ese RFC",
          confirmButtonText: "Aceptar",
        });
      } else {
        console.error("Error saving proveedor", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>
          {proveedor ? "Editar Proveedor" : "Crear Proveedor"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          {/* Información General */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>Información General</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  sm={4}
                  controlId="tipoPersona"
                  className="mt-3"
                >
                  <Form.Label>Tipo Persona</Form.Label>
                  <Form.Select
                    name="tipoPersona"
                    value={formData.tipoPersona}
                    onChange={handleChange}
                    required
                  >
                    <option>Seleccione una opción</option>
                    <option value="PERSONA_FISICA">Persona Física</option>
                    <option value="PERSONA_MORAL">Persona Moral</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} sm={8} controlId="nombre" className="mt-3">
                  <Form.Label>
                    <FaUser /> Nombre/Razón Social
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={3} controlId="rfc" className="mt-3">
                  <Form.Label>RFC</Form.Label>
                  <Form.Control
                    type="text"
                    name="rfc"
                    value={formData.rfc}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="regimenFiscal" className="mt-3">
                  <Form.Label>Régimen Fiscal</Form.Label>
                  <Form.Select
                    name="regimenFiscal"
                    value={formData.regimenFiscal}
                    onChange={handleChange}
                    required
                  >
                    <option>Seleccione una opción</option>
                    <option value="REGIMEN_SIMPLIFICADO_DE_CONFIANZA">
                      Régimen Simplificado De Confianza
                    </option>
                    <option value="GENERAL_LEY_PERSONAS_MORALES">
                      General Ley Personas Morales
                    </option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>

          {/* Información de Contacto */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>Información de Contacto</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="email" className="mt-3">
                  <Form.Label>
                    <FaEnvelope /> Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="telefono" className="mt-3">
                  <Form.Label>
                    <FaPhone /> Teléfono
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="emailAlterno" className="mt-3">
                  <Form.Label>Email Alterno</Form.Label>
                  <Form.Control
                    type="email"
                    name="emailAlterno"
                    value={formData.emailAlterno}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="telefonoAlterno"
                  className="mt-3"
                >
                  <Form.Label>Teléfono Alterno</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefonoAlterno"
                    value={formData.telefonoAlterno}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>

          {/* Dirección */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>Dirección</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  sm={8}
                  controlId="direccion"
                  className="mt-3"
                >
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="colonia" className="mt-3">
                  <Form.Label>Colonia</Form.Label>
                  <Form.Control
                    type="text"
                    name="colonia"
                    value={formData.colonia}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} sm={4} controlId="ciudad" className="mt-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  sm={3}
                  controlId="codigoPostal"
                  className="mt-3"
                >
                  <Form.Label>Código Postal</Form.Label>
                  <Form.Control
                    type="text"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="estado" className="mt-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option>Seleccione una opción</option>
                    <option value="AGUASCALIENTES">Aguascalientes</option>
                    <option value="BAJA_CALIFORNIA">Baja California</option>
                    <option value="BAJA_CALIFORNIA_SUR">
                      Baja California Sur
                    </option>
                    <option value="CAMPECHE">Campeche</option>
                    <option value="CHIAPAS">Chiapas</option>
                    <option value="CHIHUAHUA">Chihuahua</option>
                    <option value="COAHUILA">Coahuila</option>
                    <option value="COLIMA">Colima</option>
                    <option value="CDMX">CDMX</option>
                    <option value="DURANGO">Durango</option>
                    <option value="GUANAJUATO">Guanajuato</option>
                    <option value="GUERRERO">Guerrero</option>
                    <option value="HIDALGO">Hidalgo</option>
                    <option value="JALISCO">Jalisco</option>
                    <option value="MEXICO">México</option>
                    <option value="MICHOACAN">Michoacán</option>
                    <option value="MORELOS">Morelos</option>
                    <option value="NAYARIT">Nayarit</option>
                    <option value="NUEVO_LEON">Nuevo León</option>
                    <option value="OAXACA">Oaxaca</option>
                    <option value="PUEBLA">Puebla</option>
                    <option value="QUERETARO">Querétaro</option>
                    <option value="QUINTANA_ROO">Quintana Roo</option>
                    <option value="SAN_LUIS_POTOSI">San Luis Potosí</option>
                    <option value="SINALOA">Sinaloa</option>
                    <option value="SONORA">Sonora</option>
                    <option value="TABASCO">Tabasco</option>
                    <option value="TAMAULIPAS">Tamaulipas</option>
                    <option value="TLAXCALA">Tlaxcala</option>
                    <option value="VERACRUZ">Veracruz</option>
                    <option value="YUCATAN">Yucatán</option>
                    <option value="ZACATECAS">Zacatecas</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mt-3">
              {proveedor ? "Guardar Cambios" : "Crear Proveedor"}
            </Button>
            <Button variant="secondary" className="mx-3 mt-3" onClick={onHide}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProveedorFormModal;
