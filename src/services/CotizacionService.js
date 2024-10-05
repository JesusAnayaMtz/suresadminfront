import axios from "axios";

const API_URL = "http://localhost:8080/api/cotizaciones";

export const getAllCotizaciones = () => axios.get(API_URL);
export const getCotizacionById = (id) => axios.get(`${API_URL}/${id}`);
export const createCotizacion = (cotizacionData) =>
  axios.post(API_URL, cotizacionData);
export const updateCotizacion = (id, cotizacionData) =>
  axios.put(`${API_URL}/${id}`, cotizacionData);
export const deleteCotizacion = (id) => axios.delete(`${API_URL}/${id}`);
