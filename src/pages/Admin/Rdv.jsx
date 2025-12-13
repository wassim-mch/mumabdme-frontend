// src/pages/Rdv.jsx
import React, { useState, useEffect, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Rdv = () => {
  const { token } = useContext(AuthContext);

  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editRdv, setEditRdv] = useState(null);

  const [form, setForm] = useState({
    statut: "en attente",
    date_rdv: "",
  });

  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const fetchRdvs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/rdvs", axiosConfig);
      setRdvs(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRdvs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (rdv) => {
    setEditRdv(rdv);
    setForm({
      statut: rdv.statut,
      date_rdv: rdv.date_rdv,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditRdv(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/rdvs/${editRdv.id}`, form, axiosConfig);
      toast.success("Rdv mis à jour !");
      fetchRdvs();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="container my-4">
      <h2>Rendez-vous</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Numero</th>
              <th>Service</th>
              <th>Option</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rdvs.length > 0 ? (
              rdvs.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.nom} {r.prenom}</td>
                  <td>{r.numero_tel}</td>
                  <td>{r.service?.name || "-"}</td>
                  <td>{r.option?.name || "-"}</td>
                  <td>{r.statut}</td>
                  <td>{r.date_rdv}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => openModal(r)}>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">Aucun RDV trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5>Modifier RDV</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label>Status</label>
                    <select className="form-select" name="statut" value={form.statut} onChange={handleChange}>
                      <option value="en attente">En attente</option>
                      <option value="confirme">Confirmé</option>
                      <option value="annule">Annulé</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Date & Heure</label>
                    <input type="datetime-local" className="form-control" name="date_rdv" value={form.date_rdv} onChange={handleChange}/>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Fermer</button>
                  <button type="submit" className="btn btn-primary">Mettre à jour</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rdv;
