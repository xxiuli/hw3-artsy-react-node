import { Alert } from "react-bootstrap";

const NoResult = () => {
  return (
    <div className="mx-auto mt-3">
      <Alert variant="danger" className="text-center mb-0">
        No results.
      </Alert>
    </div>
  );
};

export default NoResult;

