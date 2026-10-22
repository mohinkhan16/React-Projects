import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px 0", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
      <Link to="/" style={{ fontWeight: "bold", marginRight: "20px" }}>
        Employee Management System
      </Link>
      <Link to="/" style={{ marginRight: "15px" }}>Employee</Link>
      <Link to="/add">Add Employee</Link>
    </nav>
  );
}

export default Navbar;
