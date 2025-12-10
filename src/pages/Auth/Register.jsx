// src/pages/Register.jsx
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-page">
      <div className="overlay"></div>
      <div className="register-form-container">
        <h2 className="register-title">S'inscrire</h2>

        <form className="register-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom</label>
            <input type="text" className="form-control" id="name" placeholder="Votre nom complet" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Votre email" />
          </div>

          {/* Nouveau champ téléphone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Numéro de téléphone</label>
            <input type="tel" className="form-control" id="phone" placeholder="Votre numéro de téléphone" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" placeholder="Votre mot de passe" />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirmez votre mot de passe" />
          </div>

          <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
        </form>

        <p className="text-center mt-3">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
