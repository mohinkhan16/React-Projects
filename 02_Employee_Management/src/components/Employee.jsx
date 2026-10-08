import { Table } from "react-bootstrap";
import { getAllEmployee, deleteEmployee } from "../API/EmployeeAxious";
import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import Button from "react-bootstrap/Button";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getAllEmployee();

      console.log("Employee data:", data);

      setEmployee(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE EMPLOYEE
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);

      // Delete from UI after successful API call
      setEmployee((prev) =>
        prev.filter((emp) => emp._id !== id)
      );

      alert("Employee deleted successfully");
    } catch (error) {
      console.log("Delete Error:", error);
      alert("Failed to delete employee");
    }
  };

  // EDIT EMPLOYEE
  const handleEdit = (id) => {
    console.log("Edit:", id);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <h1 className="text-center" style={{ color: "red" }}>
        {error.message}
      </h1>
    );
  }

  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Sr.no</th>
          <th>Name</th>
          <th>Emp_id</th>
          <th>Email</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Status</th>
          <th>Mobile</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {employee.map((emp, index) => (
          <tr key={emp._id}>
            <td>{index + 1}</td>
            <td>{emp.name}</td>
            <td>{emp.emp_Id}</td>
            <td>{emp.email}</td>
            <td>{emp.designation}</td>
            <td>{emp.department}</td>
            <td>{emp.salary}</td>
            <td>{emp.status}</td>
            <td>{emp.mobile}</td>

            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(emp._id)}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(emp._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Employee;