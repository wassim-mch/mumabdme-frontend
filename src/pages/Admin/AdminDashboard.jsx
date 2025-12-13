// src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState({
    categories: 0,
    services: 0,
    rdvs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!token) {
    toast.error("Vous devez être connecté pour voir ce tableau de bord.");
    setLoading(false);
    return;
  }

  const fetchStats = async () => {
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const [resCategories, resServices, resRdvs] = await Promise.all([
        api.get("/categories", axiosConfig),
        api.get("/services", axiosConfig),
        api.get("/rdvs", axiosConfig),
      ]);

      setStats({
        categories: resCategories.data.data?.length || 0,
        services: resServices.data.services?.length || 0,
        rdvs: resRdvs.data.data?.length || 0,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la récupération des statistiques !");
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, [token]);


  if (loading) {
    return <p className="text-center py-5">Chargement des statistiques...</p>;
  }

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ fontWeight: 700, fontSize: "2.5rem", marginBottom: "1rem", textAlign: 'center' }}>
        Bienvenue ADMIN
      </h1>

      <p style={{ fontSize: "1.2rem", maxWidth: "700px", lineHeight: "1.6", margin: '0 auto', textAlign: 'center' }}>
        Ce tableau de bord vous permet de gérer et de suivre l’ensemble des activités 
        de la plateforme. Vous pouvez consulter le nombre de catégories, services 
        proposés, ainsi que les rendez-vous confirmés.  
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        {/* Card Categories */}
        <div style={cardStyle}>
          <h2>{stats.categories}</h2>
          <p>Catégories</p>
        </div>

        {/* Card Services */}
        <div style={cardStyle}>
          <h2>{stats.services}</h2>
          <p>Services</p>
        </div>

        {/* Card Rendez-vous */}
        <div style={cardStyle}>
          <h2>{stats.rdvs}</h2>
          <p>Rendez-vous</p>
        </div>
      </div>
    </div>
  );
};

// Style réutilisable pour les cards
const cardStyle = {
  backgroundColor: "#f8f9fa",
  padding: "20px 40px",
  borderRadius: "12px",
  textAlign: "center",
  minWidth: "150px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

export default AdminDashboard;
