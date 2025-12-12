import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import "./ServicesSidebar.css"; // 👉 Style séparé


const ServicesSidebar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    onFilterChange({
      category: selectedCategory ? parseInt(selectedCategory) : null,
      price: priceRange,
    });
  }, [selectedCategory, priceRange]);

  return (
    <div className="sidebar-custom">
      <h5 className="title">Catégories</h5>

      <ul className="category-list">
        {(categories || []).map((cat) => (
          <li key={cat.id} className="category-item">
            <label className="custom-radio">
              <input
                type="radio"
                name="category"
                value={cat.id}
                checked={selectedCategory === cat.id.toString()}
                onChange={() => setSelectedCategory(cat.id.toString())}
              />
              <span className="radio-mark"></span>
              {cat.name}
            </label>
          </li>
        ))}

        <li className="category-item">
          <label className="custom-radio">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={() => setSelectedCategory("")}
            />
            <span className="radio-mark"></span>
            Tous
          </label>
        </li>
      </ul>

      <h5 className="title mt-4">Prix</h5>

      <div className="price-wrapper">
        <input
          type="range"
          min="0"
          max="30000"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="range-input"
        />
        <input
          type="range"
          min="0"
          max="30000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="range-input"
        />

        <div className="d-flex justify-content-between mt-2">
          <span className="price-label">{priceRange[0]} DA</span>
          <span className="price-label">{priceRange[1]} DA</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesSidebar;
