// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [username, setUsername] = useState(currentUser?.username || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/user/update", { username });
      toast.success(res.data.message);
      // تحديث localStorage
      localStorage.setItem("user", JSON.stringify({ ...currentUser, username }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    try {
      const res = await api.put("/user/update-password", {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      toast.success(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.current_password || err.response?.data?.message || "Erreur lors de la modification du mot de passe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Mon Profil</h2>

      <form onSubmit={handleProfileUpdate} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Mise à jour..." : "Mettre à jour le profil"}
        </button>
      </form>

      <hr />

      <form onSubmit={handlePasswordUpdate}>
        <h4 className="mb-3">Changer le mot de passe</h4>
        <div className="mb-3">
          <label className="form-label">Mot de passe actuel</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nouveau mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning" disabled={loading}>
          {loading ? "Modification..." : "Modifier le mot de passe"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
