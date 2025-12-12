<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
=======
// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await api.post("/login", { 
      username: email,
      password
    });

    const token = response.data.access_token;

    login(token); // نحفظ token فقط

    toast.success("Connexion réussie");

    window.location.href = "/admin/dashboard"; // إعادة التوجيه إلى لوحة الادمن

  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erreur inconnue");
      }
    } else {
      toast.error("Problème de connexion au serveur");
    }
  }

  setLoading(false);
};
=======
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const userData = response.data.user;
      const token = response.data.token;

      login(userData, token);

      if (userData.role === "superadmin" || userData.role === "admin") {
        toast.success("Connexion réussie");
        window.location.href = "/admin/dashboard";
      } else{
        toast.success("Connexion réussie");
        window.location.href = "/client/profile";
      }

    } catch (error) {

      if (error.response) {

        // 1. validation errors — 422
        if (error.response.status === 422) {
          const validationErrors = error.response.data.errors;

          Object.keys(validationErrors).forEach((field) => {
            toast.error(validationErrors[field][0]); 
          });
        }

        // 2. wrong email/password — 401
        else if (error.response.status === 401) {
          toast.error(error.response.data.message);
        }

        else {
          toast.error("Erreur inconnue");
        }
      } else {
        toast.error("Problème de connexion au serveur");
      }
    }

    setLoading(false);
  };
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

  return (
    <div className="login-page">
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
      <div className="login-form-container">
        <h2 className="login-title">Se connecter</h2>

        <form className="login-form" onSubmit={handleLogin}>
<<<<<<< HEAD
          {/* EMAIL */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Votre nom d'utilisateur"
=======
          
          {/* EMAIL */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Votre email"
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
<<<<<<< HEAD
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
=======
            <label htmlFor="password" className="form-label">Mot de passe</label>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
<<<<<<< HEAD
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
=======

            <small className="text-end d-block mt-1">
              <Link to="/forgot-password" data-bs-toggle="tooltip">
                Mot de passe oublié ?
              </Link>
            </small>
          </div>

          {/* BUTTON */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
