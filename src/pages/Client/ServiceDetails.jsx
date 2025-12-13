// src/pages/ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/service/${id}`);
        if (!res.data.service) {
          toast.error("Service introuvable");
          setLoading(false);
          return;
        }

        const serviceData = res.data.service; // بيانات الخدمة من API

        const fixedService = {
          ...serviceData,
          price: Number(serviceData.prix),
          duration: serviceData.duree,
        };

        setService(fixedService);
        setMainImage(`http://localhost:8000/storage/${fixedService.image}`);

        // جلب خدمات أخرى
        const resOther = await api.get(`/service`);
        const fixedOthers = resOther.data.services.map(s => ({
          ...s,
          price: Number(s.prix),
          duration: s.duree
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

  if (loading) return <p className="text-center py-5">Chargement...</p>;
  if (!service) return <p className="text-center py-5 text-danger">Service introuvable</p>;

  return (
    <div className="container py-5">
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
          <span className="badge bg-info fs-6">{service.categorie?.name || "Non définie"}</span>

          <h5 className="mt-4">Sous-Catégorie :</h5>
          <span className="badge bg-secondary fs-6">{service.sous_categorie?.name || "-"}</span>

          <h5 className="mt-4">Jours Disponibles :</h5>
          <div className="d-flex flex-wrap gap-2">
            {service.jours_disponibles?.map((j) => (
              <span key={j.id} className="badge bg-primary">{j.day}</span>
            ))}
          </div>

          <h4 className="mt-4 fw-bold">{service.price} DA</h4>
          <p className="text-secondary">Durée : {service.duration} Heure</p>

          {/* Options */}
          {service.options?.length > 0 && (
            <div className="mt-3">
              <h5>Options :</h5>
              {service.options.map(opt => (
                <div key={opt.id} className="border p-2 rounded mb-2">
                  <strong>{opt.name}</strong> - {opt.description} <br />
                  Prix séance : {Number(opt.prix_seance)} DA, 4 séances : {Number(opt.abonnement_quatre_seance)} DA, 8 séances : {Number(opt.abonnement_huit_seance)} DA
                </div>
              ))}
            </div>
          )}
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
                      <p className="text-primary fw-bold mt-auto">{s.price} DA</p>
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
