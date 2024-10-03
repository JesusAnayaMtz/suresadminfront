import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { getAllProductsActivos } from "../services/ProductoService";


const NavBar = () => {
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    // Cargar notificaciones de productos con existencia mínima
    const fetchProductNotifications = async () => {
      try {
        const response = await getAllProductsActivos();
         const productNotifications = response.data
          .filter((product) => product.existencia <= product.existenciaMinima)
          .map((product) => ({
            type: "Producto",
            message: `${product.descripcion} está en su existencia mínima.`,
          }));
        setNotifications(() => [...productNotifications]);
      } catch (error) {
        console.error("Error fetching product notifications", error);
      }
    };

        

    // Cargar notificaciones de clientes con límite de crédito alcanzado
    /* const fetchClientNotifications = async () => {
      try {
        const clients = await getClients();
        const clientNotifications = clients
          .filter(
            (client) =>
              client.manejoCredito &&
              client.creditoUtilizado >= client.limiteCredito
          )
          .map((client) => ({
            type: "Cliente",
            message: `El cliente ${client.nombre} está llegando a su límite de crédito.`,
          }));
        setNotifications((prev) => [...prev, ...clientNotifications]);
      } catch (error) {
        console.error("Error fetching client notifications", error);
      }
    }; */

    fetchProductNotifications();
    //fetchClientNotifications();
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Sistema de Notificaciones</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown
            title={
              <>
                Notificaciones
                {notifications.length > 0 && (
                  <Badge bg="danger" className="ml-2">
                    {notifications.length}
                  </Badge>
                )}
              </>
            }
            id="notification-dropdown"
          >
            {notifications.length === 0 ? (
              <NavDropdown.Item>No hay notificaciones</NavDropdown.Item>
            ) : (
              notifications.map((notification, index) => (
                <NavDropdown.Item key={index}>
                  {notification.type}: {notification.message}
                </NavDropdown.Item>
              ))
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
