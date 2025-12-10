// src/components/Button.jsx
import React from "react";
import "./btncnx.css";

const Button = ({ children }) => {
  return <button className="custom-btn">{children}</button>;
};

export default Button;
