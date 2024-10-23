import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./ClientDetailsModal.css"; // Asumiendo que usarás un archivo CSS externo

const ClientDetailsModal = ({ show, onHide, client }) => {
  if (!client) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <Form>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="tipoPersona">
              <Form.Label className="form-label-custom">
                Tipo Persona
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control-custom"
                style={{ textTransform: "capitalize" }}
                value={client.tipoPersona.replace(/_/g, " ").toLowerCase()}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="nombre">
              <Form.Label className="form-label-custom">
                Nombre/Razón Social
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control-custom"
                value={client.nombre}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="rfc">
              <Form.Label className="form-label-custom">RFC</Form.Label>
              <Form.Control
                type="text"
                className="form-control-custom"
                value={client.rfc}
                readOnly
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="regimenFiscal">
              <Form.Label className="form-label-custom">
                Régimen Fiscal
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control-custom"
                style={{ textTransform: "capitalize" }}
                value={client.regimenFiscal.replace(/_/g, " ").toLowerCase()}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="codigoPostal">
              <Form.Label className="form-label-custom">
                Código Postal
              </Form.Label>
              <Form.Control
                type="number"
                className="form-control-custom"
                value={client.codigoPostal}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="email">
              <Form.Label className="form-label-custom">Email</Form.Label>
              <Form.Control
                type="email"
                className="form-control-custom"
                value={client.email}
                readOnly
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="telefono">
              <Form.Label className="form-label-custom">Teléfono</Form.Label>
              <Form.Control
                type="number"
                className="form-control-custom"
                value={client.telefono}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="direccion">
              <Form.Label className="form-label-custom">Dirección</Form.Label>
              <Form.Control
                type="text"
                className="form-control-custom"
                value={client.direccion}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="colonia">
              <Form.Label className="form-label-custom">Colonia</Form.Label>
              <Form.Control
                type="text"
                className="form-control-custom"
                value={client.colonia}
                readOnly
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="estado">
              <Form.Label className="form-label-custom">Estado</Form.Label>
              <Form.Control
                type="text"
                className="form-control-custom"
                style={{ textTransform: "capitalize" }}
                value={client.estado.replace(/_/g, " ").toLowerCase()}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="ciudad">
              <Form.Label className="form-label-custom">Ciudad</Form.Label>
              <Form.Control
                type="text"
                className="form-control-custom"
                value={client.ciudad}
                readOnly
              />
            </Form.Group>
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
