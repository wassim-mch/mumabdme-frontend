<<<<<<< HEAD
// src/Components/aboutsection/btnsimple/btnsimple.jsx
=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import React from "react";
import "./btnsimple.css";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
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
=======
const Btnsimple = ({ text, to, onClick, extraClass }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`custom-btn ${extraClass || ""}`}
      onClick={onClick}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    >
      {text}
    </button>
  );
};

<<<<<<< HEAD
export default BtnSimple;
=======
export default Btnsimple;
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
