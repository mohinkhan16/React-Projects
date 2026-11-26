import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBlog, updateBlog, getBlogById } from "../services/BlogAxios";

function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    Category: "sports",
    Discription: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const loadBlog = async () => {
        try {
          const res = await getBlogById(id);
          const blog = res.data.blog;
          if (blog) {
            setForm({
              title: blog.title || "",
              Category: blog.Category || "sports",
              Discription: blog.Discription || "",
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      loadBlog();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: 
      e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("Category", form.Category);
      data.append("Discription", form.Discription);

      if (image) {
        data.append("BlogImg", image);
      }

      if (id) {
        await updateBlog(id, data);
      } else {
        await addBlog(data);
      }

      navigate("/");
    } catch (err) {
      console.log("Operation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4 shadow-sm" style={{ maxWidth: "550px" }}>
        <h3 className="text-center mb-4">{id ? "Edit Blog" : "Create Blog"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Blog Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="Category"
              className="form-select"
              value={form.Category}
              onChange={handleChange}
              required
            >
              <option value="sports">sports</option>
              <option value="Events">Events</option>
              <option value="Motivated">Motivated</option>
              <option value="fun">fun</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="Discription"
              className="form-control"
              rows="5"
              value={form.Discription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Blog Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Please wait..." : id ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;
