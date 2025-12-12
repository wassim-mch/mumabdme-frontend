// src/pages/ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);

        // 🟦 Convertir le prix en number
        const fixedService = {
          ...res.data.service,
          price: Number(res.data.service.price)
        };

        setService(fixedService);
        setMainImage(`http://localhost:8000/storage/${fixedService.image}`);

        // Récupérer les autres services
        const resOther = await api.get(`/services?exclude=${id}&limit=4`);

        // 🟦 Convertir les prix aussi pour les autres services
        const fixedOthers = resOther.data.services.map(s => ({
          ...s,
          price: Number(s.price)
        }));

        setOtherServices(fixedOthers);

      } catch (err) {
        console.error("Erreur chargement service :", err);
        toast.error("Erreur lors du chargement du service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === service.id);
    if (exists) {
      toast.info("Ce service est déjà dans votre panier");
      return;
    }

    // 🟦 Ajouter service avec prix corrigé
    cart.push({
      id: service.id,
      name: service.name,
      price: Number(service.price),
      image: service.image,
      quantity: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Service ajouté au panier 🛒");
  };

  if (loading) return <p className="text-center py-5">Chargement...</p>;
  if (!service)
    return <p className="text-center py-5 text-danger">Service introuvable</p>;

  return (
    <div className="container py-5">
      {/* 🔙 Retour */}
      <Link to="/services" className="btn btn-outline-secondary mb-4">
        ← Retour aux services
      </Link>

      <div className="row g-4">
        {/* 🖼️ Image principale */}
        <div className="col-lg-6">
          <img
            src={mainImage}
            className="img-fluid rounded shadow mb-3"
            alt={service.name}
          />

          {/* 📸 Galerie */}
          {service.galleries?.length > 0 && (
            <div className="d-flex flex-wrap gap-2">
              {service.galleries.map((img) => (
                <img
                  key={img.id}
                  src={`http://localhost:8000/storage/${img.path}`}
                  className="gallery-thumb rounded"
                  alt="gallery"
                  style={{
                    cursor: "pointer",
                    border: mainImage.includes(img.path)
                      ? "2px solid #007bff"
                      : "1px solid #ddd",
                  }}
                  onClick={() =>
                    setMainImage(`http://localhost:8000/storage/${img.path}`)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* 📝 Infos */}
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3">{service.name}</h2>
          <p className="text-muted">{service.description}</p>

          <h5 className="mt-3">Catégorie :</h5>
          <span className="badge bg-info fs-6">{service.category.name}</span>

          <h5 className="mt-4">Jours Disponibles :</h5>
          <div className="d-flex flex-wrap gap-2">
            {service.jours_disponibles.map((j) => (
              <span key={j.id} className="badge bg-primary">
                {j.day}
              </span>
            ))}
          </div>

          {/* 🟦 Prix en nombre */}
          <h4 className="mt-4 fw-bold">{Number(service.price)} DA</h4>
          <p className="text-secondary">⏳ Durée : {service.duration}</p>

          <button
            className="btn btn-dark btn-lg mt-4 w-100 shadow-sm"
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* 🔹 Autres services */}
      {otherServices.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Découvrez d'autres services</h3>
          <div className="row g-3">
            {otherServices.map((s) => (
              <div key={s.id} className="col-6 col-md-4 col-lg-3">
                <Link to={`/services/${s.id}`} className="text-decoration-none">
                  <div className="card h-100 shadow-sm service-card">
                    <img
                      src={`http://localhost:8000/storage/${s.image}`}
                      className="card-img-top"
                      alt={s.name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-dark">{s.name}</h5>

                      {/* 🟦 Prix corrigé */}
                      <p className="text-primary fw-bold mt-auto">
                        {Number(s.price)} DA
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
