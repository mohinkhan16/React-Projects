import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2>Employee Management System</h2>
      <div>
        <NavLink to="/">
          <button type="button">Dashboard</button>
        </NavLink>{" "}
        <NavLink to="/add">
          <button type="button">Add Employee</button>
        </NavLink>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
