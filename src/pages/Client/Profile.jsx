import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout, token, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };


  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const res = await api.post(
        "/user/update-profile",
        form,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );


      setUser(res.data.user); // ← الآن تعمل بدون خطأ

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      return toast.error("Les mots de passe ne correspondent pas !");
    }

    try {
      await api.put("/user/update-password", passwordForm, axiosConfig);
      toast.success("Mot de passe changé !");
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-3">
            <h4 className="mb-3 text-center">Mes Rendez-vous</h4>

            {user.rdvs && user.rdvs.length > 0 ? (
              <ul className="list-group">
                {user.rdvs.map((r) => (
                  <li className="list-group-item" key={r.id}>
                    <strong>Date :</strong> {r.scheduled_at} <br />
                    <strong>Status :</strong>{" "}
                    <span className="badge bg-info">{r.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">Aucun rendez-vous trouvé</p>
            )}
          </div>
        </div>

        <div className="col-md-8">

          <div className="card shadow-sm p-4 mb-4">
            <h4 className="mb-3">Modifier Mes Informations</h4>

            <form onSubmit={updateProfile}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nom complet</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Téléphone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary w-100">
                Mettre à jour
              </button>
            </form>
          </div>

          <div className="card shadow-sm p-4 mb-4">
            <h4 className="mb-3">Changer le mot de passe</h4>

            <form onSubmit={updatePassword}>
              <div className="mb-3">
                <label className="form-label fw-bold">Mot de passe actuel</label>
                <input
                  type="password"
                  className="form-control"
                  name="current_password"
                  value={passwordForm.current_password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Nouveau mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  name="new_password"
                  value={passwordForm.new_password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Confirmer</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirm_password"
                  value={passwordForm.confirm_password}
                  onChange={handlePasswordChange}
                />
              </div>

              <button className="btn btn-warning w-100">
                Changer le mot de passe
              </button>
            </form>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Déconnexion
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;
