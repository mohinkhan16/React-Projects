import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Employee from "./components/Employee";
import AddEmp from "./components/AddEmp";

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
        element: <AddEmp />,
      },
      {
        path: "add-employee",
        element: <AddEmp />,
      },
      {
        path: "update/:id",
        element: <AddEmp />,
      },
      {
        path: "edit/:id",
        element: <AddEmp />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
