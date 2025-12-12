import React, { useState, useEffect, useContext } from "react";
<<<<<<< HEAD
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import api from "../../api/api";
import { data } from "react-router-dom";
=======
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import api from "../../api/api"; // axios instance
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

const Categories = () => {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [form, setForm] = useState({
    name: "",
<<<<<<< HEAD
    sous_categories: [""], // قائمة inputs للسوس-كاتيجوري
=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  /** 🔹 Fetch Categories */
  const fetchCategories = async () => {
    try {
<<<<<<< HEAD
      const res = await api.get("/categories", axiosConfig);
      setCategories(res.data.data || []);
=======
      const res = await api.get("/categorie", axiosConfig);
      setCategories(res.data.categories);
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors du chargement des catégories");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

<<<<<<< HEAD
  /** 🔹 Handle inputs */
=======
  /** 🔹 handle input */
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
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
        sous_categories: cat.sous_categories
          ? cat.sous_categories.map((sc) => sc.name)
          : [""],
      });
    } else {
      setForm({ name: "", sous_categories: [""] });
    }
=======
  /** 🔹 Open Modal */
  const openModal = (cat = null) => {
    setEditCategory(cat);
    setForm(cat ? { name: cat.name } : { name: "" });
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditCategory(null);
  };

<<<<<<< HEAD
  /** 🔹 Submit */
=======
  /** 🔹 Submit create/update */
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
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

=======
      if (editCategory) {
        await api.put(`/categorie/${editCategory.id}`, form, axiosConfig);
        toast.success("Catégorie modifiée avec succès");
      } else {
        await api.post(`/categorie`, form, axiosConfig);
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        toast.success("Catégorie ajoutée avec succès");
      }

      fetchCategories();
      closeModal();
    } catch (error) {
      console.log(error);
<<<<<<< HEAD
      toast.error(error.response?.data?.message || "Erreur lors de l'opération");
    }
  };

=======

      if (error.response?.status === 422) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erreur lors de l'opération");
      }
    }
  };

  /** 🔹 Delete */
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer cette catégorie ?")) return;

    try {
<<<<<<< HEAD
      const res = await api.delete(`/categories/${id}`, axiosConfig);

      toast.success(res.data.message || "Catégorie supprimée");

      fetchCategories(); 
=======
      await api.delete(`/categorie/${id}`, axiosConfig);
      toast.success("Catégorie supprimée");
      fetchCategories();
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression");
    }
  };

<<<<<<< HEAD

  return (
    <div className="container my-4">
=======
  return (
    <div className="container my-4">

      {/* Header */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD
              <th>Sous-catégories</th>
              <th>Actions</th>
            </tr>
          </thead>
=======
              <th>Actions</th>
            </tr>
          </thead>

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>
<<<<<<< HEAD
                    {cat.sous_categories
                      ? cat.sous_categories.map((sc) => sc.name).join(", ")
                      : "-"}
                  </td>
                  <td>
=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => openModal(cat)}
                    >
                      <FaEdit />
                    </button>
<<<<<<< HEAD
=======

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD
                <td colSpan="4" className="text-center">
=======
                <td colSpan="3" className="text-center">
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD
=======

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editCategory ? "Modifier Catégorie" : "Ajouter Catégorie"}
                  </h5>
<<<<<<< HEAD
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
=======
                  <button type="button" className="btn-close" onClick={closeModal}></button>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD

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
=======
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editCategory ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
<<<<<<< HEAD
=======

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
            </div>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    </div>
  );
};

export default Categories;
