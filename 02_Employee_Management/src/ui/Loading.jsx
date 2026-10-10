import { Spinner, Card } from "react-bootstrap";

const Loading = ({ message = "Loading data..." }) => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5 my-5">
      <Card className="border-0 shadow-sm p-4 text-center" style={{ maxWidth: 360 }}>
        <div className="mb-3">
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
        <h6 className="fw-semibold text-dark mb-1">{message}</h6>
        <small className="text-muted">Please wait while we connect to the server...</small>
      </Card>
    </div>
  );
};

export default Loading;