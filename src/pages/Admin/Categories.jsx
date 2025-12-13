import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import api from "../../api/api";
import { data } from "react-router-dom";

const Categories = () => {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [form, setForm] = useState({
    name: "",
    sous_categories: [""], // قائمة inputs للسوس-كاتيجوري
  });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  /** 🔹 Fetch Categories */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories", axiosConfig);
      setCategories(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors du chargement des catégories");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /** 🔹 Handle inputs */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSousChange = (index, value) => {
    const newSous = [...form.sous_categories];
    newSous[index] = value;
    setForm({ ...form, sous_categories: newSous });
  };

  const addSousField = () => {
    setForm({ ...form, sous_categories: [...form.sous_categories, ""] });
  };

  const removeSousField = (index) => {
    const newSous = form.sous_categories.filter((_, i) => i !== index);
    setForm({ ...form, sous_categories: newSous });
  };

  /** 🔹 Open Modal */
  const openModal = (cat = null) => {
    setEditCategory(cat);
    if (cat) {
      setForm({
        name: cat.name,
        sous_categories: cat.sous_categorie
          ? cat.sous_categorie.map((sc) => sc.name)
          : [""],
      });
    } else {
      setForm({ name: "", sous_categories: [""] });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditCategory(null);
  };

  /** 🔹 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        sous_categories: form.sous_categories
          .map(sc => sc.trim()) // إزالة المسافات
          .filter(sc => sc !== ""), // تجاهل الفراغات
      };

      if (editCategory) {
        await api.put(`/categories/${editCategory.id}`, payload, axiosConfig);
        toast.success("Catégorie modifiée avec succès");
      } else {
        await api.post(`/categories`, payload, axiosConfig);

        toast.success("Catégorie ajoutée avec succès");
      }

      fetchCategories();
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Erreur lors de l'opération");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer cette catégorie ?")) return;

    try {
      const res = await api.delete(`/categories/${id}`, axiosConfig);

      toast.success(res.data.message || "Catégorie supprimée");

      fetchCategories(); // 🔥 إعادة تحميل القائمة
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression");
    }
  };


  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Catégories</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <FaPlus className="me-1" /> Ajouter
        </button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Sous-catégories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>
                    {cat.sous_categorie
                      ? cat.sous_categorie.map((sc) => sc.name).join(", ")
                      : "-"}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => openModal(cat)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Aucune catégorie trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editCategory ? "Modifier Catégorie" : "Ajouter Catégorie"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sous-catégories</label>
                    {form.sous_categories.map((sc, index) => (
                      <div className="d-flex mb-2" key={index}>
                        <input
                          type="text"
                          className="form-control me-2"
                          value={sc}
                          onChange={(e) => handleSousChange(index, e.target.value)}
                          placeholder="Nom de la sous-catégorie"
                        />
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeSousField(index)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addSousField}
                    >
                      <FaPlus className="me-1" /> Ajouter Sous-catégorie
                    </button>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editCategory ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
