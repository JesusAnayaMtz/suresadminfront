import React from "react";
import { Modal, Button, Form, Row ,Col } from "react-bootstrap";

const ProveedorDetailsModal = ({ show, onHide, proveedor }) => {
  if (!proveedor) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="tipoPersona">
            <Form.Label>Tipo Persona</Form.Label>
            <Form.Control type="text" style= {{textTransform: 'capitalize'}} value={proveedor.tipoPersona.replace(/_/g , " ").toLowerCase()} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="nombre">
            <Form.Label>Nombre/Razon Social</Form.Label>
            <Form.Control type="text" value={proveedor.nombre} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="rfc">
            <Form.Label>RFC</Form.Label>
            <Form.Control type="text" value={proveedor.rfc} readOnly />
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="regimenFiscal" className="mt-3">
            <Form.Label>Regimen Fiscal</Form.Label>
            <Form.Control type="text" style= {{textTransform: 'capitalize'}} value={proveedor.regimenFiscal.replace(/_/g , " ").toLowerCase()} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="codigoPostal" className="mt-3">
            <Form.Label>Codigo Postal</Form.Label>
            <Form.Control type="number" value={proveedor.codigoPostal} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={proveedor.email} readOnly />
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="emailAlterno" className="mt-3">
            <Form.Label>Email Alterno</Form.Label>
            <Form.Control type="email" value={proveedor.emailAlterno} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="telefono" className="mt-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="number" value={proveedor.telefono} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="telefonoAlterno" className="mt-3">
            <Form.Label>Telefono Alterno</Form.Label>
            <Form.Control type="email" value={proveedor.telefonoAlterno} readOnly />
          </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="direccion" className="mt-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" value={proveedor.direccion} readOnly />
          </Form.Group>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="colonia" className="mt-3">
            <Form.Label>Colonia</Form.Label>
            <Form.Control type="text" value={proveedor.colonia} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="ciudad" className="mt-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control type="text" value={proveedor.ciudad} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="estado" className="mt-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control type="text" style= {{textTransform: 'capitalize'}} value={proveedor.estado.replace(/_/g , " ").toLowerCase()} readOnly />
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

export default ProveedorDetailsModal;
