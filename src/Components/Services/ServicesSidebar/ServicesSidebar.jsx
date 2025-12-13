import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import "./ServicesSidebar.css";

const ServicesSidebar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    api
      .get("/categorie")
      .then((res) => {
        setCategories(res.data.data || []);
      })
      .catch(console.error);
  }, []);

  const selectAll = () => {
    onFilterChange({
      category_id: null,
      sous_categorie_id: null,
    });
    setExpandedCategory(null);
  };

  const selectCategory = (catId) => {
    onFilterChange({
      category_id: catId,
      sous_categorie_id: null,
    });

    // 🔥 toggle open / close
    setExpandedCategory((prev) => (prev === catId ? null : catId));
  };

  const selectSubCategory = (catId, subId) => {
    onFilterChange({
      category_id: catId,
      sous_categorie_id: subId,
    });
    setExpandedCategory(catId);
  };

  return (
    <div className="sidebar-custom">
      <h5 className="title">Catégories</h5>

      <ul className="category-list">
        <li className="category-item">
          <div className="custom-radio all" onClick={selectAll}>
            Tous
          </div>
        </li>

        {categories.map((cat) => {
          const isOpen = expandedCategory === cat.id;

          return (
            <li key={cat.id} className="category-item">
              <div
                className={`custom-radio ${isOpen ? "active" : ""}`}
                onClick={() => selectCategory(cat.id)}
              >
                <span>{cat.name}</span>

                {cat.sous_categories?.length > 0 && (
                  <span className={`arrow ${isOpen ? "rotate" : ""}`}>
                    ▼
                  </span>
                )}
              </div>

              <ul
                className={`subcategory-list boxed ${
                  isOpen ? "open" : ""
                }`}
              >
                {cat.sous_categories?.map((sub) => (
                  <li
                    key={sub.id}
                    className="subcategory-item"
                    onClick={() =>
                      selectSubCategory(cat.id, sub.id)
                    }
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ServicesSidebar;
