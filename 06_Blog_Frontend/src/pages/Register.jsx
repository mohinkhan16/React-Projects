import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/BlogAxios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Password: "",
    Address: "",
    Phone: "",
    Role: "user",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (image) {
        data.append("Profile_Pic", image);
      }

      await registerUser(data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Register</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {Object.keys(form).filter((key) => key !== "Role").map((key) => (
            <div className="mb-3" key={key}>
              <label className="form-label">{key}</label>
              <input
                className="form-control"
                type={key === "Password" ? "password" : "text"}
                name={key}
                value={form[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
