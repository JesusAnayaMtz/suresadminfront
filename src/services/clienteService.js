import axios from "axios";

//const API_URL = 'http://localhost:8080/api/clientes';
const API_URL = "https://suresback.uc.r.appspot.com/api/clientes";

export const getAllClients = () => axios.get(API_URL);
export const getClientById = (id) => axios.get(`${API_URL}/${id}`);
export const createClient = (clientData) => axios.post(API_URL, clientData);
export const updateClient = (id, clientData) => axios.put(`${API_URL}/${id}`, clientData);
export const deleteClient = (id) => axios.delete(`${API_URL}/desactivar/${id}`);
export const activateClient = (id) => axios.put(`${API_URL}/activar/${id}`);