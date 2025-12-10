// src/pages/Profile.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Mon Profil</h2>

            <div className="mb-3">
              <label className="form-label fw-bold">Nom complet</label>
              <input type="text" className="form-control" value={user.name} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input type="email" className="form-control" value={user.email} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Téléphone</label>
              <input type="text" className="form-control" value={user.phone} disabled />
            </div>

            <div className="d-grid mt-4">
              <button
                className="btn btn-danger"
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
      </div>
    </div>
  );
};

export default Profile;
