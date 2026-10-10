import axios from "axios";

// Base URL configured from environment variable or fallback to production Render API
const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://backend-projects-x8ut.onrender.com/employee";

// Create configured Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

/**
 * Fetch all employees
 * Backend returns: { success: true, message: "...", total: N, employees: [...] }
 */
export const getAllEmployees = async () => {
  try {
    const res = await API.get("/allEmployee");
    return res.data.employees || [];
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch employees";
    throw new Error(message, { cause: error });
  }
};

// Alias for backwards compatibility
export const getAllEmployee = getAllEmployees;

/**
 * Fetch single employee by ID
 * Backend returns: { success: true, message: "...", employee: {...} }
 */
export const getEmployeeById = async (id) => {
  try {
    const res = await API.get(`/${id}`);
    return res.data.employee;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch employee details";
    throw new Error(message, { cause: error });
  }
};

export const getEmpById = getEmployeeById;

/**
 * Add a new employee
 * Backend returns: { success: true, message: "...", newEmployee: {...} }
 */
export const addEmployee = async (employeeData) => {
  try {
    const payload = {
      ...employeeData,
      emp_Id: Number(employeeData.emp_Id),
      salary: Number(employeeData.salary),
    };
    const res = await API.post("/add", payload);
    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to add employee";
    throw new Error(message, { cause: error });
  }
};

/**
 * Update employee by ID
 * Note: Backend PATCH endpoint only allows updating 'name', 'email', 'mobile'.
 */
export const updateEmployee = async (id, updatedData) => {
  try {
    // Whitelist only allowed fields supported by the backend
    const allowedFields = ["name", "email", "mobile"];
    const payload = {};
    allowedFields.forEach((key) => {
      if (updatedData[key] !== undefined && updatedData[key] !== null) {
        payload[key] = updatedData[key];
      }
    });

    const res = await API.patch(`/${id}`, payload);
    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to update employee";
    throw new Error(message, { cause: error });
  }
};

export const UpdateEmployee = updateEmployee;

/**
 * Delete employee by ID
 * Backend returns: { success: true, message: "employee deleted successfully" }
 */
export const deleteEmployee = async (id) => {
  try {
    const res = await API.delete(`/${id}`);
    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete employee";
    throw new Error(message, { cause: error });
  }
};

export default API;
