import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { addEmployee } from "../API/EmployeeAxios";

// Yup validation schema matching backend constraints
const employeeSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Employee name is required"),
  emp_Id: Yup.number()
    .typeError("Employee ID must be a valid number")
    .positive("Employee ID must be a positive number")
    .integer("Employee ID must be an integer")
    .required("Employee ID is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  designation: Yup.string()
    .trim()
    .min(2, "Designation must be at least 2 characters")
    .required("Designation is required"),
  department: Yup.string()
    .oneOf(["HR", "it", "finance", "security"], "Please select a valid department")
    .required("Department is required"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be greater than zero")
    .required("Salary is required"),
  status: Yup.string()
    .oneOf(["active", "terminated"], "Please select a status")
    .required("Employment status is required"),
  mobile: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
});

const initialValues = {
  name: "",
  emp_Id: "",
  email: "",
  designation: "",
  department: "it",
  salary: "",
  status: "active",
  mobile: "",
};

function AddEmployee() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ show: false, message: "", variant: "success" });

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setFeedback({ show: false, message: "", variant: "success" });

      const response = await addEmployee(values);
      console.log("Employee added successfully:", response);

      setFeedback({
        show: true,
        message: `Employee "${values.name}" (ID: #${values.emp_Id}) added successfully!`,
        variant: "success",
      });

      resetForm();

      // Automatically navigate back to list after short delay for good UX
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Add employee failed:", err);
      setFeedback({
        show: true,
        message: err.message || "Failed to add employee. Please check input values.",
        variant: "danger",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-2" style={{ maxWidth: 840, margin: "0 auto" }}>
      {/* Breadcrumb & Navigation */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <Link to="/" className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1 mb-1">
            <i className="bi bi-arrow-left"></i> Back to Employee Directory
          </Link>
          <h2 className="fw-bold mb-0 text-dark">Add New Employee</h2>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback.show && (
        <Alert
          variant={feedback.variant}
          dismissible
          onClose={() => setFeedback({ ...feedback, show: false })}
          className="shadow-sm d-flex align-items-center mb-4"
        >
          <i
            className={`bi me-2 fs-5 ${
              feedback.variant === "success"
                ? "bi-check-circle-fill text-success"
                : "bi-exclamation-triangle-fill text-danger"
            }`}
          ></i>
          <div className="flex-grow-1">{feedback.message}</div>
          {feedback.variant === "success" && (
            <Link to="/" className="btn btn-sm btn-outline-success ms-3">
              View List
            </Link>
          )}
        </Alert>
      )}

      {/* Form Card */}
      <Card className="border-0 shadow-sm p-3 p-md-4">
        <Formik
          initialValues={initialValues}
          validationSchema={employeeSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isSubmitting,
            resetForm,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <h5 className="fw-semibold text-secondary mb-3 pb-2 border-bottom">
                <i className="bi bi-person-badge me-2 text-primary"></i> Personal &amp; Employment Details
              </h5>

              <Row className="g-3 mb-3">
                {/* Employee Name */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="fw-medium small">
                    Employee Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && Boolean(errors.name)}
                    placeholder="e.g. Rahul Sharma"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Employee ID */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="fw-medium small">
                    Employee ID <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="emp_Id"
                    value={values.emp_Id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.emp_Id && Boolean(errors.emp_Id)}
                    placeholder="e.g. 104"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.emp_Id}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="g-3 mb-3">
                {/* Email Address */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="fw-medium small">
                    Email Address <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light text-muted">
                      <i className="bi bi-envelope"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && Boolean(errors.email)}
                      placeholder="rahul@company.com"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Mobile */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="fw-medium small">
                    Mobile Number <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light text-muted">
                      <i className="bi bi-telephone"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="mobile"
                      maxLength={10}
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.mobile && Boolean(errors.mobile)}
                      placeholder="10-digit mobile number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobile}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="g-3 mb-3">
                {/* Designation */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="fw-medium small">
                    Designation <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={values.designation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.designation && Boolean(errors.designation)}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.designation}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Department dropdown */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="fw-medium small">
                    Department <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="department"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.department && Boolean(errors.department)}
                  >
                    <option value="it">Information Technology (IT)</option>
                    <option value="HR">Human Resources (HR)</option>
                    <option value="finance">Finance &amp; Accounts</option>
                    <option value="security">Security</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.department}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="g-3 mb-4">
                {/* Salary */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="fw-medium small">
                    Monthly / Annual Salary <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light text-muted">₹</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="salary"
                      value={values.salary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.salary && Boolean(errors.salary)}
                      placeholder="e.g. 60000"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.salary}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Status dropdown */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="fw-medium small">
                    Employment Status <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.status && Boolean(errors.status)}
                  >
                    <option value="active">Active</option>
                    <option value="terminated">Terminated</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Form Action Buttons */}
              <div className="d-flex justify-content-end align-items-center gap-2 pt-3 border-top">
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => resetForm()}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Saving Employee...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-check-fill me-2"></i> Save Employee
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default AddEmployee;