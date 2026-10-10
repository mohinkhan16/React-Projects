import { useEffect, useState, useMemo } from "react";
import {
  Table,
  Button,
  Card,
  Badge,
  Form,
  InputGroup,
  Row,
  Col,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllEmployees, deleteEmployee, updateEmployee } from "../API/EmployeeAxios";
import Loading from "../ui/Loading";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Alert / Toast state
  const [alertInfo, setAlertInfo] = useState({ show: false, message: "", variant: "success" });

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit modal state
  const [editTarget, setEditTarget] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", email: "", mobile: "" });
  const [editFormErrors, setEditFormErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  // View modal state
  const [viewTarget, setViewTarget] = useState(null);

  const showAlert = (message, variant = "success") => {
    setAlertInfo({ show: true, message, variant });
    setTimeout(() => {
      setAlertInfo({ show: false, message: "", variant: "success" });
    }, 4000);
  };

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const data = await getAllEmployees();
        if (!ignore) {
          setEmployees(Array.isArray(data) ? data : []);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load employees:", err);
          setError(err.message || "Failed to load employees from server.");
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Refresh error:", err);
      setError(err.message || "Failed to reload employees.");
    } finally {
      setLoading(false);
    }
  };

  // Helper for Department display and badge colors
  const renderDeptBadge = (dept) => {
    const d = (dept || "").toLowerCase();
    let bg = "secondary";
    let label = dept;

    if (d === "hr") {
      bg = "primary";
      label = "HR";
    } else if (d === "it") {
      bg = "info";
      label = "IT";
    } else if (d === "finance") {
      bg = "success";
      label = "Finance";
    } else if (d === "security") {
      bg = "dark";
      label = "Security";
    }

    return (
      <Badge bg={bg} className="badge-dept text-white">
        {label}
      </Badge>
    );
  };

  // Helper for Status display
  const renderStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "active") {
      return (
        <Badge bg="success" pill className="px-2 py-1">
          <i className="bi bi-check-circle-fill me-1"></i> Active
        </Badge>
      );
    }
    return (
      <Badge bg="danger" pill className="px-2 py-1">
        <i className="bi bi-x-circle-fill me-1"></i> Terminated
      </Badge>
    );
  };

  // Delete handlers
  const handleOpenDelete = (emp) => {
    setDeleteTarget(emp);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await deleteEmployee(deleteTarget._id);
      setEmployees((prev) => prev.filter((item) => item._id !== deleteTarget._id));
      showAlert(`Employee "${deleteTarget.name}" was deleted successfully.`, "success");
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete Error:", err);
      showAlert(err.message || "Could not delete employee.", "danger");
    } finally {
      setIsDeleting(false);
    }
  };

  // Edit handlers
  const handleOpenEdit = (emp) => {
    setEditTarget(emp);
    setEditFormData({
      name: emp.name || "",
      email: emp.email || "",
      mobile: emp.mobile || "",
    });
    setEditFormErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
    if (editFormErrors[name]) {
      setEditFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEditForm = () => {
    const errors = {};
    if (!editFormData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!editFormData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editFormData.email)) {
      errors.email = "Invalid email format";
    }
    if (!editFormData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (editFormData.mobile.length < 10) {
      errors.mobile = "Mobile number must be at least 10 digits";
    }
    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!validateEditForm()) return;

    try {
      setIsUpdating(true);
      const res = await updateEmployee(editTarget._id, editFormData);
      const updatedEmp = res.employee || { ...editTarget, ...editFormData };

      setEmployees((prev) =>
        prev.map((emp) => (emp._id === editTarget._id ? { ...emp, ...updatedEmp } : emp))
      );

      showAlert(`Employee "${editFormData.name}" updated successfully.`, "success");
      setEditTarget(null);
    } catch (err) {
      console.error("Update Error:", err);
      showAlert(err.message || "Failed to update employee.", "danger");
    } finally {
      setIsUpdating(false);
    }
  };

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (emp.name && emp.name.toLowerCase().includes(q)) ||
        (emp.email && emp.email.toLowerCase().includes(q)) ||
        (emp.designation && emp.designation.toLowerCase().includes(q)) ||
        (emp.emp_Id && String(emp.emp_Id).includes(q));

      const matchesDept =
        selectedDept === "all" ||
        (emp.department && emp.department.toLowerCase() === selectedDept.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" ||
        (emp.status && emp.status.toLowerCase() === selectedStatus.toLowerCase());

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, selectedDept, selectedStatus]);

  if (loading) {
    return <Loading message="Loading employee directory..." />;
  }

  if (error) {
    return (
      <Card className="text-center p-5 border-0 shadow-sm my-4">
        <i className="bi bi-wifi-off text-danger" style={{ fontSize: "3rem" }}></i>
        <h4 className="mt-3 fw-bold text-dark">Failed to Load Employees</h4>
        <p className="text-muted">{error}</p>
        <div className="mt-2">
          <Button variant="primary" onClick={handleRefresh} className="px-4">
            <i className="bi bi-arrow-clockwise me-2"></i> Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div>
      {/* Alert Banner */}
      {alertInfo.show && (
        <Alert
          variant={alertInfo.variant}
          dismissible
          onClose={() => setAlertInfo({ show: false, message: "", variant: "success" })}
          className="shadow-sm d-flex align-items-center mb-4"
        >
          <i
            className={`bi me-2 fs-5 ${
              alertInfo.variant === "success"
                ? "bi-check-circle-fill text-success"
                : "bi-exclamation-triangle-fill text-danger"
            }`}
          ></i>
          <div>{alertInfo.message}</div>
        </Alert>
      )}

      {/* Header & Stats */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Employee Directory</h2>
          <p className="text-muted mb-0">
            Manage your team members, designations, departments, and payroll.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-secondary"
            onClick={handleRefresh}
            title="Refresh List"
            className="d-flex align-items-center gap-1"
          >
            <i className="bi bi-arrow-clockwise"></i>
            <span className="d-none d-sm-inline">Refresh</span>
          </Button>
          <Button
            as={Link}
            to="/add-employee"
            variant="primary"
            className="d-flex align-items-center gap-2 shadow-sm px-3"
          >
            <i className="bi bi-plus-circle"></i>
            <span>Add Employee</span>
          </Button>
        </div>
      </div>

      {/* Filters Card */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-3">
          <Row className="g-3 align-items-center">
            {/* Search input */}
            <Col xs={12} md={5}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 text-muted">
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, email, role, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 ps-0"
                />
                {searchTerm && (
                  <Button
                    variant="outline-secondary"
                    className="border-start-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="bi bi-x"></i>
                  </Button>
                )}
              </InputGroup>
            </Col>

            {/* Department Filter */}
            <Col xs={6} md={3}>
              <Form.Select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter by department"
              >
                <option value="all">All Departments</option>
                <option value="HR">HR</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="security">Security</option>
              </Form.Select>
            </Col>

            {/* Status Filter */}
            <Col xs={6} md={2}>
              <Form.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="terminated">Terminated</option>
              </Form.Select>
            </Col>

            {/* Counter */}
            <Col xs={12} md={2} className="text-md-end text-muted small">
              <span className="fw-semibold text-dark">{filteredEmployees.length}</span> of{" "}
              {employees.length} employees
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Employee List Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox text-muted" style={{ fontSize: "3rem" }}></i>
            <h5 className="mt-3 text-secondary">No Employees Found</h5>
            <p className="text-muted small mb-3">
              {searchTerm || selectedDept !== "all" || selectedStatus !== "all"
                ? "Try adjusting your search query or filters."
                : "Your employee directory is currently empty."}
            </p>
            {employees.length === 0 && (
              <Button as={Link} to="/add-employee" variant="primary" size="sm">
                <i className="bi bi-plus-lg me-1"></i> Add First Employee
              </Button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light text-muted small text-uppercase">
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "24%" }}>Employee</th>
                  <th style={{ width: "8%" }}>Emp ID</th>
                  <th style={{ width: "15%" }}>Designation</th>
                  <th style={{ width: "10%" }}>Department</th>
                  <th style={{ width: "10%" }}>Salary</th>
                  <th style={{ width: "10%" }}>Status</th>
                  <th style={{ width: "10%" }}>Mobile</th>
                  <th style={{ width: "8%" }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => {
                  const initials = (emp.name || "?")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={emp._id || index}>
                      <td className="text-muted small">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="avatar-circle">{initials}</span>
                          <div>
                            <div className="fw-semibold text-dark">{emp.name}</div>
                            <small className="text-muted d-block text-truncate" style={{ maxWidth: 200 }}>
                              {emp.email}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          #{emp.emp_Id}
                        </span>
                      </td>
                      <td className="fw-medium text-secondary">{emp.designation}</td>
                      <td>{renderDeptBadge(emp.department)}</td>
                      <td className="fw-semibold text-dark">
                        ₹{Number(emp.salary || 0).toLocaleString("en-IN")}
                      </td>
                      <td>{renderStatusBadge(emp.status)}</td>
                      <td className="text-secondary small">{emp.mobile}</td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            title="View Details"
                            onClick={() => setViewTarget(emp)}
                          >
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            title="Edit Employee"
                            onClick={() => handleOpenEdit(emp)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            title="Delete Employee"
                            onClick={() => handleOpenDelete(emp)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Card>

      {/* VIEW DETAILS MODAL */}
      <Modal show={Boolean(viewTarget)} onHide={() => setViewTarget(null)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Employee Details</Modal.Title>
        </Modal.Header>
        {viewTarget && (
          <Modal.Body className="pt-2">
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-3">
              <div
                className="avatar-circle"
                style={{ width: 52, height: 52, fontSize: "1.25rem" }}
              >
                {(viewTarget.name || "?").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h5 className="mb-0 fw-bold text-dark">{viewTarget.name}</h5>
                <span className="text-muted small">{viewTarget.designation}</span>
              </div>
            </div>

            <Row className="g-3">
              <Col xs={6}>
                <small className="text-muted d-block">Employee ID</small>
                <strong className="text-dark">#{viewTarget.emp_Id}</strong>
              </Col>
              <Col xs={6}>
                <small className="text-muted d-block">Department</small>
                {renderDeptBadge(viewTarget.department)}
              </Col>
              <Col xs={6}>
                <small className="text-muted d-block">Email Address</small>
                <span className="text-dark">{viewTarget.email}</span>
              </Col>
              <Col xs={6}>
                <small className="text-muted d-block">Mobile Number</small>
                <span className="text-dark">{viewTarget.mobile}</span>
              </Col>
              <Col xs={6}>
                <small className="text-muted d-block">Salary</small>
                <strong className="text-success">
                  ₹{Number(viewTarget.salary || 0).toLocaleString("en-IN")}
                </strong>
              </Col>
              <Col xs={6}>
                <small className="text-muted d-block">Employment Status</small>
                {renderStatusBadge(viewTarget.status)}
              </Col>
            </Row>
          </Modal.Body>
        )}
        <Modal.Footer className="border-0">
          <Button variant="secondary" size="sm" onClick={() => setViewTarget(null)}>
            Close
          </Button>
          {viewTarget && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const emp = viewTarget;
                setViewTarget(null);
                handleOpenEdit(emp);
              }}
            >
              <i className="bi bi-pencil-square me-1"></i> Edit Details
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* EDIT EMPLOYEE MODAL */}
      <Modal show={Boolean(editTarget)} onHide={() => setEditTarget(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-5">
            <i className="bi bi-pencil-square me-2 text-primary"></i> Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveEdit}>
          <Modal.Body>
            <Alert variant="info" className="py-2 small">
              <i className="bi bi-info-circle me-1"></i>
              Updating employee info for <strong>{editTarget?.name}</strong> (Emp #{editTarget?.emp_Id}).
            </Alert>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                isInvalid={Boolean(editFormErrors.name)}
                placeholder="Enter full name"
              />
              <Form.Control.Feedback type="invalid">
                {editFormErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
                isInvalid={Boolean(editFormErrors.email)}
                placeholder="name@company.com"
              />
              <Form.Control.Feedback type="invalid">
                {editFormErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={editFormData.mobile}
                onChange={handleEditChange}
                isInvalid={Boolean(editFormErrors.mobile)}
                placeholder="10-digit mobile number"
              />
              <Form.Control.Feedback type="invalid">
                {editFormErrors.mobile}
              </Form.Control.Feedback>
            </Form.Group>

            <small className="text-muted d-block">
              <i className="bi bi-shield-check me-1"></i>
              Department ({editTarget?.department}) &amp; Designation are preserved.
            </small>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setEditTarget(null)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-1"></i> Save Changes
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal show={Boolean(deleteTarget)} onHide={() => setDeleteTarget(null)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold text-danger fs-5">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1">
            Are you sure you want to permanently delete employee:
          </p>
          <div className="p-3 bg-light rounded mt-2 border">
            <strong>{deleteTarget?.name}</strong> (Emp #{deleteTarget?.emp_Id})
            <div className="text-muted small">{deleteTarget?.email}</div>
          </div>
          <small className="text-danger mt-2 d-block">
            This action cannot be undone.
          </small>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="outline-secondary"
            onClick={() => setDeleteTarget(null)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Deleting...
              </>
            ) : (
              <>
                <i className="bi bi-trash me-1"></i> Delete Employee
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Employee;