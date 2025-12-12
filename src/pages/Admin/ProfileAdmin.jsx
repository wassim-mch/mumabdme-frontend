import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const ProfileAdmin = () => {
  const { user, logout, token, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [rdvs, setRdvs] = useState([]);

  if (!user) {
    navigate("/login");
    return null;
  }

  // 🔹 Fetch RDVs عند تحميل الصفحة
  useEffect(() => {
    const fetchRdvs = async () => {
      try {
        const res = await api.get("/rdvs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRdvs(res.data.rdvs);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la récupération des rendez-vous");
      }
    };

    fetchRdvs();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/user/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
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
      await api.put("/user/update-password", passwordForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Mot de passe changé !");
      setPasswordForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  const cancelRdv = async (rdvId) => {
    try {
      const res = await api.delete(`/rdvs/${rdvId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);

      setRdvs((prev) =>
        prev.map((r) => (r.id === rdvId ? { ...r, status: "annuler" } : r))
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Erreur lors de l'annulation du RDV");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">


        <div className="col-md-8">
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

              <button className="btn btn-primary w-100">Mettre à jour</button>
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

              <button className="btn btn-warning w-100">Changer le mot de passe</button>
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
  );
};

export default ProfileAdmin;
