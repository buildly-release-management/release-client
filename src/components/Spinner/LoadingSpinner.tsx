import "./LoadingSpinner.css";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
  return <Spinner animation="grow" variant="primary" />;
};

LoadingSpinner.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.array.isRequired,
};

export default LoadingSpinner;
