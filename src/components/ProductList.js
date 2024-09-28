import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import ProductoService from '../services/ProductoService';
import ProductFormModal from './ProductFormModal';
import * as XLSX from 'xlsx';
import SearchBar from './SearchBar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const refreshProducts = async () => {
    try {
      const response = await ProductoService.getAllProductos();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleCreate = () => {
    setSelectedProductId(null);
    setShowFormModal(true);
  };

  const handleEdit = (id) => {
    setSelectedProductId(id);
    setShowFormModal(true);
  };

  const handleDetails = (id) => {
    // Lógica para mostrar detalles en otro modal si es necesario
    console.log('Detalles del producto', id);
  };

  const handleDelete = async (id) => {
    try {
      await ProductoService.deleteProduct(id);
      refreshProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };


  const filteredProducts = products.filter(
    (product) =>
      product.claveInterna.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigoBarras.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products); // Convertir datos a hoja Excel
    const workbook = XLSX.utils.book_new(); // Crear un nuevo libro Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos"); // Agregar la hoja
    XLSX.writeFile(workbook, "productos.xlsx"); // Descargar el archivo como "clientes.xlsx"
  };

  return (
      <div>
      <h2 className="text-center">Gestión de Clientes</h2>
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
            <th>Nombre</th>
            <th>Código de Barras</th>
            <th>Costo</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.nombre}</td>
              <td>{product.codigoBarras}</td>
              <td>{product.costo}</td>
              <td>{product.precio}</td>
              <td>
                <Button onClick={() => handleEdit(product.id)}>Editar</Button>
                <Button onClick={() => handleDelete(product.id)} variant="danger" className="ms-2">
                  Eliminar
                </Button>
                <Button onClick={() => handleDetails(product.id)} variant="info" className="ms-2">
                  Detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ProductFormModal 
        show={showFormModal} 
        handleClose={() => setShowFormModal(false)} 
        productId={selectedProductId} 
        refreshProducts={refreshProducts} 
      />
    </div>
  );
};

export default ProductList;