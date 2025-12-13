import React, { useState } from "react";
import "./Services.css";

import ServicesSidebar from "../../Components/Services/ServicesSidebar/ServicesSidebar";
import ServicesList from "../../Components/Services/ServicesList/ServicesList";
import TopBarServices from "../../Components/TopBarServices/TopBarServices";

const Services = () => {
  const [filters, setFilters] = useState({
    category_id: null,
    sous_categorie_id: null,
  });

  return (
    <>
      {/* HERO */}
      <section className="services-hero d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="hero-title">Nos Services</h1>
        </div>
      </section>

      <TopBarServices />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <ServicesSidebar onFilterChange={setFilters} />
          </div>

          <div className="col-lg-9">
            <ServicesList filters={filters} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
