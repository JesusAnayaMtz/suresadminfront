import React, { useState, useEffect } from "react";
import { createClient, updateClient } from "../services/clienteService";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ClientFormModal = ({ show, onHide, client, onClientSaved }) => {
  const [formData, setFormData] = useState({
    tipoPersona: '',
    nombre: '',
    rfc: '',
    regimenFiscal: '',
    codigoPostal: '',
    email: '',
    emailAlterno: '',
    telefono: '',
    telefonoAlterno: '',
    direccion: '',
    colonia: '',
    ciudad: '',
    estado: '',
    manejoCredito: false,
    limiteCredito: 0,
    diasCredito: 0
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
      } else {
        await createClient(formData);
      }
      onClientSaved();
      onHide();
    } catch (error) {
      console.error("Error saving client", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{client ? "Editar Cliente" : "Crear Cliente"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
        <Form.Group as={Col} controlId="tipoPersona" className="mt-3">
            <Form.Label>Tipo Persona</Form.Label>
            <Form.Select aria-label="Default select example"
            type="text"
            name="tipoPersona"
            value={formData.tipoPersona}
            onChange={handleChange}
            required>
              <option>Seleccione una opcion</option>
              <option value="PERSONA_FISICA">Persona Fisica</option>
              <option value="PERSONA_MORAL">Persona Moral</option>
              </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="nombre" className="mt-3">
            <Form.Label>Nombre/Razon Social</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="rfc" className="mt-3">
            <Form.Label>RFC</Form.Label>
            <Form.Control
              type="text"
              name="rfc"
              value={formData.rfc}
              onChange={handleChange}
              required
            />
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="regimenFiscal" className="mt-3">
            <Form.Label>Tipo Persona</Form.Label>
            <Form.Select aria-label="Default select example"
            type="text"
            name="regimenFiscal"
            value={formData.regimenFiscal}
            onChange={handleChange}
            required>
              <option>Seleccione una opcion</option>
              <option value="REGIMEN_SIMPLIFICADO_DE_CONFIANZA">Regimen Simplificado De Confianza</option>
              <option value="GENERAL_LEY_PERSONAS_MORALES">Generla Ley Personas Morales</option>
              </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="codigoPostal" className="mt-3">
            <Form.Label>Codigo Postal</Form.Label>
            <Form.Control
              type="text"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="telefono" className="mt-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="telefonoAlterno" className="mt-3">
            <Form.Label>Telefono Alterno</Form.Label>
            <Form.Control
              type="text"
              name="telefonoAlterno"
              value={formData.telefonoAlterno}
              onChange={handleChange}
              required
            />
          </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="direccion" className="mt-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row className="mb-3">
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
          <Form.Group as={Col} controlId="ciudad" className="mt-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="estado" className="mt-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select aria-label="Default select example"
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required>
              <option>Seleccione una opcion</option>
              <option value="AGUASCALIENTES">Aguascalientes</option>
              <option value="BAJA_CALIFORNIA">Baja California</option>
              <option value="NUEVO_LEON">Nuevo Leon</option>
              <option value="CDMX">CDMX</option>
              </Form.Select>
          </Form.Group>
          </Row>
          <Form.Group controlId="manejoCredito" className="mt-3">
            <Form.Check
              type="checkbox"
              name="manejoCredito"
              checked={formData.manejoCredito}
              onChange={handleChange}
              label="Manejo de Crédito"
            />
          </Form.Group>
          <Row className="mb-3">
          {formData.manejoCredito && (
            <>
              <Form.Group as={Col} controlId="limiteCredito" className="mt-3">
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
            </>
            
          )}
          </Row>
          <Button variant="primary" type="submit" className="mt-3">
            {client ? "Guardar Cambios" : "Crear Cliente"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ClientFormModal;
