import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllEmployee } from "../API/EmployeeApi";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    const data = await getAllEmployee();

    console.log("Employee Data:", data);

    setEmployee(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee List</h2>

      <Table
        striped
        bordered
        hover
        responsive
        className="align-middle shadow-sm"
      >
        <thead className="table-dark">
          <tr>
            <th className="text-center">Sr. No</th>
            <th>Name</th>
            <th>Emp ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Mobile</th>
          </tr>
        </thead>

        <tbody>
          {employee.map((item, index) => (
            <tr key={item._id}>
              <td className="text-center fw-semibold">
                {index + 1}
              </td>

              <td className="fw-semibold">
                {item.name}
              </td>

              <td>
                <span className="badge bg-secondary">
                  {item.emp_Id}
                </span>
              </td>

              <td>{item.email}</td>

              <td>
                <span className="badge bg-info text-dark">
                  {item.department}
                </span>
              </td>

              <td className="fw-semibold">
                ₹{item.salary}
              </td>

              <td>{item.mobile}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Employee;