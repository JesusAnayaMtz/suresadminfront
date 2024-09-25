import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClientsPage from "./pages/ClientsPage";
import Sidebar from "./components/Sidebar";
import ProveedorPage from "./pages/ProveedorPage";


const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <main className="content flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/proveedores" element={<ProveedorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
