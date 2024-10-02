import React, { useState, useEffect } from "react";
import { getAllProductsActivos, deleteProduct, activateProduct } from "../services/ProductoService"; // Asegúrate de que las funciones de servicio estén correctamente importadas
import ProductFormModal from "./ProductFormModal"; // Asegúrate de que esta ruta sea correcta
import ProductDetailsModal from "./ProductDetailsModal"; // Asegúrate de que esta ruta sea correcta
import SearchBar from "./SearchBar";
import { Button, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProductsActivos();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
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
      if(result.isConfirmed){
        await deleteProduct(id);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El producto ha sido eliminado correctamente",
          confirmButtonText: "Aceptar",
        });
        fetchProducts(); // Actualizar la lista después de eliminar
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al eliminar el producto",
        confirmButtonText: "Aceptar",
      });
      console.error("Error deleting product", error);
    }
  };  

  const handleActivate = async (id) => {
    try {
      await activateProduct(id);
      fetchProducts(); // Actualizar la lista después de activar
    } catch (error) {
      console.error("Error activating product", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleViewDetails = (product) => {
    setViewingProduct(product);
    setShowDetailsModal(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.claveInterna.includes(searchTerm) ||
      product.codigoBarras.includes(searchTerm) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products); // Convertir datos a hoja Excel
    const workbook = XLSX.utils.book_new(); // Crear un nuevo libro Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos"); // Agregar la hoja
    XLSX.writeFile(workbook, "productos.xlsx"); // Descargar el archivo como "productos.xlsx"
  };

  return (
    <div>
      <h2 className="text-center">Gestión de Productos</h2>
      <div>
        <div className="row">
          <div className="col-md-1 mb-3">
            <p className="mt-2 text-center">Buscar</p>
          </div>
          <div className="col-md-7">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-md-4 text-end">
            <Button onClick={handleCreate} className="mb-3">
              Crear Producto
            </Button>
          </div>
        </div>
        <div className="col-md-12 text-end">
          <Button
            onClick={exportToExcel}
            variant="success"
            size="sm"
            className="mb-3 primary"
          >
            Exportar a Excel
          </Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Clave Interna</th>
            <th>Deescripcion</th>
            <th>Código de Barras</th>
            <th>Precio</th>
            <th>Existencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.claveInterna}</td>
              <td>{product.descripcion}</td>
              <td>{product.codigoBarras}</td>
              <td>{product.precio}</td>
              <td>{product.existencia}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(product)}
                  className="me-2"
                >
                  <BsEye size={24} color="black" />
                </Button>{" "}
                <Button
                  variant="warning"
                  onClick={() => handleEdit(product)}
                  className="me-2"
                >
                  <BsPencil size={24} />
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  <BsTrash size={24} color="black" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <ProductFormModal
          show={showModal}
          onHide={() => setShowModal(false)}
          product={editingProduct}
          onProductSaved={fetchProducts} // Actualiza la lista de productos después de guardar
        />
      )}

      {showDetailsModal && (
        <ProductDetailsModal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          product={viewingProduct}
        />
      )}
    </div>
  );
};

export default ProductList;