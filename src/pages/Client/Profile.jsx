<<<<<<< HEAD
import React, { useContext, useState } from "react";
=======
import React, { useContext, useState, useEffect } from "react";
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout, token, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

<<<<<<< HEAD
  if (!user) {
    navigate("/login");
    return null;
  }

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
=======
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

<<<<<<< HEAD
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

=======
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
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD
      await api.put("/user/update-password", passwordForm, axiosConfig);
      toast.success("Mot de passe changé !");
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
=======
      await api.put("/user/update-password", passwordForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Mot de passe changé !");
      setPasswordForm({ current_password: "", new_password: "", confirm_password: "" });
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du mot de passe.");
    }
  };

<<<<<<< HEAD
  return (
    <div className="container my-5">
      <div className="row">

=======
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
        {/* Mes Rendez-vous */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-3">
            <h4 className="mb-3 text-center">Mes Rendez-vous</h4>

<<<<<<< HEAD
            {user.rdvs && user.rdvs.length > 0 ? (
              <ul className="list-group">
                {user.rdvs.map((r) => (
                  <li className="list-group-item" key={r.id}>
                    <strong>Date :</strong> {r.scheduled_at} <br />
                    <strong>Status :</strong>{" "}
                    <span className="badge bg-info">{r.status}</span>
=======
            {rdvs.length > 0 ? (
              <ul className="list-group">
                {rdvs.map((r) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={r.id}
                  >
                    <div>
                      <strong>Date :</strong> {r.scheduled_at} <br />
                      <strong>Service :</strong>{" "}
                      {r.items && r.items.length > 0
                        ? r.items.map((item) => item.service?.name).filter(Boolean).join(", ")
                        : "-"} 
                      <br />
                      <strong>Status :</strong>{" "}
                      <span
                        className={`badge ${
                          r.status === "en attente"
                            ? "bg-info"
                            : r.status === "annuler"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>

                    {r.status === "en attente" && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => cancelRdv(r.id)}
                      >
                        Annuler
                      </button>
                    )}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">Aucun rendez-vous trouvé</p>
            )}
          </div>
        </div>

<<<<<<< HEAD
        <div className="col-md-8">

          <div className="card shadow-sm p-4 mb-4">
            <h4 className="mb-3">Modifier Mes Informations</h4>

=======
        {/* Profile & Password */}
        <div className="col-md-8">
          <div className="card shadow-sm p-4 mb-4">
            <h4 className="mb-3">Modifier Mes Informations</h4>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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

<<<<<<< HEAD
              <button className="btn btn-primary w-100">
                Mettre à jour
              </button>
=======
              <button className="btn btn-primary w-100">Mettre à jour</button>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
            </form>
          </div>

          <div className="card shadow-sm p-4 mb-4">
            <h4 className="mb-3">Changer le mot de passe</h4>
<<<<<<< HEAD

=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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

<<<<<<< HEAD
              <button className="btn btn-warning w-100">
                Changer le mot de passe
              </button>
=======
              <button className="btn btn-warning w-100">Changer le mot de passe</button>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
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
<<<<<<< HEAD

=======
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        </div>
      </div>
    </div>
  );
};

export default Profile;
