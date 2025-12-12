import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import api from "../../../api/api";

const ServicesList = ({ filters }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await api.get("/services", {
          params: {
            category_id: filters.category,
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

  const handleReserve = (service, selectedOption) => {
    // Redirige vers la page détails
    navigate(`/services/${service.id}`, {
      state: { selectedOption: selectedOption || null },
    });
  };

  if (loading) return <p>Chargement des services...</p>;

  if (services.length === 0)
    return <p className="text-center">Aucun service trouvé</p>;

  return (
    <div className="row g-4">
      {services.map((service) => (
        <div key={service.id} className="col-md-4">
          <div className="card h-100 shadow-sm">
            <img
              src={
                service.image
                  ? `http://localhost:8000/storage/${service.image}`
                  : "/placeholder.png"
              }
              className="card-img-top"
              alt={service.name}
              style={{ height: "180px", objectFit: "contain" }}
            />

            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text text-truncate" style={{ maxHeight: "3em" }}>
                {service.description}
              </p>

              {/* Options si présentes */}
              {service.options?.length > 0 && (
                <select
                  className="form-select mb-2"
                  defaultValue=""
                  onChange={(e) => {
                    service.selectedOption = e.target.value;
                  }}
                >
                  <option value="">Choisir une option</option>
                  {service.options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name} (+{opt.price} DA)
                    </option>
                  ))}
                </select>
              )}

              
             <button
  className="btn btn-primary mt-auto d-flex align-items-center justify-content-center gap-2"
  style={{ backgroundColor: "#c57d5c" }}
  onClick={() => handleReserve(service, service.selectedOption)}
>
  <FaShoppingCart />
  Réserver
</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
