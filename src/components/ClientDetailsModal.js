import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ClientDetailsModal = ({ show, onHide, client }) => {
  if (!client) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={client.nombre} readOnly />
          </Form.Group>
          <Form.Group controlId="rfc" className="mt-3">
            <Form.Label>RFC</Form.Label>
            <Form.Control type="text" value={client.rfc} readOnly />
          </Form.Group>
          <Form.Group controlId="manejoCredito" className="mt-3">
            <Form.Label>Manejo de Crédito</Form.Label>
            <Form.Control
              type="text"
              value={client.manejoCredito ? "Sí" : "No"}
              readOnly
            />
          </Form.Group>
          {client.manejoCredito && (
            <>
              <Form.Group controlId="limiteCredito" className="mt-3">
                <Form.Label>Límite de Crédito</Form.Label>
                <Form.Control
                  type="number"
                  value={client.limiteCredito}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="diasCredito" className="mt-3">
                <Form.Label>Días de Crédito</Form.Label>
                <Form.Control
                  type="number"
                  value={client.diasCredito}
                  readOnly
                />
              </Form.Group>
            </>
          )}
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
