import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { addEmployee } from "../services/employeeApi";

const AddEmployee = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      emp_Id: "",
      name: "",
      email: "",
      designation: "",
      department: "",
      salary: "",
      status: "active",
      mobile: "",
    },

    validationSchema: Yup.object({
      emp_Id: Yup.number()
        .typeError("Employee ID must be a number")
        .required("Employee ID is required"),

      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      designation: Yup.string()
        .required("Designation is required"),

      department: Yup.string()
        .oneOf(
          ["HR", "finance", "it", "security"],
          "Please select a valid department"
        )
        .required("Department is required"),

      salary: Yup.number()
        .typeError("Salary must be a number")
        .required("Salary is required")
        .positive("Salary must be greater than 0"),

      status: Yup.string()
        .oneOf(
          ["active", "terminated", "suspend", "hold"],
          "Invalid status"
        )
        .required("Status is required"),

      mobile: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          "Mobile number must be 10 digits"
        )
        .required("Mobile number is required"),
    }),

    onSubmit: async (
      values,
      { setSubmitting, resetForm }
    ) => {
      try {
        console.log("Form Values:", values);

        const data = await addEmployee(values);

        console.log("Employee Added:", data);

        alert("Employee added successfully!");

        resetForm();

        navigate("/employee");

      } catch (error) {
        console.error("Add Employee Error:", error);

        alert(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Add Employee</h2>

      <Form onSubmit={formik.handleSubmit}>

        <div className="row">

          <div className="col-md-6 mb-3">

            <Form.Label>
              Employee ID
            </Form.Label>

            <Form.Control
              type="number"
              name="emp_Id"
              value={formik.values.emp_Id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter employee ID"
              isInvalid={
                formik.touched.emp_Id &&
                formik.errors.emp_Id
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.emp_Id}
            </Form.Control.Feedback>

          </div>

          <div className="col-md-6 mb-3">

            <Form.Label>
              Name
            </Form.Label>

            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter employee name"
              isInvalid={
                formik.touched.name &&
                formik.errors.name
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>

          </div>

          <div className="col-md-6 mb-3">

            <Form.Label>
              Email
            </Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter employee email"
              isInvalid={
                formik.touched.email &&
                formik.errors.email
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>

          </div>

          <div className="col-md-6 mb-3">

            <Form.Label>
              Designation
            </Form.Label>

            <Form.Control
              type="text"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter designation"
              isInvalid={
                formik.touched.designation &&
                formik.errors.designation
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.designation}
            </Form.Control.Feedback>

          </div>

          <div className="col-md-6 mb-3">

            <Form.Label>
              Department
            </Form.Label>

            <Form.Select
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.department &&
                formik.errors.department
              }
            >

              <option value="">
                Select Department
              </option>

              <option value="HR">
                HR
              </option>

              <option value="finance">
                Finance
              </option>

              <option value="it">
                IT
              </option>

              <option value="security">
                Security
              </option>

            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {formik.errors.department}
            </Form.Control.Feedback>

          </div>

          <div className="col-md-6 mb-3">

            <Form.Label>
              Salary
            </Form.Label>

            <Form.Control
              type="number"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter salary"
              isInvalid={
                formik.touched.salary &&
                formik.errors.salary
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.salary}
            </Form.Control.Feedback>

          </div>

          <div className="col-md-6 mb-3">

            <Form.Label>
              Status
            </Form.Label>

            <Form.Select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.status &&
                formik.errors.status
              }
            >

              <option value="active">
                Active
              </option>

              <option value="terminated">
                Terminated
              </option>

              <option value="suspend">
                Suspend
              </option>

              <option value="hold">
                Hold
              </option>

            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {formik.errors.status}
            </Form.Control.Feedback>

          </div>

          <div className="col-md-6 mb-4">

            <Form.Label>
              Mobile
            </Form.Label>

            <Form.Control
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter mobile number"
              isInvalid={
                formik.touched.mobile &&
                formik.errors.mobile
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.mobile}
            </Form.Control.Feedback>

          </div>

          <div className="col-md-6">

            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Adding..."
                : "Add Employee"}
            </Button>

          </div>

        </div>

      </Form>

    </div>
  );
};

export default AddEmployee;