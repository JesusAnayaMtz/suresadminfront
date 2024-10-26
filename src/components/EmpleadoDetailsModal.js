import React from "react";
import { Modal, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { getEmpleadoImage } from "../services/EmpleadoService";

const EmpleadoDetailsModal = ({ show, onHide, empleado }) => {
  if (!empleado) return null;

  const imageUrl = getEmpleadoImage(empleado.rutaImagen);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header
        closeButton
        className="p-3 bg-secondary bg-opacity-10 rounded"
      >
        <div>
          <Modal.Title className="h4 mb-1">Detalles del Empleado</Modal.Title>
          <small className="text-muted">
            Número de Empleado: {empleado.numeroEmpleado}
          </small>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Row>
          {/* Columna de imagen */}
          <Col md={3} className="mb-4 mb-md-0">
            <Card className="border-0 shadow-sm">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "250px" }}
              >
                <img
                  src={imageUrl}
                  alt={`${empleado.nombre} ${empleado.apellido}`}
                  className="img-fluid"
                  style={{
                    maxHeight: "200px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Card>
          </Col>

          {/* Columna de información */}
          <Col md={9}>
            {/* Información personal */}
            <div className="mb-4">
              <h3 className="h4 mb-3">
                {empleado.nombre} {empleado.apellido} {empleado.apellidoMaterno}
              </h3>
              <div className="mb-2">
                <Badge bg="primary" className="me-2">
                  {empleado.departamento}
                </Badge>
                <Badge bg="secondary">{empleado.puesto}</Badge>
              </div>
            </div>

            <hr className="my-4" />

            {/* Información laboral */}
            <Row className="mb-4 g-3">
              <Col sm={6}>
                <div className="p-3 bg-secondary bg-opacity-10 rounded">
                  <small className="text-muted d-block mb-1">
                    Salario Base
                  </small>
                  <h4 className="text-success mb-0">
                    {formatCurrency(empleado.salarioBase)}
                  </h4>
                </div>
              </Col>
              <Col sm={6}>
                <div className="p-3 bg-secondary bg-opacity-10 rounded">
                  <small className="text-muted d-block mb-1">
                    Fecha Inicio Laboral
                  </small>
                  <h5 className="mb-0">
                    {formatDate(empleado.fechaIniLaboral)}
                  </h5>
                </div>
              </Col>
            </Row>

            {/* Información personal y contacto */}
            <Card className="border-0 bg-secondary bg-opacity-10 mb-4">
              <Card.Body>
                <h5 className="mb-3">Información Personal</h5>
                <Row className="g-3">
                  <Col sm={4}>
                    <small className="text-muted d-block">CURP</small>
                    <span>{empleado.curp.toUpperCase()}</span>
                  </Col>
                  <Col sm={4}>
                    <small className="text-muted d-block">RFC</small>
                    <span>{empleado.rfc.toUpperCase()}</span>
                  </Col>
                  <Col sm={4}>
                    <small className="text-muted d-block">NSS</small>
                    <span>{empleado.nss}</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Contacto */}
            <Card className="border-0 bg-secondary bg-opacity-10 mb-4">
              <Card.Body>
                <h5 className="mb-3">Contacto</h5>
                <Row className="g-3">
                  <Col sm={4}>
                    <small className="text-muted d-block">Email</small>
                    <span>{empleado.email}</span>
                  </Col>
                  <Col sm={4}>
                    <small className="text-muted d-block">Teléfono</small>
                    <span>{empleado.telefono}</span>
                  </Col>
                  <Col sm={4}>
                    <small className="text-muted d-block">Celular</small>
                    <span>{empleado.celular}</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Dirección */}
            <Card className="border-0 bg-secondary bg-opacity-10 mb-4">
              <Card.Body>
                <h5 className="mb-3">Dirección</h5>
                <Row className="g-3">
                  <Col sm={6}>
                    <small className="text-muted d-block">Calle</small>
                    <span>{empleado.direccion}</span>
                  </Col>
                  <Col sm={3}>
                    <small className="text-muted d-block">Colonia</small>
                    <span>{empleado.colonia}</span>
                  </Col>
                  <Col sm={3}>
                    <small className="text-muted d-block">Ciudad</small>
                    <span>{empleado.ciudad}</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Información bancaria */}
            <Card className="border-0 bg-secondary bg-opacity-10">
              <Card.Body>
                <h5 className="mb-3">Información Bancaria</h5>
                <Row className="g-3">
                  <Col sm={6}>
                    <small className="text-muted d-block">Banco</small>
                    <span>{empleado.banco}</span>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted d-block">
                      Cuenta Bancaria
                    </small>
                    <span>{empleado.cuentaBancaria}</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button variant="outline-secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmpleadoDetailsModal;
