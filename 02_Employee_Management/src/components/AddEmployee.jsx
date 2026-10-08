import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";

import { getAllEmployee ,deleteEmployee,addEmployee } from "../API/EmployeeAxious";

function FormExample() {
  const { Formik } = formik;

  return (
    <Formik
      onSubmit={async (values, { resetForm }) => {
        try {
          const result = await addEmployee(values);

          console.log("Employee Added:", result);

          resetForm();
          alert("Employee added successfully!");
        } catch (error) {
          console.error("Add Employee Error:", error);
          alert("Failed to add employee");
        }
      }}
      initialValues={{
        name: "",
        emp_Id: "",
        email: "",
        designation: "",
        department: "",
        salary: "",
        status: "",
        mobile: "",
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Employee Name"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Employee Id</Form.Label>
              <Form.Control
                type="number"
                name="emp_Id"
                value={values.emp_Id}
                onChange={handleChange}
                placeholder="Employee ID"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>

                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={values.designation}
                onChange={handleChange}
                placeholder="Designation"
              />
            </Form.Group>

            <Form.Group as={Col} md="3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={values.department}
                onChange={handleChange}
                placeholder="Department"
              />
            </Form.Group>

            <Form.Group as={Col} md="3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={values.salary}
                onChange={handleChange}
                placeholder="Salary"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={values.status}
              onChange={handleChange}
              placeholder="Status"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              placeholder="Mobile"
            />
          </Form.Group>

          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormExample;