import React, { useState } from "react";
import { Nav, Button, Offcanvas } from "react-bootstrap";


const Navbar = () => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Botón para abrir el Offcanvas */}
      <div className="mb-2">
      <Button variant="primary" onClick={handleShow} className="mb-3 lg">
        Menú
      </Button>
      </div>
      {/* Menú Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú Navegación</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/clientes">Clientes</Nav.Link>
            {/* Puedes agregar más enlaces o ítems de menú aquí */}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
