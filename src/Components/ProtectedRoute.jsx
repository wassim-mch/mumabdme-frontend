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