import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../ui/Navbar";

const MainLayout = () => {
  return (
    <>
      <NavbarComponent />

      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;