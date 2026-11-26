import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://backend-projects-2-6qxi.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = (data) =>
  API.post("/JWT/auth/add", data);

export const loginUser = (data) =>
  API.post("/JWT/auth/login", data);

export const getCurrentUser = () =>
  API.post("/JWT/auth/authLogin", {});

export const logoutUser = () =>
  API.get("/JWT/auth/logout");

export const getAllBlog = () =>
  API.get("/blog");

export const addBlog = (data) =>
  API.post("/blog", data);

export const getBlogById = async (id) => {
  const res = await API.get("/blog");
  const blog = res.data.blog?.find((b) => b._id === id);
  return { data: { blog } };
};

export const updateBlog = (id, data) =>
  API.patch(`/blog/${id}`, data);

export const deleteBlog = (id) =>
  API.delete(`/blog/${id}`);

export default API;
