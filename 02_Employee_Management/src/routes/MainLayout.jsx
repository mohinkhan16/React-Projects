import { Outlet } from "react-router-dom";
import NavbarComponent from "../ui/Navbar";
import { Container } from "react-bootstrap";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />

      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className="py-3 bg-white border-top text-center text-muted small mt-auto">
        <Container>
          Employee Management System &bull; Powered by React, React-Bootstrap &amp; Axios
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout;