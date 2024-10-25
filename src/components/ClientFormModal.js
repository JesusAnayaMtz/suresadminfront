import React, { useState, useEffect } from "react";
import { createClient, updateClient } from "../services/clienteService";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const ClientFormModal = ({ show, onHide, client, onClientSaved }) => {
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
    manejoCredito: false,
    limiteCredito: 0,
    diasCredito: 0,
  });

  useEffect(() => {
    if (client) {
      setFormData(client);
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
        manejoCredito: false,
        limiteCredito: 0,
        diasCredito: 0,
      });
    }
  }, [client]);

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
      if (client) {
        await updateClient(client.id, formData);
        Swal.fire({
          icon: "success",
          title: "Cliente Actualizado",
          text: "El cliente se ha actualizado correctamente",
        });
      } else {
        await createClient(formData);
        Swal.fire({
          icon: "success",
          title: "Cliente Creado",
          text: "El cliente se ha creado correctamente",
        });
      }
      onClientSaved();
      onHide();
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ya existe un cliente con el mismo RFC",
          confirmButtonText: "Aceptar",
        });
      } else {
        console.error("Error saving client", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>{client ? "Editar Cliente" : "Crear Cliente"}</Modal.Title>
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
                  <Form.Label>Regimen Fiscal</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    type="text"
                    name="regimenFiscal"
                    value={formData.regimenFiscal}
                    onChange={handleChange}
                    required
                  >
                    <option>Seleccione una opcion</option>
                    <option value="REGIMEN_SIMPLIFICADO_DE_CONFIANZA">
                      Regimen Simplificado De Confianza
                    </option>
                    <option value="GENERAL_LEY_PERSONAS_MORALES">
                      Generla Ley Personas Morales
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
                <Form.Group as={Col} sm={8} controlId="direccion" className="mt-3">
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
                <Form.Group as={Col} sm={3} controlId="codigoPostal" className="mt-3">
                  <Form.Label>Codigo Postal</Form.Label>
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
                    aria-label="Default select example"
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option>Seleccione una opcion</option>
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
                    <option value="CDMX">Cdmx</option>
                    <option value="DURANGO">Durango</option>
                    <option value="GUANAJUATO">Guanajuato</option>
                    <option value="GUERRERO">Guerrero</option>
                    <option value="HIDALGO">Hidalgo</option>
                    <option value="JALISCO">Jalisco</option>
                    <option value="MEXICO">Mexico</option>
                    <option value="MICHOACAN">Michoacan</option>
                    <option value="MORELOS">Morelos</option>
                    <option value="NAYARIT">Nayarit</option>
                    <option value="NUEVO_LEON">Nuevo Leon</option>
                    <option value="OAXACA">Oaxaca</option>
                    <option value="PUEBLA">Puebla</option>
                    <option value="QUERETARO">Queretaro</option>
                    <option value="QUINTANA_ROO">Quintana Roo</option>
                    <option value="SAN_LUIS_POTOSI">San Luis Potosi</option>
                    <option value="SINALOA">Sinaloa</option>
                    <option value="SONORA">Sonora</option>
                    <option value="TABASCO">Tabasco</option>
                    <option value="TAMAULIPAS">Tamaulipas</option>
                    <option value="TLAXCALA">Tlaxcala</option>
                    <option value="VERACRUZ">Veracruz</option>
                    <option value="YUCATAN">Yucatan</option>
                    <option value="ZACATECAS">Zacatecas</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>

          {/* Manejo de Crédito */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>Manejo de Crédito</Card.Header>
            <Card.Body>
              <Form.Group controlId="manejoCredito" className="mt-3">
                <Form.Check
                  type="checkbox"
                  name="manejoCredito"
                  checked={formData.manejoCredito}
                  onChange={handleChange}
                  label="Habilitar Manejo de Crédito"
                />
              </Form.Group>
              {formData.manejoCredito && (
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="limiteCredito"
                    className="mt-3"
                  >
                    <Form.Label>Límite de Crédito</Form.Label>
                    <Form.Control
                      type="number"
                      name="limiteCredito"
                      value={formData.limiteCredito}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="diasCredito" className="mt-3">
                    <Form.Label>Días de Crédito</Form.Label>
                    <Form.Control
                      type="number"
                      name="diasCredito"
                      value={formData.diasCredito}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
              )}
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mt-3">
              {client ? "Guardar Cambios" : "Crear Cliente"}
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

export default ClientFormModal;
