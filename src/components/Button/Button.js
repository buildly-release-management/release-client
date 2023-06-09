import React from "react";
import "./Button.css";
import PropTypes from "prop-types";

const Button = ({ label, size }) => {
  return <button className="button">{{ label }}</button>;
};

Button.propTypes = {
  size: PropTypes.oneOf(["medium", "large"]),
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  label: "Options",
};

export default Button;
