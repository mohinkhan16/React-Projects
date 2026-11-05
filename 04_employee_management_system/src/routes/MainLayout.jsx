
import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <h1>Employee Management System</h1>

      <nav>
        <Link to="/">Employees</Link>
        {" | "}
        <Link to="/add">Add Employee</Link>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default MainLayout;
