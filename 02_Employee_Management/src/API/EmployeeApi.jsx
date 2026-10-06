const BASE_URL = "https://employee-management-dv19.onrender.com";

export async function getAllEmployee() {
  try {
    const res = await fetch(`${BASE_URL}/employee/allEmployee`);

    if (!res.ok) {
      throw new Error("Failed to fetch Employee data");
    }

    const data = await res.json();

    console.log("Employee data:", data);

    return data.employees;
  } catch (error) {
    throw new Error(error.message);
  }
}