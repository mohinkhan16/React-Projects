import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;


const BASE_URL = "https://employee-management-dv19.onrender.com";

export const getAllEmployee = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/employee/allEmployee`);

    console.log("Employee data:", res.data);

    return res.data.employees;
  } catch (error) {
    console.log("Get Employee Error:", error.message);
    throw error;
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const res = await axios.post(
      `${BASEURL}/employee/addEmployee`,
      employeeData
    );

    return res.data;
  } catch (error) {
    console.log("Add Employee Error:", error.message);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/employee/deleteEmployee/${id}`
    );

    console.log("Employee deleted:", res.data);

    return res.data;
  } catch (error) {
    console.log("Delete Employee Error:", error.message);
    throw error;
  }
};