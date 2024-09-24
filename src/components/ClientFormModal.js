import React, { useState, useEffect } from "react";
import { createClient, updateClient } from "../services/clienteService";
import { Modal, Button, Form } from "react-bootstrap";

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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{client ? "Editar Cliente" : "Crear Cliente"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="rfc" className="mt-3">
            <Form.Label>RFC</Form.Label>
            <Form.Control
              type="text"
              name="rfc"
              value={formData.rfc}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="manejoCredito" className="mt-3">
            <Form.Check
              type="checkbox"
              name="manejoCredito"
              checked={formData.manejoCredito}
              onChange={handleChange}
              label="Manejo de Crédito"
            />
          </Form.Group>
          {formData.manejoCredito && (
            <>
              <Form.Group controlId="limiteCredito" className="mt-3">
                <Form.Label>Límite de Crédito</Form.Label>
                <Form.Control
                  type="number"
                  name="limiteCredito"
                  value={formData.limiteCredito}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="diasCredito" className="mt-3">
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
          <Button variant="primary" type="submit" className="mt-3">
            {client ? "Guardar Cambios" : "Crear Cliente"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ClientFormModal;
