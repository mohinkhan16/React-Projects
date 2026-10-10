import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom sticky-top py-2 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center text-primary">
          <i className="bi bi-people-fill fs-4 me-2 text-primary"></i>
          <span>Employee<span className="text-dark">Hub</span></span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={({ isActive }) =>
                `fw-medium px-3 ${isActive ? "text-primary fw-semibold" : "text-secondary"}`
              }
            >
              <i className="bi bi-person-lines-fill me-1"></i> Employees
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/add-employee"
              className={({ isActive }) =>
                `fw-medium px-3 ${isActive ? "text-primary fw-semibold" : "text-secondary"}`
              }
            >
              <i className="bi bi-person-plus-fill me-1"></i> Add Employee
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center mt-2 mt-lg-0">
            <Button
              as={Link}
              to="/add-employee"
              variant="primary"
              size="sm"
              className="d-flex align-items-center gap-1 shadow-sm px-3"
            >
              <i className="bi bi-plus-lg"></i>
              <span>New Employee</span>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;