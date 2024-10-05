import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { BsHouse, BsPeople, BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { SlSocialDropbox } from "react-icons/sl";
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuItemClick = (name) => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const MenuItem = ({ title, icon, items, name }) => (
    <div className="menu-item">
      <div className="sidebar-item" onClick={() => handleMenuItemClick(name)}>
        {icon}
        {!isCollapsed && <span>{title}</span>}
      </div>
      {!isCollapsed && openSubmenu === name && (
        <div className="submenu-items">
          {items.map((item, index) => (
            <Nav.Link key={index} href={item.href} className="submenu-item">
              {item.title}
            </Nav.Link>
          ))}
        </div>
      )}
    </div>
  );

  const menuItems = [
    {
      name: "clientes",
      title: "Clientes",
      icon: <BsPeople className="icon" />,
      items: [
        { href: "/clientes", title: "Lista de Clientes" },
        { href: "/clientes/nuevo", title: "Nuevo Cliente" },
        { href: "/clientes/reportes", title: "Reportes" },
      ]
    },
    {
      name: "proveedores",
      title: "Proveedores",
      icon: <BsPeople className="icon" />,
      items: [
        { href: "/proveedores", title: "Lista de Proveedores" },
        { href: "/proveedores/nuevo", title: "Nuevo Proveedor" },
        { href: "/proveedores/pedidos", title: "Pedidos" },
      ]
    },
    {
      name: "productos",
      title: "Productos",
      icon: <SlSocialDropbox className="icon" />,
      items: [
        { href: "/productos", title: "Catálogo" },
        { href: "/productos/nuevo", title: "Nuevo Producto" },
        { href: "/productos/inventario", title: "Inventario" },
      ]
    }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="btn toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}
          {" "}
        </button>
      </div>
      <Nav className="flex-column">
        <Nav.Link href="/" className="sidebar-item home-link">
          <BsHouse className="icon" color="black" />
          {!isCollapsed && <span>Inicio</span>}
        </Nav.Link>
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            title={item.title}
            icon={item.icon}
            name={item.name}
            items={item.items}
          />
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;