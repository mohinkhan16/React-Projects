const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getAllEmployee() {
  try {
    const res = await fetch(`${BASE_URL}/allEmployee`);

    if (!res.ok) {
      throw new Error("Failed to fetch Employee data");
    }

    const data = await res.json();

    console.log("Employee data:", data);

    return data.Employees;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addEmployee(EmpData) {
  try {
    const res = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(EmpData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Backend error:", data);
      throw new Error(data.message || "Failed to add Employee data");
    }

    console.log("Employee added:", data);

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function deleteEmployee(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Backend error:", data);
      throw new Error(data.message || "Failed to delete Employee");
    }

    console.log("Employee deleted:", data);

    return data;
  } catch (error) {
    console.error("Delete API Error:", error);
    throw error;
  }
}

export async function UpdateEmployee(id, EmpData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(EmpData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Backend error:", data);
      throw new Error(data.message || "Failed to update Employee");
    }

    console.log("Employee update:", data);

    return data;
  } catch (error) {
    console.error("update API Error:", error);
    throw error;
  }
}



export const getEmpById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Failed to get employee data"
      );
    }

    console.log("Employee By ID:", data);

    return data.EmployeeData;
  } catch (error) {
    console.error("Get Employee Error:", error.message);
    throw error;
  }
};