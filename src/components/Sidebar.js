import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { BsHouse, BsPeople, BsInfoCircle, BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs"; // Cambia a react-icons/bs para íconos de Bootstrap
import "./Sidebar.css"; // Archivo CSS para los estilos

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="btn toggle-btn" onClick={toggleSidebar}> Menu
          {isCollapsed ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}{" "}
        </button>
      </div>

      <Nav className="flex-column">
        <Nav.Link href="/" className="sidebar-item">
          <BsHouse className="icon" />
          {!isCollapsed && <span>Inicio</span>}
        </Nav.Link>

        <Nav.Link href="/clientes" className="sidebar-item">
          <BsPeople className="icon" />
          {!isCollapsed && <span>Clientes</span>}
        </Nav.Link>
        
      </Nav>
    </div>
  );
};

export default Sidebar;
