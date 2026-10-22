import React, { useEffect, useState } from "react";
import { getAllEmployee, deleteEmployee } from "../API/EmployeeAxios";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../ui/Loading";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllEmployee();
      console.log("Employee Data:", data);
      setEmployee(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Error:", err);
      setError(err.message || "Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h3 style={{ color: "red" }}>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={loadData}>Try Again</button>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      await loadData();
    } catch (err) {
      console.log("Delete Error:", err);
      setError(err.message || "Failed to delete employee");
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/add">Add New Employee</Link>
      <br /><br />

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Emp ID</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Mobile</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>

        <tbody>
          {employee.length === 0 ? (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          ) : (
            employee.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.emp_Id || item.id}</td>
                <td>{item.email}</td>
                <td>{item.designation || "-"}</td>
                <td>{item.department}</td>
                <td>{item.salary}</td>
                <td>{item.status || "active"}</td>
                <td>{item.mobile || item.phoneNumber}</td>
                <td>
                  <button onClick={() => navigate(`/update/${item._id}`)}>
                    Update
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>
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
};

export default Employee;
