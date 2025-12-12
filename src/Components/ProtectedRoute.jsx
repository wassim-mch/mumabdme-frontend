<<<<<<< HEAD
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
=======
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useContext(AuthContext);

  // 1️⃣ Si pas connecté → redirection login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Si une restriction de rôle existe → vérifier
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Autorisé → afficher la page demandée
  return children;
};

export default ProtectedRoute;
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
