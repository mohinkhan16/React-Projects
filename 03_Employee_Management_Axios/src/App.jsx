import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./ui/Error";
import MainLayout from "./routes/MainLayout";
import Employee from "./components/Employee";
import AddEmployee from "./components/AddEmployee";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Employee />,
        },
        {
          path: "employee",
          element: <Employee />,
        },
        {
          path: "add",
          element: <AddEmployee />,
        },
        {
          path: "add-employee",
          element: <AddEmployee />,
        },
        {
          path: "update/:id",
          element: <AddEmployee />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
