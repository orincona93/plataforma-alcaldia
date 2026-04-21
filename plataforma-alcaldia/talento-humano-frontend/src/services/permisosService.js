import axios from "axios";

const API = "http://localhost:3001";

export const getPermisos = () => axios.get(`${API}/permisos`);
export const createPermiso = (data) => axios.post(`${API}/permisos`, data);