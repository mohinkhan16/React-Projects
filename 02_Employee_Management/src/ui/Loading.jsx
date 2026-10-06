
import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Spinner
        animation="border"
        variant="primary"
        style={{
          width: "55px",
          height: "55px",
        }}
      />

      <h5 className="mt-4 fw-semibold">Loading...</h5>

      <p className="text-muted">
        Please wait while we load your data.
      </p>
    </div>
  );
};

export default Loading;