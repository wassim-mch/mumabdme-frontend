import React from "react";
<<<<<<< HEAD
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
=======
import { useNavigate } from "react-router-dom";
import "./ServiceCard.css";

const ServiceCard = ({ service, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(service); // إذا بعثت دالة كـ prop
    } else {
      navigate(`/service/${service.id}`); // الافتراضي: يروح لصفحة الخدمة
    }
  };

  return (
    <div
      className="card service-card h-100"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={service.image ? `http://localhost:8000/storage/${service.image}` : "/placeholder.png"}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        className="card-img-top"
        alt={service.name}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{service.name}</h5>

<<<<<<< HEAD
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
=======
        {/* 🟦 Badges تاع الأيام */}
        <div className="mb-2">
          {service.jours_disponibles && service.jours_disponibles.length > 0 ? (
            service.jours_disponibles.map((j) => (
              <span key={j.id} className="badge bg-primary me-1 mb-1">
                {j.day}
              </span>
            ))
          ) : (
            <span className="badge bg-secondary">No days</span>
          )}
        </div>

        <span className="mt-auto fw-bold">{service.price} DA</span>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      </div>
    </div>
  );
};

export default ServiceCard;
