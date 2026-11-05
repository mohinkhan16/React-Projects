
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  addEmployee,
  UpdateEmployee,
  getEmpById,
} from "../api/EmployeeAxios";

const initialForm = {
  name: "",
  emp_Id: "",
  email: "",
  designation: "",
  department: "HR",
  salary: "",
  status: "active",
  mobile: "",
};

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editId = id || null;

  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  useEffect(() => {
    if (!id) {
      setFormData(initialForm);
      setMessage("");
      return;
    }

    const loadEmployee = async () => {
      try {
        setLoadingEmployee(true);
        setMessage("");

        const employee = await getEmpById(id);


        setFormData({
          name: employee.name ?? "",
          emp_Id: employee.emp_Id ?? "",
          email: employee.email ?? "",
          designation: employee.designation ?? "",
          department: employee.department ?? "HR",
          salary: employee.salary ?? "",
          status: employee.status ?? "active",
          mobile: employee.mobile ?? "",
        });
      } catch (error) {
        console.error("Load employee error:", error);
        console.error("Server response:", error.response?.data);

        setMessage("Employee details load nahi hui.");
      } finally {
        setLoadingEmployee(false);
      }
    };

    loadEmployee();
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
    setLoading(true);
    setMessage("");

    try {
      if (editId) {
        const updateData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
        };

        console.log("Updating employee ID:", editId);
        console.log("Update request data:", updateData);

        const response = await UpdateEmployee(editId, updateData);

        console.log("Update successful:", response);
        setMessage("Employee updated successfully.");

        navigate("/");
      } else {
        const newEmployee = {
          ...formData,
          name: formData.name.trim(),
          emp_Id: Number(formData.emp_Id),
          email: formData.email.trim(),
          designation: formData.designation.trim(),
          salary: Number(formData.salary),
          mobile: formData.mobile.trim(),
        };

        console.log("Adding employee:", newEmployee);

        const response = await addEmployee(newEmployee);

        console.log("Employee added successfully:", response);

        navigate("/");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Employee save nahi hua."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingEmployee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <div>
      <h2>{editId ? "Update Employee" : "Add Employee"}</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div>
          <label>Employee ID: </label>
          <input
            name="emp_Id"
            type="number"
            value={formData.emp_Id}
            onChange={handleChange}
            disabled={Boolean(editId)}
            required
          />
        </div>
        <br />

        <div>
          <label>Email: </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div>
          <label>Designation: </label>
          <input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            disabled={Boolean(editId)}
            required
          />
        </div>
        <br />

        <div>
          <label>Department: </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            disabled={Boolean(editId)}
          >
            <option value="HR">HR</option>
            <option value="finance">Finance</option>
            <option value="it">IT</option>
            <option value="security">Security</option>
          </select>
        </div>
        <br />

        <div>
          <label>Salary: </label>
          <input
            name="salary"
            type="number"
            min="0"
            value={formData.salary}
            onChange={handleChange}
            disabled={Boolean(editId)}
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
            disabled={Boolean(editId)}
          >
            <option value="active">Active</option>
            <option value="terminated">Terminated</option>
            <option value="suspend">Suspend</option>
            <option value="hold">Hold</option>
          </select>
        </div>
        <br />

        <div>
          <label>Mobile: </label>
          <input
            name="mobile"
            type="tel"
            minLength={10}
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : editId
              ? "Update Employee"
              : "Add Employee"}
        </button>

        {" "}

        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>

        <br />
        <br />

        <Link to="/">Back to Employees</Link>
      </form>
    </div>
  );
}

export default EmployeeForm;
