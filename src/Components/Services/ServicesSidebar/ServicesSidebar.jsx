import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import "./ServicesSidebar.css";

const ServicesSidebar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    onFilterChange({
      category: selectedCategory ? parseInt(selectedCategory) : null,
    });
  }, [selectedCategory]);

  const handleCategoryClick = (cat) => {
    if (cat.subcategories?.length > 0) {
      setExpandedCategory(expandedCategory === cat.id ? null : cat.id);
    } else {
      setSelectedCategory(cat.id.toString());
      setExpandedCategory(null);
    }
  };

  const handleSubcategoryClick = (sub, parentId) => {
    setSelectedCategory(sub.id.toString());
    setExpandedCategory(parentId);
  };

  return (
    <div className="sidebar-custom">
      <h5 className="title">Catégories</h5>

      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={`category-item ${
              selectedCategory === cat.id.toString() ? "selected-category" : ""
            }`}
          >
            <div
              className="custom-radio"
              onClick={() => handleCategoryClick(cat)}
            >
              <span>{cat.name}</span>
              {cat.subcategories?.length > 0 && (
                <span>{expandedCategory === cat.id ? "▲" : "▼"}</span>
              )}
            </div>

            {cat.subcategories?.length > 0 && (
              <ul
                className={`subcategory-list ${
                  expandedCategory === cat.id ? "open" : ""
                }`}
              >
                {cat.subcategories.map((sub) => (
                  <li
                    key={sub.id}
                    className={`category-item ${
                      selectedCategory === sub.id.toString()
                        ? "selected-category"
                        : ""
                    }`}
                  >
                    <label
                      className="custom-radio"
                      onClick={() => handleSubcategoryClick(sub, cat.id)}
                    >
                      <span className="radio-mark"></span>
                      {sub.name}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        <li className="category-item">
          <label
            className={`custom-radio ${
              selectedCategory === "" ? "selected-category" : ""
            }`}
            onClick={() => setSelectedCategory("")}
          >
            <span className="radio-mark"></span>
            Tous
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ServicesSidebar;
