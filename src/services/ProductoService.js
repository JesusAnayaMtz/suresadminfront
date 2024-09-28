import axios from "axios";

const API_URL = 'http://localhost:8080/api/productos';

const getAllProductos = () => {
    return axios.get(API_URL);
};

const getProductoById = (id) => {
    return axios.get(`${API_URL}/${id}`);
  };

  //Crear productos sin imagen
  const crearProducto = (productoData) => {
    return axios.post(API_URL, productoData);
  };

  //Subir imagen a producto existente
  const uploadProductoImagen = (productoId, imageFIle) => {
    const formData = new FormData();
    formData.append('imagen', imageFIle);

    return axios.post(`${API_URL}/${productoId}/imagen`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
  };

  // Editar el producto sin imagen
const updateProduct = (id, productData) => {
    return axios.put(`${API_URL}/${id}`, productData);
  };

  const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/${id}`);
  };

  const searchProducts = (query) => {
    return axios.get(`${API_URL}/buscar${query}`);
  };

  export default {
    getAllProductos,
    getProductoById,
    crearProducto,
    uploadProductoImagen,
    updateProduct,
    deleteProduct,
    searchProducts,
  };

