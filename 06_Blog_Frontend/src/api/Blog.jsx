import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://backend-projects-2-6qxi.onrender.com";

export async function getAllBlogs() {
  try {
    const res = await axios.get(`${BASE_URL}/blog/all`);

    return res.data.BlogData;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message
    );
  }
}

export async function addBlog(BlogData, token) {
  try {
    const res = await axios.post(
      `${BASE_URL}/blog/add`,
      BlogData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.newblog;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message
    );
  }
}

export async function deleteBlog(id, token) {
  try {
    const res = await axios.delete(
      `${BASE_URL}/blog/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message
    );
  }
}

export async function updateBlog(id, BlogData, token) {
  try {
    const res = await axios.patch(
      `${BASE_URL}/blog/update/${id}`,
      BlogData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.BlogData;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message
    );
  }
}

export async function getBlogById(id, token) {
  try {
    const blogs = await getAllBlogs(token);

    return blogs.find((blog) => blog._id === id);
  } catch (error) {
    throw new Error(error.message);
  }
}
