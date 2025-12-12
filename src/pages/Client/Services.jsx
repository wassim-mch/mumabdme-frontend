import React, { useState } from "react";
import "./Services.css";
<<<<<<< HEAD

import ServicesSidebar from "../../Components/Services/ServicesSidebar/ServicesSidebar";
import ServicesList from "../../Components/Services/ServicesList/ServicesList";
import TopBarServices from "../../Components/TopBarServices/TopBarServices";
=======
import ServicesSidebar from "../../Components/Services/ServicesSidebar/ServicesSidebar"; // Sidebar filtre
import ServicesList from "../../Components/Services/ServicesList/ServicesList"; 
import ServiceCard from "../../Components/Services/ServiceCard/ServiceCard";    
      // Liste des services avec pagination
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

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

<<<<<<< HEAD
      {/* 🔵 TOP BAR SCROLLING TEXT */}
      <TopBarServices />

      {/* 🔵 SIDEBAR + SERVICES */}
      <div className="container py-5">
        <div className="row">

          {/* Sidebar */}
=======
      {/* 🔵 SIDEBAR + LISTE SERVICES */}
      <div className="container py-5">
        <div className="row">

          {/* Sidebar filtre */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          <div className="col-lg-3 mb-4">
            <ServicesSidebar onFilterChange={setFilters} />
          </div>

<<<<<<< HEAD
          {/* Liste */}
=======
          {/* Liste des services */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          <div className="col-lg-9">
            <ServicesList filters={filters} />
          </div>

        </div>
      </div>
    </>
  );
};

export default Services;
