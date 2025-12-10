// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <div className="overlay"></div>
      <div className="login-form-container">
        <h2 className="login-title">Se connecter</h2>

        <form className="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Votre email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" placeholder="Votre mot de passe" />
            <small className="text-end d-block mt-1">
              <Link to="/forgot-password" data-bs-toggle="tooltip" title="Réinitialiser votre mot de passe">
                Mot de passe oublié ?
              </Link>
            </small>
          </div>

          <button type="submit" className="btn btn-primary w-100">Se connecter</button>
        </form>

        <p className="text-center mt-3">
          Pas encore inscrit ? <Link to="/register">S'enregistrer</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
