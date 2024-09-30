import axios from "axios";

const API_URL = 'http://localhost:8080/api/productos';

// Obtener todos los productos
export const getAllProducts = () => axios.get(API_URL);

// Obtener producto por ID
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);

// Crear producto sin imagen
export const createProduct = async (productData, imageFile) => {
  try {
    // Primero crea el producto sin imagen
    const response = await axios.post(API_URL, productData);
    const product = response.data;

    // Luego, si se proporciona una imagen, se sube la imagen
    if (imageFile) {
      const formData = new FormData();
      formData.append("imagen", imageFile);
      
      await axios.post(`${API_URL}/${product.id}/imagen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    return product;
  } catch (error) {
    console.error('Error creando el producto:', error);
    throw error;
  }
};

// Actualizar producto con imagen opcional
export const updateProduct = async (id, productData, imageFile) => {
  try {
    // Primero actualiza los datos del producto sin imagen
    await axios.put(`${API_URL}/${id}`, productData);

    // Luego, si se proporciona una nueva imagen, se actualiza la imagen
    if (imageFile) {
      const formData = new FormData();
      formData.append("imagen", imageFile);
      
      await axios.post(`${API_URL}/${id}/imagen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  } catch (error) {
    console.error('Error actualizando el producto:', error);
    throw error;
  }
};

// Desactivar producto
export const deleteProduct = (id) => axios.delete(`${API_URL}/desactivar/${id}`);

// Activar producto
export const activateProduct = (id) => axios.put(`${API_URL}/activar/${id}`);