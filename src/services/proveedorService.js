import axios from "axios";

const API_URL = 'http://localhost:8080/api/proveedores';

export const getAllProveedores = () => axios.get(API_URL);
export const getProveedortById = (id) => axios.get(`${API_URL}/${id}`);
export const createProveedor = (proveedorData) => axios.post(API_URL, proveedorData);
export const updateProveedor = (id, proveedorData) => axios.put(`${API_URL}/${id}`, proveedorData);
export const deleteProveedor = (id) => axios.delete(`${API_URL}/desactivar/${id}`);
export const activateProveedor = (id) => axios.put(`${API_URL}/activar/${id}`);