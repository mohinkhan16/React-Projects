import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const MainLayout = () => {
  return (
    <div style={{ padding: "10px 20px" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
