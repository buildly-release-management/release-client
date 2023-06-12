import React from "react";
import Button from "react-bootstrap/Button";
import "./Button.css";

const CustomButton = ({ label = "", variant = "primary" }) => {
  return (
    <>
      <Button variant={variant}>{label}</Button>
    </>
  );
};

export default CustomButton;

// const Button = ({ label, size }) => {
//   return <button className="button">{{ label }}</button>;
// };
//
// Button.propTypes = {
//   size: PropTypes.oneOf(["medium", "large"]),
//   label: PropTypes.string.isRequired,
// };
//
// Button.defaultProps = {
//   label: "Options",
// };
//
// export default Button;
