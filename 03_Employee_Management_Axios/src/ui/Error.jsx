import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Something went wrong</h1>
      <p>{error?.statusText || error?.message || "An unexpected error occurred."}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default Error;
