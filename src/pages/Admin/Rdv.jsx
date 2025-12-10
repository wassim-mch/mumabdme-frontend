// src/components/admin/Rdvs.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Rdvs = () => {
  const { token } = useContext(AuthContext);
  const [rdvs, setRdvs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRdv, setEditRdv] = useState(null);
  const [form, setForm] = useState({ user_id: "", status: "pending", scheduled_at: "" });

  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const fetchRdvs = async () => {
    try {
      const resRdvs = await axios.get("http://127.0.0.1:8000/api/rdvs", axiosConfig);
      setRdvs(resRdvs.data); 
      const resUsers = await axios.get("http://127.0.0.1:8000/api/users", axiosConfig);
      setUsers(resUsers.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users");
      setUsers(res.data); // ✅ ok, appelé dans async interne
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  loadUsers();
}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const openModal = (rdv = null) => {
    setEditRdv(rdv);
    setForm(rdv ? { user_id: rdv.user_id, status: rdv.status, scheduled_at: rdv.scheduled_at } : { user_id: "", status: "pending", scheduled_at: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditRdv(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRdv) {
        await axios.put(`http://127.0.0.1:8000/api/rdvs/${editRdv.id}`, form, axiosConfig);
      } else {
        await axios.post("http://127.0.0.1:8000/api/rdvs", form, axiosConfig);
      }
      fetchRdvs();
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'opération.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/rdvs/${id}`, axiosConfig);
      fetchRdvs();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Rendez-vous</h2>
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
              <th>Client</th>
              <th>Statut</th>
              <th>Date/Heure</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rdvs.length > 0 ? (
              rdvs.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.user?.name || "-"}</td>
                  <td>{r.status}</td>
                  <td>{r.scheduled_at}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => openModal(r)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Aucun rendez-vous trouvé</td>
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
                  <h5 className="modal-title">{editRdv ? "Modifier Rendez-vous" : "Ajouter Rendez-vous"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <select className="form-select" name="user_id" value={form.user_id} onChange={handleChange} required>
                      <option value="">-- Sélectionner --</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Statut</label>
                    <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmé</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date et Heure</label>
                    <input type="datetime-local" className="form-control" name="scheduled_at" value={form.scheduled_at} onChange={handleChange} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  <button type="submit" className="btn btn-primary">{editRdv ? "Modifier" : "Ajouter"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rdvs;
