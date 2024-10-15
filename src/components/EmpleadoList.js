import React, { useState, useEffect } from "react";
import { deleteEmpleado, getAllEmpleadosActivos } from "../services/EmpleadoService";
import EmpleadoFormModal from "./EmpleadoFormModal";
import EmpleadoDetailsModal from "./EmpleadoDetailsModal";
import SearchBar from "./SearchBar";
import { Button, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [viewingEmpleado, setViewingEmpleado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await getAllEmpleadosActivos();
      const sortedEmpleados = response.data.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      setEmpleados(sortedEmpleados);
    } catch (error) {
      console.error("Error fetching empleados", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estas Seguro?",
        text: "No podras revertir esta accion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await deleteEmpleado(id);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El Empleado ha sido eliminado correctamente",
          confirmButtonText: "Aceptar",
        });
        fetchEmpleados(); // Actualizar la lista después de eliminar
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al eliminar el empleado",
        confirmButtonText: "Aceptar",
      });
      console.error("Error deleting empleado", error);
    }
  };

  const handleEdit = (empleado) => {
    setEditingEmpleado(empleado);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingEmpleado(null);
    setShowModal(true);
  };

  const handleViewDetails = (empleado) => {
    setViewingEmpleado(empleado);
    setShowDetailsModal(true);
  };

  const filteredEmpleados = empleados
    .filter(
      (empleado) =>
        empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.rfc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.numeroEmpleado.includes(searchTerm) ||
        empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Función para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(empleados); // Convertir datos a hoja Excel
    const workbook = XLSX.utils.book_new(); // Crear un nuevo libro Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empleados"); // Agregar la hoja
    XLSX.writeFile(workbook, "empleados.xlsx"); // Descargar el archivo como "empleados.xlsx"
  };

  return (
    <div>
      <h2 className="text-center">Gestión de Empleados</h2>
      <div>
        <div className="row">
          <div className="col-md-1 mb-3">
            <p className="mt-2 text-center">Buscar</p>
          </div>
          <div className="col-md-7">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-md-4 text-end">
            <Button
              onClick={handleCreate}
              variant="primary"
              size="sm"
              className="me-2 mb-3"
            >
              Crear Empleado
            </Button>
            <Button
              onClick={exportToExcel}
              variant="success"
              size="sm"
              className="mb-3"
            >
              Exportar a Excel
            </Button>
          </div>
        </div>
      </div>
      <div>
      <Table size="sm" responsive striped bordered hover>
        <thead>
          <tr>
            <th>Numero Empleado</th>
            <th>Nombre completo</th>
            <th>Email</th>
            <th>Departamento</th>
            <th>Puesto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmpleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.numeroEmpleado}</td>
              <td>{`${empleado.nombre} ${empleado.apellido} ${empleado.apellidoMaterno}`}</td>
              <td>{empleado.email}</td>
              <td>{empleado.departamento}</td>
              <td>{empleado.puesto}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => handleViewDetails(empleado)}
                  className="me-2"
                >
                  <BsEye size={24}/>
                </Button>{" "}
                <Button
                  size="sm"
                  variant="outline-info"
                  onClick={() => handleEdit(empleado)}
                  className="me-2"
                >
                  <BsPencil size={24} />
                </Button>{" "}
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(empleado.id)}
                >
                  <BsTrash size={24} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      {showModal && (
        <EmpleadoFormModal
          show={showModal}
          onHide={() => setShowModal(false)}
          empleado={editingEmpleado}
          onEmpleadoSaved={fetchEmpleados}
        />
      )}

      {showDetailsModal && (
        <EmpleadoDetailsModal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          empleado={viewingEmpleado}
        />
      )}
    </div>
  );
};

export default EmpleadoList;