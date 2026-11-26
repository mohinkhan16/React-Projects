import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://backend-projects-2-6qxi.onrender.com";

export async function registerUser(UserData) {
  try {
    const res = await axios.post(`${BASE_URL}/user/add`, UserData);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function loginUser(UserData) {
  try {
    const res = await axios.post(`${BASE_URL}/user/login`, UserData);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getAllUsers() {
  try {
    const res = await axios.get(`${BASE_URL}/user/all`);
    return res.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getAuthUser(token) {
  try {
    const res = await axios.get(`${BASE_URL}/user/authlogin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function logoutUser(token) {
  try {
    const res = await axios.get(`${BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function logoutAllUsers(token) {
  try {
    const res = await axios.get(`${BASE_URL}/user/logoutall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateUser(id, UserData, token) {
  try {
    const url = id
      ? `${BASE_URL}/user/update/${id}`
      : `${BASE_URL}/user/update`;

    const res = await axios.patch(url, UserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteUser(token) {
  try {
    const res = await axios.delete(`${BASE_URL}/user/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteUserByAdmin(id, token) {
  try {
    const res = await axios.delete(`${BASE_URL}/admin/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateUserByAdmin(id, UserData, token) {
  try {
    const res = await axios.patch(`${BASE_URL}/admin/update/${id}`, UserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
