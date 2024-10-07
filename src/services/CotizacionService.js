import axios from "axios";

const API_URL = "http://localhost:8080/api/cotizaciones";

export const getAllCotizaciones = () => axios.get(API_URL);
export const getCotizacionById = (id) => axios.get(`${API_URL}/${id}`);
export const createCotizacion = (payload) =>
  axios.post(API_URL, payload);
export const updateCotizacion = (id, payload) =>
  axios.put(`${API_URL}/${id}`, payload);
export const deleteCotizacion = (id) => axios.delete(`${API_URL}/${id}`);
