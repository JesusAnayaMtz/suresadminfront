import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductFormModal from '../components/ProductFormModal';
import { Button } from 'react-bootstrap';

const ProductsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleEdit = (id) => {
    setCurrentProductId(id);
    setShowForm(true);
  };

  const handleViewDetails = (id) => {
    // lógica para ver detalles
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentProductId(null);
  };

  const refreshProducts = () => {
    // lógica para refrescar la lista de productos
  };

  return (
    <div>
      <ProductList handleEdit={handleEdit} handleViewDetails={handleViewDetails} />
      <ProductFormModal
        show={showForm}
        handleClose={handleCloseForm}
        productId={currentProductId}
        refreshProducts={refreshProducts}
      />
    </div>
  );
};

export default ProductsPage;