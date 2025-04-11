import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const NoResult = ({message}) => {
  return (
    <div className="mx-auto mt-3">
      <Alert variant="danger" className="text-start mb-0">
        {message}
      </Alert>
    </div>
  );
};

NoResult.defaultProps = {
  message: PropTypes.string.isRequired,
};

export default NoResult;

