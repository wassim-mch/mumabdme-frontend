
import React from "react";
import "./btnsimple.css";
import { useNavigate } from "react-router-dom";

const BtnSimple = ({ text, to, extraClass, disabled, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;

    if (onClick) {
      onClick();           // 🔥 Exécute la fonction si elle existe
    } else if (to) {
      navigate(to);        // 🔥 Sinon navigue vers "to"
    }
  };

  return (
    <button
      className={`custom-btn ${extraClass || ""}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default BtnSimple;

