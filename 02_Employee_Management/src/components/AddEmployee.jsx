import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    emp_Id: "",
    name: "",
    email: "",
    designation: "",
    department: "",
    salary: "",
    status: "active",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Employee</h2>

      <Form>
        <div className="row">

          <div className="col-md-6 mb-3">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              name="emp_Id"
              value={employee.emp_Id}
              onChange={handleChange}
              placeholder="Enter employee ID"
            />
          </div>

          <div className="col-md-6 mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Enter employee name"
            />
          </div>

          <div className="col-md-6 mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Enter employee email"
            />
          </div>

          <div className="col-md-6 mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              placeholder="Enter designation"
            />
          </div>

          <div className="col-md-6 mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={employee.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </div>

          <div className="col-md-6 mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              placeholder="Enter salary"
            />
          </div>

          <div className="col-md-6 mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={employee.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </div>

          <div className="col-md-6 mb-4">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={employee.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="col-md-6">
            <Button variant="primary" type="button">
              Add Employee
            </Button>
          </div>

        </div>
      </Form>
    </div>
  );
};

export default AddEmployee;