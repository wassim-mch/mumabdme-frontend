import React, { useState } from "react";
import "./Services.css";

import ServicesSidebar from "../../Components/Services/ServicesSidebar/ServicesSidebar";
import ServicesList from "../../Components/Services/ServicesList/ServicesList";
import TopBarServices from "../../Components/TopBarServices/TopBarServices";

const Services = () => {
  const [filters, setFilters] = useState({ category: "", price: [0, 10000] });

  return (
    <>
      {/* 🔵 HERO */}
      <section className="services-hero d-flex flex-column justify-content-center text-center">
        <div className="container">
          <h1 className="hero-title">Nos Services</h1>
        </div>
      </section>

      {/* 🔵 TOP BAR SCROLLING TEXT */}
      <TopBarServices />

      {/* 🔵 SIDEBAR + SERVICES */}
      <div className="container py-5">
        <div className="row">

          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <ServicesSidebar onFilterChange={setFilters} />
          </div>

          {/* Liste */}
          <div className="col-lg-9">
            <ServicesList filters={filters} />
          </div>

        </div>
      </div>
    </>
  );
};

export default Services;
