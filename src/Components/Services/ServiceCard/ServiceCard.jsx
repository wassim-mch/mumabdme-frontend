import React from "react";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

const ServiceCard = ({ service }) => {
  // Forcer le prix en nombre
  const price = Number(service.price);

  // ✂️ Fonction pour afficher un extrait
  const getExcerpt = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="card service-card h-100">
      <img
        src={
          service.image
            ? `http://localhost:8000/storage/${service.image}`
            : "/placeholder.png"
        }

        className="card-img-top"
        alt={service.name}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{service.name}</h5>

        {/* ✂️ Extrait description */}
        <p className="card-text">
          {getExcerpt(service.description, 40)}
        </p>

        {/* 🔗 Lien vers la page détaillée */}
        <Link
          to={`/services/${service.id}`}
          className="text-primary fw-bold mt-2"
        >
          Lire plus →
        </Link>

        {/* Prix converti en nombre */}
        <span className="mt-auto fw-bold">{price} DA</span>

      </div>
    </div>
  );
};

export default ServiceCard;
