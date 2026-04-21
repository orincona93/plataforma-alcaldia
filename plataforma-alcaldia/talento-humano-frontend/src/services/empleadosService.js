import axios from "axios";

const API = "http://localhost:3001";

export const getEmpleados = () => axios.get(`${API}/empleados`);
export const createEmpleado = (data) => axios.post(`${API}/empleados`, data);