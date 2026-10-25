import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <hr />
      <footer>
        <p>© {new Date().getFullYear()} Employee Management System | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default MainLayout;
