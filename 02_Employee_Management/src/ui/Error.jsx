import { Button, Card } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        padding: "20px",
      }}
    >
      <Card
        className="text-center shadow border-0"
        style={{
          maxWidth: "520px",
          width: "100%",
          padding: "40px 30px",
          borderRadius: "16px",
        }}
      >
        <div
          className="fw-bold mb-2"
          style={{
            fontSize: "80px",
            lineHeight: "1",
            color: "#0d6efd",
          }}
        >
          <i className="bi bi-exclamation-triangle-fill text-warning"></i>
        </div>

        <h3 className="fw-bold mt-3">Something Went Wrong</h3>

        <p className="text-muted mt-2 mb-4">
          {error?.statusText ||
            error?.message ||
            "The page you're looking for was not found or an unexpected error occurred."}
        </p>

        <div>
          <Button
            as={Link}
            to="/"
            variant="primary"
            className="px-4 py-2 fw-medium shadow-sm"
          >
            <i className="bi bi-house-door me-2"></i>
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Error;