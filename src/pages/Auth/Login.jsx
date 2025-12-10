// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      const userData = response.data.user;
      const token = response.data.token;

      // 🔥 Enregistre user + token dans AuthContext
      login(userData, token);

      // 🔥 Redirection selon rôle
      if (userData.role === "superadmin") {
        window.location.href = "/admin/dashboard";
      } else if (userData.role === "client") {
        window.location.href = "/client/profile";
      } else {
        window.location.href = "/";
      }

    } catch (error) {
      console.log(error);
      alert("Email ou mot de passe incorrect.");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>
      <div className="login-form-container">
        <h2 className="login-title">Se connecter</h2>

        <form className="login-form" onSubmit={handleLogin}>
          
          {/* EMAIL */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <small className="text-end d-block mt-1">
              <Link to="/forgot-password" data-bs-toggle="tooltip">
                Mot de passe oublié ?
              </Link>
            </small>
          </div>

          {/* BUTTON */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center mt-3">
          Pas encore inscrit ? <Link to="/register">S'enregistrer</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
