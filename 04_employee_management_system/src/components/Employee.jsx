
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllEmployee,
  deleteEmployee,
} from "../api/EmployeeAxios";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployee();

      setEmployees(Array.isArray(data) ? data : []);
      console.log("Employees fetched successfully:", data);
    } catch (error) {
      console.error("Fetch employees error:", error);
      console.error("Server response:", error.response?.data);
      setMessage("Employee list load nahi hui.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      const response = await deleteEmployee(id);

      console.log("Employee deleted:", response);
      setMessage("Employee deleted successfully.");

      await fetchEmployees();
    } catch (error) {
      console.error("Delete error:", error);
      console.error("Server response:", error.response?.data);

      setMessage("Employee delete nahi hua.");
    }
  };

  return (
    <div>
      <h2>All Employees</h2>

      {message && <p>{message}</p>}

      <Link to="/add">Add Employee</Link>

      <br />
      <br />

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="9">No employees found.</td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.emp_Id}</td>
                <td>{employee.email}</td>
                <td>{employee.designation}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>
                <td>{employee.status}</td>
                <td>{employee.mobile}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    Edit
                  </Link>

                  {" "}

                  <button
                    type="button"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
