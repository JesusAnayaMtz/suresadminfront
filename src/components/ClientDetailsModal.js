import React from "react";
import { Modal, Button, Form, Row ,Col } from "react-bootstrap";

const ClientDetailsModal = ({ show, onHide, client }) => {
  if (!client) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="tipoPersona">
            <Form.Label>Tipo Persona</Form.Label>
            <Form.Control type="text" style= {{textTransform: 'capitalize'}} value={client.tipoPersona.replace(/_/g , " ").toLowerCase()} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="nombre">
            <Form.Label>Nombre/Razon Social</Form.Label>
            <Form.Control type="text" value={client.nombre} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="rfc">
            <Form.Label>RFC</Form.Label>
            <Form.Control type="text" value={client.rfc} readOnly />
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="regimenFiscal" className="mt-3">
            <Form.Label>Regimen Fiscal</Form.Label>
            <Form.Control type="text" style= {{textTransform: 'capitalize'}} value={client.regimenFiscal.replace(/_/g , " ").toLowerCase()} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="codigoPostal" className="mt-3">
            <Form.Label>Codigo Postal</Form.Label>
            <Form.Control type="number" value={client.codigoPostal} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={client.email} readOnly />
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="emailAlterno" className="mt-3">
            <Form.Label>Email Alterno</Form.Label>
            <Form.Control type="email" value={client.emailAlterno} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="telefono" className="mt-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="number" value={client.telefono} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="telefonoAlterno" className="mt-3">
            <Form.Label>Telefono Alterno</Form.Label>
            <Form.Control type="email" value={client.telefonoAlterno} readOnly />
          </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="direccion" className="mt-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" value={client.direccion} readOnly />
          </Form.Group>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="colonia" className="mt-3">
            <Form.Label>Colonia</Form.Label>
            <Form.Control type="text" value={client.colonia} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="ciudad" className="mt-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control type="text" value={client.ciudad} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="estado" className="mt-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control type="text" style= {{textTransform: 'capitalize'}} value={client.estado.replace(/_/g , " ").toLowerCase()} readOnly />
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="manejoCredito" className="mt-3">
            <Form.Label>Manejo de Crédito</Form.Label>
            <Form.Control
              type="text"
              value={client.manejoCredito ? "Sí" : "No"}
              readOnly
            />
          </Form.Group>
          {client.manejoCredito && (
            <>
              <Form.Group as={Col} controlId="limiteCredito" className="mt-3">
                <Form.Label>Límite de Crédito</Form.Label>
                <Form.Control
                  type="number"
                  value={client.limiteCredito}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId="diasCredito" className="mt-3">
                <Form.Label>Días de Crédito</Form.Label>
                <Form.Control
                  type="number"
                  value={client.diasCredito}
                  readOnly
                />
              </Form.Group>
            </>
          )}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientDetailsModal;
