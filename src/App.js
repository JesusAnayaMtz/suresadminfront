import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ClientsPage from "./pages/ClientsPage";

const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Navbar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
