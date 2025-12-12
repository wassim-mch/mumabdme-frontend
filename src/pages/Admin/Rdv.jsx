import React, { useState, useEffect, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { FaEdit } from "react-icons/fa";

const Rdv = () => {
  const { token } = useContext(AuthContext);

  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editRdv, setEditRdv] = useState(null);

  const [form, setForm] = useState({
    status: "en attente",
    scheduled_at: "",
  });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Get RDVs
  const fetchRdvs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/rdvs", axiosConfig);
      setRdvs(res.data.rdvs || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRdvs();
  }, []);

  // Inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open modal for edit
  const openModal = (rdv) => {
    setEditRdv(rdv);
    setForm({
      status: rdv.status,
      scheduled_at: rdv.scheduled_at,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditRdv(null);
  };

  // Update only (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/rdvs/${editRdv.id}`, form, axiosConfig);
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
<<<<<<< HEAD
=======
              <th>Phone</th>
              <th>Services</th>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD
                  <td>{r.user?.name || "-"}</td>
                  <td>{r.status}</td>
                  <td>{r.scheduled_at}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => openModal(r)}
                    >
                      <FaEdit />
                    </button>
=======
                  <td>{r.user.name || "-"}</td>
                  <td>{r.user.phone || "-"}</td>
                  <td>{r.items && r.items.length > 0
                    ? r.items.map((item) => item.service?.name).filter(Boolean).join(", ")
                    : "-"}</td>
                  <td>{r.status}</td>
                  <td>{r.scheduled_at}</td>
                  <td>
                    {r.status == "en attente" && (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => openModal(r)}
                      >
                        <FaEdit />
                      </button>
                    )}
                    
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Aucun RDV trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5>Modifier RDV</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label>Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="en attente">En attente</option>
                      <option value="confirmer">Confirmé</option>
                      <option value="complet">Complet</option>
                      <option value="annuler">Annulé</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Date & Heure</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="scheduled_at"
                      value={form.scheduled_at}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Fermer
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Mettre à jour
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

export default Rdv;
