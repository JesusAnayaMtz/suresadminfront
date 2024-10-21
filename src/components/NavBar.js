import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { getAllProductsActivos } from "../services/ProductoService";
import { Bell } from "lucide-react";


const NavBar = () => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img src="./logosures.png" style={{width:"170px"}} className="navbar-brand" href="#">
        </img>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Aquí puedes agregar más items del menú */}
          </ul>

          <div className="notification-dropdown position-relative">
            <button
              className="btn btn-link position-relative"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <Bell className="text-dark" />
              {notifications.length > 0 && (
                <span className="position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications.length}
                </span>
              )}
            </button>

            {isDropdownOpen && (
              <div
                className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow-lg"
                style={{ minWidth: "300px", zIndex: 1000 }}
              >
                {notifications.length === 0 ? (
                  <div className="px-4 py-2 text-muted">
                    No hay notificaciones
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 border-bottom hover-bg-light"
                    >
                      <strong>{notification.type}:</strong>{" "}
                      {notification.message}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
