import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllBlog,
  getCurrentUser,
  deleteBlog,
} from "../services/BlogAxios";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    try {
      const userRes = await getCurrentUser();
      const allRes = await getAllBlog();

      const user = userRes.data.user;

      const myBlogs = allRes.data.blog.filter(
        (blog) => blog.Author?._id === user._id
      );

      setBlogs(myBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchData();
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Blogs</h2>

      <Link to="/create" className="btn btn-primary mb-3">
        Add Blog
      </Link>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>{blog.Category}</td>
              <td>
                <Link
                  to={`/edit/${blog._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyBlogs;
