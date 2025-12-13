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
    setExpandedCategory(catId);
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
        <li className="category-item" onClick={selectAll}>
          Tous
        </li>

        {categories.map((cat) => (
          <li key={cat.id} className="category-item">
            <div
              className="custom-radio"
              onClick={() => selectCategory(cat.id)}
            >
              <span>{cat.name}</span>

              {cat.sous_categories?.length > 0 && (
                <span>
                  {expandedCategory === cat.id ? "▲" : "▼"}
                </span>
              )}
            </div>

            {expandedCategory === cat.id &&
              cat.sous_categories?.length > 0 && (
                <ul className="subcategory-list open">
                  {cat.sous_categories.map((sub) => (
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
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesSidebar;
