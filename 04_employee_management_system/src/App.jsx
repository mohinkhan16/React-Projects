import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Employee from "./components/Employee";
import EmployeeForm from "./components/EmployeeForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Employee />,
      },
      {
        path: "add",
        element: <EmployeeForm />,
      },
      {
        path: "add-employee",
        element: <EmployeeForm />,
      },
      {
        path: "update/:id",
        element: <EmployeeForm />,
      },
      {
        path: "edit/:id",
        element: <EmployeeForm />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
