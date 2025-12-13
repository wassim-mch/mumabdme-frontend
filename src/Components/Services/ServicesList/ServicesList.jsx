import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import api from "../../../api/api";
import "./ServicesList.css";

const ServicesList = ({ filters }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOptions, setOpenOptions] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await api.get("/service", {
          params: {
            category_id: filters?.category_id,
            sous_categorie_id: filters?.sous_categorie_id,
          },
        });
        setServices(res.data.services || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [filters]);

  if (loading) return <p className="text-center py-5">Chargement des services...</p>;
  if (services.length === 0) return <p className="text-center py-5">Aucun service trouvé</p>;

  const goToServiceDetails = (serviceId, option = null) => {
    // Navigation vers la page détails
    navigate(`/service/${serviceId}`, { state: { selectedOption: option } });
  };

  return (
    <div className="row g-4 services-grid">
      {services.map((service) => {
        const isOpen = openOptions === service.id;

        return (
          <div key={service.id} className="col-md-4">
            <div className="service-card d-flex flex-column">
              {/* IMAGE */}
              <img
                src={service.image ? `http://localhost:8000/storage/${service.image}` : "/placeholder.png"}
                alt={service.name}
                className="service-image"
              />

              {/* CONTENU */}
              <div className="service-body d-flex flex-column flex-grow-1">
                <h5 className="service-title">{service.name}</h5>
                <p className="service-desc">{service.description}</p>

                {/* BOUTON LIRE PLUS */}
                <button className="btn-link-custom" onClick={() => goToServiceDetails(service.id)}>
                  Lire plus
                </button>

                {/* BOUTON RÉSERVER + OPTIONS */}
                <div className="service-footer mt-auto d-flex gap-2">
                  <button
                    className="btn-reserver flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => goToServiceDetails(service.id)}
                  >
                    <FaShoppingCart />
                    <span>Réserver</span>
                  </button>

                  {service.options?.length > 0 && (
                    <button className="btn-option-square" onClick={() => setOpenOptions(isOpen ? null : service.id)}>
                      ⚙
                    </button>
                  )}
                </div>

                {/* OPTIONS COCHABLES */}
                {isOpen && service.options?.length > 0 && (
                  <div className="options-checkbox mt-2">
                    {service.options.map((opt) => (
                      <label key={opt.id} className="option-label" onClick={() => goToServiceDetails(service.id, opt)}>
                        <input type="checkbox" /> {opt.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesList;
