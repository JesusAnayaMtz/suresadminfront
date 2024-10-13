import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClientsPage from "./pages/ClientsPage";
import Sidebar from "./components/Sidebar";
import ProveedorPage from "./pages/ProveedorPage";
import ProductsPage from "./pages/ProductsPage";
import NavBar from "./components/NavBar";
import CotizacionesPage from "./pages/CotizacionesPage";
import EmpleadoPage from "./pages/EmpleadoPage";


const App = () => {
  return (
    <Router>
      <NavBar></NavBar>
      <div className="d-flex">
        <Sidebar />
        <main className="content flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/proveedores" element={<ProveedorPage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/cotizaciones" element={<CotizacionesPage />} />
            <Route path="/empleados" element={<EmpleadoPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
