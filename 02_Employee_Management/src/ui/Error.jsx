import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <Card
        className="text-center shadow border-0"
        style={{
          maxWidth: "550px",
          width: "100%",
          padding: "45px 30px",
          borderRadius: "20px",
        }}
      >
        <div
          className="fw-bold"
          style={{
            fontSize: "110px",
            lineHeight: "1",
            color: "#0d6efd",
          }}
        >
          404
        </div>

        <h2 className="fw-bold mt-4">Oops! Page Not Found</h2>

        <p className="text-muted mt-3 mb-4">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Button
          as={Link}
          to="/"
          variant="primary"
          className="px-4 py-2 fw-semibold"
        >
          Back to Home
        </Button>
      </Card>
    </div>
  );
};

export default Error;