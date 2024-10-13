import React from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { getEmpleadoImage } from "../services/EmpleadoService";

const EmpleadoDetailsModal = ({ show, onHide, empleado }) => {

      if (!empleado) return null;

      const imageUrl = getEmpleadoImage(empleado.rutaImagen);

      return (
        <Modal show={show} onHide={onHide} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Detalles Del Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} sm={2} controlId="numeroEmpleado">
                  <Form.Label>Numero De Empleado</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.numeroEmpleado}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.nombre}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="apellido">
                  <Form.Label>Apellido Paterno</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.apellido}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="apellidoMaterno">
                  <Form.Label>Apellido Materno</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.apellidoMaterno}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="curp">
                  <Form.Label>Curp</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.curp}
                    readOnly
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={2} controlId="rfc">
                  <Form.Label>Rfc</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.rfc}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={4} controlId="direccion">
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.direccion}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="colonia">
                  <Form.Label>Colonia</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.colonia}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="ciudad">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.ciudad}
                    readOnly
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={3} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.email}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="telefono">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.telefono}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="celular">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.celular}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="fechaIniLaboral">
                  <Form.Label>Fecha Inicio Laboral</Form.Label>
                  <Form.Control
                    type="date"
                    value={empleado.fechaIniLaboral}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="nss">
                  <Form.Label>Numero De Seguro Social</Form.Label>
                  <Form.Control
                    type="number"
                    value={empleado.nss}
                    readOnly
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={3} controlId="departamento">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.departamento}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="puesto">
                  <Form.Label>Puesto</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.puesto}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="banco">
                  <Form.Label>Banco</Form.Label>
                  <Form.Control
                    type="text"
                    value={empleado.banco}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={3} controlId="cuentaBancaria">
                  <Form.Label>Cuenta Bancaria</Form.Label>
                  <Form.Control
                    type="number"
                    value={empleado.cuentaBancaria}
                    readOnly
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3"></Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={2} controlId="salarioBase">
                  <Form.Label>Salario Base</Form.Label>
                  <Form.Control
                    type="number"
                    value={empleado.salarioBase}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} sm={2} controlId="salarioIntegrado">
                  <Form.Label>Salario Integrado</Form.Label>
                  <Form.Control
                    type="number"
                    value={empleado.salarioIntegrado}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="rutaImagen">
                  <Image
                    alt="rutaImagen"
                    src={imageUrl}
                    style={{ maxWidth: "50%", maxHeight: "125px" }}
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

export default EmpleadoDetailsModal;
