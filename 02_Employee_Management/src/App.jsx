import React from "react";
import AddEmployee from "./components/AddEmployee";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./ui/Error";
import MainLayout from "./routes/MainLayout";
import Employee from "./components/Employee";

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
        },{
          path:"add-employee",
          element:<AddEmployee/>
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;