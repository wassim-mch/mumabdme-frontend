<<<<<<< HEAD
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaTools, FaFolderOpen, FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../api/api"; // تأكد أنك استوردت api
=======
import React, { useContext, useState } from "react"; // <-- ajout de useState
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaTools, FaFolderOpen, FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

const AdminTopbar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
<<<<<<< HEAD
  const [showMenu, setShowMenu] = useState(false); 

  // ← هنا تعريف الدالة بالشكل الصحيح
  const handleLogout = async () => {
    try {
      await api.post("/logout"); 
      logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
    window.location.href = "/login"; // إعادة التوجيه إلى صفحة تسجيل الدخول
  }
=======
  const [showMenu, setShowMenu] = useState(false); // <-- initialisation du state
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Services", path: "/admin/services", icon: <FaTools /> },
    { name: "Categories", path: "/admin/categories", icon: <FaFolderOpen /> },
<<<<<<< HEAD
    { name: "Appointments", path: "/admin/rdv", icon: <FaCalendarAlt /> },
=======
    { name: "Appointments", path: "/admin/rdv", icon: <FaCalendarAlt />},
    { name: "Profile", path: "/admin/profile-admin", icon: <FaUsers /> },
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark admin-topbar">
      <div className="container-fluid">
<<<<<<< HEAD
        <span className="navbar-brand mb-0 h1">Admin Panel</span>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowMenu(!showMenu)}
=======
        {/* Logo */}
        <span className="navbar-brand mb-0 h1">Admin Panel</span>

        {/* Toggler mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowMenu(!showMenu)} // toggle manuel
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        >
          <FaBars style={{ color: "#000000ff", fontSize: "1.5rem" }} />
        </button>

<<<<<<< HEAD
=======
        {/* Collapse menu */}
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
        <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="adminNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
<<<<<<< HEAD
                  onClick={() => setShowMenu(false)}
=======
                  onClick={() => setShowMenu(false)} // fermeture auto au clic
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
                >
                  {link.icon} <span className="ms-1">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>

<<<<<<< HEAD
          <div className="d-flex mt-2 mt-lg-0">
            <button className="btn btn-danger w-100 w-lg-auto" onClick={handleLogout}>
=======
          {/* Déconnexion */}
          <div className="d-flex mt-2 mt-lg-0">
            <button className="btn btn-danger w-100 w-lg-auto" onClick={logout}>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
              <FaSignOutAlt className="me-1" /> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopbar;
