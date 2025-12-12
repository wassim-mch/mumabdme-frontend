import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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


  return (
    <div className="login-page">
      <div className="overlay"></div>

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


      <div className="login-form-container">
        <h2 className="login-title">Se connecter</h2>

        <form className="login-form" onSubmit={handleLogin}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
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
