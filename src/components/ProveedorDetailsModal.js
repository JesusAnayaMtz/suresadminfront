import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { EnvelopeFill, TelephoneFill, GeoAltFill } from "react-bootstrap-icons";

const ProveedorDetailsModal = ({ show, onHide, proveedor }) => {
  if (!proveedor) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton style={{ backgroundColor: "#0f5eb4" }}>
        <Modal.Title style={{ fontWeight: "bold", color: "white" }}>
          Detalles del Proveedor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f1f3f5" }}>
        <Form>
          {/* Sección de Información Básica */}
          <h5 className="mb-4" style={{ color: "#5a5a5a", fontWeight: "bold" }}>
            Información Básica
          </h5>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="tipoPersona">
              <Form.Label>Tipo Persona</Form.Label>
              <Form.Control
                type="text"
                style={{
                  textTransform: "capitalize",
                  color: "#495057",
                  fontWeight: "500",
                }}
                value={proveedor.tipoPersona.replace(/_/g, " ").toLowerCase()}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="nombre">
              <Form.Label>Nombre/Razon Social</Form.Label>
              <Form.Control
                type="text"
                value={proveedor.nombre}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="rfc">
              <Form.Label>RFC</Form.Label>
              <Form.Control
                type="text"
                value={proveedor.rfc}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
          </Row>

          {/* Sección de Contacto */}
          <h5
            className="mb-3 mt-4"
            style={{ color: "#5a5a5a", fontWeight: "bold" }}
          >
            Información de Contacto
          </h5>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="email" className="mt-2">
              <Form.Label>
                <EnvelopeFill style={{ marginRight: "8px" }} />
                Email
              </Form.Label>
              <Form.Control
                type="email"
                value={proveedor.email}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="emailAlterno" className="mt-2">
              <Form.Label>
                <EnvelopeFill style={{ marginRight: "8px" }} />
                Email Alterno
              </Form.Label>
              <Form.Control
                type="email"
                value={proveedor.emailAlterno}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="telefono" className="mt-3">
              <Form.Label>
                <TelephoneFill style={{ marginRight: "8px" }} />
                Teléfono
              </Form.Label>
              <Form.Control
                type="text"
                value={proveedor.telefono}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="telefonoAlterno" className="mt-3">
              <Form.Label>
                <TelephoneFill style={{ marginRight: "8px" }} />
                Teléfono Alterno
              </Form.Label>
              <Form.Control
                type="text"
                value={proveedor.telefonoAlterno}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
          </Row>

          {/* Sección de Ubicación */}
          <h5
            className="mb-3 mt-4"
            style={{ color: "#5a5a5a", fontWeight: "bold" }}
          >
            Ubicación
          </h5>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="direccion" className="mt-2">
              <Form.Label>
                <GeoAltFill style={{ marginRight: "8px" }} />
                Dirección
              </Form.Label>
              <Form.Control
                type="text"
                value={proveedor.direccion}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="colonia" className="mt-2">
              <Form.Label>Colonia</Form.Label>
              <Form.Control
                type="text"
                value={proveedor.colonia}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="ciudad" className="mt-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                value={proveedor.ciudad}
                readOnly
                style={{ color: "#495057", fontWeight: "500" }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="estado" className="mt-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                style={{
                  textTransform: "capitalize",
                  color: "#495057",
                  fontWeight: "500",
                }}
                value={proveedor.estado.replace(/_/g, " ").toLowerCase()}
                readOnly
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProveedorDetailsModal;
