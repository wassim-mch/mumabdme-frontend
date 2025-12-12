import React, { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import api from "../../../api/api";

const ServicesList = ({ filters }) => {
  const [services, setServices] = useState({ data: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 4;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await api.get("/services", {
          params: {
            category_id: filters.category,
            min_price: filters.price[0],
            max_price: filters.price[1],
            page: currentPage,
          },
        });

        setServices({
          data: res.data.services || [],
          total: res.data.total || res.data.services?.length || 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [filters, currentPage]);

  const totalPages = Math.ceil((services.total || 0) / servicesPerPage);

  if (loading) return <p>Chargement des services...</p>;

  return (
    <>
      <div className="row g-4">
        {(services.data || []).length > 0 ? (
          (services.data || []).map(service => (
            <div key={service.id} className="col-md-6 col-lg-3">
              <ServiceCard service={service} />
            </div>
          ))
        ) : (
          <p className="text-center">Aucun service trouvé</p>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default ServicesList;
