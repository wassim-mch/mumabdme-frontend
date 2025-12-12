import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import api from "../../api/api"; // axios instance

const Categories = () => {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [form, setForm] = useState({
    name: "",
  });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  /** 🔹 Fetch Categories */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categorie", axiosConfig);
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors du chargement des catégories");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /** 🔹 handle input */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /** 🔹 Open Modal */
  const openModal = (cat = null) => {
    setEditCategory(cat);
    setForm(cat ? { name: cat.name } : { name: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditCategory(null);
  };

  /** 🔹 Submit create/update */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editCategory) {
        await api.put(`/categorie/${editCategory.id}`, form, axiosConfig);
        toast.success("Catégorie modifiée avec succès");
      } else {
        await api.post(`/categorie`, form, axiosConfig);
        toast.success("Catégorie ajoutée avec succès");
      }

      fetchCategories();
      closeModal();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 422) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erreur lors de l'opération");
      }
    }
  };

  /** 🔹 Delete */
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer cette catégorie ?")) return;

    try {
      await api.delete(`/categorie/${id}`, axiosConfig);
      toast.success("Catégorie supprimée");
      fetchCategories();
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="container my-4">

      {/* Header */}
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
                <td colSpan="3" className="text-center">
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
                  <button type="button" className="btn-close" onClick={closeModal}></button>
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
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
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
