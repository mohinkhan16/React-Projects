
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllEmployee = async () => {
  const response = await axios.get(`${BASE_URL}/allEmployee`);
  return response.data.employees ?? response.data;
};

export const addEmployee = async (data) => {
  const response = await axios.post(`${BASE_URL}/add`, data);
  return response.data;
};

export const getEmpById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data.employee ?? response.data;
};

export const UpdateEmployee = async (id, data) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
