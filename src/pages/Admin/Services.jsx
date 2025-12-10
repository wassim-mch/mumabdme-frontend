// src/components/admin/Services.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Services = () => {
  const { token } = useContext(AuthContext); // 🔑 récupérer le token
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    duration: "",
    price: "",
    is_active: true,
  });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 🔹 Récupérer tous les services et catégories
  const fetchServices = async () => {
    try {
      const resServices = await axios.get("http://127.0.0.1:8000/api/services", axiosConfig);
      setServices(resServices.data); // adapter si Laravel renvoie data
      const resCategories = await axios.get("http://127.0.0.1:8000/api/categories", axiosConfig);
      setCategories(resCategories.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchServices();
}, [token]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const openModal = (service = null) => {
    setEditService(service);
    setForm(
      service
        ? {
            category_id: service.category_id,
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
            is_active: service.is_active,
          }
        : { category_id: "", name: "", description: "", duration: "", price: "", is_active: true }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditService(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editService) {
        await axios.put(`http://127.0.0.1:8000/api/services/${editService.id}`, form, axiosConfig);
      } else {
        await axios.post("http://127.0.0.1:8000/api/services", form, axiosConfig);
      }
      fetchServices();
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'opération.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce service ?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/services/${id}`, axiosConfig);
      fetchServices();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Services</h2>
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
              <th>Catégorie</th>
              <th>Durée</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.category?.name || "-"}</td>
                  <td>{s.duration}</td>
                  <td>{s.price}</td>
                  <td>{s.is_active ? "Actif" : "Inactif"}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => openModal(s)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">Aucun service trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal Création / Edition */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{editService ? "Modifier Service" : "Ajouter Service"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <select className="form-select" name="category_id" value={form.category_id} onChange={handleChange} required>
                      <option value="">-- Sélectionner --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={form.description} onChange={handleChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Durée</label>
                    <input type="text" className="form-control" name="duration" value={form.duration} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} />
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
                    <label className="form-check-label">Actif</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  <button type="submit" className="btn btn-primary">{editService ? "Modifier" : "Ajouter"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
