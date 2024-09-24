import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ClientsPage from "./pages/ClientsPage";
import '../src/App.css'


const App = () => {
  return (
    <Router>
      <div className="d-flex vh-100">
        <aside className="offcanvas-menu">
        <Navbar />
        </aside>
        <main className="content flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
