import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import { toast } from "react-toastify";

const Users = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ role_id: "" });

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = Number(currentUser?.id);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const res = await api.get("/roles");
      setRoles(res.data.roles || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const openModal = (user) => {
    setEditUser(user);
    setForm({ role_id: user.role_id || "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editUser) return;

    try {
      // تعديل backend: id في URL
      await api.put(`/users/${editUser.id}`, { role_id: form.role_id });
      fetchUsers();
      closeModal();
      toast.success("Rôle modifié avec succès");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Erreur lors de la modification.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await api.delete(`/users/${id}`); // id في URL
      fetchUsers();
      toast.success("Utilisateur supprimé avec succès");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Erreur lors de la suppression.");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Utilisateurs</h2>

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
              <th>Rôle</th>
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
                  <td>{user.role_name}</td>
                  <td>
                    {user.id !== currentUserId && (
                      <>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => openModal(user)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal for editing role */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Modifier Rôle</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Rôle</label>
                    <select
                      className="form-select"
                      name="role_id"
                      value={form.role_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Sélectionner --</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Modifier
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

export default Users;
