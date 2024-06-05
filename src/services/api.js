// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getEmployees = () => api.get('/employees');
export const addEmployee = (employee) => api.post('/employees', employee);
export const updateEmployee = (id, employee) => api.put(`/employees/${id}`, employee);
export const removeEmployee = (id) => api.delete(`/employees/${id}`);
