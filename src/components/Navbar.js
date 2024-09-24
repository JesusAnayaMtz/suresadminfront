import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <div
      className="d-flex flex-column vh-100 bg-light p-3"
      style={{ width: "250px" }}
    >
      <h2 className="text-center">Menu</h2>
      <Nav className="flex-colum">
        <Nav.Link as={Link} to="/">
          Inicio
        </Nav.Link>
        <Nav.Link as={Link} to="/clientes">
          Clientes
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Navbar;
