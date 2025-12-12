import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./ServicePage.css";
import api from "../../api/api";

const ServicePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    api
      .get(`/services/${serviceId}`)
      .then((res) => setService(res.data.service))
      .catch(() => toast.error("Erreur lors du chargement du service"));
  }, [serviceId]);

  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === service.id);
    if (existingItem) {
      toast.error("Service déjà dans le panier");
    } else {
      cart.push(service);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Service ajouté au panier 🛒");
      window.dispatchEvent(new Event("cartUpdated"));

    }
  };

  if (!service) return <div className="text-center py-5">Chargement...</div>;

  // كل الصور: الرئيسية + gallery
  const allImages = [
    service.image,
    ...service.galleries.map((g) => g.path)
  ];

  return (
    <div className="container py-5">

      <div className="row g-4">
        {/* ---- CAROUSEL ---- */}
        <div className="col-md-6">
          <div id="serviceCarousel" className="carousel slide shadow rounded" data-bs-ride="carousel">
            <div className="carousel-inner rounded">

              {allImages.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={`http://localhost:8000/storage/${img}`}
                    className="d-block w-100 service-carousel-img"
                    alt="Service"
                  />
                </div>
              ))}

            </div>

            {/* Buttons Prev/Next */}
            {allImages.length > 1 && (
              <>
                <button className="carousel-control-prev" type="button" data-bs-target="#serviceCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#serviceCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* ---- Infos ----- */}
        <div className="col-md-6">
          <h2 className="fw-bold">{service.name}</h2>
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

          <h4 className="mt-4 fw-bold">{service.price} DA</h4>
          <p className="text-secondary">⏳ Durée : {service.duration}</p>

          <button className="btn btn-dark btn-lg mt-4 w-100 shadow-sm" onClick={handleAddToCart}>
             Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
