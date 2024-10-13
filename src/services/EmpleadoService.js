import axios from "axios";

const API_URL = "http://localhost:8080/api/empleados";
//const API_URL = "https://suresback.uc.r.appspot.com/api/productos";

// Obtener todos los productos
export const getAllEmpleados = () => axios.get(API_URL);

// Obtener todos los empleados activos
export const getAllEmpleadosActivos = () => axios.get(`${API_URL}/activos`);

// Obtener producto por ID
export const getEmpleadoById = (id) => axios.get(`${API_URL}/${id}`);

// Obtener imagen por nombre
export const getEmpleadoImage = (imageName) => {
  return `${API_URL}/${imageName}`;
};

// Crear Empleado Sin Imagen
export const createEmpleado = async (empleadoData, imageFile) => {
  try {
    // Primero crea el producto sin imagen
    const response = await axios.post(API_URL, empleadoData);
    const empleado = response.data;

    // Luego, si se proporciona una imagen, se sube la imagen
    if (imageFile) {
      const formData = new FormData();
      formData.append("imagen", imageFile);

      await axios.post(`${API_URL}/${empleado.id}/imagen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    return empleado;
  } catch (error) {
    console.error("Error creando el producto:", error);
    throw error;
  }
};

// Actualizar producto con imagen opcional
export const updateEmpleado = async (id, empleadoData, imageFile) => {
  try {
    // Primero actualiza los datos del producto sin imagen
    await axios.put(`${API_URL}/${id}`, empleadoData);

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
    console.error("Error actualizando el producto:", error);
    throw error;
  }
};

// Desactivar producto
export const deleteEmpleado = (id) =>
  axios.delete(`${API_URL}/desactivar/${id}`);

// Activar producto
export const activateEmpleado = (id) => axios.put(`${API_URL}/activar/${id}`);
