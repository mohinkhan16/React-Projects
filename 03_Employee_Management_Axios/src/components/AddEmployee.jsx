import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, getEmpById, UpdateEmployee } from "../API/EmployeeAxios";

function AddEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    emp_Id: "",
    email: "",
    designation: "",
    department: "",
    salary: "",
    status: "active",
    mobile: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchEmployeeDetail = async () => {
      try {
        setLoading(true);
        const emp = await getEmpById(id);
        if (emp) {
          setFormData({
            name: emp.name || "",
            emp_Id: emp.emp_Id || emp.id || "",
            email: emp.email || "",
            designation: emp.designation || "",
            department: emp.department || "",
            salary: emp.salary || "",
            status: emp.status || "active",
            mobile: emp.mobile || emp.phoneNumber || "",
          });
        }
      } catch (error) {
        console.error("Fetch Employee Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await UpdateEmployee(id, formData);
        alert("Employee updated successfully!");
      } else {
        await addEmployee(formData);
        alert("Employee added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Submit Error:", error);
      alert(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h2>{id ? "Update Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div>
          <label>Employee ID: </label>
          <input
            type="number"
            name="emp_Id"
            placeholder="Enter Employee ID"
            value={formData.emp_Id}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div>
          <label>Designation: </label>
          <input
            type="text"
            name="designation"
            placeholder="Enter Designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>
        <br />

        <div>
          <label>Department: </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Fullstack">Fullstack</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Video Editing">Video Editing</option>
          </select>
        </div>
        <br />

        <div>
          <label>Salary: </label>
          <input
            type="number"
            name="salary"
            placeholder="Enter Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div>
          <label>Status: </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <br />

        <div>
          <label>Mobile: </label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <button type="submit">
          {id ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
