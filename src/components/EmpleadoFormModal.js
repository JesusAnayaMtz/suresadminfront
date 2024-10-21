import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { createEmpleado, updateEmpleado } from "../services/EmpleadoService";

const EmpleadoFormModal = ({ show, onHide, empleado, onEmpleadoSaved }) => {
  const [formData, setFormData] = useState({
    numeroEmpleado: 0,
    nombre: "",
    apellido: "",
    apellidoMaterno: "",
    rfc: "",
    curp: "",
    direccion: "",
    colonia: "",
    ciudad: "",
    email: "",
    telefono: "",
    celular: "",
    fechaIniLaboral: "",
    nss: "",
    departamento: "",
    puesto: "",
    banco: "",
    cuentaBancaria: 0,
    salarioBase: 0,
    salarioIntegrado: 0,
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (empleado) {
      setFormData(empleado);
    } else {
      setFormData({
        numeroEmpleado: 0,
        nombre: "",
        apellido: "",
        apellidoMaterno: "",
        rfc: "",
        curp: "",
        direccion: "",
        colonia: "",
        ciudad: "",
        email: "",
        telefono: "",
        celular: "",
        fechaIniLaboral: "",
        nss: "",
        departamento: "",
        puesto: "",
        banco: "",
        cuentaBancaria: 0,
        salarioBase: 0,
        salarioIntegrado: 0,
      });
      setImageFile(null);
    }
  }, [empleado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (empleado) {
        await updateEmpleado(empleado.id, formData, imageFile);
        Swal.fire({
          icon: "success",
          title: "Empleado Actualizado",
          text: "El empleado se ha actualizado correctamente",
        });
      } else {
        await createEmpleado(formData, imageFile);
        Swal.fire({
          icon: "success",
          title: "Empleado Creado",
          text: "El empleado se ha creado correctamente",
        });
      }
      onEmpleadoSaved();
      onHide();
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
          confirmButtonText: "Aceptar",
        });
      } else {
        console.error("Error saving product", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          {empleado ? "Editar Empleaado" : "Crear Empleado"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} sm={2} controlId="numeroEmpleado">
              <Form.Label>Numero De Empleado</Form.Label>
              <Form.Control
                type="text"
                name="numeroEmpleado"
                value={formData.numeroEmpleado}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="apellido">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="apellidoMaterno">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="curp">
              <Form.Label>Curp</Form.Label>
              <Form.Control
                type="text"
                name="curp"
                value={formData.curp}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} sm={2} controlId="rfc">
              <Form.Label>Rfc</Form.Label>
              <Form.Control
                type="text"
                name="rfc"
                value={formData.rfc}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={4} controlId="direccion">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="colonia">
              <Form.Label>Colonia</Form.Label>
              <Form.Control
                type="text"
                name="colonia"
                value={formData.colonia}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="ciudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} sm={3} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="telefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="celular">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="fechaIniLaboral">
              <Form.Label>Fecha Inicio Laboral</Form.Label>
              <Form.Control
                type="date"
                name="fechaIniLaboral"
                value={formData.fechaIniLaboral}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="nss">
              <Form.Label>Numero De Seguro Social</Form.Label>
              <Form.Control
                type="text"
                name="nss"
                value={formData.nss}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} sm={3} controlId="departamento">
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                type="text"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="puesto">
              <Form.Label>Puesto</Form.Label>
              <Form.Control
                type="text"
                name="puesto"
                value={formData.puesto}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="banco">
              <Form.Label>Banco</Form.Label>
              <Form.Control
                type="text"
                name="banco"
                value={formData.banco}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="cuentaBancaria">
              <Form.Label>Cuenta Bancaria</Form.Label>
              <Form.Control
                type="text"
                name="cuentaBancaria"
                value={formData.cuentaBancaria}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3"></Row>
          <Row className="mb-3">
            <Form.Group as={Col} sm={2} controlId="salarioBase">
              <Form.Label>Salario Base</Form.Label>
              <Form.Control
                type="text"
                name="salarioBase"
                value={formData.salarioBase}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="salarioIntegrado">
              <Form.Label>Salario Integrado</Form.Label>
              <Form.Control
                type="text"
                name="salarioIntegrado"
                value={formData.salarioIntegrado}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="imagen">
              <Form.Label>Imagen del Empleado</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            {empleado ? "Guardar Cambios" : "Crear Empleado"}
          </Button>
          <Button variant="danger mx-3" onClick={onHide}>
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmpleadoFormModal;
