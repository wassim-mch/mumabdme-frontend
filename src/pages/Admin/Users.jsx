// src/components/admin/Users.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Users = () => {
  const { token } = useContext(AuthContext); // 🔑 récupérer le token
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // 🔹 Config axios avec token Bearer
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 🔹 Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users", axiosConfig);
      setUsers(res.data); // attention : Laravel peut renvoyer { data: [...] } selon Resource
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // éviter les setState après démontage

    const loadUsers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/users");
        if (isMounted) {
          setUsers(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) setLoading(false);
      }
    };

    loadUsers();

    return () => { isMounted = false; };
  }, []);
  // 🔹 Formulaire modal
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openModal = (user = null) => {
    setEditUser(user);
    setForm(user ? { name: user.name, email: user.email, phone: user.phone } : { name: "", email: "", phone: "" });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  // 🔹 Ajouter / Modifier utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await axios.put(`http://127.0.0.1:8000/api/users/${editUser.id}`, form, axiosConfig);
      } else {
        await axios.post("http://127.0.0.1:8000/api/users", form, axiosConfig);
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'opération.");
    }
  };

  // 🔹 Supprimer utilisateur
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, axiosConfig);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Utilisateurs</h2>
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
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => openModal(user)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Aucun utilisateur trouvé</td>
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
                  <h5 className="modal-title">{editUser ? "Modifier Utilisateur" : "Ajouter Utilisateur"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Téléphone</label>
                    <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  <button type="submit" className="btn btn-primary">{editUser ? "Modifier" : "Ajouter"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
