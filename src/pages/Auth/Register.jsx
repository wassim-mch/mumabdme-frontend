// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 🔑 Utiliser AuthContext
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", form);

      if (response.data.status === 201) {
        alert(response.data.message); // Compte créé avec succès

        // 🔑 Connexion automatique
        // Si ton backend renvoie un token et user après register, utilise-les ici
        // Exemple : response.data.user + response.data.token
        // Ici, on suppose qu’on récupère user et token
        if (response.data.user && response.data.token) {
          login(response.data.user, response.data.token);
        }

        navigate("/"); // Redirection vers Home
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription. Vérifiez vos informations.");
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="overlay"></div>
      <div className="register-form-container">
        <h2 className="register-title">S'inscrire</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom</label>
            <input type="text" className="form-control" id="name" placeholder="Votre nom complet" value={form.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Votre email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Numéro de téléphone</label>
            <input type="tel" className="form-control" id="phone" placeholder="Votre numéro de téléphone" value={form.phone} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" placeholder="Votre mot de passe" value={form.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">Confirmer le mot de passe</label>
            <input type="password" className="form-control" id="password_confirmation" placeholder="Confirmez votre mot de passe" value={form.password_confirmation} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p className="text-center mt-3">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
