import React, { useState } from "react";
import ServicesSidebar from "./ServicesSidebar";
import ServicesList from "./ServicesList";

const ServicesPage = () => {
  const [filters, setFilters] = useState({ category: null, price: [0, 10000] });

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-3">
          <ServicesSidebar onFilterChange={setFilters} />
        </div>

        <div className="col-md-9">
          <ServicesList filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
