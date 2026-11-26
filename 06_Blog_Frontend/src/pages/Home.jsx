import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlog, deleteBlog, getCurrentUser } from "../services/BlogAxios";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlog();
      setBlogs(res.data.blog || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await getCurrentUser();
        setCurrentUser(res.data.user);
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCurrentUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="p-4 mb-4 bg-light rounded-3 text-center border">
          <h2 className="fw-bold">Welcome to MyBlog</h2>
          <p className="text-muted mb-0">Explore the latest articles, stories, and updates</p>
        </div>

        <h3 className="mb-4">All Blogs</h3>

        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div className="card h-100 shadow-sm">

                {blog.BlogImg && (
                  <img
                    src={blog.BlogImg}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body">
                  <h5>{blog.title}</h5>

                  <h4>{blog.Category}</h4>

                  <p className="mt-3">
                    {blog.Discription}
                  </p>

                  <p className="text-muted">
                    Author: {blog.Author?.Name || "Unknown"}
                  </p>

                  {currentUser && (blog.Author?._id === currentUser._id || blog.Author === currentUser._id) && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {blogs.length === 0 && <p>No blogs available</p>}
      </div>

      <footer className="mt-5 py-4 text-center border-top text-muted bg-light">
        <p className="mb-0">© 2026 MyBlog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
