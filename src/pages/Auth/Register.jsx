<<<<<<< HEAD
=======
// src/pages/Register.jsx
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
<<<<<<< HEAD

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
=======
import api from "../../api/api";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 🔑 Utiliser AuthContext
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        form
      );

      if (response.data.status === 201) {
        toast.success(response.data.message);

        // Connexion automatique si user + token
        if (response.data.user && response.data.token) {
          login(response.data.user, response.data.token);
        }

        navigate("/"); // Redirection vers Home
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'inscription. Vérifiez vos informations.");
=======
      const response = await api.post("/register", form);

      if (response.data.status === 201) {
        toast.success(response.data.message); 
        navigate("/login"); // Redirection vers Home
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Erreur lors de l'inscription");
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="overlay"></div>
<<<<<<< HEAD

      {/* BOUTON RETOUR */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        &larr;
      </button>

=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      <div className="register-form-container">
        <h2 className="register-title">S'inscrire</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom</label>
<<<<<<< HEAD
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Votre nom complet"
              value={form.name}
              onChange={handleChange}
              required
            />
=======
            <input type="text" className="form-control" id="name" placeholder="Votre nom complet" value={form.name} onChange={handleChange} required />
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
<<<<<<< HEAD
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              required
            />
=======
            <input type="email" className="form-control" id="email" placeholder="Votre email" value={form.email} onChange={handleChange} required />
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Numéro de téléphone</label>
<<<<<<< HEAD
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Votre numéro de téléphone"
              value={form.phone}
              onChange={handleChange}
              required
            />
=======
            <input type="tel" className="form-control" id="phone" placeholder="Votre numéro de téléphone" value={form.phone} onChange={handleChange} required />
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
<<<<<<< HEAD
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Votre mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />
=======
            <input type="password" className="form-control" id="password" placeholder="Votre mot de passe" value={form.password} onChange={handleChange} required />
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          </div>

          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">Confirmer le mot de passe</label>
<<<<<<< HEAD
            <input
              type="password"
              className="form-control"
              id="password_confirmation"
              placeholder="Confirmez votre mot de passe"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
=======
            <input type="password" className="form-control" id="password_confirmation" placeholder="Confirmez votre mot de passe" value={form.password_confirmation} onChange={handleChange} required />
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
